import { create } from "zustand";

export interface HeroContent { badge: string; title: string; highlightWord: string; subtitle: string; primaryBtn: string; secondaryBtn: string; bgImage: string; }
export interface StatItem { id: string; value: number; suffix: string; label: string; }
export interface Testimonial { id: string; name: string; company: string; role: string; content: string; rating: number; }
export interface ClientLogo { id: string; name: string; initials: string; color: string; }
export interface ServiceCard { id: string; title: string; description: string; category: string; link: string; image: string; visible: boolean; }
export interface TeamMember { id: string; name: string; role: string; bio: string; }
export interface AboutContent { story: string[]; mission: string; vision: string; }
export interface PricingTier { id: string; name: string; description: string; price: string; features: string[]; highlighted: boolean; }
export interface ServicePageContent { heroTitle: string; heroSubtitle: string; heroImage: string; features: string[]; pricingTiers: PricingTier[]; }
export interface TrainingCourse { id: string; name: string; duration: string; price: string; description: string; requirements: string[]; nextStart: string; features: string[]; }
export interface GalleryPhoto { id: string; category: string; title: string; src: string; desc: string; visible: boolean; }
export interface BlogPost { id: string; slug: string; title: string; excerpt: string; category: string; date: string; readTime: string; image: string; featured: boolean; published: boolean; content: string; }
export interface FAQItem { id: string; category: string; question: string; answer: string; visible: boolean; }
export interface JobPosting { id: string; title: string; department: string; type: string; location: string; description: string; requirements: string[]; benefits: string[]; active: boolean; }
export interface ContactInfo { address: string[]; phone: string[]; email: string[]; hours: string[]; mapEmbedUrl: string; }
export interface CompanyInfo { name: string; taglineAmharic: string; taglineEnglish: string; whatsappNumber: string; }

interface CMSStore {
  companyInfo: CompanyInfo; updateCompanyInfo: (u: Partial<CompanyInfo>) => Promise<void>;
  heroContent: HeroContent; updateHeroContent: (u: Partial<HeroContent>) => Promise<void>;
  stats: StatItem[]; addStat: (s: Omit<StatItem,"id">) => Promise<void>; updateStat: (id: string, u: Partial<StatItem>) => Promise<void>; deleteStat: (id: string) => Promise<void>;
  testimonials: Testimonial[]; addTestimonial: (t: Omit<Testimonial,"id">) => Promise<void>; updateTestimonial: (id: string, u: Partial<Testimonial>) => Promise<void>; deleteTestimonial: (id: string) => Promise<void>;
  clientLogos: ClientLogo[]; addClientLogo: (c: Omit<ClientLogo,"id">) => Promise<void>; updateClientLogo: (id: string, u: Partial<ClientLogo>) => Promise<void>; deleteClientLogo: (id: string) => Promise<void>;
  serviceCards: ServiceCard[]; addServiceCard: (s: Omit<ServiceCard,"id">) => Promise<void>; updateServiceCard: (id: string, u: Partial<ServiceCard>) => Promise<void>; deleteServiceCard: (id: string) => Promise<void>;
  teamMembers: TeamMember[]; addTeamMember: (m: Omit<TeamMember,"id">) => Promise<void>; updateTeamMember: (id: string, u: Partial<TeamMember>) => Promise<void>; deleteTeamMember: (id: string) => Promise<void>;
  aboutContent: AboutContent; updateAboutContent: (u: Partial<AboutContent>) => Promise<void>;
  privateSecurityPage: ServicePageContent; updatePrivateSecurityPage: (u: Partial<ServicePageContent>) => Promise<void>;
  officeBuildingPage: ServicePageContent; updateOfficeBuildingPage: (u: Partial<ServicePageContent>) => Promise<void>;
  housekeepingPage: ServicePageContent; updateHousekeepingPage: (u: Partial<ServicePageContent>) => Promise<void>;
  trainingCourses: TrainingCourse[]; addTrainingCourse: (c: Omit<TrainingCourse,"id">) => Promise<void>; updateTrainingCourse: (id: string, u: Partial<TrainingCourse>) => Promise<void>; deleteTrainingCourse: (id: string) => Promise<void>;
  galleryPhotos: GalleryPhoto[]; addGalleryPhoto: (p: Omit<GalleryPhoto,"id">) => Promise<void>; updateGalleryPhoto: (id: string, u: Partial<GalleryPhoto>) => Promise<void>; deleteGalleryPhoto: (id: string) => Promise<void>;
  blogPosts: BlogPost[]; addBlogPost: (p: Omit<BlogPost,"id">) => Promise<void>; updateBlogPost: (id: string, u: Partial<BlogPost>) => Promise<void>; deleteBlogPost: (id: string) => Promise<void>;
  faqItems: FAQItem[]; addFAQItem: (f: Omit<FAQItem,"id">) => Promise<void>; updateFAQItem: (id: string, u: Partial<FAQItem>) => Promise<void>; deleteFAQItem: (id: string) => Promise<void>;
  jobPostings: JobPosting[]; addJobPosting: (j: Omit<JobPosting,"id">) => Promise<void>; updateJobPosting: (id: string, u: Partial<JobPosting>) => Promise<void>; deleteJobPosting: (id: string) => Promise<void>;
  contactInfo: ContactInfo; updateContactInfo: (u: Partial<ContactInfo>) => Promise<void>;
  fetchCMSData: () => Promise<void>;
}

const initialCompanyInfo: CompanyInfo = { name: 'BASE SECURITY, CLEANING & TRADING PLC', taglineAmharic: 'ቤዝ ለላቀ የደህንነት አገልግሎት', taglineEnglish: 'Base Excellence Security Service', whatsappNumber: '251911234038' };
const initialHero: HeroContent = { badge: 'ቤዝ ለላቀ የደህንነት አገልግሎት', title: 'BASE SECURITY,', highlightWord: 'CLEANING', subtitle: 'Your trusted partner for professional security services and cleaning solutions in Addis Abeba. On-demand, reliable, and certified.', primaryBtn: 'Request a Service', secondaryBtn: 'Contact Us', bgImage: 'https://images.unsplash.com/photo-1761064392859-2bfa734e9f3f?w=1080&q=80' };
const initialStats: StatItem[] = [{id:'s1',value:500,suffix:'+',label:'Trained Professionals'},{id:'s2',value:200,suffix:'+',label:'Satisfied Clients'},{id:'s3',value:10,suffix:'+',label:'Years Experience'},{id:'s4',value:24,suffix:'/7',label:'Service Availability'}];
const initialTestimonials: Testimonial[] = [{id:'t1',name:'Ato Dawit Bekele',company:'Ethio Telecom',role:'Security Manager',content:'BASE SECURITY has been protecting our headquarters for over a year. Their professionalism and reliability are unmatched in Addis Abeba.',rating:5},{id:'t2',name:'W/ro Meron Tadesse',company:'Hilton Addis Abeba',role:'Operations Director',content:'Their housekeeping and cleaning team keeps our hotel spotless. Punctual, thorough, and always professional.',rating:5},{id:'t3',name:'Ato Abebe Girma',company:'Commercial Bank of Ethiopia',role:'Facilities Director',content:'Both the cleaning and security services transformed our workplace. We rely on BASE for everything facility-related.',rating:5}];
const initialClientLogos: ClientLogo[] = [{id:'cl1',name:'Ethio Telecom',initials:'ET',color:'#0066cc'},{id:'cl2',name:'Hilton Addis Abeba',initials:'HA',color:'#003087'},{id:'cl3',name:'Commercial Bank of Ethiopia',initials:'CB',color:'#006633'},{id:'cl4',name:'Ethiopian Airlines',initials:'EA',color:'#009900'},{id:'cl5',name:'Sheraton Addis',initials:'SA',color:'#8B0000'},{id:'cl6',name:'Awash Bank',initials:'AB',color:'#FF6600'},{id:'cl7',name:'Dashen Bank',initials:'DB',color:'#003366'},{id:'cl8',name:'Bole International Hotel',initials:'BI',color:'#6B3A2A'},{id:'cl9',name:'Addis Abeba University',initials:'AU',color:'#4B0082'},{id:'cl10',name:'Safaricom Ethiopia',initials:'SE',color:'#4CAF50'}];

const initialServiceCards: ServiceCard[] = [{id:'sc1',title:'Private Security (VIP)',description:'Elite protection for high-profile individuals, executives, and special events',category:'Security',link:'/services/private-security',image:'https://images.unsplash.com/photo-1687400104522-c9f94fa7540a?w=800&q=80',visible:true},{id:'sc2',title:'Office & Building Security',description:'Complete security solutions for corporate offices and commercial properties',category:'Security',link:'/services/office-building',image:'https://images.unsplash.com/photo-1681569685377-dd0dba4b0414?w=800&q=80',visible:true},{id:'sc3',title:'Housekeeping & Cleaning',description:'Professional cleaning and facility maintenance for offices, hotels, and commercial spaces',category:'Cleaning',link:'/services/housekeeping',image:'https://images.unsplash.com/photo-1775178120132-f0ff7fd5cb40?w=800&q=80',visible:true},{id:'sc4',title:'Guard Training Programs',description:'Comprehensive training to develop certified, professional security personnel',category:'Training',link:'/services/guard-training',image:'https://images.unsplash.com/photo-1761064392859-2bfa734e9f3f?w=800&q=80',visible:true}];
const initialTeamMembers: TeamMember[] = [{id:'tm1',name:'Ato Girma Bekele',role:'CEO & Founder',bio:'Visionary leader with extensive experience in security management and business development in Ethiopia.'},{id:'tm2',name:'W/ro Tigist Alemu',role:'Chief Operations Officer',bio:'Expert in security systems and facility management, ensuring operational excellence across all deployments.'},{id:'tm3',name:'Ato Yonas Tesfaye',role:'Training Director',bio:'Certified security trainer with 15+ years developing professional security personnel in Ethiopia.'},{id:'tm4',name:'W/rt Hiwot Mengistu',role:'Client Relations Director',bio:'Dedicated to building lasting client relationships and delivering customized security solutions.'}];
const initialAbout: AboutContent = { story: ['BASE SECURITY, CLEANING & TRADING PLC was established with a clear mission: to provide world-class security and facility management services that businesses and individuals in Ethiopia can trust.','Operating from our offices at Megenagna City Square Mall, 10th Floor, Addis Abeba, we have grown into one of Ethiopia\'s most respected security and cleaning firms, serving clients across multiple sectors.','Our commitment to excellence — ቤዝ ለላቀ የደህንነት አገልግሎት — continuous training, and client satisfaction has made us the preferred choice for organizations seeking reliable, professional security and cleaning solutions.'], mission: 'To provide exceptional security and facility services that protect our clients\' assets, people, and operations while maintaining the highest standards of professionalism and integrity.', vision: 'To be the most trusted and innovative security services provider, setting industry standards for excellence, training, and customer satisfaction.' };

const initialPrivateSecurity: ServicePageContent = { heroTitle: 'Private Security & VIP Protection', heroSubtitle: 'Elite protection services for executives, high-profile individuals, and special events. Discretion, professionalism, and safety are our priorities.', heroImage: 'https://images.unsplash.com/photo-1687400104522-c9f94fa7540a?w=800&q=80', features: ['Executive and VIP protection','Threat assessment and risk analysis','Secure transportation services','Event security management','Personal security details','Residential security'], pricingTiers: [{id:'ps1',name:'Basic Protection',description:'Single guard detail for standard events',price:'From ETB 4,500/hour',features:['1 Security Professional','Standard threat assessment','Event duration coverage'],highlighted:false},{id:'ps2',name:'Executive Detail',description:'Comprehensive protection for executives',price:'From ETB 9,000/hour',features:['2-3 Security Professionals','Advanced threat assessment','Secure transportation','24/7 availability'],highlighted:true},{id:'ps3',name:'VIP Premium',description:'Elite protection for high-profile clients',price:'Custom Quote',features:['Full security team','Intelligence gathering','Advance planning','Crisis management','Complete discretion'],highlighted:false}] };
const initialOfficeBuilding: ServicePageContent = { heroTitle: 'Office & Building Security', heroSubtitle: 'Complete security solutions for corporate offices, commercial buildings, and business facilities. Protect your assets, employees, and operations.', heroImage: 'https://images.unsplash.com/photo-1681569685377-dd0dba4b0414?w=800&q=80', features: ['Access control management','Perimeter security','Visitor management systems','CCTV monitoring','Emergency response','Security patrols'], pricingTiers: [{id:'ob1',name:'Small Office',description:'For offices up to 10,000 sq ft',price:'From ETB 45,000/month',features:['1-2 Security guards','Basic access control','12-hour coverage','Weekly reports'],highlighted:false},{id:'ob2',name:'Corporate Building',description:'For buildings up to 50,000 sq ft',price:'From ETB 120,000/month',features:['3-5 Security guards','Advanced access control','24/7 coverage','CCTV integration','Daily reports'],highlighted:true},{id:'ob3',name:'Enterprise Complex',description:'For large facilities & campuses',price:'Custom Quote',features:['Full security team','Comprehensive systems','24/7 dedicated coverage','Command center','Real-time monitoring'],highlighted:false}] };
const initialHousekeeping: ServicePageContent = { heroTitle: 'Housekeeping Services', heroSubtitle: 'Professional cleaning and maintenance services to keep your facilities pristine. Creating clean, healthy, and productive environments.', heroImage: 'https://images.unsplash.com/photo-1775178120132-f0ff7fd5cb40?w=800&q=80', features: ['Office cleaning and sanitization','Floor care and maintenance','Restroom sanitization','Window cleaning','Waste management','Green cleaning options'], pricingTiers: [{id:'hk1',name:'Basic Cleaning',description:'Essential cleaning services',price:'From ETB 8,000/month',features:['Weekly cleaning','Basic sanitization','Waste disposal','Floor maintenance'],highlighted:false},{id:'hk2',name:'Professional Care',description:'Comprehensive facility care',price:'From ETB 18,000/month',features:['Daily cleaning','Deep sanitization','Window cleaning','Floor polishing','Restroom care'],highlighted:true},{id:'hk3',name:'Premium Service',description:'Complete facility management',price:'Custom Quote',features:['Multiple daily services','Specialized cleaning','Green products','Quality inspections','24/7 availability'],highlighted:false}] };

const initialTrainingCourses: TrainingCourse[] = [{id:'tc1',name:'Basic Security Guard Training',duration:'2 Weeks',price:'ETB 18,000',description:'Foundational training covering security principles, observation, reporting, and emergency response.',requirements:['High school diploma or equivalent','Clean background check','18 years or older'],nextStart:'May 1, 2026',features:['Security fundamentals','Observation and reporting','Emergency procedures','Certificate upon completion']},{id:'tc2',name:'Advanced Security Professional',duration:'4 Weeks',price:'ETB 35,000',description:'Advanced training in threat assessment, conflict resolution, and leadership skills.',requirements:['Basic security training certificate','6 months experience','Clean background check'],nextStart:'May 15, 2026',features:['All basic training content','Threat assessment','Conflict resolution','Leadership skills','Advanced certification']},{id:'tc3',name:'VIP Protection Specialist',duration:'6 Weeks',price:'ETB 55,000',description:'Elite training in executive protection, tactical operations, and crisis management.',requirements:['2+ years security experience','Advanced training certificate','Physical fitness test'],nextStart:'June 1, 2026',features:['Executive protection','Tactical driving','Intelligence gathering','Crisis management','Elite certification']}];
const initialGallery: GalleryPhoto[] = [{id:'g1',category:'Security',title:'VIP Executive Protection',src:'https://images.unsplash.com/photo-1687400104522-c9f94fa7540a?w=800&q=80',desc:'Elite VIP protection detail for corporate executives',visible:true},{id:'g2',category:'Security',title:'Office Building Security',src:'https://images.unsplash.com/photo-1681569685377-dd0dba4b0414?w=800&q=80',desc:'Professional security deployment at corporate headquarters',visible:true},{id:'g3',category:'Cleaning',title:'Professional Office Cleaning',src:'https://images.unsplash.com/photo-1775178120132-f0ff7fd5cb40?w=800&q=80',desc:'Thorough office cleaning and sanitization services',visible:true},{id:'g4',category:'Training',title:'Guard Training Session',src:'https://images.unsplash.com/photo-1761064392859-2bfa734e9f3f?w=800&q=80',desc:'Intensive security guard training program in progress',visible:true},{id:'g5',category:'Security',title:'Event Security Management',src:'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',desc:'Crowd management and event security operations',visible:true},{id:'g6',category:'Cleaning',title:'Hotel Housekeeping',src:'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',desc:'Premium housekeeping services for hospitality sector',visible:true},{id:'g7',category:'Training',title:'Emergency Response Drill',src:'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80',desc:'Emergency response and first aid training exercises',visible:true},{id:'g8',category:'Events',title:'Corporate Event Security',src:'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80',desc:'Security management for high-profile corporate events',visible:true},{id:'g9',category:'Cleaning',title:'Floor Care & Polishing',src:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',desc:'Professional floor care and maintenance services',visible:true},{id:'g10',category:'Events',title:'VIP Event Protection',src:'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',desc:'Discreet VIP protection at high-profile events',visible:true}];

const initialBlogPosts: BlogPost[] = [{id:'b1',slug:'top-5-security-tips',title:'5 Essential Security Tips for Businesses in Addis Abeba',excerpt:'With rapid urban growth comes increased security challenges. Here are the five most important steps every Addis Abeba business should take.',category:'Security Tips',date:'2026-04-15',readTime:'4 min read',image:'https://images.unsplash.com/photo-1681569685377-dd0dba4b0414?w=800&q=80',featured:true,published:true,content:'Security is not a luxury — it is a necessity for every business operating in Addis Abeba today.\n\n**1. Conduct a Security Assessment**\nBefore deploying any guards or systems, understand your vulnerabilities.\n\n**2. Hire Licensed, Trained Guards**\nAlways verify that your security provider is licensed by the Federal Police Commission.\n\n**3. Install Access Control**\nLimit who can enter sensitive areas.\n\n**4. Brief Your Staff**\nSecurity is everyone\'s responsibility.\n\n**5. Review and Update Regularly**\nThreats evolve. Review your security plan every six months.'},{id:'b2',slug:'clean-workplace-productivity',title:'Why a Clean Workplace Boosts Productivity by 20%',excerpt:'Research consistently shows that a clean, well-maintained office environment directly impacts employee morale, health, and output.',category:'Cleaning',date:'2026-04-08',readTime:'3 min read',image:'https://images.unsplash.com/photo-1775178120132-f0ff7fd5cb40?w=800&q=80',featured:false,published:true,content:'A clean workplace is more than aesthetics — it directly affects your bottom line.\n\n**The Research**\nStudies show employees in clean offices report 20% higher productivity.\n\n**What to Prioritise**\n- Daily desk and surface sanitization\n- Weekly deep cleaning of restrooms\n- Monthly floor care and carpet cleaning'},{id:'b3',slug:'guard-training-career',title:'Building a Security Career in Ethiopia: What You Need to Know',excerpt:'The security industry in Ethiopia is growing fast. Here is a complete guide to starting and advancing your career.',category:'Training',date:'2026-03-28',readTime:'5 min read',image:'https://images.unsplash.com/photo-1761064392859-2bfa734e9f3f?w=800&q=80',featured:false,published:true,content:'Ethiopia\'s security sector employs hundreds of thousands of people and is growing rapidly.\n\n**Step 1: Get Certified**\nStart with a Basic Security Guard Training certificate.\n\n**Step 2: Gain Experience**\nWork in different environments to build a broad skill set.\n\n**Step 3: Advance Your Training**\nAfter 6 months, enrol in Advanced Security Professional training.'}];
const initialFAQ: FAQItem[] = [{id:'f1',category:'General',question:'What services does BASE SECURITY offer?',answer:'BASE SECURITY, CLEANING & TRADING PLC provides three core services: professional security (VIP protection, office/building security, event security), housekeeping & cleaning (office cleaning, hotel housekeeping, post-construction cleaning), and guard training programs.',visible:true},{id:'f2',category:'General',question:'Where is BASE SECURITY located?',answer:'Our office is at Megenagna City Square Mall, 10th Floor, Addis Abeba, Ethiopia. You can reach us at +251 91 123 4038 or basesc4@gmail.com.',visible:true},{id:'f3',category:'General',question:'How quickly can you deploy services?',answer:'For standard security deployments we can mobilise within 24–48 hours. For urgent situations, contact us directly on +251 91 123 4038 and we will do our best to respond same-day.',visible:true},{id:'f4',category:'Security',question:'Are your security guards licensed and trained?',answer:'All our guards hold valid Ethiopian security licenses and complete our in-house training program before deployment.',visible:true},{id:'f5',category:'Security',question:'What is included in a VIP protection package?',answer:'VIP packages include a dedicated security detail, advance route planning, threat assessment, secure transportation coordination, and 24/7 availability.',visible:true},{id:'f6',category:'Cleaning',question:'What cleaning services do you provide?',answer:'We offer office and corporate cleaning, hotel and hospitality housekeeping, post-construction cleaning, floor care and polishing, restroom deep sanitization, window cleaning, and waste management.',visible:true},{id:'f7',category:'Cleaning',question:'Do you use eco-friendly cleaning products?',answer:'Yes. Our premium cleaning packages use environmentally friendly, non-toxic products.',visible:true},{id:'f8',category:'Pricing & Contracts',question:'How is pricing calculated?',answer:'Pricing is in Ethiopian Birr (ETB) and depends on service type, number of personnel, coverage hours, and contract duration. Security starts from ETB 4,500/hour, cleaning from ETB 8,000/month.',visible:true},{id:'f9',category:'Pricing & Contracts',question:'What contract lengths do you offer?',answer:'We offer flexible contracts: 1 day, 1 week, 1 month, 3 months, 6 months, 1 year, or ongoing.',visible:true},{id:'f10',category:'Training',question:'Who can enrol in guard training?',answer:'Anyone 18 years or older with a high school diploma or equivalent and a clean background check can enrol in the Basic program.',visible:true},{id:'f11',category:'Training',question:'Are training certificates recognised?',answer:'Yes. Our certificates are recognised by employers across Ethiopia and meet national security licensing requirements.',visible:true}];
const initialJobs: JobPosting[] = [{id:'j1',title:'Security Guard',department:'Security',type:'Full-time',location:'Addis Abeba (Multiple Sites)',description:'Join our professional security team and protect our clients\' premises across Addis Abeba.',requirements:['18+ years old','High school diploma','Clean background check','Physical fitness'],benefits:['Competitive ETB salary','Uniform provided','Free training & certification','Career advancement'],active:true},{id:'j2',title:'VIP Protection Specialist',department:'Security',type:'Full-time',location:'Addis Abeba',description:'Provide elite protection services for high-profile executives and VIP clients.',requirements:['3+ years security experience','Advanced security certification','Driving license'],benefits:['Premium ETB salary','Vehicle allowance','Performance bonuses'],active:true},{id:'j3',title:'Cleaning Specialist',department:'Cleaning',type:'Full-time / Part-time',location:'Addis Abeba (Multiple Sites)',description:'Deliver professional cleaning and housekeeping services to our corporate and hospitality clients.',requirements:['Previous cleaning experience preferred','Attention to detail','Reliable and punctual'],benefits:['Competitive ETB salary','Flexible shifts','Training provided'],active:true},{id:'j4',title:'Security Supervisor',department:'Security',type:'Full-time',location:'Addis Abeba',description:'Lead and supervise a team of security guards across multiple client sites.',requirements:['5+ years security experience','Leadership skills','Advanced certification'],benefits:['Senior ETB salary','Management training','Company vehicle'],active:true}];
const initialContact: ContactInfo = { address: ['Megenagna City Square Mall','10th Floor, Addis Abeba, Ethiopia'], phone: ['+251 91 123 4038'], email: ['basesc4@gmail.com'], hours: ['Mon-Fri: 8:00 AM - 6:00 PM','Sat: 9:00 AM - 3:00 PM'], mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5!2d38.7578!3d9.0192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24d49!2sMegenagna%2C%20Addis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2s!4v1650000000000!5m2!1sen!2s' };

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function toCamel(s: string): string {
  return s.replace(/([-_][a-z])/g, ($1) => $1.toUpperCase().replace('-', '').replace('_', ''));
}

function toSnake(s: string): string {
  return s.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export function keysToCamel(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map((v) => keysToCamel(v));
  } else if (obj !== null && obj !== undefined && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [toCamel(key)]: keysToCamel(obj[key]),
      }),
      {}
    );
  }
  return obj;
}

export function keysToSnake(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map((v) => keysToSnake(v));
  } else if (obj !== null && obj !== undefined && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [toSnake(key)]: keysToSnake(obj[key]),
      }),
      {}
    );
  }
  return obj;
}

async function fetchJson(path: string, options?: RequestInit) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options?.headers,
    },
  });
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

export const useCMSStore = create<CMSStore>((set) => ({
  companyInfo: initialCompanyInfo,
  updateCompanyInfo: async (u) => {
    const res = await fetchJson('/api/cms/settings/company-info', {
      method: 'PUT',
      body: JSON.stringify(keysToSnake(u)),
    });
    set((s) => ({ companyInfo: { ...s.companyInfo, ...keysToCamel(res) } }));
  },

  heroContent: initialHero,
  updateHeroContent: async (u) => {
    const res = await fetchJson('/api/cms/settings/hero', {
      method: 'PUT',
      body: JSON.stringify(keysToSnake(u)),
    });
    set((s) => ({ heroContent: { ...s.heroContent, ...keysToCamel(res) } }));
  },

  stats: initialStats,
  addStat: async (item) => {
    const res = await fetchJson('/api/cms/stats', {
      method: 'POST',
      body: JSON.stringify(keysToSnake(item)),
    });
    set((s) => ({ stats: [...s.stats, keysToCamel(res)] }));
  },
  updateStat: async (id, u) => {
    const res = await fetchJson(`/api/cms/stats/${id}`, {
      method: 'PUT',
      body: JSON.stringify(keysToSnake(u)),
    });
    set((s) => ({ stats: s.stats.map((x) => x.id === id ? { ...x, ...keysToCamel(res) } : x) }));
  },
  deleteStat: async (id) => {
    await fetchJson(`/api/cms/stats/${id}`, { method: 'DELETE' });
    set((s) => ({ stats: s.stats.filter((x) => x.id !== id) }));
  },

  testimonials: initialTestimonials,
  addTestimonial: async (item) => {
    const res = await fetchJson('/api/cms/testimonials', {
      method: 'POST',
      body: JSON.stringify(keysToSnake(item)),
    });
    set((s) => ({ testimonials: [...s.testimonials, keysToCamel(res)] }));
  },
  updateTestimonial: async (id, u) => {
    const res = await fetchJson(`/api/cms/testimonials/${id}`, {
      method: 'PUT',
      body: JSON.stringify(keysToSnake(u)),
    });
    set((s) => ({ testimonials: s.testimonials.map((x) => x.id === id ? { ...x, ...keysToCamel(res) } : x) }));
  },
  deleteTestimonial: async (id) => {
    await fetchJson(`/api/cms/testimonials/${id}`, { method: 'DELETE' });
    set((s) => ({ testimonials: s.testimonials.filter((x) => x.id !== id) }));
  },

  clientLogos: initialClientLogos,
  addClientLogo: async (item) => {
    const res = await fetchJson('/api/cms/client-logos', {
      method: 'POST',
      body: JSON.stringify(keysToSnake(item)),
    });
    set((s) => ({ clientLogos: [...s.clientLogos, keysToCamel(res)] }));
  },
  updateClientLogo: async (id, u) => {
    const res = await fetchJson(`/api/cms/client-logos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(keysToSnake(u)),
    });
    set((s) => ({ clientLogos: s.clientLogos.map((x) => x.id === id ? { ...x, ...keysToCamel(res) } : x) }));
  },
  deleteClientLogo: async (id) => {
    await fetchJson(`/api/cms/client-logos/${id}`, { method: 'DELETE' });
    set((s) => ({ clientLogos: s.clientLogos.filter((x) => x.id !== id) }));
  },

  serviceCards: initialServiceCards,
  addServiceCard: async (item) => {
    const res = await fetchJson('/api/cms/service-cards', {
      method: 'POST',
      body: JSON.stringify(keysToSnake(item)),
    });
    set((s) => ({ serviceCards: [...s.serviceCards, keysToCamel(res)] }));
  },
  updateServiceCard: async (id, u) => {
    const res = await fetchJson(`/api/cms/service-cards/${id}`, {
      method: 'PUT',
      body: JSON.stringify(keysToSnake(u)),
    });
    set((s) => ({ serviceCards: s.serviceCards.map((x) => x.id === id ? { ...x, ...keysToCamel(res) } : x) }));
  },
  deleteServiceCard: async (id) => {
    await fetchJson(`/api/cms/service-cards/${id}`, { method: 'DELETE' });
    set((s) => ({ serviceCards: s.serviceCards.filter((x) => x.id !== id) }));
  },

  teamMembers: initialTeamMembers,
  addTeamMember: async (item) => {
    const res = await fetchJson('/api/cms/team-members', {
      method: 'POST',
      body: JSON.stringify(keysToSnake(item)),
    });
    set((s) => ({ teamMembers: [...s.teamMembers, keysToCamel(res)] }));
  },
  updateTeamMember: async (id, u) => {
    const res = await fetchJson(`/api/cms/team-members/${id}`, {
      method: 'PUT',
      body: JSON.stringify(keysToSnake(u)),
    });
    set((s) => ({ teamMembers: s.teamMembers.map((x) => x.id === id ? { ...x, ...keysToCamel(res) } : x) }));
  },
  deleteTeamMember: async (id) => {
    await fetchJson(`/api/cms/team-members/${id}`, { method: 'DELETE' });
    set((s) => ({ teamMembers: s.teamMembers.filter((x) => x.id !== id) }));
  },

  aboutContent: initialAbout,
  updateAboutContent: async (u) => {
    const res = await fetchJson('/api/cms/settings/about', {
      method: 'PUT',
      body: JSON.stringify(keysToSnake(u)),
    });
    set((s) => ({ aboutContent: { ...s.aboutContent, ...keysToCamel(res) } }));
  },

  privateSecurityPage: initialPrivateSecurity,
  updatePrivateSecurityPage: async (u) => {
    const res = await fetchJson('/api/cms/service-pages/private-security', {
      method: 'PUT',
      body: JSON.stringify(keysToSnake(u)),
    });
    set((s) => ({ privateSecurityPage: { ...s.privateSecurityPage, ...keysToCamel(res) } }));
  },

  officeBuildingPage: initialOfficeBuilding,
  updateOfficeBuildingPage: async (u) => {
    const res = await fetchJson('/api/cms/service-pages/office-building', {
      method: 'PUT',
      body: JSON.stringify(keysToSnake(u)),
    });
    set((s) => ({ officeBuildingPage: { ...s.officeBuildingPage, ...keysToCamel(res) } }));
  },

  housekeepingPage: initialHousekeeping,
  updateHousekeepingPage: async (u) => {
    const res = await fetchJson('/api/cms/service-pages/housekeeping', {
      method: 'PUT',
      body: JSON.stringify(keysToSnake(u)),
    });
    set((s) => ({ housekeepingPage: { ...s.housekeepingPage, ...keysToCamel(res) } }));
  },

  trainingCourses: initialTrainingCourses,
  addTrainingCourse: async (item) => {
    const res = await fetchJson('/api/cms/training-courses', {
      method: 'POST',
      body: JSON.stringify(keysToSnake(item)),
    });
    set((s) => ({ trainingCourses: [...s.trainingCourses, keysToCamel(res)] }));
  },
  updateTrainingCourse: async (id, u) => {
    const res = await fetchJson(`/api/cms/training-courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(keysToSnake(u)),
    });
    set((s) => ({ trainingCourses: s.trainingCourses.map((x) => x.id === id ? { ...x, ...keysToCamel(res) } : x) }));
  },
  deleteTrainingCourse: async (id) => {
    await fetchJson(`/api/cms/training-courses/${id}`, { method: 'DELETE' });
    set((s) => ({ trainingCourses: s.trainingCourses.filter((x) => x.id !== id) }));
  },

  galleryPhotos: initialGallery,
  addGalleryPhoto: async (item) => {
    const res = await fetchJson('/api/cms/gallery-photos', {
      method: 'POST',
      body: JSON.stringify(keysToSnake(item)),
    });
    set((s) => ({ galleryPhotos: [...s.galleryPhotos, keysToCamel(res)] }));
  },
  updateGalleryPhoto: async (id, u) => {
    const res = await fetchJson(`/api/cms/gallery-photos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(keysToSnake(u)),
    });
    set((s) => ({ galleryPhotos: s.galleryPhotos.map((x) => x.id === id ? { ...x, ...keysToCamel(res) } : x) }));
  },
  deleteGalleryPhoto: async (id) => {
    await fetchJson(`/api/cms/gallery-photos/${id}`, { method: 'DELETE' });
    set((s) => ({ galleryPhotos: s.galleryPhotos.filter((x) => x.id !== id) }));
  },

  blogPosts: initialBlogPosts,
  addBlogPost: async (item) => {
    const res = await fetchJson('/api/cms/blog-posts', {
      method: 'POST',
      body: JSON.stringify(keysToSnake(item)),
    });
    set((s) => ({ blogPosts: [...s.blogPosts, keysToCamel(res)] }));
  },
  updateBlogPost: async (id, u) => {
    const res = await fetchJson(`/api/cms/blog-posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(keysToSnake(u)),
    });
    set((s) => ({ blogPosts: s.blogPosts.map((x) => x.id === id ? { ...x, ...keysToCamel(res) } : x) }));
  },
  deleteBlogPost: async (id) => {
    await fetchJson(`/api/cms/blog-posts/${id}`, { method: 'DELETE' });
    set((s) => ({ blogPosts: s.blogPosts.filter((x) => x.id !== id) }));
  },

  faqItems: initialFAQ,
  addFAQItem: async (item) => {
    const res = await fetchJson('/api/cms/faq-items', {
      method: 'POST',
      body: JSON.stringify(keysToSnake(item)),
    });
    set((s) => ({ faqItems: [...s.faqItems, keysToCamel(res)] }));
  },
  updateFAQItem: async (id, u) => {
    const res = await fetchJson(`/api/cms/faq-items/${id}`, {
      method: 'PUT',
      body: JSON.stringify(keysToSnake(u)),
    });
    set((s) => ({ faqItems: s.faqItems.map((x) => x.id === id ? { ...x, ...keysToCamel(res) } : x) }));
  },
  deleteFAQItem: async (id) => {
    await fetchJson(`/api/cms/faq-items/${id}`, { method: 'DELETE' });
    set((s) => ({ faqItems: s.faqItems.filter((x) => x.id !== id) }));
  },

  jobPostings: initialJobs,
  addJobPosting: async (item) => {
    const res = await fetchJson('/api/cms/job-postings', {
      method: 'POST',
      body: JSON.stringify(keysToSnake(item)),
    });
    set((s) => ({ jobPostings: [...s.jobPostings, keysToCamel(res)] }));
  },
  updateJobPosting: async (id, u) => {
    const res = await fetchJson(`/api/cms/job-postings/${id}`, {
      method: 'PUT',
      body: JSON.stringify(keysToSnake(u)),
    });
    set((s) => ({ jobPostings: s.jobPostings.map((x) => x.id === id ? { ...x, ...keysToCamel(res) } : x) }));
  },
  deleteJobPosting: async (id) => {
    await fetchJson(`/api/cms/job-postings/${id}`, { method: 'DELETE' });
    set((s) => ({ jobPostings: s.jobPostings.filter((x) => x.id !== id) }));
  },

  contactInfo: initialContact,
  updateContactInfo: async (u) => {
    const res = await fetchJson('/api/cms/settings/contact', {
      method: 'PUT',
      body: JSON.stringify(keysToSnake(u)),
    });
    set((s) => ({ contactInfo: { ...s.contactInfo, ...keysToCamel(res) } }));
  },

  fetchCMSData: async () => {
    const fetchSetting = async (key: string, defaultVal: any) => {
      try {
        const val = await fetchJson(`/api/cms/settings/${key}`);
        return val ? keysToCamel(val) : defaultVal;
      } catch {
        return defaultVal;
      }
    };
    const fetchServicePage = async (slug: string, defaultVal: any) => {
      try {
        const page = await fetchJson(`/api/cms/service-pages/${slug}`);
        return page ? keysToCamel(page) : defaultVal;
      } catch {
        return defaultVal;
      }
    };

    try {
      const companyInfo = await fetchSetting('company-info', initialCompanyInfo);
      const heroContent = await fetchSetting('hero', initialHero);
      const aboutContent = await fetchSetting('about', initialAbout);
      const contactInfo = await fetchSetting('contact', initialContact);

      const privateSecurityPage = await fetchServicePage('private-security', initialPrivateSecurity);
      const officeBuildingPage = await fetchServicePage('office-building', initialOfficeBuilding);
      const housekeepingPage = await fetchServicePage('housekeeping', initialHousekeeping);

      const stats = await fetchJson('/api/cms/stats').then(keysToCamel).catch(() => initialStats);
      const testimonials = await fetchJson('/api/cms/testimonials').then(keysToCamel).catch(() => initialTestimonials);
      const clientLogos = await fetchJson('/api/cms/client-logos').then(keysToCamel).catch(() => initialClientLogos);
      const serviceCards = await fetchJson('/api/cms/service-cards').then(keysToCamel).catch(() => initialServiceCards);
      const teamMembers = await fetchJson('/api/cms/team-members').then(keysToCamel).catch(() => initialTeamMembers);
      const trainingCourses = await fetchJson('/api/cms/training-courses').then(keysToCamel).catch(() => initialTrainingCourses);
      const galleryPhotos = await fetchJson('/api/cms/gallery-photos/all').then(keysToCamel).catch(() => initialGallery);
      const blogPosts = await fetchJson('/api/cms/blog-posts/all').then(keysToCamel).catch(() => initialBlogPosts);
      const faqItems = await fetchJson('/api/cms/faq-items/all').then(keysToCamel).catch(() => initialFAQ);
      const jobPostings = await fetchJson('/api/cms/job-postings/all').then(keysToCamel).catch(() => initialJobs);

      set({
        companyInfo,
        heroContent,
        aboutContent,
        contactInfo,
        privateSecurityPage,
        officeBuildingPage,
        housekeepingPage,
        stats: stats && stats.length ? stats : initialStats,
        testimonials: testimonials && testimonials.length ? testimonials : initialTestimonials,
        clientLogos: clientLogos && clientLogos.length ? clientLogos : initialClientLogos,
        serviceCards: serviceCards && serviceCards.length ? serviceCards : initialServiceCards,
        teamMembers: teamMembers && teamMembers.length ? teamMembers : initialTeamMembers,
        trainingCourses: trainingCourses && trainingCourses.length ? trainingCourses : initialTrainingCourses,
        galleryPhotos: galleryPhotos && galleryPhotos.length ? galleryPhotos : initialGallery,
        blogPosts: blogPosts && blogPosts.length ? blogPosts : initialBlogPosts,
        faqItems: faqItems && faqItems.length ? faqItems : initialFAQ,
        jobPostings: jobPostings && jobPostings.length ? jobPostings : initialJobs,
      });
    } catch (e) {
      console.error('Failed to load CMS data', e);
    }
  },
}));
