import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Menu, X, ChevronDown, Search, User, Bell } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [hoveredCategory, setHoveredCategory] = useState(null);

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
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <BookOpen className="h-8 w-8 text-blue-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
             Careerwill
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <div key={item.name} className="relative group">
                {item.hasDropdown ? (
                  <button
                    className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 transition-all duration-200 rounded-lg hover:bg-blue-50 group"
                    onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <span className="font-medium">{item.name}</span>
                    <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></div>
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 transition-all duration-200 rounded-lg hover:bg-blue-50 group relative"
                  >
                    <span className="font-medium">{item.name}</span>
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></div>
                  </Link>
                )}

                {/* Mega Menu for Courses */}
                {item.isMegaMenu && activeDropdown === item.name && (
                  <div 
                    className="absolute top-full left-0 pt-2 w-screen max-w-4xl"
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <div className="bg-white rounded-xl shadow-2xl border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="flex">
                        {/* Left Side - Categories */}
                        <div className="w-1/2 p-4 border-r border-gray-100">
                          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <span className="mr-2">📚</span>
                            All Courses
                          </h3>
                          <div className="space-y-1">
                            {courseCategories.map((category, idx) => (
                              <div
                                key={category.name}
                                className={`p-3 rounded-lg cursor-pointer transition-all duration-200 border-l-4 ${
                                  hoveredCategory === category.name
                                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                                    : 'border-transparent hover:bg-gray-50'
                                }`}
                                onMouseEnter={() => setHoveredCategory(category.name)}
                                style={{ animationDelay: `${idx * 50}ms` }}
                              >
                                <div className="flex items-start space-x-3">
                                  <span className="text-xl">{category.icon}</span>
                                  <div className="flex-1">
                                    <h4 className="font-medium text-gray-800">{category.name}</h4>
                                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{category.description}</p>
                                  </div>
                                  <span className="text-gray-400">›</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Right Side - Specific Courses */}
                        <div className="w-1/2 p-4">
                          {hoveredCategory ? (
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                <span className="mr-2">{courseCategories.find(cat => cat.name === hoveredCategory)?.icon}</span>
                                {hoveredCategory}
                              </h3>
                              <div className="grid grid-cols-1 gap-2">
                                {courseCategories
                                  .find(cat => cat.name === hoveredCategory)
                                  ?.courses.map((course, idx) => (
                                  <Link
                                    key={course.name}
                                    to={course.href}
                                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-150 group"
                                    style={{ animationDelay: `${idx * 30}ms` }}
                                  >
                                    <span className="text-lg group-hover:scale-110 transition-transform duration-200">{course.icon}</span>
                                    <span className="font-medium">{course.name}</span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center h-full text-gray-400">
                              <div className="text-center">
                                <span className="text-4xl mb-2 block">👆</span>
                                <p>Hover over a category to see courses</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Regular Dropdown */}
                {item.hasDropdown && !item.isMegaMenu && activeDropdown === item.name && item.dropdownItems && (
                  <div 
                    className="absolute top-full left-0 pt-2 w-56"
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                      {item.dropdownItems.map((dropdownItem, idx) => (
                        <Link
                          key={dropdownItem.name}
                          to={dropdownItem.href}
                          className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-150 border-l-4 border-transparent hover:border-blue-600"
                          style={{ animationDelay: `${idx * 50}ms` }}
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Search & User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-200" />
              <input
                type="text"
                placeholder="Search courses..."
                className="pl-10 pr-4 py-2 w-64 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 focus:w-72"
              />
            </div>
            
            <button className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 group">
              <Bell className="h-5 w-5 group-hover:animate-pulse" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-bounce"></span>
            </button>
            
            <Link 
              to="/signin"
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
            >
              <User className="h-4 w-4" />
              <span className="font-medium">Sign In</span>
            </Link>
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
                {item.hasDropdown && item.dropdownItems && (
                  <div className="pl-4 space-y-1">
                    {item.dropdownItems.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.name}
                        to={dropdownItem.href}
                        className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        {dropdownItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <div className="px-4">
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Link 
                to="/signin"
                className="block w-full mx-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-center"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;