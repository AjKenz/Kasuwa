"use client";

import { useState } from "react";
import type { Locale, ProductTranslation } from "@/lib/types";
import { Tabs } from "@/components/ui/Tabs";
import { Field, Input, Textarea } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const LOCALE_LABEL: Record<Locale, string> = { en: "English", fr: "Français", ar: "العربية" };

export function LocaleTabs({ initial }: { initial: ProductTranslation[] }) {
  const [translations, setTranslations] = useState(initial);

  function update(locale: Locale, field: "title" | "description", value: string) {
    setTranslations((prev) =>
      prev.map((t) => (t.locale === locale ? { ...t, [field]: value } : t)),
    );
  }

  function markReviewed(locale: Locale) {
    setTranslations((prev) =>
      prev.map((t) => (t.locale === locale ? { ...t, status: "reviewed" } : t)),
    );
  }

  const items = translations.map((t) => ({
    key: t.locale,
    label: LOCALE_LABEL[t.locale],
    badge: (
      <Badge tone={t.status === "reviewed" ? "success" : "neutral"}>
        {t.status === "reviewed" ? "Reviewed" : "Machine"}
      </Badge>
    ),
  }));

  return (
    <Tabs items={items} defaultKey="en">
      {(activeKey) => {
        const t = translations.find((x) => x.locale === activeKey);
        if (!t) return null;
        const dir = t.locale === "ar" ? "rtl" : "ltr";
        return (
          <div className="space-y-4" dir={dir}>
            <Field label="Title" htmlFor={`title-${t.locale}`}>
              <Input
                id={`title-${t.locale}`}
                value={t.title}
                onChange={(e) => update(t.locale, "title", e.target.value)}
              />
            </Field>
            <Field label="Description" htmlFor={`description-${t.locale}`}>
              <Textarea
                id={`description-${t.locale}`}
                rows={4}
                value={t.description}
                onChange={(e) => update(t.locale, "description", e.target.value)}
              />
            </Field>
            {t.status !== "reviewed" ? (
              <Button type="button" variant="secondary" size="sm" onClick={() => markReviewed(t.locale)}>
                Mark as reviewed
              </Button>
            ) : null}
          </div>
        );
      }}
    </Tabs>
  );
}
