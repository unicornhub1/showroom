/* Tautropfen: Bildmarke der Praxis. */
export default function DropMark({
  size = 18,
  color = "var(--ew-krapp)",
  className = "",
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size * 1.3}
      viewBox="0 0 20 26"
      aria-hidden="true"
      className={className}
    >
      <path d="M10 1.2C10 1.2 2 10.6 2 16.3a8 8 0 0 0 16 0C18 10.6 10 1.2 10 1.2Z" fill={color} />
      <ellipse
        cx="6.9"
        cy="16.4"
        rx="1.5"
        ry="2.7"
        fill="#FBF7F3"
        opacity="0.5"
        transform="rotate(-16 6.9 16.4)"
      />
    </svg>
  );
}
