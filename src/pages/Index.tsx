import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { motion, useScroll, useSpring, useTransform, useMotionValue } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { Dna, Microscope, Zap, Target, ArrowRight, Sparkles, Beaker, Atom, Cpu, Mail, Send, User, MessageSquare, ExternalLink, Github, Twitter, Linkedin, MapPin, Phone, Globe, Play } from "lucide-react";
import Navigation from "@/components/Navigation";
import ProteinVisualization from "@/components/ProteinVisualization";
import videoThumbnail from "@/assets/video-thumbnail.jpg";

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
  const [videoRef, videoInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [researchRef, researchInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [ctaRef, ctaInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [contactRef, contactInView] = useInView({ threshold: 0.3, triggerOnce: true });

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
          className="flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center"
          initial={{ opacity: 0 }}
          animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Right 3D Visualization - Shows first on mobile, second on desktop */}
          <motion.div 
            className="flex justify-center will-change-transform gpu-accelerated order-1 lg:order-2 w-full"
            initial={{ opacity: 0, x: 50 }}
            animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <ProteinVisualization className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl morphing-blob" randomize={true} />
          </motion.div>

          {/* Left Content - Shows second on mobile, first on desktop */}
          <motion.div 
            className="space-y-6 sm:space-y-8 text-center lg:text-left order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-4 sm:space-y-6">
              <motion.div
                className="inline-flex items-center gap-2 glass-card-primary px-3 sm:px-4 py-2 text-xs sm:text-sm text-primary font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.3 }}
              >
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
                AI-Powered Structural Biology Platform
              </motion.div>

              <motion.h1 
                className="font-instrument text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-foreground leading-tight will-change-transform gpu-accelerated"
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.4 }}
              >
                AI native{" "}
                <span className="gradient-text text-glow">In-silico protein research</span>{" "}
                and lead design Environment
              </motion.h1>

              <motion.h2 
                className="font-mono text-lg sm:text-xl md:text-2xl lg:text-3xl text-accent font-medium tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.5 }}
              >
                Research, design and transfer to wet lab and iterate faster
              </motion.h2>

              <motion.p 
                className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.6 }}
              >
                LiteFold is a platform that helps computational biologists to research
                design, and experiment with protein structures and design leads faster and with very low costs.
              </motion.p>
            </div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
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
                  className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center gap-2 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg interactive-card w-full sm:w-auto"
                  onClick={() => window.open("https://litefold.vercel.app", "_blank")}
                >
                  <Target className="h-4 w-4 sm:h-5 sm:w-5" />
                  Launch Platform
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 text-white border-purple-600 hover:border-purple-700 flex items-center justify-center gap-2 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg interactive-card w-full sm:w-auto"
                  onClick={() => {
                    const contactSection = document.getElementById('contact-section');
                    contactSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                  Contact Us
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.section 
          ref={featuresRef}
          className="mt-16 sm:mt-20 md:mt-24 lg:mt-32"
          initial={{ opacity: 0 }}
          animate={featuresInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12 sm:mb-16">
            <motion.h2 
              className="font-instrument text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal gradient-text mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2 }}
            >
              Advanced Capabilities
            </motion.h2>
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0"
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3 }}
            >
              Unlock the full potential of AI-driven structural biology and computational drug discovery
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
                <div className={`glass-card-${feature.color} glass-floating p-6 sm:p-8 h-full relative overflow-hidden shimmer interactive-card`}>
                  <div className="relative z-10">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 mb-4 sm:mb-6 text-center sm:text-left">
                      <div className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-${feature.color}/10 flex-shrink-0`}>
                        <feature.icon className={`h-6 w-6 sm:h-8 sm:w-8 text-${feature.color}`} />
                      </div>
                      <h3 className="font-instrument text-xl sm:text-2xl font-semibold text-foreground">
                        {feature.title}
                      </h3>
                    </div>
                    
                    <div className="mb-4 sm:mb-6 rounded-xl overflow-hidden">
                      <motion.img 
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-40 sm:h-48 object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.7 }}
                      />
                    </div>
                    
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-center sm:text-left">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Watch it in Action Section */}
        <motion.section 
          ref={videoRef}
          className="mt-16 sm:mt-20 md:mt-24 lg:mt-32"
          initial={{ opacity: 0 }}
          animate={videoInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12 sm:mb-16">
            <motion.h2 
              className="font-instrument text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal gradient-text mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={videoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2 }}
            >
              Watch it in Action
            </motion.h2>
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0"
              initial={{ opacity: 0, y: 20 }}
              animate={videoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3 }}
            >
              See how LiteFold transforms protein research with AI-powered insights and intuitive workflows
            </motion.p>
          </div>

          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={videoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.4 }}
          >
            <Dialog>
              <DialogTrigger asChild>
                <motion.div
                  className="relative group cursor-pointer rounded-2xl overflow-hidden glass-card-primary interactive-card"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative aspect-video">
                    <img
                      src={videoThumbnail}
                      alt="LiteFold Platform Demo"
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay with play button */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                      <motion.div
                        className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-4 group-hover:bg-white/20 transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Play className="h-12 w-12 text-white fill-current" />
                      </motion.div>
                    </div>
                    
                    {/* Bottom gradient for text overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                      <h3 className="text-white text-xl font-semibold mb-2">Platform Demo</h3>
                      <p className="text-white/90 text-sm">Discover the power of AI-driven protein research</p>
                    </div>
                  </div>
                </motion.div>
              </DialogTrigger>
              
              <DialogContent className="max-w-4xl w-[95vw] h-[95vh] max-h-[600px] p-0">
                <div className="aspect-video w-full h-full">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="LiteFold Platform Demo"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
        </motion.section>

        {/* Research & Publications Section */}
        <motion.section 
          ref={researchRef}
          className="mt-16 sm:mt-20 md:mt-24 lg:mt-32"
          initial={{ opacity: 0 }}
          animate={researchInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12 sm:mb-16">
            <motion.h2 
              className="font-instrument text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal gradient-text mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={researchInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2 }}
            >
              Research & Insights
            </motion.h2>
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0"
              initial={{ opacity: 0, y: 20 }}
              animate={researchInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3 }}
            >
              Explore the cutting-edge research driving our platform forward
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <motion.div 
              className="group"
              initial={{ opacity: 0, x: -30 }}
              animate={researchInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <div className="glass-card-primary glass-floating p-6 sm:p-8 h-full relative overflow-hidden shimmer interactive-card">
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="h-1 w-16 sm:w-20 bg-gradient-to-r from-primary to-accent rounded-full group-hover:w-24 sm:group-hover:w-32 transition-all duration-500"></div>
                    <span className="text-xs uppercase tracking-wider font-medium glass-card px-2 sm:px-3 py-1 sm:py-2 text-primary">Educational</span>
                  </div>
                  
                  <h3 className="font-instrument text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4 text-foreground group-hover:gradient-text transition-all duration-300">
                    Structural Biology & AlphaFold Revolution
                  </h3>
                  
                  <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                    Deep dive into the transformative impact of AI-driven protein structure prediction 
                    and its revolutionary applications in modern drug discovery.
                  </p>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 interactive-card"
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
              <div className="glass-card-accent glass-floating p-6 sm:p-8 h-full relative overflow-hidden shimmer interactive-card">
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="h-1 w-16 sm:w-20 bg-gradient-to-r from-accent to-primary rounded-full group-hover:w-24 sm:group-hover:w-32 transition-all duration-500"></div>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      <span className="text-xs uppercase tracking-wider font-medium glass-card px-2 sm:px-3 py-1 sm:py-2 text-accent">Platform</span>
                      <span className="text-xs uppercase tracking-wider font-medium glass-card px-2 sm:px-3 py-1 sm:py-2 text-primary">Innovation</span>
                    </div>
                  </div>
                  
                  <h3 className="font-instrument text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4 text-foreground group-hover:gradient-text transition-all duration-300">
                    LiteFold: Democratizing Protein Science
                  </h3>
                  
                  <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                    Discover how LiteFold is making advanced protein folding tools accessible to researchers 
                    worldwide, accelerating breakthroughs in biotechnology and medicine.
                  </p>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      className="bg-accent hover:bg-accent/90 text-accent-foreground flex items-center gap-2 interactive-card"
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
          className="mt-16 sm:mt-20 md:mt-24 lg:mt-32 text-center px-4 sm:px-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={ctaInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="glass-card-primary glass-floating p-8 sm:p-12 inline-block scale-in max-w-4xl mx-auto">
            <motion.h3 
              className="font-instrument text-xl sm:text-2xl lg:text-3xl font-semibold gradient-text mb-3 sm:mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4 }}
            >
              Ready to Transform Your Research?
            </motion.h3>
            <motion.p 
              className="text-base sm:text-lg text-muted-foreground mb-6 max-w-2xl mx-auto"
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
                className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg interactive-card w-full sm:w-auto"
                onClick={() => window.open("https://litefold.vercel.app", "_blank")}
              >
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
                Get Started Now
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Contact Form Section */}
        <motion.section
          id="contact-section"
          ref={contactRef}
          className="mt-16 sm:mt-20 md:mt-24 lg:mt-32"
          initial={{ opacity: 0 }}
          animate={contactInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12 sm:mb-16 px-4 sm:px-0">
            <motion.h2 
              className="font-instrument text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal gradient-text mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2 }}
            >
              Get in Touch
            </motion.h2>
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3 }}
            >
              Ready to accelerate your protein research? Let's discuss how LiteFold can transform your computational biology workflow.
            </motion.p>
          </div>

          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.4 }}
          >
            <div className="glass-card-primary glass-floating p-6 sm:p-8 lg:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
                {/* Contact Information */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={contactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ delay: 0.5 }}
                >
                  <h3 className="font-instrument text-2xl font-semibold text-foreground mb-6">
                    Let's Collaborate
                  </h3>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    Whether you're a researcher, institution, or biotech company, we're here to help you leverage the power of AI for protein engineering and drug discovery.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-2xl bg-primary/10">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">Email</h4>
                        <p className="text-muted-foreground">hello@litefold.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-2xl bg-accent/10">
                        <MessageSquare className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">Research Inquiries</h4>
                        <p className="text-muted-foreground">research@litefold.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-2xl bg-primary/10">
                        <Target className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">Partnerships</h4>
                        <p className="text-muted-foreground">partnerships@litefold.com</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={contactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                  transition={{ delay: 0.6 }}
                >
                  <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          First Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <input
                            type="text"
                            className="w-full pl-10 pr-4 py-3 glass-card border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                            placeholder="John"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 glass-card border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <input
                          type="email"
                          className="w-full pl-10 pr-4 py-3 glass-card border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Organization
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 glass-card border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                        placeholder="University or Company"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Research Interest
                      </label>
                      <select className="w-full px-4 py-3 glass-card border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all">
                        <option>Protein Folding</option>
                        <option>Drug Discovery</option>
                        <option>Molecular Dynamics</option>
                        <option>Structure Analysis</option>
                        <option>AI Integration</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Message
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <textarea
                          rows={4}
                          className="w-full pl-10 pr-4 py-3 glass-card border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none"
                          placeholder="Tell us about your research goals and how we can help..."
                        />
                      </div>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center gap-2 px-8 py-4 text-lg interactive-card"
                      >
                        <Send className="h-5 w-5" />
                        Send Message
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </motion.div>
                  </form>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.section>
      </main>

      {/* Footer Section */}
      <footer className="relative z-10 mt-24 lg:mt-32">
        <div className="glass-card-primary border-t border-gray-200/50">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
              
              {/* Company Info */}
              <div className="lg:col-span-1">
                <motion.div 
                  className="flex items-center space-x-4 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                                     <motion.div
                     className="relative"
                     whileHover={{ rotate: 5 }}
                     transition={{ duration: 0.3 }}
                   >
                     <img 
                       src="/assets/logo.png" 
                       alt="LiteFold Logo" 
                       className="w-16 h-16 object-contain"
                     />
                   </motion.div>
                   <h3 className="font-instrument text-3xl font-bold gradient-text">
                     LiteFold
                   </h3>
                </motion.div>
                
                <motion.p 
                  className="text-muted-foreground leading-relaxed mb-6 max-w-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  AI native In-silico protein research and lead design environment. 
                  Accelerating breakthroughs in computational biology and drug discovery.
                </motion.p>
                
                <motion.div 
                  className="flex space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <motion.a
                    href="https://github.com/Anindyadeep/litefold"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 glass-card hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 rounded-lg group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </motion.a>
                  <motion.a
                    href="#"
                    className="p-2 glass-card hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 rounded-lg group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Twitter className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </motion.a>
                  <motion.a
                    href="#"
                    className="p-2 glass-card hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 rounded-lg group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </motion.a>
                </motion.div>
              </div>

              {/* Platform Links */}
              <div>
                <motion.h4 
                  className="font-instrument text-lg font-semibold text-foreground mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  Platform
                </motion.h4>
                <motion.ul 
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <li>
                    <a 
                      href="https://litefold.vercel.app" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                    >
                      Launch Platform
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://github.com/Anindyadeep/litefold#readme" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                    >
                      Documentation
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://github.com/Anindyadeep/litefold/releases" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                    >
                      Releases
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#" 
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      API Reference
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#" 
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      Tutorials
                    </a>
                  </li>
                </motion.ul>
              </div>

              {/* Research & Resources */}
              <div>
                <motion.h4 
                  className="font-instrument text-lg font-semibold text-foreground mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  Research & Resources
                </motion.h4>
                <motion.ul 
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <li>
                    <a 
                      href="https://copper-jasper-ae1.notion.site/Structural-biology-and-AlphaFold-1be76f0a4c39807a987de3733d61114e" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                    >
                      Research Papers
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://copper-jasper-ae1.notion.site/LiteFold-Folding-experiments-just-got-more-accessible-1d976f0a4c3980f5bc81c82f543330b9" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                    >
                      Blog Posts
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#" 
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      Case Studies
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#" 
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      White Papers
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#" 
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      Community
                    </a>
                  </li>
                </motion.ul>
              </div>

              {/* Contact & Support */}
              <div>
                <motion.h4 
                  className="font-instrument text-lg font-semibold text-foreground mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  Contact & Support
                </motion.h4>
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-primary" />
                    <a 
                      href="mailto:hello@litefold.com"
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      hello@litefold.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-4 w-4 text-accent" />
                    <a 
                      href="mailto:research@litefold.com"
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      research@litefold.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Global Remote</span>
                  </div>
                  
                  <div className="pt-4">
                    <motion.button
                      onClick={() => {
                        const contactSection = document.getElementById('contact-section');
                        contactSection?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-primary hover:text-primary/80 transition-colors duration-300 font-medium flex items-center gap-2 group"
                      whileHover={{ x: 5 }}
                    >
                      Get in Touch
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Bottom Section */}
            <motion.div 
              className="border-t border-gray-200/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <p className="text-muted-foreground text-sm">
                  © 2024 LiteFold. All rights reserved.
                </p>
                <div className="flex items-center gap-6 text-sm">
                  <a 
                    href="#" 
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    Privacy Policy
                  </a>
                  <a 
                    href="#" 
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    Terms of Service
                  </a>
                  <a 
                    href="#" 
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    Cookie Policy
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground text-sm">Made with</span>
                <div className="flex items-center gap-2">
                  <Atom className="h-4 w-4 text-primary animate-pulse" />
                  <span className="text-muted-foreground text-sm">for science</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;