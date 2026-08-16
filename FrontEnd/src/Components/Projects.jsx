import  { useEffect, useRef, useState } from "react";
import aiExamNoteImg from "../assets/AiExamNoteWeb.png";
import lmsImg from "../assets/LmsWeb.png";

function Canvas3DBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particleCount = 55;
    const particles = [];
    const maxDistance = 150;
    const fov = 350;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.5,
        y: (Math.random() - 0.5) * height * 1.5,
        z: Math.random() * 800 - 400,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: (Math.random() - 0.5) * 0.4,
      });
    }

    let mouseX = 0;
    let mouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX - width / 2) * 0.00025;
      mouseY = (e.clientY - height / 2) * 0.00025;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      targetRotationY += (mouseX - targetRotationY) * 0.05;
      targetRotationX += (mouseY - targetRotationX) * 0.05;

      const projected = [];

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        if (p.x < -width) p.x = width;
        if (p.x > width) p.x = -width;
        if (p.y < -height) p.y = height;
        if (p.y > height) p.y = -height;
        if (p.z < -400) p.z = 400;
        if (p.z > 400) p.z = -400;

        let cosY = Math.cos(targetRotationY);
        let sinY = Math.sin(targetRotationY);
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.z * cosY + p.x * sinY;

        let cosX = Math.cos(targetRotationX);
        let sinX = Math.sin(targetRotationX);
        let y1 = p.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + p.y * sinX;

        const scale = fov / (fov + z2 + 400);
        const x2d = x1 * scale + width / 2;
        const y2d = y1 * scale + height / 2;
        const alpha = Math.max(0.1, Math.min(1, (z2 + 400) / 800));

        projected.push({ x: x2d, y: y2d, scale, alpha, z: z2 });
      }

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.3 * Math.min(p1.alpha, p2.alpha);
            ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < particleCount; i++) {
        const p = projected[i];
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1, 2.2 * p.scale), 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none -z-10" />;
}

function Card3D({ children }) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState("");

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg)");
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: "transform 0.15s ease-out",
        transformStyle: "preserve-3d",
      }}
      className="group relative rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 
      hover:border-cyan-500/50 p-6 md:p-7 shadow-2xl transition-colors duration-300"
    >
      {children}
    </div>
  );
}

const projects = [
  {
    id: 1,
    title: "Prepsage (ExamNote AI)",
    subheading: "AI-Powered Exam-Oriented Notes Generator",
    image: aiExamNoteImg,
    link: "https://aiexamnotesfrontend-5y6z.onrender.com/auth",
    points: [
      "Built a full-stack web app that converts study material into high-yield, structured exam notes using Google Gemini AI.",
      "Designed an interactive UI featuring free credits allocation, project notes generation, and automated PDF export.",
      "Engineered robust Node.js/Express REST APIs for AI prompt orchestration and persistent MongoDB storage.",
      "Integrated secure Google OAuth & Email authentication using Firebase.",
    ],
    tags: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Google Gemini API",
      "Firebase Auth",
      "Tailwind CSS",
      "REST APIs",
    ],
  },
  {
    id: 2,
    title: "SkillForge",
    subheading: "Full-Stack Learning Management System (LMS)",
    image: lmsImg,
    link: "https://virtualcourse-1-zl9t.onrender.com/",
    points: [
      "Architected a scalable LMS with Role-Based Access Control (RBAC) allowing instructors to create/sell courses and students to enroll.",
      "Integrated Razorpay payment gateway for smooth course checkout and Cloudinary for optimized multimedia & video hosting.",
      "Designed responsive, modern dashboards using Tailwind CSS and Redux Toolkit for seamless global state management.",
      "Built production-ready REST APIs secured with JSON Web Tokens (JWT) and Bcrypt encryption.",
    ],
    tags: [
      "React.js",
      "Redux Toolkit",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "JWT Auth",
      "Razorpay",
      "Cloudinary",
    ],
  },
];

export default function PortfolioShowcase() {
  return (
    <section
      id="Projects"
      className="relative bg-[#070b12] text-slate-100 pt-16 pb-8 px-4 md:px-8 font-sans
       overflow-hidden"
    >
      <Canvas3DBackground />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r
           from-white via-cyan-200 to-slate-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Full-Stack Applications, AI Integrations & EdTech Platforms
          </p>
        </div>

        <div className="space-y-8">
          {projects.map((project) => (
            <Card3D key={project.id}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-6 relative aspect-[16/10] overflow-hidden rounded-xl
                 bg-slate-950/80 border border-slate-800 flex items-center justify-center">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out
                     group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px] opacity-0
                   group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-cyan-600
                       hover:bg-cyan-500 text-white text-sm font-semibold shadow-lg transform translate-y-3 
                       group-hover:translate-y-0 transition-all duration-300"
                    >
                      <span>View Live</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-6 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="inline-block px-3 py-0.5 text-xs font-semibold text-cyan-300 bg-cyan-950/70 
                    rounded-full border border-cyan-800/60 mb-2">
                      About it
                    </span>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {project.title}
                    </h3>
                    <p className="text-xs font-medium text-cyan-400 mb-2">
                      {project.subheading}
                    </p>
                    <ul className="space-y-1 text-slate-300 text-xs leading-relaxed list-disc list-inside">
                      {project.points.map((point, index) => (
                        <li key={index}>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-1">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-slate-800/80 text-slate-300 text-[11px] font-medium
                           rounded-md border border-slate-700/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card3D>
          ))}
        </div>
      </div>
    </section>
  );
}