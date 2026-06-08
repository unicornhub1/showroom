import Image from "next/image";

/* Bild mit Gradient-Fallback. Eltern-Box bekommt die Größe per className
   (z.B. aspect-[4/3] oder h-full); das Bild füllt sie via object-cover. */
export default function Media({
  src,
  alt,
  gradient,
  className = "",
  sizes = "100vw",
  priority = false,
}: {
  src: string;
  alt: string;
  gradient: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: gradient }}>
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" priority={priority} />
    </div>
  );
}
