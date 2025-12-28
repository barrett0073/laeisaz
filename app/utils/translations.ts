import enTranslations from '../translations/en.json';
import faTranslations from '../translations/fa.json';
import { useLanguage } from '../components/ClientLayout';

type TranslationKey = keyof typeof enTranslations;

export function useTranslation() {
  const { language } = useLanguage();

  const t = (key: TranslationKey) => {
    const translations = language === 'en' ? enTranslations : faTranslations;
    return translations[key] || key;
  };

  return { t };
} 