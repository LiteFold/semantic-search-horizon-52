import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const navItems = [
    { 
      name: "Platform", 
      href: "https://litefold.vercel.app",
      external: true 
    },
    { 
      name: "Research", 
      href: "https://copper-jasper-ae1.notion.site/Structural-biology-and-AlphaFold-1be76f0a4c39807a987de3733d61114e",
      external: true 
    },
    { 
      name: "Blogs", 
      href: "https://copper-jasper-ae1.notion.site/LiteFold-Folding-experiments-just-got-more-accessible-1d976f0a4c3980f5bc81c82f543330b9",
      external: true 
    },
    { 
      name: "Releases", 
      href: "https://github.com/Anindyadeep/litefold/releases",
      external: true 
    },
    { 
      name: "Documentation", 
      href: "https://github.com/Anindyadeep/litefold#readme",
      external: true 
    },
  ];

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 left-0 right-0 z-50 flex justify-center"
    >
      <motion.nav 
        className="glass-nav-container px-6 py-3 flex items-center justify-between w-full max-w-6xl mx-4"
        animate={{
          backgroundColor: isScrolled 
            ? "rgba(255, 255, 255, 0.95)" 
            : "rgba(255, 255, 255, 0.85)",
          backdropFilter: isScrolled ? "blur(24px)" : "blur(20px)",
          boxShadow: isScrolled
            ? "0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
            : "0 4px 24px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Logo Section */}
        <motion.div 
          className="flex items-center space-x-4"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
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
          
          <motion.h1 
            className="font-instrument text-4xl font-bold gradient-text"
            whileHover={{ scale: 1.02 }}
          >
            LiteFold
          </motion.h1>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              target={item.external ? "_blank" : "_self"}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="relative text-gray-700 hover:text-gray-900 transition-colors duration-300 font-medium text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -1 }}
            >
              {item.name}
              <motion.div 
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"
                whileHover={{ width: "100%" }}
              />
            </motion.a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="outline"
              size="sm"
              className="glass-button border-gray-300 text-gray-700 hover:text-gray-900 hover:border-gray-400 flex items-center gap-2 text-sm px-4 py-2 rounded-full font-medium transition-all duration-300"
              onClick={() => window.open("https://github.com/Anindyadeep/litefold", "_blank")}
            >
              <FaGithub className="h-4 w-4" />
              <span>Star</span>
            </Button>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="lg:hidden flex items-center justify-center w-10 h-10 glass-button rounded-full"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: isMenuOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5 text-gray-700" />
            ) : (
              <Menu className="h-5 w-5 text-gray-700" />
            )}
          </motion.div>
        </motion.button>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ 
          opacity: isMenuOpen ? 1 : 0,
          scale: isMenuOpen ? 1 : 0.95,
          y: isMenuOpen ? 0 : -20
        }}
        transition={{ duration: 0.3 }}
        className={`absolute top-full left-0 right-0 mt-4 glass-nav-container overflow-hidden lg:hidden ${
          isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div className="p-6 space-y-4">
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              target={item.external ? "_blank" : "_self"}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="block text-gray-700 hover:text-gray-900 transition-colors duration-300 font-medium text-base py-2 px-4 rounded-lg hover:bg-gray-100/50"
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: isMenuOpen ? 1 : 0,
                x: isMenuOpen ? 0 : -20
              }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </motion.a>
          ))}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: isMenuOpen ? 1 : 0,
              x: isMenuOpen ? 0 : -20
            }}
            transition={{ delay: navItems.length * 0.1 }}
            className="pt-4 border-t border-gray-200"
          >
            <Button 
              variant="outline"
              className="w-full glass-button border-gray-300 text-gray-700 hover:text-gray-900 hover:border-gray-400 flex items-center justify-center gap-2 text-base px-6 py-3 rounded-full"
              onClick={() => {
                window.open("https://github.com/Anindyadeep/litefold", "_blank");
                setIsMenuOpen(false);
              }}
            >
              <FaGithub className="h-5 w-5" />
              Star on GitHub
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Navigation; 