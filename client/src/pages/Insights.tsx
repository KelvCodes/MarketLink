import { useState } from 'react';
import { TrendingUp, ShoppingBag, AlertCircle, Sparkles, ArrowUpRight, TrendingDown } from 'lucide-react';
import { demoData } from '../data/demoData';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Noto+Sans:wght@400;500;600&display=swap');

  .ins-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .ins-root {
    font-family: 'Noto Sans', sans-serif;
    background: #FFF8F0;
    min-height: 100vh;
    padding-bottom: 120px;
    color: #1A0A00;
  }
  .ins-display { font-family: 'Sora', sans-serif; }

  /* HEADER */
  .ins-header {
    max-width: 1200px; margin: 0 auto 48px;
    display: flex; align-items: flex-end; justify-content: space-between;
    flex-wrap: wrap; gap: 24px;
  }
  .ins-header-eyebrow {
    font-size: 11px; font-weight: 700; text-transform: uppercase;
    letter-spacing: 2px; color: #FFB400; margin-bottom: 8px;
  }
  .ins-header-title {
    font-family: 'Sora', sans-serif;
    font-size: clamp(32px, 5vw, 52px);
    font-weight: 800; line-height: 1.05; color: #1A0A00;
  }
  .ins-header-title span { color: #FFB400; }
  .ins-header-sub { font-size: 15px; color: #999; margin-top: 8px; font-weight: 500; }

  /* TIME TOGGLE */
  .ins-toggle {
    display: flex; background: #fff;
    border: 1px solid #EDE5DC; border-radius: 14px;
    padding: 5px; gap: 4px;
    box-shadow: 0 2px 12px rgba(26,10,0,0.06);
  }
  .ins-toggle-btn {
    padding: 10px 22px; border-radius: 10px; border: none; cursor: pointer;
    font-family: 'Sora', sans-serif; font-size: 13px; font-weight: 700;
    transition: all 0.2s; background: transparent; color: #BBB;
  }
  .ins-toggle-btn:hover { color: #1A0A00; }
  .ins-toggle-btn.active {
    background: #1A0A00; color: #FFB400;
    box-shadow: 0 4px 14px rgba(26,10,0,0.2);
  }

  /* SUMMARY STRIP */
  .ins-summary-strip {
    max-width: 1200px; margin: 0 auto 36px;
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px;
  }
  @media (max-width: 900px) { .ins-summary-strip { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 480px) { .ins-summary-strip { grid-template-columns: 1fr 1fr; } }

  .ins-stat-card {
    background: #fff; border-radius: 22px;
    border: 1px solid #EDE5DC;
    padding: 22px 24px;
    position: relative; overflow: hidden;
    transition: transform 0.2s;
  }
  .ins-stat-card:hover { transform: translateY(-3px); }
  .ins-stat-card::before {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
  }
  .ins-stat-card.amber::before { background: #FFB400; }
  .ins-stat-card.green::before { background: #00A86B; }
  .ins-stat-card.red::before { background: #E63B1E; }
  .ins-stat-card.dark::before { background: #1A0A00; }

  .ins-stat-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #BBB; margin-bottom: 10px; }
  .ins-stat-val { font-family: 'Sora', sans-serif; font-size: 28px; font-weight: 800; color: #1A0A00; line-height: 1; margin-bottom: 8px; }
  .ins-stat-val.green { color: #00A86B; }
  .ins-stat-val.red { color: #E63B1E; }
  .ins-stat-badge {
    display: inline-flex; align-items: center; gap: 4px;
    font-size: 11px; font-weight: 700; border-radius: 100px; padding: 3px 10px;
  }
  .ins-stat-badge.up { background: #E8F8F0; color: #00A86B; }
  .ins-stat-badge.down { background: #FEE8E8; color: #E63B1E; }

  /* MAIN GRID */
  .ins-main-grid {
    max-width: 1200px; margin: 0 auto 36px;
    display: grid; grid-template-columns: 1fr 380px; gap: 20px;
  }
  @media (max-width: 1024px) { .ins-main-grid { grid-template-columns: 1fr; } }

  /* CHART CARD */
  .ins-chart-card {
    background: #1A0A00; border-radius: 32px;
    padding: 36px;
  }
  .ins-chart-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 36px; }
  .ins-chart-title { font-family: 'Sora', sans-serif; font-size: 20px; font-weight: 800; color: #fff; margin-bottom: 4px; }
  .ins-chart-sub { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: rgba(255,255,255,0.3); }
  .ins-chart-legend { display: flex; gap: 16px; }
  .ins-legend-item { display: flex; align-items: center; gap: 7px; font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.8px; }
  .ins-legend-dot { width: 10px; height: 10px; border-radius: 50%; }

  /* BAR CHART */
  .ins-bars {
    display: flex; align-items: flex-end; gap: 10px;
    height: 200px; padding: 0 4px;
  }
  .ins-bar-group {
    flex: 1; display: flex; flex-direction: column; align-items: center;
    height: 100%; position: relative; cursor: pointer;
  }
  .ins-bar-group:hover .ins-bar-tooltip { opacity: 1; transform: translateY(0); }
  .ins-bar-tooltip {
    position: absolute; top: -44px;
    background: #FFB400; color: #1A0A00;
    font-family: 'Sora', sans-serif; font-size: 11px; font-weight: 800;
    padding: 5px 10px; border-radius: 8px; white-space: nowrap;
    opacity: 0; transform: translateY(4px); transition: all 0.15s;
    pointer-events: none;
  }
  .ins-bar-tooltip::after {
    content: ''; position: absolute; bottom: -5px; left: 50%; transform: translateX(-50%);
    border: 5px solid transparent; border-bottom: none; border-top-color: #FFB400;
  }
  .ins-bar-inner { width: 100%; position: relative; flex: 1; display: flex; align-items: flex-end; }
  .ins-bar-bg {
    position: absolute; bottom: 0; width: 100%;
    background: rgba(255,255,255,0.05); border-radius: 10px 10px 6px 6px;
  }
  .ins-bar-fill {
    position: absolute; bottom: 0; width: 100%;
    background: #FFB400; border-radius: 10px 10px 6px 6px;
    transition: height 0.6s cubic-bezier(.4,0,.2,1);
  }
  .ins-bar-fill.highlighted { background: #FFD060; }
  .ins-bar-label { font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.25); margin-top: 10px; text-transform: uppercase; }

  /* TOTAL LINE */
  .ins-chart-total {
    display: flex; justify-content: space-between; align-items: center;
    margin-top: 28px; padding-top: 24px;
    border-top: 1px solid rgba(255,255,255,0.08);
  }
  .ins-chart-total-label { font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 1px; }
  .ins-chart-total-val { font-family: 'Sora', sans-serif; font-size: 26px; font-weight: 800; color: #FFB400; }

  /* WASTE CARD */
  .ins-waste-card {
    background: #fff; border-radius: 32px;
    border: 1px solid #EDE5DC; padding: 32px;
    display: flex; flex-direction: column; gap: 0;
  }
  .ins-waste-tag {
    display: inline-flex; align-items: center; gap: 7px;
    background: #FEE8E8; border-radius: 100px; padding: 5px 12px;
    font-size: 11px; font-weight: 700; color: #E63B1E;
    text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px;
    width: fit-content;
  }
  .ins-waste-title { font-family: 'Sora', sans-serif; font-size: 20px; font-weight: 800; color: #1A0A00; margin-bottom: 6px; }
  .ins-waste-subtitle { font-size: 13px; color: #AAA; margin-bottom: 28px; }
  .ins-waste-item { margin-bottom: 20px; }
  .ins-waste-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
  .ins-waste-item-name { font-size: 13px; font-weight: 700; color: #1A0A00; }
  .ins-waste-item-loss { font-family: 'Sora', sans-serif; font-size: 13px; font-weight: 800; color: #E63B1E; }
  .ins-waste-track { height: 8px; background: #F5EDE8; border-radius: 100px; overflow: hidden; }
  .ins-waste-fill { height: 100%; border-radius: 100px; }
  .ins-waste-fill.red { background: #E63B1E; }
  .ins-waste-fill.orange { background: #FF8C42; }
  .ins-waste-fill.amber { background: #FFB400; }
  .ins-waste-divider { height: 1px; background: #F5EDE8; margin: 24px 0; }
  .ins-ai-tip {
    display: flex; gap: 14px; align-items: flex-start;
    background: #FFF8F0; border-radius: 16px; padding: 16px;
    border: 1px solid #EDE5DC;
  }
  .ins-ai-icon {
    width: 38px; height: 38px; border-radius: 10px;
    background: #FFB400; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
  }
  .ins-ai-label { font-size: 10px; font-weight: 700; color: #FFB400; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
  .ins-ai-text { font-size: 13px; color: #555; line-height: 1.6; }

  /* LOWER GRID */
  .ins-lower-grid {
    max-width: 1200px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px;
  }
  @media (max-width: 1024px) { .ins-lower-grid { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 640px) { .ins-lower-grid { grid-template-columns: 1fr; } }

  /* TOP PRODUCTS CARD */
  .ins-products-card {
    background: #fff; border-radius: 28px;
    border: 1px solid #EDE5DC; padding: 30px;
  }
  .ins-card-title { font-family: 'Sora', sans-serif; font-size: 18px; font-weight: 800; color: #1A0A00; margin-bottom: 24px; }
  .ins-product-row {
    display: flex; align-items: center; gap: 14px; margin-bottom: 18px;
  }
  .ins-product-row:last-child { margin-bottom: 0; }
  .ins-product-rank {
    font-family: 'Sora', sans-serif; font-size: 13px; font-weight: 800;
    color: #DDD; width: 18px; flex-shrink: 0;
  }
  .ins-product-dot { width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0; }
  .ins-product-name { font-size: 14px; font-weight: 600; color: #1A0A00; flex: 1; }
  .ins-product-bar-wrap { flex: 1; height: 6px; background: #F5EDE8; border-radius: 100px; overflow: hidden; }
  .ins-product-bar-fill { height: 100%; border-radius: 100px; }
  .ins-product-share { font-family: 'Sora', sans-serif; font-size: 13px; font-weight: 800; color: #1A0A00; width: 36px; text-align: right; }

  /* PRICING CARD */
  .ins-pricing-card {
    background: #1A0A00; border-radius: 28px; padding: 30px;
  }
  .ins-pricing-title { font-family: 'Sora', sans-serif; font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 6px; }
  .ins-pricing-sub { font-size: 12px; color: rgba(255,255,255,0.35); margin-bottom: 24px; }
  .ins-price-item {
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px; padding: 16px; margin-bottom: 12px;
  }
  .ins-price-item:last-of-type { margin-bottom: 0; }
  .ins-price-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
  .ins-price-name { font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 1px; }
  .ins-price-change { display: flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 700; }
  .ins-price-change.up { color: #00D68F; }
  .ins-price-change.down { color: #FF6B6B; }
  .ins-price-vals { display: flex; align-items: baseline; gap: 8px; }
  .ins-price-new { font-family: 'Sora', sans-serif; font-size: 22px; font-weight: 800; color: #FFB400; }
  .ins-price-old { font-size: 13px; color: rgba(255,255,255,0.25); text-decoration: line-through; }
  .ins-price-reason { font-size: 11px; color: rgba(255,255,255,0.3); margin-top: 6px; line-height: 1.5; }
  .ins-update-btn {
    width: 100%; margin-top: 16px; padding: 14px;
    background: #FFB400; color: #1A0A00;
    border: none; border-radius: 12px; cursor: pointer;
    font-family: 'Sora', sans-serif; font-weight: 800; font-size: 13px;
    transition: all 0.2s; letter-spacing: 0.3px;
  }
  .ins-update-btn:hover { background: #FFC833; transform: translateY(-1px); }

  /* ALERTS CARD */
  .ins-alerts-card {
    background: #FFF8F0; border-radius: 28px;
    border: 1px solid #EDE5DC; padding: 30px;
    display: flex; flex-direction: column;
  }
  .ins-alerts-header { display: flex; align-items: center; gap: 8px; margin-bottom: 24px; }
  .ins-live-dot { width: 8px; height: 8px; border-radius: 50%; background: #E63B1E; animation: pulse-dot 1.5s infinite; }
  @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(1.5)} }
  .ins-alerts-title { font-family: 'Sora', sans-serif; font-size: 18px; font-weight: 800; color: #1A0A00; }
  .ins-alert-item { display: flex; gap: 14px; padding: 16px 0; border-bottom: 1px solid #F0E8E0; }
  .ins-alert-item:last-of-type { border-bottom: none; }
  .ins-alert-icon {
    width: 38px; height: 38px; border-radius: 10px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
  }
  .ins-alert-icon.danger { background: #FEE8E8; }
  .ins-alert-icon.success { background: #E8F8F0; }
  .ins-alert-icon.warn { background: #FFF3D0; }
  .ins-alert-title { font-family: 'Sora', sans-serif; font-size: 14px; font-weight: 700; color: #1A0A00; margin-bottom: 4px; }
  .ins-alert-body { font-size: 12px; color: #888; line-height: 1.6; }
  .ins-alert-time { font-size: 10px; font-weight: 700; color: #CCC; text-transform: uppercase; letter-spacing: 0.8px; margin-top: 4px; }
  .ins-reports-btn {
    margin-top: 20px; width: 100%; padding: 14px;
    background: #1A0A00; color: #FFB400;
    border: none; border-radius: 12px; cursor: pointer;
    font-family: 'Sora', sans-serif; font-weight: 800; font-size: 13px;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: all 0.2s;
  }
  .ins-reports-btn:hover { background: #2A1500; transform: translateY(-1px); }
`;

const barData = [
  { label: 'Mon', profit: 58, sales: 72 },
  { label: 'Tue', profit: 42, sales: 60 },
  { label: 'Wed', profit: 74, sales: 85 },
  { label: 'Thu', profit: 50, sales: 65 },
  { label: 'Fri', profit: 88, sales: 95 },
  { label: 'Sat', profit: 95, sales: 100 },
  { label: 'Sun', profit: 62, sales: 78 },
];

const products = [
  { name: 'Tomatoes', share: 62, color: '#E63B1E' },
  { name: 'Onions', share: 24, color: '#FFB400' },
  { name: 'Plantains', share: 14, color: '#00A86B' },
];

const wasteItems = [
  { name: 'Tomato Spoilage', loss: demoData.stats.wasteLoss, pct: 65, cls: 'red' },
  { name: 'Onion Shrinkage', loss: 45, pct: 28, cls: 'orange' },
  { name: 'Plantain Bruising', loss: 20, pct: 14, cls: 'amber' },
];

const priceRecs = [
  { name: 'Tomatoes', current: '₵12.00', old: '₵10.50', change: '+14%', dir: 'up', reason: 'Market scarcity detected near Makola.' },
  { name: 'Onions', current: '₵8.50', old: '₵9.00', change: '-6%', dir: 'down', reason: 'Surplus from border trade this week.' },
];

const alerts = [
  { type: 'danger', icon: <AlertCircle size={18} color="#E63B1E" />, title: 'Plantain Shortage', body: 'Central region supply delayed. Expect 20% price rise by tomorrow.', time: '2 hrs ago' },
  { type: 'success', icon: <TrendingUp size={18} color="#00A86B" />, title: 'Onion Surplus', body: 'Buy now — prices are at 6-month low. Good time to stock up.', time: '5 hrs ago' },
  { type: 'warn', icon: <Sparkles size={18} color="#FFB400" />, title: 'Thursday Pattern', body: 'Your tomato waste peaks every Thursday. Reduce Wednesday orders by 15%.', time: 'AI Insight' },
];

export default function Insights() {
  const [timeRange, setTimeRange] = useState('Month');

  const totalProfit = barData.reduce((s, d) => s + d.profit * 100, 0);

  return (
    <div className="ins-root">
      <style>{styles}</style>

      {/* HEADER */}
      <div className="ins-header" style={{ paddingTop: '60px' }}>
        <div>
          <div className="ins-header-eyebrow">W'adwuma Nhoma · Business Intelligence</div>
          <h1 className="ins-header-title ins-display">
            Wʼahonya<br /><span>Ho Adanse</span>
          </h1>
          <p className="ins-header-sub">Track profits, cut waste, and grow your market edge.</p>
        </div>
        <div className="ins-toggle">
          {['Week', 'Month', '3 Months'].map((r) => (
            <button
              key={r}
              className={`ins-toggle-btn ${timeRange === r ? 'active' : ''}`}
              onClick={() => setTimeRange(r)}
              type="button"
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* SUMMARY STRIP */}
      <div className="ins-summary-strip">
        <div className="ins-stat-card amber">
          <div className="ins-stat-label">Total Revenue</div>
          <div className="ins-stat-val">₵18,400</div>
          <span className="ins-stat-badge up">↑ 12% vs last month</span>
        </div>
        <div className="ins-stat-card green">
          <div className="ins-stat-label">Net Profit</div>
          <div className="ins-stat-val green">₵4,250</div>
          <span className="ins-stat-badge up">↑ 8% vs last month</span>
        </div>
        <div className="ins-stat-card red">
          <div className="ins-stat-label">Waste Losses</div>
          <div className="ins-stat-val red">₵{demoData.stats.wasteLoss}</div>
          <span className="ins-stat-badge down">↑ 5% — needs attention</span>
        </div>
        <div className="ins-stat-card dark">
          <div className="ins-stat-label">Trust Score</div>
          <div className="ins-stat-val">78 / 100</div>
          <span className="ins-stat-badge up">↑ 4 pts this month</span>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="ins-main-grid">
        {/* BAR CHART */}
        <div className="ins-chart-card">
          <div className="ins-chart-header">
            <div>
              <div className="ins-chart-title ins-display">Profit Trends</div>
              <div className="ins-chart-sub">Net income · {timeRange}</div>
            </div>
            <div className="ins-chart-legend">
              <div className="ins-legend-item">
                <div className="ins-legend-dot" style={{ background: '#FFB400' }} />
                Profit
              </div>
              <div className="ins-legend-item">
                <div className="ins-legend-dot" style={{ background: 'rgba(255,255,255,0.1)' }} />
                Sales
              </div>
            </div>
          </div>

          <div className="ins-bars">
            {barData.map((d, i) => (
              <div className="ins-bar-group" key={i}>
                <div className="ins-bar-tooltip">₵{(d.profit * 100).toLocaleString()}</div>
                <div className="ins-bar-inner">
                  <div
                    className="ins-bar-bg"
                    style={{ height: `${d.sales}%` }}
                  />
                  <div
                    className={`ins-bar-fill ${d.profit === 95 ? 'highlighted' : ''}`}
                    style={{ height: `${d.profit}%` }}
                  />
                </div>
                <span className="ins-bar-label">{d.label}</span>
              </div>
            ))}
          </div>

          <div className="ins-chart-total">
            <span className="ins-chart-total-label">Total {timeRange} Profit</span>
            <span className="ins-chart-total-val ins-display">₵{totalProfit.toLocaleString()}</span>
          </div>
        </div>

        {/* WASTE CARD */}
        <div className="ins-waste-card">
          <div className="ins-waste-tag">
            <ShoppingBag size={12} />
            Spoilage Alert
          </div>
          <div className="ins-waste-title ins-display">Waste Analysis</div>
          <div className="ins-waste-subtitle">Where your money is leaking</div>

          {wasteItems.map((w, i) => (
            <div className="ins-waste-item" key={i}>
              <div className="ins-waste-row">
                <span className="ins-waste-item-name">{w.name}</span>
                <span className="ins-waste-item-loss">−₵{w.loss}</span>
              </div>
              <div className="ins-waste-track">
                <div className={`ins-waste-fill ${w.cls}`} style={{ width: `${w.pct}%` }} />
              </div>
            </div>
          ))}

          <div className="ins-waste-divider" />

          <div className="ins-ai-tip">
            <div className="ins-ai-icon">
              <Sparkles size={18} color="#1A0A00" />
            </div>
            <div>
              <div className="ins-ai-label">AI Insight</div>
              <div className="ins-ai-text">
                Your tomato waste peaks on Thursdays. Reduce Wednesday purchases by 15% to save ~₵{Math.round(demoData.stats.wasteLoss * 0.4)}/month.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LOWER GRID */}
      <div className="ins-lower-grid">
        {/* TOP PRODUCTS */}
        <div className="ins-products-card">
          <div className="ins-card-title ins-display">Top Selling</div>
          {products.map((p, i) => (
            <div className="ins-product-row" key={i}>
              <span className="ins-product-rank">#{i + 1}</span>
              <div className="ins-product-dot" style={{ background: p.color }} />
              <span className="ins-product-name">{p.name}</span>
              <div className="ins-product-bar-wrap">
                <div
                  className="ins-product-bar-fill"
                  style={{ width: `${p.share}%`, background: p.color }}
                />
              </div>
              <span className="ins-product-share">{p.share}%</span>
            </div>
          ))}
        </div>

        {/* PRICING */}
        <div className="ins-pricing-card">
          <div className="ins-pricing-title ins-display">Pricing Tips</div>
          <div className="ins-pricing-sub">AI-recommended prices based on market data</div>
          {priceRecs.map((p, i) => (
            <div className="ins-price-item" key={i}>
              <div className="ins-price-row">
                <span className="ins-price-name">{p.name}</span>
                <span className={`ins-price-change ${p.dir}`}>
                  {p.dir === 'up' ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                  {p.change}
                </span>
              </div>
              <div className="ins-price-vals">
                <span className="ins-price-new">{p.current}</span>
                <span className="ins-price-old">{p.old}</span>
              </div>
              <div className="ins-price-reason">{p.reason}</div>
            </div>
          ))}
          <button className="ins-update-btn" type="button">
            Update All Prices ↗
          </button>
        </div>

        {/* ALERTS */}
        <div className="ins-alerts-card">
          <div className="ins-alerts-header">
            <div className="ins-live-dot" />
            <span className="ins-alerts-title ins-display">Live Alerts</span>
          </div>
          {alerts.map((a, i) => (
            <div className="ins-alert-item" key={i}>
              <div className={`ins-alert-icon ${a.type}`}>
                {a.icon}
              </div>
              <div>
                <div className="ins-alert-title">{a.title}</div>
                <div className="ins-alert-body">{a.body}</div>
                <div className="ins-alert-time">{a.time}</div>
              </div>
            </div>
          ))}
          <button className="ins-reports-btn" type="button">
            See Global Reports
            <ArrowUpRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}