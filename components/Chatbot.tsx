import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage, ChatUserData } from '../types';
import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";

interface ChatbotProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const saveLeadInfoTool: FunctionDeclaration = {
  name: 'saveLeadInfo',
  description: 'Saves user contact information and preferences found in the conversation.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      name: { type: Type.STRING, description: "User's full name" },
      email: { type: Type.STRING, description: "User's email address" },
      role: { type: Type.STRING, description: "User's role (e.g., Realtor, Homeowner, Architect)" },
      room: { type: Type.STRING, description: "The room type they want to stage" },
      phone: { type: Type.STRING, description: "User's phone number" },
    },
  },
};

export const Chatbot: React.FC<ChatbotProps> = ({ isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userData, setUserData] = useState<ChatUserData>({}); // eslint-disable-line @typescript-eslint/no-unused-vars
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatSessionRef = useRef<any>(null);
  const hasInitialized = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Initialize Chat with Gemini
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const initChat = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        chatSessionRef.current = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: `You are Alex, the friendly and professional AI assistant for Luxury Transformations.
                
                About Luxury Transformations:
                - We offer premium virtual staging for real estate.
                - Turnaround: 24-48 hours.
                - Process: Upload photos -> Choose Style (Modern, Scandinavian, Farmhouse, etc.) -> Receive Staged Images.
                - We provide 3 contrasting styles per room staged.

                **PRICING & PACKAGES**:
                1. 1 TRANSFORMATION: $100
                   - 1 Room Staged
                   - 3 Contrasting styles included
                   - 3 High-Resolution Images total
                   - Manual Quality Control Inspection
                
                2. 5 TRANSFORMATIONS (Most Popular): $400 (Save 20%)
                   - 5 Rooms Staged
                   - 3 Contrasting styles per room
                   - 15 High-Resolution Images total
                   - Priority Manual Quality Check

                3. 10 TRANSFORMATIONS: $700 (Save 30%)
                   - 10 Rooms Staged
                   - 3 Contrasting styles per room
                   - 30 High-Resolution Images total
                   - Top Priority Quality Control & Support

                **FREE LIMITED TIME OFFER**:
                - Clients can get their FIRST transformation for FREE.
                - How to claim: Fill out the lead capture form and submit an image or URL of the room.
                - Delivery: We email a link to the free image within 24-48 hours.

                **KNOWLEDGE BASE (Use this to answer user questions accurately)**:

                [General Service Questions]
                1. What is virtual staging? Digitally furnishing and decorating a photo of an empty or outdated room to help visualization.
                2. Why Luxury Transformations? We specialize in high-end, photo-realistic designs. We include 3 styles per room so you have options.
                3. Free Transformation? Yes, 1st room free. Standard quality, 24-48h turnaround. No credit card.
                4. Target Audience: Realtors, homeowners, builders, architects, developers, investors.

                [Process & Delivery]
                5. Process: Upload photo/URL -> Choose Style -> We Stage -> Receive Images (24-48h) -> Approve/Revise.
                6. Turnaround: Standard 24-48 hours per room. Rush delivery available.
                7. Multiple Rooms: Yes, see packages above.
                8. Revisions: 1 complimentary revision per room included.
                9. Dislike style? You get 3 styles per room to start, so you have variety immediately!

                [Image & Upload]
                10. Poor Quality Photos: We enhance brightness/clarity. If unusable, we'll advise.
                11. Listing URL: Yes, we can pull photos from a URL.
                12. File Types: JPG, PNG, HEIC.
                13. Privacy: Files secure on Google Drive.
                14. Furniture Removal: Available as an add-on (virtual remodeling).

                [Design & Style]
                15. Styles: Modern, Luxury, Minimalist, Scandinavian, Farmhouse, Contemporary, Transitional, Coastal, Industrial, Custom.
                16. Match Existing Decor: Yes, provide reference images.
                17. Realistic? Yes, 3D furniture + lighting + manual retouching = photorealistic.

                [Technical, Legal & Usage]
                24. MLS Compliant: Yes.
                25. Ownership: You own the final images for marketing.
                26. Misleading? No, ethical for visualization (don't hide structural issues).
                27. Resolution: High-resolution images included in all paid plans.

                Your Goals:
                1. Answer user questions about our services, pricing, and process helpfully and accurately using the knowledge base.
                2. ACTIVELY promote the Free Limited Time Offer to new users or those interested in trying the service.
                3. Qualify the lead by gently gathering their details: Name, Role (Realtor, Homeowner, etc.), Email, and desired Room.

                Conversation Style:
                - Answer the user's question FIRST.
                - THEN, if you don't have their details yet, ask ONE qualifying question (e.g., "To better assist you, are you a realtor or a homeowner?" or "What room are you looking to stage?").
                - Keep it conversational. Do not ask for a list of details at once.
                - If the user provides details, use the 'saveLeadInfo' tool to save them.
                - If the user is just browsing, be helpful and friendly.
                `,
                tools: [{ functionDeclarations: [saveLeadInfoTool] }],
            }
        });

        setMessages([{
            id: 'init',
            sender: 'bot',
            text: "Hi, I'm Alex from Luxury Transformations! I can answer any questions about our virtual staging services or pricing. How can I help you today?",
            type: 'text'
        }]);

      } catch (e) {
        console.error("Failed to initialize chat", e);
      }
    };

    initChat();
  }, []);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;
    if (isTyping) return;

    // Add user message immediately
    const userMsg: ChatMessage = { id: Date.now().toString(), sender: 'user', text, type: 'text' };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
        if (!chatSessionRef.current) {
            // Fallback init if something went wrong
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            chatSessionRef.current = ai.chats.create({ model: 'gemini-2.5-flash' });
        }

        let response = await chatSessionRef.current.sendMessage({ message: text });

        // Handle Tool Calls Loop
        while (response.functionCalls && response.functionCalls.length > 0) {
            const parts = [];
            for (const call of response.functionCalls) {
                if (call.name === 'saveLeadInfo') {
                    const args = call.args as any;
                    setUserData(prev => {
                        const newData = { ...prev, ...args };
                        console.log("%c[Google Sheets API] Chatbot syncing row:", 'color: #F4B400; font-weight: bold;', newData);
                        return newData;
                    });
                    
                    parts.push({
                        functionResponse: {
                            name: call.name,
                            response: { result: "success", saved: args },
                            id: call.id
                        }
                    });
                }
            }
            // Send tool outputs back to model to get the final text response
            response = await chatSessionRef.current.sendMessage({ message: parts });
        }

        const botText = response.text;
        if (botText) {
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                sender: 'bot',
                text: botText,
                type: 'text'
            }]);
        }

    } catch (error) {
        console.error("Chat error:", error);
        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            sender: 'bot',
            text: "I'm having a little trouble connecting right now. Please try again in a moment.",
            type: 'text'
        }]);
    } finally {
        setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-28 right-4 sm:right-8 z-50 flex h-[600px] max-h-[70vh] w-[90vw] max-w-[400px] flex-col overflow-hidden rounded-xl bg-white dark:bg-background-dark border border-gray-200 dark:border-gray-800 shadow-2xl animate-fade-in font-body">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 border-b border-primary/20 bg-primary p-4 text-white dark:text-background-dark">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-3xl">real_estate_agent</span>
          <div>
            <p className="font-bold">Alex</p>
            <p className="text-xs opacity-90">Your Staging Assistant</p>
          </div>
        </div>
        <div className="flex gap-1">
          <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-black/10 rounded">
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-background-light dark:bg-gray-900/50">
        <div className="flex flex-col gap-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'self-end' : 'self-start max-w-[85%]'}`}>
              {msg.sender === 'bot' && (
                <div className="h-8 w-8 shrink-0 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-sm">support_agent</span>
                </div>
              )}
              <div className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} gap-1`}>
                <div className={`px-4 py-2.5 text-sm leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'rounded-xl rounded-br-none bg-primary text-white' 
                    : 'rounded-xl rounded-bl-none bg-white dark:bg-gray-800 text-text-light dark:text-text-dark shadow-sm border border-gray-100 dark:border-gray-700'
                }`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
             <div className="flex items-end gap-2 self-start">
                <div className="h-8 w-8 shrink-0 rounded-full bg-primary/20 flex items-center justify-center">
                   <span className="material-symbols-outlined text-primary text-sm">support_agent</span>
                </div>
                <div className="rounded-xl rounded-bl-none bg-white dark:bg-gray-800 px-4 py-3 shadow-sm border border-gray-100 dark:border-gray-700">
                   <div className="flex items-center justify-center gap-1.5">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]"></span>
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]"></span>
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400"></span>
                   </div>
                </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark p-4">
        <div className="relative flex items-center">
          <input
            className="w-full rounded-full border-gray-300 bg-gray-50 py-2.5 pl-4 pr-12 text-sm text-gray-900 focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
            placeholder="Ask about our services..."
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isTyping}
          />
          <button 
            onClick={() => handleSendMessage(inputValue)}
            className="absolute right-1.5 rounded-full bg-primary p-1.5 text-white hover:bg-secondary transition-colors disabled:opacity-50"
            disabled={!inputValue.trim() || isTyping}
          >
            <span className="material-symbols-outlined text-lg">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};