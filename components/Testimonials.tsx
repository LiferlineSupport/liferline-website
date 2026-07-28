export default function Testimonials() {
  return (
    <section className="border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
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
