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
            viewerRef.current.rotate(0.15, 'y');
            viewerRef.current.rotate(0.08, 'x');
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
            viewerRef.current.rotate(0.15, 'y');
            viewerRef.current.rotate(0.08, 'x');
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
      <div className={`relative group ${className}`}>
        <div className="relative bg-gradient-to-br from-gray-50/40 via-white/30 to-gray-100/20 rounded-3xl border border-gray-200/30 backdrop-blur-lg overflow-hidden">
          <div className="flex items-center justify-center h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] p-4 sm:p-6">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-red-100/80 backdrop-blur-sm flex items-center justify-center border border-red-200/50">
                <span className="text-red-600 font-bold">!</span>
              </div>
              <p className="text-sm text-gray-600 font-medium">Failed to load protein</p>
              <p className="text-xs text-gray-500 mt-1">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative group ${className}`}>
      {/* Floating particles around the bubble */}
      <div className="absolute -inset-4 sm:-inset-8 pointer-events-none">
        <div className="absolute top-2 sm:top-4 left-4 sm:left-8 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-primary/30 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-8 sm:top-16 right-6 sm:right-12 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-accent/40 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="absolute bottom-10 sm:bottom-20 left-2 sm:left-4 w-1 h-1 bg-primary/20 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
        <div className="absolute bottom-4 sm:bottom-8 right-3 sm:right-6 w-2 sm:w-2.5 h-2 sm:h-2.5 bg-accent/25 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}></div>
        <div className="absolute top-1/3 left-1 sm:left-2 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-primary/35 rounded-full animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '4.5s' }}></div>
        <div className="absolute top-2/3 right-1 sm:right-2 w-1 h-1 bg-accent/30 rounded-full animate-bounce" style={{ animationDelay: '2.5s', animationDuration: '3.8s' }}></div>
      </div>

      {/* Main container */}
      <div 
        className="relative bg-gradient-to-br from-gray-50/40 via-white/30 to-gray-100/20 border border-gray-200/30 backdrop-blur-lg overflow-hidden group-hover:scale-102 transition-all duration-500 ease-out"
        style={{
          borderRadius: '45% 55% 52% 48% / 53% 47% 58% 42%'
        }}
      >
        {/* Subtle inner glow effect */}
        <div 
          className="absolute inset-2 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"
          style={{
            borderRadius: '42% 58% 49% 51% / 56% 44% 61% 39%'
          }}
        ></div>
        
        <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] p-3 sm:p-4">
          {isLoading && (
            <div 
              className="absolute inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-10"
              style={{
                borderRadius: '42% 58% 49% 51% / 56% 44% 61% 39%'
              }}
            >
              <div className="text-center">
                <div className="w-8 h-8 mx-auto mb-2 border-2 border-primary/60 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm text-gray-600 font-medium">Loading protein structure...</p>
              </div>
            </div>
          )}
          
          {/* Protein viewer container */}
          <div 
            ref={containerRef}
            className="w-full h-full overflow-hidden relative"
            style={{ 
              minHeight: '200px',
              borderRadius: '40% 60% 47% 53% / 54% 46% 59% 41%'
            }}
          />
          
          {/* Subtle highlight overlay */}
          <div 
            className="absolute top-4 left-4 w-16 h-16 bg-white/10 blur-xl pointer-events-none"
            style={{
              borderRadius: '35% 65% 42% 58% / 48% 52% 63% 37%'
            }}
          ></div>
        </div>
        
        {/* Bottom info label */}
        <div className="absolute bottom-2 sm:bottom-3 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full border border-gray-200/50">
          <p className="text-xs text-gray-600 font-medium">
            {dataSource.pdbId?.toUpperCase() || 'Protein Structure'}
          </p>
        </div>
      </div>
      
      {/* Subtle reflection effect */}
      <div className="absolute top-4 left-4 w-1/4 h-1/4 bg-white/5 rounded-2xl blur-2xl pointer-events-none opacity-40"></div>
    </div>
  );
});

ProteinVisualization.displayName = 'ProteinVisualization';

export default ProteinVisualization; 