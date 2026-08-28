import { NavItem, ServiceItem, PortfolioProject, TechItem, AdvantageItem, ContactPerson, CryptoFeature } from '../types';

export const NAVIGATION_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', href: '#home', icon: 'Home' },
  { id: 'about', label: 'About', href: '#about', icon: 'ShieldCheck' },
  { id: 'services', label: 'Services', href: '#services', icon: 'Layers' },
  { id: 'growth-engine', label: 'Growth Engine', href: '#growth-engine', icon: 'TrendingUp' },
  { id: 'portfolio', label: 'Portfolio', href: '#portfolio', icon: 'Briefcase' },
  { id: 'technology', label: 'Technology', href: '#technology', icon: 'Cpu' },
  { id: 'global-advantage', label: 'Global Advantage', href: '#global-advantage', icon: 'Globe2' },
  { id: 'crypto-market', label: 'Crypto & Markets', href: '#crypto-market', icon: 'BarChart2' },
  { id: 'contact', label: 'Contact', href: '#contact', icon: 'Send' },
];

export const CONTACT_PERSONS: ContactPerson[] = [
  {
    name: 'Muhammad Shazil Attari',
    role: 'Managing Director & Global Operations',
    phone: '03234196252',
    rawPhone: '+923234196252',
    whatsappUrl: 'https://wa.me/923234196252?text=Hello%20Muhammad%20Shazil%20Attari,%20I%20am%20contacting%20you%20via%20ZeeS%20Group%20Global%20website%20regarding%20a%20project.',
    email: 'shazil@zeesgroupglobal.com'
  },
  {
    name: 'Muhammad Saad Attari',
    role: 'Head of Technology & Business Solutions',
    phone: '03211841726',
    rawPhone: '+923211841726',
    whatsappUrl: 'https://wa.me/923211841726?text=Hello%20Muhammad%20Saad%20Attari,%20I%20am%20contacting%20you%20via%20ZeeS%20Group%20Global%20website%20regarding%20a%20project.',
    email: 'saad@zeesgroupglobal.com'
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'web-development',
    number: '01',
    title: 'Web Development',
    shortDesc: 'High-performance corporate portals, modern landing pages, and bespoke web applications with ultra-fluid responsive experiences.',
    fullDesc: 'We architect and build industry-leading digital platforms engineered for velocity, security, and scalability. From enterprise business portals to interactive web applications, our engineering leverages cutting-edge frameworks to maximize user engagement.',
    iconName: 'Code',
    badge: 'Core Capability',
    features: [
      'Business & Corporate Websites',
      'High-Conversion Landing Pages',
      'Custom Web Applications (SPA & PWA)',
      'Ultra-Responsive Fluid Frameworks',
      'Modern UI/UX Micro-Interactions',
      'Lightning Page Speed Optimization'
    ],
    deliverables: ['Custom Source Code', 'Production Deployment', 'Cross-Browser QA', 'SEO Foundation']
  },
  {
    id: 'ecommerce-development',
    number: '02',
    title: 'E-Commerce Development',
    shortDesc: 'Futuristic online storefronts, catalog engines, streamlined checkout flows, and automated inventory systems.',
    fullDesc: 'Transforming retail operations into frictionless global digital storefronts. We build secure, high-conversion e-commerce environments equipped with dynamic catalogs, resilient payment gateways, and real-time administrative dashboards.',
    iconName: 'ShoppingCart',
    badge: 'High Conversion',
    features: [
      'Bespoke Online Stores & Marketplaces',
      'High-Density Product Catalogues',
      'Frictionless Checkout & Cart Flows',
      'Multi-Currency & Regional Gateways',
      'Admin-Ready Order Management Architecture',
      'Automated Inventory & Stock Tracking'
    ],
    deliverables: ['Storefront Architecture', 'Payment Integration', 'Admin Control Panel', 'Catalog Migration']
  },
  {
    id: 'digital-marketing',
    number: '03',
    title: 'Digital Marketing & SEO',
    shortDesc: 'Data-driven search dominance, hyper-targeted social growth, brand amplification, and strategic campaign execution.',
    fullDesc: 'Our digital growth engine combines algorithmic search engine optimization, content strategy, and multi-channel marketing campaigns to elevate your digital presence and drive sustainable customer acquisition.',
    iconName: 'TrendingUp',
    badge: 'Growth Engine',
    features: [
      'Algorithmic Search Engine Optimization (SEO)',
      'Social Media Marketing (SMM)',
      'Data-Backed Campaign Strategy & PPC',
      'Digital Brand Positioning & PR',
      'Conversion Rate Optimization (CRO)',
      'Targeted Content & Funnel Automation'
    ],
    deliverables: ['SEO Keyword Matrix', 'Social Media Playbooks', 'Campaign Analytics', 'Growth Audits']
  },
  {
    id: 'hosting-solutions',
    number: '04',
    title: 'Hosting Solutions & DevOps',
    shortDesc: 'Enterprise cloud hosting, automated CI/CD deployment, SSL hardening, and 99.99% uptime infrastructure.',
    fullDesc: 'Robust cloud infrastructure engineered for zero downtime and peak traffic handling. We configure hardened server environments, automated backup pipelines, and edge CDN distribution for global access.',
    iconName: 'Server',
    badge: 'Enterprise Grade',
    features: [
      'High-Speed Managed Cloud Hosting',
      'Automated CI/CD Deployment Pipelines',
      'SSL Encryption & Security Hardening',
      'Server Performance Tuning & Caching',
      '24/7 Uptime Monitoring & Backups',
      'Infrastructure Scale-Up Support'
    ],
    deliverables: ['Cloud Provisioning', 'SSL Certificates', 'Disaster Recovery Setup', 'Uptime SLA']
  },
  {
    id: 'domain-services',
    number: '05',
    title: 'Domain Services & DNS',
    shortDesc: 'Strategic domain acquisition, secure DNS propagation, enterprise email routing, and brand asset protection.',
    fullDesc: 'Securing the fundamental digital real estate for your enterprise. We manage corporate domain registrations, resilient cloud DNS setups, DKIM/SPF email security configurations, and brand asset protection.',
    iconName: 'Globe',
    badge: 'Brand Identity',
    features: [
      'Global TLD Registration & Domain Advisory',
      'Ultra-Fast Anycast DNS Configuration',
      'Enterprise Email DNS (SPF, DKIM, DMARC)',
      'Domain Migration & Renewal Management',
      'Brand Protection & WHOIS Privacy',
      'Subdomain & Cloud CDN Routing'
    ],
    deliverables: ['Domain Setup', 'Secure DNS Routing', 'Email Authentication', 'Renewal Guard']
  },
  {
    id: 'project-development-selling',
    number: '06',
    title: 'Project Development & Ready Solutions',
    shortDesc: 'Turnkey digital platforms, proprietary SaaS modules, ready-to-deploy software packages, and custom delivery.',
    fullDesc: 'Accelerate time-to-market with our pre-built, production-tested digital solutions and tailored proprietary systems. We engineer, customize, and deliver ready-to-scale software packages tailored to your commercial requirements.',
    iconName: 'Package',
    badge: 'Ready-to-Deploy',
    features: [
      'Custom Commercial Digital Projects',
      'Ready-to-Deploy Turnkey Web Systems',
      'Client-Specific Bespoke Architectures',
      'Full Source Code & License Handover',
      'Comprehensive Technical Documentation',
      'Dedicated Post-Delivery Maintenance'
    ],
    deliverables: ['Turnkey Source Code', 'Architecture Docs', 'Licensing Rights', 'Onboarding Support']
  }
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'nexus-quantum-trading',
    title: 'Nexus Capital Digital Terminal',
    category: 'BUSINESS',
    tagline: 'High-frequency institutional asset management terminal and market intelligence suite.',
    description: 'Enterprise wealth dashboard featuring multi-exchange data feeds, predictive algorithmic risk models, and asset allocation interfaces.',
    longDescription: 'Engineered as an institutional-grade financial portal, Nexus Capital provides real-time portfolio rebalancing, dark-pool liquidity visualization, and cryptographic asset surveillance with sub-50ms latency.',
    image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&q=80',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'WebSockets', 'Recharts', 'Node.js'],
    features: [
      'Sub-second tick data visualizer with interactive charts',
      'Multi-asset wealth allocation matrices',
      'Automated risk hedging triggers & notifications',
      'Encrypted client authorization vaults'
    ],
    metrics: [
      { label: 'Latency', value: '< 45ms' },
      { label: 'Uptime', value: '99.99%' },
      { label: 'Security', value: 'Bank-Grade' }
    ],
    isDemo: true,
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    id: 'aether-luxury-storefront',
    title: 'Aetheria Cyber-Luxury Commerce',
    category: 'E-COMMERCE',
    tagline: 'Next-gen interactive e-commerce platform with 3D product previews and instant checkout.',
    description: 'Bespoke global luxury storefront crafted with dark cyber-metallic aesthetics, multi-currency checkout, and real-time inventory synchronization.',
    longDescription: 'A flagship e-commerce ecosystem built for high-ticket digital and physical luxury items. Features seamless Stripe/crypto checkout rails, dynamic inventory reserves, and interactive catalog filters.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    techStack: ['Next.js', 'Tailwind CSS', 'Stripe API', 'PostgreSQL', 'Framer Motion'],
    features: [
      'Dynamic multi-currency cart with automated tax calculation',
      'Micro-animated product showcase cards with zoom detail',
      'Instant search with fuzzy algorithmic matching',
      'Administrative order and customer relationship suite'
    ],
    metrics: [
      { label: 'Conversion Lift', value: '+38%' },
      { label: 'Page Speed', value: '99/100' },
      { label: 'Avg Load Time', value: '0.6s' }
    ],
    isDemo: true,
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    id: 'cyber-guard-enterprise',
    title: 'CyberVanguard Security Network',
    category: 'WEB',
    tagline: 'Global threat intelligence portal and corporate infrastructure shield.',
    description: 'Corporate cybersecurity website with interactive vulnerability diagnostics, live threat telemetry visualization, and client portals.',
    longDescription: 'Developed for an international cyber-defense consortium, this platform showcases live threat vectors, SOC service packages, compliance audits, and an interactive quote configurator.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'D3.js', 'Lucide Icons'],
    features: [
      'Interactive global node threat visualizer',
      'Automated security compliance checklist engine',
      'Enterprise SLA pricing & module calculator',
      'Zero-trust authentication workflow demonstration'
    ],
    metrics: [
      { label: 'Client Retention', value: '97%' },
      { label: 'Global Nodes', value: '45+' },
      { label: 'Response Time', value: '< 15min' }
    ],
    isDemo: true,
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    id: 'synapse-ai-automation',
    title: 'Synapse Core AI Workflow Engine',
    category: 'AI',
    tagline: 'Autonomous AI multi-agent orchestration and workflow automation pipeline.',
    description: 'Intelligent business operations platform connecting LLM agents, automated document extraction, and CRM synchronization.',
    longDescription: 'Synapse Core harnesses multi-modal AI models to automate recurring enterprise pipelines, from parsing invoices to generating personalized client proposals with custom logic validation.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    techStack: ['TypeScript', 'OpenAI API', 'Node.js', 'Tailwind CSS', 'Redis'],
    features: [
      'Visual drag-and-drop agent workflow builder',
      'Real-time token and compute cost monitoring',
      'Multi-modal PDF and document vector search',
      'Automated webhook triggers and external API dispatch'
    ],
    metrics: [
      { label: 'Hours Saved', value: '400+/mo' },
      { label: 'Accuracy', value: '99.4%' },
      { label: 'Throughput', value: '10k tasks/day' }
    ],
    isDemo: true,
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    id: 'omni-bot-automation',
    title: 'OmniFlow Multi-Channel CRM Bot',
    category: 'AUTOMATION',
    tagline: 'High-speed WhatsApp, Telegram, and Email automation infrastructure for customer conversion.',
    description: 'Automated sales and client intake bot ecosystem integrating directly with WhatsApp Business Cloud API and lead management pipelines.',
    longDescription: 'Empowers high-growth digital businesses to respond instantly to inquiries 24/7 across WhatsApp and web chat, qualify leads automatically, and book meetings directly into calendar schedules.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    techStack: ['Node.js', 'Express', 'WhatsApp Cloud API', 'Webhooks', 'React Dashboard'],
    features: [
      'Instant WhatsApp & Webhook auto-responder with context memory',
      'Lead qualification flow with dynamic question branching',
      'Live team agent takeover with collision detection',
      'Comprehensive conversion rate and response analytics'
    ],
    metrics: [
      { label: 'Response Speed', value: '< 2s' },
      { label: 'Lead Capture', value: '+65%' },
      { label: 'Availability', value: '24/7' }
    ],
    isDemo: true,
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    id: 'helios-cloud-infrastructure',
    title: 'Helios Edge Cloud Orchestrator',
    category: 'OTHER',
    tagline: 'Multi-region DNS, server provisioning, and automated disaster recovery dashboard.',
    description: 'Centralized server cluster manager allowing rapid deployment of web apps, SSL certificate renewal, and load balancer orchestration.',
    longDescription: 'Helios simplifies DevOps for agency teams by orchestrating cloud VPS clusters, automated Git-push deployments, and zero-configuration SSL provisioning across distributed nodes.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    techStack: ['Docker', 'Node.js', 'NGINX', 'TypeScript', 'Tailwind CSS'],
    features: [
      'One-click Git repository deployment to edge servers',
      'Automated Let’s Encrypt wildcard SSL rotation',
      'Real-time CPU, RAM, and bandwidth telemetry meters',
      'Automated daily database snapshotting and S3 archival'
    ],
    metrics: [
      { label: 'Deploy Time', value: '< 90s' },
      { label: 'Resource Saver', value: '-30% cost' },
      { label: 'Uptime Score', value: '99.98%' }
    ],
    isDemo: true,
    liveUrl: '#',
    githubUrl: '#'
  }
];

export const TECH_STACK: TechItem[] = [
  { name: 'React 19', category: 'Frontend', icon: 'Atom', proficiency: 98, description: 'Declarative component architecture for responsive client interfaces.', featured: true },
  { name: 'Next.js', category: 'Frontend', icon: 'Layers', proficiency: 95, description: 'Production-ready server-rendered and static web platforms.', featured: true },
  { name: 'TypeScript', category: 'Frontend', icon: 'FileCode', proficiency: 96, description: 'Type-safe scalable programming for zero runtime defects.', featured: true },
  { name: 'Tailwind CSS', category: 'Frontend', icon: 'Palette', proficiency: 99, description: 'Utility-first styling for bespoke cyber-metallic designs.', featured: true },
  { name: 'Node.js & Express', category: 'Backend & Cloud', icon: 'Server', proficiency: 94, description: 'High-concurrency microservices and resilient REST APIs.', featured: true },
  { name: 'Firebase & Firestore', category: 'Backend & Cloud', icon: 'Flame', proficiency: 92, description: 'Real-time cloud database, authentication, and serverless hosting.', featured: true },
  { name: 'REST & GraphQL APIs', category: 'Backend & Cloud', icon: 'Network', proficiency: 95, description: 'Seamless third-party integration pipelines and data endpoints.' },
  { name: 'OpenAI & Gemini APIs', category: 'AI & Data', icon: 'Sparkles', proficiency: 93, description: 'Deep LLM integration, embeddings, and autonomous agent systems.', featured: true },
  { name: 'PostgreSQL & SQL', category: 'Backend & Cloud', icon: 'Database', proficiency: 91, description: 'Relational databases structured for data integrity and high throughput.' },
  { name: 'Docker & Containers', category: 'Infrastructure & DevOps', icon: 'Box', proficiency: 88, description: 'Containerized deployment workflows for consistent production environments.' },
  { name: 'GitHub & CI/CD', category: 'Infrastructure & DevOps', icon: 'GitBranch', proficiency: 96, description: 'Automated testing, continuous integration, and version control.', featured: true },
  { name: 'Cloud Infrastructure', category: 'Infrastructure & DevOps', icon: 'Cloud', proficiency: 92, description: 'Edge CDN routing, load balancers, and distributed server hosting.', featured: true }
];

export const GLOBAL_ADVANTAGES: AdvantageItem[] = [
  {
    number: '01',
    title: 'Global Vision',
    highlight: 'Borderless Scale',
    description: 'We engineer digital solutions designed from day one to serve international markets, multi-currency flows, and multi-region infrastructure.',
    icon: 'Globe'
  },
  {
    number: '02',
    title: 'Cutting-Edge Innovation',
    highlight: 'Futuristic Architecture',
    description: 'Staying ahead of the technology curve with modern frameworks, high-speed architectures, and AI-assisted automation pipelines.',
    icon: 'Zap'
  },
  {
    number: '03',
    title: 'Uncompromising Quality',
    highlight: 'Zero-Defect Standard',
    description: 'Every line of code undergoes rigorous type checks, security hardening, performance benchmarks, and cross-device testing.',
    icon: 'ShieldCheck'
  },
  {
    number: '04',
    title: 'Architectural Scalability',
    highlight: 'Built for High Concurrency',
    description: 'Modular, decoupled codebases and cloud-native backends that effortlessly grow alongside your expanding customer base.',
    icon: 'TrendingUp'
  },
  {
    number: '05',
    title: 'Cost Efficiency',
    highlight: 'High ROI Delivery',
    description: 'Clear transparent scoping, modern tooling that cuts deployment overhead, and practical digital solutions that drive direct value.',
    icon: 'DollarSign'
  },
  {
    number: '06',
    title: 'Long-Term Support',
    highlight: 'Dedicated Partnership',
    description: 'We do not just ship and leave; we provide continuous maintenance, performance audits, domain/hosting support, and strategic evolution.',
    icon: 'LifeBuoy'
  }
];

export const CRYPTO_FEATURES: CryptoFeature[] = [
  {
    title: 'Spot Trading Analysis',
    tag: 'Execution & Signals',
    desc: 'Deep liquidity tracking, volume profile insights, and disciplined entry/exit zones across top digital assets.',
    icon: 'CircleDot'
  },
  {
    title: 'Futures & Derivatives',
    tag: 'Risk & Leverage',
    desc: 'Structured leverage management, funding rate telemetry, and dynamic hedging strategies designed for volatile market regimes.',
    icon: 'TrendingUp'
  },
  {
    title: 'Algorithmic Scalping',
    tag: 'High Velocity',
    desc: 'Micro-structure order flow monitoring, spread capture metrics, and rapid-fire momentum confirmation indicators.',
    icon: 'Zap'
  },
  {
    title: 'Macro Market Intelligence',
    tag: 'Multi-Timeframe',
    desc: 'Comprehensive multi-timeframe analysis incorporating on-chain metrics, liquidity heatmaps, and macroeconomic indicators.',
    icon: 'Activity'
  }
];
