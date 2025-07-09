import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="w-full max-w-6xl mx-auto py-6 md:py-8 px-4 md:px-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-0 sm:justify-between">
        <div className="flex items-center space-x-0 -mr-2">
          <img 
            src="/assets/logo.png" 
            alt="LiteFold Logo" 
            style={{ width: '80px', height: '80px', objectFit: 'contain' }} 
            className="md:w-[120px] md:h-[120px]"
          />
          <h1 className="font-instrument text-3xl md:text-5xl font-normal text-slate-900">LiteFold</h1>
        </div>
        <Button 
          variant="outline"
          className="border-slate-800 text-slate-800 hover:bg-slate-50 flex items-center gap-2 text-sm md:text-base px-3 py-2 md:px-4 md:py-2"
          onClick={() => window.open("https://github.com/Anindyadeep/litefold", "_blank")}
        >
          <FaGithub className="h-4 w-4 md:h-5 md:w-5" />
          <span className="hidden sm:inline">Star on GitHub</span>
          <span className="sm:hidden">Star</span>
        </Button>
      </header>

      {/* Hero Section */}
      <main className="w-full max-w-6xl mx-auto px-4 md:px-8 py-6 md:py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-16"
        >
          <h1 className="font-instrument text-4xl sm:text-5xl md:text-7xl font-normal text-teal-800 mb-4 md:mb-6 leading-tight max-w-4xl">
            Making AI powered structural biology more accessible
          </h1>
          <h2 className="font-mono text-xl sm:text-2xl md:text-3xl text-violet-600 font-medium mb-4 md:mb-8 max-w-3xl tracking-tight">
            Starting with Protein Folding
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-2xl leading-relaxed mb-6 md:mb-10">
            LiteFold is an open-source protein structure prediction
            and visualization server, designed to make AI-powered
            protein research easier with the best available tools.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <Button
              className="bg-slate-900 hover:bg-slate-800 text-white flex items-center gap-2 text-sm md:text-base px-4 py-3 md:px-6 md:py-6"
              onClick={() => window.open("https://github.com/Anindyadeep/litefold", "_blank")}
            >
              <FaGithub className="h-4 w-4 md:h-5 md:w-5" />
              <span>Star on GitHub</span>
            </Button>
            <Button
              className="bg-teal-700 hover:bg-teal-800 text-white text-sm md:text-base px-4 py-3 md:px-6 md:py-6"
              onClick={() => window.open("https://litefold.vercel.app", "_blank")}
            >
              Try out LiteFold
            </Button>
          </div>
        </motion.div>

        {/* Blog Section */}
        <section className="mt-16 md:mt-20">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-instrument text-3xl md:text-5xl font-normal text-slate-800 mb-6 md:mb-10"
          >
            Blogs
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 md:p-8 hover:shadow-md transition-all group flex flex-col h-full"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4 md:mb-6">
                <div className="h-2 w-20 bg-teal-600 rounded group-hover:w-32 transition-all"></div>
                <span className="text-xs uppercase tracking-wider font-medium bg-teal-50 text-teal-700 px-3 py-1 rounded-full">Educational</span>
              </div>
              <h3 className="font-instrument text-2xl md:text-3xl font-normal mb-3 md:mb-4 text-slate-800">Structural biology and AlphaFold</h3>
              <p className="text-base md:text-lg text-slate-600 mb-5 md:mb-8 flex-grow">Exploring the revolution in protein structure prediction</p>
              <div className="mt-auto">
                <Button
                  className="bg-violet-600 hover:bg-violet-700 text-white text-sm md:text-base px-4 py-2 md:px-6 md:py-5"
                  onClick={() => window.open("https://copper-jasper-ae1.notion.site/Structural-biology-and-AlphaFold-1be76f0a4c39807a987de3733d61114e", "_blank")}
                >
                  Read Article
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 md:p-8 hover:shadow-md transition-all group flex flex-col h-full"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4 md:mb-6">
                <div className="h-2 w-20 bg-violet-600 rounded group-hover:w-32 transition-all"></div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs uppercase tracking-wider font-medium bg-violet-50 text-violet-700 px-3 py-1 rounded-full">Platform</span>
                  <span className="text-xs uppercase tracking-wider font-medium bg-amber-50 text-amber-700 px-3 py-1 rounded-full">Launch</span>
                </div>
              </div>
              <h3 className="font-instrument text-2xl md:text-3xl font-normal mb-3 md:mb-4 text-slate-800">LiteFold, Folding experiments just got more accessible</h3>
              <p className="text-base md:text-lg text-slate-600 mb-5 md:mb-8 flex-grow">Learn how LiteFold is making protein folding more accessible</p>
              <div className="mt-auto">
                <Button
                  className="bg-teal-700 hover:bg-teal-800 text-white text-sm md:text-base px-4 py-2 md:px-6 md:py-5"
                  onClick={() => window.open("https://copper-jasper-ae1.notion.site/LiteFold-Folding-experiments-just-got-more-accessible-1d976f0a4c3980f5bc81c82f543330b9", "_blank")}
                >
                  Read Article
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="mt-16 md:mt-20 text-slate-400 text-sm md:text-base">More coming soon</div>
      </main>
    </div>
  );
};

export default Index;

