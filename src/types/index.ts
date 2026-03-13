export interface PersonalInfo {
  name: string;
  lastName: string;
  title: string;
  description: string;
  availability: {
    status: string;
    active: boolean;
  };
  stats: {
    experience: string;
    projects: string;
    satisfied: string;
  };
  social: {
    github: string;
    linkedin?: string;
    twitter?: string;
    email: string;
  };
  certifications?: Array<{
    id: string;
    title: string;
    issuer: string;
    date: string;
    link: string;
    shortName: string;
  }>;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  tags: string[];
  gradient: string; // Tailwind class string
  badge?: {
    text: string;
    color: string;
  };
}

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  company: string;
  description: string;
  tags: string[];
  icon: string; // SVG path or identifier
  align: "left" | "right";
  colorClass: string; // e.g. "text-blue-400" or "bg-blue-500"
  isSpecial?: boolean;
}

export interface Project {
  title: string;
  category: string;
  description: string;
  tech: string[];
  windowColor: string;
  link?: string;
  image?: string; // Legacy
  images?: string[]; // Array of paths to images for desktop & mobile
}

export interface SiteData {
  personalInfo: PersonalInfo;
  services: Service[];
  timeline: TimelineItem[];
  projects: Project[];
  ui: {
    nav: {
      home: string;
      timeline: string;
      certificaciones: string;
      services: string;
      projects: string;
      contact: string;
    };
    hero: {
      explore: string;
      viewServices: string;
      expLabel: string;
      projectsLabel: string;
      satisfiedLabel: string;
    };
    services: {
      badge: string;
      title: string;
      titleHighlight: string;
      descriptionHighlight: string;
      description: string;
    };
    timeline: {
      badge: string;
      title: string;
      titleHighlight: string;
      description: string;
    };
    projects: {
      badge: string;
      title: string;
      titleHighlight: string;
      description: string;
      discover: string;
      modal: {
        tools: string;
        visit: string;
      };
    };
    footer: {
      tagline: string;
      rights: string;
    };
    contact: {
      title: string;
      titleHighlight: string;
      description: string;
      form: {
        nameLabel: string;
        namePlaceholder: string;
        emailLabel: string;
        emailPlaceholder: string;
        phoneLabel: string;
        phonePlaceholder: string;
        messageLabel: string;
        messagePlaceholder: string;
        send: string;
      };
    };
    slugs: {
      home: string;
      timeline: string;
      certificaciones: string;
      services: string;
      projects: string;
      contact: string;
    };
    notFound: {
      title: string;
      description: string;
      backHome: string;
    };
    chat: {
      assistantName: string;
      onlineStatus: string;
      prompts: string[];
      floatingLabel: string;
      startChatting: string;
      greeting: string;
      questions: {
        name: string;
        phone: string;
        qualification: string;
        scope: string;
        details: string;
        contactMethod: string;
        contactInputGeneric: string;
        contactInputCall: string;
        confirmation: string;
        whatsappRedirect: string;
      };
      options: {
        build: string;
        ai: string;
        hire: string;
        personal: string;
        business: string;
        scratch: string;
        existing: string;
        detailsPlaceholder: string;
        contactWhatsApp: string;
        contactEmail: string;
        contactCall: string;
        inputPlaceholder: string;
        contactNow: string;
        closeChat: string;
      };
    };
  };
}

export type Translations = Record<"es" | "en", SiteData>;
