import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  I18nContext,
  STORAGE_KEY,
  createTranslator,
  initialLang,
  type Lang,
} from "./i18n";

const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(initialLang);

  // Remember the choice and keep <html lang> right for screen readers
  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Storage blocked: the choice simply lasts for this visit
    }
  }, [lang]);

  const value = useMemo(
    () => ({ ...createTranslator(lang), setLang }),
    [lang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export default I18nProvider;
