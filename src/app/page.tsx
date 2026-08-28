"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Image from "next/image";
import { track } from "@vercel/analytics";
import AsterlavaBackdrop from "@/components/AsterlavaBackdrop";

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
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#141918] text-[#f3f4ef]">
      <div className="manifesto-glow absolute inset-0 -z-20" />
      <AsterlavaBackdrop scrollDriven highDetail={false} />
      <div className="signal-grid absolute inset-0 -z-10" />

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-2xl flex-col px-5 pb-16 pt-6 sm:px-8 sm:pb-20 sm:pt-8">
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
          <WaitlistForm />
        </article>

      </section>

    </main>
  );
}

function WaitlistForm() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const email = String(values.get("email") ?? "").trim();
    const brief = String(values.get("brief") ?? "").trim();
    const subject = encodeURIComponent("Interest in Asterlava");
    const body = encodeURIComponent(`${brief}\n\nReply email: ${email}`);

    track("waitlist_click", { location: "waitlist_modal" });
    setSubmitted(true);
    window.location.href = `mailto:ishita@asterlava.com?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          setSubmitted(false);
        }}
        className="mt-7 rounded-full bg-[#f1c39a] px-5 py-2.5 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-[#241923] transition-colors hover:bg-[#ffe1bd] sm:mt-9"
      >
        Join waitlist
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-[#0a0d0c]/65 p-5 backdrop-blur-sm"
          role="presentation"
          onMouseDown={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="waitlist-title"
            className="w-full max-w-md rounded-2xl border border-[#dca777]/30 bg-[#18201e]/85 p-5 shadow-2xl backdrop-blur-xl sm:p-6"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <h2 id="waitlist-title" className="text-[0.98rem] font-medium text-[#f3f4ef]">Join the waitlist</h2>
                <p className="mt-2 text-[0.74rem] leading-5 text-[#9da6a0]">Tell us a little about what you would like to connect about.</p>
              </div>
              <button
                type="button"
                aria-label="Close waitlist form"
                onClick={() => setOpen(false)}
                className="text-[0.65rem] uppercase tracking-[0.14em] text-[#9da6a0] transition-colors hover:text-[#f3f4ef]"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <label className="block text-[0.62rem] uppercase tracking-[0.14em] text-[#aab2ac]">
                Email
                <input
                  required
                  autoFocus
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="mt-2 block w-full rounded-md border border-[#dca777]/35 bg-[#101614]/55 px-3 py-2.5 text-[0.78rem] normal-case tracking-normal text-[#f3f4ef] outline-none placeholder:text-[#78827c] focus:border-[#f1c39a]"
                />
              </label>
              <label className="block text-[0.62rem] uppercase tracking-[0.14em] text-[#aab2ac]">
                Your interest
                <textarea
                  required
                  name="brief"
                  rows={4}
                  placeholder="A sentence or two"
                  className="mt-2 block w-full resize-y rounded-md border border-[#dca777]/35 bg-[#101614]/55 px-3 py-2.5 text-[0.78rem] normal-case leading-5 tracking-normal text-[#f3f4ef] outline-none placeholder:text-[#78827c] focus:border-[#f1c39a]"
                />
              </label>
              <div className="flex items-center justify-between gap-3 pt-1">
                <button
                  type="submit"
                  className="rounded-full bg-[#f1c39a] px-5 py-2.5 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-[#241923] transition-colors hover:bg-[#ffe1bd]"
                >
                  Send interest
                </button>
                {submitted && <span className="text-right text-[0.65rem] text-[#8f9891]">Opening email to Ishita...</span>}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
