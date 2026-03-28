import React from 'react';
import { Link } from 'react-router-dom';
import { Mic, BarChart3, ShieldCheck, ArrowRight, Play, Star, TrendingUp, Phone, Users } from 'lucide-react';
import tomatoesImg from '../assets/tomatoes.jpg';
import fishImg from '../assets/fish.jpg';
import nutsImg from '../assets/nuts.jpg';

interface PainCard {
  icon: string;
  bg: 'red' | 'amber' | 'purple';
  title: string;
  desc: string;
}

interface Testimonial {
  text: string;
  name: string;
  market: string;
  initials: string;
  color: string;
  lang: string;
}

interface Step {
  num: string;
  icon: React.ReactNode;
  bg: string;
  title: string;
  desc: string;
  extra: React.ReactNode | null;
}

interface TrustRow {
  key: string;
  val: string;
  green?: boolean;
}

interface ProofItem {
  icon: React.ReactNode;
  label: string;
}

interface TrustStat {
  val: string;
  lbl: string;
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Noto+Sans:wght@400;500;600&display=swap');

  .ml-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .ml-root { font-family: 'Noto Sans', sans-serif; background: #FFF8F0; color: #1A0A00; overflow-x: hidden; }
  .ml-display { font-family: 'Sora', sans-serif; }

  .ml-hero { background: #1A0A00; position: relative; overflow: hidden; padding: 0 0 120px; }
  .ml-hero-pattern {
    position: absolute; inset: 0;
    background-image:
      repeating-linear-gradient(90deg, transparent, transparent 48px, rgba(255,180,0,0.06) 48px, rgba(255,180,0,0.06) 50px),
      repeating-linear-gradient(0deg, transparent, transparent 48px, rgba(255,180,0,0.06) 48px, rgba(255,180,0,0.06) 50px);
    pointer-events: none;
  }
  .ml-hero-stripe {
    height: 6px;
    background: repeating-linear-gradient(90deg, #FFB400 0, #FFB400 40px, #E63B1E 40px, #E63B1E 80px, #00A86B 80px, #00A86B 120px, #1A0A00 120px, #1A0A00 160px);
    width: 100%;
    position: relative; z-index: 20;
  }

  .ml-nav { display: flex; align-items: center; justify-content: space-between; padding: 24px 5%; position: relative; z-index: 10; }
  .ml-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
  .ml-logo-mark { width: 40px; height: 40px; border-radius: 10px; background: #FFB400; display: flex; align-items: center; justify-content: center; font-family: 'Sora', sans-serif; font-weight: 800; font-size: 18px; color: #1A0A00; }
  .ml-logo-text { font-family: 'Sora', sans-serif; font-weight: 700; font-size: 20px; color: #fff; }
  .ml-nav-btn { background: #FFB400; color: #1A0A00; border: none; border-radius: 10px; font-family: 'Sora', sans-serif; font-weight: 700; font-size: 14px; padding: 12px 24px; cursor: pointer; transition: all 0.2s; text-decoration: none; }
  .ml-nav-btn:hover { background: #FFC833; transform: translateY(-1px); }

  .ml-hero-content {
    max-width: 1240px; margin: 0 auto; padding: 60px 5% 0;
    display: grid; grid-template-columns: 1fr 1.2fr; gap: 60px; align-items: center;
    position: relative; z-index: 5;
  }
  @media (max-width: 1024px) {
    .ml-hero-content { grid-template-columns: 1fr; gap: 80px; text-align: center; }
    .ml-hero-visual { order: -1; }
    .ml-btn-wrap { justify-content: center; }
  }

  .ml-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,180,0,0.15); border: 1px solid rgba(255,180,0,0.3); border-radius: 100px; padding: 8px 16px; font-size: 13px; font-weight: 600; color: #FFB400; margin-bottom: 24px; }
  .ml-badge-dot { width: 8px; height: 8px; border-radius: 50%; background: #FFB400; animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.3)} }

  .ml-hero h1 { font-family: 'Sora', sans-serif; font-size: clamp(42px,6vw,68px); font-weight: 800; line-height: 1.05; color: #fff; margin-bottom: 24px; letter-spacing: -0.03em; }
  .ml-hero h1 span { color: #FFB400; }
  .ml-hero-twi { font-size: 16px; color: rgba(255,180,0,0.7); font-weight: 700; margin-bottom: 20px; letter-spacing: 0.5px; text-transform: uppercase; }
  .ml-hero p { font-size: 19px; line-height: 1.7; color: rgba(255,255,255,0.6); margin-bottom: 48px; max-width: 540px; }
  @media (max-width: 1024px) { .ml-hero p { margin-left: auto; margin-right: auto; } }
  .ml-btn-wrap { display: flex; gap: 16px; flex-wrap: wrap; }

  .ml-btn-primary { display: inline-flex; align-items: center; gap: 12px; background: #FFB400; color: #1A0A00; border-radius: 16px; padding: 20px 40px; font-family: 'Sora', sans-serif; font-weight: 800; font-size: 18px; text-decoration: none; border: none; cursor: pointer; transition: all 0.3s; box-shadow: 0 20px 50px rgba(255,180,0,0.3); }
  .ml-btn-primary:hover { background: #FFC833; transform: translateY(-4px); box-shadow: 0 30px 60px rgba(255,180,0,0.4); }
  .ml-btn-secondary { display: inline-flex; align-items: center; gap: 10px; background: transparent; color: #fff; border-radius: 16px; padding: 20px 32px; font-family: 'Sora', sans-serif; font-weight: 700; font-size: 17px; text-decoration: none; border: 1px solid rgba(255,255,255,0.2); cursor: pointer; transition: all 0.2s; }
  .ml-btn-secondary:hover { background: rgba(255,255,255,0.08); border-color: #fff; }

  /* IMAGE COLLAGE HERO */
  .ml-hero-visual { position: relative; height: 560px; width: 100%; display: flex; align-items: center; justify-content: center; }
  .ml-img-card { position: absolute; border-radius: 40px; overflow: hidden; border: 4px solid rgba(255,255,255,0.2); box-shadow: 0 40px 100px rgba(0,0,0,0.5); transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
  .ml-img-card img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s; }
  .ml-img-card:hover img { transform: scale(1.1); }
  
  .ml-img-1 { width: 280px; height: 380px; z-index: 10; transform: rotate(-6deg) translateX(-60px); }
  .ml-img-2 { width: 320px; height: 420px; z-index: 20; border-color: #FFB400; transform: translateY(-20px); }
  .ml-img-3 { width: 260px; height: 340px; z-index: 15; transform: rotate(8deg) translateX(80px) translateY(40px); }

  .ml-pic-label { position: absolute; bottom: 24px; left: 24px; background: rgba(0,0,0,0.7); backdrop-filter: blur(10px); padding: 8px 16px; border-radius: 12px; color: #fff; font-family: 'Sora', sans-serif; font-weight: 700; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; }

  /* SOCIAL PROOF BAR */
  .ml-proof-bar { background: #FFB400; padding: 20px 5%; display: flex; align-items: center; justify-content: center; gap: 60px; flex-wrap: wrap; position: relative; z-index: 10; }
  .ml-proof-item { display: flex; align-items: center; gap: 10px; font-size: 15px; font-weight: 700; color: #1A0A00; }

  /* SECTIONS */
  .ml-section { max-width: 1100px; margin: 0 auto; padding: 120px 5%; }
  .ml-section-label { font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 3px; color: #E63B1E; margin-bottom: 16px; }
  .ml-section-title { font-family: 'Sora', sans-serif; font-size: clamp(32px,5vw,52px); font-weight: 800; line-height: 1.1; color: #1A0A00; margin-bottom: 24px; letter-spacing: -0.02em; }
  .ml-section-body { font-size: 19px; line-height: 1.8; color: #555; }

  .ml-problem-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
  @media (max-width: 900px) { .ml-problem-grid { grid-template-columns: 1fr; gap: 60px; } }

  .ml-pain-cards { display: flex; flex-direction: column; gap: 16px; margin-top: 40px; }
  .ml-pain-card { display: flex; align-items: flex-start; gap: 20px; background: #fff; border-radius: 20px; padding: 24px; border: 1px solid #F0E8E0; box-shadow: 0 4px 20px rgba(0,0,0,0.03); transition: all 0.3s; }
  .ml-pain-card:hover { box-shadow: 0 10px 40px rgba(0,0,0,0.08); transform: translateX(8px); border-color: #FFB400; }
  .ml-pain-icon { width: 56px; height: 56px; border-radius: 14px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 24px; }
  .ml-pain-icon.red { background: #FEE8E8; }
  .ml-pain-icon.amber { background: #FFF3D0; }
  .ml-pain-icon.purple { background: #F0EBFE; }
  .ml-pain-title { font-family: 'Sora', sans-serif; font-weight: 800; font-size: 16px; color: #1A0A00; margin-bottom: 4px; }
  .ml-pain-desc { font-size: 14px; color: #777; line-height: 1.6; }

  .ml-loss-visual { background: #1A0A00; border-radius: 40px; padding: 60px 40px; text-align: center; color: #fff; position: relative; overflow: hidden; box-shadow: 0 40px 100px rgba(0,0,0,0.2); }
  .ml-loss-visual::before { content: ''; position: absolute; inset: 0; background-image: repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,180,0,0.04) 20px, rgba(255,180,0,0.04) 21px); }
  .ml-loss-number { font-family: 'Sora', sans-serif; font-size: 100px; font-weight: 800; color: #FFB400; line-height: 1; position: relative; z-index: 1; }
  .ml-loss-label { font-size: 20px; font-weight: 600; color: rgba(255,255,255,0.8); margin-top: 12px; position: relative; z-index: 1; }
  .ml-loss-sub { font-size: 15px; color: rgba(255,255,255,0.4); margin-top: 32px; padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.1); position: relative; z-index: 1; line-height: 1.7; }

  /* STEPS */
  .ml-steps-bg { background: #1A0A00; }
  .ml-steps-bg .ml-section-title { color: #fff; }
  .ml-steps-bg .ml-section-body { color: rgba(255,255,255,0.5); }
  .ml-steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; margin-top: 64px; }
  @media (max-width: 800px) { .ml-steps-grid { grid-template-columns: 1fr; } }
  .ml-step-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 32px; padding: 48px 32px; position: relative; overflow: hidden; transition: all 0.4s; }
  .ml-step-card:hover { background: rgba(255,180,0,0.06); border-color: rgba(255,180,0,0.3); transform: translateY(-10px); }
  .ml-step-num { font-family: 'Sora', sans-serif; font-size: 80px; font-weight: 800; color: rgba(255,180,0,0.1); position: absolute; top: 12px; right: 24px; line-height: 1; }
  .ml-step-icon { width: 64px; height: 64px; border-radius: 18px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; }
  .ml-step-title { font-family: 'Sora', sans-serif; font-weight: 800; font-size: 24px; color: #fff; margin-bottom: 12px; }
  .ml-step-desc { font-size: 16px; color: rgba(255,255,255,0.5); line-height: 1.8; }

  /* TRUST */
  .ml-trust-bg { background: linear-gradient(160deg, #00A86B 0%, #006640 100%); }
  .ml-trust-report { background: #fff; border-radius: 32px; padding: 48px; box-shadow: 0 60px 120px rgba(0,0,0,0.3); }
  .ml-trust-stat { background: rgba(255,255,255,0.12); border-radius: 20px; padding: 24px; border: 1px solid rgba(255,255,255,0.1); }
  .ml-trust-stat-val { font-family: 'Sora', sans-serif; font-size: 32px; font-weight: 800; color: #fff; }

  /* CTA */
  .ml-cta-bg { background: #FFB400; }
  .ml-footer { background: #1A0A00; padding: 60px 5%; border-top: 1px solid rgba(255,255,255,0.05); }
`;

const painCards: PainCard[] = [
  { icon: '📒', bg: 'red', title: 'Nhoma a wɔkyerɛw mu firi ase', desc: 'Osu, ogya, anaa da a wɔbɔ — wo nkorafoo nhoma yera.' },
  { icon: '🍅', bg: 'amber', title: 'Tomato a efu a wonni ne ho akyi', desc: 'Crates 50 a efu no? Ɛde ₵2,000 firi wo nsam da biara.' },
  { icon: '🏦', bg: 'purple', title: 'Bank ka sɛ "wo nni documents"', desc: 'Sɛ wonni nhoma a, wobɛtumi de loan ansa na woanya loan, ɛwom sɛ wo business yɛ yiye.' },
];

const testimonials: Testimonial[] = [
  {
    text: "Ansa na MarketLink ba, minnhuu sɛnea mede bɔɔ da biara mu. Seesei meka m'atonton agu m'foon mu, anopa anaa anadwo mehunu me gain. Menyaa ₵8,000 loan firi m'MFI!",
    name: "Akosua Boateng",
    market: "Makola Market, Accra",
    initials: "AB",
    color: "#E63B1E",
    lang: "Twi",
  },
  {
    text: "Makɛ Ewe nam le application sia me. Etua ŋu kpɔ nyem. Ƒom le nu si mawɔ la kpɔ business report si le domenyime la, eya akɔ ŋu dzi. Bank na ŋ loan kpɔ!",
    name: "Esi Agbemavor",
    market: "Agbogbloshie Market, Accra",
    initials: "EA",
    color: "#00A86B",
    lang: "Ewe",
  },
  {
    text: "Ni mi kasa Hausa, application oyi. Ni mi yi kasuwancin gobe, na san kudin da na samu tun daga safe. Babban taimako ne!",
    name: "Hajia Ramatu",
    market: "Kumasi Central Market",
    initials: "HR",
    color: "#7C3AED",
    lang: "Hausa",
  },
];

const steps: Step[] = [
  {
    num: '1',
    icon: <Mic size={28} color="#FFB400" />,
    bg: 'rgba(255,180,0,0.15)',
    title: 'Kasa Wʼankasa Kasa Mu',
    desc: 'Kye tomfa no na ka deɛ woton, atɔn, anaa adeɛ a wogu ho. Nkyerɛw biara nhia.',
    extra: (
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '16px' }}>
        {['Twi', 'Ewe', 'Ga', 'Hausa', 'Fante', 'English'].map((lang) => (
          <span key={lang} style={{ background: 'rgba(255,180,0,0.1)', color: '#FFB400', fontSize: '11px', fontWeight: 800, padding: '4px 10px', borderRadius: '100px', border: '1px solid rgba(255,180,0,0.2)' }}>{lang}</span>
        ))}
      </div>
    ),
  },
  {
    num: '2',
    icon: <BarChart3 size={28} color="#00D68F" />,
    bg: 'rgba(0,168,107,0.2)',
    title: 'Hu Wʼadwuma Pefee',
    desc: 'Nya ɛda biara gain, AI pricing ntɛmtɛm, na mpaeɛ a wode srɛ wo sɛ wobehu siade firi tomato a efu.',
    extra: null,
  },
  {
    num: '3',
    icon: <ShieldCheck size={28} color="#A78BFA" />,
    bg: 'rgba(124,58,237,0.2)',
    title: 'Gye Loan a Wʼani Agye Ho',
    desc: 'Wʼkasa-nhoma no yɛ Trust Score. De kyerɛ bank anaa MFI biara wɔ Ghana mu na nya loan — warranty biara nhia.',
    extra: null,
  },
];

const trustRows: TrustRow[] = [
  { key: 'Aguabea', val: 'Makola, Accra' },
  { key: 'Adwuma Suban', val: 'Tomato & Nnuan' },
  { key: 'Mmeae Bere', val: 'Ɔpɛpɔn 2024' },
  { key: 'Adaduanan 3 Nsesa', val: '₵18,400' },
  { key: 'Adaduanan 3 Gain', val: '₵4,250', green: true },
  { key: 'Nhoma a Wɔkyerɛw', val: 'Kasa-nhoma 342' },
];

const trustStats: TrustStat[] = [
  { val: '₵10.5M', lbl: 'Loan a wɔde ama atramfoɔ' },
  { val: '78/100', lbl: 'Trust Score tenten' },
  { val: 'Nnɛ 3', lbl: 'Bere a ɛtia sɛ woanya loan' },
  { val: 'Bank 12', lbl: 'Nkuafoɔ banks wɔ Ghana' },
];

const proofItems: ProofItem[] = [
  { icon: <Users size={16} />, label: 'Atramfoɔ 12,400+' },
  { icon: <TrendingUp size={16} />, label: 'Loan ₵10.5M Akyɛ' },
  { icon: <Star size={16} fill="currentColor" />, label: '4.9 / 5 Nhyehyɛe' },
  { icon: <Phone size={16} />, label: 'Foon Biara So Yɛ Adwuma' },
];

export default function LandingPage(): React.ReactElement {
  return (
    <div className="ml-root">
      <style>{styles}</style>

      {/* KENTE STRIPE */}
      <div className="ml-hero-stripe" />

      {/* HERO */}
      <section className="ml-hero">
        <div className="ml-hero-pattern" />

        <nav className="ml-nav">
          <Link to="/" className="ml-logo">
            <div className="ml-logo-mark">M</div>
            <span className="ml-logo-text">MarketLink</span>
          </Link>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
             <Link to="/login" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: '14px', opacity: 0.7 }}>Log In</Link>
             <Link to="/signup" className="ml-nav-btn">Start Today →</Link>
          </div>
        </nav>

        <div className="ml-hero-content">
          <div>
            <div className="ml-badge">
              <div className="ml-badge-dot" />
              <span>Ama Ghana Aguabea Maame</span>
            </div>
            <h1 className="ml-display">
              <span>Ka</span> wʼatonton,<br />
              <span>Hu</span> wʼahonya,<br />
              <span>Nya</span> Loan.
            </h1>
            <p className="ml-hero-twi">
              Kasa w'atonton agu w'foon mu · Track Gains · Build Credit
            </p>
            <p>
              Sɛ woton tomato, nnuan, anaa ntama a, kya tomfa no na ka. MarketLink bɛyɛ w'akonta nyinaa, kyerɛ wo w'ahonya, na boa wo nya loan firi bank — warranty biara nhia.
            </p>
            <div className="ml-btn-wrap">
              <Link to="/signup" className="ml-btn-primary">
                Start New — Just Like That
                <ArrowRight size={20} />
              </Link>
              <button className="ml-btn-secondary" type="button">
                <Play size={18} fill="white" />
                See How It Works
              </button>
            </div>
          </div>

          {/* Premium Image Collage */}
          <div className="ml-hero-visual">
            <div className="ml-img-card ml-img-1">
              <img src={fishImg} alt="Market Fish" />
              <div className="ml-pic-label">Fresh Fish</div>
            </div>
            <div className="ml-img-card ml-img-2">
              <img src={tomatoesImg} alt="Market Tomatoes" />
              <div className="ml-pic-label">Tomato Crates</div>
            </div>
            <div className="ml-img-card ml-img-3">
              <img src={nutsImg} alt="Market Nuts" />
              <div className="ml-pic-label">Market Grains</div>
            </div>

            {/* Floating Credit Card / Indicator */}
            <div style={{ position: 'absolute', bottom: '20px', right: '-10px', width: '220px', padding: '24px', borderRadius: '24px', background: 'rgba(0,168,107,0.85)', backdropFilter: 'blur(10px)', color: '#fff', zIndex: 30, boxShadow: '0 20px 40px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.2)' }}>
               <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', opacity: 0.7, marginBottom: '6px' }}>Loan Eligibility</div>
               <div className="ml-display" style={{ fontSize: '24px', fontWeight: 800 }}>₵15,000</div>
               <div style={{ fontSize: '10px', marginTop: '10px', padding: '6px 10px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', display: 'inline-block' }}>Verified by MarketLink</div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <div className="ml-proof-bar">
        {proofItems.map((item, i) => (
          <div className="ml-proof-item" key={i}>
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      {/* PROBLEM */}
      <section style={{ background: '#FFF8F0' }}>
        <div className="ml-section">
          <div className="ml-problem-grid">
            <div>
              <div className="ml-section-label">Ɔhaw a Ɛwɔ Hɔ</div>
              <h2 className="ml-section-title ml-display">
                Wɔ ton da biara?<br />
                Wʼsika refi ase.
              </h2>
              <p className="ml-section-body">
                Aguabea maame sɛ wo yɛ atonton mpempem da biara. Nanso sɛ wonni nhoma a, wuhu sika a efi wo nsam a wonhu.
              </p>
              <div className="ml-pain-cards">
                {painCards.map((item, i) => (
                  <div className="ml-pain-card" key={i}>
                    <div className={`ml-pain-icon ${item.bg}`}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="ml-pain-title">{item.title}</div>
                      <div className="ml-pain-desc">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="ml-loss-visual">
              <div className="ml-loss-number">20%</div>
              <div className="ml-loss-label">gain a efiri ase osram biara</div>
              <div className="ml-loss-sub">
                Ohene a ɔde ₵5,000 osram biara mu no hu ₵1,000 firi nhoma a ɔannkyerɛw. Ɛyɛ ₵12,000 afe biara — ayera kɔɛ.
                <br /><br />
                <strong style={{ color: '#FFB400' }}>MarketLink bɔ saa babi no.</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="ml-testi-bg">
        <div className="ml-section">
          <div className="ml-section-label" style={{ textAlign: 'center' }}>Mmaa Nokwafoɔ. Ntoanodie Nokwafoɔ.</div>
          <h2 className="ml-section-title ml-display" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 56px' }}>
            Tie firi atramfoɔ sɛ wo ara
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {testimonials.map((t, i) => (
              <div className="ml-testi-card" key={i} style={{ background: '#FFF8F0', border: '1px solid #F0E8DE', borderRadius: '24px', padding: '32px' }}>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                   {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="#FFB400" color="#FFB400" />)}
                </div>
                <div style={{ fontSize: '16px', lineHeight: 1.7, color: '#333', fontStyle: 'italic', marginBottom: '24px' }}>"{t.text}"</div>
                <div className="ml-testi-author">
                  <div className="ml-testi-avatar" style={{ background: t.color }}>{t.initials}</div>
                  <div>
                    <div className="ml-testi-name">{t.name}</div>
                    <div className="ml-testi-market">{t.market}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="ml-steps-bg">
        <div className="ml-section">
          <div className="ml-section-label" style={{ color: 'rgba(255,180,0,0.7)', textAlign: 'center' }}>Yiye Sɛ 1-2-3</div>
          <h2 className="ml-section-title ml-display" style={{ textAlign: 'center' }}>
            Penseo nti. Nhoma nti. Kasa kɛkɛ.
          </h2>
          <div className="ml-steps-grid">
            {steps.map((step, i) => (
              <div className="ml-step-card" key={i}>
                <div className="ml-step-num">{step.num}</div>
                <div className="ml-step-icon" style={{ background: step.bg }}>
                  {step.icon}
                </div>
                <div className="ml-step-title ml-display">{step.title}</div>
                <div className="ml-step-desc">{step.desc}</div>
                {step.extra}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST SCORE DETAILS */}
      <section className="ml-trust-bg" style={{ padding: '40px 0 120px' }}>
        <div className="ml-section">
          <div className="ml-trust-grid">
            <div>
              <div className="ml-section-label">Wʼadwuma Ho Nhoma</div>
              <h2 className="ml-section-title ml-display">Wʼnhoma. Wʼloan. Warranty biara nhia.</h2>
              <p className="ml-section-body" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Atonton biara a wokyerɛw no kyerɛ wo Trust Score — adwuma nhoma a Ghana banks ne MFIs de ma wo loan ntɛm ara.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '40px' }}>
                {trustStats.map((stat, i) => (
                  <div className="ml-trust-stat" key={i}>
                    <div className="ml-trust-stat-val">{stat.val}</div>
                    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>{stat.lbl}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="ml-trust-report">
              <div className="flex justify-between items-center mb-8 border-b-2 border-slate-100 pb-6">
                <div>
                   <div style={{ fontSize: '10px', fontWeight: 800, color: '#888', textTransform: 'uppercase', letterSpacing: '2px' }}>Official Trust Certificate</div>
                   <div className="ml-display" style={{ fontSize: '20px', fontWeight: 800 }}>Ama Mensah</div>
                </div>
                <div style={{ background: '#E8F8F0', padding: '8px 16px', borderRadius: '100px', color: '#00A86B', fontWeight: 800, fontSize: '12px' }}>Verified</div>
              </div>
              <div className="space-y-4">
                 {trustRows.map((row, i) => (
                   <div key={i} className="flex justify-between border-b border-slate-50 pb-3">
                      <span style={{ fontSize: '13px', color: '#888' }}>{row.key}</span>
                      <span className={`ml-display ${row.green ? 'text-[#00A86B]' : ''}`} style={{ fontSize: '14px', fontWeight: 700 }}>{row.val}</span>
                   </div>
                 ))}
              </div>
              <div style={{ marginTop: '32px', background: '#F8FFF5', padding: '24px', borderRadius: '20px' }}>
                <div className="flex justify-between mb-2">
                   <span style={{ fontWeight: 800 }}>Trust Score</span>
                   <span style={{ fontWeight: 800, color: '#00A86B' }}>78 / 100</span>
                </div>
                <div style={{ height: '10px', background: '#E8EEE5', borderRadius: '10px', overflow: 'hidden' }}>
                   <div style={{ width: '78%', height: '100%', background: '#00A86B' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ml-cta-bg" style={{ padding: '100px 5%', textAlign: 'center' }}>
        <h2 className="ml-section-title ml-display">Start today. Grow your capital.</h2>
        <Link to="/signup" className="ml-btn-primary" style={{ fontSize: '20px', padding: '24px 60px' }}>
          Join 12,400+ Traders <ArrowRight size={24} />
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="ml-footer">
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="ml-logo">
            <div className="ml-logo-mark">M</div>
            <span className="ml-logo-text">MarketLink</span>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>© 2024 MarketLink. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}