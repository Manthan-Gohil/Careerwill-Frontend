import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Trash2, Send, Book, HelpCircle, ChevronDown, ChevronRight, Menu, ArrowLeft } from "lucide-react";
import api from '../services/api';

const Chatbot = () => {
  // State management
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.getCategories();
        setCategories(response.data.data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    
    fetchCategories();
  }, []);

  // Fetch questions when category is selected
  useEffect(() => {
    if (selectedCategory) {
      const fetchQuestions = async () => {
        try {
          const response = await api.getQuestionsByCategory(selectedCategory);
          setQuestions(response.data.data.questions);
        } catch (error) {
          console.error('Error fetching questions:', error);
        }
      };
      
      fetchQuestions();
    }
  }, [selectedCategory]);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Initialize chat
  useEffect(() => {
    scrollToBottom();
    if (isOpen && messages.length === 0) {
      setMessages([
        { 
          role: "bot", 
          content: "Hi there! 👋 I'm here to help you with your questions about our platform. You can browse questions by category on the left or type your question below.",
          timestamp: new Date()
        }
      ]);
    }
  }, [messages, isOpen]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Toggle category expansion
  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    toggleCategory(categoryId);
  };

  // Handle question selection
  const handleQuestionClick = (question) => {
    setInput(question);
    inputRef.current?.focus();
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Send message handler
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { 
      role: "user", 
      content: input,
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    try {
      const response = await api.sendQuery(currentInput);
      const botMessage = { 
        role: "bot", 
        content: response.data.data.answer,
        category: response.data.data.category,
        confidence: response.data.data.confidence,
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { 
        role: "bot", 
        content: "Sorry, I couldn't process your request. Please try again later.",
        category: 'ERROR',
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear conversation
  const clearMessages = () => {
    setMessages([
      { 
        role: "bot", 
        content: "Hi there! 👋 I'm here to help you with your questions about our platform. You can browse questions by category on the left or type your question below.",
        timestamp: new Date()
      }
    ]);
  };

  // Format message with bullet points
  const formatMessage = (content) => {
    return content.split('\n').map((line, index) => (
      <div key={index} className={index > 0 ? 'mt-2' : ''}>
        {line.startsWith('•') ? (
          <div className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            <span>{line.substring(1).trim()}</span>
          </div>
        ) : (
          line
        )}
      </div>
    ));
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      {/* Chat toggle button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 hover:scale-110"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat window */}
      <div 
        className={`fixed bottom-24 right-6 w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 z-40 border border-gray-100 flex ${
          isOpen ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8 pointer-events-none"
        }`}
        style={{ height: '70vh' }}
      >
        {/* Sidebar toggle button */}
        <button
          onClick={toggleSidebar}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full p-2 shadow-md transition-all duration-300 hover:bg-gray-100 ${
            sidebarCollapsed ? 'translate-x-4' : 'translate-x-64'
          }`}
        >
          {sidebarCollapsed ? <Menu size={16} /> : <ArrowLeft size={16} />}
        </button>

        {/* Sidebar with categories and questions */}
        <div 
          className={`bg-gray-50 overflow-y-auto transition-all duration-300 ${
            sidebarCollapsed ? 'w-0 opacity-0' : 'w-64 opacity-100 border-r border-gray-200'
          }`}
        >
          <div className="p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
            <h2 className="font-bold text-lg text-gray-800">FAQ Categories</h2>
            <p className="text-xs text-gray-500">Select a category to view questions</p>
          </div>
          
          <div className="divide-y divide-gray-200">
            {categories.map((category) => (
              <div key={category._id} className="border-b border-gray-200 last:border-0">
                <div 
                  className="flex items-center justify-between p-3 hover:bg-gray-100 cursor-pointer transition-colors"
                  onClick={() => handleCategorySelect(category._id)}
                >
                  <span className="font-medium text-gray-700 truncate">{category.name}</span>
                  {expandedCategories[category._id] ? (
                    <ChevronDown size={16} className="text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronRight size={16} className="text-gray-500 flex-shrink-0" />
                  )}
                </div>
                
                {expandedCategories[category._id] && (
                  <div className="pl-6 pr-3 pb-2">
                    {questions
                      .filter(q => q.category === category._id)
                      .map((item, index) => (
                        <div 
                          key={index}
                          className="p-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded cursor-pointer transition-colors mb-1 truncate"
                          onClick={() => handleQuestionClick(item.question)}
                          title={item.question}
                        >
                          {item.question}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main chat area */}
        <div className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarCollapsed ? 'ml-0' : 'ml-0'
        }`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-blue-600 mr-3 shadow-md">
                  <HelpCircle size={20} />
                </div>
                <div>
                  <h2 className="font-bold text-lg">FAQ Assistant</h2>
                  <p className="text-xs opacity-90">Powered by your data</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={clearMessages} 
                  className="text-white opacity-80 hover:opacity-100 p-2 hover:bg-white/20 rounded-lg transition-colors"
                  title="Clear conversation"
                >
                  <Trash2 size={16} />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white opacity-80 hover:opacity-100 p-2 hover:bg-white/20 rounded-lg transition-colors"
                  title="Close chat"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Messages container */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-xs rounded-2xl p-3 shadow-sm ${
                  msg.role === "user" 
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-md" 
                    : "bg-white border border-gray-200 rounded-bl-md"
                }`}>
                  <div className="text-sm leading-relaxed">
                    {formatMessage(msg.content)}
                  </div>
                  {msg.category && msg.role === "bot" && msg.category !== 'GREETING' && msg.category !== 'THANKS' && msg.category !== 'NO_MATCH' && (
                    <div className="mt-2 pt-2 border-t border-gray-200">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                        <Book size={10} className="mr-1" />
                        {msg.category}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md p-4 shadow-sm">
                  <div className="flex space-x-2 items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: '600ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="border-t bg-white p-4">
            <div className="flex rounded-xl border-2 border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 overflow-hidden bg-white shadow-sm">
              <input
                ref={inputRef}
                type="text"
                className="flex-1 p-3 outline-none text-sm bg-transparent"
                placeholder={sidebarCollapsed ? "Ask me anything..." : "Ask me anything or select a question from the sidebar..."}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                disabled={isLoading}
              />
              <button 
                className={`px-4 flex items-center justify-center transition-all duration-200 ${
                  input.trim() && !isLoading 
                    ? "text-blue-600 hover:bg-blue-50 hover:scale-110" 
                    : "text-gray-400 cursor-not-allowed"
                }`}
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
              >
                <Send size={20} />
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-2 text-center">
              Press Enter to send • {sidebarCollapsed ? 'Click the menu button to show categories' : 'Select questions from the sidebar'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;