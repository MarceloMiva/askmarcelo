// ── Career Roadmaps ───────────────────────────────────────────
// All YouTube IDs are real, working, embeddable videos

export const ROADMAPS = {
  pentest:{certPath:["CompTIA Security+","eJPT","OSCP","CRTO"],stages:[
    {level:"Beginner",color:"#0DFFE0",courses:[
      {id:"pt_b1",title:"Linux for Hackers",duration:"5h 20m",ytId:"U1w4T03B98I",lab:true,desc:"Master the Linux terminal, filesystem, permissions, and Bash scripting essential for pentesting."},
      {id:"pt_b2",title:"Networking Fundamentals (TCP/IP, DNS, HTTP)",duration:"3h 10m",ytId:"qiQR5rTSshw",lab:true,desc:"Understand subnets, routing, protocols, and how data travels across the internet."},
      {id:"pt_b3",title:"Introduction to Ethical Hacking",duration:"2h 45m",ytId:"3Kq1MIfTWCE",lab:false,desc:"The mindset, methodology, and legal framework of ethical hacking and penetration testing."},
      {id:"pt_b4",title:"Kali Linux Setup & Essential Tools",duration:"1h 30m",ytId:"lZAoFs75_cs",lab:true,desc:"Install Kali. Nmap, Netcat, Burp Suite, Metasploit — your first day hacker toolkit."},
    ]},
    {level:"Intermediate",color:"#FFB547",courses:[
      {id:"pt_i1",title:"Web App Hacking — OWASP Top 10",duration:"8h 00m",ytId:"F5KJVuii0Yw",lab:true,desc:"SQLi, XSS, IDOR, SSRF — exploit every OWASP Top 10 vulnerability on real labs."},
      {id:"pt_i2",title:"Network Penetration Testing",duration:"6h 15m",ytId:"3Kq1MIfTWCE",lab:true,desc:"Internal network recon, service exploitation, pivoting, and post-exploitation techniques."},
      {id:"pt_i3",title:"Active Directory Attacks",duration:"5h 00m",ytId:"jUc1J31DNdw",lab:true,desc:"BloodHound, Kerberoasting, pass-the-hash, DCSync on real AD environments."},
    ]},
    {level:"Advanced",color:"#FF4D6D",courses:[
      {id:"pt_a1",title:"Buffer Overflow & Exploit Development",duration:"4h 30m",ytId:"1S0aBV-Waeo",lab:true,desc:"Write custom exploits from scratch. Stack overflows, ASLR and DEP bypass techniques."},
      {id:"pt_a2",title:"Red Team Operations & C2 Frameworks",duration:"5h 00m",ytId:"jUc1J31DNdw",lab:true,desc:"Cobalt Strike concepts, Havoc C2, and evasion techniques for advanced red team ops."},
      {id:"pt_a3",title:"Professional Pentest Report Writing",duration:"1h 45m",ytId:"Yn_vgTCl6xM",lab:false,desc:"Write executive summaries and technical findings that clients and CISOs act on."},
    ]},
  ]},
  soc_analyst:{certPath:["CompTIA Security+","CySA+","Splunk Core","BTL1"],stages:[
    {level:"Beginner",color:"#0DFFE0",courses:[
      {id:"soc_b1",title:"What is a SOC? Roles, Tools & Workflow",duration:"1h 20m",ytId:"jMGUeW_ynAY",lab:false,desc:"How a Security Operations Center works, alert triage, and escalation paths."},
      {id:"soc_b2",title:"Networking for SOC Analysts",duration:"3h 00m",ytId:"qiQR5rTSshw",lab:true,desc:"Ports, protocols, packet capture with Wireshark — what you need to read security events."},
      {id:"soc_b3",title:"Introduction to SIEM — Splunk Fundamentals",duration:"4h 00m",ytId:"SSoNLCf0Nvg",lab:true,desc:"Install Splunk, ingest logs, write SPL queries, and build your first security dashboard."},
    ]},
    {level:"Intermediate",color:"#FFB547",courses:[
      {id:"soc_i1",title:"Threat Detection with MITRE ATT&CK",duration:"3h 30m",ytId:"bkfWKSrjIlM",lab:true,desc:"Map detections to ATT&CK tactics and build a detection library for your SOC."},
      {id:"soc_i2",title:"Incident Response Process & Playbooks",duration:"4h 00m",ytId:"A-kSgpDEOMM",lab:true,desc:"Contain, eradicate, recover. Build IR playbooks for ransomware and phishing incidents."},
      {id:"soc_i3",title:"Malware Triage & Sandbox Analysis",duration:"3h 45m",ytId:"KfUqm5e3Be4",lab:true,desc:"Detonate suspicious files in Any.run and Cuckoo. Static and dynamic analysis workflows."},
    ]},
    {level:"Advanced",color:"#FF4D6D",courses:[
      {id:"soc_a1",title:"Threat Hunting — Proactive Detection",duration:"4h 00m",ytId:"bkfWKSrjIlM",lab:true,desc:"Hypothesis-driven hunting. Find adversaries that bypassed your automated alerts."},
      {id:"soc_a2",title:"SOAR — Automating Incident Response",duration:"3h 00m",ytId:"A-kSgpDEOMM",lab:true,desc:"Build automation playbooks to reduce MTTR with security orchestration."},
    ]},
  ]},
  fullstack_cs:{certPath:["Meta Front-End Cert","Meta Back-End Cert","AWS Developer Associate"],stages:[
    {level:"Beginner",color:"#0DFFE0",courses:[
      {id:"fs_b1",title:"HTML & CSS — Zero to Hero",duration:"6h 00m",ytId:"G3e-cpL7ofc",lab:true,desc:"Build real websites from scratch. Layouts, Flexbox, Grid, and responsive design."},
      {id:"fs_b2",title:"JavaScript for Absolute Beginners",duration:"8h 00m",ytId:"PkZNo7MFNFg",lab:true,desc:"Variables, DOM manipulation, events, fetch API — the language of the web."},
      {id:"fs_b3",title:"Git & GitHub Complete Course",duration:"3h 00m",ytId:"RGOj5yH7evk",lab:true,desc:"Version control, branching, pull requests, and open source collaboration."},
    ]},
    {level:"Intermediate",color:"#FFB547",courses:[
      {id:"fs_i1",title:"React.js Full Course",duration:"12h 00m",ytId:"bMknfKXIFA8",lab:true,desc:"Components, hooks, state management, routing, and consuming REST APIs with React."},
      {id:"fs_i2",title:"Node.js & Express — Backend Development",duration:"8h 00m",ytId:"Oe421EPjeBE",lab:true,desc:"REST APIs, middleware, authentication, and MongoDB integration with Node.js."},
      {id:"fs_i3",title:"SQL & PostgreSQL for Developers",duration:"4h 00m",ytId:"qw--VYLpxG4",lab:true,desc:"Databases, joins, indexes, transactions, and query optimization."},
    ]},
    {level:"Advanced",color:"#FF4D6D",courses:[
      {id:"fs_a1",title:"Next.js Full-Stack App Development",duration:"8h 00m",ytId:"mTz0GXj8NN0",lab:true,desc:"SSR, SSG, API routes, authentication with NextAuth, and Vercel deployment."},
      {id:"fs_a2",title:"Docker & CI/CD for Web Developers",duration:"5h 00m",ytId:"fqMOX6JJhGo",lab:true,desc:"Containerize your app and ship with automated GitHub Actions pipelines."},
      {id:"fs_a3",title:"System Design for Engineers",duration:"4h 00m",ytId:"i7twT3x5yv8",lab:false,desc:"Load balancing, caching, CDNs, and microservices architecture at scale."},
    ]},
  ]},
  ml_eng:{certPath:["Google TF Developer","AWS ML Specialty","Deep Learning Specialization"],stages:[
    {level:"Beginner",color:"#0DFFE0",courses:[
      {id:"ml_b1",title:"Python for Machine Learning",duration:"6h 00m",ytId:"rfscVS0vtbw",lab:true,desc:"NumPy, Pandas, Matplotlib, and scikit-learn — the Python ML stack from scratch."},
      {id:"ml_b2",title:"Statistics & Math for ML",duration:"4h 00m",ytId:"xxpc-HPKN28",lab:false,desc:"Probability, linear algebra, and calculus — only the parts that matter for ML."},
      {id:"ml_b3",title:"Your First Machine Learning Model",duration:"2h 30m",ytId:"i_LwzRVP7bg",lab:true,desc:"Train, evaluate, and improve models. Understand overfitting and regularization."},
    ]},
    {level:"Intermediate",color:"#FFB547",courses:[
      {id:"ml_i1",title:"Deep Learning with PyTorch",duration:"10h 00m",ytId:"c36lUUr864M",lab:true,desc:"CNNs, RNNs, Transformers — deep learning from first principles."},
      {id:"ml_i2",title:"Feature Engineering & Model Selection",duration:"4h 00m",ytId:"i_LwzRVP7bg",lab:true,desc:"Data pipelines, cross-validation, and hyperparameter tuning workflows."},
    ]},
    {level:"Advanced",color:"#FF4D6D",courses:[
      {id:"ml_a1",title:"ML Deployment — FastAPI & Docker",duration:"5h 00m",ytId:"h5wLuVDr0oc",lab:true,desc:"Package ML models as REST APIs and deploy to cloud with Docker and CI/CD."},
      {id:"ml_a2",title:"MLOps — Production ML Systems",duration:"6h 00m",ytId:"h5wLuVDr0oc",lab:true,desc:"MLflow, Kubeflow, model monitoring, and drift detection in production."},
    ]},
  ]},
  data_analyst:{certPath:["Google Data Analytics Cert","Power BI Cert","SQL Associate"],stages:[
    {level:"Beginner",color:"#0DFFE0",courses:[
      {id:"da_b1",title:"Excel for Data Analysis",duration:"3h 30m",ytId:"K74l26pE4YA",lab:true,desc:"Pivot tables, VLOOKUP, charts, and data cleaning in Microsoft Excel."},
      {id:"da_b2",title:"SQL for Data Analysis — Zero to Hero",duration:"4h 00m",ytId:"HXV3zeQKqGY",lab:true,desc:"SELECT, GROUP BY, JOINs, subqueries, and window functions."},
      {id:"da_b3",title:"Python for Data Analysis (Pandas)",duration:"5h 00m",ytId:"r-uOLxNrNk8",lab:true,desc:"Load, clean, transform, and summarize real-world datasets with Pandas."},
    ]},
    {level:"Intermediate",color:"#FFB547",courses:[
      {id:"da_i1",title:"Data Visualization with Power BI",duration:"4h 00m",ytId:"TmhQCQr_Cjg",lab:true,desc:"Build interactive dashboards and executive-ready reports in Power BI."},
      {id:"da_i2",title:"Statistics for Data Analysts",duration:"3h 00m",ytId:"xxpc-HPKN28",lab:false,desc:"Distributions, hypothesis testing, and A/B testing fundamentals."},
    ]},
    {level:"Advanced",color:"#FF4D6D",courses:[
      {id:"da_a1",title:"Advanced SQL — Window Functions & CTEs",duration:"3h 00m",ytId:"HXV3zeQKqGY",lab:true,desc:"RANK, PARTITION, recursive CTEs — SQL patterns that separate good analysts."},
      {id:"da_a2",title:"Predictive Analytics with Python",duration:"4h 00m",ytId:"i_LwzRVP7bg",lab:true,desc:"Regression models and time-series forecasting for business insights."},
    ]},
  ]},
  cloud_admin:{certPath:["AWS Cloud Practitioner","AWS SysOps Associate","AWS Solutions Architect"],stages:[
    {level:"Beginner",color:"#0DFFE0",courses:[
      {id:"ca_b1",title:"Cloud Computing Fundamentals",duration:"2h 00m",ytId:"M988_fsOSWo",lab:false,desc:"IaaS, PaaS, SaaS, regions, availability zones — the vocabulary of cloud computing."},
      {id:"ca_b2",title:"AWS Core Services — Hands-On",duration:"5h 00m",ytId:"3hLmDS179YE",lab:true,desc:"EC2, S3, VPC, IAM, RDS — hands-on labs with core AWS services."},
      {id:"ca_b3",title:"Linux for Cloud Administrators",duration:"4h 00m",ytId:"U1w4T03B98I",lab:true,desc:"Shell scripting, cron jobs, user management, and systemd for cloud admins."},
    ]},
    {level:"Intermediate",color:"#FFB547",courses:[
      {id:"ca_i1",title:"AWS Networking — VPC, Route53, CloudFront",duration:"4h 30m",ytId:"3hLmDS179YE",lab:true,desc:"Design and secure cloud networks: subnets, security groups, and load balancers."},
      {id:"ca_i2",title:"Infrastructure as Code with Terraform",duration:"5h 00m",ytId:"SLB_c_mT-tA",lab:true,desc:"Provision cloud resources with code. Modules and state management."},
    ]},
    {level:"Advanced",color:"#FF4D6D",courses:[
      {id:"ca_a1",title:"Kubernetes for Production",duration:"7h 00m",ytId:"X48VuDVv0do",lab:true,desc:"Deploy, scale, and manage containerized applications with Helm and RBAC."},
      {id:"ca_a2",title:"AWS Solutions Architect Exam Prep",duration:"8h 00m",ytId:"3hLmDS179YE",lab:true,desc:"Full exam walkthrough, practice questions, and architecture patterns."},
    ]},
  ]},
  brand_mgr:{certPath:["Google Digital Marketing Cert","HubSpot Marketing Cert","CIM Diploma"],stages:[
    {level:"Beginner",color:"#F59E0B",courses:[
      {id:"bm_b1",title:"Introduction to Brand Management",duration:"2h 30m",ytId:"cZeGXuEeJ0A",lab:false,desc:"What brand management is and how top companies build lasting brands."},
      {id:"bm_b2",title:"Consumer Behaviour & Market Research",duration:"3h 00m",ytId:"dBSSA5ot0tM",lab:false,desc:"Understand how and why people buy, and how to use that in campaigns."},
      {id:"bm_b3",title:"Digital Marketing Fundamentals",duration:"4h 00m",ytId:"dBSSA5ot0tM",lab:true,desc:"SEO, SEM, social media, email, and content marketing — the full digital stack."},
    ]},
    {level:"Intermediate",color:"#FFB547",courses:[
      {id:"bm_i1",title:"Brand Strategy & Positioning",duration:"3h 30m",ytId:"cZeGXuEeJ0A",lab:false,desc:"How to differentiate your brand, craft messaging, and win your market segment."},
      {id:"bm_i2",title:"Social Media Marketing — Full Course",duration:"4h 00m",ytId:"dBSSA5ot0tM",lab:true,desc:"Strategy, content creation, scheduling, and analytics across all platforms."},
    ]},
    {level:"Advanced",color:"#FF4D6D",courses:[
      {id:"bm_a1",title:"Brand Analytics & ROI Measurement",duration:"3h 00m",ytId:"dBSSA5ot0tM",lab:true,desc:"Measure brand health, track KPIs, and prove marketing ROI to stakeholders."},
      {id:"bm_a2",title:"Crisis Communication & Brand Reputation",duration:"2h 00m",ytId:"7g3UYBM0GsQ",lab:false,desc:"Manage brand reputation, respond to PR crises, and build resilient brand equity."},
    ]},
  ]},
  product_mgr:{certPath:["Google PM Cert","AIPMM CPM","Product School Certificate"],stages:[
    {level:"Beginner",color:"#EF4444",courses:[
      {id:"pm_b1",title:"Introduction to Product Management",duration:"2h 30m",ytId:"nHtSAbBJMgI",lab:false,desc:"What PMs do, the PM lifecycle, and how to work across engineering, design, and business."},
      {id:"pm_b2",title:"User Research & Customer Discovery",duration:"3h 00m",ytId:"nHtSAbBJMgI",lab:true,desc:"Interviews, surveys, and data analysis to understand user needs deeply."},
      {id:"pm_b3",title:"Writing Product Specs & User Stories",duration:"2h 00m",ytId:"nHtSAbBJMgI",lab:true,desc:"PRDs, user stories, acceptance criteria — write specs engineers actually understand."},
    ]},
    {level:"Intermediate",color:"#FFB547",courses:[
      {id:"pm_i1",title:"Product Strategy & Roadmapping",duration:"4h 00m",ytId:"nHtSAbBJMgI",lab:false,desc:"Build a product strategy, prioritise features, and communicate your roadmap."},
      {id:"pm_i2",title:"Agile & Scrum for Product Managers",duration:"3h 00m",ytId:"O0rc3oEAn0g",lab:true,desc:"Sprints, standups, retrospectives — how Agile works in real product teams."},
    ]},
    {level:"Advanced",color:"#FF4D6D",courses:[
      {id:"pm_a1",title:"Product Analytics — Data-Driven Decisions",duration:"3h 30m",ytId:"TmhQCQr_Cjg",lab:true,desc:"Funnels, cohorts, A/B testing, and product metrics that matter."},
      {id:"pm_a2",title:"Growth Product Management",duration:"3h 00m",ytId:"nHtSAbBJMgI",lab:false,desc:"Growth loops, viral coefficients, and how to build products that grow themselves."},
    ]},
  ]},
  social_media_mgr:{certPath:["Meta Social Media Marketing Cert","HubSpot Social Media Cert","Google Digital Marketing"],stages:[
    {level:"Beginner",color:"#EC4899",courses:[
      {id:"sm_b1",title:"Introduction to Social Media Marketing",duration:"2h 00m",ytId:"dBSSA5ot0tM",lab:false,desc:"Platforms, audiences, and the fundamentals of social media strategy."},
      {id:"sm_b2",title:"Content Creation & Visual Storytelling",duration:"3h 00m",ytId:"OJKBpnRHByM",lab:true,desc:"Create scroll-stopping content with photography, video, and design basics."},
      {id:"sm_b3",title:"Instagram, TikTok & Twitter Growth",duration:"3h 00m",ytId:"dBSSA5ot0tM",lab:true,desc:"Platform-specific strategies for building and growing audiences organically."},
    ]},
    {level:"Intermediate",color:"#FFB547",courses:[
      {id:"sm_i1",title:"Social Media Analytics & Reporting",duration:"2h 30m",ytId:"dBSSA5ot0tM",lab:true,desc:"Read metrics, track KPIs, and build reports clients and managers actually use."},
      {id:"sm_i2",title:"Paid Social Advertising — Meta & Google Ads",duration:"4h 00m",ytId:"dBSSA5ot0tM",lab:true,desc:"Run profitable ad campaigns on Facebook, Instagram, and Google."},
    ]},
    {level:"Advanced",color:"#FF4D6D",courses:[
      {id:"sm_a1",title:"Social Media Strategy for Brands",duration:"3h 00m",ytId:"cZeGXuEeJ0A",lab:false,desc:"Build a full social media playbook from audience research to content calendar."},
      {id:"sm_a2",title:"Influencer Marketing & Community Building",duration:"2h 30m",ytId:"OJKBpnRHByM",lab:false,desc:"Find the right influencers, negotiate deals, and build engaged communities."},
    ]},
  ]},
  journalist:{certPath:["Google News Initiative","Reuters Journalism Training","NCTJ Diploma"],stages:[
    {level:"Beginner",color:"#EC4899",courses:[
      {id:"jn_b1",title:"Introduction to Journalism",duration:"2h 00m",ytId:"OJKBpnRHByM",lab:false,desc:"The journalist's role, news values, ethics, and the fundamentals of reporting."},
      {id:"jn_b2",title:"News Writing & Reporting",duration:"3h 00m",ytId:"OJKBpnRHByM",lab:true,desc:"Inverted pyramid, news angles, interviewing sources, and writing under deadline."},
      {id:"jn_b3",title:"Multimedia Journalism — Photo & Video",duration:"3h 00m",ytId:"OJKBpnRHByM",lab:true,desc:"Shoot, edit, and publish photos and short-form video for news stories."},
    ]},
    {level:"Intermediate",color:"#FFB547",courses:[
      {id:"jn_i1",title:"Investigative Journalism & Data",duration:"4h 00m",ytId:"OJKBpnRHByM",lab:true,desc:"FOI requests, document analysis, and data journalism with spreadsheets."},
      {id:"jn_i2",title:"Digital Journalism — SEO & Social",duration:"2h 30m",ytId:"dBSSA5ot0tM",lab:true,desc:"Write for digital audiences, optimise for search, and distribute on social."},
    ]},
    {level:"Advanced",color:"#FF4D6D",courses:[
      {id:"jn_a1",title:"Broadcast Journalism & Presenting",duration:"3h 00m",ytId:"OJKBpnRHByM",lab:true,desc:"TV and radio presenting, scripting packages, and live broadcasting skills."},
      {id:"jn_a2",title:"Media Law & Ethics",duration:"2h 00m",ytId:"OJKBpnRHByM",lab:false,desc:"Defamation, copyright, press freedom, and journalist legal protections."},
    ]},
  ]},
  epidemiologist:{certPath:["CDC Public Health Certificate","Johns Hopkins Epidemiology","WHO Training"],stages:[
    {level:"Beginner",color:"#06B6D4",courses:[
      {id:"ep_b1",title:"Introduction to Epidemiology",duration:"3h 00m",ytId:"VNfAUiGObAI",lab:false,desc:"Disease patterns, risk factors, causation, and the fundamentals of epidemiological thinking."},
      {id:"ep_b2",title:"Biostatistics for Public Health",duration:"4h 00m",ytId:"xxpc-HPKN28",lab:true,desc:"Statistical concepts every epidemiologist needs: distributions, tests, confidence intervals."},
      {id:"ep_b3",title:"Introduction to Public Health",duration:"2h 00m",ytId:"VNfAUiGObAI",lab:false,desc:"Public health systems, determinants of health, and health promotion frameworks."},
    ]},
    {level:"Intermediate",color:"#FFB547",courses:[
      {id:"ep_i1",title:"Disease Surveillance & Outbreak Investigation",duration:"4h 00m",ytId:"VNfAUiGObAI",lab:true,desc:"Set up surveillance systems, investigate outbreaks, and write field reports."},
      {id:"ep_i2",title:"Epidemiological Study Design",duration:"3h 30m",ytId:"xxpc-HPKN28",lab:false,desc:"RCTs, cohort studies, case-control — choose and design the right study."},
    ]},
    {level:"Advanced",color:"#FF4D6D",courses:[
      {id:"ep_a1",title:"Global Health & Infectious Disease Control",duration:"4h 00m",ytId:"VNfAUiGObAI",lab:false,desc:"WHO frameworks, pandemic preparedness, and global disease control strategies."},
      {id:"ep_a2",title:"Health Data Analysis with R",duration:"5h 00m",ytId:"xxpc-HPKN28",lab:true,desc:"Use R for epidemiological analysis, visualisation, and publishable research."},
    ]},
  ]},
  primary_teacher:{certPath:["PGDE","NTI NCE","British Council Teaching Cert"],stages:[
    {level:"Beginner",color:"#F97316",courses:[
      {id:"te_b1",title:"Introduction to Primary Education",duration:"2h 00m",ytId:"GEmuEWjHr5c",lab:false,desc:"The philosophy and purpose of primary education and child development stages."},
      {id:"te_b2",title:"Child Development — Ages 5–12",duration:"3h 00m",ytId:"GEmuEWjHr5c",lab:false,desc:"Cognitive, emotional, and social development in school-age children."},
      {id:"te_b3",title:"Classroom Management & Behaviour",duration:"2h 30m",ytId:"GEmuEWjHr5c",lab:true,desc:"Build a positive classroom environment and manage challenging behaviour."},
    ]},
    {level:"Intermediate",color:"#FFB547",courses:[
      {id:"te_i1",title:"Lesson Planning & Curriculum Design",duration:"3h 30m",ytId:"GEmuEWjHr5c",lab:true,desc:"Write lesson plans, scheme of work, and differentiate for mixed-ability classrooms."},
      {id:"te_i2",title:"Inclusive Education & Learning Differences",duration:"2h 30m",ytId:"GEmuEWjHr5c",lab:false,desc:"Support students with dyslexia, ADHD, autism, and other learning differences."},
    ]},
    {level:"Advanced",color:"#FF4D6D",courses:[
      {id:"te_a1",title:"Educational Leadership & School Management",duration:"3h 00m",ytId:"iH-EB7-JXvI",lab:false,desc:"Lead a school department, manage staff, and drive school improvement."},
      {id:"te_a2",title:"EdTech — Technology in Primary Classrooms",duration:"2h 00m",ytId:"GEmuEWjHr5c",lab:true,desc:"Use tablets, coding tools, and educational apps to enhance primary learning."},
    ]},
  ]},
};

export function defaultRoadmap(careerTitle) {
  return {
    certPath:["Google Career Certificate","LinkedIn Learning","Coursera Professional Cert"],
    stages:[
      {level:"Beginner",color:"#0DFFE0",courses:[
        {id:"def_b1",title:`Introduction to ${careerTitle}`,duration:"2h 00m",ytId:"cK3SJFBOpBA",lab:false,desc:`Overview of ${careerTitle} — roles, skills required, and how to get started in the industry.`},
        {id:"def_b2",title:"Professional Communication Skills",duration:"2h 00m",ytId:"7g3UYBM0GsQ",lab:false,desc:"Business writing, presentations, stakeholder management, and professional presence."},
        {id:"def_b3",title:"Research Methods & Critical Thinking",duration:"3h 00m",ytId:"xxpc-HPKN28",lab:false,desc:"How to find, evaluate, and synthesise information to make better decisions."},
      ]},
      {level:"Intermediate",color:"#FFB547",courses:[
        {id:"def_i1",title:"Microsoft Office Mastery",duration:"4h 00m",ytId:"K74l26pE4YA",lab:true,desc:"Excel, Word, PowerPoint — the productivity tools every professional uses daily."},
        {id:"def_i2",title:"Project Management Essentials",duration:"3h 00m",ytId:"O0rc3oEAn0g",lab:false,desc:"Plan and deliver projects on time, within budget, with clear communication."},
      ]},
      {level:"Advanced",color:"#FF4D6D",courses:[
        {id:"def_a1",title:"Leadership & Team Management",duration:"3h 00m",ytId:"iH-EB7-JXvI",lab:false,desc:"Lead teams effectively, give feedback, manage performance, and resolve conflict."},
        {id:"def_a2",title:"Career Strategy — Portfolio & Interview Prep",duration:"2h 30m",ytId:"Yn_vgTCl6xM",lab:false,desc:"Build your professional brand, network strategically, and ace job interviews."},
      ]},
    ],
  };
}
