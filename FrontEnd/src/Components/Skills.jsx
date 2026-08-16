import  { useRef, useState } from "react";


const Icons = {
  Terminal: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" 
    strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" x2="20" y1="19" />
    </svg>
  ),
  Frontend: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
     strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  Backend: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" 
    strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
      <line x1="6" x2="6.01" y1="6" y2="6" />
      <line x1="6" x2="6.01" y1="18" y2="18" />
    </svg>
  ),
  Database: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" 
    strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  ),
  Tools: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" 
    strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 
      7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  Sparkle: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
     strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275
       1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  ),
  BadgeCode: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" 
    strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  Shield: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" 
    strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  Api: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" 
    strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" />
    </svg>
  ),
  Git: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
     strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="3" x2="6" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  ),
  Send: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" 
    strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  ),
};


const skillCategories = [
  {
    category: "Programming Languages",
    description: "Core languages for problem solving and logic development",
    icon: Icons.Terminal,
    glowColor: "rgba(239, 68, 68, 0.25)",
    accentColor: "text-red-400",
    borderColor: "hover:border-red-500/50",
    skills: [
      { name: "Java", icon: Icons.BadgeCode },
      { name: "JavaScript (ES6+)", icon: Icons.BadgeCode },
      { name: "TypeScript", icon: Icons.BadgeCode },
      { name: "C", icon: Icons.BadgeCode },
      { name: "C++", icon: Icons.BadgeCode },
    ],
  },
  {
    category: "Frontend Development",
    description: "Building responsive, modern, and interactive interfaces",
    icon: Icons.Frontend,
    glowColor: "rgba(56, 189, 248, 0.25)",
    accentColor: "text-cyan-400",
    borderColor: "hover:border-cyan-500/50",
    skills: [
      { name: "React.js", icon: Icons.BadgeCode },
      { name: "Tailwind CSS", icon: Icons.BadgeCode },
      { name: "Redux Toolkit", icon: Icons.BadgeCode },
      { name: "HTML5", icon: Icons.BadgeCode },
      { name: "CSS3", icon: Icons.BadgeCode },
    ],
  },
  {
    category: "Backend Development",
    description: "Scalable REST APIs, server architecture & authentication",
    icon: Icons.Backend,
    glowColor: "rgba(52, 211, 153, 0.25)",
    accentColor: "text-emerald-400",
    borderColor: "hover:border-emerald-500/50",
    skills: [
      { name: "Node.js", icon: Icons.Backend },
      { name: "Express.js", icon: Icons.Backend },
      { name: "REST APIs", icon: Icons.Api },
      { name: "JWT Authentication", icon: Icons.Shield },
    ],
  },
  {
    category: "Databases & Storage",
    description: "Database modeling, schema validation, and persistence",
    icon: Icons.Database,
    glowColor: "rgba(168, 85, 247, 0.25)",
    accentColor: "text-purple-400",
    borderColor: "hover:border-purple-500/50",
    skills: [
      { name: "MongoDB", icon: Icons.Database },
      { name: "Mongoose", icon: Icons.Database },
      { name: "MySQL", icon: Icons.Database },
    ],
  },
  {
    category: "Tools, Cloud & Integrations",
    description: "Version control, AI APIs, payments, and asset storage",
    icon: Icons.Tools,
    glowColor: "rgba(251, 146, 60, 0.25)",
    accentColor: "text-amber-400",
    borderColor: "hover:border-amber-500/50",
    skills: [
      { name: "Git", icon: Icons.Git },
      { name: "GitHub", icon: Icons.Git },
      { name: "Postman", icon: Icons.Send },
      { name: "Firebase Auth", icon: Icons.Shield },
      { name: "Google Gemini AI", icon: Icons.Sparkle },
      { name: "Razorpay", icon: Icons.Shield },
    ],
  },
];


function SkillCard({ item }) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setTilt({
      rx: ((y - centerY) / centerY) * -5,
      ry: ((x - centerX) / centerX) * 5,
    });

    setMousePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.4,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
    setMousePos((prev) => ({ ...prev, opacity: 0 }));
  };

  const CategoryIcon = item.icon;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition: "transform 0.15s ease-out",
        transformStyle: "preserve-3d",
      }}
      className={`relative rounded-xl bg-[#0D1117]/90 border border-[#30363D] ${item.borderColor}
       p-4 sm:p-5 shadow-lg backdrop-blur-xl transition-all duration-200 group`}
    >

      <div
        className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300
         z-0"
        style={{
          opacity: mousePos.opacity,
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, ${item.glowColor} 
          0%, transparent 65%)`,
        }}
      />

      <div className="relative z-10 space-y-3" style={{ transform: "translateZ(10px)" }}>
        
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
          <div className="flex items-center gap-2.5">
            <div className={`p-1.5 rounded-lg bg-slate-900 border border-slate-800
               ${item.accentColor}`}>
              <CategoryIcon className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white tracking-wide">{item.category}</h3>
          </div>

          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800
           text-slate-300 border border-slate-700">
            {item.skills.length}
          </span>
        </div>

   
        <p className="text-[11px] text-slate-300 leading-snug">{item.description}</p>

     
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {item.skills.map((skill) => {
            const IconComponent = skill.icon;
            return (
              <div
                key={skill.name}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/90
                 hover:bg-slate-800 text-slate-200 text-xs font-medium border border-slate-800
                  hover:border-slate-600 hover:-translate-y-0.5 transition-all duration-150"
              >
                <IconComponent className={`w-3 h-3 ${item.accentColor}`} />
                <span>{skill.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


export default function Skills() {
  return (
    <section id="Skills" className="relative w-full py-16 px-4 sm:px-6 max-w-5xl mx-auto font-sans">
      
     
   
<div className="text-center mb-10 space-y-2.5">
  
  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-100 border
   border-cyan-300 text-cyan-900 text-xs font-bold shadow-sm">
    <Icons.Sparkle className="w-3.5 h-3.5 text-cyan-700" />
    <span>Technical Expertise</span>
  </div>


  <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
    Skills & Technologies
  </h2>

 
  <p className="text-slate-700 text-sm font-semibold max-w-xl mx-auto leading-relaxed">
    Languages, frameworks, databases, and developer tools used across my full-stack projects.
  </p>
</div>

      {/* Compact 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skillCategories.map((item) => (
          <SkillCard key={item.category} item={item} />
        ))}
      </div>

    </section>
  );
}