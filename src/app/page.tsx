import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f2ea] text-[#161412]">
      <section className="relative isolate min-h-[80svh] overflow-hidden bg-[#121211] text-[#f7f3ea]">
        <Image
          src="/asterlava-mission-cell.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-[62%_50%] opacity-80"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(18,18,17,0.98)_0%,rgba(18,18,17,0.88)_28%,rgba(18,18,17,0.32)_70%,rgba(18,18,17,0.68)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[#121211] to-transparent" />

        <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-8">
          <a href="#" className="text-sm font-semibold tracking-[0.18em] text-[#f7f3ea]">
            ASTERLAVA
          </a>
          <a
            href="mailto:isha.gupta.2001@gmail.com"
            className="rounded-full border border-[#f7f3ea]/20 px-4 py-2 text-sm font-medium text-[#f7f3ea] transition hover:border-[#d85f36] hover:text-white"
          >
            Contact founder
          </a>
        </header>

        <div className="mx-auto flex max-w-7xl px-6 pb-16 pt-12 sm:px-8 md:pb-20 md:pt-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#e8774a]">
              Mission-native software
            </p>
            <h1 className="mt-6 text-6xl font-semibold leading-[0.95] tracking-normal text-white sm:text-7xl md:text-8xl">
              Asterlava
            </h1>
            <p className="mt-7 max-w-2xl text-2xl font-medium leading-tight text-[#f3eadb] sm:text-3xl">
              Mission-native software for AI-native companies.
            </p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#d7cfc1] sm:text-lg">
              Asterlava helps teams turn a business objective into a coordinated operating cell of people, AI agents,
              tools, approvals, and outcome memory.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="mailto:isha.gupta.2001@gmail.com?subject=Asterlava%20waitlist"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#e5663a] px-6 text-sm font-semibold text-white shadow-[0_18px_44px_rgba(229,102,58,0.28)] transition hover:bg-[#f27b52]"
              >
                Join waitlist
              </a>
              <a
                href="mailto:isha.gupta.2001@gmail.com?subject=Asterlava%20design%20partner"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#f7f3ea]/24 px-6 text-sm font-semibold text-[#f7f3ea] transition hover:border-[#e5663a] hover:text-white"
              >
                Contact founder
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#121211] px-6 pb-20 text-[#f7f3ea] sm:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 border-t border-white/10 pt-16 text-center">
          <h2 className="max-w-4xl text-3xl font-semibold leading-tight tracking-normal sm:text-5xl">
            Companies are still organized around departments. Work is moving toward missions.
          </h2>
          <p className="max-w-3xl text-lg leading-8 text-[#d7cfc1]">
            Today, ambitious work breaks across sales, product, ops, legal, finance, and AI tools. Asterlava is building
            the operating layer for mission-based execution.
          </p>
        </div>
      </section>

      <section className="bg-[#121211] px-6 pb-24 pt-4 text-[#f7f3ea] sm:px-8 lg:pb-28">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 border-t border-white/10 pt-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-semibold leading-tight tracking-normal text-[#f7f3ea] sm:text-5xl">
              Building with early design partners.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#d7cfc1]">
              We are speaking with operators, founders, and enterprise teams exploring AI-native execution systems.
            </p>
          </div>
          <a
            href="mailto:isha.gupta.2001@gmail.com"
            className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-[#e5663a] px-6 text-sm font-semibold text-white shadow-[0_18px_44px_rgba(229,102,58,0.22)] transition hover:bg-[#f27b52]"
          >
            Email Ishita
          </a>
        </div>
      </section>

      <footer className="bg-[#161412] px-6 py-8 text-sm text-[#cfc5b7] sm:px-8">
        <div className="mx-auto max-w-7xl">© 2026 Asterlava. All rights reserved.</div>
      </footer>
    </main>
  );
}
