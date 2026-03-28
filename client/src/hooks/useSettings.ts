import { useState, useCallback, useEffect } from 'react';

export interface UserSettings {
  languages: string[];
  businessType: string;
  voiceEnabled: boolean;
}

const DEFAULT_SETTINGS: UserSettings = {
  languages: ['English'],
  businessType: 'General',
  voiceEnabled: true,
};

/**
 * Hook to manage and persist user preferences.
 */
export const useSettings = () => {
  const [settings, setSettings] = useState<UserSettings>(() => {
    const saved = localStorage.getItem('ml_user_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('ml_user_settings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = useCallback((updates: Partial<UserSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  }, []);

  const isTwi = settings.languages.includes('Twi');

  return { settings, updateSettings, isTwi };
};
