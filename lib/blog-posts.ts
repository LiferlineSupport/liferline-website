export interface BlogPost {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  publishedAt: string
  excerpt: string
  sections: {
    heading?: string
    paragraphs: string[]
  }[]
  cta: string
  category: string
  tags: string[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'why-patch-cables-matter',
    title: 'Why Your Patch Cables Are Probably the Weakest Link on Your Pedalboard',
    metaTitle: 'Why Your Patch Cables Are Probably the Weakest Link on Your Pedalboard',
    metaDescription: 'Signal loss, hum, and mid-gig failures often trace back to cheap patch cables. Here is how to choose guitar patch cables that actually hold up, and what separates good cables from great ones.',
    keywords: ['guitar patch cables', 'best guitar patch cables', 'how to choose guitar patch cables', 'pedalboard patch cables', 'silent patch cables'],
    publishedAt: '2026-07-17',
    excerpt: 'Signal loss, hum, and mid-gig failures often trace back to cheap patch cables. Here is what to look for when buying cables that actually hold up.',
    category: 'Gear',
    tags: ['pedalboard', 'patch cables', 'guitar gear', 'signal chain', 'cable quality'],
    sections: [
      {
        paragraphs: [
          'You spent real money on your pedals. You have got a decent tuner, a fuzz you love, maybe a delay you spent three weeks hunting down. And then you are connecting it all with whatever cables came in a five-pack from the bargain bin.',
          'Here is the uncomfortable truth: those cables are doing damage.',
          'Not catastrophic damage. Your rig still works. But patch cables are never neutral. They affect your tone, they introduce noise, and when they fail (and cheap ones do) they fail at the worst possible moment.',
          'This is a guide to understanding why patch cable quality matters, what to actually look for when you are buying, and how to stop replacing cables every six months.',
        ],
      },
      {
        heading: 'The Myth of the Transparent Cable',
        paragraphs: [
          'A common belief among guitarists is that a cable is a cable. Signal goes in, signal comes out. As long as the connectors make contact, what is the difference?',
          'The difference is measurable.',
          'Every guitar cable acts as a capacitor. The longer the cable and the higher its capacitance per foot, the more high-frequency content it rolls off before reaching the next pedal in your chain. With one or two patch cables this effect is minimal. But on a pedalboard with eight pedals and ten patch cables, you are running your signal through a small network of capacitors, and the cumulative effect eats into your high-end clarity.',
          'Quality cable manufacturers like Canare and Mogami specify their cables\' capacitance per meter. Low-capacitance cable preserves more treble and articulation. Budget cables often use higher-capacitance construction because it is cheaper to produce.',
        ],
      },
      {
        heading: 'Where Cheap Cables Actually Fail',
        paragraphs: [
          'Capacitance is an audible but subtle problem. The failure modes are less subtle.',
          'Connector solder joints are the single most common failure point in a patch cable. Manufacturers working at low price points cut corners on solder quality, flux type, and dwell time. Those joints look fine out of the box. Flex them a thousand times under stage conditions, being stepped on, pulled at angles, bundled and unbundled, and they crack. You get intermittent signal dropout, crackling, or complete silence.',
          'Shield coverage matters too. A guitar cable is a coaxial cable: the signal wire runs down the center, surrounded by a braided or spiral-wound shield that carries ground and blocks interference. Budget cables use lighter, thinner shields. Less coverage means more RF interference pickup from lighting fixtures, phones, and amps. That is where mysterious hum and buzz often comes from, not your gear.',
          'Cheap connectors use nickel plating that oxidizes quickly, especially in humid environments like clubs and rehearsal spaces. Oxidation increases contact resistance and introduces intermittent signal issues. Gold-plated connectors resist oxidation and maintain reliable contact over years of use.',
          'The boot, the rubber sleeve where cable meets connector, is supposed to distribute mechanical stress so the solder joint does not take the full impact of every tug and step. On cheap cables, the boot is cosmetic. On quality cables, it is functional.',
        ],
      },
      {
        heading: 'What to Look For When You Buy',
        paragraphs: [
          'If you are replacing your patch cables, here is the short version of what to evaluate:',
          'Cable construction: Look for cables made with quality wire from known manufacturers. The cable body should have a smooth, consistent outer jacket, not a rough or inconsistent finish. Heavier gauge cable generally means lower resistance and more robust construction.',
          'Connector quality: Gold-plated TS connectors on the ends. A solid, heavy plug, not a lightweight pressed one. No sharp seams on the connector body.',
          'Solder joints: On quality cables assembled by hand, every joint is inspected. On machine-assembled budget cables, quality control is statistical. Look for makers who describe their assembly process.',
          'Strain relief: The boot where cable meets plug should flex smoothly and return to shape. If it is rigid or thin, it is decorative, not protective.',
          'Warranty: This is a meaningful signal. A manufacturer willing to back cables for life is a manufacturer confident in their construction.',
        ],
      },
      {
        heading: 'The Right Angle Question',
        paragraphs: [
          'Standard straight patch cables work on most pedalboards. But if you are running cables between pedals placed side by side on a board with limited vertical clearance, right-angle connectors change everything.',
          'Right-angle plugs exit parallel to the board surface, which keeps cables flat and reduces stress on connector jacks. On a densely packed board, they can mean the difference between a clean layout and a tangle of cables fighting for space.',
          'The tradeoff: right-angle connectors are more mechanically complex, which means there are more failure points if they are not built well. A good right-angle connector should pivot cleanly, hold its position, and not feel loose in the jack.',
        ],
      },
      {
        heading: 'Cable Length on a Pedalboard',
        paragraphs: [
          'Keep patch cables as short as your layout allows. This is for two reasons:',
          'First, shorter cables mean less total capacitance in your chain. Second, excess cable length gets coiled or crammed, which stresses the connectors and clutters your board.',
          'Most pedalboard runs benefit from cables in the 6-inch to 18-inch range. Having two or three slightly longer cables (24 inches) for awkward runs is reasonable. Avoid running a 3-foot cable where 8 inches would do.',
        ],
      },
      {
        heading: 'How Often Should You Replace Patch Cables?',
        paragraphs: [
          'With quality cables, the honest answer is: almost never, if they are maintained and not physically damaged.',
          'With budget cables, most players are replacing them every 6 to 18 months, sometimes more often, depending on how hard they gig. The cumulative cost of repeatedly buying cheap cables often exceeds the one-time cost of buying quality cables that last indefinitely.',
          'The best patch cables come with some form of guarantee. If a cable fails under normal use, the maker should replace it.',
        ],
      },
      {
        heading: 'The Bottom Line',
        paragraphs: [
          'Patch cables are not glamorous. They are not the gear that makes you play better or inspires a new riff. But they are the thing connecting every piece of gear you have chosen, and they can quietly compromise all of it.',
          'Spend the money once on cables built to last, and you are done. No more mid-rehearsal troubleshooting, no more crackling during the best part of a take, no more wondering if the noise in your chain is a pedal problem or a cable problem.',
          'Your rig deserves the connection.',
        ],
      },
    ],
    cta: 'All of our patch cables are handmade from Canare and Mogami wire, use gold-plated connectors, and carry a lifetime guarantee.',
  },
  {
    slug: 'soldered-vs-solderless-patch-cables',
    title: 'Soldered vs. Solderless Patch Cables: Which Is Better for Your Pedalboard?',
    metaTitle: 'Soldered vs. Solderless Patch Cables: Which Is Better for Your Pedalboard?',
    metaDescription: 'Soldered or solderless patch cables: which wins for tone, reliability, and value? We break down the real differences and help you make the right call for your rig.',
    keywords: ['soldered patch cables', 'solderless patch cables', 'guitar pedalboard cables', 'handmade guitar cables'],
    publishedAt: '2026-07-17',
    excerpt: 'Soldered or solderless patch cables: which wins for tone, reliability, and value? We break down the real differences and help you make the right call.',
    category: 'Gear',
    tags: ['soldered cables', 'solderless cables', 'pedalboard', 'cable reliability'],
    sections: [
      {
        paragraphs: [
          'If you have spent any time building a pedalboard, you have probably run into this debate. Solderless patch cables are everywhere: easy to cut to length, quick to assemble, no heat gun required. But plenty of experienced players still swear by hand-soldered cables. Who is right?',
          'Both camps have valid points, but there are real differences that matter for tone, reliability, and long-term cost. This guide breaks it all down so you can make the right call for your rig.',
        ],
      },
      {
        heading: 'What Are Solderless Patch Cables?',
        paragraphs: [
          'Solderless patch cables use a mechanical compression connector instead of solder to attach the plug to the cable. You cut the cable to the exact length you need, thread it through the connector housing, and tighten a screw or clamp that bites into the cable shielding and conductor.',
          'The appeal is obvious. No soldering iron. No fumes. No skill required. You can build a complete custom-length cable set on your kitchen table in an hour, then reconfigure it whenever your pedalboard layout changes.',
          'Where solderless cables shine: adjustability (you can trim to exact length and redo it if you mess up), portability (one kit, multiple cable lengths), and speed (no waiting for solder to heat and cool).',
          'Where they fall short: the mechanical connection is only as reliable as the connector\'s grip on the cable. Over time, vibration, cable movement, and thermal cycling can loosen that grip. When the connection degrades, you get intermittent signal loss, increased noise, and tone coloration.',
          'More critically, solderless connectors do not hold the cable conductors with the same consistency as a properly flowed solder joint. The conductor sits in the connector under mechanical pressure rather than being molecularly bonded to the terminal. Under the stress of gigging or heavy use, the connection can shift, introducing ground loop noise or high-frequency roll-off.',
        ],
      },
      {
        heading: 'What Are Soldered Patch Cables?',
        paragraphs: [
          'In a hand-soldered patch cable, the cable conductor and shield are tinned with solder and bonded directly to the connector terminals. When the solder cools and sets, the conductor and terminal become a single contiguous piece of metal. There is no gap, no pressure fit, and no mechanical compression to loosen over time.',
          'This is how professional audio cables have been made for decades. Stage cables, studio cables, and broadcast cables are all hand-soldered for exactly this reason: the joint is permanent, predictable, and as close to zero-impedance as you can get.',
          'Where soldered cables win: a clean solder joint introduces essentially no resistance or capacitance into the signal path, the joint does not degrade, a correctly soldered shield termination provides complete RF and EMI rejection, and every joint in the cable behaves identically because they were all made to spec.',
          'The honest tradeoff: soldered cables are harder to custom-cut yourself, and they are not reconfigurable after the fact. For players who rebuild their boards regularly, this can be a friction point.',
        ],
      },
      {
        heading: 'The Sound Quality Question',
        paragraphs: [
          'This is where players get most heated, and the honest answer is nuanced.',
          'In a quiet studio with a clean amp, most experienced players can hear a difference between a fresh set of well-built soldered cables and a set of well-built solderless cables. The soldered set typically sounds slightly more open in the high end, with better string separation and a lower perceived noise floor.',
          'Under live conditions with stage volume, ambient noise, and the full signal chain running, that difference narrows. But narrow does not mean zero.',
          'More importantly, tone quality is not static. A solderless cable that sounds identical to a soldered one on day one may start introducing noise or rolling off highs after 12 months of regular use, as the mechanical connection loosens. A soldered cable will sound the same in 10 years as it did on the day it was made.',
          'For hobbyist home players, this may not matter much. For gigging musicians who rely on a consistent sound night after night, it matters a great deal.',
        ],
      },
      {
        heading: 'Which Should You Choose?',
        paragraphs: [
          'Here is a practical framework:',
          'Choose solderless if you experiment with board layouts often and need flexibility, you are setting up a practice-only board at home, or you are new to pedalboards and want to start simple.',
          'Choose hand-soldered if your board layout is fixed or changes rarely, you gig regularly and need cables that hold up under real-world stress, tone quality and a low noise floor are priorities for you, or you want cables that last for years, not months.',
          'Most serious gigging players settle on a fixed board layout eventually. At that point, hand-soldered cables are simply the better tool for the job.',
        ],
      },
      {
        heading: 'The Forever Cables Approach',
        paragraphs: [
          'At Hatch Patch Cables, every Forever Cable is hand-soldered by us, one at a time, using gold-plated connectors and oxygen-free copper conductors. We use Canare GS-6 cable stock for its exceptionally low capacitance, which preserves high-end clarity even on longer cable runs.',
          'Because we stand behind the quality of every solder joint, every cable ships with a lifetime guarantee. If a Forever Cable ever fails due to a connection issue, we replace it for free. No questions, no expiration, no fine print.',
          'We do not offer solderless options, and we are not planning to. The whole point of Forever Cables is to give you a cable you build your board around once, then forget about for the rest of your playing life.',
        ],
      },
    ],
    cta: 'If that sounds like what your rig needs, take a look at our full lineup.',
  },
  {
    slug: 'lifetime-warranty-guitar-cables',
    title: 'Are Lifetime Warranty Guitar Cables Worth It? (The Math Might Surprise You)',
    metaTitle: 'Are Lifetime Warranty Guitar Cables Worth It? (The Math Might Surprise You)',
    metaDescription: 'Lifetime warranty guitar cables sound like a gimmick, but the math tells a different story. Here is what to look for and what a real lifetime guarantee actually means.',
    keywords: ['lifetime warranty guitar cables', 'lifetime guitar cables', 'best guitar cables lifetime guarantee'],
    publishedAt: '2026-07-17',
    excerpt: 'Lifetime warranty guitar cables sound like a gimmick, but the math tells a different story. Here is what to look for and what a real lifetime guarantee actually means.',
    category: 'Gear',
    tags: ['lifetime warranty', 'guitar cables', 'cable value', 'guarantee'],
    sections: [
      {
        paragraphs: [
          'If you have been playing guitar for more than a few years, you have probably bought the same cable more than once. Not because you wanted to. Because it failed.',
          'A connector crackled until you gave it up. An output jack developed an intermittent short. The insulation cracked right where it bends into the pedal. Whatever the cause, the result is the same: you are back at the store, or back on Amazon, buying the same $25 cable you already bought.',
          'Most players accept this as just how cables work. They do not have to.',
        ],
      },
      {
        heading: 'The Real Cost of "Cheap" Guitar Cables',
        paragraphs: [
          'Budget cables seem like the smart move. Why spend more than necessary on a piece of wire?',
          'Here is the problem: a cable that fails every 18 to 24 months is not a $20 cable. It is a recurring cost. Let us do the math.',
          'Say you have a pedalboard with 6 patch cables and 2 instrument cables. You buy mid-range cables at $20 each for a total of $160. If you replace them on average every two years:',
          '5 years: $400. 10 years: $800. 20 years: $1,600.',
          'That is $1,600 on cables. And that assumes you are only replacing them when they completely fail. It does not account for the time you spend chasing down noise problems, or the gigs where a crackly cable cost you the confidence you needed.',
          'Now consider paying $38 once for a cable that never needs replacing. Over 10 years, that cable pays for itself within the first replacement cycle. Over 20 years, it costs a fraction of the alternative.',
          'The "expensive" cable is the cheap one, over time. The math is not close.',
        ],
      },
      {
        heading: 'What Most Lifetime Warranties Actually Cover',
        paragraphs: [
          'Before you get too excited, it is worth understanding that the words "lifetime warranty" can mean almost anything.',
          'Many cable warranties are technically lifetime warranties but have fine print that excludes most real-world failure modes. Common exclusions include: physical damage (which often includes fraying, kinking, or connector damage from normal use), damage from "improper use" (a category broad enough to exclude almost anything), damage from "environmental factors" (humidity, heat, stage use), requirements to provide original proof of purchase, and time limits embedded as "limited lifetime" language.',
          'Some warranties require you to pay return shipping. Some only replace with a refurbished cable. Some cover "defects in materials and workmanship" but define defect narrowly enough that most actual failure modes are excluded.',
          'The result is a warranty that looks impressive on a product page but rarely pays out in practice. Players who try to use these warranties often give up partway through the claims process because the friction is too high.',
        ],
      },
      {
        heading: 'What a Real Lifetime Guarantee Looks Like',
        paragraphs: [
          'A genuine lifetime guarantee has none of that friction.',
          'It covers the cable for as long as you own it. It does not require you to prove it was not your fault. It does not charge you return shipping. It does not expire. It does not require the original receipt.',
          'It simply says: if this cable stops working the way it should, we will fix it or replace it. End of policy.',
          'This kind of guarantee is only possible if the manufacturer is genuinely confident in the build quality. You cannot offer a no-questions guarantee on a cable made with cheap connectors and unreliable solder joints. The economics do not work. The only way a lifetime guarantee is financially viable for the manufacturer is if the cables almost never fail.',
          'Which is the point. A real lifetime guarantee is proof of confidence in the product, not a marketing phrase.',
        ],
      },
      {
        heading: 'Who Benefits Most From Lifetime Guitar Cables',
        paragraphs: [
          'Not every player needs a lifetime cable. But they make the most sense for:',
          'Gigging musicians: if you are playing regularly, cables take real abuse. Plugging and unplugging dozens of times per week, getting stepped on, rolled over with cart wheels, coiled and uncoiled in cold and hot conditions. A lifetime cable that handles all of this without complaint is worth significantly more than a budget cable that needs replacing every year.',
          'Touring players: when you are on the road, there is no time to track down a replacement cable at a local guitar store. A cable failure at soundcheck is a genuine problem. Cables you trust to work every night are not a luxury for professional players; they are a requirement.',
          'Players with fixed rigs: if you have a pedalboard you love and have no plans to rebuild it, the cable costs are a one-time investment. You pay once and you are done.',
          'Home studio players who want to stop thinking about cables: even for players who rarely gig, there is value in buying once and never buying again.',
        ],
      },
      {
        heading: 'The Forever Cables Difference',
        paragraphs: [
          'Every cable in the Forever Cables lineup ships with a true lifetime guarantee. No exclusions for normal use. No return shipping fees. No expiration date. No proof-of-purchase requirement.',
          'If your cable ever fails, you contact us and we make it right. That is the whole policy.',
          'We can offer this because of how the cables are made. Each one is hand-built by us using Canare GS-6 or Mogami W2524 cable stock, gold-plated connectors, and hand-soldered joints. The solder joint is where most cable failures originate: a mechanical connector that loosens over time, or a cold joint that was never fully bonded to begin with. Our joints are made right, inspected, and covered forever.',
          'We are not offering a lifetime guarantee because it sounds good in marketing. We are offering it because we are confident in the work, and we want you to be confident too.',
          'If you are tired of replacing cables, take a look at the lineup. One purchase, forever covered.',
        ],
      },
    ],
    cta: 'Every Forever Cable ships with a true lifetime guarantee. No exclusions, no fine print.',
  },
  {
    slug: 'how-to-choose-patch-cable-lengths',
    title: 'How to Choose the Right Patch Cable Lengths for Your Pedalboard',
    metaTitle: 'How to Choose the Right Patch Cable Lengths for Your Pedalboard',
    metaDescription: 'Confused about patch cable lengths for your pedalboard? This guide explains what lengths you actually need, how to measure, and why shorter is almost always better.',
    keywords: ['patch cable lengths', 'pedalboard cable lengths', 'how long should patch cables be', 'guitar pedalboard cables'],
    publishedAt: '2026-07-17',
    excerpt: 'Confused about patch cable lengths for your pedalboard? This guide explains what lengths you actually need, how to measure, and why shorter is almost always better.',
    category: 'Gear',
    tags: ['pedalboard', 'patch cable lengths', 'cable measurement', 'pedalboard setup'],
    sections: [
      {
        paragraphs: [
          'One of the most common pedalboard mistakes is ordering the wrong cable lengths. Too short and you are stretching connections that create mechanical stress on jacks. Too long and you have a rat\'s nest of slack that is a nightmare to manage, and you are introducing unnecessary cable length into your signal chain.',
          'Getting the lengths right is not complicated, but it does require a bit of planning. This guide walks you through exactly how to figure out what you need.',
        ],
      },
      {
        heading: 'Why Cable Length Matters (More Than You Think)',
        paragraphs: [
          'Before we get into measurements, it is worth understanding why cable length is not just a tidiness issue.',
          'Signal quality: every foot of cable is a tiny low-pass filter. The higher the capacitance rating of the cable, the more high-frequency content it rolls off. Most quality cables are spec\'d at around 30-35 pF per foot. At patch cable lengths (3 inches to 24 inches), this is negligible. But adding unnecessary slack means adding unnecessary capacitance.',
          'On a pedalboard with a dozen pedals connected by longer-than-needed cables, that capacitance adds up. Players who switch from random cable lengths to properly fitted patch cables often comment that their high end opens up. It is not imagination. It is physics.',
          'Strain relief: a cable that is too short puts constant tension on the connector barrel and the pedal\'s input/output jack. Over months and years, this tension works the jack loose from the pedal chassis or fatigues the solder joint inside the connector. A cable with just a little slack sits naturally without pulling.',
          'Board aesthetics and maintenance: a board with well-fitted cables is faster to troubleshoot, easier to clean, and easier to reconfigure if you swap a pedal.',
        ],
      },
      {
        heading: 'Side-by-Side Pedals (3 to 6 Inches)',
        paragraphs: [
          'When the output of one pedal is directly next to the input of the next, and those connections are on the same edge of each pedal, you need your shortest cables.',
          'For pedals mounted end-to-end on a single row, the connection typically only needs to travel 3 to 6 inches. Most side-by-side connections on compact boards like the Pedaltrain Nano or Metro 16 fit a 3-inch or 4-inch cable comfortably.',
          'The exception is when the output of one pedal and the input of the next are on opposite ends of those pedals. In that case you may need 8 to 12 inches.',
        ],
      },
      {
        heading: 'Same-Row but Spaced-Out Connections (6 to 12 Inches)',
        paragraphs: [
          'If you have pedals with unusual jack placement (top-mounted jacks, for example, or jacks recessed inside a wide chassis), or if there is a gap between pedals, you typically need 6 to 12 inches.',
          'Wah pedals, volume pedals, and expression pedals often have unusual form factors that push their jacks farther from where you would expect. Measure before you order.',
        ],
      },
      {
        heading: 'Cross-Row Connections (12 to 24 Inches)',
        paragraphs: [
          'If your board has two rows and you need to route signal from the back row to the front row (or front to back), you typically need 12 to 24 inches. Some double-row setups with taller risers or unusual routing may need up to 36 inches.',
          'Measure the actual routing path, not the straight-line distance. If the cable has to go around a power supply, over a riser, or through a cable channel, the effective length is longer than it looks.',
        ],
      },
      {
        heading: 'How to Measure Before You Order',
        paragraphs: [
          'The most reliable way to measure patch cable lengths is with a piece of string.',
          'With your board laid out the way you want it, run a piece of string from the output jack of one pedal to the input jack of the next, following the path the cable will take (around obstacles, through channels, with enough slack to not pull tight). Mark the string at each jack end. Measure the string. Add about 1/2 inch to account for the connector body inserting into the jack.',
          'Do this for every connection on your board before you order anything. Write down the measurements. Then round up to the nearest available cable length, not down. A cable that is 1 inch longer than ideal is fine. A cable that is 1 inch shorter will be a problem every time you plug it in.',
        ],
      },
      {
        heading: 'Common Pedalboard Sizes and What They Usually Need',
        paragraphs: [
          'If you do not want to measure every connection, here is a rough guide by board size.',
          'Compact boards (Pedaltrain Nano, Ditto Looper size): 2 to 4 cables at 3 to 6 inches. Usually no cross-row runs.',
          'Medium boards (Pedaltrain Metro 24, Holeyboard Standard): 4 to 8 cables at 3 to 12 inches, plus 1 to 2 cross-row cables at 15 to 20 inches.',
          'Large boards (Pedaltrain Classic 2, Temple Audio Duo 34): 6 to 12 cables, mix of 3 to 6 inch, 6 to 12 inch, and 18 to 24 inch depending on layout. Cross-row runs often 20 to 36 inches.',
        ],
      },
      {
        heading: 'The Case for Going Shorter',
        paragraphs: [
          'When in doubt between two lengths, go shorter.',
          'A cable with appropriate slack lasts longer because it is not under constant tension. It contributes less capacitance. It looks cleaner. And on a dense board, shorter cables are easier to route without snagging adjacent connections.',
          'The only argument for going longer is future-proofing a board layout. If you think you might move a pedal six months from now, a cable with a bit of extra length gives you options. But if your board is stable, fit to your actual layout.',
        ],
      },
      {
        heading: 'Forever Cables Available Lengths',
        paragraphs: [
          'Our Stage Cable patch cables are available in 10ft, 15ft, and 20ft configurations for running between your board and amp or between rigs. For pedal-to-pedal patch connections within your board, our Workhorse and Right Angle cables cover the typical range.',
          'Right Angle cables are particularly useful for side-by-side pedal connections where space is tight: the angled connector sits flush against the pedal face instead of projecting outward, which saves clearance on crowded boards.',
          'If you are not sure what you need after measuring, reach out. We are happy to help you figure out the right cables for your specific setup.',
        ],
      },
    ],
    cta: 'Every Forever Cable is handmade to order. Need help figuring out the right lengths for your setup? Get in touch.',
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}
