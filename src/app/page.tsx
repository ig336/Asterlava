"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { track } from "@vercel/analytics";

const institutions = [
  { name: "J.P. Morgan", logo: "/logo-jpmorgan-transparent.png", tone: "" },
  { name: "Weill Cornell Medicine", logo: "/cornell-seal-official.svg", tone: "logo-lockup--weill", lines: ["Weill Cornell", "Medicine"] },
  { name: "Cornell University", logo: "/cornell-seal-official.svg", tone: "logo-lockup--cornell", lines: ["Cornell University"] },
  { name: "NYC Buildings", logo: "/logo-nyc-buildings-supplied.png", tone: "logo-image--nyc" },
  { name: "IHG Hotels & Resorts", logo: "/logo-ihg-transparent.png", tone: "logo-image--light" },
  { name: "Stanford ML", logo: "/logo-stanford-ml.svg", tone: "" }
];

const manifesto = [
  {
    emphasis: true,
    text: "The most expensive decisions are often made with information about the conversation but not the person."
  },
  {
    emphasis: true,
    text: "A candidate says all the right things. A founder gives a convincing pitch. A client sounds ready to buy. The transcript captures every word. Yet the decision still depends on what you noticed, what you already knew and what your intuition picked up in the room."
  },
  {
    text: "We are building a Personal Intelligence Model that makes that layer computable."
  },
  {
    text: "Asterlava models behavioral signals and intent across conversations, then connects them to your context and history. It does not just remember what someone said. It builds a richer model of the interaction so an agent can reason with the context you would have used yourself."
  },
  {
    emphasis: true,
    text: "We are not recording conversations. We are modeling the intelligence behind them."
  },
  {
    text: "Give the agent your context and it can carry your judgment into the rooms you cannot enter. It can recognize patterns across people and interactions and surface what deserves your attention before the outcome makes it obvious."
  },
  {
    text: "The first use cases are where human judgment is expensive: hiring, investing, enterprise sales, negotiations and partnerships."
  },
  {
    emphasis: true,
    text: "We believe the next generation of AI will not just know more. It will understand people better."
  },
  {
    text: "Asterlava is building that layer."
  },
  {
    text: "Ishita Gupta is a Cornell merit scholar who has worked at JPMorgan and Weill Cornell Medicine and built decision systems with NYC government under the Mayor. She has won 10+ national Olympiads and beat 3M+ students in India's toughest JEE examination. Her previous AI product acquired 15 paying customers in 24 hours."
  }
];

export default function Home() {
  const [showLogos, setShowLogos] = useState(false);

  useEffect(() => {
    const updateLogoVisibility = () => {
      const pageBottom = document.documentElement.scrollHeight - window.innerHeight;
      setShowLogos(window.scrollY >= pageBottom - 24);
    };

    updateLogoVisibility();
    window.addEventListener("scroll", updateLogoVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateLogoVisibility);
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#141918] text-[#f3f4ef]">
      <div className="manifesto-glow absolute inset-0 -z-20" />
      <div className="voice-visual absolute inset-0 z-0" aria-hidden="true" />
      <div className="signal-grid absolute inset-0 -z-10" />

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-3xl flex-col px-5 pb-24 pt-8 sm:px-8 sm:pt-10">
        <header className="flex items-center justify-between gap-6">
          <a href="#" className="flex items-center gap-2 text-[1.05rem] font-semibold uppercase tracking-[0.3em] text-[#f3f4ef] sm:text-[1.2rem]">
            <Image className="asterlava-logo" src="/asterlava-logo.png" alt="" width={48} height={32} priority />
            Asterlava
          </a>
        </header>

        <article className="mt-10 max-w-2xl pb-16 sm:mt-12 sm:pb-20">
          <div className="mb-5 space-y-1 text-[0.62rem] leading-4 text-[#7f8883]">
            <p>July 2026</p>
          </div>
          <h1 className="mb-8 text-[0.94rem] font-medium tracking-[-0.01em] text-[#f3f4ef] sm:text-[1.05rem]">The Personal Intelligence Model</h1>
          <div className="space-y-3 sm:space-y-4">
            {manifesto.map((item, index) => (
              <p
                key={index}
                className={
                  item.emphasis
                    ? "max-w-2xl text-[0.8rem] font-semibold leading-[1.55] tracking-normal text-[#f3f4ef] sm:text-[0.86rem] sm:leading-[1.6]"
                    : "max-w-2xl text-[0.8rem] leading-[1.55] text-[#b1b9b4] sm:text-[0.86rem] sm:leading-[1.6]"
                }
              >
                {item.text}
              </p>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-3 sm:mt-14">
            <a
              href="mailto:ishita@asterlava.com?subject=Asterlava%20waitlist"
              onClick={() => track("waitlist_click", { location: "manifesto_end" })}
              className="rounded-full bg-[#f1c39a] px-5 py-2.5 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-[#241923] transition-colors hover:bg-[#ffe1bd]"
            >
              Join waitlist
            </a>
            <a
              href="mailto:ishita@asterlava.com?subject=Asterlava%20demo"
              className="rounded-full border border-[#dca777]/50 bg-[#dca777]/10 px-5 py-2.5 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-[#f1c39a] transition-colors hover:bg-[#dca777]/20"
            >
              Get in touch
            </a>
          </div>
        </article>

      </section>

      <div className="relative z-20">
        <LogoMarquee visible={showLogos} />
      </div>
    </main>
  );
}

function LogoMarquee({ visible }: { visible: boolean }) {
  const repeated = [...institutions, ...institutions];

  return (
    <div className={`logo-strip fixed inset-x-0 bottom-0 py-2.5 backdrop-blur-xl ${visible ? "logo-strip--visible" : ""}`}>
      <div className="logo-marquee flex w-max gap-3 px-3">
        {repeated.map((institution, index) => (
          <div
            key={`${institution}-${index}`}
            className="logo-tile flex h-20 min-w-56 items-center justify-center px-5 text-center text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#7f8883]"
            aria-hidden={index >= institutions.length}
          >
            {institution.lines ? (
              <span className={`logo-lockup ${institution.tone}`}>
                <Image className="logo-seal" src={institution.logo} alt="" width={54} height={54} />
                <span className="logo-lockup__text">
                  {institution.lines.map((line) => <span key={line}>{line}</span>)}
                </span>
              </span>
            ) : (
              <Image
                className={`logo-image ${institution.tone}`}
                src={institution.logo}
                alt={index < institutions.length ? institution.name : ""}
                width={224}
                height={80}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
