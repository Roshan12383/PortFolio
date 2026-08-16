import { useEffect, useRef } from "react";


function HeroCanvas() {
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

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha * 0.7})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(56, 189, 248, ${(1 - dist / 120) * 0.15})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none -z-10" />;
}

export default function Hero() {
  return (
    <section
      id="Home"
      className="relative min-h-[88vh] flex items-center pt-24 pb-16 px-4 sm:px-8 max-w-6xl
       mx-auto font-sans overflow-hidden"
    >
      <HeroCanvas />

      <div className="space-y-6 relative z-10 text-left max-w-3xl">
        
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70
         border border-cyan-700/60 text-cyan-300 text-xs font-semibold shadow-xs">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
          <span>Open to Job & Internship Opportunities</span>
        </div>

        {/* Headings */}
        <div className="space-y-2">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-slate-400">
            HI, I AM
          </h2>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none">
            Roshan <span className="bg-gradient-to-r from-cyan-400 via-sky-300
             to-indigo-400 bg-clip-text text-transparent">Kumawat</span>
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-cyan-300 tracking-wide
           pt-1">
            Full-Stack MERN Developer
          </p>
        </div>

        {/* Bio Description */}
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
          Crafting scalable web architectures, AI-integrated exam engines, and LMS platforms 
          with high-performance UI and resilient backend services.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          {/* Download Resume Button */}
          <a
            href="/RoshanKumawat.pdf"
            download="Roshan_Kumawat_Resume.pdf"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r
             from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 text-white 
             font-bold text-xs sm:text-sm shadow-lg shadow-cyan-950/50 hover:shadow-cyan-500/25 
             active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <span>Download Resume</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </a>

          {/* Get In Touch Button */}
          <a
            href="#Contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#161B22] border
             border-[#30363D] hover:border-cyan-500/60 text-slate-200 hover:text-white
              font-semibold text-xs sm:text-sm active:scale-95 transition-all duration-200 
              shadow-sm"
          >
            <span>Get In Touch</span>
            <span className="text-cyan-400">↗</span>
          </a>
        </div>

        {/* Micro Tech Pills with Core: Label */}
        <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
          <span className="text-slate-500 font-semibold mr-1">Core:</span>
          <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">React</span>
          <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">Node.js</span>
          <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">Express.js</span>
          <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">MongoDB</span>
        </div>

      </div>
    </section>
  );
}