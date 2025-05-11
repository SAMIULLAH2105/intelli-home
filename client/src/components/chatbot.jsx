import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Bot } from 'lucide-react';

import { Button } from './ui/button.jsx';



const Chatbot = () => {
  const [showChat, setShowChat] = useState(false); // toggle chatbot
  const [messages, setMessages] = useState([
    {
      text: "Welcome to our store IntelliHome! How can I help you?",
      sender: 'ai',
      suggestions: ["Price", "Store Policy", "Refund Policy", "Order Status", "Contact Us", "Shipping", "Warranty", "Product Details"]
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    setMessages((prevMessages) => [...prevMessages, { text: message, sender: 'user' }]);
    setLoading(true);

    let aiResponse = "I'm thinking...";

    try {
      const response = await axios.post("http://localhost:5000/api/chatbot/chat", { message });
      aiResponse = response.data.response || "Sorry, I couldn't provide an answer. Can I assist you with something else?";
    } catch (error) {
      aiResponse = "Sorry, I couldn't provide an answer. Can I assist you with something else?";
      console.error("Error:", error);
    }

    const suggestions = ["Price", "Store Policy", "Refund Policy", "Order Status", "Contact Us", "Shipping", "Warranty", "Product Details"];

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: aiResponse, sender: 'ai', suggestions }
    ]);
    setLoading(false);
    setInput('');
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      {/* Chatbot Avatar Button (Fixed) */}
      <button
        className="fixed bottom-6 right-6 bg-gray-700 text-white rounded-full p-4 shadow-lg hover:bg-gray-800 transition z-50"
        onClick={() => setShowChat(!showChat)}
        aria-label="Open chatbot"

      >
        <Bot size={24} />
        {/* <FaRobot size={24} />
         */}
      </button>
      

      {/* Chatbot UI */}
      {showChat && (
        <div className="fixed bottom-20 right-6 w-[360px] z-40">
          <div className="flex flex-col items-center justify-center p-4 border rounded-lg shadow-2xl bg-white space-y-4">
            <h1 className="text-xl font-bold text-gray-700">IntelliHome Chatbot</h1>
            <div className="space-y-3 overflow-y-auto h-80 mb-4">
              {messages.map((message, index) => (
                <div key={index}>
                  <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-3 rounded-2xl inline-block ${message.sender === 'user' ? 'bg-gray-500 text-white' : 'bg-gray-200 text-black'}`}>
                      {message.text}
                    </div>
                  </div>
                  {message.suggestions && message.sender === 'ai' && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {message.suggestions.map((suggestion, i) => (
                        <Button
                          key={i}
                          onClick={() => handleSendMessage(suggestion)}
                          className="bg-gray-100 text-gray-800 px-3 py-1 rounded-lg hover:bg-gray-200 transition"
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {loading && <div className="text-gray-500 text-sm">Please wait...</div>}
              <div ref={chatEndRef}></div>
            </div>

            <div className="flex items-center space-x-2 w-full">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage(input)}
              />
              <Button
                onClick={() => handleSendMessage(input)}
                className="bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-700 transition"
              >Send</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
