"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { track } from "@vercel/analytics";

const institutions = [
  { name: "J.P. Morgan", logo: "/logo-jpmorgan-transparent.png", tone: "" },
  { name: "Weill Cornell Medicine", logo: "/cornell-seal-official.svg", tone: "logo-lockup--weill", lines: ["Weill Cornell", "Medicine"] },
  { name: "Cornell University", logo: "/cornell-seal-official.svg", tone: "logo-lockup--cornell", lines: ["Cornell University"] },
  { name: "NYC Buildings", logo: "/logo-nyc-buildings-supplied.png", tone: "" },
  { name: "IHG Hotels & Resorts", logo: "/logo-ihg-transparent.png", tone: "logo-image--light" },
  { name: "Stanford ML", logo: "/logo-stanford-ml.svg", tone: "" }
];

const manifesto = [
  {
    emphasis: true,
    text: "The most expensive part of a conversation is often what you understand after it ends."
  },
  {
    emphasis: true,
    text: "A candidate sounded committed and left four months later. A client appeared interested but never moved forward. Two people walked out of the same meeting certain they had agreed. By the time the truth surfaced, it was a cost."
  },
  {
    text: "The signs were often there. A question was avoided. A concern was never resolved. A commitment was assumed rather than made. You were in the room and still missed it because no one can listen, remember context, and decide what to ask next at the same time."
  },
  {
    text: "Companies have systems of record for customers, capital, code, and operations. Yet judgment still lives in scattered calls and notes that lose their meaning after the meeting ends. Existing tools capture what was said. They do not show where understanding broke."
  },
  {
    text: "Asterlava is building the communication intelligence layer for high-stakes decisions. It brings together context before a conversation, follows the reasoning during it, and shows what was established, what remains uncertain, and what should happen next."
  },
  {
    text: "Asterlava connects what people said with what they later did, learning which signals preceded successful hires, completed deals, failed partnerships, and costly mistakes."
  },
  {
    text: "We are beginning where misunderstanding has an immediate price: hiring, enterprise deals, investments, negotiations, and strategic partnerships. The larger ambition is to become the system of record for how judgment is formed inside organizations."
  },
  {
    text: "Asterlava is founded by Ishita Gupta, a Cornell graduate whose work spans financial communication surveillance at JPMorgan, medical AI research at Weill Cornell Medicine, decision systems using New York City municipal data, and enterprise AI with IHG Hotel group."
  },
  {
    text: "Asterlava does not read minds or manufacture certainty. It makes the evidence already present in a conversation visible while there is still time to act."
  },
  {
    emphasis: true,
    text: "Every important decision begins with a conversation."
  },
  {
    emphasis: true,
    text: "We are building the layer that helps people understand it before the outcome explains it for them."
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
          <a href="#" className="flex items-center gap-4 text-[1.2rem] font-semibold uppercase tracking-[0.32em] text-[#f3f4ef] sm:text-[1.4rem]">
            <Image className="asterlava-logo" src="/asterlava-logo.png" alt="" width={48} height={32} priority />
            Asterlava
          </a>
        </header>

        <article className="my-auto max-w-2xl py-16 sm:py-20">
          <div className="mb-11 space-y-1 text-[0.7rem] leading-5 text-[#7f8883]">
            <p>The Manifesto</p>
            <p>July 2026</p>
          </div>
          <h1 className="mb-10 text-[1.1rem] font-medium tracking-[-0.01em] text-[#f3f4ef] sm:text-[1.25rem]">The Communication Intelligence Layer</h1>
          <div className="space-y-6 sm:space-y-7">
            {manifesto.map((item, index) => (
              <p
                key={index}
                className={
                  item.emphasis
                    ? "max-w-2xl text-[1.18rem] font-semibold leading-[1.35] tracking-normal text-[#f3f4ef] sm:text-[1.32rem]"
                    : "max-w-2xl text-[0.94rem] leading-[1.72] text-[#b1b9b4] sm:text-[1rem] sm:leading-[1.78]"
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
              className="rounded-full bg-[#f1c39a] px-5 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#241923] transition-colors hover:bg-[#ffe1bd]"
            >
              Join waitlist
            </a>
            <a
              href="mailto:ishita@asterlava.com?subject=Asterlava%20demo"
              className="rounded-full border border-[#dca777]/50 bg-[#dca777]/10 px-5 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#f1c39a] transition-colors hover:bg-[#dca777]/20"
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
