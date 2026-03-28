import { Link } from 'react-router-dom';
import { Mic, BarChart3, ShieldCheck, ArrowRight, Play, CheckCircle2, ShoppingBag } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {/* Abstract Background Decor */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-primary-100/50 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-indigo-100/50 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-600 text-xs font-bold mb-8 animate-bounce">
            <Mic className="w-4 h-4" />
            <span>Voice-First AI for Traders</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-black text-slate-900 leading-tight mb-6">
            MarketLink — <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-indigo-600">
              Talk. Sell. Borrow.
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl text-slate-600 mb-10 leading-relaxed font-sans">
            Voice-powered financial intelligence for market traders. Track every sale with your voice and build a credit score that banks trust.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/onboarding" 
              className="w-full sm:w-auto px-8 py-4 bg-primary-600 text-white rounded-2xl font-bold text-lg hover:bg-primary-700 shadow-xl shadow-primary-200 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center gap-2">
              <Play className="w-5 h-5 fill-current text-primary-600" />
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-6">
                Too busy to write it down? <br />
                <span className="text-red-500">Stop losing money.</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Most traders lose 15-20% of their profit to unrecorded sales, spoilage, and hidden expenses because manual bookkeeping is slow.
              </p>
              <div className="space-y-4">
                {[
                  "No more paper books",
                  "Automated profit tracking",
                  "AI-powered pricing tips"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-red-600" />
                    </div>
                    <span className="font-medium text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-slate-100 rounded-3xl p-8 aspect-video flex items-center justify-center border border-slate-200 shadow-inner">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-400 font-medium">Visualization of Revenue Loss</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-2xl border border-slate-100 max-w-[200px] animate-pulse">
                <p className="text-xs font-bold text-slate-400 uppercase mb-2">Real-time Alert</p>
                <p className="text-sm font-bold text-slate-900 italic">"You lost 50 crates of tomatoes this month."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-slate-900 mb-4">How it works</h2>
          <p className="text-slate-600 text-lg">Just 3 steps to financial freedom</p>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
          {[
            { 
              step: "01", 
              title: "Talk", 
              desc: "Press a button and speak your sales and purchases in your language.",
              icon: Mic,
              color: "bg-blue-100 text-blue-600"
            },
            { 
              step: "02", 
              title: "Sell Smarter", 
              desc: "Get AI tips on when to raise prices and how to reduce waste.",
              icon: ShoppingBag,
              color: "bg-primary-100 text-primary-600"
            },
            { 
              step: "03", 
              title: "Get Loan", 
              desc: "Your records create a Trust Score. Share it with banks to get instant loans.",
              icon: ShieldCheck,
              color: "bg-green-100 text-green-600"
            }
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 group">
              <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <item.icon className="w-7 h-7" />
              </div>
              <div className="text-slate-400 font-display font-black text-4xl mb-2 opacity-20">{item.step}</div>
              <h3 className="text-xl font-display font-bold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Score Preview */}
      <section className="py-20 bg-primary-900 text-white rounded-[40px] md:rounded-[80px] mx-4 my-20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-800 skew-x-12 translate-x-1/2 -z-0" />
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid md:grid-cols-2 items-center gap-16">
            <div className="text-center md:text-left">
              <h2 className="text-4xl font-display font-black mb-6">Build a Trust Score that Banks Love.</h2>
              <p className="text-xl text-primary-100 mb-10 leading-relaxed font-sans">
                No collateral? No problem. Your business history is your collateral. MarketLink turns your voice records into a certified financial report.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="px-6 py-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                  <p className="text-3xl font-display font-black text-white">78/100</p>
                  <p className="text-xs font-bold text-primary-200 uppercase tracking-widest mt-1 italic">Average User Score</p>
                </div>
                <div className="px-6 py-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                  <p className="text-3xl font-display font-black text-white">₵10.5M</p>
                  <p className="text-xs font-bold text-primary-200 uppercase tracking-widest mt-1 italic">Loans Distributed</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-sm bg-white p-8 rounded-[40px] shadow-2xl text-slate-900 rotate-3 transition-transform hover:rotate-0">
                <div className="flex justify-between items-center mb-10">
                  <span className="font-display font-black text-2xl text-primary-600">TrustReport</span>
                  <ShieldCheck className="w-10 h-10 text-primary-600" />
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between items-end border-b border-slate-100 pb-2">
                    <span className="text-sm font-bold text-slate-400">Merchant Name</span>
                    <span className="font-bold text-slate-900">Ama Mensah</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-slate-100 pb-2">
                    <span className="text-sm font-bold text-slate-400">Business Type</span>
                    <span className="font-bold text-slate-900">Tomato & Onion</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-slate-100 pb-2">
                    <span className="text-sm font-bold text-slate-400">3-Month Profit</span>
                    <span className="font-bold text-market-green font-display">₵4,250.00</span>
                  </div>
                  <div className="pt-6">
                    <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary-600 rounded-full" style={{ width: '78%' }} />
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-xs font-bold text-primary-600 uppercase">Trust Score</span>
                      <span className="text-xs font-bold text-primary-600">78 / 100</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div>
            <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-display font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-display font-bold text-slate-900">MarketLink</span>
            </div>
            <p className="text-slate-500 max-w-xs">Connecting market traders to the digital economy.</p>
          </div>
          <div className="flex gap-8 text-sm font-bold text-slate-600">
            <a href="#" className="hover:text-primary-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-primary-600 transition-colors">Contact</a>
          </div>
          <p className="text-slate-400 text-xs">© 2024 MarketLink. Built with love for Africa's markets.</p>
        </div>
      </footer>
    </div>
  );
}
