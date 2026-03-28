import { useState, useCallback, useEffect } from 'react';

/**
 * Hook to manage Text-to-Speech (speechSynthesis) with persistence.
 */
export const useSpeech = () => {
  const [enabled, setEnabled] = useState(() => {
    const saved = localStorage.getItem('ml_voice_enabled');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    localStorage.setItem('ml_voice_enabled', JSON.stringify(enabled));
    if (!enabled) {
      window.speechSynthesis.cancel();
    }
  }, [enabled]);

  const speak = useCallback((text: string, lang: string = 'en-US') => {
    if (!enabled) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Attempt to find a matching voice if possible
    const voices = window.speechSynthesis.getVoices();
    utterance.lang = lang; 
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [enabled]);

  const toggle = () => setEnabled(!enabled);

  return { speak, toggle, enabled, isSpeaking };
};
