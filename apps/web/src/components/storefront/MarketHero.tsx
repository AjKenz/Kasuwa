export function MarketHero() {
  return (
    <section className="relative overflow-hidden bg-weave bg-linear-to-b from-amber-50 via-sand to-sand">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-amber-300/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-orange-300/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">
          Kasuwa · Hausa for &ldquo;market&rdquo;
        </p>
        <h1 className="mt-3 max-w-2xl font-display text-4xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-5xl">
          One photo becomes a listing in three languages.
        </h1>
        <p className="mt-4 max-w-xl text-base text-stone-600 sm:text-lg">
          Sellers photograph a product once. Buyers browse in English, French or Arabic, in
          their own currency, and ask a shopping assistant anything.
        </p>
      </div>
    </section>
  );
}
