/**
 * AnimatedText -- word-fade and letter-stagger animation for section headings.
 *
 * When letterStagger is enabled, it overrides word-fade mode — each character
 * animates individually. When disabled, words animate as whole units.
 * Falls back to plain text when both toggles are off.
 */
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { features } from '@/config/features';
import styles from './AnimatedText.module.css';

interface AnimatedTextProps {
  text: string;
  animKey: string | number;
  mode?: 'word' | 'letter';
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
}

export default function AnimatedText({
  text,
  animKey,
  as: Tag = 'span',
  className,
}: AnimatedTextProps) {
  const reduced = useReducedMotion();

  // letterStagger overrides everything — character-level animation takes priority
  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  // Character-level letter-stagger animation
  if (features.motion.letterStagger) {
    return (
      <Tag className={className} key={animKey}>
        {String(text)
          .split('')
          .map((ch, i) => (
            <span
              key={`${animKey}-${i}`}
              className={styles.letter}
              style={{ animationDelay: `${i * 0.022}s` }}
            >
              {ch === ' ' ? '\u00A0' : ch}
            </span>
          ))}
      </Tag>
    );
  }

  // Plain text fallback when wordFadeLang is disabled
  if (!features.motion.wordFadeLang) {
    return <Tag className={className}>{text}</Tag>;
  }

  // Word-by-word fade animation
  return (
    <Tag className={className} key={animKey}>
      {String(text)
        .split(' ')
        .map((w, i) => (
          <span
            key={`${animKey}-${i}`}
            className={styles.word}
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            {w}
          </span>
        ))}
    </Tag>
  );
}
