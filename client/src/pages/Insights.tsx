import { useState } from 'react';
import { TrendingUp, ShoppingBag, AlertCircle, Sparkles, ArrowUpRight } from 'lucide-react';
import { demoData } from '../data/demoData';

export default function Insights() {
  const [timeRange, setTimeRange] = useState('Month');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-display font-black text-slate-900 mb-2 italic">Business Insights</h1>
          <p className="text-slate-500 font-medium">Analyze your growth and maximize your margins.</p>
        </div>
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
          {['Week', 'Month', '3 Months'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-6 py-2 rounded-xl text-sm font-black transition-all ${
                timeRange === range ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Main Analytics Grid */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* Profit/Loss Simulated Chart */}
        <div className="lg:col-span-2 bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm">
           <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-xl font-display font-black text-slate-900 italic">Profit Trends</h3>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Net Income Over Time</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary-600" />
                  <span className="text-[10px] font-black text-slate-500 uppercase">Profit</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-200" />
                  <span className="text-[10px] font-black text-slate-500 uppercase">Sales</span>
                </div>
              </div>
           </div>

           <div className="h-64 flex items-end justify-between gap-3 md:gap-6 px-4">
              {[60, 45, 75, 55, 90, 65, 80].map((h, i) => (
                <div key={i} className="flex-1 group relative flex flex-col items-center">
                  <div className="absolute -top-10 bg-slate-900 text-white text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    ₵{h * 10}
                  </div>
                  <div 
                    className="w-full bg-slate-100 rounded-2xl transition-all duration-500 group-hover:bg-slate-200"
                    style={{ height: `${h + 10}%` }}
                  />
                  <div 
                    className="w-full bg-primary-600 rounded-2xl absolute bottom-0 transition-all duration-700 ease-out"
                    style={{ height: `${h}%` }}
                  />
                  <span className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-tighter">Day {i+1}</span>
                </div>
              ))}
           </div>
        </div>

        {/* Waste Analysis Card */}
        <div className="bg-red-50 rounded-[40px] border border-red-100 p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <ShoppingBag className="w-32 h-32" />
          </div>
          <h3 className="text-xl font-display font-black text-red-900 italic mb-6">Waste Analysis</h3>
          <div className="space-y-6 relative z-10">
            <div>
              <div className="flex justify-between text-xs font-black text-red-700 uppercase tracking-wider mb-2">
                <span>Tomato Spoilage</span>
                <span>₵{demoData.stats.wasteLoss} Loss</span>
              </div>
              <div className="w-full h-3 bg-red-200/50 rounded-full overflow-hidden">
                <div className="h-full bg-red-500" style={{ width: '65%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-black text-red-700 uppercase tracking-wider mb-2">
                <span>Onion Shrinkage</span>
                <span>₵45 Loss</span>
              </div>
              <div className="w-full h-3 bg-red-200/50 rounded-full overflow-hidden">
                <div className="h-full bg-red-500" style={{ width: '25%' }} />
              </div>
            </div>
            <div className="pt-6 border-t border-red-200/50">
              <div className="flex items-start gap-4">
                 <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-red-600" />
                 </div>
                 <p className="text-sm font-bold text-red-800 italic leading-relaxed">
                   "Your tomato waste peaks on Thursdays. Reduce purchase by 15% on Wednesdays."
                 </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Top Products */}
        <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm">
          <h3 className="text-xl font-display font-black text-slate-900 italic mb-8">Top Selling</h3>
          <div className="space-y-6">
            {[
              { name: 'Tomatoes', share: '62%', color: 'bg-red-500' },
              { name: 'Onions', share: '24%', color: 'bg-primary-500' },
              { name: 'Plantains', share: '14%', color: 'bg-yellow-500' }
            ].map((p, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${p.color}`} />
                  <span className="font-display font-bold text-slate-800">{p.name}</span>
                </div>
                <span className="text-sm font-black text-slate-400">{p.share}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Price Recommendation */}
        <div className="bg-primary-50 rounded-[40px] border border-primary-100 p-8 shadow-sm">
          <h3 className="text-xl font-display font-black text-primary-900 italic mb-8">Pricing Tips</h3>
          <div className="space-y-4">
             <div className="p-4 bg-white rounded-2xl border border-primary-100">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xs font-black text-primary-600 uppercase tracking-widest">Tomatoes</h4>
                  <div className="flex items-center gap-1 text-market-green font-bold text-xs">
                    <TrendingUp className="w-3 h-3" />
                    +15%
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-display font-black text-slate-900 italic">₵12.00</span>
                  <span className="text-[10px] font-bold text-slate-400 line-through">₵10.50</span>
                </div>
                <p className="text-[10px] font-medium text-slate-500 mt-2 italic">Recommended price based on market scarcity.</p>
             </div>
             
             <button className="w-full py-4 text-primary-600 font-black text-xs uppercase tracking-widest border-2 border-dashed border-primary-200 rounded-2xl hover:bg-primary-100/50 transition-all">
                Update All Prices
             </button>
          </div>
        </div>

        {/* Market Alerts */}
        <div className="bg-slate-900 rounded-[40px] p-8 text-white">
           <div className="flex items-center gap-2 mb-8">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Live Alerts</h3>
           </div>
           <div className="space-y-6">
             <div className="flex gap-4">
                <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                <div>
                   <p className="font-bold text-sm mb-1 italic">Plantain Shortage</p>
                   <p className="text-xs text-slate-400 leading-normal">Supplies from central region delayed. Expect 20% price hike tomorrow.</p>
                </div>
             </div>
             <div className="flex gap-4">
                <TrendingUp className="w-6 h-6 text-market-green flex-shrink-0" />
                <div>
                   <p className="font-bold text-sm mb-1 italic">Onion Boom</p>
                   <p className="text-xs text-slate-400 leading-normal">Surplus supply from border trade. Buy now for next week.</p>
                </div>
             </div>
             <button className="w-full mt-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                See Global Reports <ArrowUpRight className="w-4 h-4" />
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}
