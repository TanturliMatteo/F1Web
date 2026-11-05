import { createContext, useContext } from "react";
import enUi from "../locales/en/ui.json";
import itUi from "../locales/it/ui.json";
import enPilots from "../locales/en/pilots.json";
import itPilots from "../locales/it/pilots.json";
import enCircuits from "../locales/en/circuits.json";
import itCircuits from "../locales/it/circuits.json";

// English is the reference: the Italian file must have exactly the same keys
type UiDictionary = typeof enUi;
const it: UiDictionary = itUi;

export const LANGUAGES = ["it", "en"] as const;
export type Lang = (typeof LANGUAGES)[number];

interface CircuitText {
  description: string;
  trivia: string;
}

const DICTIONARIES: Record<
  Lang,
  {
    ui: UiDictionary;
    pilots: Record<string, string>;
    circuits: Record<string, CircuitText>;
    locale: string;
  }
> = {
  en: { ui: enUi, pilots: enPilots, circuits: enCircuits, locale: "en-GB" },
  it: { ui: it, pilots: itPilots, circuits: itCircuits, locale: "it-IT" },
};

// Every dot path that leads to a string ("pilot.tiles.wins"): a typo in a
// key is a compile error, not a blank label
type Paths<T> = {
  [K in keyof T & string]: T[K] extends string
    ? K
    : T[K] extends readonly unknown[]
      ? never
      : `${K}.${Paths<T[K]>}`;
}[keyof T & string];

type ListPaths<T> = {
  [K in keyof T & string]: T[K] extends readonly string[]
    ? K
    : T[K] extends string
      ? never
      : `${K}.${ListPaths<T[K]>}`;
}[keyof T & string];

export type TranslationKey = Paths<UiDictionary>;
export type TranslationListKey = ListPaths<UiDictionary>;
export type TranslationVars = Record<string, string | number>;

const lookup = (dictionary: unknown, key: string): unknown =>
  key
    .split(".")
    .reduce<unknown>(
      (node, part) =>
        node && typeof node === "object"
          ? (node as Record<string, unknown>)[part]
          : undefined,
      dictionary,
    );

// "{count} to go" + { count: 3 } → "3 to go"
const interpolate = (text: string, vars?: TranslationVars) =>
  vars
    ? text.replace(/\{(\w+)\}/g, (match, name: string) =>
        name in vars ? String(vars[name]) : match,
      )
    : text;

export const createTranslator = (lang: Lang) => {
  const dictionary = DICTIONARIES[lang];

  return {
    lang,
    locale: dictionary.locale,
    t: (key: TranslationKey, vars?: TranslationVars) => {
      const text = lookup(dictionary.ui, key) ?? lookup(enUi, key);
      return typeof text === "string" ? interpolate(text, vars) : key;
    },
    tList: (key: TranslationListKey) => {
      const list = lookup(dictionary.ui, key);
      return Array.isArray(list) ? (list as string[]) : [];
    },
    pilotDescription: (code: string) => {
      const pilots = dictionary.pilots;
      return pilots[code.toLowerCase().trim()] ?? pilots.default;
    },
    circuitText: (circuitId: string): CircuitText | undefined =>
      dictionary.circuits[circuitId],
  };
};

export type Translator = ReturnType<typeof createTranslator>;

export interface I18nContextValue extends Translator {
  setLang: (lang: Lang) => void;
}

// Outside the provider (should not happen) fall back to English, read-only
export const I18nContext = createContext<I18nContextValue>({
  ...createTranslator("en"),
  setLang: () => {},
});

export const useI18n = () => useContext(I18nContext);

export const STORAGE_KEY = "f1web-lang";

// Saved choice first, then the browser language, then English
export const initialLang = (): Lang => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "it" || saved === "en") return saved;
  } catch {
    // Storage blocked (private mode, settings): just use the browser language
  }
  return navigator.language?.toLowerCase().startsWith("it") ? "it" : "en";
};
