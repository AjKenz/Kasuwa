"use client";

import { useState } from "react";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "ar", label: "العربية" },
] as const;

/**
 * UI stub only — wired up for real in Track C (locale routing lands at C3).
 */
export function LanguageSwitcher() {
  const [code, setCode] = useState<(typeof LANGUAGES)[number]["code"]>("en");

  return (
    <select
      value={code}
      onChange={(e) => setCode(e.target.value as typeof code)}
      aria-label="Language"
      className="rounded-md border border-stone-300 bg-white px-2 py-1 text-xs text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
    >
      {LANGUAGES.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  );
}
