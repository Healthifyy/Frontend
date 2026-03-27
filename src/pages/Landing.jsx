import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  // Premium, ultra-slow easing for the immersive feel
  const EASING = [0.16, 1, 0.3, 1];

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans relative overflow-hidden selection:bg-slate-200">
      
      {/* ------------------------------------------------------------- */}
      {/* BACKGROUND & 3D HERO IMAGE                                    */}
      {/* ------------------------------------------------------------- */}
      {/* We use a large absolute positioned image, slightly right of center,
          with CSS masks or heavy gradients to blend it perfectly into white like the reference */}
      <div className="absolute inset-0 z-0 flex items-center justify-center lg:justify-end lg:pr-0 pointer-events-none">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 2.5, ease: EASING }}
          className="relative w-full h-[100vh] min-h-[800px] lg:w-[1200px] lg:h-[1200px] -mr-40 flex items-center justify-center mix-blend-multiply"
        >
          {/* Using a radial gradient mask to aggressively fade out the edges like the reference image */}
          <div 
            className="absolute inset-0 z-10" 
            style={{ 
              background: 'radial-gradient(ellipse at center, transparent 30%, #fafafa 60%)',
              pointerEvents: 'none'
            }} 
          />
          <div 
            className="absolute inset-0 z-10" 
            style={{ 
              background: 'linear-gradient(to right, #fafafa 15%, transparent 40%, transparent 80%, #fafafa 100%)',
              pointerEvents: 'none'
            }} 
          />
          <div 
            className="absolute inset-0 z-10" 
            style={{ 
              background: 'linear-gradient(to bottom, #fafafa 10%, transparent 30%, transparent 80%, #fafafa 100%)',
              pointerEvents: 'none'
            }} 
          />
          {/* The generated 3D render */}
          <img 
            src="/hero_profile.png" 
            alt="AI Hero Profile" 
            className="w-full h-full object-contain object-right opacity-90 scale-[1.3] lg:scale-[1.1] translate-x-20"
          />
        </motion.div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* CUSTOM MINIMALIST NAVBAR                                      */}
      {/* ------------------------------------------------------------- */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: EASING }}
        className="relative z-50 w-full px-6 lg:px-12 py-8 flex items-center justify-between"
      >
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="text-slate-300">
            {/* The reference has a geometric wireframe lotus, we'll use a stylized Heart */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-8 h-8">
              <path d="M12 21a9 9 0 1 1 0-18c1.05 0 2.06.18 3 .5l-3 4.5V21z" />
              <path d="M12 21a9 9 0 0 0 6.36-15.36L12 12V21z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <span className="font-serif font-semibold text-xl text-[#1a1a1a] tracking-tight">Healthify.</span>
        </div>

        {/* Center Pill Links (matching solomaze) */}
        <div className="hidden lg:flex items-center bg-[#f1f1f1] rounded-full px-2 py-1.5 shadow-sm border border-black/5">
          {['Home', 'About us', 'Platform', 'Pricing', 'Resources', 'Web3.0'].map((item, i) => (
            <button key={i} className={`px-5 py-2 text-[13px] rounded-full transition-colors ${i === 0 ? 'font-bold text-black' : 'text-slate-500 hover:text-black font-medium'}`}>
              {item}
            </button>
          ))}
        </div>

        {/* Right Button */}
        <button 
          onClick={() => navigate('/worker')}
          className="hidden lg:block bg-[#f1f1f1] hover:bg-[#e5e5e5] text-slate-800 text-[13px] font-bold px-8 py-2.5 rounded-full transition-colors"
        >
          Worker Login
        </button>
      </motion.nav>

      {/* ------------------------------------------------------------- */}
      {/* HERO TYPOGRAPHY & CTA (Left Side)                           */}
      {/* ------------------------------------------------------------- */}
      <div className="relative z-40 max-w-[1400px] mx-auto px-6 lg:px-12 h-[calc(100vh-120px)] flex flex-col justify-center pb-20">
        
        <div className="max-w-[480px]">
          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: EASING }}
          >
            <h1 className="text-[44px] lg:text-[56px] leading-[1.05] tracking-[-0.03em] text-[#1a1a1a] font-medium mb-6">
              Technologically<br />
              driven <span className="font-bold">Health Triage</span><br />
              <span className="font-bold">Solution with AI</span>
            </h1>
          </motion.div>

          {/* Subtext */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9, ease: EASING }}
            className="text-[14px] leading-relaxed text-[#666666] mb-10 max-w-[380px] font-medium tracking-tight"
          >
            Streamlines clinical interventions by consolidating symptom mapping within one offline platform, reducing the need for arbitrary clinic visits.
          </motion.p>

          {/* Buttons Row */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1, ease: EASING }}
            className="flex items-center gap-5"
          >
            {/* Dark request demo button with massive shadow like the reference */}
            <button 
              onClick={() => navigate('/check')}
              className="bg-[#0f0f0f] text-white rounded-[14px] px-8 py-4 text-[14px] font-medium hover:scale-105 transition-transform duration-300 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6)]"
            >
              Start Triage
            </button>

            {/* Blue NHS-style badge */}
            <div className="flex flex-col items-start gap-1">
              <span className="text-[10px] text-slate-500 font-semibold px-2">Approved by</span>
              <div className="bg-[#1f5ce6] text-white text-[12px] font-bold px-4 py-2 rounded-lg shadow-[0_10px_20px_-5px_rgba(31,92,230,0.5)]">
                MoHFW
              </div>
            </div>
          </motion.div>
        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* BOTTOM RIGHT FLOATING INFO                                  */}
      {/* ------------------------------------------------------------- */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 1.5, ease: EASING }}
        className="absolute bottom-12 right-6 lg:right-24 z-40 text-right hidden md:block"
      >
        <p className="text-[15px] font-semibold text-[#1a1a1a] leading-tight mb-4">
          Towards a New<br />
          Holistic Healthstyle
        </p>
        <button 
          onClick={() => navigate('/worker')}
          className="bg-transparent border border-black/10 hover:border-black/30 rounded-full px-5 py-2 text-[12px] font-semibold text-[#1a1a1a] transition-colors flex items-center gap-2 ml-auto inline-flex"
        >
          Explore Platform <ArrowRight className="w-3 h-3" />
        </button>
      </motion.div>

    </div>
  );
}
