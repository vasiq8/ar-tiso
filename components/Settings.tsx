"use client";

import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useEffect, useState } from 'react';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Settings({ isOpen, onClose }: SettingsProps) {
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [tempLang, setTempLang] = useState(language);
  const [tempTheme, setTempTheme] = useState(theme);

  // Reset temporary states when modal opens
  useEffect(() => {
    if (isOpen) {
      setTempLang(language);
      setTempTheme(theme);
    }
  }, [isOpen, language, theme]);

  const handleSave = () => {
    setLanguage(tempLang);
    setTheme(tempTheme);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Settings">
      <div className="space-y-8">
        <section>
          <h3 className={`text-xl mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            Language
          </h3>
          <div className="space-y-3">
            {['en', 'ar'].map(lang => (
              <label key={lang} className={`flex items-center justify-between p-3 rounded-full border
                ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}
              >
                <span className={theme === 'dark' ? 'text-white' : 'text-black'}>
                  {lang === 'en' ? 'English' : 'Arabic'}
                </span>
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
        <section>
          <h3 className={`text-xl mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            Theme
          </h3>
          <div className="space-y-3">
            {['light', 'dark'].map(themeOption => (
              <label key={themeOption} className={`flex items-center justify-between p-3 rounded-full border
                ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}
              >
                <span className={theme === 'dark' ? 'text-white' : 'text-black'}>
                  {themeOption === 'dark' ? 'Dark Mode' : 'Light Mode'}
                </span>
                <input
                  type="radio"
                  name="theme"
                  checked={tempTheme === themeOption}
                  onChange={() => setTempTheme(themeOption as 'dark' | 'light')}
                  className="w-6 h-6 accent-primary"
                />
              </label>
            ))}
          </div>
        </section>
        <Button onClick={handleSave} fullWidth>
          Save
        </Button>
      </div>
    </Modal>
  );
}
