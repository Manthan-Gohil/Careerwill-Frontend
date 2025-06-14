import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Check if user has scrolled to bottom (with 50px threshold)
      const isAtBottom = scrollTop + windowHeight >= documentHeight - 50;
      setIsExpanded(isAtBottom);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-50">

      {/* Footer */}
      <footer 
        className={`fixed bottom-0 left-0 right-0 bg-gradient-to-r from-slate-800 to-slate-900 text-white transition-all duration-500 ease-in-out z-50 ${
          isExpanded ? 'h-64' : 'h-12'
        }`}
      >
        {/* Collapsed state - small strip */}
        <div className={`${isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'} transition-opacity duration-300 flex items-center justify-center h-12 absolute inset-0`}>
          <p className="text-sm text-gray-300">
            © 2025 Your Company. Scroll to bottom to see more
          </p>
        </div>

        {/* Expanded state - full footer */}
        <div className={`${isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-500 delay-200 p-6 h-full overflow-hidden absolute inset-0`}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-full">
            
            {/* Company Info */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">Your Company</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Building amazing experiences with cutting-edge technology and innovative solutions.
              </p>
              <div className="flex space-x-3">
                <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Linkedin className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Services</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">Office Address</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">A-16, Careerwill Information Center Pvt. Ltd.</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">MNear Metro pillar no-80,</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Panchwati, Adarsh Nagar</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Delhi - 110033</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">Contact</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">info@careerwill.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">+91-7082189797</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">Delhi, India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright at bottom */}
          <div className="absolute bottom-2 left-6 right-6 pt-4 border-t border-gray-700">
            <p className="text-xs text-gray-400 text-center">
              Copyright © Career Will 2025. All Right Reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;