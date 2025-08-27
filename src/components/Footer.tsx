
import React from 'react';
import { Heart, Code, Palette, Zap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/lovable-uploads/97537c12-5e95-41fd-b413-ebd9803ded0c.png" 
                alt="DevotedZen Web Logo" 
                className="h-8 w-auto"
              />
              <h3 className="text-2xl font-bold">
                <span className="text-white">DevotedZen</span>{' '}
                <span className="text-red-500">Web</span>
              </h3>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Creating stunning websites for schools, hotels, restaurants, and small businesses. 
              Transform your digital presence with our expert web design and development services.
            </p>
            <div className="text-gray-400 mb-6">
              <p className="font-medium text-white mb-1">Address:</p>
              <p>Kohalpur-2, Banke</p>
              <p>Birendranagar-10, Surkhet</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Code className="h-4 w-4 text-red-500" />
                <span>Custom Development</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Palette className="h-4 w-4 text-white" />
                <span>Creative Design</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Zap className="h-4 w-4 text-red-500" />
                <span>Fast Delivery</span>
              </div>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-red-500 transition-colors">Educational Websites</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Hotel & Hospitality</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Restaurant Websites</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Small Business</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Mobile Responsive</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">SEO Optimization</a></li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-red-500 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Portfolio</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Services</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 flex items-center justify-center gap-2">
            Made with <Heart className="h-4 w-4 text-red-500" /> by DevotedZen Web © 2024. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
