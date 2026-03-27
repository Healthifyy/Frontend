import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Ruler, Weight, ChevronRight, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function Auth() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    height: '',
    weight: '',
    gender: 'male',
    terms: false
  });

  const EASING = [0.16, 1, 0.3, 1];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.terms) return;
    console.log('Registering user:', formData);
    // For hackathon: redirect to dashboard after "signup"
    navigate('/check');
  };

  const inputClasses = "w-full bg-[#f8f9fa] border border-[#e9ecef] rounded-xl px-12 py-3.5 text-sm font-medium text-[#1a1a1a] focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400";

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background soft blurs for luxury feel */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] -z-10" />

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/')}
        className="absolute top-10 left-10 flex items-center gap-2 text-slate-500 hover:text-black transition-colors font-medium text-sm"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASING }}
        className="w-full max-w-[500px] bg-white rounded-[32px] p-8 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <User className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-[#1a1a1a] tracking-tight mb-2">Create Your Profile</h1>
          <p className="text-slate-500 text-sm font-medium">Join Healthify for personalized medical triage.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name & Email Group */}
          <div className="grid grid-cols-1 gap-5">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                required
                type="text" 
                placeholder="Full Name" 
                className={inputClasses}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                required
                type="email" 
                placeholder="Email Address" 
                className={inputClasses} 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          {/* Biometrics Group */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                required
                type="number" 
                placeholder="Age" 
                className={inputClasses} 
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
              />
            </div>
            <div className="relative">
              <select 
                className={`${inputClasses} appearance-none cursor-pointer pl-6`}
                value={formData.gender}
                onChange={(e) => setFormData({...formData, gender: e.target.value})}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                ▼
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <Ruler className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                required
                type="number" 
                placeholder="Height (cm)" 
                className={inputClasses} 
                value={formData.height}
                onChange={(e) => setFormData({...formData, height: e.target.value})}
              />
            </div>
            <div className="relative">
              <Weight className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                required
                type="number" 
                placeholder="Weight (kg)" 
                className={inputClasses} 
                value={formData.weight}
                onChange={(e) => setFormData({...formData, weight: e.target.value})}
              />
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start gap-3 pt-2">
            <div 
              onClick={() => setFormData({...formData, terms: !formData.terms})}
              className={`w-5 h-5 rounded-md border flex items-center justify-center cursor-pointer transition-colors mt-0.5 ${formData.terms ? 'bg-primary border-primary text-white' : 'bg-white border-slate-300'}`}
            >
              {formData.terms && <CheckCircle2 className="w-3.5 h-3.5" />}
            </div>
            <span className="text-[12px] text-slate-500 leading-tight">
              I agree to the <span className="text-primary font-bold cursor-pointer">Terms & Conditions</span> and medical disclaimer for AI-assisted triage services.
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!formData.terms}
            className={`w-full rounded-2xl py-4 flex items-center justify-center gap-2 font-bold transition-all shadow-xl ${formData.terms ? 'bg-[#0f0f0f] text-white hover:scale-[1.02] shadow-black/10' : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'}`}
          >
            Create Account <ChevronRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500">
            Already have an account? <span className="text-primary font-bold cursor-pointer hover:underline">Sign In</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
