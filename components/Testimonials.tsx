const testimonials = [
  {
    quote:
      "I've been through dozens of cheap patch cables. These are the last ones I'll ever need. The build quality is immediately obvious the moment you pick one up.",
    name: 'Alex R.',
    title: 'Session Guitarist',
    location: 'Nashville, TN',
    stars: 5,
  },
  {
    quote:
      'Switched my whole pedalboard to Forever Cables last spring. Zero noise floor issues, zero failures. The lifetime guarantee sealed it for me.',
    name: 'Marcus T.',
    title: 'Live Sound Engineer',
    location: 'Austin, TX',
    stars: 5,
  },
  {
    quote:
      "I've paid twice as much for cables that didn't sound half as good. Liferline gets it right. Hand-soldered means something when you can hear the difference.",
    name: 'Jess L.',
    title: 'Pedalboard Builder',
    location: 'Brooklyn, NY',
    stars: 5,
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={i < count ? 'text-accent' : 'text-border'}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M7 1l1.796 3.64 4.016.583-2.906 2.831.686 3.997L7 10.077l-3.592 1.974.686-3.997L1.188 5.223l4.016-.584z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="mb-12">
          <p className="text-xs tracking-[0.2em] uppercase text-accent mb-4 font-semibold">
            Trusted by Musicians
          </p>
          <h2 className="font-serif text-4xl text-cream mb-4 leading-tight">
            Built once. Loved for years.
          </h2>
          <p className="text-muted max-w-lg text-sm">
            From studio sessions to full touring rigs, Forever Cables hold up where others fail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="border border-border bg-card p-7 flex flex-col"
            >
              <StarRating count={t.stars} />
              <blockquote className="mt-5 mb-6 flex-1">
                <p className="text-cream text-sm leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </blockquote>
              <figcaption>
                <p className="text-cream text-sm font-semibold">{t.name}</p>
                <p className="text-muted text-xs mt-0.5">
                  {t.title} &middot; {t.location}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="border border-border bg-card p-8 text-center">
          <p className="text-xs tracking-[0.2em] uppercase text-accent mb-3 font-semibold">
            Be One of the First
          </p>
          <h3 className="font-serif text-2xl text-cream mb-3">
            Share your rig. Shape the story.
          </h3>
          <p className="text-muted text-sm max-w-md mx-auto mb-6">
            Forever Cables is new, and the community is just getting started. If you're an early
            customer, we'd love to feature your pedalboard and your story.
          </p>
          <a
            href="mailto:support@liferline.com?subject=I%20want%20to%20share%20my%20pedalboard"
            className="btn-primary inline-block"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  )
}
