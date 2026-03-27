import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Heart, CheckCircle2, AlertCircle, Clock, Thermometer } from 'lucide-react';
import { runTriage } from '../api/triage';

const SYMPTOM_MAP = {
  "Fever": "high_fever",
  "Mild Fever": "mild_fever",
  "Cough": "cough",
  "Chest Pain": "chest_pain",
  "Breathlessness": "breathlessness",
  "Headache": "headache",
  "Vomiting": "vomiting",
  "Diarrhoea": "diarrhoea",
  "Fatigue": "fatigue",
  "Body Ache": "muscle_pain",
  "Skin Rash": "skin_rash",
  "Itching": "itching",
  "Nausea": "nausea",
  "Dizziness": "dizziness",
  "Back Pain": "back_pain",
  "Joint Pain": "joint_pain",
  "Loss of Appetite": "loss_of_appetite",
  "Sweating": "sweating",
  "Chills": "chills",
  "Runny Nose": "runny_nose",
  "Sore Throat": "throat_irritation",
  "Swelling": "swelled_lymph_nodes",
  "Yellow Eyes": "yellowing_of_eyes",
  "Dark Urine": "dark_urine",
  "Abdominal Pain": "abdominal_pain",
  "Constipation": "constipation",
  "Burning Urination": "burning_micturition",
  "Neck Stiffness": "neck_stiffness",
  "Fast Heartbeat": "fast_heart_rate",
  "Weight Loss": "weight_loss"
};

export default function SymptomWizard() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'male',
    symptoms: [],
    duration_days: 1,
    severity: 5,
    existing_conditions: [],
    medications: '',
    is_pregnant: false,
    recent_travel: false,
    community_outbreak: false
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const toggleSymptom = (s) => {
    const val = SYMPTOM_MAP[s];
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(val) 
        ? prev.symptoms.filter(item => item !== val)
        : [...prev.symptoms, val]
    }));
  };

  const handleFinalSubmit = async () => {
    setLoading(true);
    setError(null);
    const result = await runTriage(formData);
    if (result.success) {
      localStorage.setItem('healthify_result', JSON.stringify(result.data));
      localStorage.setItem('healthify_patient', JSON.stringify(formData));
      navigate('/results');
    } else {
      setError(result.error);
      setLoading(false);
    }
  };

  const EASING = [0.16, 1, 0.3, 1];

  return (
    <div className="min-h-screen bg-[#fafafa] pt-24 pb-12 px-6 flex flex-col items-center">
      {/* Progress Bar */}
      <div className="w-full max-w-2xl mb-12 flex items-center justify-between px-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${step >= i ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'}`}>
              {i}
            </div>
            {i < 3 && <div className={`w-16 lg:w-32 h-1 rounded-full transition-colors ${step > i ? 'bg-primary' : 'bg-slate-200'}`} />}
          </div>
        ))}
      </div>

      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: EASING }}
        className="w-full max-w-2xl bg-white rounded-[32px] p-8 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-slate-100"
      >
        {step === 1 && (
          <div className="space-y-8">
            <header>
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-2">Patient Details</h2>
              <p className="text-slate-500 text-sm">Tell us who is being triaged today.</p>
            </header>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Full Name</label>
                <input 
                  type="text" 
                  className="w-full bg-[#f8f9fa] border border-[#e9ecef] rounded-xl px-6 py-4 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Age</label>
                  <input 
                    type="number" 
                    className="w-full bg-[#f8f9fa] border border-[#e9ecef] rounded-xl px-6 py-4 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: parseInt(e.target.value) || ''})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Gender</label>
                  <select 
                    className="w-full bg-[#f8f9fa] border border-[#e9ecef] rounded-xl px-6 py-4 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-4 pt-2">
                <div className="flex items-center gap-4">
                  <div 
                    onClick={() => setFormData({...formData, is_pregnant: !formData.is_pregnant})}
                    className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${formData.is_pregnant ? 'bg-primary' : 'bg-slate-300'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${formData.is_pregnant ? 'left-7' : 'left-1'}`} />
                  </div>
                  <span className="text-sm font-semibold text-slate-600">Is pregnant?</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <div 
                    onClick={() => setFormData({...formData, existing_conditions: formData.existing_conditions.includes('diabetes') ? [] : ['diabetes']})}
                    className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${formData.existing_conditions.includes('diabetes') ? 'bg-primary' : 'bg-slate-300'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${formData.existing_conditions.includes('diabetes') ? 'left-7' : 'left-1'}`} />
                  </div>
                  <span className="text-sm font-semibold text-slate-600">Diabetic?</span>
                </div>

                <div className="flex items-center gap-4">
                  <div 
                    onClick={() => setFormData({...formData, recent_travel: !formData.recent_travel})}
                    className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${formData.recent_travel ? 'bg-primary' : 'bg-slate-300'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${formData.recent_travel ? 'left-7' : 'left-1'}`} />
                  </div>
                  <span className="text-sm font-semibold text-slate-600">Recent Travel?</span>
                </div>

                <div className="flex items-center gap-4">
                  <div 
                    onClick={() => setFormData({...formData, community_outbreak: !formData.community_outbreak})}
                    className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${formData.community_outbreak ? 'bg-primary' : 'bg-slate-300'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${formData.community_outbreak ? 'left-7' : 'left-1'}`} />
                  </div>
                  <span className="text-sm font-semibold text-slate-600">Local Outbreak?</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Current Medications</label>
                <input 
                  type="text" 
                  className="w-full bg-[#f8f9fa] border border-[#e9ecef] rounded-xl px-6 py-4 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="e.g. Metformin, Aspirin"
                  value={formData.medications}
                  onChange={(e) => setFormData({...formData, medications: e.target.value})}
                />
              </div>
            </div>

            <button onClick={nextStep} disabled={!formData.name || !formData.age} className="w-full bg-primary text-white rounded-2xl py-4 font-bold shadow-lg shadow-primary/20 hover:bg-emerald-600 transition-all disabled:bg-slate-200 disabled:shadow-none">
              Next Step
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <header>
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-2">Select Symptoms</h2>
              <p className="text-slate-500 text-sm">Pick all that apply to the current patient.</p>
            </header>

            <div className="flex flex-wrap gap-2">
              {Object.keys(SYMPTOM_MAP).map(s => (
                <button
                  key={s}
                  onClick={() => toggleSymptom(s)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${formData.symptoms.includes(SYMPTOM_MAP[s]) ? 'bg-primary border-primary text-white shadow-lg shadow-primary/10' : 'bg-white border-slate-200 text-slate-500 hover:border-primary'}`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="flex gap-4 pt-6">
              <button onClick={prevStep} className="flex-1 bg-slate-100 text-slate-600 rounded-2xl py-4 font-bold flex items-center justify-center gap-2">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button onClick={nextStep} disabled={formData.symptoms.length === 0} className="flex-[2] bg-primary text-white rounded-2xl py-4 font-bold shadow-lg shadow-primary/20 disabled:bg-slate-200 disabled:shadow-none">
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8">
            <header>
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-2">Final Assessment</h2>
              <p className="text-slate-500 text-sm">Duration and intensity of symptoms.</p>
            </header>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <span>How long?</span>
                  <span className="text-primary">{formData.duration_days} days</span>
                </div>
                <input 
                  type="range" min="1" max="14" 
                  className="w-full accent-primary h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                  value={formData.duration_days}
                  onChange={(e) => setFormData({...formData, duration_days: parseInt(e.target.value)})}
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <span>Severity Scale</span>
                  <span className="text-primary">{formData.severity}/10</span>
                </div>
                <input 
                  type="range" min="1" max="10" 
                  className="w-full accent-primary h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                  value={formData.severity}
                  onChange={(e) => setFormData({...formData, severity: parseInt(e.target.value)})}
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 text-sm font-medium">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                {error}
              </div>
            )}

            <div className="flex gap-4">
              <button onClick={prevStep} className="flex-1 bg-slate-100 text-slate-600 rounded-2xl py-4 font-bold flex items-center justify-center gap-2">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button 
                onClick={handleFinalSubmit}
                disabled={loading}
                className="flex-[2] bg-[#0f0f0f] text-white rounded-2xl py-4 font-bold shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                {loading ? 'Processing...' : 'Run Analysis'} 
                {!loading && <CheckCircle2 className="w-4 h-4 text-primary" />}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
