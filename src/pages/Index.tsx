import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { Dna, Microscope, Zap, Target, ArrowRight, Sparkles } from "lucide-react";
import proteinHero from "@/assets/protein-hero.jpg";
import dnaStructure from "@/assets/dna-structure.jpg";
import drugDocking from "@/assets/drug-docking.jpg";
import proteinFolding from "@/assets/protein-folding.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary/3 rounded-full blur-2xl float" />
      </div>

      {/* Navigation */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-50 w-full max-w-7xl mx-auto py-6 md:py-8 px-4 md:px-8"
      >
        <div className="glass-card glass-highlight p-4 flex flex-col sm:flex-row items-center gap-4 sm:gap-0 sm:justify-between">
          <motion.div 
            className="flex items-center space-x-0 -mr-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.img 
              src="/assets/logo.png" 
              alt="LiteFold Logo" 
              style={{ width: '80px', height: '80px', objectFit: 'contain' }} 
              className="md:w-[120px] md:h-[120px] glow-primary"
              animate={{ rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <h1 className="font-instrument text-3xl md:text-5xl font-normal gradient-text">
              LiteFold
            </h1>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="outline"
              className="glass border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary/50 flex items-center gap-2 text-sm md:text-base px-4 py-3 md:px-6 md:py-4 glow-primary"
              onClick={() => window.open("https://github.com/Anindyadeep/litefold", "_blank")}
            >
              <FaGithub className="h-4 w-4 md:h-5 md:w-5" />
              <span className="hidden sm:inline">Star on GitHub</span>
              <span className="sm:hidden">Star</span>
            </Button>
          </motion.div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 glass-card px-4 py-2 text-sm text-primary font-medium"
              >
                <Sparkles className="h-4 w-4" />
                AI-Powered Structural Biology
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-instrument text-4xl sm:text-5xl lg:text-7xl font-normal text-foreground leading-tight"
              >
                Making{" "}
                <span className="gradient-text">protein engineering</span>{" "}
                more accessible
              </motion.h1>

              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="font-mono text-xl sm:text-2xl lg:text-3xl text-accent font-medium tracking-tight"
              >
                Starting with Drug Design & Folding
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl"
              >
                LiteFold is an open-source protein structure prediction and visualization server, 
                designed to accelerate AI-powered drug discovery with cutting-edge computational tools.
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 px-8 py-6 text-lg glow-primary pulse-glow"
                  onClick={() => window.open("https://litefold.vercel.app", "_blank")}
                >
                  <Target className="h-5 w-5" />
                  Try LiteFold
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
                  className="glass border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary/50 flex items-center gap-2 px-8 py-6 text-lg"
                  onClick={() => window.open("https://github.com/Anindyadeep/litefold", "_blank")}
                >
                  <FaGithub className="h-5 w-5" />
                  View Source
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Hero Image */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="glass-card glass-highlight overflow-hidden float">
              <img 
                src={proteinHero}
                alt="Protein Structure Visualization"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-24 lg:mt-32"
        >
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="font-instrument text-3xl lg:text-5xl font-normal gradient-text mb-4"
            >
              Cutting-Edge Capabilities
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Harness the power of AI for revolutionary drug discovery and protein engineering
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Dna,
                title: "Protein Folding",
                description: "Advanced AlphaFold integration for accurate structure prediction",
                image: proteinFolding,
                delay: 1.1
              },
              {
                icon: Target,
                title: "Drug Docking",
                description: "Molecular docking simulations for drug-target interactions",
                image: drugDocking,
                delay: 1.2
              },
              {
                icon: Microscope,
                title: "Structure Analysis",
                description: "Comprehensive structural biology tools and visualization",
                image: dnaStructure,
                delay: 1.3
              }
            ].map((feature) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: feature.delay, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="glass-card glass-highlight p-8 h-full relative overflow-hidden shimmer">
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-2xl bg-primary/10 glow-primary">
                        <feature.icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="font-instrument text-2xl font-semibold text-foreground">
                        {feature.title}
                      </h3>
                    </div>
                    
                    <div className="mb-6 rounded-xl overflow-hidden">
                      <img 
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
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

        {/* Blog Section */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-24 lg:mt-32"
        >
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="font-instrument text-3xl lg:text-5xl font-normal gradient-text mb-4"
            >
              Latest Research
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Dive deep into the science behind protein engineering and drug design
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="glass-card glass-highlight p-8 h-full relative overflow-hidden shimmer">
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                    <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full group-hover:w-32 transition-all duration-500"></div>
                    <span className="text-xs uppercase tracking-wider font-medium glass-card px-3 py-2 text-primary">Educational</span>
                  </div>
                  
                  <h3 className="font-instrument text-2xl lg:text-3xl font-semibold mb-4 text-foreground group-hover:gradient-text transition-all duration-300">
                    Structural Biology and AlphaFold
                  </h3>
                  
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    Exploring the revolution in protein structure prediction and its impact on drug discovery
                  </p>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 glow-primary"
                      onClick={() => window.open("https://copper-jasper-ae1.notion.site/Structural-biology-and-AlphaFold-1be76f0a4c39807a987de3733d61114e", "_blank")}
                    >
                      <Zap className="h-4 w-4" />
                      Read Article
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="glass-card glass-highlight p-8 h-full relative overflow-hidden shimmer">
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                    <div className="h-1 w-20 bg-gradient-to-r from-accent to-primary rounded-full group-hover:w-32 transition-all duration-500"></div>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs uppercase tracking-wider font-medium glass-card px-3 py-2 text-accent">Platform</span>
                      <span className="text-xs uppercase tracking-wider font-medium glass-card px-3 py-2 text-primary">Launch</span>
                    </div>
                  </div>
                  
                  <h3 className="font-instrument text-2xl lg:text-3xl font-semibold mb-4 text-foreground group-hover:gradient-text transition-all duration-300">
                    LiteFold: Making Folding Accessible
                  </h3>
                  
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    Learn how LiteFold is democratizing protein folding and accelerating drug discovery
                  </p>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      className="bg-accent hover:bg-accent/90 text-accent-foreground flex items-center gap-2 glow-accent"
                      onClick={() => window.open("https://copper-jasper-ae1.notion.site/LiteFold-Folding-experiments-just-got-more-accessible-1d976f0a4c3980f5bc81c82f543330b9", "_blank")}
                    >
                      <Target className="h-4 w-4" />
                      Read Article
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0 }}
          className="mt-24 lg:mt-32 text-center"
        >
          <div className="glass-card glass-highlight p-8 inline-block">
            <p className="text-muted-foreground text-lg">
              More groundbreaking features coming soon...
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Index;