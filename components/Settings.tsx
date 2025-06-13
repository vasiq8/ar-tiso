"use client";

import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Settings({ isOpen, onClose }: SettingsProps) {
  const { language, setLanguage } = useLanguage();
  const [tempLang, setTempLang] = useState(language);

  const handleSave = () => {
    setLanguage(tempLang);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Settings">
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
        <Button onClick={handleSave} fullWidth>
          Save
        </Button>
      </div>
    </Modal>
  );
}
