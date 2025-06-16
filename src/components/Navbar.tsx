
import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/97537c12-5e95-41fd-b413-ebd9803ded0c.png" 
              alt="DevotedZen Web Logo" 
              className="h-10 w-auto"
            />
            <span className="text-white font-bold text-xl hidden sm:block">DevotedZen Web</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-white hover:text-red-500 transition-colors">Home</a>
            
            {/* Services Dropdown */}
            <div className="relative">
              <button 
                className="text-white hover:text-red-500 transition-colors flex items-center"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                Services <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {isServicesOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-48 bg-black border border-gray-800 rounded-md shadow-lg"
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <a href="#web-design" className="block px-4 py-2 text-white hover:bg-gray-800 hover:text-red-500">Web Design</a>
                  <a href="#development" className="block px-4 py-2 text-white hover:bg-gray-800 hover:text-red-500">Development</a>
                  <a href="#school-websites" className="block px-4 py-2 text-white hover:bg-gray-800 hover:text-red-500">School Websites</a>
                  <a href="#hotel-websites" className="block px-4 py-2 text-white hover:bg-gray-800 hover:text-red-500">Hotel Websites</a>
                  <a href="#restaurant-websites" className="block px-4 py-2 text-white hover:bg-gray-800 hover:text-red-500">Restaurant Websites</a>
                </div>
              )}
            </div>
            
            <a href="#portfolio" className="text-white hover:text-red-500 transition-colors">Portfolio</a>
            <a href="#about" className="text-white hover:text-red-500 transition-colors">About</a>
            <a href="#contact" className="text-white hover:text-red-500 transition-colors">Contact</a>
            
            <Button className="bg-red-500 hover:bg-red-600 text-white">
              Get Quote
            </Button>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black border-t border-gray-800">
              <a href="#home" className="block px-3 py-2 text-white hover:text-red-500">Home</a>
              <a href="#services" className="block px-3 py-2 text-white hover:text-red-500">Services</a>
              <a href="#portfolio" className="block px-3 py-2 text-white hover:text-red-500">Portfolio</a>
              <a href="#about" className="block px-3 py-2 text-white hover:text-red-500">About</a>
              <a href="#contact" className="block px-3 py-2 text-white hover:text-red-500">Contact</a>
              <div className="px-3 py-2">
                <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                  Get Quote
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
