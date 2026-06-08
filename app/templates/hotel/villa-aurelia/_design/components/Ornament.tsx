/* Zentriertes Gold-Ornament zum Abtrennen großer Sektionen:
   dünne Gold-Linie mit kleiner Raute (◆) in der Mitte. */
export default function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`va-ornament ${className}`} aria-hidden>
      <span className="va-ornament__mark">&#9670;</span>
    </div>
  );
}
