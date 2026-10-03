"use client";

import type { Locale, ProductTranslation } from "@/lib/types";
import { Tabs } from "@/components/ui/Tabs";

const LOCALE_LABEL: Record<Locale, string> = { en: "English", fr: "Français", ar: "العربية" };

export function ProductTranslationPreview({ translations }: { translations: ProductTranslation[] }) {
  const items = translations.map((t) => ({ key: t.locale, label: LOCALE_LABEL[t.locale] }));

  return (
    <Tabs items={items} defaultKey="en">
      {(activeKey) => {
        const t = translations.find((x) => x.locale === activeKey);
        if (!t) return null;
        return (
          <div dir={t.locale === "ar" ? "rtl" : "ltr"}>
            <h2 className="text-lg font-semibold text-stone-900">{t.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">{t.description}</p>
          </div>
        );
      }}
    </Tabs>
  );
}
