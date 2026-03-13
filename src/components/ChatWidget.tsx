import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Send,
  Zap,
  Briefcase,
  Code,
  User,
  Building,
  ArrowRight,
  Mail,
  Phone,
  Calendar,
  Sparkles,
} from "lucide-react";
import { db } from "../utils/db";

// --- Types ---

type MessageSender = "bot" | "user";

interface Message {
  id: string;
  text: string;
  sender: MessageSender;
  timestamp: Date;
}

type Step =
  | "welcome"
  | "name"
  | "phone"
  | "qualification"
  | "scope"
  | "details"
  | "contact-method"
  | "contact-input"
  | "confirmation";

interface UserData {
  name?: string;
  phone?: string;
  intent?: string;
  projectType?: string;
  scope?: string;
  details?: string;
  contactMethod?: string;
  contactValue?: string;
}

const WHATSAPP_NUMBER = "573226838387";

interface ChatWidgetProps {
  lang?: "es" | "en";
  discordWebhook?: string;
}

// --- Component ---

export default function ChatWidget({ lang = "es", discordWebhook }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<Step>("welcome");
  const [messages, setMessages] = useState<Message[]>([]);
  const [userData, setUserData] = useState<UserData>({});
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  const t = db[lang].ui.chat;

  // --- Tooltip Logic ---
  const [showPrompt, setShowPrompt] = useState(false);
  const [isBubbleVisible, setIsBubbleVisible] = useState(false);
  const [promptIndex, setPromptIndex] = useState(0);
  const prompts = t.prompts;

  // Initial Load from Session Storage
  useEffect(() => {
    const savedChat = sessionStorage.getItem("chat_state");
    if (savedChat) {
      try {
        const { messages: savedMessages, currentStep: savedStep, userData: savedData } = JSON.parse(savedChat);
        setMessages(savedMessages.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) })));
        setCurrentStep(savedStep);
        setUserData(savedData);
        setIsOpen(true); // Re-open if they had progress
      } catch (e) {
        console.error("Error restoring chat state:", e);
      }
    }
    isInitialMount.current = false;
  }, []);

  // Save to Session Storage on every state change
  useEffect(() => {
    if (isInitialMount.current) return;
    
    const chatState = {
      messages,
      currentStep,
      userData
    };
    sessionStorage.setItem("chat_state", JSON.stringify(chatState));
  }, [messages, currentStep, userData]);

  // Initial Greeting if empty
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage(t.greeting);
    }
  }, [isOpen]);

  // Start the prompt cycle after 3s
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPrompt(true);
      setIsBubbleVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-open chat after 8s
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  // Unlock audio
  useEffect(() => {
    const unlockAudio = () => {
      const audio = new Audio("/sounds/notification.mp3");
      audio.volume = 0;
      audio.play().catch(() => {});
      document.removeEventListener("click", unlockAudio);
      document.removeEventListener("keydown", unlockAudio);
    };

    document.addEventListener("click", unlockAudio);
    document.addEventListener("keydown", unlockAudio);

    return () => {
      document.removeEventListener("click", unlockAudio);
      document.removeEventListener("keydown", unlockAudio);
    };
  }, []);

  // Play sound when chat opens
  useEffect(() => {
    if (isOpen) {
      const audio = new Audio("/sounds/notification.mp3");
      audio.volume = 0.6;
      audio.play().catch((e) => console.log("Audio permission denied:", e));
    }
  }, [isOpen]);

  // Cycle visibility and text
  useEffect(() => {
    if (!showPrompt) return;

    let timer: NodeJS.Timeout;

    if (isBubbleVisible) {
      timer = setTimeout(() => {
        setIsBubbleVisible(false);
      }, 5000);
    } else {
      timer = setTimeout(() => {
        setPromptIndex((prev) => (prev + 1) % prompts.length);
        setIsBubbleVisible(true);
      }, 500);
    }
    return () => clearTimeout(timer);
  }, [isBubbleVisible, showPrompt]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, currentStep]);

  const addBotMessage = (text: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const newMessage: Message = {
        id: Date.now().toString(),
        text,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newMessage]);
    }, 1000);
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const generateWhatsAppLink = (data: UserData) => {
    const leadHeader = lang === 'es' ? 'Nuevos Datos de Cliente' : 'New Portfolio Lead';
    const text = `
*${leadHeader}* 🚀
*Nombre:* ${data.name || "N/A"}
*Intent:* ${data.intent || "N/A"}
*Type:* ${data.projectType || "N/A"}
*Scope:* ${data.scope || "N/A"}
*Details:* ${data.details || "N/A"}

${lang === 'es' ? 'Hola Yeison, soy ' + (data.name || '') + ' y estoy interesado en discutir este proyecto.' : 'Hello Yeison, I am ' + (data.name || '') + ' and I am interested in discussing this project.'}
    `.trim();
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  const handleOptionClick = (
    text: string,
    nextStep: Step,
    dataUpdate: Partial<UserData>,
  ) => {
    addUserMessage(text);
    setUserData((prev) => ({ ...prev, ...dataUpdate }));
    setCurrentStep(nextStep);

    if (nextStep === "name") {
      addBotMessage(t.questions.name);
    } else if (nextStep === "qualification") {
      addBotMessage(t.questions.qualification);
    } else if (nextStep === "scope") {
      addBotMessage(t.questions.scope);
    } else if (nextStep === "details") {
      addBotMessage(t.questions.details);
    } else if (nextStep === "contact-method") {
      addBotMessage(t.questions.contactMethod);
    } else if (nextStep === "confirmation") {
      addBotMessage(t.questions.confirmation);
    }
  };

  const handleContactMethodSelect = (method: string, methodLabel: string) => {
    const updatedData = { ...userData, contactMethod: method };
    setUserData(updatedData);
    addUserMessage(methodLabel);

    if (method === "WhatsApp") {
      setCurrentStep("confirmation");
      addBotMessage(t.questions.whatsappRedirect);
      
      // ✅ LOGIC TO SEND TO DISCORD
      sendLeadToDiscord(updatedData);

      // We'll provide a button for manual redirection in the confirmation step 
      // but try auto-redirect as a fallback
      setTimeout(() => {
        const link = generateWhatsAppLink(updatedData);
        window.open(link, "_blank", "noopener,noreferrer");
      }, 1500);
    } else {
      setCurrentStep("contact-input");
      addBotMessage(
        method === "Schedule a call"
          ? t.questions.contactInputCall
          : t.questions.contactInputGeneric.replace("{method}", methodLabel.toLowerCase()),
      );
    }
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    addUserMessage(inputValue);
    setInputValue("");

    if (currentStep === "name") {
      const updatedData = { ...userData, name: inputValue };
      setUserData(updatedData);
      setCurrentStep("phone");
      addBotMessage(t.questions.phone.replace("{name}", inputValue));
    } else if (currentStep === "phone") {
      const updatedData = { ...userData, phone: inputValue };
      setUserData(updatedData);
      setCurrentStep("qualification");
      addBotMessage(t.questions.qualification);
    } else if (currentStep === "details") {
      const updatedData = { ...userData, details: inputValue };
      setUserData(updatedData);
      setCurrentStep("contact-method");
      addBotMessage(t.questions.contactMethod);

      // ✅ SEND PARTIAL LEAD TO DISCORD (As requested: before choosing contact method)
      sendLeadToDiscord(updatedData, true);
    } else if (currentStep === "contact-input") {
      setUserData((prev) => ({ ...prev, contactValue: inputValue }));
      setCurrentStep("confirmation");
      addBotMessage(t.questions.confirmation);
      
      // ✅ LOGIC TO SEND TO DISCORD
      const finalData = { ...userData, contactValue: inputValue };
      sendLeadToDiscord(finalData);
    }
  };

  const sendLeadToDiscord = async (data: UserData, isPartial: boolean = false) => {
    const webhook = discordWebhook || import.meta.env.PUBLIC_DISCORD_WEBHOOK_URL;
    
    if (!webhook) {
      console.warn("Discord Webhook URL not available.");
      return;
    }

    try {
      // Robustly get all data even if state is slightly behind
      const safeData = {
        name: data.name || "N/A",
        phone: data.phone || "N/A",
        intent: data.intent || "N/A",
        projectType: data.projectType || "N/A",
        scope: data.scope || "N/A",
        details: (data.details || "N/A").substring(0, 1000), 
        contactMethod: data.contactMethod || "N/A",
        contactValue: (data.contactValue || "N/A").substring(0, 1000)
      };

      const titleMap = {
        partial: lang === 'es' ? "⏳ Lead en progreso (Detalles recibidos)" : "⏳ Lead in progress (Details received)",
        final: lang === 'es' ? "✅ ¡Lead Completo y Validado!" : "✅ Final Lead Received!"
      };

      const message = {
        embeds: [
          {
            title: isPartial ? titleMap.partial : titleMap.final,
            color: isPartial ? 16761095 : 11807190, // Gold for partial, Purple for final
            fields: [
              { name: lang === 'es' ? "👤 Nombre" : "👤 Name", value: safeData.name, inline: true },
              { name: lang === 'es' ? "📞 Teléfono" : "📞 Phone", value: safeData.phone, inline: true },
              { name: lang === 'es' ? "📍 Intención" : "📍 Intent", value: safeData.intent, inline: true },
              { name: lang === 'es' ? "💼 Tipo" : "💼 Type", value: safeData.projectType, inline: true },
              { name: lang === 'es' ? "📊 Alcance" : "📊 Scope", value: safeData.scope, inline: true },
              { name: lang === 'es' ? "📝 Detalles" : "📝 Details", value: safeData.details, inline: false },
              { 
                name: lang === 'es' ? "📞 Contacto Final" : "📞 Final Contact", 
                value: safeData.contactMethod === "WhatsApp" ? "Redirigido a WhatsApp 🚀" : `[${safeData.contactMethod}] ${safeData.contactValue}`, 
                inline: false 
              },
              { name: "🕒 Hora", value: new Date().toLocaleString(), inline: true }
            ],
            footer: { text: "Yeison Portfolio Chat System" }
          }
        ]
      };

      const response = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Discord API error:", response.status, errorText);
      } else {
        console.log("Lead successfully sent to Discord! ✅");
      }
    } catch (e) {
      console.error("Network error sending chat lead:", e);
    }
  };

  const renderOptions = () => {
    if (isTyping) return null;

    switch (currentStep) {
      case "welcome":
        return (
          <div className="flex flex-col gap-2 mt-4">
            <OptionButton
              icon={<Zap size={18} className="text-yellow-400" />}
              label={t.options.build}
              onClick={() =>
                handleOptionClick(t.options.build, "name", {
                  intent: "build",
                })
              }
            />
            <OptionButton
              icon={<Code size={18} className="text-blue-400" />}
              label={t.options.ai}
              onClick={() =>
                handleOptionClick(t.options.ai, "name", { intent: "ai" })
              }
            />
            <OptionButton
              icon={<Briefcase size={18} className="text-purple-400" />}
              label={t.options.hire}
              onClick={() =>
                handleOptionClick(t.options.hire, "name", { intent: "hire" })
              }
            />
          </div>
        );

      case "name":
      case "phone":
        return (
          <form className="mt-4 flex gap-2" onSubmit={handleInputSubmit}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={currentStep === "name" ? (lang === 'es' ? "Tu nombre..." : "Your name...") : (lang === 'es' ? "Tu teléfono..." : "Your phone...")}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
              autoFocus
            />
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-xl transition-colors"
            >
              <Send size={18} />
            </button>
          </form>
        );

      case "qualification":
        return (
          <div className="flex flex-col gap-2 mt-4">
            <OptionButton
              icon={<User size={18} className="text-green-400" />}
              label={t.options.personal}
              onClick={() =>
                handleOptionClick(t.options.personal, "scope", {
                  projectType: "personal",
                })
              }
            />
            <OptionButton
              icon={<Building size={18} className="text-orange-400" />}
              label={t.options.business}
              onClick={() =>
                handleOptionClick(t.options.business, "scope", {
                  projectType: "business",
                })
              }
            />
          </div>
        );

      case "scope":
        return (
          <div className="flex flex-col gap-2 mt-4">
            <OptionButton
              icon={<Zap size={18} className="text-white" />}
              label={t.options.scratch}
              onClick={() =>
                handleOptionClick(t.options.scratch, "details", {
                  scope: "scratch",
                })
              }
            />
            <OptionButton
              icon={<ArrowRight size={18} className="text-white" />}
              label={t.options.existing}
              onClick={() =>
                handleOptionClick(t.options.existing, "details", {
                  scope: "existing",
                })
              }
            />
          </div>
        );

      case "details":
        return (
          <form className="mt-4 flex gap-2" onSubmit={handleInputSubmit}>
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t.options.detailsPlaceholder}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors resize-none h-24"
              autoFocus
            />
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-xl transition-colors self-end"
            >
              <Send size={18} />
            </button>
          </form>
        );

      case "contact-method":
        return (
          <div className="grid grid-cols-1 gap-2 mt-4">
            <OptionButton
              icon={<MessageSquare size={18} className="text-green-500" />}
              label={t.options.contactWhatsApp}
              onClick={() => handleContactMethodSelect("WhatsApp", t.options.contactWhatsApp)}
            />
            <OptionButton
              icon={<Mail size={18} className="text-blue-500" />}
              label={t.options.contactEmail}
              onClick={() => handleContactMethodSelect("Email", t.options.contactEmail)}
            />
            <OptionButton
              icon={<Calendar size={18} className="text-purple-500" />}
              label={t.options.contactCall}
              onClick={() => handleContactMethodSelect("Schedule a call", t.options.contactCall)}
            />
          </div>
        );

      case "contact-input":
        return (
          <form className="mt-4 flex gap-2" onSubmit={handleInputSubmit}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t.options.inputPlaceholder}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
              autoFocus
            />
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-xl transition-colors"
            >
              <Send size={18} />
            </button>
          </form>
        );

      case "confirmation":
        const isWhatsApp = userData.contactMethod === "WhatsApp";
        return (
          <div className="mt-6 flex flex-col gap-3">
            <a
              href={isWhatsApp ? generateWhatsAppLink(userData) : `mailto:${db[lang].personalInfo.social.email}`}
              target={isWhatsApp ? "_blank" : "_self"}
              className="w-full py-3 bg-white text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
            >
              {isWhatsApp ? t.options.contactWhatsApp : t.options.contactNow} 
              {isWhatsApp ? <MessageSquare size={16} /> : <Mail size={16} />}
            </a>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs text-gray-500 hover:text-white mt-2"
            >
              {t.options.closeChat}
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 md:inset-auto md:bottom-6 md:right-6 w-full md:w-[400px] md:h-[600px] h-full bg-[#0A0A0A] md:rounded-3xl border border-white/10 shadow-2xl overflow-hidden z-[100] flex flex-col font-sans"
          >
            {/* Header */}
            <div className="p-4 bg-linear-to-r from-purple-900/80 to-blue-900/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-400 to-blue-500 flex items-center justify-center overflow-hidden border-2 border-white/20">
                    <img
                      src="/chat-avatar.png"
                      alt="Yeison AI"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#121212]"></div>
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">
                    {t.assistantName}
                  </h3>
                  <p className="text-purple-300 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
                    {t.onlineStatus}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/50 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-5 py-4 text-sm leading-relaxed shadow-lg ${
                      msg.sender === "user"
                        ? "bg-purple-600 text-white rounded-tr-sm"
                        : "bg-[#18181b] border border-white/10 text-gray-200 rounded-tl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#18181b] border border-white/10 rounded-2xl rounded-tl-sm px-5 py-4 flex items-center gap-1 shadow-lg">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                    <span
                      className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></span>
                    <span
                      className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></span>
                  </div>
                </div>
              )}

              {/* Options Container */}
              {!isTyping && (
                <div className="mt-2 text-right space-y-2">
                  {renderOptions()}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/5 bg-[#050505]/50 backdrop-blur text-center shrink-0">
              {currentStep !== "contact-input" && (
                <p className="text-[10px] text-gray-600 flex items-center justify-center gap-1">
                  Powered by <Zap size={10} /> {t.assistantName}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Prompt Bubble */}
      <AnimatePresence>
        {!isOpen && showPrompt && isBubbleVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-20 md:bottom-28 right-4 md:right-8 z-[100] max-w-[180px] md:max-w-[200px]"
          >
            <div className="bg-white border-2 border-black px-5 py-3 rounded-2xl shadow-[4px_4px_0px_rgba(0,0,0,1)] relative">
              <div className="relative z-10 flex items-center justify-center gap-3 text-xs font-bold tracking-wide text-black">
                <div className="w-8 h-8 rounded-full bg-yellow-300 flex items-center justify-center border-2 border-black shrink-0">
                  <Sparkles size={14} className="text-black fill-white" />
                </div>
                <motion.span
                  key={promptIndex}
                  initial={{ opacity: 0, x: 5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -5 }}
                  className="uppercase leading-tight text-center"
                >
                  {prompts[promptIndex]}
                </motion.span>
              </div>
              <div className="absolute -bottom-[12px] right-8 w-5 h-5 bg-white border-r-2 border-b-2 border-black transform rotate-45"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Trigger Pill */}
      <AnimatePresence>
        {!isOpen && showPrompt && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-4 md:bottom-8 right-4 md:right-8 bg-[#2e1065] border border-white/20 p-1.5 pr-6 rounded-full shadow-[0_8px_30px_rgba(46,16,101,0.6)] cursor-pointer z-[100] flex items-center gap-4 group transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-r from-violet-600/50 to-purple-600/50 pointer-events-none"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-full border-2 border-white/10 overflow-hidden relative">
                <img
                  src="/chat-avatar.png"
                  alt="AI"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-tr from-white/20 to-transparent pointer-events-none"></div>
              </div>
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-[#2e1065] rounded-full drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
            </div>
            <div className="flex flex-col items-start justify-center z-10 h-10">
              <span className="text-xs font-bold text-purple-300 leading-none mb-0.5">
                {t.floatingLabel}
              </span>
              <div className="flex items-center gap-1 text-white font-bold text-base shadow-black drop-shadow-md leading-none">
                {t.startChatting}
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </div>
            </div>
            <div className="absolute inset-0 pointer-events-none rounded-full ring-1 ring-white/10 group-hover:ring-purple-400/50 transition-all"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// --- Subcomponent: Option Button ---

function OptionButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="ml-auto w-fit max-w-[90%] flex items-center gap-3 px-5 py-3 bg-[#1e1e24] hover:bg-[#27272f] border border-white/10 hover:border-purple-500/50 rounded-2xl rounded-tr-sm transition-all duration-200 group text-left shadow-md"
    >
      <div className="p-1.5 bg-black/30 rounded-lg group-hover:scale-110 transition-transform shrink-0">
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-200 group-hover:text-white">
        {label}
      </span>
    </button>
  );
}
