import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Menu, X, ChevronDown, MessageSquare, Settings, LogOut, LayoutDashboard } from 'lucide-react';

const Navbar = ({ isAdmin, setIsAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleLogout = () => {
    setIsAdmin(false);
    // Note: localStorage is not available in Claude artifacts, but keeping for reference
    // localStorage.removeItem('adminToken');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
        setHoveredCategory(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMouseEnter = (itemName) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(itemName);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setHoveredCategory(null);
    }, 100); // Small delay to allow moving to dropdown
  };

  const handleDropdownMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleDropdownMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setHoveredCategory(null);
    }, 100);
  };

  const handleResourcesClick = (e) => {
    e.preventDefault();
    setActiveDropdown(activeDropdown === 'Resources' ? null : 'Resources');
  };

  const navItems = [
    { name: 'Home', href: '/', hasDropdown: false },
    { 
      name: 'All Courses', 
      href: '#', 
      hasDropdown: true,
      isMegaMenu: true
    },
    { 
      name: 'Resources', 
      href: '#', 
      hasDropdown: true,
      dropdownItems: [
        { name: 'Online School', href: '/online-school' },
        { name: 'Test Series', href: '/test-series' },
        { name: 'App', href: '/app' },
        { name: 'Blog', href: '/blog' }
      ]
    },
    { name: 'About', href: '/about', hasDropdown: false },
    { name: 'Contact', href: '/contact', hasDropdown: false }
  ];

  const courseCategories = [
    {
      name: 'Competitive Exams',
      description: 'IIT JEE, NEET, ESE, GATE, AE/JE, Olympiad',
      icon: '🏆',
      courses: [
        { name: 'IIT JEE', icon: '⚛️', href: '/courses/iit-jee' },
        { name: 'NEET', icon: '🧬', href: '/courses/neet' },
        { name: 'GATE', icon: '🔧', href: '/courses/gate' },
        { name: 'ESE', icon: '⚙️', href: '/courses/ese' },
        { name: 'Olympiad', icon: '🥇', href: '/courses/olympiad' }
      ]
    },
    {
      name: 'Only IAS',
      description: 'UPSC, State PSC',
      icon: '🏛️',
      courses: [
        { name: 'UPSC', icon: '🇮🇳', href: '/courses/upsc' },
        { name: 'State PSC', icon: '🏛️', href: '/courses/state-psc' }
      ]
    },
    {
      name: 'Govt Exam',
      description: 'SSC, Banking, Judiciary, Teaching, Railway, UP Exams, JAIIB & CAIIB, BIHAR EXAMS WALLAH, Nursing Exams, WB Exams, Defence',
      icon: '🏢',
      courses: [
        { name: 'SSC', icon: '📝', href: '/courses/ssc' },
        { name: 'Banking', icon: '🏦', href: '/courses/banking' },
        { name: 'Railway', icon: '🚂', href: '/courses/railway' },
        { name: 'Defence', icon: '⚔️', href: '/courses/defence' },
        { name: 'Teaching', icon: '👨‍🏫', href: '/courses/teaching' }
      ]
    },
    {
      name: 'UG & PG Entrance Exams',
      description: 'MBA, IPMAT, IIT JAM, CSIR NET, LAW, CUET, UGC NET, GMAT, Design & Architecture, CUET PG, NEET PG, Pharma',
      icon: '🎯',
      courses: [
        { name: 'MBA', icon: '💼', href: '/courses/mba' },
        { name: 'LAW', icon: '⚖️', href: '/courses/law' },
        { name: 'CUET', icon: '📖', href: '/courses/cuet' },
        { name: 'NEET PG', icon: '🩺', href: '/courses/neet-pg' },
        { name: 'Design & Architecture', icon: '🏗️', href: '/courses/design-architecture' }
      ]
    },
    {
      name: 'FINANCE',
      description: 'CA, CS, ACCA',
      icon: '💰',
      courses: [
        { name: 'CA', icon: '📊', href: '/courses/ca' },
        { name: 'CS', icon: '💼', href: '/courses/cs' },
        { name: 'ACCA', icon: '🌐', href: '/courses/acca' }
      ]
    }
  ];

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
          : 'bg-white/90 backdrop-blur-sm'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 group">
            <div className="relative">
              <BookOpen className="h-8 w-8 text-blue-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Careerwill
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1" ref={dropdownRef}>
            {navItems.map((item, index) => (
              <div key={item.name} className="relative group">
                {item.name === 'Resources' ? (
                  <button
                    onClick={handleResourcesClick}
                    className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 transition-all duration-200 rounded-lg hover:bg-blue-50 group"
                  >
                    <span className="font-medium">{item.name}</span>
                    <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                      activeDropdown === 'Resources' ? 'rotate-180' : ''
                    }`} />
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></div>
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 transition-all duration-200 rounded-lg hover:bg-blue-50 group"
                    onMouseEnter={() => item.hasDropdown && item.isMegaMenu && handleMouseEnter(item.name)}
                    onMouseLeave={() => item.hasDropdown && item.isMegaMenu && handleMouseLeave()}
                  >
                    <span className="font-medium">{item.name}</span>
                    {item.hasDropdown && (
                      <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                    )}
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></div>
                  </Link>
                )}

                {/* Regular Dropdown for Resources */}
                {item.name === 'Resources' && item.dropdownItems && activeDropdown === 'Resources' && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                    <div className="py-2">
                      {item.dropdownItems.map((dropdownItem, idx) => (
                        <Link
                          key={dropdownItem.name}
                          to={dropdownItem.href}
                          className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-150"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Mega Menu for All Courses */}
                {item.isMegaMenu && activeDropdown === item.name && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-screen max-w-4xl bg-white rounded-xl shadow-2xl border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200 z-50"
                    onMouseEnter={handleDropdownMouseEnter}
                    onMouseLeave={handleDropdownMouseLeave}
                    style={{ left: '-200px' }}
                  >
                    <div className="flex">
                      {/* Left Side - Course Categories */}
                      <div className="w-1/2 p-4 border-r border-gray-100">
                        {courseCategories.map((category, idx) => (
                          <div
                            key={category.name}
                            className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-150 group/item"
                            onMouseEnter={() => setHoveredCategory(category.name)}
                            style={{ animationDelay: `${idx * 50}ms` }}
                          >
                            <div className="flex items-start space-x-3">
                              <span className="text-xl group-hover/item:scale-110 transition-transform duration-200">
                                {category.icon}
                              </span>
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 group-hover/item:text-blue-600 transition-colors duration-150 flex items-center">
                                  {category.name}
                                  <ChevronDown className="ml-1 h-4 w-4 -rotate-90 group-hover/item:translate-x-1 transition-transform duration-200" />
                                </h3>
                                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                  {category.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      {/* Right Side - Sub Items */}
                      <div className="w-1/2 p-4">
                        {courseCategories.map((category) => (
                          hoveredCategory === category.name && (
                            <div key={`sub-${category.name}`} className="space-y-2">
                              <h4 className="font-semibold text-gray-900 text-lg mb-4 flex items-center">
                                <span className="mr-2">{category.icon}</span>
                                {category.name}
                              </h4>
                              <div className="grid grid-cols-1 gap-2">
                                {category.courses.map((course, subIdx) => (
                                  <Link
                                    key={course.name}
                                    to={course.href}
                                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-150 group/sub transform hover:translate-x-1"
                                    style={{ animationDelay: `${subIdx * 30}ms` }}
                                    onClick={() => {
                                      setActiveDropdown(null);
                                      setHoveredCategory(null);
                                    }}
                                  >
                                    <span className="text-lg group-hover/sub:scale-110 transition-transform duration-200">
                                      {course.icon}
                                    </span>
                                    <span className="font-medium">{course.name}</span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )
                        ))}
                        {!hoveredCategory && (
                          <div className="flex items-center justify-center h-full text-gray-400">
                            <div className="text-center">
                              <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
                              <p className="text-sm">Hover over a category to see courses</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Dashboard Icon */}
          <div className="hidden md:flex items-center">
            <Link
              to="/dashboard"
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
              title="Dashboard"
            >
              <LayoutDashboard className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
            </Link>
          </div>

          {/* Admin/Chatbot Actions */}
          <div className="hidden md:flex items-center space-x-4 ml-4">
            {isAdmin ? (
              <>
                <Link
                  to="/"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 flex items-center"
                >
                  <MessageSquare className="mr-1 h-4 w-4" />
                  Chatbot
                </Link>
                <button
                  onClick={handleLogout}
                  className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 flex items-center"
                >
                  <LogOut className="mr-1 h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/admin"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 flex items-center"
              >
                <Settings className="mr-1 h-4 w-4" />
                Admin Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
          >
            {isOpen ? (
              <X className="h-6 w-6 transform rotate-180 transition-transform duration-200" />
            ) : (
              <Menu className="h-6 w-6 transition-transform duration-200" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <div className="py-4 space-y-2">
            {navItems.map((item, index) => (
              <div key={item.name} className="space-y-2">
                <Link
                  to={item.href}
                  className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 transform hover:translate-x-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </div>
            ))}
            
            {/* Mobile Dashboard Link */}
            <div className="space-y-2">
              <Link
                to="/dashboard"
                className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 transform hover:translate-x-2"
                onClick={() => setIsOpen(false)}
              >
                <LayoutDashboard className="mr-3 h-5 w-5" />
                Dashboard
              </Link>
            </div>
            
            <div className="pt-4 border-t border-gray-200 space-y-3">
              {/* Admin/Chatbot Actions for mobile */}
              {isAdmin ? (
                <>
                  <Link
                    to="/"
                    className="block px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 flex items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    <MessageSquare className="mr-1 h-4 w-4" />
                    Chatbot
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 flex items-center"
                  >
                    <LogOut className="mr-1 h-4 w-4" />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/admin"
                  className="block px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <Settings className="mr-1 h-4 w-4" />
                  Admin Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;