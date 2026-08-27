"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { track } from "@vercel/analytics";
import AsterlavaBackdrop from "@/components/AsterlavaBackdrop";

const institutions = [
  { name: "J.P. Morgan", logo: "/logo-jpmorgan-transparent.png", tone: "" },
  { name: "Weill Cornell Medicine", logo: "/cornell-seal-official.svg", tone: "logo-lockup--weill", lines: ["Weill Cornell", "Medicine"] },
  { name: "Cornell University", logo: "/cornell-seal-official.svg", tone: "logo-lockup--cornell", lines: ["Cornell University"] },
  { name: "NYC Buildings", logo: "/logo-nyc-buildings-supplied.png", tone: "logo-image--nyc" },
  { name: "IHG Hotels & Resorts", logo: "/logo-ihg-transparent.png", tone: "logo-image--light" },
  { name: "Stanford ML", logo: "/logo-stanford-ml.svg", tone: "" }
];

type ManifestoItem = {
  text: string;
  emphasis?: boolean;
};

const manifesto: ManifestoItem[][] = [
  [
    {
      emphasis: true,
      text: "We built AI that can understand what was said. We are building AI that understands what it means to you."
    }
  ],
  [
    {
      text: "Every important decision carries a hidden layer. A candidate can say everything right and still be the wrong hire. A founder can tell a great story and still miss what an investor notices. A client can sound ready and never buy. The transcript is there. The judgment is not."
    }
  ],
  [
    {
      text: "We are building the "
    },
    {
      emphasis: true,
      text: "Human Context Model"
    },
    {
      text: ", a new layer of intelligence for conversations."
    }
  ],
  [
    {
      text: "Asterlava models behavior and intent in real time. It maps those signals to what you already know about the person and what matters to you. Over time it builds a contextual model of how people communicate with you."
    }
  ],
  [
    {
      emphasis: true,
      text: "We do not just capture conversations. We model the intelligence formed inside them."
    }
  ],
  [
    {
      text: "This makes a new kind of agent possible. An agent that knows your context. Understands the person in front of it. Remembers what happened before. And can carry your judgment into conversations you cannot attend."
    }
  ],
  [
    {
      text: "Start with one conversation. Build the context across every interaction. Turn that context into intelligence that compounds."
    }
  ],
  [
    {
      emphasis: true,
      text: "The goal is simple: make your intuition available even when you are not in the room."
    }
  ],
  [
    {
      text: "We are starting where getting a person wrong is expensive: hiring, investing, sales, negotiations and partnerships. The long-term vision is an intelligence layer that sits between humans and the decisions they make."
    }
  ],
  [
    {
      text: "Ishita Gupta is a Cornell merit scholar with experience across JPMorgan, Weill Cornell Medicine and NYC government. She has won 10+ national Olympiads and ranked in the top 3% of India's JEE. Her previous AI product acquired 15 paying customers in 24 hours."
    }
  ]
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
      <AsterlavaBackdrop scrollDriven highDetail={false} />
      <div className="signal-grid absolute inset-0 -z-10" />

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-2xl flex-col px-5 pb-36 pt-6 sm:px-8 sm:pb-40 sm:pt-8">
        <header className="flex items-center justify-between gap-6">
          <a href="#" className="flex items-center gap-2 text-[1.05rem] font-semibold uppercase tracking-[0.3em] text-[#f3f4ef] sm:text-[1.2rem]">
            <Image className="asterlava-logo" src="/asterlava-logo.png" alt="" width={48} height={32} priority />
            Asterlava
          </a>
        </header>

        <article className="mt-7 max-w-2xl pb-8 sm:mt-8 sm:pb-10">
          <div className="mb-3 space-y-1 text-[0.6rem] leading-4 text-[#7f8883]">
            <p>July 2026</p>
          </div>
          <h1 className="mb-5 text-[0.96rem] font-medium tracking-[-0.01em] text-[#f3f4ef] sm:text-[1.08rem]">The Personal Intelligence model</h1>
          <div className="space-y-4 sm:space-y-5">
            {manifesto.map((paragraph, paragraphIndex) => (
              <p key={paragraphIndex} className="max-w-2xl text-[0.78rem] leading-[1.48] tracking-normal text-[#b1b9b4] sm:text-[0.84rem] sm:leading-[1.52]">
                {paragraph.map((item, index) => (
                  <span key={index} className={item.emphasis ? "font-semibold text-[#f3f4ef]" : ""}>
                    {item.text}
                  </span>
                ))}
              </p>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-9">
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
