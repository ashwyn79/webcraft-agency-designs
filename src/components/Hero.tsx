
import React from 'react';
import { ArrowRight, Code, Palette, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,119,198,0.2),transparent_50%)]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-screen text-center text-white">
          <div className="animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              WebCraft Agency
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl px-4">
              We create stunning websites for schools, hotels, restaurants, and small businesses. 
              Transform your digital presence with our expert web design and development services.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 px-4">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-full transition-all duration-300">
                View Our Work
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 text-center px-4">
              <div className="flex items-center justify-center gap-2 mb-4 sm:mb-0">
                <Code className="h-6 w-6 text-blue-400" />
                <span className="text-sm">Custom Development</span>
              </div>
              <div className="flex items-center justify-center gap-2 mb-4 sm:mb-0">
                <Palette className="h-6 w-6 text-purple-400" />
                <span className="text-sm">Creative Design</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Zap className="h-6 w-6 text-pink-400" />
                <span className="text-sm">Fast Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
