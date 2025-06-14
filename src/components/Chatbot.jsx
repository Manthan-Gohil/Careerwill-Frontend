import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Trash2, Send } from "lucide-react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    if (isOpen && messages.length === 0) {
      // Add welcome message when chat opens
      setMessages([
        { 
          role: "bot", 
          content: "Hi there! 👋 How can I help you today?"
        }
      ]);
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Mock bot responses for demonstration
  const getBotResponse = (userMessage) => {
    const responses = [
      "That's an interesting question! Let me think about that.",
      "I understand what you're asking. Here's what I think...",
      "Great question! Based on what you've told me, I'd suggest...",
      "I see what you mean. Let me help you with that.",
      "That's a good point. Here's my perspective on this topic.",
      "Thanks for asking! I'm here to help you with whatever you need.",
      "I appreciate you sharing that with me. Let me provide some insights.",
      "Absolutely! I'd be happy to help you understand this better."
    ];
    
    // Simple keyword-based responses
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! Nice to meet you! How can I assist you today?";
    }
    if (lowerMessage.includes('help')) {
      return "I'm here to help! You can ask me questions about various topics, and I'll do my best to provide helpful answers.";
    }
    if (lowerMessage.includes('weather')) {
      return "I don't have access to real-time weather data, but I'd recommend checking a weather app or website for current conditions!";
    }
    if (lowerMessage.includes('time')) {
      return `The current time is ${new Date().toLocaleTimeString()}`;
    }
    if (lowerMessage.includes('date')) {
      return `Today's date is ${new Date().toLocaleDateString()}`;
    }
    if (lowerMessage.includes('thank')) {
      return "You're very welcome! I'm glad I could help. Is there anything else you'd like to know?";
    }
    
    // Return random response for other messages
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const botResponse = getBotResponse(currentInput);
      setMessages((prev) => [...prev, { role: "bot", content: botResponse }]);
      setIsLoading(false);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  const clearMessages = () => {
    setMessages([
      { 
        role: "bot", 
        content: "Hi there! 👋 How can I help you today?"
      }
    ]);
  };

  // Format message content with basic markdown-like formatting
  const formatMessage = (content) => {
    const formattedContent = content
      .replace(/\*\*(.*?)\*\*/g, '<span class="font-bold">$1</span>')
      .replace(/\*(.*?)\*/g, '<span class="italic">$1</span>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 rounded text-sm">$1</code>');
    
    return <div dangerouslySetInnerHTML={{ __html: formattedContent }} />;
  };

  return (
    <div className="relative min-h-screen bg-gray-50 p-8">

      {/* Chat toggle button - Fixed position */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-50 hover:scale-110"
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <MessageCircle size={24} />
        )}
      </button>

      {/* Chat window - Fixed position */}
      <div 
        className={`fixed bottom-24 right-6 w-72 md:w-80 bg-white rounded-lg shadow-2xl overflow-hidden transition-all duration-300 z-40 ${
          isOpen ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center text-blue-600 mr-3">
              <MessageCircle size={20} />
            </div>
            <div>
              <h2 className="font-bold">AI Assistant</h2>
              <p className="text-xs opacity-80">Online now</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={clearMessages} 
              className="text-white opacity-80 hover:opacity-100 p-1 hover:bg-white/20 rounded"
              title="Clear conversation"
            >
              <Trash2 size={16} />
            </button>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white opacity-80 hover:opacity-100 p-1 hover:bg-white/20 rounded"
              title="Close chat"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Messages container */}
        <div className="h-64 overflow-y-auto p-4 bg-gray-50 space-y-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-400">
              <div className="text-center">
                <MessageCircle size={40} className="mx-auto mb-2 text-gray-300" />
                <p>Ask me anything...</p>
              </div>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-xs md:max-w-sm rounded-lg p-3 ${
                  msg.role === "user" 
                    ? "bg-blue-600 text-white rounded-br-sm" 
                    : "bg-white border border-gray-200 rounded-bl-sm shadow-sm"
                }`}>
                  {formatMessage(msg.content)}
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-lg rounded-bl-sm p-3 shadow-sm">
                <div className="flex space-x-2 items-center">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '600ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="border-t p-4 bg-white">
          <div className="flex rounded-lg border border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 overflow-hidden">
            <input
              ref={inputRef}
              type="text"
              className="flex-1 p-3 outline-none text-sm"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
              disabled={isLoading}
            />
            <button 
              className={`px-4 flex items-center justify-center transition-colors ${
                input.trim() && !isLoading 
                  ? "text-blue-600 hover:bg-blue-50" 
                  : "text-gray-400 cursor-not-allowed"
              }`}
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
            >
              <Send size={20} />
            </button>
          </div>
          <div className="text-xs text-gray-500 mt-2 text-center">
            Press Enter to send • Powered by AI
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;