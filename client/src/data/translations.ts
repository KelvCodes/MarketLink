export type Language = 'English' | 'Twi';

export const translations: Record<string, { English: string; Twi: string }> = {
  // DASHBOARD
  'Daily Profit': {
    English: 'Daily Profit',
    Twi: 'Mfasoɛ nnɛ'
  },
  'Waste Loss': {
    English: 'Waste Loss',
    Twi: 'Lɔɔso / Porɔ'
  },
  'Total Revenue': {
    English: 'Total Revenue',
    Twi: 'Sika a ɛbaayɛ'
  },
  'Recent Activities': {
    English: 'Recent Activities',
    Twi: 'Nnansa yi nneɛma'
  },
  'AI Voice Hub': {
    English: 'AI Voice Hub',
    Twi: 'Kasa ho AI'
  },
  'Record any trade or cost instantly': {
    English: 'Record any trade or cost instantly',
    Twi: 'Twere wo dwadie anaa sika a ɛfiri hɔ'
  },
  'Everything is looking good in the market today.': {
    English: 'Everything is looking good in the market today.',
    Twi: 'Nnipa nyinaa kɔ yiye wo gua mu nnɛ.'
  },
  'Market Trends': {
    English: 'Market Trends',
    Twi: 'Gua no mu nsɛm'
  },
  'Trust Score: Verified': {
    English: 'Trust Score: Verified',
    Twi: 'Wʼahonya adanse: Yepenfede'
  },
  'Open TrustHub ↗': {
    English: 'Open TrustHub ↗',
    Twi: 'Kɔ TrustHub ↗'
  },
  'Inventory health is at 92%.': {
    English: 'Inventory health is at 92%.',
    Twi: 'Wo nneɛma yiye nkɔsoɔ yɛ 92%.'
  },

  // ONBOARDING
  'Welcome to MarketLink': {
    English: 'Welcome to MarketLink',
    Twi: 'Akwaaba kɔ MarketLink'
  },
  'Choose your languages': {
    English: 'Choose your languages',
    Twi: 'Yi wo kasa a woka'
  },
  'Continue': {
    English: 'Continue',
    Twi: 'Toa so'
  },
  'Next Step': {
    English: 'Next Step',
    Twi: 'Deɛ ɛdi hɔ'
  },
  'Finish': {
    English: 'Finish',
    Twi: 'Wie'
  }
};

export const t = (key: string, lang: Language = 'English') => {
  return translations[key]?.[lang] || key;
};
