import Link from 'next/link'

interface ComparisonCell {
  label: string
  highlight?: boolean
}

interface ProductColumn {
  name: string
  slug: string
  connector: string
  lengths: string
  use: ComparisonCell
  bestFor: string
  price: string
}

const columns: ProductColumn[] = [
  {
    name: 'The Workhorse',
    slug: 'the-workhorse',
    connector: 'Straight to Straight',
    lengths: '6", 12", 18"',
    use: { label: 'Pedalboard Patch', highlight: true },
    bestFor: 'Clean signal path on any pedalboard layout',
    price: '$39.99+',
  },
  {
    name: 'The Right Angle',
    slug: 'the-right-angle',
    connector: 'Straight to Right Angle',
    lengths: '6", 12"',
    use: { label: 'Tight Layouts', highlight: true },
    bestFor: 'Space-saving connections on crowded boards',
    price: '$39.99+',
  },
  {
    name: 'The Stage Cable',
    slug: 'the-stage-cable',
    connector: 'Straight to Straight',
    lengths: '10ft, 15ft, 20ft',
    use: { label: 'Instrument Cable', highlight: true },
    bestFor: 'Guitar/bass to amp or pedalboard (stage or studio)',
    price: '$79.99+',
  },
  {
    name: 'The Pedalboard Pack',
    slug: 'the-pedalboard-pack',
    connector: 'All Straight',
    lengths: 'Mixed (6x cables)',
    use: { label: 'Full Board Setup', highlight: true },
    bestFor: 'Wire entire pedalboard in one order, save 20%',
    price: '$239.99',
  },
]

export default function ProductComparison() {
  return (
    <section className="border-t border-border bg-card">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="mb-10 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-cream mb-3">
            Choose the Right Cable
          </h2>
          <p className="text-muted text-sm max-w-2xl mx-auto">
            Every Forever Cable is hand-soldered with premium components and backed by a lifetime guarantee. Here's how to choose the right one for your setup.
          </p>
        </div>

        {/* Desktop comparison table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 pr-4 text-xs tracking-wider uppercase text-muted font-semibold">
                  Product
                </th>
                {columns.map((col) => (
                  <th
                    key={col.slug}
                    className="text-center py-4 px-3 text-sm font-semibold text-cream border-l border-border"
                  >
                    <Link
                      href={`/products/${col.slug}`}
                      className="hover:text-accent transition-colors"
                    >
                      {col.name}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="py-4 pr-4 text-xs tracking-wider uppercase text-muted font-semibold">
                  Use Case
                </td>
                {columns.map((col) => (
                  <td
                    key={col.slug}
                    className="text-center py-4 px-3 border-l border-border"
                  >
                    <span
                      className={
                        col.use.highlight
                          ? 'inline-block px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded'
                          : 'text-sm text-cream'
                      }
                    >
                      {col.use.label}
                    </span>
                  </td>
                ))}
              </tr>
              <tr className="border-b border-border">
                <td className="py-4 pr-4 text-xs tracking-wider uppercase text-muted font-semibold">
                  Connectors
                </td>
                {columns.map((col) => (
                  <td
                    key={col.slug}
                    className="text-center py-4 px-3 text-sm text-muted border-l border-border"
                  >
                    {col.connector}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-border">
                <td className="py-4 pr-4 text-xs tracking-wider uppercase text-muted font-semibold">
                  Lengths
                </td>
                {columns.map((col) => (
                  <td
                    key={col.slug}
                    className="text-center py-4 px-3 text-sm text-muted border-l border-border"
                  >
                    {col.lengths}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-border">
                <td className="py-4 pr-4 text-xs tracking-wider uppercase text-muted font-semibold">
                  Best For
                </td>
                {columns.map((col) => (
                  <td
                    key={col.slug}
                    className="text-center py-4 px-3 text-sm text-muted leading-snug border-l border-border"
                  >
                    {col.bestFor}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-4 pr-4 text-xs tracking-wider uppercase text-muted font-semibold">
                  Starting Price
                </td>
                {columns.map((col) => (
                  <td
                    key={col.slug}
                    className="text-center py-4 px-3 font-semibold text-cream border-l border-border"
                  >
                    {col.price}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="lg:hidden space-y-6">
          {columns.map((col) => (
            <div
              key={col.slug}
              className="border border-border p-5 bg-bg"
            >
              <h3 className="font-serif text-xl text-cream mb-4">
                <Link
                  href={`/products/${col.slug}`}
                  className="hover:text-accent transition-colors"
                >
                  {col.name}
                </Link>
              </h3>
              <dl className="space-y-3">
                <div className="flex justify-between items-start">
                  <dt className="text-xs tracking-wider uppercase text-muted font-semibold">
                    Use Case
                  </dt>
                  <dd>
                    <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded">
                      {col.use.label}
                    </span>
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-xs tracking-wider uppercase text-muted font-semibold">
                    Connectors
                  </dt>
                  <dd className="text-sm text-muted text-right">
                    {col.connector}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-xs tracking-wider uppercase text-muted font-semibold">
                    Lengths
                  </dt>
                  <dd className="text-sm text-muted text-right">
                    {col.lengths}
                  </dd>
                </div>
                <div className="flex justify-between items-start">
                  <dt className="text-xs tracking-wider uppercase text-muted font-semibold">
                    Best For
                  </dt>
                  <dd className="text-sm text-muted text-right max-w-[60%]">
                    {col.bestFor}
                  </dd>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-border">
                  <dt className="text-xs tracking-wider uppercase text-muted font-semibold">
                    Starting Price
                  </dt>
                  <dd className="font-semibold text-cream">{col.price}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-muted mt-8">
          All cables include Mogami wire, Neutrik gold connectors, and the Forever Cables lifetime guarantee.
        </p>
      </div>
    </section>
  )
}
