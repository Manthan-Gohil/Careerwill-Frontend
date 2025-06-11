import React, { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { blog } from '../constants/data.json';

const BlogPage = () => {
    const [visibleCards, setVisibleCards] = useState(new Set());
    const [blogPosts, setBlogPosts] = useState([]);
    const observerRef = useRef();

    // Transform JSON data to match the expected format
    useEffect(() => {
        const transformedData = Object.keys(blog).map(key => {
            const post = blog[key];
            return {
                id: post.id,
                title: post.title,
                categories: [
                    { name: post.date.name, color: post.date.color },
                    { name: post.author.name, color: post.author.color },
                    { name: post.category.name, color: post.category.color },
                ].filter(cat => cat.name), // Filter out any undefined categories
                image: post.image,
                readTime: post.readTime,
                summary: post.summary
            };
        });
        
        setBlogPosts(transformedData);
    }, []);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleCards(
                            (prev) => new Set([...prev, parseInt(entry.target.dataset.id)])
                        );
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: "50px 0px",
            }
        );

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

    useEffect(() => {
        if (blogPosts.length > 0) {
            const cards = document.querySelectorAll(".blog-card");
            cards.forEach((card) => {
                if (observerRef.current) {
                    observerRef.current.observe(card);
                }
            });

            return () => {
                if (observerRef.current) {
                    cards.forEach((card) => {
                        observerRef.current.unobserve(card);
                    });
                }
            };
        }
    }, [blogPosts]);

    const LazyImage = ({ src, alt, className }) => {
        const [isLoaded, setIsLoaded] = useState(false);
        const [isVisible, setIsVisible] = useState(false);
        const imgRef = useRef();

        useEffect(() => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
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
        }, []);

        return (
            <div
                ref={imgRef}
                className={`${className} bg-gray-200 overflow-hidden relative`}
            >
                {!isLoaded && (
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
                )}
                {isVisible && (
                    <img
                        src={src}
                        alt={alt}
                        className={`w-full h-full object-cover transition-all duration-700 ease-out ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
                            }`}
                        onLoad={() => setTimeout(() => setIsLoaded(true), 200)}
                        loading="lazy"
                    />
                )}
            </div>
        );
    };

    const LoadingState = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-[#F0F4F5] rounded-2xl overflow-hidden shadow-sm animate-pulse">
                    <div className="p-3">
                        <div className="aspect-[3/2] rounded-2xl bg-gray-300"></div>
                    </div>
                    <div className="p-6 pb-12">
                        <div className="mb-4 flex flex-row space-x-2">
                            <div className="h-6 bg-gray-300 rounded-full w-20"></div>
                            <div className="h-6 bg-gray-300 rounded-full w-24"></div>
                        </div>
                        <div className="h-6 bg-gray-300 rounded w-full mb-2"></div>
                        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                    </div>
                </div>
            ))}
        </div>
    );

    const ErrorState = () => (
        <div className="text-center py-12">
            <div className="text-red-500 text-lg mb-4">{error}</div>
            <button 
                onClick={() => window.location.reload()} 
                className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
            >
                Retry
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
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
                            <a
                                href="#"
                                className="text-gray-700 hover:text-teal-600 transition-colors"
                            >
                                Home
                            </a>
                            <a
                                href="#"
                                className="text-gray-700 hover:text-teal-600 transition-colors"
                            >
                                App
                            </a>
                            <a
                                href="#"
                                className="text-gray-700 hover:text-teal-600 transition-colors"
                            >
                                Courses
                            </a>
                            <a
                                href="#"
                                className="text-gray-700 hover:text-teal-600 transition-colors"
                            >
                                Online School
                            </a>
                            <a
                                href="#"
                                className="text-gray-700 hover:text-teal-600 transition-colors"
                            >
                                Contact Us
                            </a>
                        </nav>
                        <button className="bg-teal-100 text-teal-700 px-4 py-2 rounded-lg hover:bg-teal-200 transition-colors">
                            Login
                        </button>
                    </div>
                </div>
            </div>

            {/* Blog Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                             Explore Educational Insights
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                             Stay updated with the latest tips, strategies, and resources to boost your learning journey and academic success.
                        </p>
                    </div>

                    {/* Content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.map((post, index) => (
                            <div
                                key={post.id}
                                data-id={post.id}
                                className={`blog-card group cursor-pointer bg-[#F0F4F5] hover:bg-[#CDEFF0] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 ${visibleCards.has(post.id)
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-8"
                                    } relative`}
                                style={{
                                    transitionDelay: `${index * 250}ms`,
                                    transitionProperty: "opacity, transform",
                                }}
                            >
                                <Link to={`/blog/${post.id}`} className="block">
                                    <div className="p-3">
                                        <div className="aspect-[3/2] rounded-2xl relative overflow-hidden">
                                            <LazyImage
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
                                            />
                                        </div>
                                    </div>
                                    <div className="p-6 pb-12">
                                        <div className="mb-4 flex flex-row space-x-2">
                                            {post.categories.map((cat, idx) => (
                                                <span
                                                    key={idx}
                                                    className="inline-block px-3 py-1 rounded-full text-sm font-normal text-gray-700"
                                                    style={{ backgroundColor: cat.color }}
                                                >
                                                    {cat.name}
                                                </span>
                                            ))}
                                        </div>
                                        <h2 className="text-xl font-semibold text-gray-900 mb-4 line-clamp-3">
                                            {post.title}
                                        </h2>
                                    </div>
                                    <div className="absolute right-4 bottom-4">
                                        <div className="w-10 h-10 rounded-full border flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:border-gray-600 transition-all duration-500 ease-in-out group-hover:translate-x-1 shadow hover:bg-[#CDEFF0]">
                                            <ArrowRight
                                                size={18}
                                                className="group-hover:text-gray-600 transition-colors duration-500 ease-in-out"
                                            />
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Load More Button */}
                    <div className="text-center mt-12">
                        <button className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors duration-300 transform hover:scale-105 font-medium">
                            Load More Articles
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-sm">CW</span>
                            </div>
                            <span className="text-xl font-semibold">careerwill</span>
                        </div>
                        <p className="text-gray-400">
                            Transforming workplace wellbeing through psychology and
                            data-driven insights.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default BlogPage;