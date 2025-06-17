
import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleScroll = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/c237c354-fb60-431c-acd3-e1182e9cc834.png" 
              alt="DevotedZen Web Logo" 
              className="h-8 w-auto sm:h-10"
            />
            <span className="text-white font-bold text-lg sm:text-xl hidden sm:block">DevotedZen Web</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <button onClick={() => handleScroll('hero')} className="text-white hover:text-red-500 transition-colors">Home</button>
            
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
                  className="absolute top-full left-0 mt-2 w-48 bg-black border border-gray-800 rounded-md shadow-lg z-50"
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <button onClick={() => handleScroll('services')} className="block w-full text-left px-4 py-2 text-white hover:bg-gray-800 hover:text-red-500">Web Design</button>
                  <button onClick={() => handleScroll('services')} className="block w-full text-left px-4 py-2 text-white hover:bg-gray-800 hover:text-red-500">Development</button>
                  <button onClick={() => handleScroll('services')} className="block w-full text-left px-4 py-2 text-white hover:bg-gray-800 hover:text-red-500">School Websites</button>
                  <button onClick={() => handleScroll('services')} className="block w-full text-left px-4 py-2 text-white hover:bg-gray-800 hover:text-red-500">Hotel Websites</button>
                  <button onClick={() => handleScroll('services')} className="block w-full text-left px-4 py-2 text-white hover:bg-gray-800 hover:text-red-500">Restaurant Websites</button>
                </div>
              )}
            </div>
            
            <button onClick={() => handleScroll('portfolio')} className="text-white hover:text-red-500 transition-colors">Portfolio</button>
            <button onClick={() => handleScroll('about')} className="text-white hover:text-red-500 transition-colors">About</button>
            <button onClick={() => handleScroll('pricing')} className="text-white hover:text-red-500 transition-colors">Pricing</button>
            <button onClick={() => handleScroll('contact')} className="text-white hover:text-red-500 transition-colors">Contact</button>
            
            <Button onClick={() => handleScroll('contact')} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-sm lg:px-6 lg:py-2 lg:text-base rounded-full">
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
              <button onClick={() => handleScroll('hero')} className="block w-full text-left px-3 py-2 text-white hover:text-red-500">Home</button>
              <button onClick={() => handleScroll('services')} className="block w-full text-left px-3 py-2 text-white hover:text-red-500">Services</button>
              <button onClick={() => handleScroll('portfolio')} className="block w-full text-left px-3 py-2 text-white hover:text-red-500">Portfolio</button>
              <button onClick={() => handleScroll('about')} className="block w-full text-left px-3 py-2 text-white hover:text-red-500">About</button>
              <button onClick={() => handleScroll('pricing')} className="block w-full text-left px-3 py-2 text-white hover:text-red-500">Pricing</button>
              <button onClick={() => handleScroll('contact')} className="block w-full text-left px-3 py-2 text-white hover:text-red-500">Contact</button>
              <div className="px-3 py-2">
                <Button onClick={() => handleScroll('contact')} className="w-full bg-red-500 hover:bg-red-600 text-white rounded-full">
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
