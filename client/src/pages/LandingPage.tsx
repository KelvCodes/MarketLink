import React from 'react';
import { Link } from 'react-router-dom';
import { Mic, BarChart3, ShieldCheck, ArrowRight, Play, CheckCircle2, Star, TrendingUp, Phone, Users } from 'lucide-react';

import fishImg from '../assets/fish.jpg';
import nutsImg from '../assets/nuts.jpg';
import tomatoesImg from '../assets/tomatoes.jpg';

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

  .ml-hero { background: #1A0A00; position: relative; overflow: hidden; padding: 0 0 80px; }
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
  }

  .ml-nav { display: flex; align-items: center; justify-content: space-between; padding: 24px 5%; position: relative; z-index: 10; }
  .ml-logo { display: flex; align-items: center; gap: 10px; }
  .ml-logo-mark { width: 40px; height: 40px; border-radius: 10px; background: #FFB400; display: flex; align-items: center; justify-content: center; font-family: 'Sora', sans-serif; font-weight: 800; font-size: 18px; color: #1A0A00; }
  .ml-logo-text { font-family: 'Sora', sans-serif; font-weight: 700; font-size: 20px; color: #fff; }
  .ml-nav-btn { background: #FFB400; color: #1A0A00; border: none; border-radius: 10px; font-family: 'Sora', sans-serif; font-weight: 700; font-size: 14px; padding: 12px 24px; cursor: pointer; transition: all 0.2s; text-decoration: none; }
  .ml-nav-btn:hover { background: #FFC833; transform: translateY(-1px); }

  .ml-hero-content {
    max-width: 1100px; margin: 0 auto; padding: 60px 5% 0;
    display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;
    position: relative; z-index: 5;
  }
  @media (max-width: 768px) {
    .ml-hero-content { grid-template-columns: 1fr; gap: 40px; }
    .ml-hero-visual { order: -1; }
  }

  .ml-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,180,0,0.15); border: 1px solid rgba(255,180,0,0.3); border-radius: 100px; padding: 8px 16px; font-size: 13px; font-weight: 600; color: #FFB400; margin-bottom: 24px; }
  .ml-badge-dot { width: 8px; height: 8px; border-radius: 50%; background: #FFB400; animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.3)} }

  .ml-hero h1 { font-family: 'Sora', sans-serif; font-size: clamp(34px,5vw,56px); font-weight: 800; line-height: 1.1; color: #fff; margin-bottom: 16px; }
  .ml-hero h1 span { color: #FFB400; }
  .ml-hero-twi { font-size: 14px; color: rgba(255,180,0,0.6); font-weight: 600; margin-bottom: 16px; letter-spacing: 0.3px; }
  .ml-hero p { font-size: 17px; line-height: 1.7; color: rgba(255,255,255,0.7); margin-bottom: 36px; }
  .ml-hero-btns { display: flex; gap: 14px; flex-wrap: wrap; }

  .ml-btn-primary { display: inline-flex; align-items: center; gap: 8px; background: #FFB400; color: #1A0A00; border-radius: 12px; padding: 16px 28px; font-family: 'Sora', sans-serif; font-weight: 700; font-size: 16px; text-decoration: none; border: none; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 24px rgba(255,180,0,0.4); }
  .ml-btn-primary:hover { background: #FFC833; transform: translateY(-2px); box-shadow: 0 8px 32px rgba(255,180,0,0.5); }
  .ml-btn-secondary { display: inline-flex; align-items: center; gap: 8px; background: transparent; color: #fff; border-radius: 12px; padding: 16px 28px; font-family: 'Sora', sans-serif; font-weight: 600; font-size: 16px; text-decoration: none; border: 1px solid rgba(255,255,255,0.25); cursor: pointer; transition: all 0.2s; }
  .ml-btn-secondary:hover { background: rgba(255,255,255,0.08); }

  /* OVERLAPPING IMAGES FEEDBACK */
  .ml-hero-visual { position: relative; height: 100%; min-height: 580px; display: flex; align-items: center; justify-content: center; transform: translateX(20px); }
  
  .ml-floating-card {
    position: absolute; border-radius: 28px; overflow: hidden;
    box-shadow: 0 40px 100px rgba(0,0,0,0.6);
    border: 2px solid rgba(255,255,255,0.15);
    z-index: 3; transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    background: #fff;
  }
  .ml-floating-card:hover { transform: translateY(-20px) scale(1.1) rotate(0deg); z-index: 20; box-shadow: 0 60px 120px rgba(0,0,0,0.7); }

  .ml-card-1 { width: 260px; top: 15%; right: 10%; transform: rotate(5deg); z-index: 5; }
  .ml-card-2 { width: 240px; bottom: 15%; left: 8%; transform: rotate(-8deg); z-index: 4; }
  .ml-card-3 { width: 220px; top: 5%; left: 15%; transform: rotate(-3deg); z-index: 3; }

  .ml-card-img { width: 100%; height: 180px; object-fit: cover; display: block; }
  .ml-card-info { padding: 15px; text-align: center; background: #fff; }
  .ml-card-tag { font-family: 'Sora', sans-serif; font-weight: 800; font-size: 14px; color: #1A0A00; }
  
  @media (max-width: 768px) {
    .ml-hero-visual { min-height: 480px; margin-top: 60px; transform: translateX(0); }
    .ml-card-1 { width: 160px; right: -5%; }
    .ml-card-2 { width: 140px; left: -5%; }
    .ml-card-3 { width: 130px; top: -5%; }
    .ml-card-4 { width: 140px; }
  }

  /* SOCIAL PROOF BAR */
  .ml-proof-bar { background: #FFB400; padding: 14px 5%; display: flex; align-items: center; justify-content: center; gap: 40px; flex-wrap: wrap; }
  .ml-proof-item { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; color: #1A0A00; }

  /* SECTIONS */
  .ml-section { max-width: 1100px; margin: 0 auto; padding: 80px 5%; }
  .ml-section-label { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #E63B1E; margin-bottom: 12px; }
  .ml-section-title { font-family: 'Sora', sans-serif; font-size: clamp(28px,4vw,42px); font-weight: 800; line-height: 1.2; color: #1A0A00; margin-bottom: 20px; }
  .ml-section-body { font-size: 17px; line-height: 1.8; color: #555; }

  .ml-problem-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
  @media (max-width: 768px) { .ml-problem-grid { grid-template-columns: 1fr; } }

  .ml-pain-cards { display: flex; flex-direction: column; gap: 14px; margin-top: 32px; }
  .ml-pain-card { display: flex; align-items: flex-start; gap: 14px; background: #fff; border-radius: 14px; padding: 16px 18px; border: 1px solid #F0E8E0; box-shadow: 0 2px 12px rgba(0,0,0,0.04); transition: all 0.2s; }
  .ml-pain-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.08); transform: translateX(4px); }
  .ml-pain-icon { width: 44px; height: 44px; border-radius: 10px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 20px; }
  .ml-pain-icon.red { background: #FEE8E8; }
  .ml-pain-icon.amber { background: #FFF3D0; }
  .ml-pain-icon.purple { background: #F0EBFE; }
  .ml-pain-title { font-family: 'Sora', sans-serif; font-weight: 700; font-size: 14px; color: #1A0A00; margin-bottom: 3px; }
  .ml-pain-desc { font-size: 13px; color: #777; line-height: 1.5; }

  .ml-loss-visual { background: #1A0A00; border-radius: 24px; padding: 32px; text-align: center; color: #fff; position: relative; overflow: hidden; }
  .ml-loss-visual::before { content: ''; position: absolute; inset: 0; background-image: repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,180,0,0.04) 20px, rgba(255,180,0,0.04) 21px); }
  .ml-loss-number { font-family: 'Sora', sans-serif; font-size: 80px; font-weight: 800; color: #FFB400; line-height: 1; position: relative; }
  .ml-loss-label { font-size: 16px; color: rgba(255,255,255,0.7); margin-top: 8px; position: relative; }
  .ml-loss-sub { font-size: 13px; color: rgba(255,255,255,0.4); margin-top: 24px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1); position: relative; }

  /* TESTIMONIALS */
  .ml-testi-bg { background: #fff; }
  .ml-testi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  @media (max-width: 768px) { .ml-testi-grid { grid-template-columns: 1fr; } }
  .ml-testi-card { background: #FFF8F0; border-radius: 18px; padding: 24px; border: 1px solid #F0E8DE; }
  .ml-testi-lang { font-size: 11px; font-weight: 700; color: #FFB400; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; }
  .ml-testi-quote { font-size: 40px; color: #FFB400; font-family: Georgia, serif; line-height: 1; margin-bottom: 12px; }
  .ml-testi-text { font-size: 15px; line-height: 1.7; color: #333; margin-bottom: 20px; font-style: italic; }
  .ml-testi-author { display: flex; align-items: center; gap: 12px; }
  .ml-testi-avatar { width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'Sora', sans-serif; font-weight: 700; font-size: 16px; color: #fff; flex-shrink: 0; }
  .ml-testi-name { font-family: 'Sora', sans-serif; font-weight: 700; font-size: 14px; color: #1A0A00; }
  .ml-testi-market { font-size: 12px; color: #888; }
  .ml-stars { display: flex; gap: 3px; margin-bottom: 14px; }

  /* HOW IT WORKS */
  .ml-steps-bg { background: #1A0A00; }
  .ml-steps-bg .ml-section-title { color: #fff; }
  .ml-steps-bg .ml-section-body { color: rgba(255,255,255,0.6); }
  .ml-steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 48px; }
  @media (max-width: 768px) { .ml-steps-grid { grid-template-columns: 1fr; } }
  .ml-step-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 32px 24px; position: relative; overflow: hidden; transition: all 0.3s; }
  .ml-step-card:hover { background: rgba(255,180,0,0.08); border-color: rgba(255,180,0,0.3); transform: translateY(-4px); }
  .ml-step-num { font-family: 'Sora', sans-serif; font-size: 64px; font-weight: 800; color: rgba(255,180,0,0.12); position: absolute; top: 12px; right: 20px; line-height: 1; }
  .ml-step-icon { width: 56px; height: 56px; border-radius: 14px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
  .ml-step-title { font-family: 'Sora', sans-serif; font-weight: 700; font-size: 20px; color: #fff; margin-bottom: 10px; }
  .ml-step-desc { font-size: 15px; color: rgba(255,255,255,0.6); line-height: 1.7; }
  .ml-step-lang { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 16px; }
  .ml-lang-pill { background: rgba(255,180,0,0.15); border: 1px solid rgba(255,180,0,0.3); border-radius: 100px; padding: 4px 12px; font-size: 12px; font-weight: 600; color: #FFB400; }

  /* TRUST */
  .ml-trust-bg { background: linear-gradient(160deg, #00A86B 0%, #006640 100%); }
  .ml-trust-section { max-width: 1100px; margin: 0 auto; padding: 80px 5%; }
  .ml-trust-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
  @media (max-width: 768px) { .ml-trust-grid { grid-template-columns: 1fr; } }
  .ml-trust-section .ml-section-label { color: rgba(255,255,255,0.7); }
  .ml-trust-section .ml-section-title { color: #fff; }
  .ml-trust-section .ml-section-body { color: rgba(255,255,255,0.75); }
  .ml-trust-report { background: #fff; border-radius: 24px; padding: 32px; box-shadow: 0 40px 80px rgba(0,0,0,0.3); }
  .ml-trust-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 28px; padding-bottom: 20px; border-bottom: 2px solid #F0F0F0; }
  .ml-trust-name-big { font-family: 'Sora', sans-serif; font-size: 18px; font-weight: 800; color: #1A0A00; }
  .ml-trust-verified { display: flex; align-items: center; gap: 6px; background: #E8F8F0; border-radius: 100px; padding: 6px 12px; font-size: 12px; font-weight: 700; color: #00A86B; }
  .ml-trust-row { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #F5F5F5; }
  .ml-trust-row:last-child { border-bottom: none; }
  .ml-trust-key { font-size: 13px; color: #888; }
  .ml-trust-val { font-family: 'Sora', sans-serif; font-size: 14px; font-weight: 700; color: #1A0A00; }
  .ml-trust-val.green { color: #00A86B; }
  .ml-score-block { margin-top: 24px; background: #F8FFF5; border-radius: 16px; padding: 20px; }
  .ml-score-label { display: flex; justify-content: space-between; margin-bottom: 10px; }
  .ml-score-title { font-family: 'Sora', sans-serif; font-weight: 700; font-size: 15px; color: #1A0A00; }
  .ml-score-num { font-family: 'Sora', sans-serif; font-weight: 800; font-size: 22px; color: #00A86B; }
  .ml-score-bar { height: 12px; background: #E8EEE5; border-radius: 100px; overflow: hidden; }
  .ml-score-fill { height: 100%; background: linear-gradient(90deg, #00A86B, #00D68F); border-radius: 100px; width: 78%; }
  .ml-trust-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 32px; }
  .ml-trust-stat { background: rgba(255,255,255,0.15); border-radius: 14px; padding: 20px; }
  .ml-trust-stat-val { font-family: 'Sora', sans-serif; font-size: 28px; font-weight: 800; color: #fff; }
  .ml-trust-stat-lbl { font-size: 13px; color: rgba(255,255,255,0.65); margin-top: 4px; }

  /* CTA */
  .ml-cta-bg { background: #FFB400; }
  .ml-cta-section { max-width: 1100px; margin: 0 auto; padding: 80px 5%; text-align: center; }
  .ml-cta-section .ml-section-title { color: #1A0A00; }
  .ml-cta-section .ml-section-body { color: rgba(26,10,0,0.65); max-width: 520px; margin: 0 auto 40px; }
  .ml-cta-features { display: flex; justify-content: center; gap: 32px; flex-wrap: wrap; margin-bottom: 40px; }
  .ml-cta-feat { display: flex; align-items: center; gap: 8px; font-size: 15px; font-weight: 600; color: #1A0A00; }

  /* FOOTER */
  .ml-footer { background: #1A0A00; padding: 48px 5%; }
  .ml-footer-inner { max-width: 1100px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 24px; }
  .ml-footer-links { display: flex; gap: 24px; }
  .ml-footer-links a { font-size: 14px; color: rgba(255,255,255,0.5); text-decoration: none; transition: color 0.2s; }
  .ml-footer-links a:hover { color: #FFB400; }
  .ml-footer-copy { font-size: 13px; color: rgba(255,255,255,0.3); }
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
      <div className="ml-step-lang">
        {['Twi', 'Ewe', 'Ga', 'Hausa', 'Dagbani', 'English'].map((lang) => (
          <span key={lang} className="ml-lang-pill">{lang}</span>
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
];

const ctaFeatures: string[] = ['Free to start', 'No smartphone needed', 'Works offline', 'In your language'];

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
          <div className="ml-logo">
            <div className="ml-logo-mark">M</div>
            <span className="ml-logo-text">MarketLink</span>
          </div>
          <Link to="/onboarding" className="ml-nav-btn">Join Now — It's Free →</Link>
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
              Kasa wʼatonton agu wʼfoon mu · Wɔbɛkyerɛ wo wʼahonya · Nya loan firi wʼnhoma
            </p>
            <p>
              Sɛ woton tomato, nnuan, anaa ntama a, kya tomfa no na ka. MarketLink bɛyɛ w'akonta nyinaa, kyerɛ wo w'ahonya, na boa wo nya loan firi bank — warranty biara nhia.
              <br /><br />
              <strong style={{ color: '#fff' }}>Record every sale with your voice. Get loans with your records.</strong>
            </p>
            <div className="ml-hero-btns">
              <Link to="/onboarding" className="ml-btn-primary">
                Join Now — It's Free
                <ArrowRight size={18} />
              </Link>
              <button className="ml-btn-secondary" type="button">
                <Play size={16} fill="currentColor" />
                Watch Demo
              </button>
            </div>
          </div>

          <div className="ml-hero-visual">
            <div className="ml-floating-card ml-card-1">
              <img src={tomatoesImg} alt="Tomatoes" className="ml-card-img" />
              <div className="ml-card-info">
                <div className="ml-card-tag">₵ 45.00</div>
              </div>
            </div>

            <div className="ml-floating-card ml-card-2">
              <img src={fishImg} alt="Fish" className="ml-card-img" />
              <div className="ml-card-info">
                <div className="ml-card-tag">Top Seller</div>
              </div>
            </div>

            <div className="ml-floating-card ml-card-3">
              <img src={nutsImg} alt="Nuts" className="ml-card-img" />
              <div className="ml-card-info">
                <div className="ml-card-tag">+12% Profit</div>
              </div>
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
              <p className="ml-section-body" style={{ marginBottom: '8px' }}>
                Aguabea maame sɛ wo yɛ atonton mpempem da biara. Nanso sɛ wonni nhoma a, wuhu sika a efi wo nsam a wonhu.
              </p>
              <div className="ml-pain-cards">
                {painCards.map((item, i) => (
                  <div className="ml-pain-card" key={i}>
                    <div className={`ml-pain-icon ${item.bg}`}>
                      <span style={{ fontSize: '22px' }}>{item.icon}</span>
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
              <div className="ml-loss-label" style={{ color: '#FFB400', marginTop: '4px', fontWeight: 700, fontFamily: 'Sora, sans-serif', fontSize: '15px' }}>
                atonton a wonkyerɛw &amp; tomato a efu
              </div>
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
          <h2 className="ml-section-title ml-display" style={{ textAlign: 'center', maxWidth: '500px', margin: '0 auto 48px' }}>
            Tie firi atramfoɔ sɛ wo ara
          </h2>
          <div className="ml-testi-grid">
            {testimonials.map((t, i) => (
              <div className="ml-testi-card" key={i}>
                <div className="ml-testi-lang">{t.lang}</div>
                <div className="ml-stars">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={14} fill="#FFB400" color="#FFB400" />
                  ))}
                </div>
                <div className="ml-testi-quote">"</div>
                <div className="ml-testi-text">{t.text}</div>
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

      {/* HOW IT WORKS */}
      <section className="ml-steps-bg">
        <div className="ml-section">
          <div className="ml-section-label" style={{ color: 'rgba(255,180,0,0.7)', textAlign: 'center' }}>Yiye Sɛ 1-2-3</div>
          <h2 className="ml-section-title ml-display" style={{ textAlign: 'center' }}>
            Penseo nti. Nhoma nti. Kasa kɛkɛ.
          </h2>
          <p className="ml-section-body" style={{ textAlign: 'center', maxWidth: '520px', margin: '0 auto' }}>
            Wɔyɛɛ no ama aguabea maame a ɛbɔ wɔn dɛm a wonni bere sɛ wɔbɛtena ase na wɔbɛkyerɛw. Kya tomfa no na ka.
          </p>
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

      {/* TRUST SCORE */}
      <section className="ml-trust-bg">
        <div className="ml-trust-section">
          <div className="ml-trust-grid">
            <div>
              <div className="ml-section-label">Wʼadwuma Ho Nhoma</div>
              <h2 className="ml-section-title ml-display">
                Wʼnhoma. Wʼloan. Warranty biara nhia.
              </h2>
              <p className="ml-section-body">
                Atonton biara a wokyerɛw no kyerɛ wo Trust Score — adwuma nhoma a Ghana banks ne MFIs de ma wo loan ntɛm ara. Obi a ɔbɛdi ho adeɛ nhia. Asase nhoma nhia. Wʼadwuma nhoma kɛkɛ na ɛhia.
              </p>
              <div className="ml-trust-stats">
                {trustStats.map((stat, i) => (
                  <div className="ml-trust-stat" key={i}>
                    <div className="ml-trust-stat-val">{stat.val}</div>
                    <div className="ml-trust-stat-lbl">{stat.lbl}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="ml-trust-report">
              <div className="ml-trust-header">
                <div>
                  <div style={{ fontSize: '11px', color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                    TrustReport Certificate
                  </div>
                  <div className="ml-trust-name-big ml-display">Ama Mensah</div>
                </div>
                <div className="ml-trust-verified">
                  <ShieldCheck size={14} />
                  Verified
                </div>
              </div>
              {trustRows.map((row, i) => (
                <div className="ml-trust-row" key={i}>
                  <span className="ml-trust-key">{row.key}</span>
                  <span className={`ml-trust-val ${row.green ? 'green' : ''} ml-display`}>{row.val}</span>
                </div>
              ))}
              <div className="ml-score-block">
                <div className="ml-score-label">
                  <span className="ml-score-title ml-display">Trust Score</span>
                  <span className="ml-score-num ml-display">78 / 100</span>
                </div>
                <div className="ml-score-bar">
                  <div className="ml-score-fill" />
                </div>
                <div className="ml-score-caption">✓ Ɛsɛ sɛ wonya loan kɛse a ɛkɔ ₵15,000 firi nkuafoɔ banks</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ml-cta-bg">
        <div className="ml-cta-section">
          <h2 className="ml-section-title ml-display" style={{ maxWidth: '580px', margin: '0 auto 16px' }}>
            Bẹrẹ ɛnnɛ. Ɔsram a edi kan no yɛ foforo koraa.
          </h2>
          <p className="ml-section-body">
            Kaa wɔ aguabea maame 12,000 ho a wɔwɔ Ghana nyinaa a wɔde wɔn sika so na wɔn gain so sɛe ne wɔnya loan firi MarketLink.
          </p>
          <div className="ml-cta-features">
            {ctaFeatures.map((f, i) => (
              <div className="ml-cta-feat" key={i}>
                <CheckCircle2 size={18} color="#1A0A00" />
                {f}
              </div>
            ))}
          </div>
          <Link to="/onboarding" className="ml-btn-primary" style={{ display: 'inline-flex', fontSize: '18px', padding: '20px 40px' }}>
            Get Started — It's Free
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="ml-footer">
        <div className="ml-footer-inner">
          <div className="ml-logo">
            <div className="ml-logo-mark">M</div>
            <span className="ml-logo-text">MarketLink</span>
          </div>
          <div className="ml-footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Help</a>
            <a href="#">Contact</a>
          </div>
          <p className="ml-footer-copy">© 2024 MarketLink · Wɔyɛɛ no ama Africa aguabea</p>
        </div>
      </footer>
    </div>
  );
}