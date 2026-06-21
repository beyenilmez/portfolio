/**
 * Hero -- above-the-fold identity section with name, role, description, action buttons, and portrait.
 *
 * Layout:
 * - Desktop: 2-column grid (text + rectangular 4:5 portrait)
 * - Tablet: 2-column grid (text + smaller portrait)
 * - Mobile: single column with circular 68x68 avatar inline before heading
 *
 * Animation: each word in the title gets individual letter-stagger animation
 * gets individual letter-stagger animation on mount and locale switch.
 */
import { useLocale } from '@/contexts/LocaleContext';
import { useParallax } from '@/hooks/useParallax';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { content } from '@/config/content';
import PortraitImg from '@/components/PortraitImg';
import ResponsiveImage from '@/components/ResponsiveImage';
import { EnvelopeIcon, FileTextIcon, GitHubIcon, LinkedInIcon } from '@/components/Icons';
import portrait from '@/assets/photo.webp?w=136;340;480;720&format=webp&as=picture';
import styles from './Hero.module.css';

/** Wrap each word in a span with staggered wordFade animation, spaced naturally. */
function wordFadeSpans(text: string, startIdx: number, reduced: boolean) {
  const words = text.split(' ');
  return words.map((w, i) => (
    <span key={i}>
      <span
        style={{
          display: 'inline-block',
          animation: reduced ? 'none' : `wordFade .6s ${(startIdx + i) * 0.05}s both`,
        }}
      >
        {w}
      </span>
      {i < words.length - 1 ? ' ' : null}
    </span>
  ));
}

export default function Hero() {
  const locale = useLocale();
  const reduced = useReducedMotion();
  const { offsetX, offsetY, disabled: parallaxOff } = useParallax();

  const titleTemplate = content.i18n.hero.heroTitle[locale];
  const roleText = content.i18n.hero.role[locale];
  const parts = titleTemplate.split('{role}');
  const part0 = parts[0] ?? '';
  const part1 = parts[1] ?? '';
  const part0Words = part0.trimEnd().split(' ').length;

  // Container parallax transform
  const wrapTransform: React.CSSProperties = parallaxOff
    ? {}
    : {
        transform: `translate3d(${offsetX}px, ${offsetY}px, 0)`,
        transition: 'transform .35s cubic-bezier(.2,.7,.3,1)',
      };

  // Counter-parallax on image — moves opposite to wrapper for depth illusion
  const imgCounterStyle: React.CSSProperties = parallaxOff
    ? {}
    : {
        filter: 'contrast(1.02) saturate(1.05)',
        transform: `scale(1.08) translate3d(${offsetX * -0.5}px, ${offsetY * -0.5}px, 0)`,
        transition:
          'transform .5s cubic-bezier(.2,.7,.3,1), opacity .6s ease-out, filter .8s ease-out',
      };

  return (
    <section id="profile" className={styles.hero} style={{ position: 'relative' }}>
      <div className={styles.outerWrap}>
        <span className={styles.kicker}>
          01 ·{' '}
          {content.i18n.nav.profile[locale].toLocaleUpperCase(locale === 'tr' ? 'tr-TR' : 'en-US')}
        </span>

        {/* Mobile avatar row -- hidden on desktop/tablet */}
        <div
          className={styles.mobileAvatarRow}
          key={'hero-avatar-' + locale}
          style={reduced ? {} : { animation: 'wordFade .5s both' }}
        >
          <ResponsiveImage
            src={portrait}
            alt=""
            sizes="68px"
            className={styles.mobileAvatar}
            loading="lazy"
            decoding="async"
          />
          <div className={styles.mobileNameBlock}>
            <span className={styles.mobileAvatarName}>{content.i18n.hero.name}</span>
            <span className={styles.mobileRole}>{content.i18n.hero.roleMobile[locale]}</span>
          </div>
        </div>

        <div className={styles.container}>
          {/* Text column — key={locale} replays all animations on lang switch */}
          <div className={styles.textCol} key={'hero-txt-' + locale}>
            <h1 className={styles.title}>
              {wordFadeSpans(part0.trimEnd(), 0, reduced)}{' '}
              <em className={styles.role}>{wordFadeSpans(roleText, part0Words, reduced)}</em>
              <span
                style={{
                  display: 'inline-block',
                  animation: reduced
                    ? 'none'
                    : `wordFade .6s ${(part0Words + roleText.split(' ').length) * 0.05}s both`,
                }}
              >
                {part1}
              </span>
            </h1>

            {/* Description — wordFade animation */}
            <p
              className={styles.desc}
              style={reduced ? {} : { animation: 'wordFade .7s .3s both' }}
            >
              {content.i18n.hero.heroDesc[locale]}
            </p>

            {/* Buttons — wordFade animation */}
            <div
              className={styles.buttons}
              style={reduced ? {} : { animation: 'wordFade .6s .5s both' }}
            >
              <a href={`mailto:${content.links.email}`} className={styles.btnPrimary}>
                <EnvelopeIcon /> {content.i18n.labels.sendEmail[locale]}
              </a>
              <a
                href={content.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnSecondary}
              >
                <GitHubIcon /> {content.i18n.labels.github[locale]}
              </a>
              <a
                href={content.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnSecondary}
              >
                <LinkedInIcon /> LinkedIn
              </a>
              <a
                href={content.links.cvEn}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnSecondary}
              >
                <FileTextIcon /> {content.i18n.labels.cvEn[locale]}
              </a>
              <a
                href={content.links.cvTr}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnSecondary}
              >
                <FileTextIcon /> {content.i18n.labels.cvTr[locale]}
              </a>
            </div>
          </div>

          {/* Portrait: outer=layout, inner=visual frame with parallax */}
          <div className={styles.portraitWrap}>
            <div className={styles.portraitFrame} style={wrapTransform}>
              <PortraitImg src={portrait} alt="Bedirhan Yenilmez" imgStyle={imgCounterStyle} />
              <div className={styles.portraitGradient} aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
