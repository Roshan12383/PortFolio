import { useState, useEffect, useRef } from 'react';

function SubtleMatrixCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const mouse = { x: width / 2, y: height / 2, tx: width / 2, ty: height / 2 };

    const PARTICLE_COUNT = 36;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 1.8 + 1,
      alpha: Math.random() * 0.5 + 0.2,
    }));

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - rect.left;
      mouse.ty = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', onResize);

    let tick = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      tick += 0.018;

      mouse.x += (mouse.tx - mouse.x) * 0.07;
      mouse.y += (mouse.ty - mouse.y) * 0.07;

      ctx.beginPath();
      const segments = 24;
      for (let i = 0; i <= segments; i++) {
        const x = (width / segments) * i;
        const dist = Math.abs(x - mouse.x);
        const pull = Math.max(0, 1 - dist / 180) * 24;
        const y = height * 0.52 + Math.sin(tick + i * 0.32) * 12 + (mouse.y > height * 0.5 ? -pull : pull);

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
      ctx.lineWidth = 1.6;
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#38bdf8';
      ctx.stroke();
      ctx.shadowBlur = 0;

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 100) {
          const force = (100 - dist) / 100;
          p.x += (dx / dist) * force * 2;
          p.y += (dy / dist) * force * 2;
        }

        ctx.fillStyle = `rgba(139, 148, 158, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const lineDist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (lineDist < 75) {
            const lineAlpha = (1 - lineDist / 75) * 0.16;
            ctx.strokeStyle = `rgba(139, 148, 158, ${lineAlpha})`;
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
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
}

function GyroPill({ children, className = '', glowColor = 'rgba(56, 189, 248, 0.4)', magnetic = 7 }) {
  const ref = useRef(null);
  const [transform, setTransform] = useState({ rx: 0, ry: 0, tx: 0, ty: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setTransform({
      rx: ((y - centerY) / centerY) * -12,
      ry: ((x - centerX) / centerX) * 12,
      tx: ((x - centerX) / centerX) * magnetic,
      ty: ((y - centerY) / centerY) * magnetic,
    });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.8,
    });
  };

  const handleMouseLeave = () => {
    setTransform({ rx: 0, ry: 0, tx: 0, ty: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(750px) translate3d(${transform.tx}px, ${transform.ty}px, 0)
         rotateX(${transform.rx}deg) rotateY(${transform.ry}deg)`,
        transition: 'transform 0.15s cubic-bezier(0.2, 0.9, 0.2, 1)',
        transformStyle: 'preserve-3d',
      }}
      className={`relative overflow-hidden group ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-30"
        style={{
          opacity: glare.opacity,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, ${glowColor} 0%,
           transparent 65%)`,
        }}
      />
      {children}
    </div>
  );
}

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const email = 'roshankumarparmar123456@gmail.com';

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socials = [
    { name: 'GitHub', href: 'https://github.com/Roshan12383' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/roshan-kumar-620334298/' },
    { name: 'LeetCode', href: 'https://leetcode.com/u/RoshanKumawat1/' },
    { name: 'Instagram', href: 'https://www.instagram.com/ecologicalweb/' },
  ];

  return (
    <footer className="relative w-full bg-[#070b12] text-[#8B949E] border-t border-[#1e293b]
     mt-12 pt-8 pb-6 overflow-hidden font-sans selection:bg-[#38BDF8]/20 selection:text-[#38BDF8]">
      {/* 3D Wave Particle Background */}
      <SubtleMatrixCanvas />

      {/* Modern Cyan Glow Divider Line */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent
       via-[#38BDF8]/70 to-transparent shadow-[0_0_15px_rgba(56,189,248,0.6)]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Main Footer Row */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-5 pb-6 
        border-b border-[#1e293b]/70">
          
          {/* Identity & Status */}
          <div className="space-y-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2.5">
              <h3 className="text-lg font-bold tracking-tight text-[#E6EDF3]">
                Roshan Kumar
              </h3>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full
               bg-[#161B22] border border-[#30363D] text-[#38BDF8] text-[10px] font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8] animate-ping" />
                Open to Full-Time Roles & Internships
              </span>
            </div>
            <p className="text-xs text-[#8B949E] font-medium">
              <span>MERN Stack Developer</span>
              <span className="mx-2 text-[#30363D]">•</span>
              <span>B.Tech Student (2023–2027)</span>
            </p>
          </div>

          {/* Copy Email Pill */}
          <GyroPill magnetic={5} glowColor="rgba(56, 189, 248, 0.35)" className="rounded-full">
            <button
              onClick={handleCopy}
              style={{ transform: 'translateZ(14px)' }}
              className="flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#30363D]
               bg-[#161B22]/90 backdrop-blur-md text-xs font-semibold text-[#E6EDF3] hover:border-[#38BDF8]/60 
               transition-all active:scale-95 cursor-pointer shadow-lg"
            >
              <span className={`h-2 w-2 rounded-full transition-colors ${copied ? 'bg-emerald-400' : 'bg-[#38BDF8] animate-pulse'}`} />
              <span className="font-mono text-xs">{copied ? 'Email Copied!' : email}</span>
              <span className="text-[10px] font-mono text-[#38BDF8] bg-[#38BDF8]/10 border
               border-[#38BDF8]/20 px-1.5 py-0.5 rounded-md font-bold">
                {copied ? '✓' : 'COPY'}
              </span>
            </button>
          </GyroPill>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            {socials.map((item) => (
              <GyroPill key={item.name} magnetic={6} glowColor="rgba(56, 189, 248, 0.3)" className="rounded-xl">
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{ transform: 'translateZ(12px)' }}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-xl
                   border border-[#30363D] bg-[#161B22]/80 backdrop-blur-md text-[#8B949E] 
                   hover:text-[#E6EDF3] hover:border-[#38BDF8]/50 transition-all duration-150
                    hover:-translate-y-0.5"
                >
                  <span>{item.name}</span>
                  <span className="text-[10px] opacity-60 text-[#38BDF8]">↗</span>
                </a>
              </GyroPill>
            ))}
          </div>

        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-2.5 
        text-[11px] font-medium text-[#6E7681]">
          <p>© 2026 Roshan Kumar. All rights reserved.</p>

          <GyroPill magnetic={3} glowColor="rgba(56, 189, 248, 0.25)" className="rounded-full">
            <button
              onClick={scrollToTop}
              style={{ transform: 'translateZ(10px)' }}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#30363D]
               bg-[#161B22]/80 hover:bg-[#21262D] hover:text-[#E6EDF3] transition-all 
               duration-150 cursor-pointer active:scale-95"
            >
              <span>Back to top</span>
              <span className="text-xs text-[#38BDF8] font-bold">↑</span>
            </button>
          </GyroPill>
        </div>

      </div>
    </footer>
  );
}