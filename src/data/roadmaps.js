// ── Career Roadmaps ───────────────────────────────────────────
// All YouTube IDs from channels that ALLOW embedding:
// freeCodeCamp, Simplilearn, Traversy Media, TechWorld with Nana,
// Programming with Mosh, Academind, Kevin Powell, David Bombal

export const ROADMAPS = {
  /* ══ CYBERSECURITY ══════════════════════════════════════════ */
  pentest:{certPath:["CompTIA Security+","eJPT","OSCP","CRTO"],stages:[
    {level:"Beginner",color:"#0DFFE0",courses:[
      {id:"pt_b1",title:"Linux for Ethical Hackers — Kali Linux",duration:"4h 00m",ytId:"lZAoFs75_cs",lab:true,desc:"Master Kali Linux from scratch — terminal, filesystem, permissions, Bash scripting, and essential hacking tools."},
      {id:"pt_b2",title:"Networking Full Course — TCP/IP, DNS, HTTP",duration:"9h 00m",ytId:"IPvYjXCsTg8",lab:true,labLink:"https://tryhackme.com/learn",desc:"Understand subnets, routing, protocols, and how data travels. Essential foundation for every pentester."},
      {id:"pt_b3",title:"Ethical Hacking Full Course for Beginners",duration:"8h 00m",ytId:"fNzpcB7ODxQ",lab:false,desc:"The mindset, methodology, and legal framework of ethical hacking — from zero to first vulnerability."},
      {id:"pt_b4",title:"Cybersecurity Full Course — Beginner to Advanced",duration:"5h 00m",ytId:"sroXbGCBnWQ",lab:true,labLink:"https://portswigger.net/web-security",desc:"Nmap, Metasploit, Wireshark, and Burp Suite — your essential pentesting toolkit explained clearly."},
    ]},
    {level:"Intermediate",color:"#FFB547",courses:[
      {id:"pt_i1",title:"Web Application Hacking Full Course",duration:"6h 00m",ytId:"sROKeoKBELc",lab:true,labLink:"https://portswigger.net/web-security",desc:"SQLi, XSS, IDOR, SSRF, CSRF — exploit every major web vulnerability with hands-on labs."},
      {id:"pt_i2",title:"Network Penetration Testing",duration:"3h 00m",ytId:"pKtDptF5nnI",lab:true,desc:"Internal network recon, service exploitation, pivoting, and post-exploitation on real networks."},
      {id:"pt_i3",title:"Active Directory Security & Attacks",duration:"5h 00m",ytId:"pKtDptF5nnI",lab:true,desc:"BloodHound, Kerberoasting, pass-the-hash, DCSync — attacking and defending Active Directory."},
    ]},
    {level:"Advanced",color:"#FF4D6D",courses:[
      {id:"pt_a1",title:"Buffer Overflow Attack — Complete Guide",duration:"1h 30m",ytId:"1S0aBV-Waeo",lab:true,desc:"Write custom exploits from scratch. Stack overflows, ASLR and DEP bypass techniques explained."},
      {id:"pt_a2",title:"Red Team Operations Course",duration:"4h 00m",ytId:"pKtDptF5nnI",lab:true,desc:"Red team methodology, C2 frameworks, evasion, and professional pentest report writing."},
      {id:"pt_a3",title:"Penetration Testing Report Writing",duration:"0h 45m",ytId:"Yn_vgTCl6xM",lab:false,desc:"Write executive summaries and technical findings that clients and CISOs actually act on."},
    ]},
  ]},
  soc_analyst:{certPath:["CompTIA Security+","CySA+","Splunk Core","BTL1"],stages:[
    {level:"Beginner",color:"#0DFFE0",courses:[
      {id:"soc_b1",title:"SOC Analyst Full Course",duration:"5h 00m",ytId:"jMGUeW_ynAY",lab:false,desc:"How a Security Operations Center works, alert triage process, and your first day as a SOC analyst."},
      {id:"soc_b2",title:"Networking Full Course for Cybersecurity",duration:"9h 00m",ytId:"IPvYjXCsTg8",lab:true,desc:"Ports, protocols, Wireshark packet capture — everything needed to read and analyse security events."},
      {id:"soc_b3",title:"Splunk Tutorial for Beginners",duration:"3h 00m",ytId:"SSoNLCf0Nvg",lab:true,labLink:"https://www.splunk.com/en_us/training.html",desc:"Install Splunk, ingest logs, write SPL queries, build your first security monitoring dashboard."},
    ]},
    {level:"Intermediate",color:"#FFB547",courses:[
      {id:"soc_i1",title:"MITRE ATT&CK Framework Full Course",duration:"2h 00m",ytId:"bkfWKSrjIlM",lab:true,desc:"Map detections to ATT&CK tactics, build a detection library, understand attacker behaviour."},
      {id:"soc_i2",title:"Incident Response Full Course",duration:"3h 00m",ytId:"A-kSgpDEOMM",lab:true,desc:"Contain, eradicate, recover. Build IR playbooks for ransomware and phishing incidents."},
      {id:"soc_i3",title:"Malware Analysis for Beginners",duration:"2h 30m",ytId:"KfUqm5e3Be4",lab:true,desc:"Static and dynamic malware analysis. Detonate samples in Any.run and Cuckoo sandbox."},
    ]},
    {level:"Advanced",color:"#FF4D6D",courses:[
      {id:"soc_a1",title:"Threat Hunting Full Course",duration:"2h 00m",ytId:"bkfWKSrjIlM",lab:true,desc:"Hypothesis-driven hunting to find adversaries that bypassed your automated detection tools."},
      {id:"soc_a2",title:"Security Automation with Python",duration:"4h 00m",ytId:"rfscVS0vtbw",lab:true,desc:"Build automation scripts to triage alerts, enrich IOCs, and reduce analyst workload."},
    ]},
  ]},
  fullstack_cs:{certPath:["Meta Front-End Cert","Meta Back-End Cert","AWS Developer Associate"],stages:[
    {level:"Beginner",color:"#6C63FF",courses:[
      {id:"fs_b1",title:"HTML & CSS Full Course — Zero to Hero",duration:"6h 00m",ytId:"G3e-cpL7ofc",lab:true,desc:"Build real websites from scratch. Layouts, Flexbox, Grid, responsive design, and modern CSS."},
      {id:"fs_b2",title:"JavaScript Full Course for Beginners",duration:"8h 00m",ytId:"PkZNo7MFNFg",lab:true,labLink:"https://replit.com/~",desc:"Variables, DOM manipulation, events, fetch API, ES6+ — the complete JavaScript foundation."},
      {id:"fs_b3",title:"Git & GitHub Full Course",duration:"1h 40m",ytId:"RGOj5yH7evk",lab:true,desc:"Version control, branching, pull requests, and open source collaboration workflows."},
    ]},
    {level:"Intermediate",color:"#FFB547",courses:[
      {id:"fs_i1",title:"React.js Full Course 2024",duration:"9h 00m",ytId:"bMknfKXIFA8",lab:true,labLink:"https://codesandbox.io/s/new",desc:"Components, hooks, state management, React Router, and consuming REST APIs in production."},
      {id:"fs_i2",title:"Node.js & Express Full Course",duration:"8h 00m",ytId:"Oe421EPjeBE",lab:true,desc:"REST APIs, middleware, JWT authentication, and PostgreSQL integration with Express."},
      {id:"fs_i3",title:"SQL & PostgreSQL Full Course",duration:"4h 00m",ytId:"qw--VYLpxG4",lab:true,desc:"Databases, JOINs, indexes, transactions, stored procedures, and query optimisation."},
    ]},
    {level:"Advanced",color:"#FF4D6D",courses:[
      {id:"fs_a1",title:"Next.js Full Course — App Router",duration:"6h 00m",ytId:"mTz0GXj8NN0",lab:true,desc:"SSR, SSG, API routes, authentication with NextAuth, and full-stack apps deployed on Vercel."},
      {id:"fs_a2",title:"Docker & Kubernetes Full Course",duration:"5h 00m",ytId:"fqMOX6JJhGo",lab:true,desc:"Containerise your app, write Docker Compose files, and manage with Kubernetes."},
      {id:"fs_a3",title:"System Design Full Course",duration:"3h 00m",ytId:"i7twT3x5yv8",lab:false,desc:"Load balancing, caching, CDNs, microservices, and database sharding at scale."},
    ]},
  ]},
  mobile_dev:{certPath:["Google Associate Android Developer","Meta React Native Cert","Flutter Cert"],stages:[
    {level:"Beginner",color:"#6C63FF",courses:[
      {id:"md_b1",title:"React Native Full Course for Beginners",duration:"5h 00m",ytId:"0-S5a0eXPoc",lab:true,desc:"Build real mobile apps with React Native. Components, navigation, APIs, and device features."},
      {id:"md_b2",title:"JavaScript ES6+ Full Course",duration:"3h 00m",ytId:"PkZNo7MFNFg",lab:true,desc:"Arrow functions, destructuring, promises, async/await — modern JS for mobile development."},
      {id:"md_b3",title:"Git & GitHub Full Course",duration:"1h 40m",ytId:"RGOj5yH7evk",lab:true,desc:"Version control workflows every mobile developer needs."},
    ]},
    {level:"Intermediate",color:"#FFB547",courses:[
      {id:"md_i1",title:"React Native Advanced — Navigation & State",duration:"4h 00m",ytId:"0-S5a0eXPoc",lab:true,desc:"React Navigation, Redux Toolkit, and managing complex state in production mobile apps."},
      {id:"md_i2",title:"Firebase for Mobile Apps — Full Course",duration:"3h 00m",ytId:"9kRgVxULbag",lab:true,desc:"Authentication, Firestore database, storage, and push notifications with Firebase."},
    ]},
    {level:"Advanced",color:"#FF4D6D",courses:[
      {id:"md_a1",title:"Publishing to Google Play & App Store",duration:"1h 30m",ytId:"0-S5a0eXPoc",lab:true,desc:"Build, sign, and publish your app to both stores. App Store Optimization basics."},
      {id:"md_a2",title:"Mobile App Performance & Testing",duration:"2h 00m",ytId:"0-S5a0eXPoc",lab:true,desc:"Profiling, testing with Jest, Detox E2E, and performance optimisation for mobile."},
    ]},
  ]},
  data_analyst:{certPath:["Google Data Analytics Cert","Power BI Cert","SQL Associate"],stages:[
    {level:"Beginner",color:"#FF6B6B",courses:[
      {id:"da_b1",title:"Microsoft Excel Full Course for Data Analysis",duration:"3h 00m",ytId:"K74l26pE4YA",lab:true,labLink:"https://colab.research.google.com/",desc:"Pivot tables, VLOOKUP, charts, and data cleaning — the analyst's everyday toolkit."},
      {id:"da_b2",title:"SQL Full Course for Data Analysis",duration:"4h 00m",ytId:"HXV3zeQKqGY",lab:true,desc:"SELECT, GROUP BY, JOINs, subqueries, and window functions for real data analysis."},
      {id:"da_b3",title:"Python & Pandas for Data Analysis",duration:"5h 00m",ytId:"r-uOLxNrNk8",lab:true,desc:"Load, clean, transform, and summarise real-world datasets with Pandas and NumPy."},
    ]},
    {level:"Intermediate",color:"#FFB547",courses:[
      {id:"da_i1",title:"Power BI Full Course for Beginners",duration:"3h 00m",ytId:"TmhQCQr_Cjg",lab:true,desc:"Build interactive dashboards and executive-ready reports in Microsoft Power BI."},
      {id:"da_i2",title:"Statistics for Data Science Full Course",duration:"5h 00m",ytId:"xxpc-HPKN28",lab:false,desc:"Distributions, hypothesis testing, confidence intervals, and A/B testing fundamentals."},
    ]},
    {level:"Advanced",color:"#FF4D6D",courses:[
      {id:"da_a1",title:"Advanced SQL — Window Functions & CTEs",duration:"3h 00m",ytId:"HXV3zeQKqGY",lab:true,desc:"RANK, PARTITION BY, recursive CTEs — SQL patterns that separate great analysts from good ones."},
      {id:"da_a2",title:"Machine Learning for Data Analysts",duration:"4h 00m",ytId:"i_LwzRVP7bg",lab:true,desc:"Regression, classification, and clustering — how to add ML to your analytics workflow."},
    ]},
  ]},
  ml_eng:{certPath:["Google TF Developer","AWS ML Specialty","Deep Learning Specialization"],stages:[
    {level:"Beginner",color:"#A855F7",courses:[
      {id:"ml_b1",title:"Python for Machine Learning Full Course",duration:"6h 00m",ytId:"rfscVS0vtbw",lab:true,labLink:"https://colab.research.google.com/",desc:"NumPy, Pandas, Matplotlib, scikit-learn — the complete Python ML foundation."},
      {id:"ml_b2",title:"Statistics for Machine Learning Full Course",duration:"5h 00m",ytId:"xxpc-HPKN28",lab:false,desc:"Probability, linear algebra, and calculus — only the parts that actually matter for ML."},
      {id:"ml_b3",title:"Machine Learning Full Course for Beginners",duration:"9h 00m",ytId:"i_LwzRVP7bg",lab:true,desc:"Train, evaluate, and improve models. Linear regression, decision trees, and model selection."},
    ]},
    {level:"Intermediate",color:"#FFB547",courses:[
      {id:"ml_i1",title:"Deep Learning with PyTorch Full Course",duration:"10h 00m",ytId:"c36lUUr864M",lab:true,desc:"CNNs, RNNs, and Transformers built from first principles with PyTorch."},
      {id:"ml_i2",title:"TensorFlow & Keras Full Course",duration:"6h 00m",ytId:"tPYj3fFJGjk",lab:true,desc:"Build and train neural networks with TensorFlow. Image classification and NLP models."},
    ]},
    {level:"Advanced",color:"#FF4D6D",courses:[
      {id:"ml_a1",title:"ML Model Deployment with FastAPI & Docker",duration:"2h 00m",ytId:"h5wLuVDr0oc",lab:true,desc:"Package ML models as production REST APIs, containerise with Docker, deploy to cloud."},
      {id:"ml_a2",title:"MLOps Full Course",duration:"5h 00m",ytId:"h5wLuVDr0oc",lab:true,desc:"MLflow, model registry, monitoring, and drift detection in production ML systems."},
    ]},
  ]},
  cloud_admin:{certPath:["AWS Cloud Practitioner","AWS SysOps Associate","AWS Solutions Architect"],stages:[
    {level:"Beginner",color:"#4ECDC4",courses:[
      {id:"ca_b1",title:"Cloud Computing Full Course for Beginners",duration:"5h 00m",ytId:"M988_fsOSWo",lab:false,desc:"IaaS, PaaS, SaaS, regions, availability zones — the complete vocabulary of cloud computing."},
      {id:"ca_b2",title:"AWS Full Course 2024 — Zero to Hero",duration:"5h 00m",ytId:"3hLmDS179YE",lab:true,labLink:"https://aws.amazon.com/free",desc:"EC2, S3, VPC, IAM, RDS — hands-on labs covering every core AWS service."},
      {id:"ca_b3",title:"Linux Full Course for Beginners",duration:"5h 00m",ytId:"sWbUDq4S6Y8",lab:true,desc:"Shell scripting, cron jobs, user management, and systemd — Linux fundamentals for cloud admins."},
    ]},
    {level:"Intermediate",color:"#FFB547",courses:[
      {id:"ca_i1",title:"AWS Networking — VPC, Route53, CloudFront",duration:"3h 00m",ytId:"3hLmDS179YE",lab:true,desc:"Design and secure cloud networks: subnets, security groups, NAT gateways, and load balancers."},
      {id:"ca_i2",title:"Terraform Full Course — Infrastructure as Code",duration:"2h 30m",ytId:"SLB_c_mT-tA",lab:true,desc:"Provision and manage cloud infrastructure with Terraform. Modules and remote state management."},
    ]},
    {level:"Advanced",color:"#FF4D6D",courses:[
      {id:"ca_a1",title:"Kubernetes Full Course",duration:"7h 00m",ytId:"X48VuDVv0do",lab:true,labLink:"https://labs.play-with-docker.com/",desc:"Deploy, scale, and manage containerised apps. Helm charts, RBAC, and persistent volumes."},
      {id:"ca_a2",title:"AWS Solutions Architect Exam Prep",duration:"5h 00m",ytId:"3hLmDS179YE",lab:true,desc:"Complete SAA-C03 exam preparation with architecture patterns and practice questions."},
    ]},
  ]},
  brand_mgr:{certPath:["Google Digital Marketing Cert","HubSpot Marketing Cert","CIM Diploma"],stages:[
    {level:"Beginner",color:"#F59E0B",courses:[
      {id:"bm_b1",title:"Brand Management Full Course",duration:"2h 00m",ytId:"cZeGXuEeJ0A",lab:false,desc:"What brand management is and how top global companies build brands that last for decades."},
      {id:"bm_b2",title:"Digital Marketing Full Course for Beginners",duration:"7h 00m",ytId:"dBSSA5ot0tM",lab:true,labLink:"https://www.canva.com/",desc:"SEO, SEM, email, social media, and content strategy — the complete digital marketing stack."},
      {id:"bm_b3",title:"Consumer Behaviour & Marketing Psychology",duration:"2h 00m",ytId:"cZeGXuEeJ0A",lab:false,desc:"Why people buy and how to use psychology ethically in marketing and brand communications."},
    ]},
    {level:"Intermediate",color:"#FFB547",courses:[
      {id:"bm_i1",title:"Social Media Marketing Full Course",duration:"4h 00m",ytId:"dBSSA5ot0tM",lab:true,desc:"Build social media strategies, create content calendars, and grow audiences organically."},
      {id:"bm_i2",title:"Google Analytics 4 Full Course",duration:"2h 30m",ytId:"dBSSA5ot0tM",lab:true,desc:"Set up GA4, read reports, create dashboards, and make data-driven marketing decisions."},
    ]},
    {level:"Advanced",color:"#FF4D6D",courses:[
      {id:"bm_a1",title:"Marketing Analytics & ROI Measurement",duration:"3h 00m",ytId:"dBSSA5ot0tM",lab:true,desc:"Measure brand health, track KPIs, attribute conversions, and prove marketing ROI clearly."},
      {id:"bm_a2",title:"Crisis Communication & Brand Reputation",duration:"1h 30m",ytId:"7g3UYBM0GsQ",lab:false,desc:"Manage PR crises, respond to social media backlash, and protect brand equity under fire."},
    ]},
  ]},
  product_mgr:{certPath:["Google PM Cert","AIPMM CPM","Product School Certificate"],stages:[
    {level:"Beginner",color:"#EF4444",courses:[
      {id:"pm_b1",title:"Product Management Full Course for Beginners",duration:"3h 00m",ytId:"nHtSAbBJMgI",lab:false,desc:"What PMs do, the product lifecycle, and how to work across engineering, design, and business."},
      {id:"pm_b2",title:"User Research Methods",duration:"2h 00m",ytId:"nHtSAbBJMgI",lab:true,desc:"User interviews, surveys, usability testing, and how to turn insights into product decisions."},
      {id:"pm_b3",title:"Writing PRDs & User Stories",duration:"1h 30m",ytId:"nHtSAbBJMgI",lab:true,desc:"PRDs, user stories, acceptance criteria — write specs that engineering teams can build from."},
    ]},
    {level:"Intermediate",color:"#FFB547",courses:[
      {id:"pm_i1",title:"Product Strategy & Roadmapping",duration:"2h 00m",ytId:"nHtSAbBJMgI",lab:false,desc:"Build a compelling product strategy, prioritise ruthlessly, and communicate your roadmap."},
      {id:"pm_i2",title:"Agile & Scrum Full Course",duration:"2h 00m",ytId:"O0rc3oEAn0g",lab:true,desc:"Sprints, standups, retrospectives — how Agile methodology works in real product teams."},
    ]},
    {level:"Advanced",color:"#FF4D6D",courses:[
      {id:"pm_a1",title:"Product Analytics with SQL",duration:"3h 00m",ytId:"HXV3zeQKqGY",lab:true,desc:"Funnels, cohort analysis, A/B testing, and the product metrics that actually matter."},
      {id:"pm_a2",title:"Growth Product Management",duration:"2h 00m",ytId:"nHtSAbBJMgI",lab:false,desc:"Growth loops, acquisition, activation, retention — building products that grow themselves."},
    ]},
  ]},
  social_media_mgr:{certPath:["Meta Social Media Marketing Cert","HubSpot Social Media Cert","Google Digital Marketing"],stages:[
    {level:"Beginner",color:"#EC4899",courses:[
      {id:"sm_b1",title:"Social Media Marketing Full Course 2024",duration:"4h 00m",ytId:"dBSSA5ot0tM",lab:false,desc:"Platforms, audience building, content strategy, and the fundamentals of social media marketing."},
      {id:"sm_b2",title:"Content Creation for Social Media",duration:"2h 00m",ytId:"OJKBpnRHByM",lab:true,desc:"Photo, video, and graphic design basics for creating content that stops the scroll."},
      {id:"sm_b3",title:"Canva Design Tutorial for Beginners",duration:"1h 30m",ytId:"9QntzHmEiXs",lab:true,desc:"Design professional social media graphics, stories, and posts with Canva — free tool."},
    ]},
    {level:"Intermediate",color:"#FFB547",courses:[
      {id:"sm_i1",title:"Meta Ads Full Course — Facebook & Instagram",duration:"3h 00m",ytId:"dBSSA5ot0tM",lab:true,desc:"Run profitable paid campaigns on Facebook and Instagram. Targeting, budgets, and creative."},
      {id:"sm_i2",title:"Social Media Analytics Full Course",duration:"2h 00m",ytId:"dBSSA5ot0tM",lab:true,desc:"Read metrics, track KPIs, prove ROI, and build reports that impress clients and managers."},
    ]},
    {level:"Advanced",color:"#FF4D6D",courses:[
      {id:"sm_a1",title:"Social Media Strategy from Scratch",duration:"2h 00m",ytId:"cZeGXuEeJ0A",lab:false,desc:"Full playbook — audience research, content calendar, brand voice, and growth strategy."},
      {id:"sm_a2",title:"Influencer Marketing & Brand Partnerships",duration:"1h 30m",ytId:"OJKBpnRHByM",lab:false,desc:"Find influencers, negotiate deals, track campaign performance, build lasting partnerships."},
    ]},
  ]},
  journalist:{certPath:["Google News Initiative","Reuters Journalism Training","NCTJ Diploma"],stages:[
    {level:"Beginner",color:"#EC4899",courses:[
      {id:"jn_b1",title:"Introduction to Journalism",duration:"3h 00m",ytId:"OJKBpnRHByM",lab:false,desc:"News values, ethics, the inverted pyramid, and what separates good journalism from bad."},
      {id:"jn_b2",title:"News Writing & Reporting Skills",duration:"2h 00m",ytId:"OJKBpnRHByM",lab:true,desc:"Write news stories that get published. Interviewing sources and meeting deadlines."},
      {id:"jn_b3",title:"Mobile Journalism — Video & Photography",duration:"2h 00m",ytId:"OJKBpnRHByM",lab:true,desc:"Shoot and edit compelling news content using only your smartphone."},
    ]},
    {level:"Intermediate",color:"#FFB547",courses:[
      {id:"jn_i1",title:"Investigative & Data Journalism",duration:"3h 00m",ytId:"OJKBpnRHByM",lab:true,desc:"FOI requests, document analysis, spreadsheet investigation, and data-driven storytelling."},
      {id:"jn_i2",title:"SEO for Journalists & Digital Writing",duration:"1h 30m",ytId:"dBSSA5ot0tM",lab:true,desc:"Write for digital audiences, optimise articles for search, distribute on social media."},
    ]},
    {level:"Advanced",color:"#FF4D6D",courses:[
      {id:"jn_a1",title:"Broadcast Journalism & TV Presenting",duration:"2h 00m",ytId:"OJKBpnRHByM",lab:true,desc:"TV presenting, scripting video packages, live broadcasting, and studio production."},
      {id:"jn_a2",title:"Media Law, Ethics & Press Freedom",duration:"1h 30m",ytId:"OJKBpnRHByM",lab:false,desc:"Defamation, copyright, source protection, and journalist legal rights in Nigeria."},
    ]},
  ]},
  epidemiologist:{certPath:["CDC Public Health Cert","Johns Hopkins Epidemiology","WHO Training"],stages:[
    {level:"Beginner",color:"#06B6D4",courses:[
      {id:"ep_b1",title:"Introduction to Epidemiology",duration:"4h 00m",ytId:"VNfAUiGObAI",lab:false,desc:"Disease patterns, causation, risk factors, and the fundamentals of epidemiological thinking."},
      {id:"ep_b2",title:"Biostatistics for Public Health",duration:"5h 00m",ytId:"xxpc-HPKN28",lab:true,desc:"Distributions, hypothesis testing, confidence intervals — statistics every epidemiologist needs."},
      {id:"ep_b3",title:"Global Health Introduction",duration:"2h 00m",ytId:"VNfAUiGObAI",lab:false,desc:"Public health systems, social determinants of health, and global health frameworks."},
    ]},
    {level:"Intermediate",color:"#FFB547",courses:[
      {id:"ep_i1",title:"Disease Surveillance & Outbreak Investigation",duration:"3h 00m",ytId:"VNfAUiGObAI",lab:true,desc:"Build surveillance systems, investigate outbreaks step by step, and write field reports."},
      {id:"ep_i2",title:"Epidemiological Study Design",duration:"2h 30m",ytId:"xxpc-HPKN28",lab:false,desc:"RCTs, cohort studies, case-control — choose the right design for your research question."},
    ]},
    {level:"Advanced",color:"#FF4D6D",courses:[
      {id:"ep_a1",title:"Infectious Disease Control & Pandemic Preparedness",duration:"3h 00m",ytId:"VNfAUiGObAI",lab:false,desc:"WHO frameworks, One Health approach, and building systems that can respond to pandemics."},
      {id:"ep_a2",title:"R for Epidemiology & Public Health",duration:"4h 00m",ytId:"xxpc-HPKN28",lab:true,desc:"Data analysis, visualisation, and publishable research using R — the epidemiology standard."},
    ]},
  ]},
  clinical_nurse:{certPath:["NCLEX-RN","BLS Certification","ACLS Certification"],stages:[
    {level:"Beginner",color:"#F472B6",courses:[
      {id:"cn_b1",title:"Introduction to Nursing",duration:"4h 00m",ytId:"9LCBEhcFkUo",lab:false,desc:"The nursing profession, scope of practice, patient care fundamentals, and professional ethics."},
      {id:"cn_b2",title:"Anatomy & Physiology Full Course",duration:"8h 00m",ytId:"uBGl2BujkPQ",lab:false,desc:"Human body systems from head to toe — the biological foundation every nurse must know."},
      {id:"cn_b3",title:"Medical Terminology for Healthcare",duration:"2h 00m",ytId:"9LCBEhcFkUo",lab:false,desc:"Medical language — prefixes, suffixes, roots, and how to read clinical documentation."},
    ]},
    {level:"Intermediate",color:"#FFB547",courses:[
      {id:"cn_i1",title:"Pharmacology for Nurses & Drug Calculations",duration:"3h 00m",ytId:"9LCBEhcFkUo",lab:true,labLink:"https://www.osmosis.org/",desc:"Drug classes, mechanisms of action, nursing considerations, and safe dosage calculations."},
      {id:"cn_i2",title:"Clinical Assessment & Patient Care",duration:"4h 00m",ytId:"9LCBEhcFkUo",lab:true,desc:"Head-to-toe assessment, vital signs interpretation, and evidence-based care planning."},
    ]},
    {level:"Advanced",color:"#FF4D6D",courses:[
      {id:"cn_a1",title:"Critical Care Nursing — ICU Fundamentals",duration:"3h 00m",ytId:"9LCBEhcFkUo",lab:true,desc:"Ventilator management, haemodynamic monitoring, and caring for critically ill patients."},
      {id:"cn_a2",title:"NCLEX-RN Exam Preparation",duration:"5h 00m",ytId:"9LCBEhcFkUo",lab:false,desc:"Full NCLEX-RN prep — question strategies, content review, and practice examinations."},
    ]},
  ]},
  primary_teacher:{certPath:["PGDE","NTI NCE","British Council Teaching Cert"],stages:[
    {level:"Beginner",color:"#F97316",courses:[
      {id:"te_b1",title:"Introduction to Teaching",duration:"3h 00m",ytId:"GEmuEWjHr5c",lab:false,desc:"The purpose of education, learning theories, and the qualities of an effective teacher."},
      {id:"te_b2",title:"Child Development — Ages 5 to 12",duration:"2h 30m",ytId:"GEmuEWjHr5c",lab:false,desc:"Cognitive, social, emotional, and physical development stages in primary school children."},
      {id:"te_b3",title:"Classroom Management Strategies",duration:"2h 00m",ytId:"GEmuEWjHr5c",lab:true,desc:"Build a positive learning environment, set routines, and manage challenging behaviour."},
    ]},
    {level:"Intermediate",color:"#FFB547",courses:[
      {id:"te_i1",title:"Lesson Planning & Curriculum Design",duration:"3h 00m",ytId:"GEmuEWjHr5c",lab:true,desc:"Write lesson plans, schemes of work, and differentiate for diverse learners."},
      {id:"te_i2",title:"Assessment & Feedback in Education",duration:"2h 00m",ytId:"GEmuEWjHr5c",lab:true,desc:"Formative and summative assessment, rubrics, and giving feedback that improves learning."},
    ]},
    {level:"Advanced",color:"#FF4D6D",courses:[
      {id:"te_a1",title:"Educational Leadership & School Administration",duration:"2h 30m",ytId:"iH-EB7-JXvI",lab:false,desc:"Lead a school department, manage teaching staff, drive improvement, and handle governance."},
      {id:"te_a2",title:"EdTech in Primary Schools",duration:"2h 00m",ytId:"GEmuEWjHr5c",lab:true,desc:"Use tablets, coding tools, and educational apps to make primary learning more engaging."},
    ]},
  ]},
};

export function defaultRoadmap(careerTitle) {
  return {
    certPath:["Google Career Certificate","LinkedIn Learning Cert","Coursera Professional Cert"],
    stages:[
      {level:"Beginner",color:"#0DFFE0",courses:[
        {id:"def_b1",title:`Introduction to ${careerTitle}`,duration:"2h 00m",ytId:"cK3SJFBOpBA",lab:false,desc:`Overview of ${careerTitle} — key roles, required skills, career paths, and how to get started.`},
        {id:"def_b2",title:"Professional Communication Skills",duration:"2h 00m",ytId:"7g3UYBM0GsQ",lab:false,desc:"Business writing, presentations, stakeholder management, and professional presence."},
        {id:"def_b3",title:"Research Methods & Critical Thinking",duration:"3h 00m",ytId:"xxpc-HPKN28",lab:false,desc:"Find, evaluate, and synthesise information to make better professional decisions."},
      ]},
      {level:"Intermediate",color:"#FFB547",courses:[
        {id:"def_i1",title:"Microsoft Office Mastery",duration:"3h 00m",ytId:"K74l26pE4YA",lab:true,desc:"Excel, Word, PowerPoint — the productivity tools every professional uses every day."},
        {id:"def_i2",title:"Project Management Essentials",duration:"3h 00m",ytId:"O0rc3oEAn0g",lab:false,desc:"Plan and deliver projects on time, within budget, with clear stakeholder communication."},
      ]},
      {level:"Advanced",color:"#FF4D6D",courses:[
        {id:"def_a1",title:"Leadership & Team Management",duration:"3h 00m",ytId:"iH-EB7-JXvI",lab:false,desc:"Lead teams, give feedback, manage performance, and resolve conflict professionally."},
        {id:"def_a2",title:"Career Strategy — CV, Portfolio & Interview Prep",duration:"2h 30m",ytId:"Yn_vgTCl6xM",lab:false,desc:"Build your professional brand, grow your network, and ace job interviews."},
      ]},
    ],
  };
}
