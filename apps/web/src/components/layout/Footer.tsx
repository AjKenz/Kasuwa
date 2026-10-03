export function Footer() {
  return (
    <footer className="bg-weave-dark bg-ink mt-16">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl" aria-hidden>
              🧺
            </span>
            <span className="font-display text-lg font-semibold text-sand">Kasuwa</span>
          </div>
          <p className="text-xs text-stone-400">
            A learning project. Listings and buyers shown here are fictional.
            {" · "}
            env: {process.env.NEXT_PUBLIC_APP_ENV ?? "not set"}
          </p>
        </div>
      </div>
    </footer>
  );
}
