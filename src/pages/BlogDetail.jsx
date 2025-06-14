import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, User, Share2, Linkedin, Twitter, Facebook, Clock, Eye, ThumbsUp, Bookmark, Tag } from "lucide-react";
import { blog } from "../constants/data.json";
import Navbar from "../components/Navbar";

const BlogDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const [activeSection, setActiveSection] = useState(0);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [viewCount, setViewCount] = useState(0);
    const contentRef = useRef();
    
    const currentBlog = blog[id];

    useEffect(() => {
        if (!currentBlog) {
            navigate('/404'); // Redirect to 404 if blog not found
            return;
        }
        
        setIsVisible(true);
        setLikeCount(Math.floor(Math.random() * 500) + 50); // Random like count
        setViewCount(Math.floor(Math.random() * 2000) + 100); // Random view count
        window.scrollTo(0, 0);
    }, [id, currentBlog, navigate]);

    if (!currentBlog) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Not Found</h1>
                    <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
                    <button
                        onClick={() => navigate('/blog')}
                        className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors"
                    >
                        Back to Blog
                    </button>
                </div>
            </div>
        );
    }

    const LazyImage = ({ src, alt, className }) => {
        const [isLoaded, setIsLoaded] = useState(false);
        const [isVisible, setIsVisible] = useState(false);
        const imgRef = useRef();

        useEffect(() => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting && !isVisible) {
                        setIsVisible(true);
                        observer.disconnect();
                    }
                },
                { threshold: 0.1 }
            );

            if (imgRef.current) {
                observer.observe(imgRef.current);
            }

            return () => observer.disconnect();
        }, [isVisible]);

        return (
            <div ref={imgRef} className={`${className} bg-gray-200 overflow-hidden relative`}>
                {!isLoaded && (
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
                )}
                {isVisible && (
                    <img
                        src={src}
                        alt={alt}
                        className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
                        }`}
                        onLoad={() => setTimeout(() => setIsLoaded(true), 200)}
                        loading="lazy"
                    />
                )}
            </div>
        );
    };

const ContentRenderer = ({ content, index }) => {
    const [hasBeenVisible, setHasBeenVisible] = useState(false);
    const elementRef = useRef();

    useEffect(() => {
        if (hasBeenVisible) return; // Don't observe if already visible

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHasBeenVisible(true);
                }
            },
            { 
                threshold: 0.1,
                rootMargin: '50px 0px -50px 0px'
            }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) observer.unobserve(elementRef.current);
            observer.disconnect();
        };
    }, [hasBeenVisible]);

    const renderContent = () => {
        switch (content.type) {
            case "heading":
                return (
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight">
                        {content.content}
                    </h2>
                );
            case "paragraph":
                return (
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        {content.content}
                    </p>
                );
            case "list":
                return (
                    <ul className="space-y-3 mb-6">
                        {content.items.map((item, idx) => (
                            <li key={idx} className="flex items-start space-x-3">
                                <div className="w-2 h-2 bg-teal-500 rounded-full mt-3 flex-shrink-0"></div>
                                <span className="text-lg text-gray-700 leading-relaxed">{item}</span>
                            </li>
                        ))}
                    </ul>
                );
            case "quote":
                return (
                    <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-8 mb-8 border-l-4 border-teal-500 relative overflow-hidden">
                        <div className="absolute top-4 left-4 text-6xl text-teal-200 font-serif">"</div>
                        <blockquote className="text-xl italic text-gray-800 leading-relaxed ml-8 mb-4">
                            {content.content}
                        </blockquote>
                        {content.author && (
                            <cite className="text-lg font-medium text-teal-700 ml-8">
                                — {content.author}
                            </cite>
                        )}
                    </div>
                );
            case "table":
                return (
                    <div className="overflow-x-auto mb-8 rounded-2xl shadow-sm">
                        <table className="w-full bg-white border border-gray-200 rounded-2xl overflow-hidden">
                            <thead className="bg-gradient-to-r from-teal-500 to-blue-500 text-white">
                                <tr>
                                    {content.headers.map((header, idx) => (
                                        <th key={idx} className="px-6 py-4 text-left font-semibold">
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {content.rows.map((row, rowIdx) => (
                                    <tr key={rowIdx} className={rowIdx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                        {row.map((cell, cellIdx) => (
                                            <td key={cellIdx} className="px-6 py-4 text-gray-700">
                                                {cell}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div
            ref={elementRef}
            className={`transition-all duration-1000 ease-out ${
                hasBeenVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            {renderContent()}
        </div>
    );
};

    const handleShare = (platform) => {
        const url = window.location.href;
        const title = currentBlog.title;
        
        const shareUrls = {
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        };
        
        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    };

    const getRelatedBlogs = () => {
        return Object.entries(blog)
            .filter(([blogId]) => blogId !== id)
            .slice(0, 3);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}

            {/* Back to Posts */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                <button
                    onClick={() => navigate('/blog')}
                    className={`inline-flex items-center space-x-2 text-gray-600 hover:text-teal-600 transition-all duration-500 ${
                        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                    }`}
                >
                    <ArrowLeft size={18} />
                    <span>back to all posts</span>
                </button>
            </div>

            {/* Blog Content */}
            <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Category Badge */}
                <div
                    className={`transition-all duration-700 delay-200 ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                >
                    <div className="flex items-center space-x-3 mb-6">
                        <span 
                            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium"
                            style={{ backgroundColor: currentBlog.category.color, color: '#374151' }}
                        >
                            <Tag size={14} className="mr-2" />
                            {currentBlog.category.name}
                        </span>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center space-x-1">
                                <Eye size={14} />
                                <span>{viewCount} views</span>
                            </span>
                            <span className="flex items-center space-x-1">
                                <ThumbsUp size={14} />
                                <span>{likeCount} likes</span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Title */}
                <h1
                    className={`text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8 transition-all duration-700 delay-300 ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                >
                    {currentBlog.title}
                </h1>

                {/* Author and Meta Info */}
                <div
                    className={`flex flex-wrap items-center justify-between mb-12 transition-all duration-700 delay-400 ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                >
                    <div className="flex items-center space-x-6 mb-4 sm:mb-0">
                        <div className="flex items-center space-x-3">
                            <div 
                                className="w-12 h-12 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: currentBlog.author.color }}
                            >
                                <User className="text-gray-700" size={20} />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">{currentBlog.author.name}</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                    <span className="flex items-center space-x-1">
                                        <Calendar size={14} />
                                        <span>{currentBlog.date.name}</span>
                                    </span>
                                    <span className="flex items-center space-x-1">
                                        <Clock size={14} />
                                        <span>{currentBlog.readTime}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setIsBookmarked(!isBookmarked)}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                                isBookmarked 
                                    ? 'bg-teal-100 text-teal-700' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            <Bookmark size={16} fill={isBookmarked ? 'currentColor' : 'none'} />
                            <span className="text-sm font-medium">
                                {isBookmarked ? 'Saved' : 'Save'}
                            </span>
                        </button>
                        
                        <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-700">Share</span>
                            <div className="flex space-x-2">
                                <button 
                                    onClick={() => handleShare('linkedin')}
                                    className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                                >
                                    <Linkedin size={16} />
                                </button>
                                <button 
                                    onClick={() => handleShare('twitter')}
                                    className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                                >
                                    <Twitter size={16} />
                                </button>
                                <button 
                                    onClick={() => handleShare('facebook')}
                                    className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                                >
                                    <Facebook size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hero Image */}
                <div
                    className={`relative w-full h-64 md:h-200 rounded-2xl overflow-hidden mb-12 transition-all duration-1000 delay-500 ${
                        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
                >
                    <LazyImage
                        src={currentBlog.image}
                        alt={currentBlog.title}
                        className="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Summary */}
                <div
                    className={`bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-8 mb-12 border border-teal-100 transition-all duration-700 delay-600 ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                >
                    <p className="text-xl text-gray-800 leading-relaxed text-center">
                        {currentBlog.summary}
                    </p>
                </div>

                {/* Content */}
                <div ref={contentRef} className="prose prose-lg max-w-none">
                    {currentBlog.content.map((section, index) => (
                        <ContentRenderer key={index} content={section} index={index} />
                    ))}
                </div>

                {/* Tags Section */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                        {['JEE Main', 'Engineering', 'Exam Preparation', 'Study Guide', 'Physics', 'Chemistry', 'Mathematics'].map((tag, index) => (
                            <span 
                                key={index}
                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Related Articles */}
                {getRelatedBlogs().length > 0 && (
                    <div
                        className={`mt-16 pt-16 border-t border-gray-200 transition-all duration-700 delay-1000 ${
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        }`}
                    >
                        <h3 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {getRelatedBlogs().map(([blogId, blogPost]) => (
                                <button
                                    key={blogId}
                                    onClick={() => navigate(`/blog/${blogId}`)}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 text-left"
                                >
                                    <div className="aspect-[16/10] relative overflow-hidden">
                                        <LazyImage
                                            src={blogPost.image}
                                            alt={blogPost.title}
                                            className="w-full h-full group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <span 
                                            className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-3"
                                            style={{ backgroundColor: blogPost.category.color, color: '#374151' }}
                                        >
                                            {blogPost.category.name}
                                        </span>
                                        <h4 className="text-xl font-semibold text-gray-900 group-hover:text-teal-600 transition-colors duration-300 line-clamp-2 mb-2">
                                            {blogPost.title}
                                        </h4>
                                        <p className="text-gray-600 text-sm line-clamp-2">
                                            {blogPost.summary}
                                        </p>
                                        <div className="flex items-center space-x-4 mt-4 text-xs text-gray-500">
                                            <span>{blogPost.date.name}</span>
                                            <span>{blogPost.readTime}</span>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </article>
        </div>
    );
};

export default BlogDetail;