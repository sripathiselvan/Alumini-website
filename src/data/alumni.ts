export const stats = {
  alumni: 12500,
  mentors: 850,
  companies: 420,
  events: 230,
};

export const alumni = [
  { id: "1", name: "Aarav Sharma", batch: "2018", dept: "CSE", company: "Google", role: "Senior SWE", location: "Mountain View, US", skills: ["React","Go","ML"], avatar: "AS", linkedin: "#" },
  { id: "2", name: "Priya Iyer", batch: "2019", dept: "ECE", company: "Meta", role: "Product Manager", location: "London, UK", skills: ["Product","Strategy"], avatar: "PI", linkedin: "#" },
  { id: "3", name: "Rohan Mehta", batch: "2017", dept: "MECH", company: "Tesla", role: "Mech. Engineer", location: "Austin, US", skills: ["CAD","Robotics"], avatar: "RM", linkedin: "#" },
  { id: "4", name: "Ananya Rao", batch: "2020", dept: "CSE", company: "Stripe", role: "Backend Eng.", location: "Bangalore, IN", skills: ["Rust","Payments"], avatar: "AR", linkedin: "#" },
  { id: "5", name: "Vikram Patel", batch: "2016", dept: "EEE", company: "Nvidia", role: "GPU Architect", location: "Santa Clara, US", skills: ["CUDA","HW"], avatar: "VP", linkedin: "#" },
  { id: "6", name: "Sara Kapoor", batch: "2021", dept: "CSE", company: "OpenAI", role: "Research Eng.", location: "SF, US", skills: ["LLM","Python"], avatar: "SK", linkedin: "#" },
  { id: "7", name: "Karan Singh", batch: "2015", dept: "CIVIL", company: "Founder · Buildr", role: "CEO", location: "Mumbai, IN", skills: ["Founder","SaaS"], avatar: "KS", linkedin: "#" },
  { id: "8", name: "Nisha Verma", batch: "2019", dept: "CSE", company: "Microsoft", role: "Cloud Eng.", location: "Hyderabad, IN", skills: ["Azure","K8s"], avatar: "NV", linkedin: "#" },
];

export const mentors = [
  { id: "m1", name: "Dr. Aarav Sharma", role: "Senior SWE @ Google", expertise: ["System Design","Career","Interviews"], available: true, sessions: 124, rating: 4.9, avatar: "AS" },
  { id: "m2", name: "Priya Iyer", role: "PM @ Meta", expertise: ["Product","Strategy","PM Interviews"], available: true, sessions: 89, rating: 4.8, avatar: "PI" },
  { id: "m3", name: "Sara Kapoor", role: "Research @ OpenAI", expertise: ["ML","LLMs","Research"], available: false, sessions: 56, rating: 5.0, avatar: "SK" },
  { id: "m4", name: "Karan Singh", role: "Founder · Buildr", expertise: ["Startups","Fundraising"], available: true, sessions: 210, rating: 4.9, avatar: "KS" },
  { id: "m5", name: "Vikram Patel", role: "GPU Arch @ Nvidia", expertise: ["Hardware","CUDA"], available: true, sessions: 47, rating: 4.7, avatar: "VP" },
  { id: "m6", name: "Nisha Verma", role: "Cloud @ Microsoft", expertise: ["Cloud","DevOps"], available: true, sessions: 73, rating: 4.8, avatar: "NV" },
];

export const opportunities = [
  { id: "o1", title: "Software Engineer Intern", company: "Google", location: "Remote", type: "Internship", salary: "$8k/mo", tag: "Hot" },
  { id: "o2", title: "Product Designer", company: "Stripe", location: "Bangalore", type: "Full-time", salary: "₹38L", tag: "Referral" },
  { id: "o3", title: "ML Research", company: "OpenAI", location: "SF, US", type: "Full-time", salary: "$220k", tag: "Featured" },
  { id: "o4", title: "Backend Engineer", company: "Meta", location: "London", type: "Full-time", salary: "£110k", tag: "Referral" },
  { id: "o5", title: "Founding Engineer", company: "Buildr (YC)", location: "Remote", type: "Full-time", salary: "Equity", tag: "Hot" },
  { id: "o6", title: "Hardware Intern", company: "Nvidia", location: "Santa Clara", type: "Internship", salary: "$7.5k/mo", tag: "New" },
];

export const events = [
  { id: "e1", title: "AlumniNexus Global Summit 2026", date: "2026-06-12", location: "Bangalore + Online", type: "Conference", attending: 1240, image: "🌐" },
  { id: "e2", title: "AI in Production — Webinar", date: "2026-05-22", location: "Online", type: "Webinar", attending: 540, image: "🤖" },
  { id: "e3", title: "Founders Roundtable", date: "2026-06-02", location: "SF, US", type: "Meetup", attending: 80, image: "🚀" },
  { id: "e4", title: "Career Fair 2026", date: "2026-07-18", location: "Campus", type: "Fair", attending: 2200, image: "💼" },
];

export const achievements = [
  { id: "a1", name: "Karan Singh", title: "Raised $20M Series A for Buildr", year: "2025", category: "Startup" },
  { id: "a2", name: "Sara Kapoor", title: "Co-authored landmark LLM paper at NeurIPS", year: "2024", category: "Research" },
  { id: "a3", name: "Priya Iyer", title: "Forbes 30 Under 30", year: "2025", category: "Recognition" },
  { id: "a4", name: "Vikram Patel", title: "Patent on next-gen GPU memory", year: "2024", category: "Innovation" },
];

export const blogPosts = [
  { id: "b1", title: "From Campus to Google: My Journey", author: "Aarav Sharma", category: "Career", date: "Apr 2026", excerpt: "Lessons learned navigating big-tech interviews and the first two years.", read: "6 min" },
  { id: "b2", title: "Building an AI Startup in 2026", author: "Karan Singh", category: "Startup", date: "Mar 2026", excerpt: "Why now is the best time to start, and what to watch out for.", read: "9 min" },
  { id: "b3", title: "Cracking the PM Interview", author: "Priya Iyer", category: "Interviews", date: "Feb 2026", excerpt: "Frameworks I used to land offers at Meta, Stripe and more.", read: "7 min" },
  { id: "b4", title: "Research vs Industry: How to Choose", author: "Sara Kapoor", category: "Career", date: "Jan 2026", excerpt: "An honest comparison after working in both worlds.", read: "5 min" },
];

export const regions = [
  { name: "North America", count: 4200, x: 22, y: 38 },
  { name: "South America", count: 380, x: 32, y: 70 },
  { name: "Europe", count: 2100, x: 50, y: 32 },
  { name: "Africa", count: 240, x: 53, y: 60 },
  { name: "India", count: 4900, x: 68, y: 50 },
  { name: "Asia-Pacific", count: 680, x: 82, y: 55 },
];

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/alumni", label: "Alumni" },
  { to: "/mentorship", label: "Mentorship" },
  { to: "/events", label: "Events" },
  { to: "/careers", label: "Careers" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];
