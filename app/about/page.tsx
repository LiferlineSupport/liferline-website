import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Our Story — Liferline Cable Company',
  description:
    'Hand-built boutique guitar cables made in the USA. The story behind Liferline and why we guarantee every cable for life.',
}

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
      <div className="mb-16">
        <p className="text-xs tracking-[0.3em] uppercase text-accent mb-4 font-semibold">
          Our Story
        </p>
        <h1 className="font-serif text-5xl text-cream leading-tight mb-8">
          We got tired of bad cables.
        </h1>
        <p className="text-muted text-lg leading-relaxed">
          So we started building our own.
        </p>
      </div>

      <div className="space-y-12 text-muted leading-relaxed">
        <div className="border-l-2 border-accent pl-8">
          <p className="text-lg">
            Every guitarist has been there. You're mid-set, mid-song, mid-solo — and your
            cable gives out. A crackle, a pop, silence. You kick the cable. Nothing. You
            swap it. Problem solved — until next time.
          </p>
        </div>

        <p>
          Liferline started because we were sick of that story. Sick of cheap cables with
          thin insulation, cold solder joints, and connectors that wobble loose after a
          few months. Sick of guitar shops that sell "professional" cables for $15 and
          wonder why they keep coming back.
        </p>

        <p>
          So we started soldering our own. We sourced the wire we actually trusted —
          Mogami, the same cable used in the best recording studios in the world. We used
          Neutrik connectors, the ones that roadies and touring techs rely on every night.
          And we soldered every joint by hand, the way it should be done.
        </p>

        <h2 className="font-serif text-3xl text-cream pt-4">
          The Hatch Patch
        </h2>

        <p>
          The first batch of cables we made were called "Hatch Patches" — named for the
          workshop where they were built. We gave them to friends, handed them out at
          local jams, and waited to see what happened.
        </p>

        <p>
          Nothing happened. The cables just worked. For months, then years. People started
          coming back — not to return them, but to buy more.
        </p>

        <p>
          That's when we knew we had something worth selling. Not just cables — a standard.
        </p>

        <h2 className="font-serif text-3xl text-cream pt-4">
          The Lifetime Guarantee
        </h2>

        <p>
          When we started selling Liferline cables, we made a simple promise: if the cable
          fails for any reason, at any time, we'll replace it. No receipts, no return
          shipping labels, no diagnostic forms. Just an email saying what happened, and a
          new cable in the mail.
        </p>

        <p>
          We could do that because we knew exactly how good the cables were. When you hand-
          solder every joint yourself, when you test every connection before it ships, when
          you use components you'd stake your reputation on — the guarantee isn't a risk.
          It's just math.
        </p>

        <div className="bg-card border border-border p-8 my-8">
          <p className="font-serif text-2xl text-cream mb-4 leading-snug">
            "Hand-Built. American-Made. Guaranteed for Life."
          </p>
          <p className="text-sm text-muted">
            That's not a tagline we brainstormed in a meeting. It's literally a description
            of what we do.
          </p>
        </div>

        <p>
          Today every Liferline cable is still built by hand, one at a time, in the United
          States. We haven't outsourced a single solder joint. We haven't cut corners on
          components. And we haven't changed the guarantee.
        </p>

        <p>
          We probably never will.
        </p>
      </div>

      <div className="mt-16 border-t border-border pt-12 flex flex-col sm:flex-row gap-6">
        <Link href="/#products" className="btn-primary text-center">
          Shop Cables
        </Link>
        <Link href="/contact" className="btn-ghost text-center">
          Get in Touch
        </Link>
      </div>
    </div>
  )
}
