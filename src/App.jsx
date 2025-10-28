import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronRight, Shield, Users, GraduationCap, Zap, Eye, Lock, Cloud, Factory, UserCheck, TrendingUp, Download, Calendar, Play, Linkedin, Youtube, Github, MapPin, Mail, Phone, Building2, Globe, Award, Sun, Moon, BarChart3, Calculator, CheckCircle, AlertTriangle, Users2, Clock, Target, MessageSquare, X, Menu, Filter, ChevronDown, Mail as MailIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
  const [language, setLanguage] = useState('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const [showLeadPopup, setShowLeadPopup] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [popupManuallyClosed, setPopupManuallyClosed] = useState(false);
  const [hasEverSubmittedForm, setHasEverSubmittedForm] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const headerRef = useRef(null);
  const servicesDropdownRef = useRef(null);
  const popupTimerRef = useRef(null);
  const scrollListenerRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target)) {
        setIsServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const t = (key) => {
    const translations = {
      es: {
        heroTitle: "Defensa inteligente. Resultados medibles.",
        heroSubtitle: "Protegemos tu negocio con soluciones integrales en Ciberseguridad, Riesgo Humano y Formación.",
        ctaExpert: "Habla con un experto",
        ctaDemo: "Ver demo HRM",
        services: "Servicios",
        about: "Sobre Nosotros",
        whyUs: "Por qué Tandem Lens",
        cases: "Casos & Métricas",
        hrmFocus: "HRM Product Focus",
        vCISO: "vCISO as a Service",
        csirt: "CSIRT & DFIR Remoto",
        academy: "Academy & Eventos",
        blog: "Blog & Recursos",
        partners: "Partners",
        contact: "Contacto",
        privacy: "Privacidad",
        resources: "Recursos",
        footerAddress: "Estados Unidos (USA) · Buenos Aires (ARG)",
        prepare: "Preparación",
        analyze: "Análisis",
        eradicate: "Erradicación",
        report: "Reporte",
        explore: "Explorar",
        viewSOC: "Ver SOC",
        requestSimulation: "Solicitar simulación",
        viewReports: "Ver informes",
        viewSolution: "Ver solución",
        viewMore: "Ver más",
        viewService: "Ver servicio",
        viewPrograms: "Ver programas",
        exploreVCISO: "Explorar vCISO",
        aboutTitle: "Sobre Tandem Lens",
        aboutSubtitle: "Protegiendo el futuro digital desde dos continentes",
        aboutDescription: "Fundada en 2020, Tandem Lens es una empresa internacional de ciberseguridad con oficinas en Hattiesburg, Mississippi (USA) y Buenos Aires (Argentina). Combinamos la excelencia técnica norteamericana con la innovación latinoamericana para ofrecer soluciones de ciberseguridad de vanguardia.",
        aboutMission: "Nuestra misión es transformar la ciberseguridad en un motor de negocio, no solo en un costo operativo.",
        aboutVision: "Ser el partner de confianza para organizaciones que buscan una defensa inteligente y resultados medibles.",
        globalPresence: "Presencia Global",
        dualExpertise: "Doble Expertise",
        measurableResults: "Resultados Medibles",
        roiCalculator: "Calculadora de ROI",
        assessmentTool: "Evaluación de Madurez",
        timeline: "Nuestra Respuesta",
        contactForm: "Formulario de Contacto",
        nameLabel: "Nombre",
        emailLabel: "Email",
        companyLabel: "Empresa",
        messageLabel: "Mensaje",
        submitButton: "Enviar Mensaje",
        thanksMessage: "¡Gracias por contactarnos! Nos pondremos en contacto pronto.",
        cookieAccept: "Aceptar",
        cookieDecline: "Rechazar",
        cookieMessage: "Utilizamos cookies para mejorar tu experiencia. Al continuar, aceptas nuestra política de cookies.",
        liveChat: "Chat en vivo",
        mode: "Modo",
        trustedBy: "Confían en Nosotros",
        technologyPartners: "Partners Tecnológicos",
        consultingAudits: "Consultoría & Auditorías",
        socBlueTeam: "SOC & Blue Team",
        redTeamPentesting: "Red Team & Pentesting",
        threatIntelligence: "Threat Intelligence",
        igaPam: "Consultoría IGA / PAM",
        otIcsSecurity: "OT / ICS Security",
        cloudSecurity: "CSPM / CIEM / IaC Security",
        hrm: "HRM (Human Risk Management)",
        academyTraining: "Academy & Formación",
        vcisoService: "vCISO as a Service",
        csirtDfir: "CSIRT & DFIR Remoto"
      },
      en: {
        heroTitle: "Intelligent Defense. Measurable Results.",
        heroSubtitle: "We protect your business with comprehensive solutions in Cybersecurity, Human Risk Management, and Training.",
        ctaExpert: "Talk to an expert",
        ctaDemo: "View HRM demo",
        services: "Services",
        about: "About Us",
        whyUs: "Why Tandem Lens",
        cases: "Cases & Metrics",
        hrmFocus: "HRM Product Focus",
        vCISO: "vCISO as a Service",
        csirt: "CSIRT & DFIR Remote",
        academy: "Academy & Events",
        blog: "Blog & Resources",
        partners: "Partners",
        contact: "Contact",
        privacy: "Privacy",
        resources: "Resources",
        footerAddress: "United States (USA) · Buenos Aires (ARG)",
        prepare: "Preparation",
        analyze: "Analysis",
        eradicate: "Eradication",
        report: "Reporting",
        explore: "Explore",
        viewSOC: "View SOC",
        requestSimulation: "Request simulation",
        viewReports: "View reports",
        viewSolution: "View solution",
        viewMore: "View more",
        viewService: "View service",
        viewPrograms: "View programs",
        exploreVCISO: "Explore vCISO",
        aboutTitle: "About Tandem Lens",
        aboutSubtitle: "Protecting the digital future from two continents",
        aboutDescription: "Founded in 2020, Tandem Lens is an international cybersecurity company with offices in Hattiesburg, Mississippi (USA) and Buenos Aires (Argentina). We combine North American technical excellence with Latin American innovation to deliver cutting-edge cybersecurity solutions.",
        aboutMission: "Our mission is to transform cybersecurity into a business driver, not just an operational cost.",
        aboutVision: "To be the trusted partner for organizations seeking intelligent defense and measurable results.",
        globalPresence: "Global Presence",
        dualExpertise: "Dual Expertise",
        measurableResults: "Measurable Results",
        roiCalculator: "ROI Calculator",
        assessmentTool: "Maturity Assessment",
        timeline: "Our Response",
        contactForm: "Contact Form",
        nameLabel: "Name",
        emailLabel: "Email",
        companyLabel: "Company",
        messageLabel: "Message",
        submitButton: "Send Message",
        thanksMessage: "Thank you for contacting us! We'll get back to you soon.",
        cookieAccept: "Accept",
        cookieDecline: "Decline",
        cookieMessage: "We use cookies to improve your experience. By continuing, you accept our cookie policy.",
        liveChat: "Live Chat",
        mode: "Mode",
        trustedBy: "Trusted By",
        technologyPartners: "Technology Partners",
        consultingAudits: "Consulting & Audits",
        socBlueTeam: "SOC & Blue Team",
        redTeamPentesting: "Red Team & Pentesting",
        threatIntelligence: "Threat Intelligence",
        igaPam: "IGA / PAM Consulting",
        otIcsSecurity: "OT / ICS Security",
        cloudSecurity: "CSPM / CIEM / IaC Security",
        hrm: "HRM (Human Risk Management)",
        academyTraining: "Academy & Training",
        vcisoService: "vCISO as a Service",
        csirtDfir: "CSIRT & DFIR Remote"
      }
    };
    return translations[language][key] || key;
  };

  // ScrollSpy functionality
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'partners', 'about', 'services', 'cases', 'why', 'hrm', 'vciso', 'csirt', 'academy', 'blog', 'contact-section'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = headerRef.current?.offsetHeight || 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsMenuOpen(false);
    setIsServicesDropdownOpen(false);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    name: formData.name,
    email: formData.email,
    company: formData.company,
    message: formData.message,
    language: language || 'en', // o 'es' según el estado global o contexto actual
  };

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error('Error en la API', await res.text());
      alert(language === 'es'
        ? 'Hubo un error al enviar el mensaje. Intenta nuevamente.'
        : 'There was an error sending your message. Please try again.');
      return;
    }

    // Éxito → feedback al usuario
    setFormSubmitted(true);
    alert(language === 'es'
      ? 'Mensaje enviado correctamente. Te contactaremos pronto.'
      : 'Message sent successfully. We will contact you soon.');

    // Limpiar el formulario
    setFormData({ name: '', email: '', company: '', message: '' });
    setTimeout(() => setFormSubmitted(false), 3000);
  } catch (err) {
    console.error('Error de red', err);
    alert(language === 'es'
      ? 'Error de conexión. Verifica tu red.'
      : 'Network error. Please check your connection.');
  }
};


  // ROI Calculator logic
  const [roiData, setRoiData] = useState({
    employees: 500,
    avgBreachCost: 4350000,
    currentRiskLevel: 65,
    proposedRiskLevel: 25
  });

  const calculateROI = useCallback(() => {
    const { employees, avgBreachCost, currentRiskLevel, proposedRiskLevel } = roiData;
    const riskReduction = currentRiskLevel - proposedRiskLevel;
    const potentialSavings = (avgBreachCost * riskReduction) / 100;
    const investment = employees * 150;
    const roi = ((potentialSavings - investment) / investment) * 100;
    
    return {
      potentialSavings: potentialSavings.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }),
      investment: investment.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }),
      roi: roi > 0 ? `+${roi.toFixed(0)}%` : `${roi.toFixed(0)}%`
    };
  }, [roiData]);

  const roiResults = calculateROI();

  // Maturity Assessment
  const [assessmentScore, setAssessmentScore] = useState(0);
  const assessmentQuestions = [
    { question: "Do you have a formal cybersecurity policy?", weight: 10 },
    { question: "Is your staff regularly trained on security awareness?", weight: 15 },
    { question: "Do you conduct regular security assessments?", weight: 20 },
    { question: "Is your incident response plan tested regularly?", weight: 25 },
    { question: "Do you have 24/7 security monitoring?", weight: 30 }
  ];

  const handleAssessmentChange = (index, value) => {
    const newScore = assessmentQuestions.reduce((score, q, i) => {
      return score + (i <= index && value ? q.weight : 0);
    }, 0);
    setAssessmentScore(newScore);
  };

  // Timeline data
  const timelineEvents = [
    { time: "0-15 min", title: "Detection", description: "Automated threat detection and alerting" },
    { time: "15-30 min", title: "Triage", description: "Initial assessment and prioritization" },
    { time: "30-60 min", title: "Containment", description: "Isolation of affected systems" },
    { time: "1-4 hours", title: "Eradication", description: "Removal of threats and vulnerabilities" },
    { time: "4-24 hours", title: "Recovery", description: "System restoration and validation" },
    { time: "24-72 hours", title: "Post-Incident", description: "Analysis and improvement recommendations" }
  ];

  const servicesList = [
    { id: 'consulting', title: t('consultingAudits'), icon: Shield, desc: "We evaluate, design, and align your security with ISO, NIST, and CIS standards.", section: 'services' },
    { id: 'soc', title: t('socBlueTeam'), icon: Eye, desc: "24/7 monitoring and response with threat intelligence and executive KPIs.", section: 'services' },
    { id: 'redteam', title: t('redTeamPentesting'), icon: Zap, desc: "Real attack simulations (controlled), adversary emulation, purple team, and secure social engineering.", section: 'services' },
    { id: 'threatintel', title: t('threatIntelligence'), icon: Users, desc: "Campaign detection, dark web monitoring, and MITRE ATT&CK feeds.", section: 'services' },
    { id: 'igapam', title: t('igaPam'), icon: Lock, desc: "Identity governance, privileges, and critical access management.", section: 'services' },
    { id: 'otics', title: t('otIcsSecurity'), icon: Factory, desc: "Protection of industrial infrastructure according to the Purdue model.", section: 'services' },
    { id: 'cloud', title: t('cloudSecurity'), icon: Cloud, desc: "Cloud posture security, permissions, and infrastructure as code.", section: 'services' },
    { id: 'hrm', title: t('hrm'), icon: UserCheck, desc: "AI to measure and reduce human risk across your entire organization.", section: 'hrm' },
    { id: 'academy', title: t('academyTraining'), icon: GraduationCap, desc: "Technical and executive training in cybersecurity and awareness.", section: 'academy' },
    { id: 'vciso', title: t('vcisoService'), icon: TrendingUp, desc: "Strategic security leadership without hiring a full-time CISO.", section: 'vciso' },
    { id: 'csirt', title: t('csirtDfir'), icon: Shield, desc: "Incident response and digital forensics (remote-first, no hardware required).", section: 'csirt' }
  ];

  const testimonials = [
    { quote: "Reducimos el riesgo humano en 75% en 6 meses.", author: "Universidad Fintech" },
    { quote: "Implementamos SOC 24/7 con métricas ISO.", author: "Empresa Financiera" }
  ];

  const vCISOPlans = [
    { name: "Starter", price: "$2,500/mo", features: ["Governance básico", "Risk assessment", "Compliance NIST"] },
    { name: "Growth", price: "$5,000/mo", features: ["Governance avanzado", "Risk management", "Compliance ISO 27001", "Board reporting"] },
    { name: "Enterprise", price: "Custom", features: ["Governance completo", "Risk & compliance", "Incident response", "Executive metrics", "Custom integrations"] }
  ];

  const courses = [
    "Blue Team Operations", "Red Team Tactics", "Cloud Security", "Security Awareness"
  ];

  const blogPosts = [
    "Tandem Lens Threat Landscape 2025",
    "Human Risk Management Best Practices",
    "NIST Compliance Guide 2025",
    "Cloud Security Posture Management"
  ];

  // Show lead popup after 30 seconds or 70% scroll - MEJORADO
  useEffect(() => {
    // Clear any existing timers/listeners
    if (popupTimerRef.current) {
      clearTimeout(popupTimerRef.current);
    }
    if (scrollListenerRef.current) {
      window.removeEventListener('scroll', scrollListenerRef.current);
    }

    // Don't show popup if already submitted or manually closed
    if (hasEverSubmittedForm || popupManuallyClosed) {
      return;
    }

    // Set up timer
    popupTimerRef.current = setTimeout(() => {
      if (!showLeadPopup && !hasEverSubmittedForm && !popupManuallyClosed) {
        setShowLeadPopup(true);
      }
    }, 30000);

    // Set up scroll listener
    const handleScroll = () => {
      if (hasEverSubmittedForm || popupManuallyClosed || showLeadPopup) {
        return;
      }
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 70) {
        setShowLeadPopup(true);
      }
    };

    scrollListenerRef.current = handleScroll;
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      if (popupTimerRef.current) {
        clearTimeout(popupTimerRef.current);
      }
      if (scrollListenerRef.current) {
        window.removeEventListener('scroll', scrollListenerRef.current);
      }
    };
  }, [showLeadPopup, hasEverSubmittedForm, popupManuallyClosed]);

  // Handle logo click - NUEVA FUNCIÓN
  const handleLogoClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    setIsMenuOpen(false);
    setIsServicesDropdownOpen(false);
    setActiveSection('hero');
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} min-h-screen transition-colors duration-300`}>
      {/* Cookie Banner */}
      <AnimatePresence>
        {showCookieBanner && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-0 left-0 right-0 bg-gray-800/95 backdrop-blur-sm border-t border-gray-700 p-4 z-50"
          >
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm">{t('cookieMessage')}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowCookieBanner(false)}
                  className="px-4 py-2 bg-teal-500 hover:bg-teal-600 rounded text-sm font-medium transition-colors"
                >
                  {t('cookieAccept')}
                </button>
                <button
                  onClick={() => setShowCookieBanner(false)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-sm font-medium transition-colors"
                >
                  {t('cookieDecline')}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lead Generation Popup - CORREGIDO DEFINITIVAMENTE */}
      <AnimatePresence>
        {showLeadPopup && !hasEverSubmittedForm && !popupManuallyClosed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowLeadPopup(false);
              setPopupManuallyClosed(true);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white text-gray-900 rounded-xl p-6 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">{t('contactForm')}</h3>
                <button
                  onClick={() => {
                    setShowLeadPopup(false);
                    setPopupManuallyClosed(true);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">{t('nameLabel')}</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{t('emailLabel')}</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{t('companyLabel')}</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{t('messageLabel')}</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg font-medium transition-colors"
                >
                  {t('submitButton')}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live Chat Button */}
      <button className="fixed bottom-6 right-6 bg-teal-500 hover:bg-teal-600 text-white p-3 rounded-full shadow-lg z-40 transition-colors">
        <MessageSquare className="w-5 h-5" />
        <span className="sr-only">{t('liveChat')}</span>
      </button>

      {/* Header */}
      <header ref={headerRef} className={`fixed top-0 w-full ${darkMode ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-sm z-40 border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              {/* LOGO AHORA ES CLICKABLE - MEJORA IMPLEMENTADA */}
              <button 
                onClick={handleLogoClick}
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
                aria-label="Go to homepage"
              >
                <div className="w-8 h-8 bg-teal-400 rounded-full"></div>
                <span className="text-xl font-bold">Tandem Lens</span>
              </button>
            </div>
            
            <nav className="hidden md:flex space-x-6" ref={servicesDropdownRef}>
              <button 
                onClick={() => scrollToSection('about')} 
                className={`font-medium transition-colors ${activeSection === 'about' ? 'text-teal-400' : darkMode ? 'text-gray-300 hover:text-teal-400' : 'text-gray-700 hover:text-teal-500'}`}
              >
                {t('about')}
              </button>
              
              <div className="relative group">
                <button 
                  onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                  className={`font-medium flex items-center transition-colors ${activeSection === 'services' || activeSection === 'hrm' || activeSection === 'vciso' || activeSection === 'csirt' || activeSection === 'academy' ? 'text-teal-400' : darkMode ? 'text-gray-300 hover:text-teal-400' : 'text-gray-700 hover:text-teal-500'}`}
                >
                  {t('services')}
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                
                <AnimatePresence>
                  {isServicesDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`absolute left-0 mt-2 w-64 rounded-xl shadow-xl z-50 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}
                    >
                      <div className="py-2">
                        {servicesList.map((service, index) => (
                          <button
                            key={service.id}
                            onClick={() => scrollToSection(service.section)}
                            className={`w-full text-left px-4 py-3 flex items-center transition-colors ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'}`}
                          >
                            <service.icon className="w-4 h-4 mr-3 text-teal-500" />
                            <span className="text-sm">{service.title}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <button 
                onClick={() => scrollToSection('cases')} 
                className={`font-medium transition-colors ${activeSection === 'cases' ? 'text-teal-400' : darkMode ? 'text-gray-300 hover:text-teal-400' : 'text-gray-700 hover:text-teal-500'}`}
              >
                {t('cases')}
              </button>
              
              <button 
                onClick={() => scrollToSection('why')} 
                className={`font-medium transition-colors ${activeSection === 'why' ? 'text-teal-400' : darkMode ? 'text-gray-300 hover:text-teal-400' : 'text-gray-700 hover:text-teal-500'}`}
              >
                {t('whyUs')}
              </button>
              
              <button 
                onClick={() => scrollToSection('academy')} 
                className={`font-medium transition-colors ${activeSection === 'academy' ? 'text-teal-400' : darkMode ? 'text-gray-300 hover:text-teal-400' : 'text-gray-700 hover:text-teal-500'}`}
              >
                {t('academy')}
              </button>
              
              <button 
                onClick={() => scrollToSection('partners')} 
                className={`font-medium transition-colors ${activeSection === 'partners' ? 'text-teal-400' : darkMode ? 'text-gray-300 hover:text-teal-400' : 'text-gray-700 hover:text-teal-500'}`}
              >
                {t('partners')}
              </button>
              
              <button 
                onClick={() => scrollToSection('contact-section')} 
                className={`font-medium transition-colors ${activeSection === 'contact-section' ? 'text-teal-400' : darkMode ? 'text-gray-300 hover:text-teal-400' : 'text-gray-700 hover:text-teal-500'}`}
              >
                {t('contact')}
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-200 text-gray-700'}`}
                aria-label={t('mode')}
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              
              <button 
                onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                className={`px-3 py-1 rounded-md font-medium transition-colors ${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                {language === 'es' ? 'EN' : 'ES'}
              </button>
              
              <button 
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden ${darkMode ? 'bg-gray-800 border-t border-gray-700' : 'bg-white border-t border-gray-200'}`}
          >
            <div className="px-4 py-4 space-y-4">
              <button onClick={() => scrollToSection('about')} className="block w-full text-left font-medium hover:text-teal-400 transition-colors">{t('about')}</button>
              
              <div className="space-y-2">
                <button className="block w-full text-left font-medium text-teal-400">{t('services')}</button>
                {servicesList.map((service) => (
                  <button 
                    key={service.id}
                    onClick={() => scrollToSection(service.section)}
                    className="block w-full text-left pl-4 text-gray-600 hover:text-teal-400 transition-colors"
                  >
                    • {service.title}
                  </button>
                ))}
              </div>
              
              <button onClick={() => scrollToSection('cases')} className="block w-full text-left font-medium hover:text-teal-400 transition-colors">{t('cases')}</button>
              <button onClick={() => scrollToSection('why')} className="block w-full text-left font-medium hover:text-teal-400 transition-colors">{t('whyUs')}</button>
              <button onClick={() => scrollToSection('academy')} className="block w-full text-left font-medium hover:text-teal-400 transition-colors">{t('academy')}</button>
              <button onClick={() => scrollToSection('partners')} className="block w-full text-left font-medium hover:text-teal-400 transition-colors">{t('partners')}</button>
              <button onClick={() => scrollToSection('contact-section')} className="block w-full text-left font-medium hover:text-teal-400 transition-colors">{t('contact')}</button>
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-blue-50'}`}></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse delay-2000"></div>
          <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-teal-400 rounded-full animate-pulse delay-500"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent"
          >
            {t('heroTitle')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
          >
            {t('heroSubtitle')}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <button className="bg-teal-500 hover:bg-teal-600 px-8 py-4 rounded-lg font-semibold flex items-center justify-center transition-colors text-white">
              {t('ctaExpert')}
              <ChevronRight className="ml-2 w-5 h-5" />
            </button>
            <button className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold flex items-center justify-center transition-colors border border-gray-300">
              {t('ctaDemo')}
              <Play className="ml-2 w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Technology Partners Section */}
      <section id="partners" className={`py-12 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-800/30' : 'bg-gray-100/50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-lg font-semibold text-teal-500 mb-2">{t('technologyPartners')}</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Trusted technology partnerships that power our solutions</p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
            {/* AWS Logo */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-orange-500 rounded-lg flex items-center justify-center mb-3">
                <span className="text-white font-bold text-sm">AWS</span>
              </div>
              <span className="text-sm font-medium">Amazon Web Services</span>
            </div>
            
            {/* GCP Logo */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center mb-3">
                <span className="text-white font-bold text-sm">GCP</span>
              </div>
              <span className="text-sm font-medium">Google Cloud Platform</span>
            </div>
            
            {/* Microsoft Logo */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-3">
                <span className="text-white font-bold text-sm">MSFT</span>
              </div>
              <span className="text-sm font-medium">Microsoft Azure</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-800/30' : 'bg-gray-100/50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              {t('aboutTitle')}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-teal-500"
            >
              {t('aboutSubtitle')}
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className={`mb-6 text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('aboutDescription')}
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Award className="w-6 h-6 text-teal-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg mb-1">{t('aboutMission')}</h4>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Globe className="w-6 h-6 text-teal-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg mb-1">{t('aboutVision')}</h4>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[
                { icon: Building2, title: t('globalPresence'), desc: "Offices in USA and Argentina" },
                { icon: Shield, title: t('dualExpertise'), desc: "Experience across multiple industries" },
                { icon: TrendingUp, title: t('measurableResults'), desc: "Clear and actionable KPIs" }
              ].map((item, index) => (
                <div key={index} className={`rounded-xl p-6 border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} text-center`}>
                  <div className="w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-teal-500" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`rounded-xl p-8 border ${darkMode ? 'bg-gradient-to-r from-blue-600/20 to-teal-500/20 border-gray-700' : 'bg-gradient-to-r from-blue-100 to-teal-100 border-gray-200'}`}
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Our Philosophy</h3>
              <p className={`max-w-3xl mx-auto text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                "Cybersecurity is not just technology—it's an integrated approach that combines people, processes, and intelligent tools to create resilient and adaptable defenses."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section - Main Services Overview */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">{t('services')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.slice(0, 6).map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-xl p-6 border transition-all duration-300 hover:shadow-lg ${darkMode ? 'bg-gray-800/50 border-gray-700 hover:border-teal-400 hover:shadow-teal-400/20' : 'bg-white border-gray-200 hover:border-teal-500 hover:shadow-teal-500/20'}`}
              >
                <div className="w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-teal-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{service.desc}</p>
                <button 
                  onClick={() => scrollToSection(service.section)}
                  className={`font-medium flex items-center ${darkMode ? 'text-teal-400 hover:text-teal-300' : 'text-teal-500 hover:text-teal-600'}`}
                >
                  {service.id === 'hrm' ? t('freeDemo') : t('explore')}
                  <ChevronRight className="ml-1 w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
          
          {/* Show remaining services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {servicesList.slice(6).map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index + 6) * 0.1 }}
                className={`rounded-xl p-6 border transition-all duration-300 hover:shadow-lg ${darkMode ? 'bg-gray-800/50 border-gray-700 hover:border-teal-400 hover:shadow-teal-400/20' : 'bg-white border-gray-200 hover:border-teal-500 hover:shadow-teal-500/20'}`}
              >
                <div className="w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-teal-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{service.desc}</p>
                <button 
                  onClick={() => scrollToSection(service.section)}
                  className={`font-medium flex items-center ${darkMode ? 'text-teal-400 hover:text-teal-300' : 'text-teal-500 hover:text-teal-600'}`}
                >
                  {service.id === 'hrm' ? t('freeDemo') : t('explore')}
                  <ChevronRight className="ml-1 w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Tools Section */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Interactive Tools</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* ROI Calculator */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`rounded-xl p-8 border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}
            >
              <div className="flex items-center mb-6">
                <Calculator className="w-8 h-8 text-teal-500 mr-3" />
                <h3 className="text-2xl font-bold">{t('roiCalculator')}</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block mb-2">Employees: {roiData.employees}</label>
                  <input
                    type="range"
                    min="10"
                    max="10000"
                    step="10"
                    value={roiData.employees}
                    onChange={(e) => setRoiData({...roiData, employees: parseInt(e.target.value)})}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block mb-2">Current Risk Level: {roiData.currentRiskLevel}%</label>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    step="5"
                    value={roiData.currentRiskLevel}
                    onChange={(e) => setRoiData({...roiData, currentRiskLevel: parseInt(e.target.value)})}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block mb-2">Proposed Risk Level: {roiData.proposedRiskLevel}%</label>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    step="5"
                    value={roiData.proposedRiskLevel}
                    onChange={(e) => setRoiData({...roiData, proposedRiskLevel: parseInt(e.target.value)})}
                    className="w-full"
                  />
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-teal-500/10 rounded-lg">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-teal-400">{roiResults.potentialSavings}</div>
                    <div className="text-sm">Potential Savings</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-400">{roiResults.investment}</div>
                    <div className="text-sm">Annual Investment</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">{roiResults.roi}</div>
                    <div className="text-sm">ROI</div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Maturity Assessment */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`rounded-xl p-8 border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}
            >
              <div className="flex items-center mb-6">
                <BarChart3 className="w-8 h-8 text-teal-500 mr-3" />
                <h3 className="text-2xl font-bold">{t('assessmentTool')}</h3>
              </div>
              
              <div className="space-y-4">
                {assessmentQuestions.map((q, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-700/20 rounded-lg">
                    <span className="flex-1">{q.question}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={assessmentScore >= assessmentQuestions.slice(0, index + 1).reduce((sum, q) => sum + q.weight, 0)}
                        onChange={(e) => handleAssessmentChange(index, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                    </label>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <div className="text-4xl font-bold text-teal-400 mb-2">{assessmentScore}/100</div>
                <div className="text-sm">
                  {assessmentScore < 40 ? 'Basic' : assessmentScore < 70 ? 'Intermediate' : 'Advanced'} Maturity Level
                </div>
                <div className="mt-4 w-full bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-teal-500 h-2.5 rounded-full" 
                    style={{ width: `${assessmentScore}%` }}
                  ></div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`rounded-xl p-8 border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}
          >
            <div className="flex items-center mb-8">
              <Clock className="w-8 h-8 text-teal-500 mr-3" />
              <h3 className="text-2xl font-bold">{t('timeline')}</h3>
            </div>
            
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-teal-500/30"></div>
              <div className="space-y-8">
                {timelineEvents.map((event, index) => (
                  <div key={index} className="relative pl-12">
                    <div className="absolute left-0 top-0 w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                    <div className="font-semibold">{event.time}</div>
                    <div className="font-bold text-lg mb-1">{event.title}</div>
                    <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{event.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cases & Metrics */}
      <section id="cases" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">{t('cases')}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`rounded-xl p-6 border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}
                >
                  <p className="text-xl italic mb-4">"{testimonial.quote}"</p>
                  <p className="text-teal-500 font-semibold">– {testimonial.author}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              {[
                { label: "MTTD", value: "15 min", change: "-65%" },
                { label: "MTTR", value: "45 min", change: "-40%" },
                { label: "Human Risk", value: "23%", change: "-75%" },
                { label: "NIST Compliance", value: "94%", change: "+35%" }
              ].map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className={`rounded-xl p-6 border text-center ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}
                >
                  <div className="text-3xl font-bold text-teal-500 mb-2">{metric.value}</div>
                  <div className={darkMode ? 'text-gray-300 mb-2' : 'text-gray-600 mb-2'}>{metric.label}</div>
                  <div className="text-green-500 font-semibold">{metric.change}</div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="text-center mt-12">
            <button className={`border-2 px-8 py-4 rounded-lg font-semibold transition-colors ${darkMode ? 'border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-gray-900' : 'border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white'}`}>
              {t('viewCases')}
            </button>
          </div>
        </div>
      </section>

      {/* Why Tandem Lens */}
      <section id="why" className={`py-20 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-800/30' : 'bg-gray-100/50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { title: "AI-powered threat detection", desc: "Advanced algorithms to identify threats before they occur." },
              { title: "360° Red/Blue Team coverage", desc: "Comprehensive protection from all angles of cyberspace." },
              { title: "Measurable human risk approach", desc: "Concrete metrics to assess and reduce human risk." }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-teal-500 rounded-full animate-pulse"></div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center mx-auto transition-colors">
              <Download className="mr-2 w-5 h-5" />
              {t('downloadBrochure')}
            </button>
          </div>
        </div>
      </section>

      {/* HRM Product Focus */}
      <section id="hrm" className={`py-20 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-teal-900/20' : 'bg-teal-100/30'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">The platform that measures and reduces human risk with AI.</h2>
              <p className={`mb-8 text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Our HRM solution uses artificial intelligence to identify risky behaviors, 
                measure training effectiveness, and provide actionable recommendations in real-time.
              </p>
              <button className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold flex items-center transition-colors border border-gray-300">
                {t('freeDemo')}
                <Play className="ml-2 w-5 h-5" />
              </button>
            </div>
            <div className={`rounded-xl p-8 border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`rounded-lg h-64 flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-teal-500 rounded-full mx-auto mb-4 animate-pulse"></div>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>HRM Dashboard Mockup</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* vCISO as a Service */}
      <section id="vciso" className={`py-20 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-800/30' : 'bg-gray-100/50'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">{t('vCISO')}</h2>
          <p className={`text-xl text-center mb-12 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Strategic security leadership, on-demand.</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                Our vCISO service provides strategic cybersecurity leadership without the need 
                to hire a full-time CISO. We offer governance, risk management, compliance, 
                incident response plans, and executive metrics tailored to your organization.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className={`px-3 py-1 rounded-full ${darkMode ? 'bg-teal-500/20 text-teal-400' : 'bg-teal-100 text-teal-700'}`}>–35% MTTD in 6 months</span>
                <span className={`px-3 py-1 rounded-full ${darkMode ? 'bg-teal-500/20 text-teal-400' : 'bg-teal-100 text-teal-700'}`}>+3 NIST maturity levels</span>
                <span className={`px-3 py-1 rounded-full ${darkMode ? 'bg-teal-500/20 text-teal-400' : 'bg-teal-100 text-teal-700'}`}>Effective governance</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {vCISOPlans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`rounded-xl p-6 border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}
                >
                  <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
                  <div className="text-2xl font-bold mb-4">{plan.price}</div>
                  <ul className="space-y-2 text-sm">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className={darkMode ? 'text-gray-300' : 'text-gray-600'}>• {feature}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-teal-500 hover:bg-teal-600 px-8 py-4 rounded-lg font-semibold text-white transition-colors">
              Talk to a vCISO
            </button>
            <button className={`border-2 px-8 py-4 rounded-lg font-semibold transition-colors ${darkMode ? 'border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-gray-900' : 'border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white'}`}>
              <Download className="mr-2 w-5 h-5 inline" />
              Download vCISO One-Pager
            </button>
          </div>
        </div>
      </section>

      {/* CSIRT Section */}
      <section id="csirt" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">Incident Response</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            {[
              { icon: Shield, title: t('prepare'), desc: "Preparation and response planning" },
              { icon: Eye, title: t('analyze'), desc: "Digital forensic analysis" },
              { icon: Zap, title: t('eradicate'), desc: "Eradication and containment" },
              { icon: GraduationCap, title: t('report'), desc: "Reporting and lessons learned" }
            ].map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`rounded-xl p-6 border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}
              >
                <div className="w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <phase.icon className="w-6 h-6 text-teal-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{phase.title}</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{phase.desc}</p>
              </motion.div>
            ))}
          </div>
          <button className="bg-red-500 hover:bg-red-600 px-8 py-4 rounded-lg font-semibold flex items-center justify-center mx-auto transition-colors text-white">
            {t('contactCSIRT')}
            <Phone className="ml-2 w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Academy & Events */}
      <section id="academy" className={`py-20 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-800/30' : 'bg-gray-100/50'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">{t('academy')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {courses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`rounded-xl p-6 border transition-colors ${darkMode ? 'bg-gray-800/50 border-gray-700 hover:border-teal-400' : 'bg-white border-gray-200 hover:border-teal-500'}`}
              >
                <GraduationCap className="w-8 h-8 text-teal-500 mb-4" />
                <h3 className="font-semibold">{course}</h3>
              </motion.div>
            ))}
          </div>
          
          <div className="bg-gradient-to-r from-blue-500 to-teal-400 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4 text-white">Cyber Shield Summit – Hattiesburg, MS</h3>
            <p className="text-blue-100 mb-6">Join cybersecurity leaders to share knowledge and strategies.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors">
                {t('calendar2025')}
              </button>
              <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors">
                {t('participate')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Blog & Resources */}
      <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">{t('blog')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`rounded-xl p-6 border transition-colors ${darkMode ? 'bg-gray-800/50 border-gray-700 hover:border-teal-400' : 'bg-white border-gray-200 hover:border-teal-500'}`}
              >
                <div className={`rounded-lg h-32 mb-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                <h3 className="text-xl font-semibold mb-4">{post}</h3>
                <button className={`font-medium flex items-center ${darkMode ? 'text-teal-400 hover:text-teal-300' : 'text-teal-500 hover:text-teal-600'}`}>
                  {t('downloadReport')}
                  <Download className="ml-1 w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-section" className={`py-20 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-800/30' : 'bg-gray-100/50'}`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              {t('contact')}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
            >
              Ready to transform your cybersecurity strategy?
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-teal-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Offices</h4>
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{t('footerAddress')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <MailIcon className="w-6 h-6 text-teal-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Email</h4>
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>info@tandemlens.net</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-teal-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Phone</h4>
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>+1 (601) </p>
                  </div>
                </div>
                
                <div className="pt-8">
                  <h4 className="font-semibold text-lg mb-4">Follow Us</h4>
                  <div className="flex space-x-4">
                    <Linkedin className={`w-6 h-6 ${darkMode ? 'text-gray-400 hover:text-teal-400' : 'text-gray-600 hover:text-teal-500'} cursor-pointer`} />
                    <Youtube className={`w-6 h-6 ${darkMode ? 'text-gray-400 hover:text-teal-400' : 'text-gray-600 hover:text-teal-500'} cursor-pointer`} />
                    <Github className={`w-6 h-6 ${darkMode ? 'text-gray-400 hover:text-teal-400' : 'text-gray-600 hover:text-teal-500'} cursor-pointer`} />
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`rounded-xl p-8 border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}
            >
              <h3 className="text-2xl font-bold mb-6">{t('contactForm')}</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">{t('nameLabel')}</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t('emailLabel')}</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t('companyLabel')}</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t('messageLabel')}</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  {t('submitButton')}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'} py-12 px-4 sm:px-6 lg:px-8`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                {/* LOGO EN FOOTER TAMBIÉN ES CLICKABLE */}
                <button 
                  onClick={handleLogoClick}
                  className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
                  aria-label="Go to homepage"
                >
                  <div className="w-8 h-8 bg-teal-400 rounded-full"></div>
                  <span className="text-xl font-bold">Tandem Lens</span>
                </button>
              </div>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Intelligent Defense. Measurable Results.</p>
              <div className="flex space-x-4">
                <Linkedin className={`w-5 h-5 ${darkMode ? 'text-gray-400 hover:text-teal-400' : 'text-gray-600 hover:text-teal-500'} cursor-pointer`} />
                <Youtube className={`w-5 h-5 ${darkMode ? 'text-gray-400 hover:text-teal-400' : 'text-gray-600 hover:text-teal-500'} cursor-pointer`} />
                <Github className={`w-5 h-5 ${darkMode ? 'text-gray-400 hover:text-teal-400' : 'text-gray-600 hover:text-teal-500'} cursor-pointer`} />
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                {servicesList.slice(0, 5).map((service) => (
                  <li key={service.id}>
                    <button 
                      onClick={() => scrollToSection(service.section)}
                      className={`hover:text-teal-500 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                    >
                      {service.title}
                    </button>
                  </li>
                ))}
                <li><button onClick={() => scrollToSection('services')} className={`hover:text-teal-500 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>View all services</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('about')} className={`hover:text-teal-500 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t('about')}</button></li>
                <li><button onClick={() => scrollToSection('why')} className={`hover:text-teal-500 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t('whyUs')}</button></li>
                <li><button onClick={() => scrollToSection('partners')} className={`hover:text-teal-500 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t('partners')}</button></li>
                <li><button onClick={() => scrollToSection('contact-section')} className={`hover:text-teal-500 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t('contact')}</button></li>
                <li><a href="#" className={`hover:text-teal-500 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t('privacy')}</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <MapPin className={`w-4 h-4 mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{t('footerAddress')}</span>
                </div>
                <div className="flex items-center">
                  <MailIcon className={`w-4 h-4 mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>info@tandemlens.net</span>
                </div>
                <div className="flex items-center">
                  <Phone className={`w-4 h-4 mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>+1 (601) </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`border-t pt-8 flex flex-col md:flex-row justify-between items-center ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex space-x-6 mb-4 md:mb-0">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>ISO 27001</span>
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>NIST</span>
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>OWASP</span>
            </div>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>© 2025 Tandem Lens. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
