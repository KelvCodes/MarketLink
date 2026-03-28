import { useState } from 'react';
import { TrendingUp, TrendingDown, Info, Clock, ArrowUpRight, Plus } from 'lucide-react';
import { demoData } from '../data/demoData';
import { VoiceRecorder } from '../components/VoiceRecorder';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [transactions, setTransactions] = useState(demoData.recentTransactions);

  const handleNewTranscript = (text: string) => {
    const newEntry = {
      id: Date.now(),
      text,
      date: new Date().toLocaleString()
    };
    setTransactions([newEntry, ...transactions.slice(0, 2)]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32 md:pb-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-display font-black text-slate-900 mb-1 italic">Hello, {demoData.user.name} 👋</h1>
          <p className="text-slate-500 font-medium">Here's how your business is doing today.</p>
        </div>
        <Link to="/trust" className="p-1 px-3 bg-primary-50 border border-primary-100 rounded-full flex items-center gap-2 hover:bg-primary-100 transition-colors group">
          <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold text-xs ring-2 ring-white group-hover:scale-110 transition-transform">
            {demoData.user.trustScore}
          </div>
          <span className="text-xs font-bold text-primary-700 uppercase tracking-widest hidden sm:inline">Trust Score</span>
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Quick Record & Recent */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Record Card */}
          <div className="bg-gradient-to-br from-primary-600 to-indigo-700 rounded-[40px] p-8 text-white shadow-2xl shadow-primary-200">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-auto">
                <VoiceRecorder onTranscriptComplete={handleNewTranscript} />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-display font-black mb-2">Speak Your Trade</h3>
                <p className="text-primary-100 leading-relaxed mb-4">
                  "Today I bought 30kg tomatoes for 150 cedis and sold 20kg for 200."
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold border border-white/20">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Voice AI Active
                </div>
              </div>
            </div>
          </div>

          {/* Recent Transcripts */}
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-display font-black text-slate-900 italic">Recent Activities</h3>
              <button className="text-primary-600 font-bold text-sm hover:underline">See All</button>
            </div>
            <div className="space-y-4">
              {transactions.map((t) => (
                <div key={t.id} className="p-4 rounded-2xl border border-slate-50 hover:border-slate-100 hover:bg-slate-50 transition-all flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-slate-800 font-medium leading-relaxed">"{t.text}"</p>
                    <p className="text-xs text-slate-400 mt-1 font-bold">{t.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Key Stats & AI */}
        <div className="space-y-8">
          {/* Business Summary Cards */}
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-market-green/10 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-market-green" />
                </div>
                <span className="text-xs font-bold text-market-green bg-green-50 px-2 py-1 rounded-lg">+12%</span>
              </div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Today's Profit</p>
              <h4 className="text-3xl font-display font-black text-slate-900 italic">₵{demoData.stats.todayProfit}</h4>
            </div>

            <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
              <div className="flex justify-between mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center">
                  <Plus className="w-6 h-6 text-primary-600" />
                </div>
              </div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Monthly Sales</p>
              <h4 className="text-3xl font-display font-black text-slate-900 italic">₵{demoData.stats.monthSales}</h4>
            </div>

            <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
              <div className="flex justify-between mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-red-500" />
                </div>
              </div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Waste Loss</p>
              <h4 className="text-3xl font-display font-black text-slate-900 italic">₵{demoData.stats.wasteLoss}</h4>
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-indigo-50 border border-indigo-100 rounded-[32px] p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform">
              <Info className="w-20 h-20 text-indigo-600" />
            </div>
            <h3 className="text-sm font-bold text-indigo-700 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Info className="w-4 h-4" />
              AI Insight
            </h3>
            <p className="text-indigo-900 font-bold leading-relaxed relative z-10 italic">
              "You lose 25 cedis every Thursday to spoilage. Try buying less on Wednesdays."
            </p>
            <button className="mt-4 text-xs font-black text-indigo-600 flex items-center gap-1 hover:gap-2 transition-all">
              Learn How <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          {/* Market Intelligence */}
          <div className="bg-slate-900 rounded-[32px] p-6 text-white overflow-hidden shadow-xl">
             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Market Trends</h3>
             <div className="space-y-4">
               {demoData.marketIntelligence.map((item, i) => (
                 <div key={i} className="flex items-center gap-3 animate-in slide-in-from-bottom duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className="w-2 h-2 rounded-full bg-primary-400" />
                    <p className="text-sm font-medium text-slate-200">{item}</p>
                 </div>
               ))}
             </div>
             <button className="w-full mt-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-xs font-bold transition-all">
                Full Market Report
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
