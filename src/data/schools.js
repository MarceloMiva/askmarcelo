// ── Schools, Departments & Careers ───────────────────────────

export const SCHOOLS = {
  "School of Computing & IT":{icon:"💻",color:"#6C63FF",short:"SCIT",departments:{
    "Computer Science":{color:"#6C63FF",icon:"💻",degree:"BSc.",careers:[
      {id:"fullstack_cs",title:"Full-Stack Web Developer",icon:"🌐"},
      {id:"mobile_dev",title:"Mobile App Developer",icon:"📱"},
      {id:"devops",title:"DevOps / Cloud Engineer",icon:"☁️"},
      {id:"game_dev",title:"Game Developer",icon:"🎮"},
      {id:"blockchain",title:"Blockchain Developer",icon:"⛓️"},
      {id:"sysarch",title:"Systems Architect",icon:"🏗️"},
    ]},
    "Cybersecurity":{color:"#0DFFE0",icon:"🔐",degree:"BSc.",careers:[
      {id:"pentest",title:"Penetration Tester",icon:"🕵️"},
      {id:"soc_analyst",title:"SOC Analyst",icon:"🖥️"},
      {id:"dfir",title:"DFIR Specialist",icon:"🧪"},
      {id:"malware_an",title:"Malware Analyst",icon:"🦠"},
      {id:"cloud_sec",title:"Cloud Security Architect",icon:"☁️"},
      {id:"red_team",title:"Red Team Operator",icon:"🔴"},
      {id:"grc",title:"GRC Analyst",icon:"📋"},
      {id:"threat_intel",title:"Threat Intelligence Analyst",icon:"🔍"},
    ]},
    "Data Science":{color:"#FF6B6B",icon:"📊",degree:"BSc.",careers:[
      {id:"data_analyst",title:"Data Analyst",icon:"📈"},
      {id:"data_sci",title:"Data Scientist",icon:"🔬"},
      {id:"data_eng",title:"Data Engineer",icon:"🏭"},
      {id:"bi_analyst",title:"BI Analyst",icon:"💡"},
      {id:"ml_eng",title:"Machine Learning Engineer",icon:"🤖"},
      {id:"data_viz",title:"Data Visualization Engineer",icon:"🎨"},
    ]},
    "Software Engineering":{color:"#FFB547",icon:"⚙️",degree:"BSc.",careers:[
      {id:"backend_eng",title:"Backend Engineer",icon:"🖧"},
      {id:"frontend_eng",title:"Frontend Engineer",icon:"🎨"},
      {id:"qa_eng",title:"QA / Test Engineer",icon:"✅"},
      {id:"sre",title:"Site Reliability Engineer",icon:"📡"},
      {id:"embedded",title:"Embedded Systems Engineer",icon:"🔧"},
      {id:"tech_pm",title:"Technical Product Manager",icon:"📝"},
    ]},
    "Information Technology":{color:"#4ECDC4",icon:"🖧",degree:"BSc.",careers:[
      {id:"sysadmin",title:"Systems Administrator",icon:"🖥️"},
      {id:"net_eng",title:"Network Engineer",icon:"📡"},
      {id:"cloud_admin",title:"Cloud Administrator",icon:"☁️"},
      {id:"dba",title:"Database Administrator",icon:"🗄️"},
      {id:"it_sec",title:"IT Security Analyst",icon:"🔒"},
      {id:"it_pm",title:"IT Project Manager",icon:"📋"},
    ]},
    "Artificial Intelligence":{color:"#A855F7",icon:"🧠",degree:"BSc.",careers:[
      {id:"ai_eng",title:"AI Engineer",icon:"🤖"},
      {id:"nlp_eng",title:"NLP Engineer",icon:"💬"},
      {id:"cv_eng",title:"Computer Vision Engineer",icon:"👁️"},
      {id:"llm_eng",title:"LLM / GenAI Engineer",icon:"✨"},
      {id:"mlops",title:"MLOps Engineer",icon:"🔄"},
      {id:"ai_res",title:"AI Research Scientist",icon:"🔬"},
      {id:"robotics",title:"Robotics Engineer",icon:"🦾"},
    ]},
  }},
  "School of Management & Social Sciences":{icon:"🏛️",color:"#F59E0B",short:"SMSS",departments:{
    "Business Management":{color:"#F59E0B",icon:"📊",degree:"BSc.",careers:[
      {id:"brand_mgr",title:"Brand Manager",icon:"🏷️"},
      {id:"ops_mgr",title:"Operations Manager",icon:"⚙️"},
      {id:"hr_mgr",title:"HR Manager",icon:"👥"},
      {id:"mktg_mgr",title:"Marketing Manager",icon:"📣"},
      {id:"biz_analyst",title:"Business Analyst",icon:"📋"},
    ]},
    "Economics":{color:"#10B981",icon:"📉",degree:"BSc.",careers:[
      {id:"economist",title:"Economist",icon:"📊"},
      {id:"policy_analyst",title:"Policy Analyst",icon:"📜"},
      {id:"fin_economist",title:"Financial Economist",icon:"💰"},
      {id:"dev_economist",title:"Development Economist",icon:"🌍"},
    ]},
    "Accounting":{color:"#3B82F6",icon:"🧾",degree:"BSc.",careers:[
      {id:"auditor",title:"Auditor",icon:"🔍"},
      {id:"tax_consultant",title:"Tax Consultant",icon:"📋"},
      {id:"forensic_acc",title:"Forensic Accountant",icon:"🕵️"},
    ]},
    "Entrepreneurship":{color:"#EF4444",icon:"🚀",degree:"BSc.",careers:[
      {id:"startup_founder",title:"Startup Founder / CEO",icon:"🚀"},
      {id:"vc_analyst",title:"VC / Startup Analyst",icon:"💼"},
      {id:"biz_dev",title:"Business Development Manager",icon:"🤝"},
      {id:"product_mgr",title:"Product Manager",icon:"📱"},
    ]},
    "Public Policy & Administration":{color:"#8B5CF6",icon:"🏛️",degree:"BSc.",careers:[
      {id:"civil_servant",title:"Civil Servant",icon:"🏛️"},
      {id:"govt_policy",title:"Government Policy Analyst",icon:"📜"},
      {id:"ngo_pm",title:"NGO Programme Manager",icon:"🌍"},
    ]},
    "Criminology & Security Studies":{color:"#DC2626",icon:"🔐",degree:"BSc.",careers:[
      {id:"crime_analyst",title:"Crime & Intelligence Analyst",icon:"🔍"},
      {id:"security_con",title:"Security Consultant",icon:"🛡️"},
      {id:"counter_intel",title:"Counter-Intelligence Officer",icon:"🕵️"},
    ]},
  }},
  "School of Communications & Media":{icon:"📡",color:"#EC4899",short:"SCM",departments:{
    "Mass Communication & Media Studies":{color:"#EC4899",icon:"📡",degree:"BSc.",careers:[
      {id:"journalist",title:"Journalist / Reporter",icon:"📰"},
      {id:"pr_specialist",title:"PR Specialist",icon:"🗣️"},
      {id:"content_creator",title:"Digital Content Creator",icon:"🎬"},
      {id:"broadcast_prod",title:"Broadcast Producer",icon:"📺"},
      {id:"social_media_mgr",title:"Social Media Manager",icon:"📱"},
      {id:"advert_strat",title:"Advertising Strategist",icon:"📣"},
    ]},
  }},
  "School of Allied Health Sciences":{icon:"🏥",color:"#06B6D4",short:"SAHS",departments:{
    "Public Health":{color:"#06B6D4",icon:"🏥",degree:"BSc.",careers:[
      {id:"epidemiologist",title:"Epidemiologist",icon:"🔬"},
      {id:"health_promo",title:"Health Promotion Officer",icon:"💪"},
      {id:"pub_health_analyst",title:"Public Health Analyst",icon:"📊"},
      {id:"global_health",title:"Global Health Consultant",icon:"🌍"},
    ]},
    "Nursing Science":{color:"#F472B6",icon:"🩺",degree:"BSc.",careers:[
      {id:"clinical_nurse",title:"Clinical Nurse (RN)",icon:"🩺"},
      {id:"nurse_educator",title:"Nurse Educator",icon:"📚"},
      {id:"icu_nurse",title:"Critical Care / ICU Nurse",icon:"❤️"},
      {id:"nurse_mgr",title:"Nurse Manager / CNO",icon:"👔"},
    ]},
    "Community Health Science":{color:"#34D399",icon:"🤝",degree:"B.CHS.",careers:[
      {id:"comm_health_wkr",title:"Community Health Worker",icon:"🤝"},
      {id:"health_educator",title:"Health Educator",icon:"📋"},
      {id:"outreach_coord",title:"Outreach Coordinator",icon:"📍"},
    ]},
    "Environmental Health Science":{color:"#86EFAC",icon:"🌿",degree:"B.EHS.",careers:[
      {id:"env_health_spec",title:"Environmental Health Specialist",icon:"🌿"},
      {id:"occ_health",title:"Occupational Health Specialist",icon:"⛑️"},
      {id:"food_safety",title:"Food Safety Inspector",icon:"🍽️"},
    ]},
  }},
  "School of Education":{icon:"🎓",color:"#F97316",short:"SOE",departments:{
    "Primary Education":{color:"#F97316",icon:"📖",degree:"B.Ed.",careers:[
      {id:"primary_teacher",title:"Primary School Teacher",icon:"✏️"},
      {id:"curriculum_dev",title:"Curriculum Developer",icon:"📚"},
      {id:"school_admin",title:"School Administrator",icon:"🏫"},
      {id:"edu_consultant",title:"Education Consultant",icon:"💡"},
    ]},
    "Early Childhood Education":{color:"#FCD34D",icon:"🧒",degree:"B.Ed.",careers:[
      {id:"nursery_teacher",title:"Nursery / Pre-School Teacher",icon:"🧸"},
      {id:"child_dev_spec",title:"Child Development Specialist",icon:"🌱"},
      {id:"family_support",title:"Family Support Worker",icon:"👨‍👩‍👧"},
    ]},
  }},
};

export function getAllDepts() {
  const map = {};
  for (const [school, sd] of Object.entries(SCHOOLS))
    for (const [dept, dd] of Object.entries(sd.departments))
      map[dept] = { ...dd, school };
  return map;
}

export const ALL_DEPTS = getAllDepts();
