
import React from 'react';
import { Heart, Code, Palette, Zap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              WebCraft Agency
            </h3>
            <p className="text-gray-400 mb-6 max-w-md">
              Creating stunning websites for schools, hotels, restaurants, and small businesses. 
              Transform your digital presence with our expert web design and development services.
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Code className="h-4 w-4 text-blue-400" />
                <span>Custom Development</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Palette className="h-4 w-4 text-purple-400" />
                <span>Creative Design</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Zap className="h-4 w-4 text-pink-400" />
                <span>Fast Delivery</span>
              </div>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Educational Websites</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Hotel & Hospitality</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Restaurant Websites</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Small Business</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mobile Responsive</a></li>
              <li><a href="#" className="hover:text-white transition-colors">SEO Optimization</a></li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Portfolio</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 flex items-center justify-center gap-2">
            Made with <Heart className="h-4 w-4 text-red-500" /> by WebCraft Agency © 2024. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
