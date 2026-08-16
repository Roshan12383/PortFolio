import  { useState, useEffect, useRef } from "react";

function Canvas3DBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const particleCount = 55;
    const particles = [];
    const maxDistance = 160;
    const fov = 350;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.4,
        y: (Math.random() - 0.5) * height * 1.4,
        z: Math.random() * 800 - 400,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        vz: (Math.random() - 0.5) * 0.45,
      });
    }

    let mouseX = 0;
    let mouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;

    const onMouseMove = (e) => {
      mouseX = (e.clientX - width / 2) * 0.00025;
      mouseY = (e.clientY - height / 2) * 0.00025;
    };
    window.addEventListener("mousemove", onMouseMove);

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

        const cosY = Math.cos(targetRotationY);
        const sinY = Math.sin(targetRotationY);
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;

        const cosX = Math.cos(targetRotationX);
        const sinX = Math.sin(targetRotationX);
        const y1 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX;

        const scale = fov / (fov + z2 + 400);
        const x2d = x1 * scale + width / 2;
        const y2d = y1 * scale + height / 2;
        const alpha = Math.max(0.1, Math.min(1, (z2 + 400) / 800));

        projected.push({ x: x2d, y: y2d, scale, alpha });
      }

      // Connecting 3D Lines
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

      // Nodes
      for (let i = 0; i < particleCount; i++) {
        const p = projected[i];
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1, 2.2 * p.scale), 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none -z-10" />;
}


function Card3D({ children, className = "" }) {
  const ref = useRef(null);
  const [transform, setTransform] = useState("");

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
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
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: "transform 0.15s ease-out",
        transformStyle: "preserve-3d",
      }}
      className={`group relative rounded-2xl bg-[#161B22]/85 backdrop-blur-xl border border-[#30363D]
         hover:border-cyan-500/50 shadow-2xl transition-colors duration-300 ${className}`}
    >
      {children}
    </div>
  );
}


export default function About() {
  const roleCards = [
    {
      badge: "Specialization",
      title: "MERN Stack & AI Developer",
      desc: "Architecting scalable web applications with robust component design, dynamic state management, and secure microservices.",
    },
    {
      badge: "Education",
      title: "B.Tech in CSE (2023–2027)",
      desc: "Currently pursuing B.Tech in Computer Science & Engineering at Geetanjali Institute of Technical Studies (GITS), Udaipur.",
    },
    {
      badge: "Focus Areas",
      title: "EdTech & Smart AI Tools",
      desc: "Building production-ready systems including AI-powered exam notes generators (Prepsage) and full-fledged LMS platforms (SkillForge).",
    },
  ];

  return (
    <section
      id="About"
      className="relative min-h-screen bg-[#070b12] text-slate-100 py-24 px-4 sm:px-8 max-w-6xl mx-auto font-sans flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background Canvas */}
      <Canvas3DBackground />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        
        {/* Left Side: Bio & Summary (Spans 7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="inline-block px-4 py-1.5 bg-cyan-950/80 border border-cyan-700/60 rounded-full text-cyan-300 text-xs font-semibold shadow-sm">
            B.Tech CSE (2023–2027) • MERN Specialist
          </div>

          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
            @RoshanKumar
          </h2>

          <div className="space-y-4 text-base sm:text-lg leading-relaxed max-w-xl">
            <p className="text-slate-200">
              I am{" "}
              <span className="text-white font-bold">Roshan Kumar</span> from{" "}
              <span className="text-cyan-400 font-semibold">Pali, Rajasthan</span>. Currently pursuing{" "}
              <span className="text-white font-medium">B.Tech in Computer Science & Engineering</span> at{" "}
              <span className="text-cyan-400 font-semibold">Geetanjali Institute of Technical Studies,Udaipur</span>.
            </p>

            <p className="text-slate-300">
              A dedicated Full-Stack MERN & AI Integrations Developer who loves building production-ready
               web apps, LMS systems, and smart productivity tools.
            </p>
          </div>
        </div>

        {/* Right Side: 3 Role & Education Cards (Spans 5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {roleCards.map((role) => (
            <Card3D key={role.title} className="p-6 pt-7">
              {/* Top Floating Badge */}
              <div className="absolute -top-3 left-4 z-20">
                <span className="inline-block px-3.5 py-0.5 rounded-full bg-cyan-400 text-slate-950 text-[11px]
                 font-bold shadow-md">
                  {role.badge}
                </span>
              </div>

              <div style={{ transform: "translateZ(15px)" }} className="space-y-1.5">
                <h3 className="text-base font-bold text-white tracking-wide">
                  {role.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {role.desc}
                </p>
              </div>
            </Card3D>
          ))}
        </div>

      </div>
    </section>
  );
}