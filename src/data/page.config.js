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
        links: (nav.links ?? []).map((link) => {
          const { openInNewTab, targetBlank, ...rest } = link
          return { ...rest, openInNewTab: openInNewTab ?? targetBlank }
        }),
        ctaText: nav.cta,
        ctaHref: nav.ctaHref ?? '#contact',
        sticky: nav.sticky !== false,
        color: nav.color ?? 'primary',
        locale,
        menuLabel: nav.menu,
        closeLabel: nav.close,
        onLocaleChange,
        spaLinkComponent,
        logoHref,
        variant: nav.variant ?? 'bar',
        contentWidth: nav.contentWidth,
        linkDensity: nav.linkDensity,
        navPadding: nav.navPadding,
        logoOpenInNewTab: nav.logoOpenInNewTab ?? nav.logoTargetBlank,
        ctaOpenInNewTab: nav.ctaOpenInNewTab ?? nav.ctaTargetBlank,
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
        color: hero.color ?? 'primary',
        imageUrl: images.hero,
        imageAlt: hero.imageAlt,
        eyebrow: hero.eyebrow,
        titleSize: hero.titleSize,
        splitOrder: hero.splitOrder,
        imageAspect: hero.imageAspect,
        imageRounded: hero.imageRounded,
        overlapFloatingNavbar: hero.overlapFloatingNavbar,
        headerAlign: hero.headerAlign,
        contentWidth: hero.contentWidth,
        sectionPadding: hero.sectionPadding,
        subtitleMaxWidth: hero.subtitleMaxWidth,
        spaLinkComponent,
        ctaOpenInNewTab: hero.ctaOpenInNewTab ?? hero.ctaTargetBlank,
      },
    }),
    logoCloud: () => ({
      type: 'logoCloud',
      props: {
        sectionId: 'logos',
        eyebrow: logoCloud.eyebrow,
        title: logoCloud.title,
        subtitle: logoCloud.subtitle,
        color: logoCloud.color ?? 'neutral',
        sectionPadding: logoCloud.sectionPadding,
        contentWidth: logoCloud.contentWidth,
        headerAlign: logoCloud.headerAlign,
        titleSize: logoCloud.titleSize,
        logoSize: logoCloud.logoSize,
        grayscaleLogos: logoCloud.grayscaleLogos,
        items: (logoCloud.items ?? []).map((item) => {
          const { openInNewTab, targetBlank, ...rest } = item
          return {
            ...rest,
            openInNewTab: openInNewTab ?? targetBlank,
            logoSrc: item.logoSrc ? r(item.logoSrc) : undefined,
          }
        }),
      },
    }),
    stats: () => ({
      type: 'stats',
      props: {
        sectionId: 'stats',
        eyebrow: stats.eyebrow,
        title: stats.title,
        subtitle: stats.subtitle,
        color: stats.color ?? 'primary',
        columns: stats.columns,
        items: stats.items ?? [],
        headerAlign: stats.headerAlign,
        titleSize: stats.titleSize,
        gridGap: stats.gridGap,
        itemSurface: stats.itemSurface,
        statAlign: stats.statAlign,
        sectionPadding: stats.sectionPadding,
        contentWidth: stats.contentWidth,
      },
    }),
    features: () => ({
      type: 'features',
      props: {
        sectionId: features.sectionId ?? 'services',
        eyebrow: features.eyebrow,
        title: features.title,
        subtitle: features.subtitle,
        color: features.color ?? 'secondary',
        items: features.items ?? [],
        variant: features.variant ?? 'grid',
        gridColumns: features.gridColumns,
        iconStyle: features.iconStyle,
        headerAlign: features.headerAlign,
        titleSize: features.titleSize,
        sectionPadding: features.sectionPadding,
        contentWidth: features.contentWidth,
        subtitleMaxWidth: features.subtitleMaxWidth,
        gridGap: features.gridGap,
        itemSurface: features.itemSurface,
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
        imageRounded: splitContent.imageRounded,
        stackGap: splitContent.stackGap,
        textAlign: splitContent.textAlign,
        sectionPadding: splitContent.sectionPadding,
        contentWidth: splitContent.contentWidth,
      },
    }),
    steps: () => ({
      type: 'steps',
      props: {
        sectionId: 'steps',
        eyebrow: steps.eyebrow,
        title: steps.title,
        subtitle: steps.subtitle,
        color: steps.color ?? 'primary',
        steps: steps.steps ?? [],
        stepIndicator: steps.stepIndicator ?? 'icon',
        gridColumns: steps.gridColumns,
      },
    }),
    bento: () => ({
      type: 'bento',
      props: {
        sectionId: 'showcase',
        eyebrow: bento.eyebrow,
        title: bento.title,
        subtitle: bento.subtitle,
        note: bento.note,
        color: bento.color ?? 'secondary',
        gridMode: bento.gridMode,
        itemSurface: bento.itemSurface,
        headerAlign: bento.headerAlign,
        titleSize: bento.titleSize,
        gridGap: bento.gridGap,
        noteAlign: bento.noteAlign,
        sectionPadding: bento.sectionPadding,
        contentWidth: bento.contentWidth,
        items: (bento.items ?? []).map((item, index) => {
          const { openInNewTab, targetBlank, ...rest } = item
          return { ...rest, openInNewTab: openInNewTab ?? targetBlank, imageUrl: images.bento?.[index] }
        }),
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
        items: (simpleCards.items ?? []).map((item) => {
          const { openInNewTab, targetBlank, ...rest } = item
          return { ...rest, openInNewTab: openInNewTab ?? targetBlank }
        }),
        sectionPadding: simpleCards.sectionPadding,
        headerAlign: simpleCards.headerAlign,
        titleSize: simpleCards.titleSize,
        contentWidth: simpleCards.contentWidth,
        gridGap: simpleCards.gridGap,
        itemSurface: simpleCards.itemSurface,
      },
    }),
    gallery: () => ({
      type: 'gallery',
      props: {
        sectionId: 'gallery',
        eyebrow: gallery.eyebrow,
        title: gallery.title,
        subtitle: gallery.subtitle,
        color: gallery.color ?? 'neutral',
        columns: gallery.columns,
        items: (gallery.items ?? []).map((item) => ({
          ...item,
          src: item.src ? r(item.src) : '',
        })),
        sectionPadding: gallery.sectionPadding,
        headerAlign: gallery.headerAlign,
        titleSize: gallery.titleSize,
        contentWidth: gallery.contentWidth,
        gridGap: gallery.gridGap,
        itemSurface: gallery.itemSurface,
        subtitleMaxWidth: gallery.subtitleMaxWidth,
        imageAspect: gallery.imageAspect,
        hoverZoom: gallery.hoverZoom,
      },
    }),
    pricing: () => ({
      type: 'pricing',
      props: {
        sectionId: 'pricing',
        eyebrow: pricing.eyebrow,
        title: pricing.title,
        subtitle: pricing.subtitle,
        color: pricing.color ?? 'primary',
        highlightedPlan:
          typeof pricing.highlightedPlan === 'number' ? pricing.highlightedPlan : 0,
        highlightMode: pricing.highlightMode,
        ctaShape: pricing.ctaShape,
        headerAlign: pricing.headerAlign,
        titleSize: pricing.titleSize,
        itemSurface: pricing.itemSurface,
        gridGap: pricing.gridGap,
        sectionPadding: pricing.sectionPadding,
        contentWidth: pricing.contentWidth,
        plans: (pricing.plans ?? []).map((plan) => {
          const { openInNewTab, targetBlank, ...rest } = plan
          return {
            ...rest,
            openInNewTab: openInNewTab ?? targetBlank,
            ctaHref: plan.ctaHref ?? pricing.planCtaHref ?? '#contact',
          }
        }),
      },
    }),
    testimonials: () => ({
      type: 'testimonials',
      props: {
        sectionId: 'testimonials',
        eyebrow: testimonials.eyebrow,
        title: testimonials.title,
        subtitle: testimonials.subtitle,
        color: testimonials.color ?? 'secondary',
        layout: testimonials.layout,
        ratingTone: testimonials.ratingTone,
        avatar: testimonials.avatar,
        headerAlign: testimonials.headerAlign,
        titleSize: testimonials.titleSize,
        itemSurface: testimonials.itemSurface,
        gridGap: testimonials.gridGap,
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
        appearance: ctaBanner.appearance,
        align: ctaBanner.align,
        sectionPadding: ctaBanner.sectionPadding,
        contentWidth: ctaBanner.contentWidth,
        insetPadding: ctaBanner.insetPadding,
        spaLinkComponent,
        ctaOpenInNewTab: ctaBanner.ctaOpenInNewTab ?? ctaBanner.ctaTargetBlank,
        secondaryCtaOpenInNewTab: ctaBanner.secondaryCtaOpenInNewTab ?? ctaBanner.secondaryCtaTargetBlank,
      },
    }),
    faq: () => ({
      type: 'faq',
      props: {
        sectionId: 'faq',
        eyebrow: faq.eyebrow,
        title: faq.title,
        subtitle: faq.subtitle,
        color: faq.color ?? 'secondary',
        items: faq.items ?? [],
        allowMultipleOpen: faq.allowMultipleOpen,
        defaultOpenIndex: faq.defaultOpenIndex,
        itemSurface: faq.itemSurface,
        contentWidth: faq.contentWidth,
        headerAlign: faq.headerAlign,
        titleSize: faq.titleSize,
        sectionPadding: faq.sectionPadding,
      },
    }),
    timeline: () => ({
      type: 'timeline',
      props: {
        sectionId: 'timeline',
        eyebrow: timeline.eyebrow,
        title: timeline.title,
        subtitle: timeline.subtitle,
        color: timeline.color ?? 'secondary',
        items: timeline.items ?? [],
        sectionPadding: timeline.sectionPadding,
        headerAlign: timeline.headerAlign,
        titleSize: timeline.titleSize,
        contentWidth: timeline.contentWidth,
        subtitleMaxWidth: timeline.subtitleMaxWidth,
        lineTone: timeline.lineTone,
      },
    }),
    team: () => ({
      type: 'team',
      props: {
        sectionId: 'team',
        eyebrow: team.eyebrow,
        title: team.title,
        subtitle: team.subtitle,
        color: team.color ?? 'secondary',
        columns: team.columns,
        sectionPadding: team.sectionPadding,
        headerAlign: team.headerAlign,
        titleSize: team.titleSize,
        contentWidth: team.contentWidth,
        itemSurface: team.itemSurface,
        members: (team.members ?? []).map((member) => {
          const { openInNewTab, targetBlank, ...rest } = member
          return {
            ...rest,
            openInNewTab: openInNewTab ?? targetBlank,
            avatarUrl: member.avatarSrc ? r(member.avatarSrc) : member.avatarUrl,
          }
        }),
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
        sectionPadding: newsletter.sectionPadding,
        headerAlign: newsletter.headerAlign,
        titleSize: newsletter.titleSize,
        contentWidth: newsletter.contentWidth,
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
        color: videoEmbed.color ?? 'secondary',
        sectionPadding: videoEmbed.sectionPadding,
        contentWidth: videoEmbed.contentWidth,
        headerAlign: videoEmbed.headerAlign,
        titleSize: videoEmbed.titleSize,
        subtitleMaxWidth: videoEmbed.subtitleMaxWidth,
        aspectClass: videoEmbed.aspectClass,
        frameRound: videoEmbed.frameRound,
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
              openInNewTab: l.openInNewTab ?? l.targetBlank,
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
              openInNewTab: s.openInNewTab ?? s.targetBlank,
            }))
          : [
              { label: 'X', href: '#' },
              { label: 'LinkedIn', href: '#' },
              { label: 'GitHub', href: '#' },
            ],
        color: footer.color ?? 'neutral',
        copyright: footer.copyright,
        tagline: footer.tagline,
        variant: footer.variant,
        layout: footer.layout,
        socialStyle: footer.socialStyle,
        sectionPadding: footer.sectionPadding,
        contentWidth: footer.contentWidth,
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
