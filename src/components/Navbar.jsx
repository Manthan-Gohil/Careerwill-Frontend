import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
<div className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-sm">CW</span>
                            </div>
                            <span className="text-xl font-semibold text-gray-900">
                                careerwill
                            </span>
                        </div>
                        <nav className="hidden md:flex space-x-8">
                            <Link
                                to={'/'}
                                className="text-gray-700 hover:text-teal-600 transition-colors"
                            >
                                Home
                            </Link>
                              <Link
                                to={'/app'}
                                className="text-gray-700 hover:text-teal-600 transition-colors"
                            >
                                App
                            </Link>
                             <Link
                                to={'/courses'}
                                className="text-gray-700 hover:text-teal-600 transition-colors"
                            >
                                Courses
                            </Link>
                             <Link
                                to={'/blog'}
                                className="text-gray-700 hover:text-teal-600 transition-colors"
                            >
                                Blogs
                            </Link>
                             <Link
                                to={'/dashboard'}
                                className="text-gray-700 hover:text-teal-600 transition-colors"
                            >
                                Progress Report
                            </Link>
                        </nav>
                        <button className="bg-teal-100 text-teal-700 px-4 py-2 rounded-lg hover:bg-teal-200 transition-colors">
                            Login
                        </button>
                    </div>
                </div>
            </div>
  )
}

export default Navbar
