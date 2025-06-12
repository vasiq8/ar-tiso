"use client";

import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Settings({ isOpen, onClose }: SettingsProps) {
  const { language, setLanguage } = useLanguage();
  const [tempLang, setTempLang] = useState(language);
  
  if (!isOpen) return null;

  const handleSave = () => {
    setLanguage(tempLang);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-[#1E1F24] rounded-2xl p-8 w-[380px] mx-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl text-white">Settings</h2>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-8">
          <section>
            <h3 className="text-xl text-white mb-4">Language</h3>
            <div className="space-y-3">
              {['en', 'ar'].map(lang => (
                <label key={lang} className="flex items-center justify-between p-3 rounded-full border border-white/10">
                  <span className="text-white">{lang === 'en' ? 'English' : 'Arabic'}</span>
                  <input
                    type="radio"
                    name="language"
                    checked={tempLang === lang}
                    onChange={() => setTempLang(lang as 'en' | 'ar')}
                    className="w-6 h-6 accent-[#00BA88]"
                  />
                </label>
              ))}
            </div>
          </section>

          <button 
            onClick={handleSave}
            className="w-full py-4 bg-[#00BA88] text-white rounded-full hover:bg-[#00A578] transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
