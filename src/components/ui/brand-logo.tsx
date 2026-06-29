import type { ReactElement, SVGProps } from 'react'
import { cn } from '@/lib/utils'

/** Issuers we have a brand mark for. Drives the `logo` field in certification data. */
export type BrandKey = 'google' | 'deeplearning-ai' | 'udemy' | 'coursera'

/**
 * Monochrome brand glyphs (24×24, `currentColor`) so they inherit the card's
 * accent tint and read cleanly on the dark glass.
 *
 * Google / Udemy / Coursera paths are from Simple Icons. DeepLearning.AI has no
 * single-colour icon in any set, so its mark is a hand-drawn neural network —
 * three inputs → two hidden → one output — evoking the brand's identity.
 */
const GLYPHS: Record<BrandKey, ReactElement> = {
  google: (
    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
  ),
  udemy: (
    <path d="M12 0L5.81 3.573v3.574l6.189-3.574 6.191 3.574V3.573zM5.81 10.148v8.144c0 1.85.589 3.243 1.741 4.234S10.177 24 11.973 24s3.269-.482 4.448-1.474c1.179-.991 1.768-2.439 1.768-4.314v-8.064h-3.242v7.85c0 2.036-1.509 3.055-2.948 3.055-1.428 0-2.947-.991-2.947-3.027v-7.878z" />
  ),
  coursera: (
    <path d="M11.374 23.977c-4.183-.21-8.006-2.626-9.959-6.347-2.097-3.858-1.871-8.864.732-12.454C4.748 1.338 9.497-.698 14.281.23c4.583.857 8.351 4.494 9.358 8.911 1.122 4.344-.423 9.173-3.925 12.04-2.289 1.953-5.295 2.956-8.34 2.797zm7.705-8.05a588.737 588.737 0 0 0-3.171-1.887c-.903 1.483-2.885 2.248-4.57 1.665-2.024-.639-3.394-2.987-2.488-5.134.801-2.009 2.79-2.707 4.357-2.464a4.19 4.19 0 0 1 2.623 1.669c1.077-.631 2.128-1.218 3.173-1.855-2.03-3.118-6.151-4.294-9.656-2.754-3.13 1.423-4.89 4.68-4.388 7.919.54 3.598 3.73 6.486 7.716 6.404a7.664 7.664 0 0 0 6.404-3.563z" />
  ),
  'deeplearning-ai': (
    <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
      {/* synapses: 3 inputs → 2 hidden → 1 output */}
      <path
        fill="none"
        d="M4 5l7 3M4 5l7 11M4 12l7-4M4 12l7 8M4 19l7-11M4 19l7 5M11 8l7 4M11 16l7-4"
        opacity="0.55"
      />
      {/* neurons */}
      <circle cx="4" cy="5" r="1.7" stroke="none" />
      <circle cx="4" cy="12" r="1.7" stroke="none" />
      <circle cx="4" cy="19" r="1.7" stroke="none" />
      <circle cx="11" cy="8" r="1.7" stroke="none" />
      <circle cx="11" cy="16" r="1.7" stroke="none" />
      <circle cx="18" cy="12" r="1.7" stroke="none" />
    </g>
  ),
}

export function BrandLogo({
  brand,
  className,
  ...props
}: { brand: BrandKey } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      role="img"
      aria-hidden
      className={cn('size-6', className)}
      {...props}
    >
      {GLYPHS[brand]}
    </svg>
  )
}
