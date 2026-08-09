import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Send,
  Rocket,
  Bot,
  UserPlus,
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

// Mirrors the check in api/notify.ts so the client never rejects what the server
// would accept, or vice versa.
const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

// Counts digits rather than matching a format: separators, parentheses and
// country prefixes vary too much to pattern-match reliably. The 7-15 range spans
// the shortest national numbers up to the E.164 maximum.
const isValidPhone = (value: string) => {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
};

interface ChatWidgetProps {
  lang?: "es" | "en";
}

// --- Component ---

export default function ChatWidget({ lang = "es" }: ChatWidgetProps) {
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
        const { messages: savedMessages, currentStep: savedStep, userData: savedData, isOpen: savedIsOpen } = JSON.parse(savedChat);
        setMessages(savedMessages.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) })));
        setCurrentStep(savedStep);
        setUserData(savedData);
        // Only re-open if it was explicitly open before
        if (savedIsOpen) {
          setIsOpen(true);
        }
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
      userData,
      isOpen // Now we save the intentional visibility state
    };
    sessionStorage.setItem("chat_state", JSON.stringify(chatState));
  }, [messages, currentStep, userData, isOpen]);

  // Initial Greeting if empty
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage(t.greeting);
    }
  }, [isOpen]);

  // Listen for sectionChange to cancel auto-open if user navigates away from Home
  useEffect(() => {
    const cancelAutoOpenOnNav = () => {
      sessionStorage.setItem("chat_auto_triggered", "true");
    };
    window.addEventListener("sectionChange", cancelAutoOpenOnNav);
    return () => window.removeEventListener("sectionChange", cancelAutoOpenOnNav);
  }, []);

  // Auto-open logic specifically for Home page (once per session)
  useEffect(() => {
    const pathname = window.location.pathname;
    const isHome = pathname === "/" || pathname === "/es" || pathname === "/es/" || pathname === "/en" || pathname === "/en/";
    
    const hasAlreadyAutoOpened = sessionStorage.getItem("chat_auto_triggered");
    const isDismissed = sessionStorage.getItem("chat_dismissed");

    if (isHome && !hasAlreadyAutoOpened && !isDismissed && !isOpen && messages.length === 0) {
      const timer = setTimeout(() => {
        // Re-check hash before auto-opening (ensure user is still on Home)
        const currentHash = window.location.hash;
        if (!currentHash || currentHash === "#" || currentHash === "#home" || currentHash === "#inicio") {
          setIsOpen(true);
        }
        sessionStorage.setItem("chat_auto_triggered", "true");
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Tooltip prompt cycle (only if not dismissed)
  useEffect(() => {
    const isDismissed = sessionStorage.getItem("chat_dismissed");
    if (isDismissed || isOpen) {
      setShowPrompt(false);
      setIsBubbleVisible(false);
      return;
    }

    const timer = setTimeout(() => {
      setShowPrompt(true);
      setIsBubbleVisible(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [isOpen]);

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

  // Play sound ONLY when chat is explicitly opened
  useEffect(() => {
    if (isOpen && !isInitialMount.current) {
      const audio = new Audio("/sounds/notification.mp3");
      audio.volume = 0.5;
      audio.play().catch(() => {});
    }
  }, [isOpen]);

  // Cycle visibility and text for prompt bubble
  useEffect(() => {
    if (!showPrompt || isOpen) return;

    let timer: NodeJS.Timeout;

    if (isBubbleVisible) {
      timer = setTimeout(() => {
        setIsBubbleVisible(false);
      }, 5000);
    } else {
      timer = setTimeout(() => {
        setPromptIndex((prev) => (prev + 1) % prompts.length);
        setIsBubbleVisible(true);
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [isBubbleVisible, showPrompt, isOpen]);

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

  // Returns the bot's correction for an invalid answer, or null when it passes.
  // Rejecting here is what keeps unreachable leads out of Discord: a lead that
  // looks complete but carries a malformed email cannot be followed up.
  const validateStep = (step: Step, value: string): string | null => {
    switch (step) {
      case "name":
        return value.length < 2 ? t.validation.nameTooShort : null;
      case "phone":
        return isValidPhone(value) ? null : t.validation.phoneInvalid;
      case "details":
        return value.length < 10 ? t.validation.detailsTooShort : null;
      case "contact-input":
        // Both remaining methods ask for an email: "Email" directly, and
        // "Schedule a call" to send the invite. WhatsApp never reaches this step.
        return isValidEmail(value) ? null : t.validation.emailInvalid;
      default:
        return null;
    }
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const trimmedValue = inputValue.trim();
    const validationError = validateStep(currentStep, trimmedValue);

    addUserMessage(inputValue);
    setInputValue("");

    // The answer stays in the transcript and the bot asks again, so the exchange
    // still reads as a conversation rather than a form rejecting input. The step
    // is left unchanged, which is what lets the user retry.
    if (validationError) {
      addBotMessage(validationError);
      return;
    }

    if (currentStep === "name") {
      const updatedData = { ...userData, name: trimmedValue };
      setUserData(updatedData);
      setCurrentStep("phone");
      addBotMessage(t.questions.phone.replace("{name}", trimmedValue));
    } else if (currentStep === "phone") {
      const updatedData = { ...userData, phone: trimmedValue };
      setUserData(updatedData);
      setCurrentStep("qualification");
      addBotMessage(t.questions.qualification);
    } else if (currentStep === "details") {
      const updatedData = { ...userData, details: trimmedValue };
      setUserData(updatedData);
      setCurrentStep("contact-method");
      addBotMessage(t.questions.contactMethod);

      // ✅ SEND PARTIAL LEAD TO DISCORD (As requested: before choosing contact method)
      sendLeadToDiscord(updatedData, true);
    } else if (currentStep === "contact-input") {
      setUserData((prev) => ({ ...prev, contactValue: trimmedValue }));
      setCurrentStep("confirmation");
      addBotMessage(t.questions.confirmation);

      // ✅ LOGIC TO SEND TO DISCORD
      const finalData = { ...userData, contactValue: trimmedValue };
      sendLeadToDiscord(finalData);
    }
  };

  const sendLeadToDiscord = async (data: UserData, isPartial: boolean = false) => {
    try {
      // Only structured data is sent. The embed is assembled server-side in
      // /api/notify, which also holds the webhook credential.
      const response = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "lead",
          lang,
          partial: isPartial,
          name: data.name,
          phone: data.phone,
          intent: data.intent,
          projectType: data.projectType,
          scope: data.scope,
          details: data.details,
          contactMethod: data.contactMethod,
          contactValue: data.contactValue,
        }),
      });

      if (!response.ok) {
        console.error("Notification endpoint error:", response.status);
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
              icon={<Rocket size={18} className="text-primary" />}
              label={t.options.build}
              onClick={() =>
                handleOptionClick(t.options.build, "name", {
                  intent: "build",
                })
              }
            />
            <OptionButton
              icon={<Bot size={18} className="text-blue-400" />}
              label={t.options.ai}
              onClick={() =>
                handleOptionClick(t.options.ai, "name", { intent: "ai" })
              }
            />
            <OptionButton
              icon={<UserPlus size={18} className="text-emerald-400" />}
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
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-primary-500 transition-colors"
              autoFocus
            />
            <button
              type="submit"
              className="bg-primary hover:bg-primary text-white p-2 rounded-xl transition-colors"
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
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary-500 transition-colors resize-none h-24"
              autoFocus
            />
            <button
              type="submit"
              className="bg-primary hover:bg-primary text-white p-3 rounded-xl transition-colors self-end"
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
              icon={<Calendar size={18} className="text-primary" />}
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
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-primary-500 transition-colors"
              autoFocus
            />
            <button
              type="submit"
              className="bg-primary hover:bg-[#fcd34d] text-[#020617] p-2 rounded-xl transition-colors"
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
            transition={{ duration: 0.2, type: "tween" }}
            style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
            className="fixed inset-x-4 top-6 bottom-6 md:inset-auto md:bottom-6 md:right-6 w-auto md:w-[400px] md:h-[600px] h-auto bg-[#0A0A0A] rounded-3xl border border-white/10 shadow-2xl overflow-hidden z-[100] flex flex-col font-sans"
          >
            {/* Header - no backdrop-blur on mobile for perf */}
            <div className="p-4 bg-[#18181b]/90 md:backdrop-blur-md border-b border-white/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center overflow-hidden border-2 border-white/20">
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
                  <p className="text-white/80 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
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
                <div
                  key={msg.id}
                  className={`flex chat-msg-enter ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-5 py-4 text-sm font-medium leading-relaxed shadow-lg ${
                      msg.sender === "user"
                        ? "bg-primary text-[#020617] rounded-tr-sm font-bold"
                        : "bg-[#18181b] border border-white/10 text-gray-200 rounded-tl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
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

            {/* Footer - simplified */}
            <div className="p-4 border-t border-white/5 bg-[#050505]/80 text-center shrink-0">
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
            transition={{ type: "tween", duration: 0.15 }}
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
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-4 md:bottom-8 right-4 md:right-8 bg-white border-none p-1.5 pr-6 rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.2)] cursor-pointer z-[100] flex items-center gap-4 group transition-all duration-500 overflow-hidden"
          >
            {/* Dynamic Geometric Shapes */}
            <div className="absolute inset-0 pointer-events-none rounded-full overflow-hidden">
              {/* Main diagonal gold block */}
              <div className="absolute top-[-50%] bottom-[-50%] right-[-10%] w-[88%] bg-primary skew-x-[24deg] group-hover:-translate-x-2 transition-transform duration-500 shadow-[-5px_0_15px_rgba(0,0,0,0.05)]"></div>
              {/* Secondary parallel accent strip */}
              <div className="absolute top-[-50%] bottom-[-50%] right-[78%] w-1.5 bg-black/10 skew-x-[24deg] group-hover:-translate-x-4 transition-transform duration-500"></div>
            </div>

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-full border-none overflow-hidden relative shadow-md">
                <img
                  src="/chat-avatar.png"
                  alt="AI"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
            </div>
            <div className="flex flex-col items-start justify-center z-10 h-10 relative">
              <span className="text-[10px] font-black text-black leading-none mb-1 tracking-wider uppercase">
                {t.floatingLabel}
              </span>
              <div className="flex items-center gap-1 text-black font-black text-base leading-none">
                {t.startChatting}
                <ArrowRight
                  size={16}
                  className="text-primary group-hover:translate-x-1 transition-transform"
                />
              </div>
            </div>
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
      className="ml-auto w-fit max-w-[90%] flex items-center gap-3 px-5 py-3 bg-[#1e1e24] hover:bg-[#27272f] border border-white/10 hover:border-primary-500/50 rounded-2xl rounded-tr-sm transition-all duration-200 group text-left shadow-md"
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
