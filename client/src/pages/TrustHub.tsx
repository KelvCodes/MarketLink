import { useState } from 'react';
import { ShieldCheck, Download, Share2, TrendingUp, CheckCircle2, LayoutList } from 'lucide-react';
import { demoData } from '../data/demoData';

// MARKET ASSETS
import tomatoesImg from '../assets/tomatoes.jpg';
import fishImg from '../assets/fish.jpg';
import nutsImg from '../assets/nuts.jpg';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Noto+Sans:wght@400;500;600&display=swap');

  .th-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .th-root { font-family: 'Noto Sans', sans-serif; background: #FFF8F0; color: #1A0A00; min-height: 100vh; padding-bottom: 120px; }
  .th-display { font-family: 'Sora', sans-serif; }

  .th-container { max-width: 1200px; margin: 0 auto; padding: 48px 24px; }

  /* HERO SECTION */
  .th-hero { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; margin-bottom: 80px; }
  @media (max-width: 1024px) { .th-hero { grid-template-columns: 1fr; gap: 60px; text-align: center; } }

  .th-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(0,168,107,0.1); border: 1px solid rgba(0,168,107,0.2); border-radius: 100px; padding: 6px 14px; font-size: 11px; font-weight: 700; color: #00A86B; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 20px; }
  .th-title { font-family: 'Sora', sans-serif; font-size: clamp(32px, 5vw, 56px); font-weight: 800; color: #1A0A00; line-height: 1.1; margin-bottom: 24px; }
  .th-title span { color: #FFB400; }
  .th-desc { font-size: 17px; color: #555; line-height: 1.7; margin-bottom: 40px; max-width: 520px; }
  @media (max-width: 1024px) { .th-desc { margin-left: auto; margin-right: auto; } }

  .th-actions { display: flex; gap: 16px; flex-wrap: wrap; }
  @media (max-width: 1024px) { .th-actions { justify-content: center; } }

  .th-btn-primary { display: inline-flex; align-items: center; gap: 10px; background: #FFB400; color: #1A0A00; border-radius: 16px; padding: 18px 32px; font-family: 'Sora', sans-serif; font-weight: 800; font-size: 16px; text-decoration: none; border: none; cursor: pointer; transition: all 0.2s; box-shadow: 0 8px 32px rgba(255,180,0,0.3); }
  .th-btn-primary:hover { background: #FFC833; transform: translateY(-2px); }
  .th-btn-secondary { display: inline-flex; align-items: center; gap: 10px; background: #fff; color: #1A0A00; border-radius: 16px; padding: 18px 32px; font-family: 'Sora', sans-serif; font-weight: 700; font-size: 16px; text-decoration: none; border: 1px solid #EDE5DC; cursor: pointer; transition: all 0.2s; }
  .th-btn-secondary:hover { background: #F8F0E5; }

  /* SCORE CIRCLE */
  .th-score-wrap { position: relative; width: 340px; height: 340px; margin: 0 auto; }
  .th-score-svg { width: 100%; height: 100%; transform: rotate(-90deg); }
  .th-score-bg { fill: none; stroke: #F0EAE2; stroke-width: 14; }
  .th-score-fill { fill: none; stroke: #FFB400; stroke-width: 14; stroke-linecap: round; transition: stroke-dashoffset 1s ease-out; }
  .th-score-content { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
  .th-score-num { font-family: 'Sora', sans-serif; font-size: 96px; font-weight: 800; color: #1A0A00; line-height: 1; }
  .th-score-lbl { font-size: 11px; font-weight: 800; color: #BBB; text-transform: uppercase; letter-spacing: 2px; margin-top: 4px; }
  .th-score-glow { position: absolute; inset: 30px; background: #FFB400; filter: blur(80px); opacity: 0.15; z-index: -1; border-radius: 50%; }

  /* STATS GRID */
  .th-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 80px; }
  @media (max-width: 900px) { .th-stats-grid { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 480px) { .th-stats-grid { grid-template-columns: 1fr; } }
  .th-stat-card { background: #fff; border-radius: 28px; padding: 28px; border: 1px solid #EDE5DC; text-align: center; transition: all 0.2s; position: relative; overflow: hidden; }
  .th-stat-card:hover { border-color: #FFB400; transform: translateY(-4px); box-shadow: 0 10px 30px rgba(26,10,0,0.06); }
  .th-stat-img-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.04; filter: grayscale(1); pointer-events: none; }
  .th-stat-content { position: relative; z-index: 5; }
  .th-stat-tag { font-size: 10px; font-weight: 700; color: #BBB; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 12px; display: block; }
  .th-stat-val { font-family: 'Sora', sans-serif; font-size: 28px; font-weight: 800; color: #1A0A00; margin-bottom: 4px; }
  .th-stat-sub { font-size: 11px; font-weight: 700; color: #00A86B; text-transform: uppercase; }

  /* LOANS HUB */
  .th-loans-section { background: #1A0A00; border-radius: 48px; padding: 64px; color: #fff; position: relative; overflow: hidden; box-shadow: 0 40px 100px rgba(0,0,0,0.25); }
  @media (max-width: 768px) { .th-loans-section { padding: 40px 24px; border-radius: 32px; } }
  .th-loans-bg-glow { position: absolute; top: 0; right: 0; width: 400px; height: 400px; background: #FFB400; filter: blur(150px); opacity: 0.08; pointer-events: none; }
  
  .th-loans-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 48px; flex-wrap: wrap; gap: 24px; }
  .th-loans-title { font-family: 'Sora', sans-serif; font-size: 32px; font-weight: 800; color: #fff; }
  .th-loans-limit { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 100px; padding: 8px 16px; font-size: 13px; font-weight: 700; color: #FFB400; display: flex; align-items: center; gap: 10px; }

  .th-loans-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  @media (max-width: 1024px) { .th-loans-grid { grid-template-columns: 1fr; } }

  .th-loan-card { background: rgba(255,255,255,0.04); border: 1.5px solid rgba(255,255,255,0.08); border-radius: 32px; padding: 32px; transition: all 0.3s; position: relative; overflow: hidden; }
  .th-loan-cardImg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.15; filter: grayscale(1) brightness(0.5); pointer-events: none; }
  .th-loan-card:hover { transform: translateY(-8px); border-color: #FFB400; background: rgba(255,180,0,0.04); }
  .th-loan-content { position: relative; z-index: 5; }
  .th-loan-icon { width: 56px; height: 56px; border-radius: 16px; background: rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; color: #FFB400; margin-bottom: 24px; }
  .th-loan-rate { position: absolute; top: 32px; right: 32px; font-size: 12px; font-weight: 800; color: #FFB400; text-transform: uppercase; border: 1px solid rgba(255,180,0,0.3); padding: 4px 10px; border-radius: 8px; }
  .th-loan-amt { font-family: 'Sora', sans-serif; font-size: 40px; font-weight: 800; color: #fff; margin-bottom: 4px; }
  .th-loan-info { font-size: 14px; color: rgba(255,255,255,0.4); margin-bottom: 32px; font-weight: 500; }
  
  .th-loan-btn { width: 100%; padding: 18px; background: #fff; color: #1A0A00; border: none; border-radius: 16px; font-family: 'Sora', sans-serif; font-weight: 800; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; cursor: pointer; transition: all 0.2s; }
  .th-loan-btn:hover { background: #FFB400; transform: scale(1.02); }

  /* TIMELINE */
  .th-timeline-section { margin-top: 100px; text-align: center; }
  .th-timeline-title { font-family: 'Sora', sans-serif; font-size: 24px; font-weight: 800; color: #1A0A00; margin-bottom: 48px; }
  .th-timeline-grid { display: flex; justify-content: space-between; max-width: 800px; margin: 0 auto; position: relative; }
  @media (max-width: 640px) { .th-timeline-grid { flex-direction: column; gap: 40px; } }
  .th-timeline-line { position: absolute; top: 20px; left: 0; right: 0; height: 3px; background: #F0EAE2; z-index: 1; }
  @media (max-width: 640px) { .th-timeline-line { display: none; } }
  .th-time-item { position: relative; z-index: 5; display: flex; flex-direction: column; align-items: center; gap: 12px; flex: 1; }
  .th-time-dot { width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 4px solid #FFF8F0; transition: all 0.3s; }
  .th-time-dot.done { background: #FFB400; color: #1A0A00; box-shadow: 0 4px 12px rgba(255,180,0,0.3); }
  .th-time-dot.pending { background: #F0EAE2; color: #BBB; }
  .th-time-text { font-size: 12px; font-weight: 700; color: #1A0A00; text-transform: uppercase; letter-spacing: 1px; }
  .th-time-sub { font-size: 11px; font-weight: 700; color: #BBB; font-style: italic; }

  /* MODAL */
  .th-modal-overlay { position: fixed; inset: 0; z-index: 100; background: rgba(26,10,0,0.6); backdrop-blur: 8px; display: flex; align-items: center; justify-content: center; padding: 24px; }
  .th-modal { width: 100%; max-width: 440px; background: #fff; border-radius: 40px; padding: 48px 32px; text-align: center; box-shadow: 0 40px 100px rgba(0,0,0,0.3); position: relative; }
  .th-modal-icon { width: 80px; height: 80px; background: #E8F8F0; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #00A86B; margin: 0 auto 32px; }
  .th-modal-title { font-family: 'Sora', sans-serif; font-size: 28px; font-weight: 800; color: #1A0A00; margin-bottom: 12px; }
  .th-modal-text { font-size: 15px; color: #666; line-height: 1.6; margin-bottom: 40px; }
  .th-modal-btn { width: 100%; padding: 20px; background: #1A0A00; color: #fff; border: none; border-radius: 20px; font-family: 'Sora', sans-serif; font-weight: 800; font-size: 16px; cursor: pointer; transition: all 0.2s; }
  .th-modal-btn:hover { background: #2A1500; transform: translateY(-2px); }
`;

export default function TrustHub() {
  const [showLoanModal, setShowLoanModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<any>(null);

  const applyForLoan = (loan: any) => {
    setSelectedLoan(loan);
    setShowLoanModal(true);
  };

  const circleRadius = 145; 
  const circleCircum = 2 * Math.PI * circleRadius;
  const dashOffset = circleCircum - (circleCircum * demoData.user.trustScore) / 100;

  return (
    <div className="th-root">
      <style>{styles}</style>

      <div className="th-container">
        {/* HERO SECTION */}
        <div className="th-hero">
          <div>
            <div className="th-badge">
              <ShieldCheck size={14} />
              MarketLink Certified
            </div>
            <h1 className="th-title th-display">
              W'adwuma <span>Ho Adanse</span>
            </h1>
            <p className="th-desc">
              Your Trust Score represents your business health. Keep recording your daily trades to unlock bigger loans and lower interest rates.
            </p>
            <div className="th-actions">
              <button className="th-btn-primary">
                <Download size={20} />
                Get Score Report
              </button>
              <button className="th-btn-secondary">
                <Share2 size={20} />
                Show Bank
              </button>
            </div>
          </div>

          <div className="th-score-wrap">
            <div className="th-score-glow" />
            <svg className="th-score-svg" viewBox="0 0 340 340">
              <circle cx="170" cy="170" r={circleRadius} className="th-score-bg" />
              <circle 
                cx="170" cy="170" r={circleRadius} 
                className="th-score-fill"
                strokeDasharray={circleCircum}
                strokeDashoffset={dashOffset}
              />
            </svg>
            <div className="th-score-content">
              <div className="th-score-num th-display">{demoData.user.trustScore}</div>
              <div className="th-score-lbl">Score Pefee</div>
            </div>
          </div>
        </div>

        {/* STATS GRID */}
        <div className="th-stats-grid">
          {[
            { label: 'Days Tracked', value: demoData.user.daysTracked, unit: 'Nna (Days)', img: fishImg },
            { label: 'Daily Profit', value: `₵${demoData.stats.avgDailyProfit}`, unit: 'Gain (Avg)', img: tomatoesImg },
            { label: 'Consistency', value: `${demoData.stats.consistencyStreak} Day`, unit: 'Streak', img: nutsImg },
            { label: 'Annual Est.', value: `₵${demoData.stats.estimatedAnnualIncome}`, unit: 'Ahonya (Inc)', img: fishImg }
          ].map((s, i) => (
            <div key={i} className="th-stat-card">
              <img src={s.img} className="th-stat-img-bg" alt="" />
              <div className="th-stat-content">
                <span className="th-stat-tag">{s.label}</span>
                <div className="th-stat-val th-display">{s.value}</div>
                <span className="th-stat-sub">{s.unit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* LOANS HUB */}
        <section className="th-loans-section">
          <div className="th-loans-bg-glow" />
          
          <div className="th-loans-header">
            <div>
              <h2 className="th-loans-title th-display">Loan Offers For You</h2>
              <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: '8px', fontSize: '15px' }}>
                Pre-approved micro-loans based on your MarketLink records.
              </p>
            </div>
            <div className="th-loans-limit">
              <TrendingUp size={16} />
              Current Limit: ₵5,000
            </div>
          </div>

          <div className="th-loans-grid">
            {demoData.loanOffers.map((loan, idx) => (
              <div key={loan.id} className="th-loan-card">
                <img src={idx === 0 ? tomatoesImg : (idx === 1 ? fishImg : nutsImg)} className="th-loan-cardImg" alt="" />
                <div className="th-loan-content">
                  <div className="th-loan-icon">
                    <LayoutList size={28} />
                  </div>
                  <div className="th-loan-rate">{loan.rate}</div>
                  <div className="th-loan-amt th-display">₵{loan.amount}</div>
                  <div className="th-loan-info">{loan.partner} • {loan.term}</div>
                  <button 
                    onClick={() => applyForLoan(loan)}
                    className="th-loan-btn"
                  >
                    Take This Loan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TIMELINE */}
        <section className="th-timeline-section">
          <h3 className="th-timeline-title th-display">W'akwantuo kɔ loan mu</h3>
          <div className="th-timeline-grid">
            <div className="th-timeline-line" />
            {[
              { t: 'Start Records', d: 'Day 1', ok: true },
              { t: 'Trust 50+', d: 'Day 30', ok: true },
              { t: 'Pre-Approved', d: 'Day 80', ok: true },
              { t: 'Loan Eligible', d: 'Soon', ok: false }
            ].map((step, i) => (
              <div key={i} className="th-time-item">
                <div className={`th-time-dot ${step.ok ? 'done' : 'pending'}`}>
                  {step.ok ? <CheckCircle2 size={24} /> : <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#CCC' }} />}
                </div>
                <div className="th-time-text">{step.t}</div>
                <div className="th-time-sub">{step.d}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* MODAL */}
      {showLoanModal && (
        <div className="th-modal-overlay">
          <div className="th-modal">
            <div className="th-modal-icon">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="th-modal-title th-display">Application Sent!</h3>
            <p className="th-modal-text">
              Your ₵{selectedLoan?.amount} loan application with {selectedLoan?.partner} is under review. You'll receive a notification within 24 hours.
            </p>
            <button className="th-modal-btn" onClick={() => setShowLoanModal(false)}>
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
