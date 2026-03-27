import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, Info, FileText, ArrowLeft, Download, ExternalLink, Activity } from 'lucide-react';
import jsPDF from 'jspdf';

export default function Results() {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const savedResult = localStorage.getItem('healthify_result');
    const savedPatient = localStorage.getItem('healthify_patient');
    if (savedResult) setResult(JSON.parse(savedResult));
    if (savedPatient) setPatient(JSON.parse(savedPatient));
  }, []);

  if (!result || !patient) return null;

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.setTextColor(16, 185, 129); // Primary green
    doc.text('Healthify Triage Report', 20, 20);
    
    doc.setFontSize(12);
    doc.setTextColor(33, 33, 33);
    doc.text(`Patient: ${patient.name}`, 20, 40);
    doc.text(`Age: ${patient.age} | Gender: ${patient.gender}`, 20, 50);
    doc.text(`Urgency: ${result.urgency.toUpperCase()}`, 20, 60);
    
    doc.text('AI Summary:', 20, 80);
    const splitText = doc.splitTextToSize(result.doctor_summary || '', 170);
    doc.text(splitText, 20, 90);
    
    doc.save(`Healthify_Report_${patient.name}.pdf`);
  };

  const urgencyColors = {
    emergency: 'bg-red-500 text-white',
    urgent: 'bg-amber-500 text-white',
    routine: 'bg-emerald-500 text-white'
  };

  const urgencyIcons = {
    emergency: <AlertTriangle className="w-8 h-8" />,
    urgent: <Activity className="w-8 h-8" />,
    routine: <CheckCircle2 className="w-8 h-8" />
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-24 pb-12 px-6 flex flex-col items-center selection:bg-primary/20">
      
      {/* Back Link */}
      <button 
        onClick={() => navigate('/check')}
        className="mb-8 flex items-center gap-2 text-slate-500 hover:text-black font-semibold text-sm transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Start New Test
      </button>

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Urgency Hero Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`lg:col-span-3 rounded-[32px] p-8 lg:p-12 shadow-2xl flex flex-col md:flex-row items-center gap-8 ${urgencyColors[result.urgency]}`}
        >
          <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center shrink-0">
            {urgencyIcons[result.urgency]}
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-[0.2em] mb-2 opacity-80">Triage Classification</div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 capitalize">{result.urgency}</h1>
            <p className="text-lg opacity-90 leading-relaxed max-w-2xl font-medium">
              {result.urgency_reason}
            </p>
          </div>
        </motion.div>

        {/* Left Stats Column */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100"
          >
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Patient Profile</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-slate-500 uppercase font-bold tracking-tighter">Name</span>
                <span className="text-sm font-bold text-slate-800">{patient.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-500 uppercase font-bold tracking-tighter">Stats</span>
                <span className="text-sm font-bold text-slate-800">{patient.age}y | {patient.gender}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-50">
                <span className="text-sm text-slate-500 uppercase font-bold tracking-tighter">Severity</span>
                <span className="text-sm font-bold text-primary">{patient.severity}/10</span>
              </div>
            </div>
          </motion.div>

          <button 
            onClick={downloadPDF}
            className="w-full bg-[#0f172a] hover:bg-black text-white rounded-2xl py-4 font-bold flex items-center justify-center gap-3 transition-all shadow-xl shadow-slate-200"
          >
            <Download className="w-5 h-5" /> Download PDF Report
          </button>
        </div>

        {/* Right Content Logic */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" /> Potential Conditions
            </h3>
            <div className="space-y-4">
              {result.top_conditions?.map((cond, i) => (
                <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary/30 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold text-slate-900">{cond.name}</span>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${cond.confidence === 'high' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
                      {cond.confidence} Confidence
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">
                    {cond.reasoning}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Red Flags / Advice */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-red-50 rounded-[24px] p-6 border border-red-100"
            >
              <h4 className="text-red-700 font-bold mb-3 flex items-center gap-2 text-sm">
                <AlertTriangle className="w-4 h-4" /> Critical Red Flags
              </h4>
              <ul className="space-y-2">
                {result.red_flags?.map((flag, i) => (
                  <li key={i} className="text-xs text-red-600 font-medium leading-relaxed">• {flag}</li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-blue-50 rounded-[24px] p-6 border border-blue-100"
            >
              <h4 className="text-blue-700 font-bold mb-3 flex items-center gap-2 text-sm">
                <Info className="w-4 h-4" /> Recommended Tests
              </h4>
              <ul className="space-y-2">
                {result.recommended_tests?.slice(0, 4).map((test, i) => (
                  <li key={i} className="text-xs text-blue-600 font-medium leading-relaxed">• {test}</li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
}
