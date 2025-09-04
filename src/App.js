import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { FaGithub, FaEnvelope, FaPhone, FaMapMarkerAlt, FaPython, FaReact, FaBrain, FaCode, FaUsers } from 'react-icons/fa';

// Custom hook for smooth scrolling
const useSmoothScroll = (ref, offset = 0) => {
  const handleClick = (e) => {
    e.preventDefault();
    if (ref.current) {
      const elementPosition = ref.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
  return handleClick;
};


// Skill Badge Component
const SkillBadge = ({ skill, icon: Icon, level = "Expert" }) => (
  <motion.div
    whileHover={{ scale: 1.05, rotate: 2 }}
    whileTap={{ scale: 0.95 }}
    className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-primary-500"
  >
    <div className="flex items-center space-x-3">
      <Icon className="text-2xl text-primary-600" />
      <div>
        <h4 className="font-semibold text-gray-800">{skill}</h4>
        <p className="text-sm text-gray-600">{level}</p>
      </div>
    </div>
  </motion.div>
);

// Interactive Project Card
const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { delay: index * 0.3, duration: 0.6 }
      });
    }
  }, [isInView, controls, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl overflow-hidden cursor-pointer border border-gray-100 transition-all duration-300"
    >
      <div className="relative h-56 overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700"
          animate={{ scale: isHovered ? 1.05 : 1 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-primary-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <motion.div
          className="absolute top-4 right-4 flex space-x-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
        >
          {project.links.map((link, i) => (
            <motion.a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="bg-white/95 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-colors shadow-lg"
            >
              <link.icon className="w-5 h-5 text-primary-600" />
            </motion.a>
          ))}
        </motion.div>
      </div>
      
      <div className="p-8">
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-gray-800 group-hover:text-primary-600 transition-colors mb-2">
            {project.title}
          </h3>
          <div className="flex items-center space-x-2 text-sm text-primary-600 font-medium">
            <FaUsers className="w-4 h-4" />
            <span>{project.impact}</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-6 leading-relaxed text-base">{project.description}</p>
        
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * i }}
                className="text-xs bg-primary-50 text-primary-700 px-3 py-1 rounded-full border border-primary-200"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        <motion.button
          onClick={() => setShowFeatures(!showFeatures)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mb-4 text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center justify-center space-x-2 py-2"
        >
          <span>{showFeatures ? 'Hide' : 'Show'} Key Features</span>
          <motion.span
            animate={{ rotate: showFeatures ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            ↓
          </motion.span>
        </motion.button>

        <motion.div
          initial={false}
          animate={{ height: showFeatures ? 'auto' : 0, opacity: showFeatures ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="space-y-2 mb-6">
            {project.features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: showFeatures ? 1 : 0, x: showFeatures ? 0 : -20 }}
                transition={{ delay: 0.1 * i }}
                className="flex items-center space-x-2 text-sm text-gray-600"
              >
                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                <span>{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="block w-full bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors text-center"
        >
          View on GitHub
        </motion.a>
      </div>
    </motion.div>
  );
};

// Navigation Component
const Navbar = ({ sections, currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm"
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold text-gray-800"
        >
          <span className="hover:text-primary-600 transition-colors duration-300 cursor-pointer">
            Om Singh
          </span>
        </motion.div>
        
        <div className="hidden md:flex space-x-8">
          {sections.map(section => (
            <motion.a
              key={section.id}
              href={`#${section.id}`}
              onClick={() => setCurrentPage(section.id)}
              whileHover={{ y: -2 }}
              className={`text-gray-800 hover:text-primary-600 transition-colors duration-300 font-semibold relative group ${
                currentPage === section.id ? 'text-primary-600' : ''
              }`}
            >
              {section.name}
              <motion.span
                className="absolute bottom-0 left-0 w-full h-[2px] bg-primary-600"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: currentPage === section.id ? 1 : 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </div>
        
        <div className="md:hidden">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-800 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={!isMenuOpen ? "M4 6h16M4 12h16m-7 6h7" : "M6 18L18 6M6 6l12 12"}
              />
            </svg>
          </motion.button>
        </div>
      </div>
      
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white/90 backdrop-blur-md"
        >
          {sections.map(section => (
            <motion.a
              key={section.id}
              href={`#${section.id}`}
              onClick={() => {
                setCurrentPage(section.id);
                setIsMenuOpen(false);
              }}
              whileHover={{ x: 10 }}
              className="block px-6 py-3 text-gray-800 hover:text-primary-600 transition-colors duration-300 text-center font-medium"
            >
              {section.name}
            </motion.a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
};

// Hero Section
const HeroSection = ({ scrollToProjects }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} id="home" className="flex items-center justify-center min-h-screen bg-white py-24">
      <div className="text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block mb-8"
          >
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
              <FaBrain className="text-3xl text-primary-600" />
            </div>
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-light text-gray-900 mb-6 tracking-tight">
            <span className="block">Hello, I'm</span>
            <span className="gradient-text font-medium">Om Singh</span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            AI Developer passionate about <span className="text-primary-600 font-medium">creating, training and developing for non-developers</span>
          </motion.p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={scrollToProjects}
            className="bg-primary-600 text-white font-medium py-4 px-8 rounded-full hover:bg-primary-700 transition-colors text-lg"
          >
            View My Projects
          </motion.button>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="border-2 border-primary-600 text-primary-600 font-medium py-4 px-8 rounded-full hover:bg-primary-600 hover:text-white transition-colors text-lg"
          >
            Get In Touch
          </motion.a>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center space-x-12 text-gray-500 text-sm"
        >
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
            <FaMapMarkerAlt className="w-4 h-4" />
            <span>Lucknow, UP</span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
            <FaEnvelope className="w-4 h-4" />
            <span>oms202705@gmail.com</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const skills = [
    { name: "Python", icon: FaPython, level: "Expert" },
    { name: "TensorFlow", icon: FaBrain, level: "Advanced" },
    { name: "PyTorch", icon: FaBrain, level: "Advanced" },
    { name: "React", icon: FaReact, level: "Expert" },
    { name: "AI/ML", icon: FaCode, level: "Expert" },
    { name: "Mentoring", icon: FaUsers, level: "Expert" }
  ];

  return (
    <section ref={ref} id="about" className="py-24 md:py-32 bg-gray-50">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-light text-gray-800 mb-6">About Me</h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-72 h-72 bg-white rounded-full overflow-hidden shadow-lg border-4 border-primary-100">
                <img
                  src={process.env.PUBLIC_URL + "/profile-photo.jpg"}
                  alt="Om Singh"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-gradient-to-br from-primary-100 to-purple-100 flex items-center justify-center" style={{display: 'none'}}>
                  <FaBrain className="text-6xl text-primary-400" />
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="text-gray-600 leading-relaxed text-lg space-y-6">
              <p>
                I'm an AI Developer with a <span className="text-primary-600 font-medium">passion for making technology accessible to everyone</span>. 
                My journey began with great mentors who showed me the power of AI, and now I'm dedicated to building programs that help non-developers 
                harness the potential of artificial intelligence.
              </p>
              <p>
                With expertise in <span className="font-medium text-gray-800">Python, TensorFlow, PyTorch, and React</span>, I create solutions that bridge the gap 
                between complex AI technologies and everyday users. My mission is to democratize AI by making it intuitive and accessible for non-tech people.
              </p>
              <p>
                When I'm not coding, you'll find me mentoring others or exploring new ways to make AI more human-friendly. 
                I believe that technology should empower everyone, not just those with technical backgrounds.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                >
                  <SkillBadge {...skill} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Projects Section
const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const projects = [
    {
      title: "AI-Writer",
      description: "A comprehensive AI-powered content creation platform featuring 60+ specialized AI tools. This platform democratizes content creation by providing non-developers with powerful AI capabilities for blog writing, social media content, marketing copy, and SEO optimization. Built with advanced natural language processing and multi-language support.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      technologies: ["Python", "AI/ML", "NLP", "SEO", "Multi-language"],
      impact: "60+ AI Tools",
      features: [
        "Web research automation",
        "SEO optimization",
        "Multi-language content generation",
        "Social media content creation",
        "Marketing copy generation"
      ],
      demoUrl: "https://github.com/Om-Singh1808/AI-Writer",
      links: [
        { icon: FaGithub, url: "https://github.com/Om-Singh1808/AI-Writer" }
      ]
    },
    {
      title: "Auther",
      description: "A revolutionary social media bridge application that seamlessly connects and manages multiple social platforms from a single interface. Designed specifically for non-technical users, Auther simplifies social media management by providing an intuitive dashboard that handles cross-platform posting, analytics, and engagement tracking.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      technologies: ["TypeScript", "React", "Node.js", "Social APIs", "REST"],
      impact: "Multi-Platform Integration",
      features: [
        "Cross-platform posting",
        "Unified analytics dashboard",
        "Content scheduling",
        "Engagement tracking",
        "User-friendly interface"
      ],
      demoUrl: "https://github.com/Om-Singh1808/Auther",
      links: [
        { icon: FaGithub, url: "https://github.com/Om-Singh1808/Auther" }
      ]
    }
  ];

  return (
    <section ref={ref} id="projects" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-light text-gray-800 mb-6">My Projects</h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Building AI solutions that make technology accessible to non-developers
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com/Om-Singh1808"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-2"
          >
            <FaGithub className="w-5 h-5" />
            <span>View All Projects on GitHub</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    setStatus('Message sent successfully! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section ref={ref} id="contact" className="py-24 md:py-32 bg-gray-50">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-light text-gray-800 mb-6">Let's Connect</h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Have an idea for an AI project? Let's build something amazing together.
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Get In Touch</h3>
                <p className="text-gray-600 mb-8">
                  Have an idea for an AI project? Want to make technology more accessible? 
                  I'd love to hear from you and discuss how we can work together.
                </p>
              </div>
              
              <div className="space-y-6">
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                >
                  <FaEnvelope className="text-primary-600 text-xl" />
                  <div>
                    <p className="font-semibold text-gray-800">Email</p>
                    <p className="text-gray-600">oms202705@gmail.com</p>
                  </div>
                </motion.div>
                
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                >
                  <FaPhone className="text-primary-600 text-xl" />
                  <div>
                    <p className="font-semibold text-gray-800">Phone</p>
                    <p className="text-gray-600">+91 8318112998</p>
                  </div>
                </motion.div>
                
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                >
                  <FaMapMarkerAlt className="text-primary-600 text-xl" />
                  <div>
                    <p className="font-semibold text-gray-800">Location</p>
                    <p className="text-gray-600">Lucknow, UP, India</p>
                  </div>
                </motion.div>
              </div>
              
              <div className="flex space-x-4">
                <motion.a
                  href="https://github.com/Om-Singh1808"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors"
                >
                  <FaGithub className="w-6 h-6" />
                </motion.a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 resize-none"
                    required
                  />
                </div>
                
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary text-lg py-4"
                >
                  Send Message
                </motion.button>
                
                {status && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-green-600 font-medium"
                  >
                    {status}
                  </motion.p>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main App Component
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const sections = useMemo(() => [
    { id: 'home', name: 'Home' },
    { id: 'about', name: 'About' },
    { id: 'projects', name: 'Projects' },
    { id: 'contact', name: 'Contact' }
  ], []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash && sections.some(s => s.id === hash)) {
        setCurrentPage(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [sections]);

  const projectsRef = useRef(null);
  const scrollToProjects = useSmoothScroll(projectsRef, 80);

  // Add a simple test to ensure the app is rendering
  console.log('App component is rendering');

  return (
    <div className="font-sans antialiased text-gray-900 bg-gray-50">
      {/* Add a simple test div to ensure something is visible */}
      <div style={{ padding: '20px', backgroundColor: 'red', color: 'white', textAlign: 'center' }}>
        TEST: If you can see this, React is working!
      </div>
      
      <Navbar sections={sections} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <HeroSection scrollToProjects={scrollToProjects} />
      <AboutSection />
      <div ref={projectsRef}>
        <ProjectsSection />
      </div>
      <ContactSection />
      
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex justify-center space-x-6 mb-4">
              <motion.a
                href="https://github.com/Om-Singh1808"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaGithub className="w-6 h-6" />
              </motion.a>
            </div>
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} Om Singh. All rights reserved.
            </p>
            <p className="text-sm text-gray-500">
              Building AI solutions for everyone, everywhere.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
