import { ShieldCheck, Download, Share2, TrendingUp, CheckCircle2, LayoutList } from 'lucide-react';
import { demoData } from '../data/demoData';

export default function TrustHub() {
  const [showLoanModal, setShowLoanModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<any>(null);

  const applyForLoan = (loan: any) => {
    setSelectedLoan(loan);
    setShowLoanModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32 animate-in fade-in duration-700">
      {/* Trust Score Header */}
      <div className="grid lg:grid-cols-2 gap-8 items-center mb-16">
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-widest mb-4">
            Certified by MarketLink
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-black text-slate-900 mb-6 italic">Your Trust Score</h1>
          <p className="text-lg text-slate-600 mb-10 leading-relaxed font-sans max-w-lg">
            Your Trust Score represents your business health. Keep recording your daily trades to unlock bigger loans and lower interest rates.
          </p>
          
          <div className="flex gap-4 justify-center lg:justify-start">
            <button className="px-6 py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-primary-200 hover:scale-105 transition-transform">
              <Download className="w-5 h-5" />
              Download Report
            </button>
            <button className="px-6 py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold flex items-center gap-2 shadow-sm hover:bg-slate-50 transition-colors">
              <Share2 className="w-5 h-5" />
              Share with Bank
            </button>
          </div>
        </div>

        <div className="flex justify-center relative">
          {/* Animated Glow behind score */}
          <div className="absolute inset-0 bg-primary-400/20 blur-[100px] rounded-full" />
          
          <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
            {/* SVG Progress Circle */}
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="50%" cy="50%" r="45%"
                className="stroke-slate-100 fill-none"
                strokeWidth="12"
              />
              <circle
                cx="50%" cy="50%" r="45%"
                className="stroke-primary-600 fill-none transition-all duration-1000 ease-out"
                strokeWidth="12"
                strokeDasharray="283"
                strokeDashoffset={283 - (283 * demoData.user.trustScore) / 100}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <ShieldCheck className="w-8 h-8 md:w-12 md:h-12 text-primary-600 mb-2" />
              <span className="text-6xl md:text-8xl font-display font-black text-slate-900 italic tracking-tighter">
                {demoData.user.trustScore}
              </span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest italic">Out of 100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Table Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {[
          { label: 'Days Tracked', value: demoData.user.daysTracked, unit: 'Days' },
          { label: 'Daily Profit', value: `₵${demoData.stats.avgDailyProfit}`, unit: 'Avg' },
          { label: 'Streak', value: demoData.stats.consistencyStreak, unit: 'Days' },
          { label: 'Est. Annual', value: `₵${demoData.stats.estimatedAnnualIncome}`, unit: 'Income' }
        ].map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm text-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">{s.label}</p>
            <p className="text-3xl font-display font-black text-slate-900 mb-1 italic">{s.value}</p>
            <p className="text-[10px] font-bold text-primary-600 uppercase italic opacity-70">{s.unit}</p>
          </div>
        ))}
      </div>

      {/* Loan Hub */}
      <div className="bg-slate-900 rounded-[40px] p-8 md:p-12 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/20 blur-[100px] -z-0" />
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
            <div>
              <h2 className="text-3xl font-display font-black italic mb-2">Loan Offers For You</h2>
              <p className="text-slate-400 max-w-md font-medium">Pre-approved micro-loans based on your MarketLink transaction history.</p>
            </div>
            <div className="px-4 py-2 bg-white/10 rounded-full border border-white/20 text-xs font-bold flex items-center gap-2">
               <TrendingUp className="w-4 h-4 text-market-green" />
               Current Limit: ₵5,000
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {demoData.loanOffers.map((loan) => (
              <div key={loan.id} className="bg-white/5 border border-white/10 p-6 rounded-[32px] hover:bg-white/10 transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-white/10 rounded-2xl">
                    <LayoutList className="w-6 h-6 text-primary-400" />
                  </div>
                  <span className="text-xs font-black text-primary-400 px-2 py-1 border border-primary-400/30 rounded-lg group-hover:bg-primary-400 group-hover:text-black transition-colors">{loan.rate}</span>
                </div>
                <h4 className="text-3xl font-display font-black mb-1 italic">₵{loan.amount}</h4>
                <p className="text-slate-400 text-sm font-medium mb-6">{loan.partner} • {loan.term}</p>
                <button 
                  onClick={() => applyForLoan(loan)}
                  className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/5"
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Journey Timeline */}
      <div className="mt-20 px-4">
        <h3 className="text-2xl font-display font-black text-slate-900 text-center mb-12 italic">Your Path to Credit</h3>
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 -z-10" />
          <div className="flex justify-between items-center bg-transparent">
            {[
              { t: 'Start Records', d: 'Day 1', ok: true },
              { t: 'Trust Score 50', d: 'Day 30', ok: true },
              { t: 'Pre-Approved', d: 'Day 80', ok: true },
              { t: 'Loan Eligible', d: 'Soon', ok: false }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full border-4 border-slate-50 flex items-center justify-center transition-all ${
                  step.ok ? 'bg-primary-600 text-white shadow-xl shadow-primary-200' : 'bg-slate-200 text-slate-400'
                }`}>
                  {step.ok ? <CheckCircle2 className="w-5 h-5" /> : <div className="w-2 h-2 rounded-full bg-slate-400" />}
                </div>
                <div className="mt-4 text-center">
                  <p className={`text-[10px] font-black uppercase tracking-widest ${step.ok ? 'text-slate-900' : 'text-slate-400'}`}>{step.t}</p>
                  <p className="text-[10px] text-slate-400 font-bold italic">{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Loan Apply Modal (Simulated) */}
      {showLoanModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowLoanModal(false)} />
          <div className="relative w-full max-w-md bg-white rounded-[40px] p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
             </div>
             <h3 className="text-3xl font-display font-black text-slate-900 text-center mb-2 italic">Application Sent!</h3>
             <p className="text-slate-500 text-center font-medium leading-relaxed mb-8">
               Your ₵{selectedLoan?.amount} loan application with {selectedLoan?.partner} is under review. You'll receive a notification within 24 hours.
             </p>
             <button 
               onClick={() => setShowLoanModal(false)}
               className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-lg shadow-xl shadow-slate-200 transition-all active:scale-95"
             >
               Dismiss
             </button>
          </div>
        </div>
      )}
    </div>
  );
}
import { useState } from 'react';
