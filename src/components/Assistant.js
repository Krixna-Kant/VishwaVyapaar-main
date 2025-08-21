import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader, Bot, User, ArrowRight, AlertCircle } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from '../config/api.config';
import ReactMarkdown from 'react-markdown';

let genAI;
try {
  genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
} catch (error) {
  console.error('Error initializing Gemini:', error);
}

const SYSTEM_PROMPT = `You are VishwaVyapaar's AI Trade Assistant, an expert in international business expansion and trade.

RESPONSE FORMATTING RULES:
1. Always structure responses with clear sections using markdown:
   • Main headings: Use ## for primary sections
   • Subheadings: Use ### for subsections
   • Use bullet points (•) for lists
   • Use numbered lists (1.) for steps or sequences
   • Use bold (**text**) for key terms
   • Use tables for comparative data

2. Every response must include:
   • A brief introduction (1-2 lines)
   • Clearly structured main content
   • A concise conclusion or next steps
   • 2-3 relevant follow-up questions

EXAMPLE STRUCTURE:
## [Topic Name]
Brief introduction...

### Key Points
• Point 1
• Point 2
• Point 3

### Detailed Breakdown
1. First step...
2. Second step...

### Next Steps
• Recommendation 1
• Recommendation 2

💡 Follow-up Questions:
• Question 1?
• Question 2?

EXPERTISE AREAS:
1. Market Entry & Expansion
   • Entry strategies
   • Market analysis
   • Risk assessment
   • Partner selection

2. Trade Operations
   • Export/Import procedures
   • Supply chain optimization
   • Logistics management
   • Documentation

3. Compliance & Regulations
   • Trade compliance
   • Legal requirements
   • Standards & certifications
   • Risk management

4. Financial Aspects
   • Trade finance
   • Currency management
   • Payment terms
   • Risk mitigation

5. Cultural & Business Practices
   • Business etiquette
   • Negotiation styles
   • Communication protocols
   • Relationship building

For off-topic queries: Politely redirect with a business-focused alternative suggestion.`;

// Update the message UI styling
const MessageBubble = ({ message }) => (
  <div className={`p-4 rounded-lg ${
    message.type === 'user'
      ? 'bg-gradient-to-r from-[var(--primary-500)] to-[var(--accent-coral)] text-white'
      : 'bg-white shadow-sm border border-[var(--glass-border)]'
  }`}>
    <div className={`prose prose-sm max-w-none ${
      message.type === 'user' 
        ? 'text-white' 
        : 'text-gray-800'
    }`}
      style={{
        lineHeight: '1.6',
        fontSize: '0.95rem'
      }}
    >
      {message.type === 'bot' ? (
        <ReactMarkdown
          components={{
            h2: ({node, ...props}) => <h2 className="text-xl font-bold mt-4 mb-2" {...props} />,
            h3: ({node, ...props}) => <h3 className="text-lg font-semibold mt-3 mb-2" {...props} />,
            ul: ({node, ...props}) => <ul className="list-disc pl-4 my-2" {...props} />,
            ol: ({node, ...props}) => <ol className="list-decimal pl-4 my-2" {...props} />,
            li: ({node, ...props}) => <li className="my-1" {...props} />,
          }}
        >
          {message.content}
        </ReactMarkdown>
      ) : (
        message.content
      )}
    </div>
  </div>
);

// Update the suggestions styling
const SuggestionButton = ({ suggestion, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center space-x-2 px-4 py-2 
      bg-white/95 
      text-sm text-[var(--primary-600)]
      border border-[var(--primary-100)]
      hover:bg-[var(--primary-50)]
      hover:border-[var(--primary-200)]
      rounded-full
      transition-colors
      shadow-sm"
  >
    <span>{suggestion}</span>
    <ArrowRight className="w-3 h-3 text-[var(--primary-400)]" />
  </button>
);

const AIChatbot = () => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: "Welcome to VishwaVyapaar! I'm your AI Trade Assistant specializing in international business expansion. I can help you with:",
      suggestions: [
        'Market entry strategies',
        'Export regulations',
        'Trade compliance',
        'Supply chain optimization'
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBusinessSuggestions = (content) => {
    // Dynamic suggestions based on conversation context
    const suggestions = [
      'Tell me more about market requirements',
      'What are the compliance needs?',
      'Available trade incentives',
      'Next steps for expansion'
    ];
    return suggestions;
  };

  const isBusinessRelated = (text) => {
    const businessKeywords = [
      'market', 'export', 'import', 'trade', 'business', 'regulation',
      'compliance', 'supply chain', 'logistics', 'finance', 'expansion',
      'international', 'global', 'strategy', 'documentation', 'shipping',
      'customs', 'tariff', 'tax', 'investment', 'partnership'
    ];
    
    return businessKeywords.some(keyword => 
      text.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  const handleSuggestionClick = (suggestion) => {
    handleSend(suggestion);
  };

  const handleSend = async (text = input) => {
    if (!text.trim()) return;
    if (!genAI) {
      setMessages(prev => [...prev, {
        type: 'bot',
        content: "Sorry, I'm having trouble connecting to the AI service. Please try again later.",
        suggestions: []
      }]);
      return;
    }

    const userMessage = { type: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      if (!isBusinessRelated(text)) {
        // Handle off-topic questions
        const offTopicResponse = {
          type: 'bot',
          content: "I'm specialized in international trade and business expansion. Please ask me about market entry, export regulations, compliance, or other business-related topics. How can I assist with your global business journey?",
          suggestions: [
            'Market entry strategies',
            'Export regulations',
            'Trade compliance',
            'Supply chain optimization'
          ]
        };
        setMessages(prev => [...prev, offTopicResponse]);
        setIsLoading(false);
        return;
      }

      // Generate response using Gemini
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const prompt = `${SYSTEM_PROMPT}\n\nUser: ${text}\n\nAssistant:`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const formattedResponse = response.text();

      const botResponse = {
        type: 'bot',
        content: formattedResponse,
        suggestions: generateBusinessSuggestions(formattedResponse)
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorResponse = {
        type: 'bot',
        content: "I apologize, but I'm having trouble processing your request. Please try again or rephrase your question about international trade.",
        suggestions: [
          'Market entry strategies',
          'Export regulations',
          'Trade compliance'
        ]
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 rounded-lg border border-[var(--glass-border)]">
      {/* Chat Header */}
      <div className="p-4 border-b border-[var(--glass-border)] bg-white">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-[var(--primary-50)]">
            <Bot className="w-6 h-6 text-[var(--primary-500)]" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Trade Assistant</h2>
            <p className="text-sm text-gray-600">Expert guidance for global business expansion</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className="flex flex-col max-w-[80%] space-y-3">
              <div className={`flex items-start space-x-3 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'user' 
                    ? 'bg-[var(--primary-500)]' 
                    : 'bg-white border-2 border-[var(--primary-100)]'
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-[var(--primary-500)]" />
                  )}
                </div>
                <MessageBubble message={message} />
              </div>

              {/* Suggestions */}
              {message.suggestions && (
                <div className="flex flex-wrap gap-2 ml-11">
                  {message.suggestions.map((suggestion, i) => (
                    <SuggestionButton 
                      key={i}
                      suggestion={suggestion}
                      onClick={() => handleSuggestionClick(suggestion)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <Loader className="w-5 h-5 animate-spin text-[var(--primary-500)]" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-[var(--glass-border)] bg-white">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about market entry, regulations, or trade strategies..."
            className="flex-1 px-4 py-3 rounded-lg 
              bg-gray-50
              border border-[var(--primary-100)]
              focus:outline-none focus:ring-2 focus:ring-[var(--primary-200)]
              placeholder:text-gray-400"
          />
          <button
            onClick={() => handleSend()}
            className="px-4 py-3 rounded-lg 
              bg-[var(--primary-500)]
              text-white hover:opacity-90 transition-opacity"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;