'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Lock,
  Building2,
  Ruler,
  ListChecks,
  CalendarClock,
  FileText,
  Minus,
  Plus,
  Info,
} from 'lucide-react';
import {
  OBJECT_TYPES,
  MODULES,
  COVERAGES,
  TERMS,
  calculate,
  formatEuro,
  formatNumber,
} from '../data';
import { LeadModal } from './LeadModal';

const STEPS = [
  { n: 1, label: 'Objektart', icon: Building2 },
  { n: 2, label: 'Objektgröße', icon: Ruler },
  { n: 3, label: 'Leistungen', icon: ListChecks },
  { n: 4, label: 'Zeitfenster', icon: CalendarClock },
  { n: 5, label: 'Ergebnis', icon: FileText },
];

export function Configurator() {
  const [step, setStep] = useState(1);
  const [objectType, setObjectType] = useState('buero');
  const [area, setArea] = useState(4000);
  const [buildings, setBuildings] = useState(1);
  const [outdoor, setOutdoor] = useState(false);
  const [modules, setModules] = useState<string[]>(['streife', 'alarm']);
  const [coverage, setCoverage] = useState('nacht');
  const [term, setTerm] = useState(12);

  const [unlocked, setUnlocked] = useState(false);
  const [modal, setModal] = useState<'unlock' | 'offer' | null>(null);

  const result = useMemo(
    () => calculate({ objectType, area, buildings, outdoor, modules, coverage, term }),
    [objectType, area, buildings, outdoor, modules, coverage, term]
  );

  const currentObject = OBJECT_TYPES.find((o) => o.id === objectType)!;
  const currentCoverage = COVERAGES.find((c) => c.id === coverage)!;
  const hasModules = modules.length > 0;

  /** Objektartwechsel setzt sinnvolle Voreinstellungen. */
  function chooseObject(id: string) {
    const obj = OBJECT_TYPES.find((o) => o.id === id);
    if (!obj) return;
    setObjectType(id);
    setArea(obj.typicalArea);
    const recommended = MODULES.filter((m) => m.recommended?.includes(id)).map((m) => m.id);
    setModules(recommended.length ? recommended.slice(0, 3) : ['streife']);
    if (id === 'baustelle' || id === 'veranstaltung') setCoverage('temporaer');
  }

  function toggleModule(id: string) {
    setModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  }

  const canAdvance = step === 3 ? hasModules : true;

  return (
    <div>
      {/* ── Stepper ─────────────────────────────────────────────────────── */}
      <div
        className="border-b"
        style={{ borderColor: 'var(--vg-border)', backgroundColor: 'var(--vg-surface)' }}
      >
        <div className="flex overflow-x-auto">
          {STEPS.map(({ n, label, icon: Icon }) => {
            const active = step === n;
            const done = step > n;
            return (
              <button
                key={n}
                onClick={() => (n < step || canAdvance ? setStep(n) : null)}
                className="flex min-w-[150px] flex-1 items-center gap-3 border-r px-5 py-5 text-left transition-colors"
                style={{
                  borderColor: 'var(--vg-border)',
                  backgroundColor: active ? 'var(--vg-bg)' : 'transparent',
                  borderBottom: active
                    ? '2px solid var(--vg-signal)'
                    : '2px solid transparent',
                }}
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center text-[11px]"
                  style={{
                    border: `1px solid ${
                      active || done ? 'var(--vg-signal)' : 'var(--vg-border-light)'
                    }`,
                    backgroundColor: done ? 'var(--vg-signal)' : 'transparent',
                    color: done
                      ? '#fff'
                      : active
                        ? 'var(--vg-signal)'
                        : 'var(--vg-text-dim)',
                    fontFamily: 'var(--vg-font-mono)',
                  }}
                >
                  {done ? <Check className="h-4 w-4" /> : `0${n}`}
                </span>
                <span className="hidden sm:block">
                  <span
                    className="block text-[9px] tracking-[0.18em] uppercase"
                    style={{
                      color: 'var(--vg-text-dim)',
                      fontFamily: 'var(--vg-font-mono)',
                    }}
                  >
                    Schritt {n}
                  </span>
                  <span
                    className="mt-0.5 block text-[13px]"
                    style={{
                      color: active ? 'var(--vg-text)' : 'var(--vg-text-muted)',
                      fontFamily: 'var(--vg-font-display)',
                      fontWeight: 600,
                    }}
                  >
                    {label}
                  </span>
                </span>
                <Icon className="h-4 w-4 sm:hidden" style={{ color: 'var(--vg-text-muted)' }} />
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Inhalt ──────────────────────────────────────────────────────── */}
      {step < 5 ? (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px]">
          {/* Schrittinhalt */}
          <div
            className="px-6 py-10 md:px-10 md:py-12"
            style={{ backgroundColor: 'var(--vg-bg)' }}
          >
            <div key={step} className="vg-step-in">
              {step === 1 && (
                <StepShell
                  title="Welche Art von Objekt möchten Sie schützen?"
                  hint="Die Objektart bestimmt Personalqualifikation, Kontrolldichte und Stundensätze."
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {OBJECT_TYPES.map((obj) => {
                      const active = objectType === obj.id;
                      return (
                        <button
                          key={obj.id}
                          onClick={() => chooseObject(obj.id)}
                          className="group relative overflow-hidden text-left transition-all"
                          style={{
                            border: `1px solid ${
                              active ? 'var(--vg-signal)' : 'var(--vg-border)'
                            }`,
                            backgroundColor: 'var(--vg-surface)',
                          }}
                        >
                          <div className="relative h-32 overflow-hidden">
                            <Image
                              src={obj.image}
                              alt={obj.name}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              style={{ opacity: active ? 0.9 : 0.62 }}
                              sizes="(max-width: 640px) 100vw, 320px"
                            />
                            <div
                              className="absolute inset-0"
                              style={{
                                background: active
                                  ? 'linear-gradient(to top, var(--vg-surface) 12%, transparent 90%)'
                                  : 'linear-gradient(to top, var(--vg-surface) 18%, rgba(10,13,18,0.35) 100%)',
                              }}
                            />
                            {active && (
                              <span
                                className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center"
                                style={{ backgroundColor: 'var(--vg-signal)' }}
                              >
                                <Check className="h-3.5 w-3.5" color="#fff" />
                              </span>
                            )}
                          </div>
                          <div className="px-5 pb-5 pt-4">
                            <p
                              className="text-[15px]"
                              style={{
                                color: active ? 'var(--vg-text)' : 'var(--vg-text-muted)',
                                fontFamily: 'var(--vg-font-display)',
                                fontWeight: 600,
                              }}
                            >
                              {obj.name}
                            </p>
                            <p
                              className="mt-1.5 text-[11px] leading-relaxed"
                              style={{ color: 'var(--vg-text-dim)' }}
                            >
                              {obj.tagline}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </StepShell>
              )}

              {step === 2 && (
                <StepShell
                  title="Wie groß ist das Objekt?"
                  hint="Fläche, Gebäudeanzahl und Außengelände bestimmen den Kontrollaufwand."
                >
                  {/* Fläche */}
                  <div
                    className="px-7 py-8"
                    style={{
                      backgroundColor: 'var(--vg-surface)',
                      border: '1px solid var(--vg-border)',
                    }}
                  >
                    <div className="flex items-end justify-between">
                      <label
                        className="text-[10px] tracking-[0.18em] uppercase"
                        style={{
                          color: 'var(--vg-text-dim)',
                          fontFamily: 'var(--vg-font-mono)',
                        }}
                      >
                        Gesamtfläche
                      </label>
                      <div className="flex items-baseline gap-2">
                        <span
                          className="text-3xl"
                          style={{
                            color: 'var(--vg-text)',
                            fontFamily: 'var(--vg-font-display)',
                            fontWeight: 700,
                          }}
                        >
                          {formatNumber(area)}
                        </span>
                        <span
                          className="text-sm"
                          style={{ color: 'var(--vg-text-muted)' }}
                        >
                          m²
                        </span>
                      </div>
                    </div>

                    <input
                      type="range"
                      min={200}
                      max={50000}
                      step={100}
                      value={area}
                      onChange={(e) => setArea(Number(e.target.value))}
                      className="vg-range mt-7"
                    />

                    <div className="mt-3 flex justify-between">
                      {['200 m²', '25.000 m²', '50.000 m²'].map((l) => (
                        <span
                          key={l}
                          className="text-[10px]"
                          style={{
                            color: 'var(--vg-text-dim)',
                            fontFamily: 'var(--vg-font-mono)',
                          }}
                        >
                          {l}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Gebäude + Außengelände */}
                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div
                      className="px-7 py-7"
                      style={{
                        backgroundColor: 'var(--vg-surface)',
                        border: '1px solid var(--vg-border)',
                      }}
                    >
                      <label
                        className="block text-[10px] tracking-[0.18em] uppercase"
                        style={{
                          color: 'var(--vg-text-dim)',
                          fontFamily: 'var(--vg-font-mono)',
                        }}
                      >
                        Gebäude / Bauteile
                      </label>
                      <p
                        className="mt-2 text-[11px] leading-relaxed"
                        style={{ color: 'var(--vg-text-dim)' }}
                      >
                        Getrennte Baukörper erzeugen zusätzliche Wegezeiten.
                      </p>
                      <div className="mt-5 flex items-center gap-4">
                        <button
                          onClick={() => setBuildings(Math.max(1, buildings - 1))}
                          className="flex h-10 w-10 items-center justify-center transition-colors"
                          style={{
                            border: '1px solid var(--vg-border-light)',
                            color: 'var(--vg-text-muted)',
                          }}
                          aria-label="Weniger"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span
                          className="min-w-[3ch] text-center text-2xl"
                          style={{
                            color: 'var(--vg-text)',
                            fontFamily: 'var(--vg-font-display)',
                            fontWeight: 700,
                          }}
                        >
                          {buildings}
                        </span>
                        <button
                          onClick={() => setBuildings(Math.min(12, buildings + 1))}
                          className="flex h-10 w-10 items-center justify-center transition-colors"
                          style={{
                            border: '1px solid var(--vg-border-light)',
                            color: 'var(--vg-text-muted)',
                          }}
                          aria-label="Mehr"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => setOutdoor(!outdoor)}
                      className="px-7 py-7 text-left transition-all"
                      style={{
                        backgroundColor: 'var(--vg-surface)',
                        border: `1px solid ${
                          outdoor ? 'var(--vg-signal)' : 'var(--vg-border)'
                        }`,
                      }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span
                            className="block text-[10px] tracking-[0.18em] uppercase"
                            style={{
                              color: 'var(--vg-text-dim)',
                              fontFamily: 'var(--vg-font-mono)',
                            }}
                          >
                            Außengelände
                          </span>
                          <span
                            className="mt-3 block text-[15px]"
                            style={{
                              color: 'var(--vg-text)',
                              fontFamily: 'var(--vg-font-display)',
                              fontWeight: 600,
                            }}
                          >
                            {outdoor ? 'Wird mitbewacht' : 'Nicht erforderlich'}
                          </span>
                          <span
                            className="mt-2 block text-[11px] leading-relaxed"
                            style={{ color: 'var(--vg-text-dim)' }}
                          >
                            Höfe, Parkflächen, Lagerplätze und Zufahrten
                          </span>
                        </div>
                        <span
                          className="mt-1 flex h-6 w-11 shrink-0 items-center px-0.5 transition-colors"
                          style={{
                            backgroundColor: outdoor
                              ? 'var(--vg-signal)'
                              : 'var(--vg-elevated)',
                            border: '1px solid var(--vg-border-light)',
                          }}
                        >
                          <span
                            className="h-4 w-4 transition-transform"
                            style={{
                              backgroundColor: '#fff',
                              transform: outdoor ? 'translateX(20px)' : 'translateX(0)',
                            }}
                          />
                        </span>
                      </div>
                    </button>
                  </div>
                </StepShell>
              )}

              {step === 3 && (
                <StepShell
                  title="Welche Leistungen benötigen Sie?"
                  hint={`Für ${currentObject.name} empfehlen wir die markierten Positionen. Mehrfachauswahl möglich.`}
                >
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {MODULES.map((mod) => {
                      const active = modules.includes(mod.id);
                      const recommended = mod.recommended?.includes(objectType);
                      return (
                        <button
                          key={mod.id}
                          onClick={() => toggleModule(mod.id)}
                          className="relative px-6 py-6 text-left transition-all"
                          style={{
                            backgroundColor: active
                              ? 'var(--vg-surface-alt)'
                              : 'var(--vg-surface)',
                            border: `1px solid ${
                              active ? 'var(--vg-signal)' : 'var(--vg-border)'
                            }`,
                          }}
                        >
                          <div className="flex items-start gap-4">
                            <span
                              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center"
                              style={{
                                border: `1px solid ${
                                  active ? 'var(--vg-signal)' : 'var(--vg-border-strong)'
                                }`,
                                backgroundColor: active
                                  ? 'var(--vg-signal)'
                                  : 'transparent',
                              }}
                            >
                              {active && <Check className="h-3.5 w-3.5" color="#fff" />}
                            </span>
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-2.5">
                                <span
                                  className="text-[15px]"
                                  style={{
                                    color: active
                                      ? 'var(--vg-text)'
                                      : 'var(--vg-text-muted)',
                                    fontFamily: 'var(--vg-font-display)',
                                    fontWeight: 600,
                                  }}
                                >
                                  {mod.name}
                                </span>
                                {recommended && (
                                  <span
                                    className="px-2 py-0.5 text-[9px] tracking-[0.14em] uppercase"
                                    style={{
                                      color: 'var(--vg-steel-light)',
                                      border: '1px solid var(--vg-border-strong)',
                                      fontFamily: 'var(--vg-font-mono)',
                                    }}
                                  >
                                    Empfohlen
                                  </span>
                                )}
                              </div>
                              <p
                                className="mt-2 text-[12px] leading-relaxed"
                                style={{ color: 'var(--vg-text-dim)' }}
                              >
                                {mod.description}
                              </p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {!hasModules && (
                    <div
                      className="mt-4 flex items-center gap-3 px-5 py-4"
                      style={{
                        border: '1px solid var(--vg-signal)',
                        backgroundColor: 'var(--vg-signal-glow)',
                      }}
                    >
                      <Info className="h-4 w-4" style={{ color: 'var(--vg-signal)' }} />
                      <span className="text-[13px]" style={{ color: 'var(--vg-text)' }}>
                        Bitte wählen Sie mindestens eine Leistung aus.
                      </span>
                    </div>
                  )}
                </StepShell>
              )}

              {step === 4 && (
                <StepShell
                  title="Wann soll bewacht werden?"
                  hint="Das Zeitfenster ist der größte Kostenfaktor — es bestimmt die benötigten Einsatzstunden."
                >
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {COVERAGES.map((cov) => {
                      const active = coverage === cov.id;
                      return (
                        <button
                          key={cov.id}
                          onClick={() => setCoverage(cov.id)}
                          className="px-6 py-6 text-left transition-all"
                          style={{
                            backgroundColor: active
                              ? 'var(--vg-surface-alt)'
                              : 'var(--vg-surface)',
                            border: `1px solid ${
                              active ? 'var(--vg-signal)' : 'var(--vg-border)'
                            }`,
                          }}
                        >
                          <div className="flex items-start gap-4">
                            <span
                              className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                              style={{
                                border: `1px solid ${
                                  active ? 'var(--vg-signal)' : 'var(--vg-border-strong)'
                                }`,
                              }}
                            >
                              {active && (
                                <span
                                  className="h-2 w-2 rounded-full"
                                  style={{ backgroundColor: 'var(--vg-signal)' }}
                                />
                              )}
                            </span>
                            <div>
                              <span
                                className="block text-[15px]"
                                style={{
                                  color: active
                                    ? 'var(--vg-text)'
                                    : 'var(--vg-text-muted)',
                                  fontFamily: 'var(--vg-font-display)',
                                  fontWeight: 600,
                                }}
                              >
                                {cov.name}
                              </span>
                              <span
                                className="mt-1.5 block text-[11px]"
                                style={{
                                  color: 'var(--vg-text-dim)',
                                  fontFamily: 'var(--vg-font-mono)',
                                }}
                              >
                                {cov.detail}
                              </span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Laufzeit */}
                  <div className="mt-8">
                    <p
                      className="text-[10px] tracking-[0.18em] uppercase"
                      style={{
                        color: 'var(--vg-text-dim)',
                        fontFamily: 'var(--vg-font-mono)',
                      }}
                    >
                      Vertragslaufzeit
                    </p>
                    <div className="mt-4 grid grid-cols-3 gap-3">
                      {TERMS.map((t) => {
                        const active = term === t.months;
                        return (
                          <button
                            key={t.months}
                            onClick={() => setTerm(t.months)}
                            className="px-4 py-5 text-center transition-all"
                            style={{
                              backgroundColor: active
                                ? 'var(--vg-surface-alt)'
                                : 'var(--vg-surface)',
                              border: `1px solid ${
                                active ? 'var(--vg-signal)' : 'var(--vg-border)'
                              }`,
                            }}
                          >
                            <span
                              className="block text-[15px]"
                              style={{
                                color: active ? 'var(--vg-text)' : 'var(--vg-text-muted)',
                                fontFamily: 'var(--vg-font-display)',
                                fontWeight: 600,
                              }}
                            >
                              {t.label}
                            </span>
                            <span
                              className="mt-1.5 block text-[10px] tracking-[0.1em] uppercase"
                              style={{
                                color: t.discount
                                  ? 'var(--vg-ok)'
                                  : 'var(--vg-text-dim)',
                                fontFamily: 'var(--vg-font-mono)',
                              }}
                            >
                              {t.discount
                                ? `− ${Math.round(t.discount * 100)} %`
                                : 'Standard'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </StepShell>
              )}
            </div>

            {/* Navigation */}
            <div
              className="mt-10 flex items-center justify-between border-t pt-7"
              style={{ borderColor: 'var(--vg-border)' }}
            >
              <button
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
                className="flex items-center gap-2.5 px-6 py-4 text-[12px] tracking-[0.12em] uppercase transition-all"
                style={{
                  border: '1px solid var(--vg-border-light)',
                  color: step === 1 ? 'var(--vg-text-dim)' : 'var(--vg-text-muted)',
                  opacity: step === 1 ? 0.4 : 1,
                  cursor: step === 1 ? 'not-allowed' : 'pointer',
                  fontFamily: 'var(--vg-font-body)',
                  fontWeight: 500,
                }}
              >
                <ArrowLeft className="h-4 w-4" />
                Zurück
              </button>

              <button
                onClick={() => canAdvance && setStep(step + 1)}
                disabled={!canAdvance}
                className="group flex items-center gap-3 px-8 py-4 text-[12px] tracking-[0.12em] uppercase transition-all"
                style={{
                  backgroundColor: canAdvance
                    ? 'var(--vg-signal)'
                    : 'var(--vg-elevated)',
                  color: canAdvance ? '#fff' : 'var(--vg-text-dim)',
                  cursor: canAdvance ? 'pointer' : 'not-allowed',
                  fontFamily: 'var(--vg-font-body)',
                  fontWeight: 600,
                }}
              >
                {step === 4 ? 'Preis berechnen' : 'Weiter'}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Live-Zusammenfassung */}
          <aside
            className="border-t px-7 py-9 lg:border-l lg:border-t-0"
            style={{
              backgroundColor: 'var(--vg-surface)',
              borderColor: 'var(--vg-border)',
            }}
          >
            <div className="lg:sticky lg:top-32">
              <p
                className="text-[10px] tracking-[0.24em] uppercase"
                style={{
                  color: 'var(--vg-signal)',
                  fontFamily: 'var(--vg-font-mono)',
                }}
              >
                Ihre Konfiguration
              </p>

              <dl className="mt-6 flex flex-col gap-4">
                <SummaryRow label="Objektart" value={currentObject.name} />
                <SummaryRow label="Fläche" value={`${formatNumber(area)} m²`} />
                <SummaryRow
                  label="Gebäude"
                  value={`${buildings}${outdoor ? ' · mit Außengelände' : ''}`}
                />
                <SummaryRow
                  label="Leistungen"
                  value={
                    hasModules
                      ? modules
                          .map((id) => MODULES.find((m) => m.id === id)?.name)
                          .filter(Boolean)
                          .join(', ')
                      : '—'
                  }
                />
                <SummaryRow label="Zeitfenster" value={currentCoverage.name} />
                <SummaryRow label="Laufzeit" value={`${term} Monate`} />
              </dl>

              {/* Laufende Schätzung */}
              <div
                className="mt-8 px-5 py-6"
                style={{
                  backgroundColor: 'var(--vg-bg)',
                  border: '1px solid var(--vg-border-light)',
                }}
              >
                <p
                  className="text-[9px] tracking-[0.2em] uppercase"
                  style={{
                    color: 'var(--vg-text-dim)',
                    fontFamily: 'var(--vg-font-mono)',
                  }}
                >
                  Laufende Schätzung
                </p>
                {hasModules ? (
                  <>
                    <p
                      className="mt-3 text-2xl leading-none"
                      style={{
                        color: 'var(--vg-text)',
                        fontFamily: 'var(--vg-font-display)',
                        fontWeight: 700,
                      }}
                    >
                      {formatEuro(result.min)}
                      <span
                        className="mx-1.5"
                        style={{ color: 'var(--vg-text-dim)', fontWeight: 400 }}
                      >
                        –
                      </span>
                      {formatEuro(result.max)}
                    </p>
                    <p
                      className="mt-2.5 text-[11px]"
                      style={{ color: 'var(--vg-text-dim)' }}
                    >
                      pro Monat, zzgl. MwSt.
                    </p>
                  </>
                ) : (
                  <p
                    className="mt-3 text-sm"
                    style={{ color: 'var(--vg-text-dim)' }}
                  >
                    Leistungen auswählen
                  </p>
                )}
              </div>

              <div className="mt-5 flex items-start gap-2">
                <span
                  className="vg-pulse mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: 'var(--vg-ok)' }}
                />
                <p
                  className="text-[11px] leading-relaxed"
                  style={{ color: 'var(--vg-text-dim)' }}
                >
                  Berechnung auf Basis von 340+ vergleichbaren Objekten
                </p>
              </div>
            </div>
          </aside>
        </div>
      ) : (
        /* ── Schritt 5: Ergebnis ─────────────────────────────────────────── */
        <ResultView
          result={result}
          objectName={currentObject.name}
          area={area}
          coverageName={currentCoverage.name}
          term={term}
          outdoor={outdoor}
          buildings={buildings}
          unlocked={unlocked}
          onUnlock={() => setModal('unlock')}
          onOffer={() => setModal('offer')}
          onBack={() => setStep(4)}
        />
      )}

      {modal && (
        <LeadModal
          mode={modal}
          min={result.min}
          max={result.max}
          onClose={() => setModal(null)}
          onSuccess={() => {
            if (modal === 'unlock') setUnlocked(true);
          }}
        />
      )}
    </div>
  );
}

/* ── Hilfskomponenten ──────────────────────────────────────────────────── */

function StepShell({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2
        className="text-2xl leading-tight md:text-[28px]"
        style={{
          color: 'var(--vg-text)',
          fontFamily: 'var(--vg-font-display)',
          fontWeight: 700,
          letterSpacing: '-0.01em',
        }}
      >
        {title}
      </h2>
      <p
        className="mt-3 max-w-2xl text-sm leading-relaxed"
        style={{ color: 'var(--vg-text-muted)' }}
      >
        {hint}
      </p>
      <div className="mt-8">{children}</div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex flex-col gap-1 border-b pb-4"
      style={{ borderColor: 'var(--vg-border)' }}
    >
      <dt
        className="text-[9px] tracking-[0.18em] uppercase"
        style={{ color: 'var(--vg-text-dim)', fontFamily: 'var(--vg-font-mono)' }}
      >
        {label}
      </dt>
      <dd className="text-[13px] leading-snug" style={{ color: 'var(--vg-text)' }}>
        {value}
      </dd>
    </div>
  );
}

function ResultView({
  result,
  objectName,
  area,
  coverageName,
  term,
  outdoor,
  buildings,
  unlocked,
  onUnlock,
  onOffer,
  onBack,
}: {
  result: ReturnType<typeof calculate>;
  objectName: string;
  area: number;
  coverageName: string;
  term: number;
  outdoor: boolean;
  buildings: number;
  unlocked: boolean;
  onUnlock: () => void;
  onOffer: () => void;
  onBack: () => void;
}) {
  return (
    <div className="vg-step-in px-6 py-12 md:px-10 md:py-14" style={{ backgroundColor: 'var(--vg-bg)' }}>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
        {/* Preis */}
        <div>
          <div className="flex items-center gap-3">
            <span className="h-px w-10" style={{ backgroundColor: 'var(--vg-signal)' }} />
            <span
              className="text-[10px] tracking-[0.24em] uppercase"
              style={{ color: 'var(--vg-signal)', fontFamily: 'var(--vg-font-mono)' }}
            >
              Ihre Kalkulation
            </span>
          </div>

          <p
            className="mt-7 text-[13px]"
            style={{ color: 'var(--vg-text-muted)' }}
          >
            {objectName} · {formatNumber(area)} m² · {coverageName}
            {outdoor ? ' · inkl. Außengelände' : ''}
            {buildings > 1 ? ` · ${buildings} Gebäude` : ''}
          </p>

          <p
            className="mt-5 text-5xl leading-none md:text-[64px]"
            style={{
              color: 'var(--vg-text)',
              fontFamily: 'var(--vg-font-display)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
            }}
          >
            {formatEuro(result.min)}
            <span
              className="mx-3"
              style={{ color: 'var(--vg-text-dim)', fontWeight: 400 }}
            >
              –
            </span>
            {formatEuro(result.max)}
          </p>

          <p className="mt-4 text-sm" style={{ color: 'var(--vg-text-muted)' }}>
            pro Monat, zzgl. MwSt. · Festpreis für {term} Monate Laufzeit
          </p>

          {/* Kennzahlen */}
          <div className="mt-9 grid grid-cols-2 gap-px sm:grid-cols-3" style={{ backgroundColor: 'var(--vg-border)' }}>
            <Metric label="Einsatzstunden" value={`${formatNumber(result.totalHours)} h`} sub="pro Monat" />
            <Metric label="Kosten je m²" value={`${result.perSqm.toFixed(2).replace('.', ',')} €`} sub="pro Monat" />
            <Metric label="Positionen" value={String(result.lines.length)} sub="im Leistungsverzeichnis" />
          </div>

          {/* Aufschlüsselung */}
          <div className="relative mt-10">
            <div className="flex items-center justify-between">
              <h3
                className="text-[17px]"
                style={{
                  color: 'var(--vg-text)',
                  fontFamily: 'var(--vg-font-display)',
                  fontWeight: 600,
                }}
              >
                Aufschlüsselung
              </h3>
              {unlocked && (
                <span
                  className="flex items-center gap-2 text-[10px] tracking-[0.16em] uppercase"
                  style={{ color: 'var(--vg-ok)', fontFamily: 'var(--vg-font-mono)' }}
                >
                  <Check className="h-3.5 w-3.5" />
                  Freigeschaltet
                </span>
              )}
            </div>

            <div className="relative mt-5">
              <div
                style={{
                  filter: unlocked ? 'none' : 'blur(7px)',
                  opacity: unlocked ? 1 : 0.55,
                  pointerEvents: unlocked ? 'auto' : 'none',
                  transition: 'filter 0.4s ease, opacity 0.4s ease',
                  userSelect: unlocked ? 'auto' : 'none',
                }}
              >
                <table className="w-full text-left">
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--vg-border-light)' }}>
                      {['Position', 'Stunden', 'Satz', 'Monat'].map((h, i) => (
                        <th
                          key={h}
                          className={`pb-3 text-[9px] tracking-[0.18em] uppercase ${
                            i > 0 ? 'text-right' : ''
                          }`}
                          style={{
                            color: 'var(--vg-text-dim)',
                            fontFamily: 'var(--vg-font-mono)',
                            fontWeight: 400,
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.lines.map((line) => (
                      <tr key={line.id} style={{ borderBottom: '1px solid var(--vg-border)' }}>
                        <td className="py-4 text-sm" style={{ color: 'var(--vg-text)' }}>
                          {line.name}
                        </td>
                        <td
                          className="py-4 text-right text-sm"
                          style={{
                            color: 'var(--vg-text-muted)',
                            fontFamily: 'var(--vg-font-mono)',
                          }}
                        >
                          {line.hours > 0 ? `${formatNumber(line.hours)} h` : '—'}
                        </td>
                        <td
                          className="py-4 text-right text-sm"
                          style={{
                            color: 'var(--vg-text-muted)',
                            fontFamily: 'var(--vg-font-mono)',
                          }}
                        >
                          {line.hours > 0
                            ? `${line.rate.toFixed(2).replace('.', ',')} €`
                            : 'Pauschale'}
                        </td>
                        <td
                          className="py-4 text-right text-sm"
                          style={{
                            color: 'var(--vg-text)',
                            fontFamily: 'var(--vg-font-mono)',
                          }}
                        >
                          {formatEuro(line.total)}
                        </td>
                      </tr>
                    ))}

                    {result.outdoorSurcharge > 0 && (
                      <SurchargeRow
                        label="Zuschlag Außengelände (11 %)"
                        value={formatEuro(result.outdoorSurcharge)}
                      />
                    )}
                    {result.buildingSurcharge > 0 && (
                      <SurchargeRow
                        label={`Zuschlag Wegezeiten (${buildings} Gebäude)`}
                        value={formatEuro(result.buildingSurcharge)}
                      />
                    )}
                    {result.discount > 0 && (
                      <SurchargeRow
                        label={`Laufzeitnachlass (${term} Monate)`}
                        value={`− ${formatEuro(result.discount)}`}
                        positive
                      />
                    )}

                    <tr>
                      <td
                        colSpan={3}
                        className="pt-5 text-sm"
                        style={{
                          color: 'var(--vg-text)',
                          fontFamily: 'var(--vg-font-display)',
                          fontWeight: 600,
                        }}
                      >
                        Kalkulierter Monatspreis
                      </td>
                      <td
                        className="pt-5 text-right text-lg"
                        style={{
                          color: 'var(--vg-text)',
                          fontFamily: 'var(--vg-font-display)',
                          fontWeight: 700,
                        }}
                      >
                        {formatEuro(result.monthly)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Sperre */}
              {!unlocked && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="mx-4 max-w-sm px-8 py-9 text-center"
                    style={{
                      backgroundColor: 'var(--vg-surface)',
                      border: '1px solid var(--vg-border-light)',
                    }}
                  >
                    <span
                      className="mx-auto flex h-11 w-11 items-center justify-center"
                      style={{
                        border: '1px solid var(--vg-signal)',
                        color: 'var(--vg-signal)',
                      }}
                    >
                      <Lock className="h-5 w-5" />
                    </span>
                    <p
                      className="mt-5 text-[17px]"
                      style={{
                        color: 'var(--vg-text)',
                        fontFamily: 'var(--vg-font-display)',
                        fontWeight: 600,
                      }}
                    >
                      Detailkalkulation gesperrt
                    </p>
                    <p
                      className="mt-3 text-[13px] leading-relaxed"
                      style={{ color: 'var(--vg-text-muted)' }}
                    >
                      Einsatzstunden, Stundensätze und Zuschläge im Einzelnen —
                      kostenlos nach kurzer Angabe Ihrer Kontaktdaten.
                    </p>
                    <button
                      onClick={onUnlock}
                      className="mt-6 w-full px-7 py-4 text-[12px] tracking-[0.14em] uppercase"
                      style={{
                        backgroundColor: 'var(--vg-signal)',
                        color: '#fff',
                        fontFamily: 'var(--vg-font-body)',
                        fontWeight: 600,
                      }}
                    >
                      Details freischalten
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex items-start gap-2.5">
            <Info
              className="mt-0.5 h-3.5 w-3.5 shrink-0"
              style={{ color: 'var(--vg-text-dim)' }}
            />
            <p className="text-[11px] leading-relaxed" style={{ color: 'var(--vg-text-dim)' }}>
              Die Kalkulation ist eine unverbindliche Schätzung auf Basis von
              Erfahrungswerten vergleichbarer Objekte. Der verbindliche Festpreis
              ergibt sich nach der Objektbegehung.
            </p>
          </div>
        </div>

        {/* Handlungsspalte */}
        <aside>
          <div className="lg:sticky lg:top-32">
            <div
              className="px-7 py-8"
              style={{
                backgroundColor: 'var(--vg-surface)',
                border: '1px solid var(--vg-border-light)',
              }}
            >
              <h3
                className="text-[19px] leading-tight"
                style={{
                  color: 'var(--vg-text)',
                  fontFamily: 'var(--vg-font-display)',
                  fontWeight: 700,
                }}
              >
                Angebot zum Festpreis
              </h3>
              <p
                className="mt-3 text-[13px] leading-relaxed"
                style={{ color: 'var(--vg-text-muted)' }}
              >
                Ein Sicherheitsberater prüft Ihre Konfiguration und erstellt ein
                verbindliches Angebot — in der Regel innerhalb von 24 Stunden.
              </p>

              <button
                onClick={onOffer}
                className="mt-6 w-full px-7 py-4.5 text-[12px] tracking-[0.14em] uppercase"
                style={{
                  backgroundColor: 'var(--vg-signal)',
                  color: '#fff',
                  fontFamily: 'var(--vg-font-body)',
                  fontWeight: 600,
                  paddingTop: '17px',
                  paddingBottom: '17px',
                }}
              >
                Angebot anfordern
              </button>

              {!unlocked && (
                <button
                  onClick={onUnlock}
                  className="mt-3 w-full px-7 py-4 text-[12px] tracking-[0.14em] uppercase transition-colors"
                  style={{
                    border: '1px solid var(--vg-border-light)',
                    color: 'var(--vg-text-muted)',
                    fontFamily: 'var(--vg-font-body)',
                    fontWeight: 500,
                  }}
                >
                  Nur Details freischalten
                </button>
              )}

              <ul className="mt-7 flex flex-col gap-3">
                {[
                  'Kostenlos und unverbindlich',
                  'Keine Weitergabe an Dritte',
                  'Festpreis für die Laufzeit',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <Check
                      className="mt-0.5 h-3.5 w-3.5 shrink-0"
                      style={{ color: 'var(--vg-ok)' }}
                    />
                    <span className="text-[12px]" style={{ color: 'var(--vg-text-muted)' }}>
                      {t}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={onBack}
              className="mt-4 flex w-full items-center justify-center gap-2.5 px-7 py-4 text-[12px] tracking-[0.12em] uppercase transition-colors"
              style={{
                border: '1px solid var(--vg-border)',
                color: 'var(--vg-text-muted)',
                fontFamily: 'var(--vg-font-body)',
                fontWeight: 500,
              }}
            >
              <ArrowLeft className="h-4 w-4" />
              Konfiguration ändern
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Metric({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="px-5 py-6" style={{ backgroundColor: 'var(--vg-surface)' }}>
      <p
        className="text-[9px] tracking-[0.18em] uppercase"
        style={{ color: 'var(--vg-text-dim)', fontFamily: 'var(--vg-font-mono)' }}
      >
        {label}
      </p>
      <p
        className="mt-2.5 text-2xl leading-none"
        style={{
          color: 'var(--vg-text)',
          fontFamily: 'var(--vg-font-display)',
          fontWeight: 700,
        }}
      >
        {value}
      </p>
      <p className="mt-1.5 text-[11px]" style={{ color: 'var(--vg-text-dim)' }}>
        {sub}
      </p>
    </div>
  );
}

function SurchargeRow({
  label,
  value,
  positive,
}: {
  label: string;
  value: string;
  positive?: boolean;
}) {
  return (
    <tr style={{ borderBottom: '1px solid var(--vg-border)' }}>
      <td
        colSpan={3}
        className="py-4 text-sm"
        style={{ color: 'var(--vg-text-muted)' }}
      >
        {label}
      </td>
      <td
        className="py-4 text-right text-sm"
        style={{
          color: positive ? 'var(--vg-ok)' : 'var(--vg-text-muted)',
          fontFamily: 'var(--vg-font-mono)',
        }}
      >
        {value}
      </td>
    </tr>
  );
}
