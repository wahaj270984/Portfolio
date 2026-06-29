import { asset } from '@/config/assets'
import { useTheme } from '@/store/useTheme'
import { cn } from '@/lib/utils'

/** Issuers we have a brand logo for. Drives the `logo` field in certification data. */
export type BrandKey = 'google' | 'udemy' | 'stanford' | 'uc-san-diego'

/** A single file for both themes, or a per-theme pair where the mark must flip colour. */
type LogoSrc = string | { dark: string; light: string }

/**
 * Issuer logos, processed to read on the cards (solid backgrounds knocked out,
 * marks trimmed). Brands whose mark is a single colour (Udemy's "U", UCSD's
 * navy wordmark) ship a light + dark variant so they stay legible when the user
 * flips the theme; the rest work on both.
 */
const LOGOS: Record<BrandKey, { src: LogoSrc; label: string; wide: boolean }> = {
  google: { src: 'google.png', label: 'Google', wide: false },
  udemy: { src: { dark: 'udemy-dark.png', light: 'udemy-light.png' }, label: 'Udemy', wide: false },
  stanford: { src: 'stanford.png', label: 'Stanford University', wide: true },
  'uc-san-diego': {
    src: { dark: 'ucsd-dark.png', light: 'ucsd-light.png' },
    label: 'UC San Diego',
    wide: true,
  },
}

export const isWordmarkBrand = (brand: BrandKey): boolean => LOGOS[brand].wide

export function BrandLogo({ brand, className }: { brand: BrandKey; className?: string }) {
  const resolved = useTheme((s) => s.resolved)
  const { src, label } = LOGOS[brand]
  const file = typeof src === 'string' ? src : src[resolved]
  return (
    <img
      src={asset(file)}
      alt={`${label} logo`}
      loading="lazy"
      decoding="async"
      className={cn('object-contain', className)}
    />
  )
}
