import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Support — Liferline Cable Company',
  description:
    'Get help with your Liferline cables. File a lifetime guarantee claim, ask a question, or just say hello.',
}

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
      <div className="mb-16">
        <p className="text-xs tracking-[0.3em] uppercase text-accent mb-4 font-semibold">
          Support & Contact
        </p>
        <h1 className="font-serif text-5xl text-cream leading-tight mb-6">
          We actually answer emails.
        </h1>
        <p className="text-muted text-lg leading-relaxed max-w-2xl">
          High-touch support is part of the product. Whether you need a replacement cable,
          have a question about an order, or want to build something custom — we're here.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        {/* Contact info */}
        <div className="space-y-8">
          <div>
            <h2 className="font-serif text-2xl text-cream mb-4">Get in touch</h2>
            <p className="text-muted leading-relaxed mb-6">
              Email is the best way to reach us. We typically respond within one business day.
            </p>
            <a
              href="mailto:support@liferline.com"
              className="text-accent hover:text-accent-hover text-lg font-medium transition-colors"
            >
              support@liferline.com
            </a>
          </div>

          <div className="border-t border-border pt-8">
            <h3 className="text-sm font-semibold text-cream tracking-wide mb-4">
              Filing a guarantee claim?
            </h3>
            <p className="text-muted text-sm leading-relaxed mb-4">
              Email us with:
            </p>
            <ul className="space-y-2 text-sm text-muted">
              <li className="flex gap-2">
                <span className="text-accent">→</span>
                Your name and order info (if you have it)
              </li>
              <li className="flex gap-2">
                <span className="text-accent">→</span>
                A quick description of what's wrong
              </li>
              <li className="flex gap-2">
                <span className="text-accent">→</span>
                Your shipping address
              </li>
            </ul>
            <p className="text-muted text-sm leading-relaxed mt-4">
              That's it. We don't need you to ship the old cable back first.
              A replacement will be on the way before you've had to dig for a box.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="font-serif text-2xl text-cream mb-6">Common questions</h2>
          <div className="space-y-6">
            {[
              {
                q: 'What does the lifetime guarantee actually cover?',
                a: "Everything. If the cable fails for any reason — bad solder joint, broken connector, damaged jacket — we replace it. We don't have a list of exclusions because we don't believe in them.",
              },
              {
                q: "Do I need to send the old cable back?",
                a: "No. We'll ship the replacement first. If you want to send the broken one back after, great — we can learn from it. But it's not required.",
              },
              {
                q: 'How long does shipping take?',
                a: "We ship USPS Priority Mail, so typically 2-3 business days within the USA. We only ship to the US right now.",
              },
              {
                q: 'Can you build something custom?',
                a: "Often yes. Email us with what you need — custom length, connector combo, bulk order — and we'll tell you what's possible.",
              },
              {
                q: 'Why are Liferline cables more expensive than store cables?',
                a: "Because we use better materials, assemble them by hand, and guarantee them forever. The math works out in your favor within a year or two.",
              },
            ].map((item) => (
              <div key={item.q} className="border-b border-border pb-6">
                <h3 className="text-cream text-sm font-semibold mb-2">{item.q}</h3>
                <p className="text-muted text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-12 text-center">
        <p className="text-muted mb-6">
          Not a support question? Just want to say hi or share your rig?
        </p>
        <a href="mailto:support@liferline.com" className="btn-primary inline-block">
          Email Us
        </a>
      </div>
    </div>
  )
}
