import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';

declare global {
  interface Window {
    $3Dmol: any;
  }
}

interface ProteinVisualizationProps {
  className?: string;
  pdbId?: string;
  pdbData?: string;
  randomize?: boolean;
}

const ProteinVisualization = React.memo(({ 
  className = "", 
  pdbId = "6te0",
  pdbData,
  randomize = false
}: ProteinVisualizationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);
  const animationRef = useRef<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [currentPdbId, setCurrentPdbId] = useState(pdbId);

  // Available PDB files for randomization
  const availablePdbFiles = useMemo(() => [
    '1aon', '1hc1', '2zuo', '3arc', '6te0'
  ], []);

  // Function to get random PDB file
  const getRandomPdbId = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * availablePdbFiles.length);
    return availablePdbFiles[randomIndex];
  }, [availablePdbFiles]);

  // Set initial PDB ID based on randomize prop
  useEffect(() => {
    if (randomize && !pdbData) {
      setCurrentPdbId(getRandomPdbId());
    } else {
      setCurrentPdbId(pdbId);
    }
  }, [randomize, pdbId, pdbData, getRandomPdbId]);

  // Memoize the data source to prevent unnecessary re-renders
  const dataSource = useMemo(() => ({
    pdbId: currentPdbId,
    pdbData
  }), [currentPdbId, pdbData]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const cleanup = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    if (viewerRef.current) {
      try {
        viewerRef.current.clear();
        viewerRef.current = null;
      } catch (e) {
        console.warn('Error during viewer cleanup:', e);
      }
    }
  }, []);

  const load3DMol = useCallback(async () => {
    if (!isInView) return;

    // Load 3dmol.js from CDN with better error handling
    if (!window.$3Dmol) {
      try {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/3Dmol/2.0.4/3Dmol-min.js';
          script.onload = () => resolve();
          script.onerror = () => reject(new Error('Failed to load 3DMol library'));
          document.head.appendChild(script);
        });
        
        // Small delay to ensure library is fully loaded
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (err) {
        setError('Failed to load 3DMol library');
        setIsLoading(false);
        return;
      }
    }

    initViewer();
  }, [isInView, dataSource]);

  const initViewer = useCallback(async () => {
    if (!containerRef.current || !window.$3Dmol) return;

    try {
      setIsLoading(true);
      setError(null);

      // Cleanup previous viewer
      cleanup();

      // Clear container
      containerRef.current.innerHTML = '';

      // Create 3DMol viewer with optimized settings
      const viewer = window.$3Dmol.createViewer(containerRef.current, {
        defaultcolors: window.$3Dmol.elementColors.rasmol,
        backgroundColor: 'white',
        antialias: true,
        quality: 'medium', // Balance between quality and performance
      });

      viewerRef.current = viewer;

      // Load protein structure
      await loadProteinStructure(viewer);

      setIsLoading(false);
    } catch (err) {
      console.error('Error initializing protein viewer:', err);
      setError('Failed to load protein structure');
      setIsLoading(false);
    }
  }, [dataSource, cleanup]);

  const loadProteinStructure = useCallback(async (viewer: any) => {
    try {
      let structureData: string;

      if (dataSource.pdbData) {
        structureData = dataSource.pdbData;
      } else if (dataSource.pdbId) {
        // Use AbortController for better request management
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

        try {
          const response = await fetch(`/${dataSource.pdbId}.pdb`, {
            signal: controller.signal
          });
          clearTimeout(timeoutId);
          
          if (!response.ok) {
            throw new Error(`Failed to fetch PDB file: ${response.statusText}`);
          }
          structureData = await response.text();
        } catch (fetchError) {
          clearTimeout(timeoutId);
          throw fetchError;
        }
      } else {
        throw new Error('No PDB data or ID provided');
      }

      // Add model to viewer
      viewer.addModel(structureData, 'pdb');

      // Set optimized cartoon style
      viewer.setStyle({}, {
        cartoon: {
          color: 'spectrum',
          thickness: 0.5,
          opacity: 0.9,
        }
      });

      // Render with optimized settings
      viewer.render();
      viewer.zoomTo();
      viewer.zoom(1.5);

      // Add smooth rotation animation
      const startRotation = () => {
        const rotate = () => {
          if (viewerRef.current) {
            viewerRef.current.rotate(0.5, 'y');
            viewerRef.current.rotate(0.25, 'x');
            animationRef.current = requestAnimationFrame(rotate);
          }
        };
        animationRef.current = requestAnimationFrame(rotate);
      };

      startRotation();

    } catch (err) {
      console.error('Error loading protein structure:', err);
      throw err;
    }
  }, [dataSource]);

  useEffect(() => {
    load3DMol();
    
    // Cleanup on unmount
    return cleanup;
  }, [load3DMol, cleanup]);

  // Handle visibility change to pause/resume animation
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      } else if (!document.hidden && viewerRef.current && !animationRef.current) {
        const rotate = () => {
          if (viewerRef.current) {
            viewerRef.current.rotate(0.5, 'y');
            viewerRef.current.rotate(0.25, 'x');
            animationRef.current = requestAnimationFrame(rotate);
          }
        };
        animationRef.current = requestAnimationFrame(rotate);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  if (error) {
    return (
      <div className={`bg-white rounded-xl border border-gray-200 p-6 ${className}`}>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-red-600 font-bold">!</span>
            </div>
            <p className="text-sm text-gray-600 font-medium">Failed to load protein</p>
            <p className="text-xs text-gray-500 mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden ${className}`}>
      <div className="relative h-96 md:h-[500px] lg:h-[600px]">
        {isLoading && (
          <div className="absolute inset-0 bg-white flex items-center justify-center z-10">
            <div className="text-center">
              <div className="w-8 h-8 mx-auto mb-2 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm text-gray-600">Loading protein structure...</p>
            </div>
          </div>
        )}
        
        <div 
          ref={containerRef}
          className="w-full h-full"
          style={{ minHeight: '400px' }}
        />
      </div>
    </div>
  );
});

ProteinVisualization.displayName = 'ProteinVisualization';

export default ProteinVisualization; 