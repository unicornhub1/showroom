/* Bildmarke: drei Gezeitenlinien, die nach unten ruhiger werden. */
export default function Wave({
  className = "",
  color = "currentColor",
  accent = "var(--gz-lehm)",
}: {
  className?: string;
  color?: string;
  accent?: string;
}) {
  return (
    <svg viewBox="0 0 30 18" fill="none" aria-hidden="true" className={className}>
      <path d="M1 3.5c3.5-3 6.5-3 10 0s6.5 3 10 0 5.5-2.5 8 0" stroke={accent} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M1 9c3.5-2.2 6.5-2.2 10 0s6.5 2.2 10 0 5.5-1.8 8 0" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M1 14.5c3.5-1.3 6.5-1.3 10 0s6.5 1.3 10 0 5.5-1 8 0" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}
