
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleScroll = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleStartProject = () => {
    setShowProjectForm(true);
    setIsMenuOpen(false);
  };

  return (
    <>
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
              <button onClick={() => handleScroll('home')} className="text-white hover:text-red-500 transition-colors">Home</button>
              <button onClick={() => handleScroll('portfolio')} className="text-white hover:text-red-500 transition-colors">Portfolio</button>
              <button onClick={() => handleScroll('about')} className="text-white hover:text-red-500 transition-colors">About</button>
              <button onClick={() => handleScroll('pricing')} className="text-white hover:text-red-500 transition-colors">Pricing</button>
              <button onClick={() => handleScroll('testimonials')} className="text-white hover:text-red-500 transition-colors">Testimonials</button>
              <button onClick={() => handleScroll('contact')} className="text-white hover:text-red-500 transition-colors">Contact</button>
              
              <Button onClick={handleStartProject} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-sm lg:px-6 lg:py-2 lg:text-base rounded-full">
                Start Your Project
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
                <button onClick={() => handleScroll('home')} className="block w-full text-left px-3 py-2 text-white hover:text-red-500">Home</button>
                <button onClick={() => handleScroll('portfolio')} className="block w-full text-left px-3 py-2 text-white hover:text-red-500">Portfolio</button>
                <button onClick={() => handleScroll('about')} className="block w-full text-left px-3 py-2 text-white hover:text-red-500">About</button>
                <button onClick={() => handleScroll('pricing')} className="block w-full text-left px-3 py-2 text-white hover:text-red-500">Pricing</button>
                <button onClick={() => handleScroll('testimonials')} className="block w-full text-left px-3 py-2 text-white hover:text-red-500">Testimonials</button>
                <button onClick={() => handleScroll('contact')} className="block w-full text-left px-3 py-2 text-white hover:text-red-500">Contact</button>
                <div className="px-3 py-2">
                  <Button onClick={handleStartProject} className="w-full bg-red-500 hover:bg-red-600 text-white rounded-full">
                    Start Your Project
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Project Form Modal/Overlay */}
      {showProjectForm && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="h-full overflow-y-auto">
            {React.createElement(
              require('./ProjectRequestForm').default || (() => <div>Loading...</div>), 
              { onBack: () => setShowProjectForm(false) }
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
