import { Button } from "@/components/ui/button";
import { motion, useScroll, useSpring, useTransform, useMotionValue } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { Dna, Microscope, Zap, Target, ArrowRight, Sparkles, Beaker, Atom, Cpu } from "lucide-react";
import Navigation from "@/components/Navigation";
import ProteinVisualization from "@/components/ProteinVisualization";

import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

const Index = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Mouse position for parallax effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Parallax transforms
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const parallaxY3 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Intersection observers for different sections
  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [researchRef, researchInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [ctaRef, ctaInView] = useInView({ threshold: 0.3, triggerOnce: true });

  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted overflow-hidden relative">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent origin-left z-50"
        style={{ scaleX }}
      />

      {/* Enhanced Animated Background Elements with Parallax */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          style={{ y: parallaxY }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
          style={{ y: parallaxY2 }}
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary/3 rounded-full blur-2xl"
          style={{ y: parallaxY3 }}
          animate={{ 
            x: [-20, 20, -20],
            y: [-10, 10, -10],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/3 w-48 h-48 bg-accent/4 rounded-full blur-xl"
          style={{ y: parallaxY }}
          animate={{ 
            x: [20, -20, 20],
            y: [10, -10, 10],
            scale: [1.1, 1, 1.1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
        
        {/* Additional floating particles */}
        <motion.div 
          className="absolute top-1/5 right-1/5 w-32 h-32 bg-primary/8 rounded-full blur-xl"
          style={{ y: parallaxY2 }}
          animate={{ 
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div 
          className="absolute bottom-1/5 left-1/5 w-24 h-24 bg-accent/6 rounded-full blur-lg"
          style={{ y: parallaxY3 }}
          animate={{ 
            x: [-15, 15, -15],
            y: [0, -15, 0],
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 pt-40 md:pt-48 pb-8 md:pb-16">
        <motion.div 
          ref={heroRef}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          initial={{ opacity: 0 }}
          animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Left Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-6">
              <motion.div
                className="inline-flex items-center gap-2 glass-card-primary px-4 py-2 text-sm text-primary font-medium glow-pulse"
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.3 }}
              >
                <Sparkles className="h-4 w-4" />
                AI-Powered Structural Biology Platform
              </motion.div>

              <motion.h1 
                className="font-instrument text-4xl sm:text-5xl lg:text-7xl font-normal text-foreground leading-tight will-change-transform gpu-accelerated"
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.4 }}
              >
                AI native{" "}
                <span className="gradient-text text-glow">In-silico protein research</span>{" "}
                and lead design Environment
              </motion.h1>

              <motion.h2 
                className="font-mono text-xl sm:text-2xl lg:text-3xl text-accent font-medium tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.5 }}
              >
                Research, design and transfer to wet lab and iterate faster
              </motion.h2>

              <motion.p 
                className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.6 }}
              >
                LiteFold is a platform that helps computational biologists to research
                design, and experiment with protein structures and design leads faster and with very low costs.
              </motion.p>
            </div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.7 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 px-8 py-6 text-lg glow-primary pulse-glow interactive-card"
                  onClick={() => window.open("https://litefold.vercel.app", "_blank")}
                >
                  <Target className="h-5 w-5" />
                  Launch Platform
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="glass-strong border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary/50 flex items-center gap-2 px-8 py-6 text-lg interactive-card"
                  onClick={() => window.open("https://github.com/Anindyadeep/litefold", "_blank")}
                >
                  <FaGithub className="h-5 w-5" />
                  Explore Code
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right 3D Visualization */}
          <motion.div 
            className="flex justify-center will-change-transform gpu-accelerated"
            initial={{ opacity: 0, x: 50 }}
            animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
                          <ProteinVisualization className="w-full max-w-2xl morphing-blob" randomize={true} />
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.section 
          ref={featuresRef}
          className="mt-24 lg:mt-32"
          initial={{ opacity: 0 }}
          animate={featuresInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.h2 
              className="font-instrument text-3xl lg:text-5xl font-normal gradient-text mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2 }}
            >
              Advanced Capabilities
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3 }}
            >
              Unlock the full potential of AI-driven structural biology and computational drug discovery
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Dna,
                title: "Protein Folding",
                description: "State-of-the-art AlphaFold integration with advanced structure prediction algorithms",
                image: "/lovable-uploads/e0fa63b8-da64-4f27-a5c2-8277a5a3c0bf.png",
                delay: 0.4,
                color: "primary"
              },
              {
                icon: Target,
                title: "Drug Docking",
                description: "High-precision molecular docking simulations for optimal drug-target interactions",
                image: "/lovable-uploads/56d5b619-4475-43ba-bd4b-3136fd8859cd.png",
                delay: 0.5,
                color: "accent"
              },
              {
                icon: Microscope,
                title: "Structure Analysis",
                description: "Comprehensive structural biology toolkit with advanced visualization capabilities",
                image: "/lovable-uploads/bad6ff4b-1f0a-414a-bbe8-4c0a0f5611a4.png",
                delay: 0.6,
                color: "primary"
              },
              {
                icon: Beaker,
                title: "Chemical Design",
                description: "AI-powered chemical compound optimization and property prediction",
                image: "/lovable-uploads/cf4fdaf2-cbd7-42fb-8790-0e583d7f887c.png",
                delay: 0.7,
                color: "accent"
              },
              {
                icon: Atom,
                title: "Molecular Dynamics",
                description: "Real-time simulation of protein dynamics and conformational changes",
                image: "/lovable-uploads/e0fa63b8-da64-4f27-a5c2-8277a5a3c0bf.png",
                delay: 0.8,
                color: "primary"
              },
              {
                icon: Cpu,
                title: "AI Integration",
                description: "Machine learning models for protein property prediction and optimization",
                image: "/lovable-uploads/56d5b619-4475-43ba-bd4b-3136fd8859cd.png",
                delay: 0.9,
                color: "accent"
              }
            ].map((feature) => (
              <motion.div
                key={feature.title}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: feature.delay, duration: 0.6 }}
                whileHover={{ y: -10 }}
              >
                <div className={`glass-card-${feature.color} glass-floating p-8 h-full relative overflow-hidden shimmer interactive-card`}>
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`p-3 rounded-2xl bg-${feature.color}/10 glow-${feature.color}`}>
                        <feature.icon className={`h-8 w-8 text-${feature.color}`} />
                      </div>
                      <h3 className="font-instrument text-2xl font-semibold text-foreground">
                        {feature.title}
                      </h3>
                    </div>
                    
                    <div className="mb-6 rounded-xl overflow-hidden">
                      <motion.img 
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-48 object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.7 }}
                      />
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Research & Publications Section */}
        <motion.section 
          ref={researchRef}
          className="mt-24 lg:mt-32"
          initial={{ opacity: 0 }}
          animate={researchInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.h2 
              className="font-instrument text-3xl lg:text-5xl font-normal gradient-text mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={researchInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2 }}
            >
              Research & Insights
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={researchInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3 }}
            >
              Explore the cutting-edge research driving our platform forward
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              className="group"
              initial={{ opacity: 0, x: -30 }}
              animate={researchInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <div className="glass-card-primary glass-floating p-8 h-full relative overflow-hidden shimmer interactive-card">
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                    <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full group-hover:w-32 transition-all duration-500 glow-pulse"></div>
                    <span className="text-xs uppercase tracking-wider font-medium glass-card px-3 py-2 text-primary">Educational</span>
                  </div>
                  
                  <h3 className="font-instrument text-2xl lg:text-3xl font-semibold mb-4 text-foreground group-hover:gradient-text transition-all duration-300">
                    Structural Biology & AlphaFold Revolution
                  </h3>
                  
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    Deep dive into the transformative impact of AI-driven protein structure prediction 
                    and its revolutionary applications in modern drug discovery.
                  </p>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 glow-primary interactive-card"
                      onClick={() => window.open("https://copper-jasper-ae1.notion.site/Structural-biology-and-AlphaFold-1be76f0a4c39807a987de3733d61114e", "_blank")}
                    >
                      <Zap className="h-4 w-4" />
                      Read Research
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="group"
              initial={{ opacity: 0, x: 30 }}
              animate={researchInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ delay: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className="glass-card-accent glass-floating p-8 h-full relative overflow-hidden shimmer interactive-card">
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                    <div className="h-1 w-20 bg-gradient-to-r from-accent to-primary rounded-full group-hover:w-32 transition-all duration-500 glow-pulse"></div>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs uppercase tracking-wider font-medium glass-card px-3 py-2 text-accent">Platform</span>
                      <span className="text-xs uppercase tracking-wider font-medium glass-card px-3 py-2 text-primary">Innovation</span>
                    </div>
                  </div>
                  
                  <h3 className="font-instrument text-2xl lg:text-3xl font-semibold mb-4 text-foreground group-hover:gradient-text transition-all duration-300">
                    LiteFold: Democratizing Protein Science
                  </h3>
                  
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    Discover how LiteFold is making advanced protein folding tools accessible to researchers 
                    worldwide, accelerating breakthroughs in biotechnology and medicine.
                  </p>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      className="bg-accent hover:bg-accent/90 text-accent-foreground flex items-center gap-2 glow-accent interactive-card"
                      onClick={() => window.open("https://copper-jasper-ae1.notion.site/LiteFold-Folding-experiments-just-got-more-accessible-1d976f0a4c3980f5bc81c82f543330b9", "_blank")}
                    >
                      <Target className="h-4 w-4" />
                      Learn More
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Call to Action Footer */}
        <motion.div 
          ref={ctaRef}
          className="mt-24 lg:mt-32 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={ctaInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="glass-card-primary glass-floating p-12 inline-block scale-in">
            <motion.h3 
              className="font-instrument text-2xl lg:text-3xl font-semibold gradient-text mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4 }}
            >
              Ready to Transform Your Research?
            </motion.h3>
            <motion.p 
              className="text-lg text-muted-foreground mb-6 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5 }}
            >
              Join the revolution in computational biology and start exploring 
              the limitless possibilities of AI-powered protein engineering.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 px-8 py-4 text-lg glow-primary pulse-glow"
                onClick={() => window.open("https://litefold.vercel.app", "_blank")}
              >
                <Sparkles className="h-5 w-5" />
                Get Started Now
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Index;