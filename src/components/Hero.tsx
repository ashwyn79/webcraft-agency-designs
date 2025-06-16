
import React from 'react';
import { ArrowRight, Code, Palette, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen bg-black overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_40%,rgba(239,68,68,0.1),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.05),transparent_50%)]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-screen text-center text-white pt-16">
          <div className="animate-fade-in">
            {/* Logo Section */}
            <div className="mb-8">
              <img 
                src="/lovable-uploads/97537c12-5e95-41fd-b413-ebd9803ded0c.png" 
                alt="DevotedZen Web Logo" 
                className="h-20 w-auto mx-auto mb-4"
              />
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6">
              <span className="text-white">DevotedZen</span>{' '}
              <span className="text-red-500">Web</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl px-4">
              We create stunning websites for schools, hotels, restaurants, and small businesses. 
              Transform your digital presence with our expert web design and development services.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 px-4">
              <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-full transition-all duration-300">
                View Our Work
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 text-center px-4">
              <div className="flex items-center justify-center gap-2 mb-4 sm:mb-0">
                <Code className="h-6 w-6 text-red-500" />
                <span className="text-sm">Custom Development</span>
              </div>
              <div className="flex items-center justify-center gap-2 mb-4 sm:mb-0">
                <Palette className="h-6 w-6 text-white" />
                <span className="text-sm">Creative Design</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Zap className="h-6 w-6 text-red-500" />
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
