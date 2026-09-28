/* Atemkreis: 4 Sekunden ein, 1 Sekunde halten, 6 Sekunden aus.
   Reines CSS, damit Kreis und Beschriftung immer synchron bleiben. */
export default function BreathRing({ className = "" }: { className?: string }) {
  return (
    <figure className={`flex flex-col items-center gap-3 ${className}`}>
      <div className="gz-breath" role="img" aria-label="Atemkreis: vier Sekunden einatmen, sechs Sekunden ausatmen">
        <span className="gz-breath__ring" />
        <span className="gz-breath__core" />
        <span className="gz-breath__label gz-breath__label--in">Einatmen</span>
        <span className="gz-breath__label gz-breath__label--hold">Halten</span>
        <span className="gz-breath__label gz-breath__label--out">Ausatmen</span>
        <span className="gz-breath__label gz-breath__label--static">Ruhig atmen</span>
      </div>
      <figcaption className="gz-sans text-[0.8rem] font-medium" style={{ color: "rgba(243,243,238,0.9)", textShadow: "0 1px 8px rgba(36,44,29,0.4)" }}>
        Atme einmal mit
      </figcaption>
    </figure>
  );
}
