import type { Translations } from "../types";

export const db: Translations = {
  es: {
    personalInfo: {
      name: "Yeison",
      lastName: "Ruiz",
      title: "Arquitecto de Software & <br/> Desarrollador Creativo",
      description:
        "Construyendo experiencias web inmersivas y arquitecturas robustas utilizando tecnologías modernas como React, Next.js y Node.",
      availability: {
        status: "Disponible para trabajar",
        active: true,
      },
      stats: {
        experience: "12+",
        projects: "100+",
        satisfied: "100%",
      },
      social: {
        github: "https://github.com/yeisonruiz",
        email: "yeisonruizdev@gmail.com",
        linkedin: "#",
      },
      certifications: [
        {
          id: "google-ai-prof",
          title: "Google AI Professional",
          issuer: "Google",
          date: "Feb 2026",
          link: "https://coursera.org/verify/professional-cert/6WYB2PMJEE1P",
          shortName: "Google AI"
        },
        {
          id: "deeplearning-prof",
          title: "Generative AI for Software Development",
          issuer: "DeepLearning.AI",
          date: "Mar 2026",
          link: "https://coursera.org/verify/professional-cert/7ENB1XE719H6",
          shortName: "GenAI"
        },
        {
          id: "google-content",
          title: "AI for Content Creation",
          issuer: "Google",
          date: "Feb 2026",
          link: "https://coursera.org/verify/MRJW10YR1WVL",
          shortName: "Content AI"
        },
        {
          id: "google-apps",
          title: "AI for App Building",
          issuer: "Google",
          date: "Feb 2026",
          link: "https://coursera.org/verify/4E2PL1IWGLE2",
          shortName: "App AI"
        },
        {
          id: "google-data",
          title: "AI for Data Analysis",
          issuer: "Google",
          date: "Feb 2026",
          link: "https://coursera.org/verify/NU2N2RIOJTY1",
          shortName: "Data AI"
        },
        {
          id: "google-research",
          title: "AI for Research and Insights",
          issuer: "Google",
          date: "Feb 2026",
          link: "https://coursera.org/verify/VUTDWE9GLPES",
          shortName: "Research AI"
        },
        {
          id: "dl-team",
          title: "Team Software Engineering with AI",
          issuer: "DeepLearning.AI",
          date: "Mar 2026",
          link: "https://coursera.org/verify/TN417ZJNP70B",
          shortName: "Team AI"
        },
        {
          id: "dl-system-design",
          title: "AI-Powered Software and System Design",
          issuer: "DeepLearning.AI",
          date: "Mar 2026",
          link: "https://coursera.org/verify/FZ2UGHPWCKKV",
          shortName: "System Design AI"
        },
        {
          id: "react-ts",
          title: "React y TypeScript - La Guía Completa Creando +10 Proyectos",
          issuer: "Udemy",
          date: "2023",
          link: "#",
          shortName: "React & TS"
        },
        {
          id: "nextjs-15",
          title: "Next.js 15 y React 19 | Clon de Linktree Fullstack completo",
          issuer: "Curso Online",
          date: "2024",
          link: "#",
          shortName: "Next.js 15"
        },
        {
          id: "react-native-expo",
          title: "React Native Expo: Aplicaciones nativas para IOS y Android",
          issuer: "Curso Online",
          date: "2023",
          link: "#",
          shortName: "React Native"
        },
        {
          id: "design-ts",
          title: "Diseño de Plataformas con Typescript",
          issuer: "Curso Online",
          date: "2022",
          link: "#",
          shortName: "TS Platforms"
        },
        {
          id: "modern-js",
          title: "Modern JavaScript for React JS - ES6",
          issuer: "Curso Online",
          date: "2021",
          link: "#",
          shortName: "Modern JS"
        },
        {
          id: "laravel-12",
          title: "Laravel 12 Tutorial For Beginners to Advance",
          issuer: "Curso Online",
          date: "2020",
          link: "#",
          shortName: "Laravel 12"
        }
      ]
    },
    ui: {
      nav: {
        home: "Inicio",
        timeline: "Trayectoria",
        certificaciones: "Certificaciones",
        services: "Servicios",
        projects: "Proyectos",
        contact: "Contactenos",
      },
      hero: {
        explore: "Explorar Proyectos",
        viewServices: "Ver Servicios",
        expLabel: "Años Exp",
        projectsLabel: "Proyectos",
        satisfiedLabel: "Satisfechos",
      },
      services: {
        badge: "Soluciones de Alto Nivel",
        title: "Elevando el",
        titleHighlight: "estándar digital",
        descriptionHighlight: "SDD",
        description: "Diseño ecosistemas de alto rendimiento bajo la arquitectura . Potencia, escalabilidad y una estética impecable.",
      },
      timeline: {
        badge: "Línea de Tiempo Profesional",
        title: "Mi",
        titleHighlight: "Trayectoria",
        description: "Un recorrido de constante evolución, enfrentando desafíos complejos y construyendo soluciones digitales que escalan.",
      },
      projects: {
        badge: "Showcase 2026",
        title: "Proyectos",
        titleHighlight: "Destacados",
        description: "Explora una colección de aplicaciones digitales inmersivas, diseñadas con tecnologías modernas y atención al detalle.",
        discover: "Descubrir Proyecto",
        modal: {
          tools: "Herramientas y Tecnologías",
          visit: "Visitar en vivo",
        },
      },
      footer: {
        tagline: "Construyendo el futuro de la web.",
        rights: "Todos los derechos reservados.",
      },
      contact: {
        title: "Despliegue",
        titleHighlight: "Global",
        description: "¿Listo para transformar tus ideas en realidad? Hablemos de tu próximo gran proyecto.",
        form: {
          nameLabel: "Nombre",
          namePlaceholder: "Tu Nombre",
          emailLabel: "Correo Electrónico",
          emailPlaceholder: "tu@ejemplo.com",
          phoneLabel: "Teléfono",
          phonePlaceholder: "+57 ...",
          messageLabel: "Tu Mensaje",
          messagePlaceholder: "Cuéntame sobre tu proyecto...",
          send: "Enviar Mensaje",
        },
      },
      slugs: {
        home: "",
        timeline: "trayectoria",
        certificaciones: "certificaciones",
        services: "servicios",
        projects: "proyectos",
        contact: "contactenos",
      },
      notFound: {
        title: "Página no encontrada",
        description: "Parece que te has aventurado en una ruta que aún no ha sido construida o ha sido movida.",
        backHome: "Volver al Inicio",
      },
      chat: {
        assistantName: "Asistente IA de Yeison",
        onlineStatus: "En línea",
        prompts: ["👋 ¡Hola! ¿Necesitas ayuda?", "🚀 ¡Construyamos algo increíble!", "💡 ¿Tienes una idea de proyecto?"],
        floatingLabel: "Chatea con Yeison IA",
        startChatting: "Empezar a chatear",
        greeting: "👋 Hola, soy el asistente IA de Yeison. ¿Qué te gustaría construir hoy?",
        questions: {
          name: "¡Perfecto! Primero que nada, ¿cuál es tu nombre?",
          phone: "¡Un gusto, {name}! ¿A qué número de teléfono o WhatsApp podría contactarte?",
          qualification: "¿Este es un proyecto personal o para un negocio?",
          scope: "¿Ya tienes algo construido?",
          details: "¿Podrías describir tu idea, requisitos o cualquier pregunta específica que tengas? (Puedes escribir libremente)",
          contactMethod: "¡Genial! ¿Cuál es la mejor forma de contactarte?",
          contactInputGeneric: "Por favor, ingresa tu {method}:",
          contactInputCall: "Sin spam. Solo contacto relacionado al proyecto. Por favor deja tu correo para enviarte la invitación.",
          confirmation: "¡Gracias! Estaré en contacto pronto.",
          whatsappRedirect: "¡Excelente! Abriendo WhatsApp para conectarte directamente con Yeison...",
        },
        options: {
          build: "Construir un sitio o app",
          ai: "Integrar IA en un producto",
          hire: "Contratar un desarrollador",
          personal: "Proyecto personal",
          business: "Proyecto de negocio",
          scratch: "Empezar desde cero",
          existing: "Mejorar un producto existente",
          detailsPlaceholder: "Describe tu proyecto, funciones o preguntas...",
          contactWhatsApp: "Chatear por WhatsApp (Más rápido)",
          contactEmail: "Enviar por Correo",
          contactCall: "Agendar una llamada",
          inputPlaceholder: "Escribe tus detalles...",
          contactNow: "Contactar Ahora",
          closeChat: "Cerrar chat",
        },
      },
    },
    services: [
      {
        id: "frontend",
        icon: "code",
        title: "Desarrollo Web Frontend",
        description:
          "Especialista en la construcción de interfaces de usuario de alto impacto bajo la metodología SDD (Speed Driven Development). Diseño arquitecturas frontend resilientes y ultrarrápidas utilizando Astro, Next.js y React, priorizando siempre un puntaje perfecto en Core Web Vitals y una experiencia de usuario (UX) fluida y cinematográfica mediante animaciones avanzadas.",
        tags: ["Vue.js", "React", "Node", "Express", "Next.js", "Astro", "TypeScript", "Tailwind CSS"],
        gradient: "from-green-500/20 to-blue-500/20",
      },
      {
        id: "enterprise",
        icon: "briefcase",
        title: "Sitios Web Empresariales",
        description:
          "Desarrollo ecosistemas digitales corporativos robustos y aplicaciones web de gran escala. Mi enfoque combina la potencia de Laravel en el backend con la interactividad de Next.js o Vue.js en el frontend. Soluciones orientadas a resultados B2B/B2C que integran flujos de trabajo complejos, seguridad de grado bancario y escalabilidad horizontal para soportar el crecimiento constante de tu negocio.",
        tags: ["Node", "Express", "Vue.js", "Laravel", "Next.js", "Astro"],
        gradient: "from-purple-500/20 to-pink-500/20",
      },
      {
        id: "uiux",
        icon: "palette",
        title: "Diseño UI/UX y Tailwind",
        description:
          "Diseño productos digitales que no solo se ven increíbles, sino que funcionan con una precisión milimétrica. Utilizo Figma para el prototipado de alta fidelidad y Tailwind CSS para una implementación limpia y escalable. Mi proceso incluye investigación de usuario detallada y el diseño de micro-interacciones que refuerzan la identidad de marca y aumentan las tasas de conversión.",
        tags: ["Tailwind CSS", "Figma", "UX Research", "Prototyping", "Micro-interactions", "Responsive Design"],
        gradient: "from-yellow-500/20 to-orange-500/20",
      },
      {
        id: "seo",
        icon: "chart",
        title: "Auditoría SEO y Rendimiento",
        description:
          "Maximizo la visibilidad orgánica de tu proyecto mediante auditorías técnicas exhaustivas y estrategias de optimización de rendimiento basadas en SDD. No solo mejoro los rankings, sino que optimizo el TTFB, el LCP y el CLS para garantizar que Google y tus usuarios amen tu sitio. Implemento análisis de brecha de contenido y estrategias de indexación avanzada para dominar los motores de búsqueda.",
        tags: ["SDD", "SEO Técnico", "Core Web Vitals", "Ahrefs / Semrush", "Google Search Console", "PageSpeed"],
        gradient: "from-blue-600/20 to-cyan-400/20",
      },
      {
        id: "integrations",
        icon: "cloud",
        title: "Infraestructura e Integraciones",
        description:
          "Arquitecto e implemento infraestructuras Cloud Native en AWS y Google Cloud, garantizando despliegues automatizados y alta disponibilidad. Soy experto en la orquestación de APIs REST y GraphQL masivas, integración de pasarelas de pago como Stripe y automatización de canales de comunicación mediante la API de WhatsApp, creando un ecosistema digital conectado y eficiente.",
        tags: ["API REST", "Node", "Express", "AWS", "Google Cloud", "WhatsApp API"],
        gradient: "from-indigo-500/20 to-purple-500/20",
        badge: {
          text: "Cloud Ops",
          color: "bg-blue-500",
        },
      },
    ],
    timeline: [
      {
        id: "cert-genai",
        year: "2026",
        title: "Generative AI for Software Development",
        company: "DeepLearning.AI",
        description: "Certificación profesional enfocada en la integración de LLMs en el flujo de desarrollo, diseño de sistemas potenciados por IA y automatización inteligente.",
        tags: ["Integración de LLM", "Prompt Engineering", "AI System Design"],
        align: "right",
        colorClass: "primary",
        icon: "M13 10V3L4 14h7v7l9-11h-7z",
        isSpecial: true
      },
      {
        id: "cert-google",
        year: "2026",
        title: "Google AI Professional",
        company: "Google",
        description: "Dominio de los fundamentos de IA, aprendizaje automático y herramientas de Google para la creación de soluciones digitales inteligentes a escala global.",
        tags: ["Machine Learning", "Google Cloud AI", "Fundamentos de IA"],
        align: "left",
        colorClass: "blue-500",
        icon: "M13 10V3L4 14h7v7l9-11h-7z",
        isSpecial: true
      },
      {
        id: "2025",
        year: "2022 - 2025",
        title: "Desarrollador Web y Analista SEO",
        company: "LossUp Adjust",
        description:
          "Desarrollo de interfaces ultrarrápidas y sitios web personalizados. Integración de flujos con Inteligencia Artificial, estrategias SEO avanzadas y optimización de Core Web Vitals (TTFB del 99%).",
        tags: ["Next.js", "Astro", "React", "SEO", "IA"],
        align: "right",
        colorClass: "primary",
        icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
      },
      {
        id: "2024",
        year: "2021 - 2024",
        title: "Desarrollador Front-End Senior",
        company: "Profesional Independiente",
        description:
          "Creación de aplicaciones web y móviles modernas orientadas a la experiencia de usuario. Maquetación avanzada con Shadcn, desarrollo de ecosistemas completos y despliegues móviles multiplataforma ágiles.",
        tags: ["React Native Expo", "TailwindCSS", "Next.js"],
        align: "left",
        colorClass: "blue-500",
        icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
      },
      {
        id: "2021",
        year: "2017 - 2023",
        title: "Analista y Desarrollador Web",
        company: "TLMARK (España) / 103 Design Studio (EEUU)",
        description:
          "Desarrollo B2B/B2C para el mercado europeo y norteamericano. Construcción de soluciones multilenguaje, tiendas e-commerce de alta conversión y sistemas de reservas complejos a la medida.",
        tags: ["PHP", "WordPress", "JavaScript", "APIs"],
        align: "right",
        colorClass: "orange-500",
        icon: "M13 10V3L4 14h7v7l9-11h-7z",
      },
      {
        id: "2017",
        year: "2012 - 2017",
        title: "Diseñador y Desarrollador UX",
        company: "Ceomarketing / UFF.travel",
        description:
          "Desarrollo integral de portales turísticos y campañas comerciales. Diseño de interfaces rentables, bases de SEO técnico on-page y mantenimiento de ecosistemas digitales completos.",
        tags: ["HTML5", "CSS3", "SEO Técnico"],
        align: "left",
        colorClass: "green-500",
        icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
      },
    ],
    projects: [
      {
        title: "Johana Villabon Psícologa",
        category: "WEB PLATFORM • HEALTH & AI",
        description:
          "Innovadora plataforma de citas psicológicas automatizadas. Destaca por integrar una pre-sesión con Inteligencia Artificial que sondea al paciente, proporcionando a la psicóloga contexto vital y resumen clínico detallado antes de iniciar cada consulta.",
        tech: ["Next.js", "AI Integration", "Supabase", "Cloudinary", "TailwindCSS", "TypeScript", "Zustand"],
        windowColor: "bg-purple-500/10",
        images: [
          "/proyectos/johana/psicologa.png",
          "/proyectos/johana/agendar.png",
          "/proyectos/johana/meet.png",
          "/proyectos/johana/pago.png",
          "/proyectos/johana/admin-psicologa.png",
          "/proyectos/johana/iPhone-12-PRO-localhost.png"
        ],
        link: "https://www.psicologajohana.com",
      },
      {
        title: "MediTrack",
        category: "MOBILE APP • EXPO",
        description:
          "Aplicación móvil diseñada para la gestión de recordatorios e historiales médicos personales, facilitando el control y apego al tratamiento.",
        tech: ["React Native Expo", "Supabase", "Tailwind CSS", "Zustand", "TypeScript"],
        windowColor: "bg-blue-500/10",
        images: [
          "/proyectos/meditrack/1.jpeg",
          "/proyectos/meditrack/2.jpeg",
          "/proyectos/meditrack/3.jpeg",
          "/proyectos/meditrack/4.jpeg",
          "/proyectos/meditrack/5.jpeg"
        ],
        link: "https://meditrackapp.com",
      },
      {
        title: "Cahuita Valley",
        category: "ADMIN DASHBOARD • FINTECH",
        description:
          "Plataforma administrativa y panel de control del sistema de hipotecas Cahuita Valley. Gestión ágil de pagos, clientes, y reportes analíticos para el control interno administrativo.",
        tech: ["Laravel", "TailwindCSS", "Alpine.js", "MySQL", "MVC"],
        windowColor: "bg-emerald-500/10",
        images: [
          "/proyectos/cahuita/dashboard.png",
          "/proyectos/cahuita/admin.png",
          "/proyectos/cahuita/cliente.png",
          "/proyectos/cahuita/iPhone-12-PRO-127.0.0.1.png"
        ],
        link: "https://cahuitavalley.com",
      },
      {
        title: "Anarchy Burgers",
        category: "E-COMMERCE • RESTAURANT",
        description:
          "Plataforma interactiva para la venta y personalización de hamburguesas artesanales, diseñada con un enfoque oscuro e inmersivo. Cuenta con menú dinámico y experiencia de usuario fluida para pedidos.",
        tech: ["React", "Framer Motion", "Zustand", "Three.js"],
        windowColor: "bg-red-500/10",
        images: [
          "/proyectos/Anarchy-Burgers/anarchy-burgers.png"
        ],
        link: "https://anarchyburgers.com",
      },
    ],
  },
  en: {
    personalInfo: {
      name: "Yeison",
      lastName: "Ruiz",
      title: "Software Architect & <br/> Creative Developer",
      description:
        "Building immersive web experiences and robust architectures using modern technologies like React, Next.js, and Node.",
      availability: {
        status: "Available for work",
        active: true,
      },
      stats: {
        experience: "12+",
        projects: "100+",
        satisfied: "100%",
      },
      social: {
        github: "https://github.com/yeisonruiz",
        email: "yeisonruizdev@gmail.com",
        linkedin: "#",
      },
      certifications: [
        {
          id: "google-ai-prof",
          title: "Google AI Professional",
          issuer: "Google",
          date: "Feb 2026",
          link: "https://coursera.org/verify/professional-cert/6WYB2PMJEE1P",
          shortName: "Google AI"
        },
        {
          id: "deeplearning-prof",
          title: "Generative AI for Software Development",
          issuer: "DeepLearning.AI",
          date: "Mar 2026",
          link: "https://coursera.org/verify/professional-cert/7ENB1XE719H6",
          shortName: "GenAI"
        },
        {
          id: "google-content",
          title: "AI for Content Creation",
          issuer: "Google",
          date: "Feb 2026",
          link: "https://coursera.org/verify/MRJW10YR1WVL",
          shortName: "Content AI"
        },
        {
          id: "google-apps",
          title: "AI for App Building",
          issuer: "Google",
          date: "Feb 2026",
          link: "https://coursera.org/verify/4E2PL1IWGLE2",
          shortName: "App AI"
        },
        {
          id: "google-data",
          title: "AI for Data Analysis",
          issuer: "Google",
          date: "Feb 2026",
          link: "https://coursera.org/verify/NU2N2RIOJTY1",
          shortName: "Data AI"
        },
        {
          id: "google-research",
          title: "AI for Research and Insights",
          issuer: "Google",
          date: "Feb 2026",
          link: "https://coursera.org/verify/VUTDWE9GLPES",
          shortName: "Research AI"
        },
        {
          id: "dl-team",
          title: "Team Software Engineering with AI",
          issuer: "DeepLearning.AI",
          date: "Mar 2026",
          link: "https://coursera.org/verify/TN417ZJNP70B",
          shortName: "Team AI"
        },
        {
          id: "dl-system-design",
          title: "AI-Powered Software and System Design",
          issuer: "DeepLearning.AI",
          date: "Mar 2026",
          link: "https://coursera.org/verify/FZ2UGHPWCKKV",
          shortName: "System Design AI"
        },
        {
          id: "react-ts",
          title: "React & TypeScript - The Complete Guide Creating +10 Projects",
          issuer: "Udemy",
          date: "2023",
          link: "#",
          shortName: "React & TS"
        },
        {
          id: "nextjs-15",
          title: "Next.js 15 & React 19 | Fullstack Linktree Clone",
          issuer: "Online Course",
          date: "2024",
          link: "#",
          shortName: "Next.js 15"
        },
        {
          id: "react-native-expo",
          title: "React Native Expo: Native applications for IOS and Android",
          issuer: "Online Course",
          date: "2023",
          link: "#",
          shortName: "React Native"
        },
        {
          id: "design-ts",
          title: "Platform Design with Typescript",
          issuer: "Online Course",
          date: "2022",
          link: "#",
          shortName: "TS Platforms"
        },
        {
          id: "modern-js",
          title: "Modern JavaScript for React JS - ES6",
          issuer: "Online Course",
          date: "2021",
          link: "#",
          shortName: "Modern JS"
        },
        {
          id: "laravel-12",
          title: "Laravel 12 Tutorial For Beginners to Advance",
          issuer: "Online Course",
          date: "2020",
          link: "#",
          shortName: "Laravel 12"
        }
      ]
    },
    ui: {
      nav: {
        home: "Home",
        timeline: "Experience",
        certificaciones: "Certifications",
        services: "Services",
        projects: "Projects",
        contact: "Contact",
      },
      hero: {
        explore: "Explore Projects",
        viewServices: "View Services",
        expLabel: "Years Exp",
        projectsLabel: "Projects",
        satisfiedLabel: "Satisfied",
      },
      services: {
        badge: "High-End Solutions",
        title: "Elevating the",
        titleHighlight: "digital standard",
        descriptionHighlight: "SDD",
        description: "Designing high-performance ecosystems under the architecture. Power, scalability, and impeccable aesthetics.",
      },
      timeline: {
        badge: "Professional Timeline",
        title: "My",
        titleHighlight: "Journey",
        description: "A path of constant evolution, tackling complex challenges and building digital solutions that scale.",
      },
      projects: {
        badge: "Showcase 2026",
        title: "Featured",
        titleHighlight: "Projects",
        description: "Explore a collection of immersive digital applications, designed with modern technologies and attention to detail.",
        discover: "Discover Project",
        modal: {
          tools: "Tools & Technologies",
          visit: "Visit Live",
        },
      },
      footer: {
        tagline: "Building the future of the web.",
        rights: "All rights reserved.",
      },
      contact: {
        title: "Global",
        titleHighlight: "Deployment",
        description: "Ready to transform your ideas into reality? Let's discuss your next breakthrough project.",
        form: {
          nameLabel: "Full Name",
          namePlaceholder: "Your Name",
          emailLabel: "Email Address",
          emailPlaceholder: "your@email.com",
          phoneLabel: "Phone",
          phonePlaceholder: "+1 ...",
          messageLabel: "Your Message",
          messagePlaceholder: "Tell me about your project...",
          send: "Send Message",
        },
      },
      slugs: {
        home: "",
        timeline: "experience",
        certificaciones: "certificaciones",
        services: "services",
        projects: "projects",
        contact: "contact",
      },
      notFound: {
        title: "Page Not Found",
        description: "It seems you have strayed into a route that hasn't been built yet or has been moved.",
        backHome: "Back to Home",
      },
      chat: {
        assistantName: "Yeison AI Assistant",
        onlineStatus: "Online",
        prompts: ["👋 Hi there! Need a hand?", "🚀 Let's build something amazing!", "💡 Have a project idea?"],
        floatingLabel: "Chat with Yeison AI",
        startChatting: "Start chatting",
        greeting: "👋 Hi, I'm Yeison’s AI assistant. What would you like to build today?",
        questions: {
          name: "Perfect! First of all, what's your name?",
          phone: "Pleasure to meet you, {name}! What's your phone number or WhatsApp so I can reach you?",
          qualification: "Is this for a personal project or a business?",
          scope: "Do you already have something built?",
          details: "Could you describe your idea, requirements, or any specific questions you have? (You can type freely)",
          contactMethod: "Great! What's the best way to contact you?",
          contactInputGeneric: "Please enter your {method}:",
          contactInputCall: "No spam. Just project-related contact. Please leave your email to send the invite.",
          confirmation: "Thanks! I'll be in touch shortly.",
          whatsappRedirect: "Excellent! Opening WhatsApp to connect you directly with Yeison...",
        },
        options: {
          build: "Build a website or app",
          ai: "Integrate AI into a product",
          hire: "Hire a developer",
          personal: "Personal project",
          business: "Business project",
          scratch: "Starting from scratch",
          existing: "Improving an existing product",
          detailsPlaceholder: "Describe your project, features or questions...",
          contactWhatsApp: "Chat on WhatsApp (Fastest)",
          contactEmail: "Send via Email",
          contactCall: "Schedule a call",
          inputPlaceholder: "Type your details...",
          contactNow: "Contact Now",
          closeChat: "Close chat",
        },
      },
    },
    services: [
      {
        id: "frontend",
        icon: "code",
        title: "Frontend Web Development",
        description:
          "Specialist in building high-impact user interfaces under the SDD (Speed Driven Development) methodology. I design resilient and ultra-fast frontend architectures using Astro, Next.js, and React, always prioritizing perfect Core Web Vitals scores and a cinematic user experience (UX) through advanced animations.",
        tags: ["Vue.js", "React", "Node", "Express", "Next.js", "Astro", "TypeScript", "Tailwind CSS"],
        gradient: "from-green-500/20 to-blue-500/20",
      },
      {
        id: "enterprise",
        icon: "briefcase",
        title: "Enterprise Web Sites",
        description:
          "Developing robust corporate digital ecosystems and large-scale web applications. My approach combines the power of Laravel on the backend with the interactivity of Next.js or Vue.js on the frontend. B2B/B2C result-oriented solutions that integrate complex workflows, bank-grade security, and horizontal scalability.",
        tags: ["Node", "Express", "Vue.js", "Laravel", "Next.js", "Astro"],
        gradient: "from-purple-500/20 to-pink-500/20",
      },
      {
        id: "uiux",
        icon: "palette",
        title: "UI/UX Design & Tailwind",
        description:
          "Designing digital products that not only look incredible but work with millimetric precision. I use Figma for high-fidelity prototyping and Tailwind CSS for a clean and scalable implementation. My process includes detailed user research and the design of micro-interactions that strengthen brand identity.",
        tags: ["Tailwind CSS", "Figma", "UX Research", "Prototyping", "Micro-interactions", "Responsive Design"],
        gradient: "from-yellow-500/20 to-orange-500/20",
      },
      {
        id: "seo",
        icon: "chart",
        title: "SEO Audit & Performance",
        description:
          "Maximizing organic visibility through exhaustive technical audits and SDD-based performance optimization strategies. I don't just improve rankings; I optimize TTFB, LCP, and CLS to ensure Google and your users love your site. Implementing advanced indexing strategies and content gap analysis.",
        tags: ["SDD", "Technical SEO", "Core Web Vitals", "Ahrefs / Semrush", "Google Search Console", "PageSpeed"],
        gradient: "from-blue-600/20 to-cyan-400/20",
      },
      {
        id: "integrations",
        icon: "cloud",
        title: "Infrastructure & Integrations",
        description:
          "Architecting and implementing Cloud Native infrastructures on AWS and Google Cloud, ensuring automated deployments and high availability. Expert in mass REST and GraphQL API orchestration, Stripe payment gateway integration, and WhatsApp API automation.",
        tags: ["API REST", "Node", "Express", "AWS", "Google Cloud", "WhatsApp API"],
        gradient: "from-indigo-500/20 to-purple-500/20",
        badge: {
          text: "Cloud Ops",
          color: "bg-blue-500",
        },
      },
    ],
    timeline: [
      {
        id: "cert-genai",
        year: "2026",
        title: "Generative AI for Software Development",
        company: "DeepLearning.AI",
        description: "Professional certification focused on integrating LLMs into development workflows, AI-powered system design, and intelligent automation.",
        tags: ["LLM Integration", "Prompt Engineering", "AI System Design"],
        align: "right",
        colorClass: "primary",
        icon: "M13 10V3L4 14h7v7l9-11h-7z",
        isSpecial: true
      },
      {
        id: "cert-google",
        year: "2026",
        title: "Google AI Professional",
        company: "Google",
        description: "Mastery of AI fundamentals, machine learning, and Google tools for creating intelligent digital solutions at a global scale.",
        tags: ["Machine Learning", "Google Cloud AI", "AI Fundamentals"],
        align: "left",
        colorClass: "blue-500",
        icon: "M13 10V3L4 14h7v7l9-11h-7z",
        isSpecial: true
      },
      {
        id: "2025",
        year: "2022 - 2025",
        title: "Web Developer & SEO Analyst",
        company: "LossUp Adjust",
        description:
          "Development of ultra-fast interfaces and custom websites. Integration of AI workflows, advanced SEO strategies, and Core Web Vitals optimization (99% TTFB).",
        tags: ["Next.js", "Astro", "React", "SEO", "AI"],
        align: "right",
        colorClass: "primary",
        icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
      },
      {
        id: "2024",
        year: "2021 - 2024",
        title: "Senior Front-End Developer",
        company: "Independent Professional",
        description:
          "Creation of modern web and mobile applications focused on user experience. Advanced layout with Shadcn, full ecosystem development, and agile cross-platform mobile deployments.",
        tags: ["React Native Expo", "TailwindCSS", "Next.js"],
        align: "left",
        colorClass: "blue-500",
        icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
      },
      {
        id: "2021",
        year: "2017 - 2023",
        title: "Web Developer & Analyst",
        company: "TLMARK (Spain) / 103 Design Studio (USA)",
        description:
          "B2B/B2C development for European and North American markets. Building multi-language solutions, high-conversion e-commerce stores, and complex custom booking systems.",
        tags: ["PHP", "WordPress", "JavaScript", "APIs"],
        align: "right",
        colorClass: "orange-500",
        icon: "M13 10V3L4 14h7v7l9-11h-7z",
      },
      {
        id: "2017",
        year: "2012 - 2017",
        title: "UX Designer & Developer",
        company: "Ceomarketing / UFF.travel",
        description:
          "Full development of tourism portals and commercial campaigns. Designing profitable interfaces, foundations for on-page technical SEO, and maintenance of complete digital ecosystems.",
        tags: ["HTML5", "CSS3", "Technical SEO"],
        align: "left",
        colorClass: "green-500",
        icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
      },
    ],
    projects: [
      {
        title: "Johana Villabon Psychologist",
        category: "WEB PLATFORM • HEALTH & AI",
        description:
          "Innovative automated psychological appointment platform. Features an AI-powered pre-session that surveys the patient, providing clinical context to the psychologist before each consultation.",
        tech: ["Next.js", "AI Integration", "Supabase", "Cloudinary", "TailwindCSS", "TypeScript", "Zustand"],
        windowColor: "bg-purple-500/10",
        images: [
          "/proyectos/johana/psicologa.png",
          "/proyectos/johana/agendar.png",
          "/proyectos/johana/meet.png",
          "/proyectos/johana/pago.png",
          "/proyectos/johana/admin-psicologa.png",
          "/proyectos/johana/iPhone-12-PRO-localhost.png"
        ],
        link: "https://www.psicologajohana.com",
      },
      {
        title: "MediTrack",
        category: "MOBILE APP • EXPO",
        description:
          "Mobile application designed for managing personal medical records and reminders, facilitating treatment adherence and control.",
        tech: ["React Native Expo", "Supabase", "Tailwind CSS", "Zustand", "TypeScript"],
        windowColor: "bg-blue-500/10",
        images: [
          "/proyectos/meditrack/1.jpeg",
          "/proyectos/meditrack/2.jpeg",
          "/proyectos/meditrack/3.jpeg",
          "/proyectos/meditrack/4.jpeg",
          "/proyectos/meditrack/5.jpeg"
        ],
        link: "https://meditrackapp.com",
      },
      {
        title: "Cahuita Valley",
        category: "ADMIN DASHBOARD • FINTECH",
        description:
          "Administrative platform and control panel for the Cahuita Valley mortgage system. Agile management of payments, clients, and analytical reports.",
        tech: ["Laravel", "TailwindCSS", "Alpine.js", "MySQL", "MVC"],
        windowColor: "bg-emerald-500/10",
        images: [
          "/proyectos/cahuita/dashboard.png",
          "/proyectos/cahuita/admin.png",
          "/proyectos/cahuita/cliente.png",
          "/proyectos/cahuita/iPhone-12-PRO-127.0.0.1.png"
        ],
        link: "https://cahuitavalley.com",
      },
      {
        title: "Anarchy Burgers",
        category: "E-COMMERCE • RESTAURANT",
        description:
          "Interactive platform for the sale and customization of artisanal burgers, designed with a dark and immersive focus. Features a dynamic menu.",
        tech: ["React", "Framer Motion", "Zustand", "Three.js"],
        windowColor: "bg-red-500/10",
        images: [
          "/proyectos/Anarchy-Burgers/anarchy-burgers.png"
        ],
        link: "https://anarchyburgers.com",
      },
    ],
  },
};
