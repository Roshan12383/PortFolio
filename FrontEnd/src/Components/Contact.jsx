import  { useState, useRef } from "react";
import { serverUrl } from "../App";
export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setTilt({
      rx: ((y - centerY) / centerY) * -4,
      ry: ((x - centerX) / centerX) * 4,
    });

    setGlow({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.45,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
    setGlow((prev) => ({ ...prev, opacity: 0 }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const res = await fetch(serverUrl+"/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({
          type: "success",
          message: "Thank you! Your message has been sent successfully.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus({
          type: "error",
          message: data.message || "Failed to send message.",
        });
      }
    } catch (error) {
      console.error("Error sending contact form:", error);
      setStatus({
        type: "error",
        message: "Unable to reach server. Please check your connection.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="Contact" className="relative w-full py-10 px-4 sm:px-6 max-w-3xl mx-auto font-sans">
      
   
      <div className="text-center mb-6 space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-950/80 
        border border-cyan-700/60 text-cyan-300 text-[11px] font-semibold shadow-sm">
          <span>Get In Touch</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
          Let’s Work Together
        </h2>

        <p className="text-slate-300 text-xs font-medium max-w-md mx-auto">
          Have a project in mind or want to discuss opportunities? Drop a message!
        </p>
      </div>

      
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: "transform 0.15s ease-out",
          transformStyle: "preserve-3d",
        }}
        className="relative rounded-2xl bg-[#0D1117]/90 border border-[#30363D]
         hover:border-cyan-500/50 p-5 sm:p-7 shadow-2xl backdrop-blur-xl transition-all duration-300"
      >
  
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 z-0"
          style={{
            opacity: glow.opacity,
            background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(56, 189, 248, 0.25) 0%,
             transparent 65%)`,
          }}
        />

        <form onSubmit={handleSubmit} className="relative z-10 space-y-4" style={{ transform: "translateZ(10px)" }}>
        
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300">
                Your Name <span className="text-cyan-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. John Doe"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800
                 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-slate-100 
                 placeholder:text-slate-500 text-xs outline-none transition duration-200"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300">
                Your Email <span className="text-cyan-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800
                 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-slate-100
                  placeholder:text-slate-500 text-xs outline-none transition duration-200"
              />
            </div>
          </div>

        
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-300">
              Your Message <span className="text-cyan-400">*</span>
            </label>
            <textarea
              name="message"
              required
              rows={3}
              value={formData.message}
              onChange={handleChange}
              placeholder="Hi Roshan, I saw your portfolio and would like to discuss..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800
               focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-slate-100 
               placeholder:text-slate-500 text-xs outline-none resize-none transition duration-200"
            />
          </div>

         
          {status.message && (
            <div
              className={`p-2 rounded-lg text-[11px] font-medium text-center border ${
                status.type === "success"
                  ? "bg-emerald-950/60 border-emerald-700/60 text-emerald-300"
                  : "bg-red-950/60 border-red-700/60 text-red-300"
              }`}
            >
              {status.message}
            </div>
          )}

          {/* Compact Button Container */}
          <div className="flex justify-end pt-1">
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-sky-600
               hover:from-cyan-500 hover:to-sky-500 text-white font-semibold text-xs shadow-md
                shadow-cyan-950/30 hover:shadow-cyan-500/20 active:scale-[0.98] transition duration-200
                 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-3.5 w-3.5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                     strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373
                     0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 h-3.5 text-cyan-200"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

    </section>
  );
}
