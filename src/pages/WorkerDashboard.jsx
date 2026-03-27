import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  motion, AnimatePresence, useMotionValue, 
  useSpring, useTransform, useAnimationFrame 
} from 'framer-motion';
import { 
  Heart, Bell, Grid, BarChart2, Sparkles, Settings,
  AlertTriangle, Clock, CheckCircle, TrendingUp, Zap,
  UserPlus, ArrowUpRight, ArrowUp, ArrowDown,
  Search, SlidersHorizontal, AlertCircle, ArrowRight
} from 'lucide-react';

// --- DATA CONSTANTS ---

const DEMO_WORKER = {
  name: "Priya Sharma", initials: "PS",
  workerId: "ASHA-LDH-001", village: "Bhawanipur",
  block: "Ludhiana West", role: "ASHA Worker"
};

const DEMO_SESSIONS = [
  { id:1, name:"Ramesh Kumar", initials:"RK", age:45, gender:"M",
    urgency:"emergency", condition:"Pneumonia", 
    time:"09:15 AM", status:"referred", village:"Bhawanipur" },
  { id:2, name:"Sunita Devi", initials:"SD", age:28, gender:"F",
    urgency:"urgent", condition:"Dengue Fever",
    time:"10:30 AM", status:"pending", village:"Nangal" },
  { id:3, name:"Arjun Singh", initials:"AS", age:8, gender:"M",
    urgency:"routine", condition:"Common Cold",
    time:"11:45 AM", status:"recovered", village:"Bhawanipur" },
  { id:4, name:"Priya Bai", initials:"PB", age:35, gender:"F",
    urgency:"urgent", condition:"Typhoid",
    time:"01:20 PM", status:"pending", village:"Machhiwara" },
  { id:5, name:"Mohan Lal", initials:"ML", age:62, gender:"M",
    urgency:"emergency", condition:"Cardiac Risk",
    time:"02:05 PM", status:"referred", village:"Nangal" }
];

const HOURLY_DATA = [
  { time:"9AM",  routine:3, emergency:1 },
  { time:"11AM", routine:4, emergency:0 },
  { time:"1PM",  routine:2, emergency:1 },
  { time:"3PM",  routine:2, emergency:0 },
  { time:"5PM",  routine:1, emergency:0 }
];

const EASING = [0.16, 1, 0.3, 1]; // Premium expo-out

/* -------------------------------------------------------------------------- */
/* COUNTING NUMBER HOOK                                                       */
/* -------------------------------------------------------------------------- */
const AnimatedNumber = ({ target, duration = 1000, delay = 0, className }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let startTime = null;
    let animationFrame;
    const startAnimation = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const easeOut = (t) => 1 - Math.pow(1 - t, 3);
      
      if (progress < duration) {
        const current = target * easeOut(progress / duration);
        setValue(Math.floor(current));
        animationFrame = requestAnimationFrame(startAnimation);
      } else {
        setValue(target);
      }
    };

    const timeout = setTimeout(() => {
      animationFrame = requestAnimationFrame(startAnimation);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [target, duration, delay]);

  return (
    <motion.span
      className={className}
      initial={{ scale: 1 }}
      animate={{ scale: value === target ? [1, 1.08, 1] : 1 }}
      transition={{ duration: 0.3 }}
    >
      {value}
    </motion.span>
  );
};

/* -------------------------------------------------------------------------- */
/* NAVBAR                                                                     */
/* -------------------------------------------------------------------------- */
const TopNavbar = ({ worker }) => {
  const navigate = useNavigate();
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: EASING }}
      className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-[#f1f5f9] z-50 flex items-center justify-between px-6 shadow-[0_1px_8px_rgba(0,0,0,0.06)]"
    >
      {/* Left Logo */}
      <div 
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate('/')}
      >
        <Heart className="w-5 h-5 text-[#10b981] fill-[#10b981]" />
        <span className="font-serif font-semibold text-lg text-[#0f172a]">Healthify</span>
      </div>

      {/* Center Nav Cluster */}
      <div className="hidden md:flex items-center gap-2">
        <motion.button 
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-[#10b981] text-white shadow-md transform scale-105"
        >
          <Grid className="w-5 h-5 fill-current" />
        </motion.button>
        <motion.button 
          whileHover={{ backgroundColor: '#e8edf2' }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-[#f0f2f5] text-[#64748b] transition-colors"
        >
          <BarChart2 className="w-5 h-5" />
        </motion.button>
        <motion.button 
          whileHover={{ backgroundColor: '#e8edf2' }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-[#f0f2f5] text-[#64748b] transition-colors"
        >
          <Sparkles className="w-5 h-5" />
        </motion.button>
        <motion.button 
          whileHover={{ backgroundColor: '#e8edf2' }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-[#f0f2f5] text-[#64748b] transition-colors"
        >
          <Settings className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        <div className="hidden sm:block bg-[#f0f2f5] rounded-full px-3 py-1.5 text-[13px] text-[#64748b] font-medium tracking-wide">
          Sat, 27 Mar
        </div>
        
        <div className="relative cursor-pointer">
          <Bell className="w-5 h-5 text-[#64748b]" />
          <div className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 bg-[#ef4444] rounded-full text-[10px] text-white font-bold border-2 border-white">
            2
          </div>
        </div>

        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#10b981] to-[#059669] flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-[#10b981] hover:ring-offset-2 transition-all">
          <span className="text-sm font-bold text-white">{worker.initials}</span>
        </div>
      </div>
    </motion.div>
  );
};

/* -------------------------------------------------------------------------- */
/* DONUT CHART COMPONENT                                                      */
/* -------------------------------------------------------------------------- */
const DonutChart = () => {
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  // Let segments be Emergency (2 patients), Urgent (4), Routine (6) out of 12.
  const emergencyPct = 2 / 12;
  const urgentPct = 4 / 12;
  const routinePct = 6 / 12;

  const emergencyDash = circumference * emergencyPct;
  const urgentDash = circumference * urgentPct;
  const routineDash = circumference * routinePct;

  const urgentOffset = circumference - emergencyDash;
  const routineOffset = circumference - (emergencyDash + urgentDash);

  return (
    <div className="relative w-[200px] h-[200px] flex items-center justify-center">
      {/* Outer Pulse Ring */}
      <motion.div 
        className="absolute w-[220px] h-[220px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <svg className="absolute w-[200px] h-[200px] -rotate-90">
        {/* Track */}
        <circle 
          cx="100" cy="100" r={radius} 
          fill="none" stroke="#2a3550" strokeWidth="16" 
        />
        {/* Emergency Arc */}
        <motion.circle 
          cx="100" cy="100" r={radius} 
          fill="none" stroke="#ef4444" strokeWidth="16" strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - emergencyDash }}
          transition={{ duration: 1.2, delay: 0.8, ease: EASING }}
        />
        {/* Urgent Arc */}
        <motion.circle 
          cx="100" cy="100" r={radius} 
          fill="none" stroke="#f59e0b" strokeWidth="16" strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: urgentOffset }}
          transition={{ duration: 1.2, delay: 0.9, ease: EASING }}
        />
        {/* Routine Arc */}
        <motion.circle 
          cx="100" cy="100" r={radius} 
          fill="none" stroke="#22c55e" strokeWidth="16" strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: routineOffset }}
          transition={{ duration: 1.2, delay: 1.0, ease: EASING }}
        />
      </svg>
      
      {/* Center Circle Cutout */}
      <div className="absolute w-[130px] h-[130px] bg-[#1a2235] rounded-full flex flex-col items-center justify-center">
        <AnimatedNumber target={12} duration={1200} delay={800} className="font-serif text-[36px] font-bold text-white leading-none mb-1" />
        <span className="text-[11px] text-white/50 tracking-wide uppercase">patients</span>
        <span className="text-[10px] text-white/30 tracking-wide uppercase">today</span>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* HERO CARD (Row 1 Left)                                                     */
/* -------------------------------------------------------------------------- */
const HeroCard = () => {
  return (
    <motion.div 
      variants={{ hidden: { x: -40, opacity: 0 }, visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: EASING } } }}
      className="bg-[#1a2235] rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.07)] flex flex-col"
    >
      <div className="px-4 pt-4 pb-2 flex justify-between items-center border-b border-white/5">
        <h2 className="text-white text-[15px] font-semibold">Patient Overview</h2>
        <div className="flex items-center bg-[#10b981] text-white rounded-full px-3 py-1 text-xs font-semibold">
          <CheckCircle className="w-3 h-3 mr-1" />
          Optimal
        </div>
      </div>
      
      <div className="flex-1 grid grid-cols-[100px_1fr_180px] h-full">
        {/* Left Thumbnails */}
        <div className="bg-[#141b2d] p-3 flex flex-col gap-2">
          {/* Active Thumbnail (Urgent) */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-[72px] h-[72px] rounded-xl flex flex-col justify-center items-center bg-[#f59e0b]/20 border-2 border-[#f59e0b] shadow-[0_0_15px_rgba(245,158,11,0.2)] cursor-pointer"
          >
            <Clock className="w-7 h-7 text-[#f59e0b] mb-1" />
            <span className="text-[10px] text-[#f59e0b] font-medium">Urgent</span>
          </motion.div>
          {/* Inactive Thumbnail 1 (Emergency) */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-[72px] h-[72px] rounded-xl flex flex-col justify-center items-center bg-[#ef4444]/10 border border-[#ef4444]/30 cursor-pointer"
          >
            <AlertTriangle className="w-7 h-7 text-[#ef4444] mb-1" />
            <span className="text-[10px] text-[#ef4444] font-medium">Emergency</span>
          </motion.div>
          {/* Inactive Thumbnail 2 (Routine) */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-[72px] h-[72px] rounded-xl flex flex-col justify-center items-center bg-[#22c55e]/10 border border-[#22c55e]/30 cursor-pointer"
          >
            <CheckCircle className="w-7 h-7 text-[#22c55e] mb-1" />
            <span className="text-[10px] text-[#22c55e] font-medium">Routine</span>
          </motion.div>
        </div>

        {/* Center Main Visual */}
        <div className="relative flex flex-col items-center justify-center p-4">
          <DonutChart />
          <motion.div 
            animate={{ opacity: [1, 0.7, 1] }} 
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-4 flex items-center bg-[#10b981] text-white rounded-full px-4 py-1.5 text-xs font-semibold"
          >
            <CheckCircle className="w-3.5 h-3.5 mr-1" />
            Optimal Coverage
          </motion.div>
        </div>

        {/* Right Metrics */}
        <div className="p-4 flex flex-col justify-center gap-3 border-l border-white/5 bg-[#1a2235]">
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <div className="flex items-center"><AlertCircle className="w-3.5 h-3.5 text-[#ef4444]"/><span className="text-white/60 text-xs ml-2">Emergency</span></div>
            <span className="text-[#ef4444] text-xs font-semibold">2 cases</span>
          </div>
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <div className="flex items-center"><Clock className="w-3.5 h-3.5 text-[#f59e0b]"/><span className="text-white/60 text-xs ml-2">Urgent</span></div>
            <span className="text-[#f59e0b] text-xs font-semibold">4 cases</span>
          </div>
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <div className="flex items-center"><CheckCircle className="w-3.5 h-3.5 text-[#22c55e]"/><span className="text-white/60 text-xs ml-2">Routine</span></div>
            <span className="text-[#22c55e] text-xs font-semibold">6 cases</span>
          </div>
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <div className="flex items-center"><TrendingUp className="w-3.5 h-3.5 text-[#10b981]"/><span className="text-white/60 text-xs ml-2">Referred</span></div>
            <span className="text-white text-xs font-semibold">2 today</span>
          </div>
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <div className="flex items-center"><Zap className="w-3.5 h-3.5 text-[#60a5fa]"/><span className="text-white/60 text-xs ml-2">Avg Time</span></div>
            <span className="text-white text-xs font-semibold">4.2 min</span>
          </div>
          <button className="mt-auto w-full bg-white/10 text-white text-xs font-medium rounded-xl py-2.5 border border-white/10 hover:bg-white/20 transition-colors duration-200">
            Needs Review
          </button>
        </div>
      </div>
    </motion.div>
  );
};

/* -------------------------------------------------------------------------- */
/* BAR CHART CARD (Row 1 Right)                                               */
/* -------------------------------------------------------------------------- */
const BarChartCard = () => {
  return (
    <motion.div 
      variants={{ hidden: { x: 40, opacity: 0 }, visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: EASING } } }}
      whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(0,0,0,0.10)" }}
      className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.07)] p-6 flex flex-col transition-all duration-300 h-full"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[15px] font-semibold text-[#0f172a]">Urgency by Hour</h2>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#10b981]" /><span className="text-xs text-[#64748b]">Routine/Urgent</span></div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#ef4444]" /><span className="text-xs text-[#64748b]">Emergency</span></div>
        </div>
      </div>

      <div className="flex-1 relative mt-2 flex items-end justify-between min-h-[160px]">
        {/* Horizontal Grid lines */}
        {[0, 25, 50, 75, 100].map(val => (
          <div key={val} className="absolute left-0 right-0 border-t border-dashed border-[#f1f5f9]" style={{ bottom: `${val}%` }}>
            <span className="absolute -top-[7px] -left-8 text-[10px] text-[#94a3b8] w-6 text-right">{val}%</span>
          </div>
        ))}
        
        {/* Bars */}
        <div className="pl-6 w-full h-full flex items-end justify-between relative z-10 pt-4">
          {[
            { tag: "9AM", r: "75%", e: "20%" },
            { tag: "11AM", r: "90%", e: "0%" },
            { tag: "1PM", r: "60%", e: "15%" },
            { tag: "3PM", r: "45%", e: "10%" },
            { tag: "5PM", r: "15%", e: "0%" }
          ].map((col, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="flex items-end gap-1 h-full w-full justify-center">
                {/* Routine/Urgent Bar */}
                <motion.div 
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.7, delay: 0.8 + (i * 0.12), ease: EASING }}
                  style={{ transformOrigin: "bottom center", height: col.r }}
                  className="w-3 sm:w-[14px] bg-gradient-to-t from-[#10b981] to-[#34d399] rounded-t-full relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20" />
                </motion.div>
                {/* Emergency Bar */}
                <motion.div 
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.7, delay: 0.85 + (i * 0.12), ease: EASING }}
                  style={{ transformOrigin: "bottom center", height: col.e }}
                  className="w-3 sm:w-[14px] bg-gradient-to-t from-[#ef4444] to-[#f87171] rounded-t-full relative"
                />
              </div>
              <span className="text-[10px] text-[#94a3b8] mt-3">{col.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

/* -------------------------------------------------------------------------- */
/* SVG SPARKLINE                                                              */
/* -------------------------------------------------------------------------- */
const Sparkline = ({ data, color, delay = 0 }) => {
  const max = Math.max(...data) || 1;
  const min = Math.min(...data);
  const spread = max - min || 1;
  const width = 90;
  const height = 50;

  // Build path visually nice (smooth bezier approximations)
  const coords = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((d - min) / spread) * height;
    return `${x},${y}`;
  });
  
  // Create a cubic bezier path (very simplified smoothing)
  let dPath = `M ${coords[0]}`;
  for(let i=1; i<data.length; i++) {
    const [prevX, prevY] = coords[i-1].split(',').map(Number);
    const [currX, currY] = coords[i].split(',').map(Number);
    const cp1x = prevX + (currX - prevX) / 2;
    const cp1y = prevY;
    const cp2x = prevX + (currX - prevX) / 2;
    const cp2y = currY;
    dPath += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${currX},${currY}`;
  }

  const fillDPath = `${dPath} L ${width},${height} L 0,${height} Z`;

  return (
    <div className="w-[90px] h-[50px] relative">
      <svg width={width} height={height} className="overflow-visible absolute top-0 left-0">
        <defs>
          <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Fill */}
        <motion.path 
          d={fillDPath} fill={`url(#grad-${color})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: delay + 0.8 }}
        />
        
        {/* Line */}
        <motion.path 
          d={dPath} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: delay, ease: "easeOut" }}
        />
        
        {/* End Dot */}
        {data.length > 0 && (
          <motion.circle 
            cx={coords[coords.length-1].split(',')[0]} 
            cy={coords[coords.length-1].split(',')[1]} 
            r="3.5" fill={color} stroke="white" strokeWidth="1.5"
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: delay + 1.2 }}
          />
        )}
      </svg>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* METRIC CARDS (Row 2.1)                                                     */
/* -------------------------------------------------------------------------- */
const MetricCard = ({ title, badgeText, badgeColor, num, arrow, ArrowIcon, arrowColor, sparklineData, colorKey }) => (
  <motion.div 
    variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: EASING } } }}
    whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(0,0,0,0.10)" }}
    className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.07)] p-5 transition-all duration-300 flex flex-col justify-between h-full"
  >
    <div className="flex justify-between items-center mb-4">
      <span className="text-[13px] text-[#64748b]">{title}</span>
      <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full`} style={{ backgroundColor: `${badgeColor}15` }}>
        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: badgeColor }} />
        <span className="text-[11px] font-semibold" style={{ color: badgeColor }}>{badgeText}</span>
      </div>
    </div>
    
    <div className="flex justify-between items-end">
      <div className="flex items-baseline">
        <AnimatedNumber target={num} duration={1000} delay={800} className="text-[42px] md:text-[52px] font-serif font-bold text-[#0f172a] leading-none" />
        <ArrowIcon className="w-5 h-5 ml-1 mb-2" style={{ color: arrowColor }} />
      </div>
      <Sparkline data={sparklineData} color={badgeColor} delay={0.8} />
    </div>
  </motion.div>
);

const CircularProgressCard = () => {
  const pctString = "73%";
  const radius = 35;
  const circ = 2 * Math.PI * radius;
  const offset = circ * (1 - 0.58); // 5.8 out of 10 = 58%

  return (
    <motion.div 
      variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: EASING } } }}
      whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(0,0,0,0.10)" }}
      className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.07)] p-5 transition-all duration-300 flex flex-col justify-between h-full"
    >
      <span className="text-[13px] text-[#64748b]">Avg Severity</span>
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-baseline">
          <AnimatedNumber target={5.8} duration={1000} delay={800} className="text-[42px] font-serif font-bold text-[#0f172a] leading-none" />
          <span className="text-[16px] text-[#64748b] ml-1">/10</span>
        </div>
        
        <div className="relative w-[80px] h-[80px] flex items-center justify-center">
          <svg width="80" height="80" className="-rotate-90">
            <circle cx="40" cy="40" r={radius} fill="none" stroke="#f1f5f9" strokeWidth="8" />
            <motion.circle 
              cx="40" cy="40" r={radius} fill="none" stroke="#10b981" strokeWidth="8" strokeLinecap="round"
              strokeDasharray={circ}
              initial={{ strokeDashoffset: circ }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.2, delay: 0.8, ease: EASING }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-1">
            <span className="text-[14px] font-bold font-serif text-[#0f172a]">{pctString}</span>
            <span className="text-[9px] text-[#94a3b8] -mt-1 leading-none uppercase">of norm</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProgressBarsCard = () => (
  <motion.div 
    variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: EASING } } }}
    whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(0,0,0,0.10)" }}
    className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.07)] p-5 transition-all duration-300 flex flex-col h-full"
  >
    <span className="text-[13px] text-[#64748b] mb-3">Case Breakdown</span>
    <div className="flex flex-col gap-3 mt-1">
      {[
        { l: "Emergency", v: "17%", c: "#ef4444", d: 800 },
        { l: "Urgent", v: "33%", c: "#f59e0b", d: 950 },
        { l: "Routine", v: "50%", c: "#22c55e", d: 1100 }
      ].map((bar, i) => (
        <div key={i} className="">
          <div className="flex justify-between text-[11px] mb-1">
            <span className="text-[#0f172a] font-medium">{bar.l}</span>
            <span className="text-[#0f172a]">{bar.v}</span>
          </div>
          <div className="w-full h-2 bg-[#f1f5f9] rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: bar.v }}
              transition={{ duration: 0.8, delay: bar.d / 1000, ease: EASING }}
              className="h-full rounded-full"
              style={{ backgroundColor: bar.c }}
            />
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

/* -------------------------------------------------------------------------- */
/* TALL ALERTS CARD (Row 2.2)                                                 */
/* -------------------------------------------------------------------------- */
const TallAlertCard = () => {
  return (
    <motion.div 
      variants={{ hidden: { x: 40, opacity: 0 }, visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: EASING } } }}
      whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(0,0,0,0.10)" }}
      className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.07)] p-6 transition-all duration-300 flex flex-col h-full"
    >
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-[15px] font-semibold text-[#0f172a]">Critical Alerts</h3>
        <span className="text-[13px] text-[#10b981] cursor-pointer hover:underline cursor-pointer">View All ›</span>
      </div>
      <p className="text-[12px] text-[#64748b] mb-4">Patients requiring immediate attention</p>
      
      {/* 3 Patient alert cards horizontally */}
      <div className="flex gap-3 h-[180px]">
        
        {/* Patient 1 - Emergency */}
        <motion.div 
          whileHover={{ scale: 1.04, y: -6 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex-1 rounded-2xl overflow-hidden relative cursor-pointer group shadow-sm bg-gradient-to-br from-[#fef2f2] to-[#fee2e2]"
        >
          <div className="absolute inset-0 flex items-center justify-center pb-8">
            <motion.div animate={{ opacity: [1,0.5,1] }} transition={{ duration: 2, repeat: Infinity }}>
              <AlertTriangle className="w-12 h-12 text-[#ef4444]" />
            </motion.div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-black/75 px-3 py-2 flex items-center justify-between">
            <span className="text-[11px] text-white font-medium truncate pr-2">Ramesh K.</span>
            <motion.div 
              className="w-6 h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0 group-hover:bg-[#10b981] transition-colors"
            >
              <ArrowUpRight className="w-3.5 h-3.5 text-[#0f172a] group-hover:text-white transition-colors" />
            </motion.div>
          </div>
        </motion.div>

        {/* Patient 2 - Urgent */}
        <motion.div 
          whileHover={{ scale: 1.04, y: -6 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex-1 rounded-2xl overflow-hidden relative cursor-pointer group shadow-sm bg-gradient-to-br from-[#fffbeb] to-[#fef3c7]"
        >
          <div className="absolute inset-0 flex items-center justify-center pb-8">
            <Clock className="w-12 h-12 text-[#f59e0b]" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-black/75 px-3 py-2 flex items-center justify-between">
            <span className="text-[11px] text-white font-medium truncate pr-2">Sunita D.</span>
            <motion.div className="w-6 h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0 group-hover:bg-[#10b981] transition-colors">
              <ArrowUpRight className="w-3.5 h-3.5 text-[#0f172a] group-hover:text-white transition-colors" />
            </motion.div>
          </div>
        </motion.div>

        {/* Patient 3 - Routine */}
        <motion.div 
          whileHover={{ scale: 1.04, y: -6 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex-1 rounded-2xl overflow-hidden relative cursor-pointer group shadow-sm bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7]"
        >
          <div className="absolute inset-0 flex items-center justify-center pb-8">
            <CheckCircle className="w-12 h-12 text-[#22c55e]" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-black/75 px-3 py-2 flex items-center justify-between">
            <span className="text-[11px] text-white font-medium truncate pr-2">Arjun S.</span>
            <motion.div className="w-6 h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0 group-hover:bg-[#10b981] transition-colors">
              <ArrowUpRight className="w-3.5 h-3.5 text-[#0f172a] group-hover:text-white transition-colors" />
            </motion.div>
          </div>
        </motion.div>

      </div>

      <div className="mt-auto pt-6">
        <span className="text-[12px] text-[#64748b]">Today's Progress</span>
        <div className="w-full h-1.5 bg-[#f1f5f9] rounded-full mt-1.5 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "80%" }}
            transition={{ duration: 1, delay: 0.8, ease: EASING }}
            className="h-full bg-[#10b981] rounded-full"
          />
        </div>
        <div className="flex justify-between items-center mt-1.5">
          <span className="text-[11px] text-[#64748b]">12 screened</span>
          <span className="text-[11px] text-[#64748b]">Target: 15</span>
        </div>
      </div>
    </motion.div>
  );
};

/* -------------------------------------------------------------------------- */
/* TABLE & FEED (Row 3)                                                       */
/* -------------------------------------------------------------------------- */
const PatientTable = ({ patients }) => {
  return (
    <motion.div 
      variants={{ hidden: { x: -40, opacity: 0 }, visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: EASING } } }}
      whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(0,0,0,0.10)" }}
      className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.07)] p-6 transition-all duration-300 h-full flex flex-col"
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h3 className="text-[15px] font-semibold text-[#0f172a]">Today's Patients</h3>
          <span className="ml-3 px-2 py-0.5 rounded-full bg-[#10b981]/10 text-[#10b981] text-[11px] font-semibold tracking-wide">
            12
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#94a3b8] absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input type="text" placeholder="Search patient..." className="bg-[#f8fafc] text-[12px] rounded-full pl-8 pr-4 py-1.5 w-40 focus:outline-none focus:ring-1 focus:ring-[#10b981]" />
          </div>
          <button className="p-1.5 hover:bg-[#f8fafc] rounded-full transition-colors text-[#64748b]"><SlidersHorizontal className="w-4 h-4"/></button>
        </div>
      </div>

      <div className="flex flex-col flex-1 mt-2">
        {/* Header Row */}
        <div className="grid grid-cols-6 gap-2 bg-[#f8fafc] px-4 py-2.5 rounded-xl mb-2 items-center text-[10px] text-[#94a3b8] uppercase tracking-wider font-semibold font-sans">
          <div className="col-span-2">Patient</div>
          <div>Urgency</div>
          <div>Condition</div>
          <div>Status</div>
          <div className="text-right">Action</div>
        </div>

        {/* Data Rows */}
        <motion.div 
          className="flex flex-col gap-1"
          variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 1 } } }}
        >
          {patients.map((p, i) => (
            <motion.div 
              key={p.id}
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } }}
              className="grid grid-cols-6 gap-2 px-4 py-3 rounded-xl border-b border-[#f8fafc] last:border-0 hover:bg-[#f8fafc] transition-colors items-center cursor-pointer group"
            >
              <div className="col-span-2 flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] text-white font-bold tracking-wide mr-3 ${
                  p.urgency==='emergency'?'bg-gradient-to-br from-[#ef4444] to-red-600':
                  p.urgency==='urgent'?'bg-gradient-to-br from-[#f59e0b] to-amber-600':
                  'bg-gradient-to-br from-[#10b981] to-emerald-600'
                }`}>
                  {p.initials}
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] font-medium text-[#0f172a]">{p.name}</span>
                  <span className="text-[11px] text-[#94a3b8]">{p.village}</span>
                </div>
              </div>

              <div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide border ${
                  p.urgency==='emergency'?'bg-red-50 text-red-700 border-red-200':
                  p.urgency==='urgent'?'bg-amber-50 text-amber-700 border-amber-200':
                  'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}>
                  {p.urgency}
                </span>
              </div>

              <div className="text-[12px] text-[#0f172a] font-medium">{p.condition}</div>

              <div>
                <motion.span 
                  whileTap={{ scale: 0.92 }}
                  className={`px-3 py-1 rounded-full text-[10px] cursor-pointer inline-block border ${
                    p.status==='pending'?'bg-white text-[#64748b] border-[#e2e8f0]':
                    p.status==='referred'?'bg-blue-50 text-blue-700 border-blue-200':
                    'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}
                >
                  {p.status}
                </motion.span>
              </div>

              <div className="text-right flex items-center justify-end">
                <span className="text-[12px] text-[#10b981] font-semibold group-hover:underline flex items-center">
                  View <ArrowRight className="w-3 h-3 ml-1" />
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

const ActivityFeed = () => {
  const navigate = useNavigate();
  return (
    <motion.div 
      variants={{ hidden: { x: 40, opacity: 0 }, visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: EASING } } }}
      whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(0,0,0,0.10)" }}
      className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.07)] p-6 transition-all duration-300 h-full flex flex-col"
    >
      <h3 className="text-[15px] font-semibold text-[#0f172a] mb-5">Recent Activity</h3>
      
      <div className="flex-1 flex flex-col justify-start">
        {[
          { color: "emerald", icon: CheckCircle, t: "Arjun Singh", dt: "Screened · Common Cold", time: "12 mins ago" },
          { color: "red", icon: AlertTriangle, t: "Ramesh Kumar", dt: "Referred to District Hospital", time: "45 mins ago" },
          { color: "amber", icon: Clock, t: "Sunita Devi", dt: "Awaiting review", time: "2 hrs ago" },
          { color: "emerald", icon: CheckCircle, t: "Priya Bai", dt: "Follow-up completed", time: "3 hrs ago" },
        ].map((act, i, arr) => {
          const Icon = act.icon;
          const bgClass = act.color==='red'?'bg-red-100':act.color==='amber'?'bg-amber-100':'bg-emerald-100';
          const iconColor = act.color==='red'?'#ef4444':act.color==='amber'?'#f59e0b':'#10b981';
          return (
            <div key={i} className="flex gap-3 relative border-b border-[#f1f5f9] pb-4 mb-4 last:border-0 last:mb-0 last:pb-0">
              {i !== arr.length - 1 && <div className="absolute top-8 bottom-[-16px] left-4 w-px bg-[#e2e8f0]" />}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${bgClass}`}>
                <Icon className="w-4 h-4" style={{ color: iconColor }} />
              </div>
              <div className="flex flex-col mt-1">
                <span className="text-[13px] font-semibold text-[#0f172a]">{act.t}</span>
                <span className="text-[11px] text-[#64748b] mt-0.5">{act.dt}</span>
                <span className="text-[10px] text-[#94a3b8] mt-1">{act.time}</span>
              </div>
            </div>
          );
        })}
      </div>

      <motion.button 
        whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
        onClick={() => navigate('/check')}
        className="mt-6 w-full bg-[#10b981] hover:bg-[#059669] text-white rounded-xl py-3 flex items-center justify-center font-medium text-[13px] shadow-sm transition-colors"
      >
        <UserPlus className="w-4 h-4 mr-2" />
        Screen New Patient
      </motion.button>
    </motion.div>
  );
};

/* -------------------------------------------------------------------------- */
/* MAIN PAGE WRAPPER                                                          */
/* -------------------------------------------------------------------------- */
export default function WorkerDashboard() {
  const [worker, setWorker] = useState(DEMO_WORKER);
  const [patients, setPatients] = useState(DEMO_SESSIONS);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('healthify_sessions');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.length > 0) setPatients(parsed);
      }
    } catch(e) { /* ignore */ }
  }, []);

  return (
    <div className="min-h-screen bg-[#f0f2f5] font-sans pb-16">
      <TopNavbar worker={worker} />

      {/* Main Content Area (padding-top 64px for fixed navbar) */}
      <motion.div 
        className="pt-24 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col gap-6"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
      >
        
        {/* ROW 1: Hero & Bar Chart */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-[58%]">
            <HeroCard />
          </div>
          <div className="w-full lg:w-[42%]">
            <BarChartCard />
          </div>
        </div>

        {/* ROW 2: Metrics & Tall Card */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-[58%] grid grid-cols-1 sm:grid-cols-2 gap-6">
            <MetricCard 
              title="Emergency Today" badgeText="Elevated" badgeColor="#ef4444"
              num={2} ArrowIcon={ArrowUp} arrowColor="#ef4444"
              sparklineData={[1,0,1,2,1,2,2]}
            />
            <MetricCard 
              title="Urgent Cases" badgeText="Moderate" badgeColor="#f59e0b"
              num={4} ArrowIcon={ArrowDown} arrowColor="#22c55e"
              sparklineData={[3,4,5,4,3,4,4]}
            />
            <CircularProgressCard />
            <ProgressBarsCard />
          </div>
          <div className="w-full lg:w-[42%]">
            <TallAlertCard />
          </div>
        </div>

        {/* ROW 3: Table & Activity */}
        <div className="flex flex-col lg:flex-row gap-6 mt-2">
          <div className="w-full lg:w-[58%]">
            <PatientTable patients={patients} />
          </div>
          <div className="w-full lg:w-[42%]">
            <ActivityFeed />
          </div>
        </div>

      </motion.div>
    </div>
  );
}
