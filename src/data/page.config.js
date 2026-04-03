/**
 * Vitrine : tous les types de blocs du registry + `sections` par route (voir api-erlow/content.json).
 */
import { API_IMG_BASE } from '../config/remoteData'
import { resolveForLocale } from '../utils/localeUtils'
import { extractContentImages, resolveMediaUrl } from '../utils/siteImages'

export const DEFAULT_SECTION_ORDER = [
  'navbar',
  'hero',
  'logoCloud',
  'stats',
  'features',
  'bento',
  'testimonials',
  'footer',
]

function r(src) {
  return resolveMediaUrl(API_IMG_BASE, src)
}

/**
 * @param {object} content — JSON fusionné pour la route courante
 * @param {string} locale
 * @param {() => void} onLocaleChange
 * @param {{ sections?: string[] | null, spaLinkComponent?: object | null, logoHref?: string }} [options]
 */
export function buildPageConfig(content, locale = 'fr', onLocaleChange = () => {}, options = {}) {
  const {
    sections = null,
    spaLinkComponent = null,
    logoHref = '#',
  } = options

  const order =
    Array.isArray(sections) && sections.length > 0 ? sections : DEFAULT_SECTION_ORDER

  const images = extractContentImages(content) ?? {}
  const nav = resolveForLocale(locale, content.navbar)
  const hero = resolveForLocale(locale, content.hero)
  const features = resolveForLocale(locale, content.features ?? { items: [] })
  const bento = resolveForLocale(locale, content.bento ?? { items: [] })
  const pricing = resolveForLocale(locale, content.pricing ?? { plans: [] })
  const testimonials = resolveForLocale(locale, content.testimonials ?? { items: [] })
  const footer = resolveForLocale(locale, content.footer)
  const logoCloud = resolveForLocale(locale, content.logoCloud ?? { items: [] })
  const stats = resolveForLocale(locale, content.stats ?? { items: [] })
  const ctaBanner = resolveForLocale(locale, content.ctaBanner ?? {})
  const faq = resolveForLocale(locale, content.faq ?? { items: [] })
  const team = resolveForLocale(locale, content.team ?? { members: [] })
  const splitContent = resolveForLocale(locale, content.splitContent ?? {})
  const timeline = resolveForLocale(locale, content.timeline ?? { items: [] })
  const newsletter = resolveForLocale(locale, content.newsletter ?? {})
  const steps = resolveForLocale(locale, content.steps ?? { steps: [] })
  const gallery = resolveForLocale(locale, content.gallery ?? { items: [] })
  const videoEmbed = resolveForLocale(locale, content.videoEmbed ?? {})
  const simpleCards = resolveForLocale(locale, content.simpleCards ?? { items: [] })

  const blocks = {
    navbar: () => ({
      type: 'navbar',
      props: {
        logo: nav.logo,
        logoSrc: images.logo,
        links: nav.links,
        ctaText: nav.cta,
        ctaHref: nav.ctaHref ?? '#contact',
        sticky: true,
        color: 'primary',
        locale,
        menuLabel: nav.menu,
        closeLabel: nav.close,
        onLocaleChange,
        spaLinkComponent,
        logoHref,
      },
    }),
    hero: () => ({
      type: 'hero',
      props: {
        sectionId: 'hero',
        title: hero.title,
        subtitle: hero.subtitle,
        ctaText: hero.cta,
        ctaHref: hero.ctaHref ?? '#pricing',
        variant: hero.variant ?? 'split',
        color: 'primary',
        imageUrl: images.hero,
        imageAlt: hero.imageAlt,
        eyebrow: hero.eyebrow,
      },
    }),
    logoCloud: () => ({
      type: 'logoCloud',
      props: {
        sectionId: 'logos',
        eyebrow: logoCloud.eyebrow,
        title: logoCloud.title,
        subtitle: logoCloud.subtitle,
        color: 'neutral',
        items: (logoCloud.items ?? []).map((item) => ({
          ...item,
          logoSrc: item.logoSrc ? r(item.logoSrc) : undefined,
        })),
      },
    }),
    stats: () => ({
      type: 'stats',
      props: {
        sectionId: 'stats',
        eyebrow: stats.eyebrow,
        title: stats.title,
        subtitle: stats.subtitle,
        color: 'primary',
        columns: stats.columns,
        items: stats.items ?? [],
      },
    }),
    features: () => ({
      type: 'features',
      props: {
        sectionId: features.sectionId ?? 'services',
        title: features.title,
        subtitle: features.subtitle,
        color: 'secondary',
        items: features.items ?? [],
      },
    }),
    splitContent: () => ({
      type: 'splitContent',
      props: {
        sectionId: 'split',
        eyebrow: splitContent.eyebrow,
        title: splitContent.title,
        body: splitContent.body,
        bullets: splitContent.bullets ?? [],
        imageUrl: splitContent.imageSrc ? r(splitContent.imageSrc) : images.hero,
        imageAlt: splitContent.imageAlt ?? '',
        reverse: splitContent.reverse,
        color: splitContent.color ?? 'secondary',
        bulletStyle: splitContent.bulletStyle ?? 'check',
      },
    }),
    steps: () => ({
      type: 'steps',
      props: {
        sectionId: 'steps',
        eyebrow: steps.eyebrow,
        title: steps.title,
        subtitle: steps.subtitle,
        color: 'primary',
        steps: steps.steps ?? [],
        stepIndicator: steps.stepIndicator ?? 'icon',
        gridColumns: steps.gridColumns,
      },
    }),
    bento: () => ({
      type: 'bento',
      props: {
        sectionId: 'showcase',
        title: bento.title,
        subtitle: bento.subtitle,
        note: bento.note,
        color: 'secondary',
        items: (bento.items ?? []).map((item, index) => ({
          ...item,
          imageUrl: images.bento?.[index],
        })),
      },
    }),
    simpleCards: () => ({
      type: 'simpleCards',
      props: {
        sectionId: 'simple-cards',
        eyebrow: simpleCards.eyebrow,
        title: simpleCards.title,
        subtitle: simpleCards.subtitle,
        color: simpleCards.color ?? 'primary',
        columns: simpleCards.columns,
        items: simpleCards.items ?? [],
      },
    }),
    gallery: () => ({
      type: 'gallery',
      props: {
        sectionId: 'gallery',
        eyebrow: gallery.eyebrow,
        title: gallery.title,
        subtitle: gallery.subtitle,
        color: 'neutral',
        columns: gallery.columns,
        items: (gallery.items ?? []).map((item) => ({
          ...item,
          src: item.src ? r(item.src) : '',
        })),
      },
    }),
    pricing: () => ({
      type: 'pricing',
      props: {
        sectionId: 'pricing',
        title: pricing.title,
        subtitle: pricing.subtitle,
        color: 'primary',
        highlightedPlan:
          typeof pricing.highlightedPlan === 'number' ? pricing.highlightedPlan : 0,
        plans: (pricing.plans ?? []).map((plan) => ({
          ...plan,
          ctaHref: plan.ctaHref ?? pricing.planCtaHref ?? '#contact',
        })),
      },
    }),
    testimonials: () => ({
      type: 'testimonials',
      props: {
        sectionId: 'testimonials',
        title: testimonials.title,
        subtitle: testimonials.subtitle,
        color: 'secondary',
        items: (testimonials.items ?? []).map((item, index) => ({
          ...item,
          avatarUrl: images.testimonialAvatars?.[index],
        })),
      },
    }),
    ctaBanner: () => ({
      type: 'ctaBanner',
      props: {
        sectionId: 'cta-banner',
        eyebrow: ctaBanner.eyebrow,
        title: ctaBanner.title,
        subtitle: ctaBanner.subtitle,
        ctaText: ctaBanner.ctaText,
        ctaHref: ctaBanner.ctaHref ?? '/infos',
        secondaryCtaText: ctaBanner.secondaryCtaText,
        secondaryCtaHref: ctaBanner.secondaryCtaHref ?? '/',
        color: ctaBanner.color ?? 'primary',
        displayVariant: ctaBanner.displayVariant ?? 'strip',
        variant: ctaBanner.variant ?? 'row',
      },
    }),
    faq: () => ({
      type: 'faq',
      props: {
        sectionId: 'faq',
        eyebrow: faq.eyebrow,
        title: faq.title,
        subtitle: faq.subtitle,
        color: 'secondary',
        items: faq.items ?? [],
        allowMultipleOpen: faq.allowMultipleOpen,
      },
    }),
    timeline: () => ({
      type: 'timeline',
      props: {
        sectionId: 'timeline',
        eyebrow: timeline.eyebrow,
        title: timeline.title,
        subtitle: timeline.subtitle,
        color: 'secondary',
        items: timeline.items ?? [],
      },
    }),
    team: () => ({
      type: 'team',
      props: {
        sectionId: 'team',
        eyebrow: team.eyebrow,
        title: team.title,
        subtitle: team.subtitle,
        color: 'secondary',
        members: (team.members ?? []).map((member) => ({
          ...member,
          avatarUrl: member.avatarSrc ? r(member.avatarSrc) : member.avatarUrl,
        })),
      },
    }),
    newsletter: () => ({
      type: 'newsletter',
      props: {
        sectionId: 'newsletter',
        eyebrow: newsletter.eyebrow,
        title: newsletter.title,
        subtitle: newsletter.subtitle,
        formAction: newsletter.formAction ?? '#',
        placeholder: newsletter.placeholder,
        buttonText: newsletter.buttonText,
        finePrint: newsletter.finePrint,
        color: newsletter.color ?? 'primary',
        fieldLayout: newsletter.fieldLayout ?? 'row',
      },
    }),
    videoEmbed: () => ({
      type: 'videoEmbed',
      props: {
        sectionId: 'video',
        eyebrow: videoEmbed.eyebrow,
        title: videoEmbed.title,
        subtitle: videoEmbed.subtitle,
        videoUrl: videoEmbed.videoUrl,
        youtubeId: videoEmbed.youtubeId,
        color: 'secondary',
      },
    }),
    footer: () => ({
      type: 'footer',
      props: {
        sectionId: 'contact',
        links:
          Array.isArray(footer.links) && footer.links.length > 0 ?
            footer.links.map((l) => ({
              label: l.label,
              href: l.href ?? '#',
            }))
          : [
              { label: footer.privacy, href: footer.linkHrefs?.privacy ?? '#' },
              { label: footer.terms, href: footer.linkHrefs?.terms ?? '#' },
              { label: footer.contact, href: footer.linkHrefs?.contact ?? '#contact' },
            ],
        socials:
          Array.isArray(footer.socials) && footer.socials.length > 0 ?
            footer.socials.map((s) => ({
              label: s.label,
              href: s.href ?? '#',
            }))
          : [
              { label: 'X', href: '#' },
              { label: 'LinkedIn', href: '#' },
              { label: 'GitHub', href: '#' },
            ],
        color: 'neutral',
        copyright: footer.copyright,
      },
    }),
  }

  const out = []
  for (const id of order) {
    const fn = blocks[id]
    if (fn) {
      out.push(fn())
    }
  }
  return out
}
