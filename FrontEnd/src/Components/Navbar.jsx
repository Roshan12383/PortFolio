import { useState, useEffect, useRef } from 'react';

function Navbar() {
  const links = [ 'About', 'Skills', 'Projects'];
  const [activeSection, setActiveSection] = useState('Home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [transform, setTransform] = useState({ rx: 0, ry: 0, tx: 0, ty: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const lastScrollY = useRef(0);
  const navRef = useRef(null);

 
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100) {
        setIsScrolled(true);
        if (currentScrollY > lastScrollY.current && !mobileMenuOpen) {
          setIsVisible(false); 
        } else {
          setIsVisible(true);
        }
      } else {
        setIsScrolled(false);
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;

      // Scroll Progress Bar Calculation
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((currentScrollY / totalHeight) * 100);
      }

      // Active Section Spy
      const scrollPosition = currentScrollY + 140;
      links.forEach((section) => {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  // 2. 3D Gyroscopic Physics Tilt & Glare Sheen
  const handleMouseMove = (e) => {
    if (!navRef.current || window.innerWidth < 768) return;
    const rect = navRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setTransform({
      rx: ((y - centerY) / centerY) * -12,
      ry: ((x - centerX) / centerX) * 12,
      tx: ((x - centerX) / centerX) * 6,
      ty: ((y - centerY) / centerY) * 6,
    });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.85,
    });
  };

  const handleMouseLeave = () => {
    setTransform({ rx: 0, ry: 0, tx: 0, ty: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <>
   
      <div className="fixed top-0 inset-x-0 z-[60] h-[2px] bg-[#161B22]">
        <div
          className="h-full bg-gradient-to-r from-[#38BDF8] via-indigo-500 to-[#38BDF8]
           shadow-[0_0_12px_#38bdf8] transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        className={`fixed top-4 inset-x-0 z-50 flex justify-center px-4 transition-all duration-300 
          pointer-events-none ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'
        }`}
      >
        <div
          ref={navRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(900px) translate3d(${transform.tx}px, ${transform.ty}px, 0) 
            rotateX(${transform.rx}deg) rotateY(${transform.ry}deg)`,
            transition: 'transform 0.15s cubic-bezier(0.2, 0.9, 0.2, 1)',
            transformStyle: 'preserve-3d',
          }}
          className="relative pointer-events-auto overflow-hidden rounded-full p-[1px] 
          bg-gradient-to-r from-transparent via-[#38BDF8]/40 to-transparent shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
        >
         
          <div
            className="pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300 z-30"
            style={{
              opacity: glare.opacity,
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(56, 189, 248, 0.35) 0%,
               transparent 65%)`,
            }}
          />

         
          <nav className="relative flex items-center justify-between gap-4 sm:gap-8 px-5 py-2.5 
          rounded-full
           bg-[#0D1117]/90 backdrop-blur-xl border border-[#30363D]/90">
            
            
            <a
              href="#Home"
              style={{ transform: 'translateZ(20px)' }}
              className="flex items-center gap-2 group text-decoration-none"
            >
              <div className="h-7 w-7 rounded-full bg-[#161B22] border border-[#30363D] flex 
              items-center 
              justify-center text-[#38BDF8] font-mono font-bold text-xs group-hover:border-[#38BDF8] 
              group-hover:shadow-[0_0_10px_rgba(56,189,248,0.4)] transition-all">
                R
              </div>
              <span className="font-bold text-xs text-[#E6EDF3] tracking-tight hidden sm:inline-block">
                Roshan<span className="text-[#38BDF8]">.dev</span>
              </span>
            </a>

            <ul
              style={{ transform: 'translateZ(18px)' }}
              className="hidden md:flex items-center gap-1.5 text-xs font-semibold list-none m-0 p-0"
            >
              {links.map((item) => {
                const isActive = activeSection === item;
                return (
                  <li key={item} className="relative">
                    <a
                      href={`#${item}`}
                      className={`relative z-10 px-3.5 py-1.5 rounded-full transition-all duration-200 block ${
                        isActive
                          ? 'text-[#E6EDF3] font-bold'
                          : 'text-[#8B949E] hover:text-[#E6EDF3]'
                      }`}
                    >
                      {item}
                      {isActive && (
                        <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-3 h-[2px] bg-[#38BDF8] 
                        rounded-full 
                        shadow-[0_0_8px_#38bdf8]" />
                      )}
                    </a>

                  
                    {isActive && (
                      <span className="absolute inset-0 rounded-full bg-[#161B22] border border-[#30363D] z-0 
                      shadow-inner" />
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Action CTA Button */}
            <div style={{ transform: 'translateZ(20px)' }} className="flex items-center gap-2">
              <a
                href="#Contact"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full
                 bg-[#161B22] border border-[#30363D]
                 hover:border-[#38BDF8]/60 text-[#38BDF8] text-xs font-bold transition-all
                  duration-200 
                 active:scale-95 shadow-xs"
              >
                <span>Let's Talk</span>
                <span className="text-[10px]">↗</span>
              </a>

              {/* Mobile Hamburger Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-1.5 rounded-full bg-[#161B22] border border-[#30363D] text-[#8B949E]
                 hover:text-white 
                cursor-pointer"
                aria-label="Toggle menu"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  )}
                </svg>
              </button>
            </div>

          </nav>
        </div>
      </header>

      
      {mobileMenuOpen && (
        <div className="fixed inset-x-4 top-20 z-50 md:hidden p-4 rounded-2xl bg-[#0D1117]/95 border
         border-[#30363D] 
        backdrop-blur-2xl shadow-2xl">
          <ul className="flex flex-col gap-2 list-none p-0 m-0">
            {links.map((item) => (
              <li key={item}>
                <a
                  href={`#${item}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm 
                    font-semibold transition-all ${
                    activeSection === item
                      ? 'bg-[#161B22] text-[#38BDF8] border border-[#30363D]'
                      : 'text-[#8B949E] hover:text-white'
                  }`}
                >
                  <span>{item}</span>
                  {activeSection === item && <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8]
                   shadow-[0_0_6px_#38bdf8]" />}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Navbar;