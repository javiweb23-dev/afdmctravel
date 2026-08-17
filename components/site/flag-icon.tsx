/**
 * Inline SVG flags.
 *
 * These replace the regional-indicator emoji (🇺🇸 🇪🇸 🇫🇷), which Windows does
 * not render in Chrome or Edge — it showed bare letter pairs or empty boxes.
 * SVG renders identically on every platform.
 */

type FlagIconProps = {
  locale: string;
  className?: string;
};

function UsFlag() {
  return (
    <>
      <rect width="20" height="14" fill="#fff" />
      {[0, 2, 4, 6, 8, 10, 12].map((y) => (
        <rect key={y} y={y} width="20" height="1.077" fill="#b22234" />
      ))}
      <rect width="8.6" height="7.54" fill="#3c3b6e" />
      {[0.9, 2.4, 3.9, 5.4, 6.9].map((cy, row) =>
        [0.9, 2.4, 3.9, 5.4, 6.9, 8.4].map((cx, col) =>
          (row + col) % 2 === 0 ? (
            <circle key={`${cy}-${cx}`} cx={cx} cy={cy} r="0.42" fill="#fff" />
          ) : null,
        ),
      )}
    </>
  );
}

function EsFlag() {
  return (
    <>
      <rect width="20" height="14" fill="#c60b1e" />
      <rect y="3.5" width="20" height="7" fill="#ffc400" />
    </>
  );
}

function FrFlag() {
  return (
    <>
      <rect width="20" height="14" fill="#fff" />
      <rect width="6.67" height="14" fill="#002395" />
      <rect x="13.33" width="6.67" height="14" fill="#ed2939" />
    </>
  );
}

const flags: Record<string, () => React.ReactElement> = {
  en: UsFlag,
  es: EsFlag,
  fr: FrFlag,
};

export function FlagIcon({locale, className = "h-3.5 w-5"}: FlagIconProps) {
  const Flag = flags[locale];
  if (!Flag) return null;

  return (
    <svg
      viewBox="0 0 20 14"
      className={`shrink-0 rounded-[2px] ring-1 ring-black/10 ${className}`}
      aria-hidden
    >
      <Flag />
    </svg>
  );
}
