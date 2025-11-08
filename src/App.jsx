"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import {
  Shield,
  ShieldCheck,
  Globe,
  Target,
  TrendingUp,
  Users,
  Award,
  Zap,
  CheckCircle,
  Cloud,
  Server,
  Eye,
  Activity,
  FileText,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Github,
  X,
  Menu,
  Sun,
  Moon,
  ChevronRight,
  MessageCircle,
  Cookie,
  DollarSign,
  Settings,
} from "lucide-react"

const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About Us",
      services: "Services",
      tools: "Tools",
      whyUs: "Why Us",
      academy: "Academy",
      blog: "Blog",
      hrm: "HRM",
      contact: "Contact",
      cta: "Get Started",
    },
    hero: {
      title: "Intelligent Defense.",
      subtitle: "Measurable Results.",
      description: "Enterprise cybersecurity solutions that deliver ROI and reduce risk for global organizations",
      selectRole: "I am a",
      ciso: "CISO",
      cio: "CIO",
      cfo: "CFO",
      itTeam: "IT Team",
      roleMessages: {
        ciso: "Strategic security leadership to protect your organization",
        cio: "Technology integration that scales with your infrastructure",
        cfo: "Measurable ROI with clear cost-benefit analysis",
        itTeam: "Operational excellence and 24/7 security monitoring",
      },
      ctaMessages: {
        ciso: "Schedule Strategic Review",
        cio: "View Integration Options",
        cfo: "Calculate Your ROI",
        itTeam: "Start Free Assessment",
      },
    },
    partners: {
      title: "Trusted Technology Partners",
      subtitle: "Working with industry-leading platforms",
    },
    about: {
      title: "About Tandem Lens",
      mission: "Our Mission",
      missionText:
        "To empower organizations with intelligent, measurable cybersecurity solutions that protect what matters most.",
      vision: "Our Vision",
      visionText:
        "A world where every organization has access to enterprise-grade security, regardless of size or budget.",
      presence: "Global Presence",
      presenceText:
        "With offices in the United States and Argentina, we serve clients across the Americas with 24/7 support and local expertise.",
    },
    services: {
      title: "Our Services",
      subtitle: "Comprehensive security solutions tailored to your needs",
      items: [
        { title: "vCISO as a Service", desc: "Strategic security leadership on demand" },
        { title: "SOC as a Service", desc: "24/7 security operations center" },
        { title: "Consulting & Audits", desc: "Expert security assessments and guidance" },
        { title: "Pentesting", desc: "Comprehensive vulnerability testing" },
        { title: "Red Team Operations", desc: "Advanced adversarial simulations" },
        { title: "Blue Team", desc: "Defensive security operations" },
        { title: "Cloud Security", desc: "Secure your cloud infrastructure" },
        { title: "Cloud Security Posture Management", desc: "CSPM, CIEM, and IaC security" },
        { title: "Compliance Management", desc: "Meet regulatory requirements" },
        { title: "Threat Intelligence", desc: "Proactive threat monitoring and analysis" },
        { title: "IGA / PAM Consulting", desc: "Identity governance and privileged access" },
        { title: "OT/ICS Security", desc: "Industrial control systems protection" },
        { title: "Human Risk Management", desc: "Reduce human-factor vulnerabilities" },
        { title: "Tandem Lens Academy", desc: "Security training and certifications" },
      ],
    },
    tools: {
      title: "Interactive Tools",
      roiTitle: "ROI Calculator",
      roiDesc: "Calculate the return on investment for your security program",
      employees: "Number of Employees",
      industry: "Industry",
      industries: {
        finance: "Financial Services",
        healthcare: "Healthcare",
        tech: "Technology",
        retail: "Retail",
        manufacturing: "Manufacturing",
      },
      currentPosture: "Current Security Posture",
      proposedPosture: "Proposed Security Posture",
      currentRisk: "Current Risk Level",
      proposedRisk: "Proposed Risk Level",
      calculate: "Calculate ROI",
      results: {
        savings: "Potential Annual Savings",
        investment: "Annual Investment",
        roi: "Return on Investment",
        payback: "Payback Period",
        months: "months",
      },
      maturityTitle: "Security Maturity Assessment",
      maturityDesc: "Evaluate your organization's security maturity",
      maturityItems: [
        "Security policies documented",
        "Regular security training",
        "Incident response plan",
        "Data encryption implemented",
        "Multi-factor authentication",
        "Regular security audits",
        "Vulnerability management",
        "Third-party risk management",
      ],
      maturityScore: "Your Maturity Score",
      maturityLevels: {
        initial: "Initial",
        managed: "Managed",
        defined: "Defined",
        quantitative: "Quantitatively Managed",
        optimizing: "Optimizing",
      },
    },
    cases: {
      title: "Success Stories",
      subtitle: "Real results for real clients",
      metrics: [
        { value: "15 min", label: "Mean Time to Detect (MTTD)" },
        { value: "45 min", label: "Mean Time to Respond (MTTR)" },
        { value: "87%", label: "Reduction in Human Risk" },
        { value: "99.9%", label: "Uptime SLA Achievement" },
      ],
      testimonials: [
        {
          quote: "Tandem Lens transformed our security posture and delivered measurable ROI within 6 months.",
          author: "John Smith",
          role: "CISO, Fortune 500 Financial Services",
        },
        {
          quote: "Their vCISO service gave us enterprise-level security leadership at a fraction of the cost.",
          author: "Maria Garcia",
          role: "CIO, Healthcare Provider",
        },
        {
          quote: "The ROI was clear: reduced incidents, lower insurance premiums, and improved compliance scores.",
          author: "David Chen",
          role: "CFO, Technology Startup",
        },
      ],
    },
    why: {
      title: "Why Tandem Lens",
      subtitle: "What sets us apart",
      items: [
        { title: "Measurable Results", desc: "Every engagement includes clear KPIs and ROI tracking" },
        { title: "Global Expertise", desc: "Team of certified professionals across two continents" },
        { title: "24/7 Coverage", desc: "Round-the-clock monitoring and support" },
        { title: "Technology Agnostic", desc: "Work with your existing tools and platforms" },
      ],
    },
    hrm: {
      title: "Human Risk Management Platform",
      subtitle: "Reduce your #1 vulnerability: human error",
      description:
        "Our proprietary HRM platform combines phishing simulation, security awareness training, and behavioral analytics to reduce human-factor risks by up to 87%.",
      features: [
        "Automated phishing campaigns",
        "Role-based training paths",
        "Real-time risk scoring",
        "Executive dashboards",
        "Compliance reporting",
        "Gamification & rewards",
      ],
      cta: "Request Demo",
    },
    vciso: {
      title: "vCISO as a Service",
      subtitle: "Strategic security leadership without the full-time cost",
      plans: [
        {
          name: "Starter",
          price: "$3,500",
          period: "/month",
          features: [
            "10 hours/month strategic consultation",
            "Security roadmap development",
            "Quarterly risk assessments",
            "Policy & procedure review",
            "Email & Slack support",
          ],
        },
        {
          name: "Growth",
          price: "$7,500",
          period: "/month",
          popular: true,
          features: [
            "25 hours/month strategic consultation",
            "Everything in Starter",
            "Monthly board reporting",
            "Vendor security reviews",
            "Incident response planning",
            "Priority phone support",
          ],
        },
        {
          name: "Enterprise",
          price: "Custom",
          period: "",
          features: [
            "Dedicated vCISO",
            "Everything in Growth",
            "Weekly strategy sessions",
            "M&A security due diligence",
            "Regulatory audit support",
            "24/7 emergency access",
          ],
        },
      ],
    },
    academy: {
      title: "Tandem Academy",
      subtitle: "Continuous learning for your security team",
      courses: [
        { title: "Introduction to Cybersecurity", duration: "6 hours", level: "Beginner" },
        { title: "Security Awareness Fundamentals", duration: "4 hours", level: "Beginner" },
        { title: "Incident Response for IT Teams", duration: "8 hours", level: "Intermediate" },
        { title: "Advanced Threat Hunting", duration: "16 hours", level: "Advanced" },
        { title: "Cloud Security Best Practices", duration: "12 hours", level: "Intermediate" },
        { title: "Secure Coding Principles", duration: "10 hours", level: "Intermediate" },
      ],
      customCourse: {
        title: "Custom Training Programs",
        description:
          "Need specialized training for your team? We create custom courses tailored to your organization's specific needs and challenges.",
        cta: "Request Custom Course",
      },
    },
    blog: {
      title: "Latest Insights",
      subtitle: "Stay informed with our latest research and analysis",
      posts: [
        { title: "The State of Ransomware in 2025", date: "Jan 15, 2025", category: "Threat Intelligence" },
        { title: "Building a Security-First Culture", date: "Jan 10, 2025", category: "Best Practices" },
        { title: "Cloud Security Misconceptions", date: "Jan 5, 2025", category: "Cloud Security" },
      ],
    },
    contact: {
      title: "Get in Touch",
      subtitle: "Ready to strengthen your security posture?",
      form: {
        name: "Full Name",
        email: "Email Address",
        company: "Company Name",
        message: "Message",
        send: "Send Message",
        sending: "Sending...",
        success: "Message sent successfully!",
      },
      info: {
        us: "United States Office",
        usAddress: "123 Security Blvd, Miami, FL 33131",
        ar: "Argentina Office",
        arAddress: "Av. Corrientes 1234, Buenos Aires, Argentina",
        email: "info@tandemlens.net",
      },
    },
    footer: {
      about: "About",
      services: "Services",
      resources: "Resources",
      legal: "Legal",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      security: "Security",
      copyright: "2025 Tandem Lens. All rights reserved.",
      tagline: "Intelligent Defense. Measurable Results.",
    },
    popup: {
      title: "Ready to Transform Your Security?",
      description: "Schedule a free consultation with our security experts.",
      cta: "Schedule Consultation",
    },
    cookies: {
      message:
        'We use cookies to enhance your browsing experience and analyze our traffic. By clicking "Accept", you consent to our use of cookies.',
      accept: "Accept",
      decline: "Decline",
    },
    chat: {
      tooltip: "Chat with us",
    },
    products: {
      hrm: {
        title: "Human Risk Management Platform",
        subtitle: "Reduce your #1 vulnerability: human error",
        description:
          "Our proprietary HRM platform combines phishing simulation, security awareness training, and behavioral analytics to reduce human-factor risks by up to 87%.",
        cta: "Request Demo",
      },
      vciso: {
        title: "vCISO as a Service",
        subtitle: "Strategic security leadership without the full-time cost",
        cta: "Contact Sales",
      },
    },
  },
  es: {
    nav: {
      home: "Inicio",
      about: "Nosotros",
      services: "Servicios",
      tools: "Herramientas",
      whyUs: "Por Qué Nosotros",
      academy: "Academia",
      blog: "Blog",
      hrm: "HRM",
      contact: "Contacto",
      cta: "Comenzar",
    },
    hero: {
      title: "Defensa Inteligente.",
      subtitle: "Resultados Medibles.",
      description:
        "Soluciones de ciberseguridad empresarial que entregan ROI y reducen riesgos para organizaciones globales",
      selectRole: "Soy",
      ciso: "CISO",
      cio: "CIO",
      cfo: "CFO",
      itTeam: "Equipo TI",
      roleMessages: {
        ciso: "Liderazgo estratégico en seguridad para proteger su organización",
        cio: "Integración tecnológica que escala con su infraestructura",
        cfo: "ROI medible con análisis claro de costo-beneficio",
        itTeam: "Excelencia operacional y monitoreo de seguridad 24/7",
      },
      ctaMessages: {
        ciso: "Agendar Revisión Estratégica",
        cio: "Ver Opciones de Integración",
        cfo: "Calcular su ROI",
        itTeam: "Iniciar Evaluación Gratuita",
      },
    },
    partners: {
      title: "Socios Tecnológicos de Confianza",
      subtitle: "Trabajando con plataformas líderes de la industria",
    },
    about: {
      title: "Sobre Tandem Lens",
      mission: "Nuestra Misión",
      missionText:
        "Empoderar organizaciones con soluciones de ciberseguridad inteligentes y medibles que protegen lo que más importa.",
      vision: "Nuestra Visión",
      visionText:
        "Un mundo donde cada organización tenga acceso a seguridad de nivel empresarial, sin importar tamaño o presupuesto.",
      presence: "Presencia Global",
      presenceText:
        "Con oficinas en Estados Unidos y Argentina, servimos clientes en las Américas con soporte 24/7 y experiencia local.",
    },
    services: {
      title: "Nuestros Servicios",
      subtitle: "Soluciones de seguridad integrales adaptadas a sus necesidades",
      items: [
        { title: "vCISO como Servicio", desc: "Liderazgo estratégico en seguridad bajo demanda" },
        { title: "SOC como Servicio", desc: "Centro de operaciones de seguridad 24/7" },
        { title: "Consultoría y Auditorías", desc: "Evaluaciones y orientación experta en seguridad" },
        { title: "Pentesting", desc: "Pruebas exhaustivas de vulnerabilidades" },
        { title: "Operaciones Red Team", desc: "Simulaciones adversarias avanzadas" },
        { title: "Blue Team", desc: "Operaciones de seguridad defensiva" },
        { title: "Seguridad en la Nube", desc: "Asegure su infraestructura en la nube" },
        { title: "Gestión de Postura de Seguridad en la Nube", desc: "CSPM, CIEM y seguridad IaC" },
        { title: "Gestión de Cumplimiento", desc: "Cumpla con requisitos regulatorios" },
        { title: "Inteligencia de Amenazas", desc: "Monitoreo y análisis proactivo de amenazas" },
        { title: "Consultoría IGA / PAM", desc: "Gobernanza de identidad y acceso privilegiado" },
        { title: "Seguridad OT/ICS", desc: "Protección de sistemas de control industrial" },
        { title: "Gestión de Riesgo Humano", desc: "Reduzca vulnerabilidades del factor humano" },
        { title: "Academia Tandem Lens", desc: "Capacitación y certificaciones en seguridad" },
      ],
    },
    tools: {
      title: "Herramientas Interactivas",
      roiTitle: "Calculadora de ROI",
      roiDesc: "Calcule el retorno de inversión de su programa de seguridad",
      employees: "Número de Empleados",
      industry: "Industria",
      industries: {
        finance: "Servicios Financieros",
        healthcare: "Salud",
        tech: "Tecnología",
        retail: "Retail",
        manufacturing: "Manufactura",
      },
      currentPosture: "Postura de Seguridad Actual",
      proposedPosture: "Postura de Seguridad Propuesta",
      currentRisk: "Nivel de Riesgo Actual",
      proposedRisk: "Nivel de Riesgo Propuesto",
      calculate: "Calcular ROI",
      results: {
        savings: "Ahorro Potencial Anual",
        investment: "Inversión Anual",
        roi: "Retorno de Inversión",
        payback: "Período de Recuperación",
        months: "meses",
      },
      maturityTitle: "Evaluación de Madurez en Seguridad",
      maturityDesc: "Evalúe la madurez de seguridad de su organización",
      maturityItems: [
        "Políticas de seguridad documentadas",
        "Capacitación regular en seguridad",
        "Plan de respuesta a incidentes",
        "Encriptación de datos implementada",
        "Autenticación multifactor",
        "Auditorías de seguridad regulares",
        "Gestión de vulnerabilidades",
        "Gestión de riesgo de terceros",
      ],
      maturityScore: "Su Puntuación de Madurez",
      maturityLevels: {
        initial: "Inicial",
        managed: "Gestionado",
        defined: "Definido",
        quantitative: "Gestionado Cuantitativamente",
        optimizing: "Optimizado",
      },
    },
    cases: {
      title: "Historias de Éxito",
      subtitle: "Resultados reales para clientes reales",
      metrics: [
        { value: "15 min", label: "Tiempo Medio de Detección (MTTD)" },
        { value: "45 min", label: "Tiempo Medio de Respuesta (MTTR)" },
        { value: "87%", label: "Reducción en Riesgo Humano" },
        { value: "99.9%", label: "Cumplimiento de SLA de Disponibilidad" },
      ],
      testimonials: [
        {
          quote: "Tandem Lens transformó nuestra postura de seguridad y entregó ROI medible en 6 meses.",
          author: "John Smith",
          role: "CISO, Fortune 500 Servicios Financieros",
        },
        {
          quote: "Su servicio vCISO nos dio liderazgo en seguridad de nivel empresarial a una fracción del costo.",
          author: "Maria Garcia",
          role: "CIO, Proveedor de Salud",
        },
        {
          quote:
            "El ROI fue claro: menos incidentes, primas de seguro más bajas y mejores puntuaciones de cumplimiento.",
          author: "David Chen",
          role: "CFO, Startup Tecnológica",
        },
      ],
    },
    why: {
      title: "Por Qué Tandem Lens",
      subtitle: "Lo que nos distingue",
      items: [
        { title: "Resultados Medibles", desc: "Cada compromiso incluye KPIs claros y seguimiento de ROI" },
        { title: "Experiencia Global", desc: "Equipo de profesionales certificados en dos continentes" },
        { title: "Cobertura 24/7", desc: "Monitoreo y soporte las 24 horas" },
        { title: "Agnóstico de Tecnología", desc: "Trabajamos con sus herramientas y plataformas existentes" },
      ],
    },
    hrm: {
      title: "Plataforma de Gestión de Riesgo Humano",
      subtitle: "Reduzca su vulnerabilidad #1: el error humano",
      description:
        "Nuestra plataforma HRM combina simulación de phishing, capacitación en concientización de seguridad y análisis de comportamiento para reducir los riesgos del factor humano hasta en un 87%.",
      features: [
        "Campañas de phishing automatizadas",
        "Rutas de capacitación por rol",
        "Puntuación de riesgo en tiempo real",
        "Dashboards ejecutivos",
        "Reportes de cumplimiento",
        "Gamificación y recompensas",
      ],
      cta: "Solicitar Demo",
    },
    vciso: {
      title: "vCISO como Servicio",
      subtitle: "Liderazgo estratégico en seguridad sin el costo de tiempo completo",
      plans: [
        {
          name: "Starter",
          price: "$3,500",
          period: "/mes",
          features: [
            "10 horas/mes consultoría estratégica",
            "Desarrollo de hoja de ruta de seguridad",
            "Evaluaciones de riesgo trimestrales",
            "Revisión de políticas y procedimientos",
            "Soporte por email y Slack",
          ],
        },
        {
          name: "Growth",
          price: "$7,500",
          period: "/mes",
          popular: true,
          features: [
            "25 horas/mes consultoría estratégica",
            "Todo en Starter",
            "Reportes mensuales al directorio",
            "Revisiones de seguridad de proveedores",
            "Planificación de respuesta a incidentes",
            "Soporte telefónico prioritario",
          ],
        },
        {
          name: "Enterprise",
          price: "Personalizado",
          period: "",
          features: [
            "vCISO dedicado",
            "Todo en Growth",
            "Sesiones de estrategia semanales",
            "Due diligence de seguridad para M&A",
            "Soporte para auditorías regulatorias",
            "Acceso de emergencia 24/7",
          ],
        },
      ],
    },
    academy: {
      title: "Tandem Academy",
      subtitle: "Aprendizaje continuo para tu equipo de seguridad",
      courses: [
        { title: "Introducción a la Ciberseguridad", duration: "6 hours", level: "Principiante" },
        { title: "Fundamentos de Concientización en Seguridad", duration: "4 hours", level: "Beginner" },
        { title: "Respuesta a Incidentes para Equipos TI", duration: "8 hours", level: "Intermediate" },
        { title: "Búsqueda Avanzada de Amenazas", duration: "16 hours", level: "Advanced" },
        { title: "Mejores Prácticas de Seguridad en la Nube", duration: "12 hours", level: "Intermediate" },
        { title: "Principios de Codificación Segura", duration: "10 hours", level: "Intermediate" },
      ],
      customCourse: {
        title: "Programas de Capacitación Personalizados",
        description:
          "¿Necesita capacitación especializada para su equipo? Creamos cursos personalizados adaptados a las necesidades específicas de su organización.",
        cta: "Solicitar Curso Personalizado",
      },
    },
    blog: {
      title: "Últimas Perspectivas",
      subtitle: "Manténgase informado con nuestras últimas investigaciones y análisis",
      posts: [
        { title: "El Estado del Ransomware en 2025", date: "15 Ene, 2025", category: "Inteligencia de Amenazas" },
        { title: "Construyendo una Cultura de Seguridad Primero", date: "10 Ene, 2025", category: "Mejores Prácticas" },
        { title: "Conceptos Erróneos de Seguridad en la Nube", date: "5 Ene, 2025", category: "Seguridad en la Nube" },
      ],
    },
    contact: {
      title: "Contáctenos",
      subtitle: "¿Listo para fortalecer su postura de seguridad?",
      form: {
        name: "Nombre Completo",
        email: "Correo Electrónico",
        company: "Nombre de la Empresa",
        message: "Mensaje",
        send: "Enviar Mensaje",
        sending: "Enviando...",
        success: "¡Mensaje enviado exitosamente!",
      },
      info: {
        us: "Oficina Estados Unidos",
        usAddress: "123 Security Blvd, Miami, FL 33131",
        ar: "Oficina Argentina",
        arAddress: "Av. Corrientes 1234, Buenos Aires, Argentina",
        email: "info@tandemlens.net",
      },
    },
    footer: {
      about: "Acerca de",
      services: "Servicios",
      resources: "Recursos",
      legal: "Legal",
      privacy: "Política de Privacidad",
      terms: "Términos de Servicio",
      security: "Seguridad",
      copyright: "2025 Tandem Lens. Todos los derechos reservados.",
      tagline: "Defensa Inteligente. Resultados Medibles.",
    },
    popup: {
      title: "¿Listo para Transformar su Seguridad?",
      description: "Agende una consulta gratuita con nuestros expertos en seguridad.",
      cta: "Agendar Consulta",
    },
    cookies: {
      message:
        'Usamos cookies para mejorar su experiencia de navegación y analizar nuestro tráfico. Al hacer clic en "Aceptar", usted consiente nuestro uso de cookies.',
      accept: "Aceptar",
      decline: "Rechazar",
    },
    chat: {
      tooltip: "Chatea con nosotros",
    },
    products: {
      hrm: {
        title: "Plataforma de Gestión de Riesgo Humano",
        subtitle: "Reduzca su vulnerabilidad #1: el error humano",
        description:
          "Nuestra plataforma HRM combina simulación de phishing, capacitación en concientización de seguridad y análisis de comportamiento para reducir los riesgos del factor humano hasta en un 87%.",
        cta: "Solicitar Demo",
      },
      vciso: {
        title: "vCISO como Servicio",
        subtitle: "Liderazgo estratégico en seguridad sin el costo de tiempo completo",
        cta: "Contactar Ventas",
      },
    },
  },
}

function App() {
  const [lang, setLang] = useState("en")
  const [theme, setTheme] = useState("light")
  const [activeSection, setActiveSection] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState("ciso")
  const [showPopup, setShowPopup] = useState(false)
  const [popupDismissed, setPopupDismissed] = useState(false)
  const [showCookies, setShowCookies] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)

  const [roiData, setRoiData] = useState({
    employees: 500,
    industry: "finance",
    currentPosture: 3,
    proposedPosture: 8,
    currentRisk: 7,
    proposedRisk: 2,
  })
  const [roiResults, setRoiResults] = useState(null)

  const [maturityChecks, setMaturityChecks] = useState(Array(8).fill(false))

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })
  const [formStatus, setFormStatus] = useState("")

  const t = translations[lang]
  const language = lang // Alias for easier access in translations

  const scrollToContactWithMessage = (message) => {
    setContactForm((prev) => ({ ...prev, message }))
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
      setTimeout(() => {
        const messageField = document.querySelector('textarea[name="message"]')
        if (messageField) {
          messageField.focus()
        }
      }, 800)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)

      if (progress > 70 && !showPopup && !popupDismissed) {
        setTimeout(() => setShowPopup(true), 500)
      }

      const sections = ["home", "about", "services", "tools", "whyUs", "academy", "blog", "contact"]
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [showPopup, popupDismissed])

  useEffect(() => {
    if (popupDismissed) return

    const timer = setTimeout(() => {
      if (!showPopup && !popupDismissed) setShowPopup(true)
    }, 30000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false)
    }
  }

  const calculateROI = () => {
    const baseRiskCost = roiData.employees * 1000
    const industryMultiplier = {
      finance: 2.5,
      healthcare: 2.2,
      tech: 1.8,
      retail: 1.5,
      manufacturing: 1.6,
    }[roiData.industry]

    const currentCost = baseRiskCost * industryMultiplier * (roiData.currentRisk / 10)
    const proposedCost = baseRiskCost * industryMultiplier * (roiData.proposedRisk / 10)
    const savings = currentCost - proposedCost

    const baseInvestment = roiData.employees * 150
    const postureInvestment = baseInvestment * (roiData.proposedPosture / 10)

    const roi = ((savings - postureInvestment) / postureInvestment) * 100
    const payback = postureInvestment / (savings / 12)

    setRoiResults({
      savings: Math.round(savings),
      investment: Math.round(postureInvestment),
      roi: Math.round(roi),
      payback: Math.round(payback),
    })
  }

  const maturityScore = (maturityChecks.filter(Boolean).length / maturityChecks.length) * 100
  const maturityLevel =
    maturityScore < 20
      ? t.tools.maturityLevels.initial
      : maturityScore < 40
        ? t.tools.maturityLevels.managed
        : maturityScore < 60
          ? t.tools.maturityLevels.defined
          : maturityScore < 80
            ? t.tools.maturityLevels.quantitative
            : t.tools.maturityLevels.optimizing

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    setFormStatus("sending")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactForm),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error al enviar el mensaje")
      }

      setFormStatus("success")
      setContactForm({ name: "", email: "", company: "", message: "" })
      setTimeout(() => setFormStatus(""), 3000)
    } catch (error) {
      console.error("[v0] Error al enviar formulario:", error)
      setFormStatus("error")
      setTimeout(() => setFormStatus(""), 3000)
    }
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800/30 z-50">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 transition-all duration-300 shadow-lg shadow-cyan-500/50"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-40 ${
          theme === "dark" ? "bg-black/60 border-gray-800/50" : "bg-white/60 border-gray-200/50"
        } backdrop-blur-2xl backdrop-saturate-150 border-b shadow-lg`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div
              className="flex items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection("home")}
            >
              <img
                src="/tandem-logo.jpg"
                alt="Tandem Lens Logo"
                className="h-14 w-auto rounded-lg shadow-md p-1 bg-white/95 hover:shadow-lg transition-all duration-300"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = "/placeholder-logo.svg"
                }}
              />
            </motion.div>

            <nav className="hidden md:flex items-center gap-6">
              {["home", "about", "services", "tools", "whyUs", "academy", "blog", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-all relative ${
                    activeSection === section
                      ? "text-cyan-500"
                      : theme === "dark"
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-600 hover:text-black"
                  }`}
                >
                  {t.nav[section]}
                  {activeSection === section && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-cyan-500"
                    />
                  )}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setLang(lang === "en" ? "es" : "en")}
                className={`px-3 py-1 text-sm rounded ${theme === "dark" ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"}`}
              >
                {lang === "en" ? "ES" : "EN"}
              </button>

              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={`p-2 rounded ${theme === "dark" ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"}`}
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <button
                onClick={() => scrollToSection("contact")}
                className={`p-2 rounded ${theme === "dark" ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"}`}
                title={lang === "en" ? "Contact us" : "Contáctenos"}
              >
                <Phone className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollToSection("contact")}
                className="hidden md:block px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-medium rounded transition-colors shadow-md"
              >
                {t.nav.cta}
              </button>

              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden border-t ${theme === "dark" ? "border-gray-800 bg-black" : "border-gray-200 bg-white"}`}
            >
              <div className="px-4 py-4 space-y-3">
                {["home", "about", "services", "tools", "whyUs", "academy", "blog", "contact"].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="block w-full text-left px-3 py-2 text-sm font-medium"
                  >
                    {t.nav[section]}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="pt-16">
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/20 via-black to-blue-950/20" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, rgba(6, 182, 212, 0.15) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight">
                {t.hero.title}
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  {t.hero.subtitle}
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto text-balance leading-relaxed">
                {t.hero.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 max-w-4xl mx-auto">
                {[
                  { value: "500+", label: lang === "en" ? "Clients Protected" : "Clientes Protegidos" },
                  { value: "99.9%", label: lang === "en" ? "Uptime SLA" : "SLA de Disponibilidad" },
                  { value: "24/7", label: lang === "en" ? "Security Monitoring" : "Monitoreo de Seguridad" },
                  { value: "15min", label: lang === "en" ? "Response Time" : "Tiempo de Respuesta" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className={`p-4 md:p-6 rounded-xl ${
                      theme === "dark"
                        ? "bg-gray-900/50 border border-gray-800/50"
                        : "bg-white/50 border border-gray-200/50"
                    } backdrop-blur-sm`}
                  >
                    <motion.p
                      className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-1"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                    >
                      {stat.value}
                    </motion.p>
                    <p className="text-xs md:text-sm text-gray-400">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mb-8">
                <label className="block text-sm text-gray-400 mb-4">{t.hero.selectRole}</label>
                <div className="flex flex-wrap justify-center gap-3">
                  {["ciso", "cio", "cfo", "itTeam"].map((role) => (
                    <button
                      key={role}
                      onClick={() => setSelectedRole(role)}
                      className={`px-6 py-3 rounded-lg font-medium transition-all ${
                        selectedRole === role
                          ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/50"
                          : theme === "dark"
                            ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {t.hero[role]}
                    </button>
                  ))}
                </div>
              </div>

              <motion.div
                key={selectedRole}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <p className="text-lg md:text-xl text-cyan-400 mb-6 leading-relaxed">
                  {t.hero.roleMessages[selectedRole]}
                </p>
                <button
                  onClick={() => {
                    // Different actions based on selected role
                    if (selectedRole === "cfo") {
                      scrollToSection("tools") // Go to ROI calculator
                    } else if (selectedRole === "cio") {
                      scrollToSection("services") // Go to services/integrations
                    } else {
                      scrollToSection("contact") // Go to contact form for CISO and IT Team
                    }
                  }}
                  className="px-8 py-4 bg-white text-black hover:bg-gray-100 font-semibold rounded-lg transition-colors inline-flex items-center gap-2 shadow-xl"
                >
                  {t.hero.ctaMessages[selectedRole]}
                  <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section
          className={`py-16 md:py-20 border-y ${theme === "dark" ? "border-gray-800 bg-gray-900/50" : "border-gray-200 bg-gray-50"}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {t.partners.title}
              </h3>
              <p className="text-sm text-gray-400">{t.partners.subtitle}</p>
            </motion.div>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
              {[
                { name: "AWS", icon: Cloud },
                { name: "Google Cloud", icon: Globe },
                { name: "Microsoft Azure", icon: Server },
              ].map((partner, i) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className={`flex items-center gap-3 opacity-60 hover:opacity-100 transition-all cursor-pointer p-6 rounded-xl ${
                    theme === "dark" ? "bg-gray-900/30 hover:bg-gray-900/50" : "bg-white/50 hover:bg-white"
                  }`}
                >
                  <partner.icon className="w-8 h-8 md:w-10 md:h-10 text-cyan-500" />
                  <span className="font-bold text-lg md:text-xl">{partner.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-28 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-400 to-white bg-clip-text text-transparent leading-tight">
                {t.about.title}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-10">
              {[
                { title: t.about.mission, text: t.about.missionText, icon: Target },
                { title: t.about.vision, text: t.about.visionText, icon: Eye },
                { title: t.about.presence, text: t.about.presenceText, icon: Globe },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  whileHover={{ y: -8 }}
                  className={`p-8 rounded-xl ${theme === "dark" ? "bg-gray-900 border border-gray-800" : "bg-gray-50 border border-gray-200"} transition-all`}
                >
                  <item.icon className="w-12 h-12 text-cyan-500 mb-6" />
                  <h3 className="text-2xl font-bold mb-5">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className={`py-28 md:py-32 ${theme === "dark" ? "bg-gray-900/50" : "bg-gray-50"}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-400 to-white bg-clip-text text-transparent leading-tight">
                {t.services.title}
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed">{t.services.subtitle}</p>
            </motion.div>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-cyan-500/20 mb-16">
              <img
                src="/soc-service.jpg"
                alt="Security Operations Center"
                className="w-full h-auto"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = "/placeholder.jpg"
                }}
              />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.services.items.map((service, i) => {
                const icons = [
                  ShieldCheck,
                  Users,
                  FileText,
                  Target,
                  Activity,
                  Shield,
                  Cloud,
                  Server,
                  CheckCircle,
                  Eye,
                  Settings,
                  Server,
                  Users,
                  Award,
                ]
                const Icon = icons[i % icons.length] // Use modulo to cycle through icons if more services than icons
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -5 }}
                    className={`p-6 rounded-xl ${theme === "dark" ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-200"} hover:border-cyan-500 transition-all cursor-pointer shadow-sm hover:shadow-md`}
                  >
                    <Icon className="w-10 h-10 text-cyan-500 mb-4" />
                    <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{service.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        <section id="tools" className="py-28 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-400 to-white bg-clip-text text-transparent leading-tight">
                {t.tools.title}
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`p-8 rounded-xl ${theme === "dark" ? "bg-gray-900 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}
              >
                <DollarSign className="w-12 h-12 text-cyan-500 mb-6" />
                <h3 className="text-2xl font-bold mb-4">{t.tools.roiTitle}</h3>
                <p className="text-gray-400 mb-8 leading-relaxed">{t.tools.roiDesc}</p>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium mb-2">{t.tools.employees}</label>
                    <input
                      type="number"
                      value={roiData.employees}
                      onChange={(e) => setRoiData({ ...roiData, employees: Number.parseInt(e.target.value) || 0 })}
                      className={`w-full px-4 py-3 rounded-lg ${theme === "dark" ? "bg-black border-gray-700" : "bg-white border-gray-300"} focus:border-cyan-500 focus:ring-cyan-500`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">{t.tools.industry}</label>
                    <select
                      value={roiData.industry}
                      onChange={(e) => setRoiData({ ...roiData, industry: e.target.value })}
                      className={`w-full px-4 py-3 rounded-lg ${theme === "dark" ? "bg-black border-gray-700" : "bg-white border-gray-300"} appearance-none`}
                    >
                      {Object.entries(t.tools.industries).map(([key, value]) => (
                        <option key={key} value={key}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t.tools.currentRisk}: {roiData.currentRisk}/10
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={roiData.currentRisk}
                      onChange={(e) => setRoiData({ ...roiData, currentRisk: Number.parseInt(e.target.value) })}
                      className="w-full h-2 accent-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t.tools.proposedRisk}: {roiData.proposedRisk}/10
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={roiData.proposedRisk}
                      onChange={(e) => setRoiData({ ...roiData, proposedRisk: Number.parseInt(e.target.value) })}
                      className="w-full h-2 accent-cyan-500"
                    />
                  </div>

                  <button
                    onClick={calculateROI}
                    className="w-full px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors shadow-md"
                  >
                    {t.tools.calculate}
                  </button>

                  {roiResults && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="grid md:grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-700/50"
                    >
                      <div>
                        <p className="text-sm text-gray-400">{t.tools.results.savings}</p>
                        <p className="text-3xl font-bold text-green-500">${roiResults.savings.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">{t.tools.results.investment}</p>
                        <p className="text-3xl font-bold">${roiResults.investment.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">{t.tools.results.roi}</p>
                        <p className="text-3xl font-bold text-cyan-500">{roiResults.roi}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">{t.tools.results.payback}</p>
                        <p className="text-3xl font-bold">
                          {roiResults.payback} {t.tools.results.months}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`p-8 rounded-xl ${theme === "dark" ? "bg-gray-900 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}
              >
                <Award className="w-12 h-12 text-cyan-500 mb-6" />
                <h3 className="text-2xl font-bold mb-4">{t.tools.maturityTitle}</h3>
                <p className="text-gray-400 mb-8 leading-relaxed">{t.tools.maturityDesc}</p>

                <div className="space-y-4 mb-8">
                  {t.tools.maturityItems.map((item, i) => (
                    <label key={i} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={maturityChecks[i]}
                        onChange={() => {
                          const newChecks = [...maturityChecks]
                          newChecks[i] = !newChecks[i]
                          setMaturityChecks(newChecks)
                        }}
                        className="w-5 h-5 rounded border-gray-600 text-cyan-500 focus:ring-cyan-500"
                      />
                      <span className="text-sm group-hover:text-cyan-500 transition-colors">{item}</span>
                    </label>
                  ))}
                </div>

                <div className={`p-6 rounded-lg ${theme === "dark" ? "bg-black" : "bg-white"} shadow-inner`}>
                  <p className="text-sm text-gray-400 mb-2">{t.tools.maturityScore}</p>
                  <div className="flex items-end gap-4">
                    <p className="text-4xl font-bold text-cyan-500">{Math.round(maturityScore)}%</p>
                    <p className="text-lg mb-1">{maturityLevel}</p>
                  </div>
                  <div className="w-full h-2 bg-gray-700 rounded-full mt-4 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${maturityScore}%` }}
                      className="h-full bg-cyan-500 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Removed Incident Response Timeline section */}
          </div>
        </section>

        <section id="cases" className={`py-28 md:py-32 ${theme === "dark" ? "bg-gray-900/50" : "bg-gray-50"}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-400 to-white bg-clip-text text-transparent leading-tight">
                {t.cases.title}
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed">{t.cases.subtitle}</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {t.cases.metrics.map((metric, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-6 rounded-xl text-center ${theme === "dark" ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-200"}`}
                >
                  <p className="text-4xl font-bold text-cyan-500 mb-2">{metric.value}</p>
                  <p className="text-sm text-gray-400">{metric.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {t.cases.testimonials.map((testimonial, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  whileHover={{ y: -8 }}
                  className={`p-8 rounded-xl ${theme === "dark" ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-200"} transition-all shadow-sm hover:shadow-md`}
                >
                  <p className="text-gray-400 mb-6 italic leading-relaxed">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-bold">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="whyUs" className="py-28 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-400 to-white bg-clip-text text-transparent leading-tight">
                {t.why.title}
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed">{t.why.subtitle}</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {t.why.items.map((item, i) => {
                const icons = [TrendingUp, Globe, Zap, Settings]
                const Icon = icons[i]
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -8 }}
                    className={`p-6 rounded-xl ${theme === "dark" ? "bg-gray-900 border border-gray-800" : "bg-gray-50 border border-gray-200"} transition-all`}
                  >
                    <Icon className="w-10 h-10 text-cyan-500 mb-4" />
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        <section className={`py-28 md:py-32 ${theme === "dark" ? "bg-gray-900/50" : "bg-gray-50"}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-400 to-white bg-clip-text text-transparent leading-tight">
                  {t.hrm.title}
                </h2>
                <p className="text-xl text-cyan-500 mb-6">{t.hrm.subtitle}</p>
                <p className="text-gray-400 mb-8 leading-relaxed">{t.hrm.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {t.hrm.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors shadow-md">
                  {t.hrm.cta}
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`rounded-xl overflow-hidden ${theme === "dark" ? "bg-black border border-gray-800" : "bg-white border border-gray-200"}`}
              >
                <img
                  src="/hrm-service.jpg"
                  alt="HRM Dashboard"
                  className="w-full h-auto"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = "/placeholder.jpg"
                  }}
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-28 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-400 to-white bg-clip-text text-transparent leading-tight">
                {t.vciso.title}
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed">{t.vciso.subtitle}</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {t.vciso.plans.map((plan, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className={`p-8 rounded-xl relative ${
                    plan.popular
                      ? "bg-cyan-500 text-black"
                      : theme === "dark"
                        ? "bg-gray-900 border border-gray-800"
                        : "bg-gray-50 border border-gray-200"
                  } transition-all shadow-sm hover:shadow-lg`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-black text-cyan-500 px-4 py-1 text-xs font-bold rounded-bl-lg rounded-tr-lg uppercase tracking-wide">
                      Most Popular
                    </div>
                  )}

                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className={plan.popular ? "text-black/70" : "text-gray-400"}>{plan.period}</span>
                  </div>

                  <div className="space-y-4 mb-10">
                    {plan.features.map((feature, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <CheckCircle
                          className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.popular ? "text-black" : "text-cyan-500"}`}
                        />
                        <span className={`text-sm ${plan.popular ? "text-black" : ""}`}>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() =>
                      scrollToContactWithMessage(
                        language === "en"
                          ? `I'm interested in the vCISO ${plan.name} plan. Please contact me to discuss how this service can help secure my organization.`
                          : `Estoy interesado en el plan vCISO ${plan.name}. Por favor contáctenme para discutir cómo este servicio puede ayudar a asegurar mi organización.`,
                      )
                    }
                    className={`w-full px-6 py-3 font-bold rounded-lg transition-colors shadow-md ${
                      plan.popular
                        ? "bg-black text-cyan-500 hover:bg-gray-900"
                        : "bg-cyan-500 text-white hover:bg-cyan-600"
                    }`}
                  >
                    {language === "en" ? "Get Started" : "Comenzar"}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="academy" className={`py-28 md:py-32 ${theme === "dark" ? "bg-gray-900/50" : "bg-gray-50"}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-400 to-white bg-clip-text text-transparent leading-tight">
                {t.academy.title}
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed">{t.academy.subtitle}</p>
            </motion.div>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-cyan-500/20 mb-16">
              <img
                src="/academy-service.jpg"
                alt="Tandem Academy Training"
                className="w-full h-auto"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = "/placeholder.jpg"
                }}
              />
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-8">{lang === "en" ? "Featured Courses" : "Cursos Destacados"}</h3>
                <div className="space-y-5">
                  {t.academy.courses.map((course, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ y: -5 }}
                      className={`p-6 rounded-xl ${theme === "dark" ? "bg-gray-900 border border-gray-800" : "bg-gray-50 border border-gray-200"} transition-all shadow-sm hover:shadow-md`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-bold">{course.title}</h4>
                        <span className="text-xs px-2 py-1 bg-cyan-500 text-white rounded-full">{course.level}</span>
                      </div>
                      <p className="text-sm text-gray-400">{course.duration}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`p-8 rounded-xl ${theme === "dark" ? "bg-gradient-to-br from-cyan-950/80 to-blue-950/80 border border-cyan-800" : "bg-gradient-to-br from-cyan-50/80 to-blue-50/80 border border-cyan-200"} transition-all shadow-lg`}
              >
                <Settings className="w-12 h-12 text-cyan-500 mb-6" />
                <h3 className="text-2xl font-bold mb-4">{t.academy.customCourse.title}</h3>
                <p className="text-gray-400 mb-8 leading-relaxed">{t.academy.customCourse.description}</p>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors shadow-md"
                >
                  {t.academy.customCourse.cta}
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        <section className={`py-28 md:py-32 ${theme === "dark" ? "bg-gray-900/50" : "bg-gray-50"}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2
                id="blog"
                className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-400 to-white bg-clip-text text-transparent leading-tight"
              >
                {t.blog.title}
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed">{t.blog.subtitle}</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {t.blog.posts.map((post, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`rounded-xl overflow-hidden cursor-pointer ${theme === "dark" ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-200"} transition-all shadow-sm hover:shadow-md`}
                >
                  <div className="h-48 bg-gradient-to-br from-cyan-950/80 to-blue-950/80" />
                  <div className="p-6">
                    <span className="text-xs px-3 py-1 bg-cyan-500 text-white rounded-full">{post.category}</span>
                    <h3 className="text-xl font-bold mt-4 mb-2">{post.title}</h3>
                    <p className="text-sm text-gray-400">{post.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-28 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-400 to-white bg-clip-text text-transparent leading-tight">
                {t.contact.title}
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed">{t.contact.subtitle}</p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12">
              <motion.form
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                onSubmit={handleContactSubmit}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium mb-2">{t.contact.form.name}</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className={`w-full px-4 py-3 rounded-lg ${theme === "dark" ? "bg-black border-gray-800" : "bg-gray-50 border-gray-300"} border focus:border-cyan-500 focus:ring-cyan-500 outline-none`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t.contact.form.email}</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className={`w-full px-4 py-3 rounded-lg ${theme === "dark" ? "bg-black border-gray-800" : "bg-gray-50 border-gray-300"} border focus:border-cyan-500 focus:ring-cyan-500 outline-none`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t.contact.form.company}</label>
                  <input
                    type="text"
                    name="company"
                    required
                    value={contactForm.company}
                    onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                    className={`w-full px-4 py-3 rounded-lg ${theme === "dark" ? "bg-black border-gray-800" : "bg-gray-50 border-gray-300"} border focus:border-cyan-500 focus:ring-cyan-500 outline-none`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t.contact.form.message}</label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className={`w-full px-4 py-3 rounded-lg ${theme === "dark" ? "bg-black border-gray-800" : "bg-gray-50 border-gray-300"} border focus:border-cyan-500 focus:ring-cyan-500 outline-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="w-full px-6 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-700 text-white font-bold rounded-lg transition-colors shadow-md"
                >
                  {formStatus === "sending" ? t.contact.form.sending : t.contact.form.send}
                </button>

                {formStatus === "success" && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-green-500 text-center text-sm"
                  >
                    {t.contact.form.success}
                  </motion.p>
                )}

                {formStatus === "error" && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-center text-sm"
                  >
                    {lang === "en"
                      ? "Error sending message. Please try again."
                      : "Error al enviar el mensaje. Por favor intente nuevamente."}
                  </motion.p>
                )}
              </motion.form>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-xl font-bold mb-4">{t.contact.info.us}</h3>
                  <p className="text-gray-400 flex items-start gap-2">
                    <MapPin className="w-5 h-5 mt-1 flex-shrink-0 text-cyan-500" />
                    {t.contact.info.usAddress}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">{t.contact.info.ar}</h3>
                  <p className="text-gray-400 flex items-start gap-2">
                    <MapPin className="w-5 h-5 mt-1 flex-shrink-0 text-cyan-500" />
                    {t.contact.info.arAddress}
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-cyan-500" />
                    <a href={`mailto:${t.contact.info.email}`} className="hover:text-cyan-500 transition-colors">
                      {t.contact.info.email}
                    </a>
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    className="p-3 rounded-full bg-cyan-500 hover:bg-cyan-600 transition-colors shadow-md"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5 text-white" />
                  </button>
                  <button
                    className="p-3 rounded-full bg-cyan-500 hover:bg-cyan-600 transition-colors shadow-md"
                    title="Twitter"
                  >
                    <Twitter className="w-5 h-5 text-white" />
                  </button>
                  <button
                    className="p-3 rounded-full bg-cyan-500 hover:bg-cyan-600 transition-colors shadow-md"
                    title="GitHub"
                  >
                    <Github className="w-5 h-5 text-white" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer
        className={`py-16 border-t ${theme === "dark" ? "border-gray-800 bg-black" : "border-gray-200 bg-gray-50"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-8 h-8 text-cyan-500" />
                <span className="text-xl font-bold">Tandem Lens</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">{t.footer.tagline}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-gray-300">Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <button onClick={() => scrollToSection("services")} className="hover:text-cyan-500 transition-colors">
                    vCISO as a Service
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("services")} className="hover:text-cyan-500 transition-colors">
                    SOC as a Service
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("services")} className="hover:text-cyan-500 transition-colors">
                    Human Risk Management
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("services")} className="hover:text-cyan-500 transition-colors">
                    Cloud Security
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-gray-300">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <button onClick={() => scrollToSection("blog")} className="hover:text-cyan-500 transition-colors">
                    Blog
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("academy")} className="hover:text-cyan-500 transition-colors">
                    Academy
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("tools")} className="hover:text-cyan-500 transition-colors">
                    Tools
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("about")} className="hover:text-cyan-500 transition-colors">
                    About Us
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-gray-300">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-cyan-500 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-500 transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-500 transition-colors">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div
            className={`pt-8 border-t ${theme === "dark" ? "border-gray-800" : "border-gray-200"} text-center text-sm text-gray-400`}
          >
            <p>{t.footer.copyright}</p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowPopup(false)
              setPopupDismissed(true)
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`max-w-md w-full p-8 rounded-xl ${theme === "dark" ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-200"}`}
            >
              <div className="flex justify-between items-start mb-4">
                <Shield className="w-12 h-12 text-cyan-500" />
                <button
                  onClick={() => {
                    setShowPopup(false)
                    setPopupDismissed(true)
                  }}
                  className="text-gray-400 hover:text-white/80 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <h3 className="text-2xl font-bold mb-2">{t.popup.title}</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">{t.popup.description}</p>
              <button
                onClick={() => {
                  setShowPopup(false)
                  setPopupDismissed(true)
                  scrollToSection("contact")
                }}
                className="w-full px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors shadow-md"
              >
                {t.popup.cta}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCookies && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className={`fixed bottom-0 left-0 right-0 z-40 p-4 ${theme === "dark" ? "bg-gray-900 border-t border-gray-800" : "bg-white border-t border-gray-200"}`}
          >
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <Cookie className="w-6 h-6 text-cyan-500 flex-shrink-0 mt-1" />
                <p className="text-sm text-gray-400">{t.cookies.message}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCookies(false)}
                  className={`px-4 py-2 rounded font-medium text-sm ${theme === "dark" ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"} transition-colors`}
                >
                  {t.cookies.decline}
                </button>
                <button
                  onClick={() => setShowCookies(false)}
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded font-medium text-sm transition-colors shadow-md"
                >
                  {t.cookies.accept}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-30 p-4 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full shadow-lg transition-all"
        title={t.chat.tooltip}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>
    </div>
  )
}

function TimelinePhase({ phase, index, theme }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay: index * 0.15 }}
      className={`p-6 rounded-xl ${theme === "dark" ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-200"}`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center font-bold text-sm">
          {index + 1}
        </div>
        <div>
          <h4 className="font-bold">{phase.phase}</h4>
          <p className="text-xs text-cyan-500">{phase.time}</p>
        </div>
      </div>
      <p className="text-sm text-gray-400 leading-relaxed">{phase.desc}</p>
    </motion.div>
  )
}

export default App
