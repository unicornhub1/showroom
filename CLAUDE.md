# Showroom — Unicorn Factory Template-Showcase

## Projektübersicht

Showroom ist eine Web-App der Agentur **Unicorn Factory**, in der Kunden interaktive Website-Templates anschauen und durchklicken können. Ein Admin-Backend verwaltet Share-Links mit Ablaufdatum, über die Kunden zeitlich begrenzt Zugriff auf Templates erhalten.

## Tech-Stack

- **Framework**: Next.js 16.1.6 (App Router, Turbopack)
- **React**: 19.2.3
- **CSS**: Tailwind CSS v4 mit `@import "tailwindcss"` Syntax
- **Datenbank**: SQLite via better-sqlite3 (für Share-Links + Admin-Auth)
- **Auth**: JWT via jose, bcryptjs für Passwort-Hashing
- **Icons**: lucide-react
- **Sprache**: Alle Templates auf **Deutsch** (UTF-8, keine Unicode-Escapes!)

## Architektur

```
app/
├── layout.tsx                    # Root-Layout (Geist Sans/Mono Fonts)
├── globals.css                   # Tailwind + Showroom-Shell-Styles
├── (showroom)/                   # Öffentliche Showroom-Shell
│   ├── layout.tsx                # Shell-Layout (Navigation, Dark Mode)
│   └── page.tsx                  # Template-Galerie mit Filtern
├── admin/                        # Admin-Backend (JWT-geschützt)
│   ├── layout.tsx
│   └── page.tsx                  # Share-Link Verwaltung
├── api/
│   ├── auth/login/route.ts       # POST Login → JWT Cookie
│   ├── auth/logout/route.ts      # POST Logout
│   └── shares/route.ts           # CRUD für Share-Links
├── s/[token]/                    # Share-Link Redirect
│   └── route.ts
├── templates/
│   ├── layout.tsx                # Templates-Wrapper
│   ├── page.tsx                  # Template-Übersicht
│   └── fashion/elegance/         # ← Erstes Template (siehe unten)
└── not-found.tsx

lib/
├── auth.ts                       # JWT-Helpers, Middleware
├── db.ts                         # SQLite-Setup, Share-Link CRUD
└── templates.ts                  # Template-Registry (TEMPLATES Array)

middleware.ts                     # Auth + Share-Link Zugangsschutz
```

## Admin-Zugang

- **URL**: `/admin`
- **Login**: `admin` / `unicorn2024`

## Template-System

### Registrierung

Jedes Template wird in `lib/templates.ts` im `TEMPLATES` Array registriert:

```ts
{
  slug: 'fashion/elegance',      // URL-Pfad unter /templates/
  name: 'Elegance',
  branch: 'fashion',             // Branche (fashion, beauty, sport, gastro)
  type: 'shop',                  // Typ (shop, website, landing, feature)
  description: '...',
  thumbnail: '/templates/fashion/elegance/thumb.jpg',
  pages: ['/', '/collections', '/products', ...],
}
```

### Dateistruktur eines Templates

```
app/templates/{branch}/{name}/
├── layout.tsx                    # Template-Layout (Fonts, Provider, Navbar, Footer)
├── page.tsx                      # Homepage
├── _design/                      # Design-System (NICHT als Route sichtbar)
│   ├── tokens.css                # CSS Custom Properties (Farben, Font-Referenzen)
│   ├── data.ts                   # Mock-Daten (Produkte, Kollektionen, Helpers)
│   └── components/               # Shared Components
│       ├── Navbar.tsx            # Navigation + Cart-Drawer
│       ├── Footer.tsx
│       ├── CartProvider.tsx      # Cart-Context + Toast-Benachrichtigungen
│       ├── ProductCard.tsx
│       ├── SectionHeading.tsx
│       └── HeroBanner.tsx
├── products/
│   ├── page.tsx                  # Produktliste mit Filtern + Sortierung
│   └── [slug]/page.tsx           # Produktdetail
├── collections/page.tsx
├── lookbook/page.tsx
├── sale/page.tsx
├── about/page.tsx
├── cart/page.tsx
└── size-guide/page.tsx
```

## Neues Template anlegen — Checkliste

### 1. Verzeichnis erstellen

```
app/templates/{branch}/{name}/
```

### 2. Design-System aufsetzen (`_design/`)

**tokens.css** — CSS Custom Properties definieren:
```css
:root {
  --prefix-navy: #041E3C;
  --prefix-cream: #FAF9F6;
  /* ... alle Farbtokens */
}
```

**WICHTIG zu Fonts**: Font-Variablen von `next/font/google` werden per `className` auf ein DOM-Element gesetzt. Die CSS-Variablen (z.B. `--font-playfair-display`) existieren NICHT auf `:root`-Ebene. Deshalb:

- In `tokens.css` NUR Farben auf `:root` definieren
- Font-Tokens (`--el-font-serif`, `--el-font-sans`) als **inline styles** auf dem Layout-`<div>` setzen, wo die Font-Klassen vorhanden sind:

```tsx
// layout.tsx
<div
  className={`${serifFont.variable} ${sansFont.variable}`}
  style={{
    '--prefix-font-serif': 'var(--font-serif-name), Georgia, serif',
    '--prefix-font-sans': 'var(--font-sans-name), "Helvetica Neue", sans-serif',
  } as React.CSSProperties}
>
```

**data.ts** — Mock-Daten:
- Produkte, Kollektionen, Farben, Größen
- `formatPrice()` Funktion mit `Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" })`
- Kategorien in Englisch (für interne Keys), UI-Labels in Deutsch

### 3. Layout erstellen (`layout.tsx`)

- Fonts über `next/font/google` importieren
- Font-Variablen als inline styles setzen (siehe oben)
- `CartProvider` wrappen
- `Navbar` + `Footer` einbinden
- `tokens.css` importieren

### 4. Komponenten bauen (`_design/components/`)

- **Navbar**: Immer feste Hintergrundfarbe (cream/weiß), nicht transparent — sonst Sichtbarkeitsprobleme auf Seiten ohne Hero
- **CartProvider**: localStorage-Persistenz, Toast-Benachrichtigungen
- **Cart-Drawer**: Als Teil der Navbar, slide-out Sidebar

### 5. Seiten erstellen

- Alle UI-Texte auf **Deutsch** (UTF-8, KEINE `\u00e4` Escapes!)
- Preise immer über `formatPrice()` (EUR)
- `useSearchParams()` erfordert `<Suspense>` Boundary (Next.js 16)
- Seiten mit fixem Header brauchen `pt-32` als Top-Padding

### 6. Template registrieren

In `lib/templates.ts` zum `TEMPLATES` Array hinzufügen.

## Bekannte Fallstricke & Lessons Learned

### Fonts greifen nicht
Font-CSS-Variablen von `next/font` existieren nur auf dem Element mit der Font-Klasse. Definiere `--el-font-serif` / `--el-font-sans` als inline styles auf dem Layout-div, NICHT in `:root` von tokens.css.

### Cursor: pointer fehlt auf Buttons
Tailwind v4 entfernt `cursor: pointer` von Buttons. Fix in `tokens.css`:
```css
button, [role="button"], select, summary {
  cursor: pointer;
}
```

### Unicode-Escapes statt Umlaute
NIEMALS `\u00e4`, `\u00f6` etc. verwenden. Immer echte UTF-8 Zeichen: ä, ö, ü, ß, É. Dateien müssen UTF-8 kodiert sein.

### Navbar transparent = Probleme
Transparente Navbar funktioniert nur auf Seiten mit Hero-Gradient. Auf Produktseiten etc. ist der Text unsichtbar. Lösung: Navbar immer mit fester Hintergrundfarbe (wie Ralph Lauren).

### useSearchParams() Build-Fehler
Next.js 16 erfordert eine `<Suspense>` Boundary um Komponenten die `useSearchParams()` nutzen:
```tsx
function PageContent() { /* useSearchParams() hier */ }
export default function Page() {
  return <Suspense><PageContent /></Suspense>
}
```

### Preise in EUR
Nie `$` hardcoden. Immer `formatPrice()` aus `data.ts` verwenden.

## Bilder & Pexels API

### Pexels API Key

```
SRL0H8ySKwXh8dWE0wgkkYwgk7ccwPQUh2sCHuqwMQzYj5chcvCRMIZF
```

### Bilder-Workflow

Bilder werden über die Pexels API (`api.pexels.com/v1/search`) heruntergeladen und optimiert gespeichert:

```bash
# Suchen
curl -s -H "Authorization: $API_KEY" \
  "https://api.pexels.com/v1/search?query=luxury+fashion&per_page=3&orientation=portrait"

# Optimiert herunterladen (Pexels-Parameter für Kompression + Resize)
curl -s -o "output.jpg" \
  "https://images.pexels.com/photos/ID/pexels-photo-ID.jpeg?auto=compress&cs=tinysrgb&w=800&h=1067&fit=crop"
```

### Optimierungs-Richtlinien

- **Produktbilder**: `w=800&h=1067` (3:4 Portrait), ~60-150 KB
- **Hero/Banner**: `w=1600&h=1000` (Landscape), ~80-200 KB
- **Collection Cards**: `w=1000&h=650` (Landscape), ~50-140 KB
- **Lookbook**: `w=800-900`, verschiedene Aspect Ratios
- Immer `?auto=compress&cs=tinysrgb` für automatische Kompression
- Next.js `<Image>` Komponente für zusätzliche Optimierung (WebP, lazy loading, responsive sizes)
- `priority` Attribut nur für Above-the-fold Bilder (Hero, erstes Produktbild)
- `sizes` Attribut korrekt setzen für responsive Breakpoints

### Bild-Verzeichnis

```
public/templates/{branch}/{name}/images/
├── products/           # Produktbilder (3:4 Portrait)
├── hero/               # Hero-Banner (Landscape)
├── collections/        # Collection-Cards (Landscape)
├── editorial/          # Editorial/Split-Sections
└── lookbook/           # Lookbook-Seite
```

### Daten-Integration

Jedes Produkt und jede Collection hat ein `image` Feld in `data.ts`:
```ts
{
  id: "heritage-wool-blazer",
  gradient: "linear-gradient(...)",  // Fallback wenn Bild fehlt
  image: "/templates/fashion/elegance/images/products/heritage-wool-blazer.jpg",
}
```

Komponenten zeigen das Bild mit Gradient-Fallback:
```tsx
<div style={{ background: product.gradient }}>
  {product.image && <Image src={product.image} alt={product.name} fill className="object-cover" />}
</div>
```

### Pexels Lizenz

Alle Bilder von Pexels sind **kostenlos für kommerzielle Nutzung**. Attribution ist nicht erforderlich, aber empfohlen. Bilder dürfen nicht als eigenständige Dateien weiterverkauft werden.

## Aktuelle Templates

### Fashion/Elegance
- **Stil**: Ralph Lauren inspiriert, luxuriöser Mode-Shop
- **Fonts**: Playfair Display (Serif) + Raleway (Sans)
- **Farben**: Navy #041E3C, Cream #FAF9F6, Gold #B8A070
- **Prefix**: `--el-*`
- **Features**: Cart-Drawer, QuickView-Modal, Wishlist, Produktfilter, Lookbook, Sale

### Fashion/Streetwear (KRSN)
- **Stil**: Brutalistisch, Neon-Streetwear/Sneaker-Shop
- **Fonts**: Bebas Neue (Heading) + DM Sans (Body) + JetBrains Mono (Labels)
- **Farben**: Schwarz #0A0A0A, Neon #CDFF00, Warmweiß #F5F5F0
- **Prefix**: `--kr-*`
- **Features**: Cart-Drawer, QuickView, Wishlist, Sneaker-Größenrechner, Glitch-Effekte

### Fashion/Jewelry (AURUM)
- **Stil**: Feiner Luxus-Schmuck-Boutique, warmes Gold
- **Fonts**: Cormorant Garamond (Serif/italic) + Outfit (Sans)
- **Farben**: Schwarz #1A1A1A, Gold #C9A96E, Warmweiß #FAFAF8
- **Prefix**: `--au-*`
- **Features**: Cart-Drawer, QuickView, Wishlist, Ringgrößen-Finder, Hairline-Borders

## Wichtige Regeln für deutschen Text

**KRITISCH**: Alle Templates sind auf Deutsch. Folgende Regeln MÜSSEN eingehalten werden:

1. **Echte UTF-8 Umlaute verwenden**: ä, ö, ü, Ä, Ö, Ü, ß, É — NIEMALS Unicode-Escapes (`\u00e4`, `{'\u00F6'}`) oder ASCII-Ersetzungen (`ue`, `oe`, `ae`, `ss`)
2. **Häufige Wörter richtig schreiben**: Größe (nicht Groesse), Über (nicht Uber), für (nicht fuer), Rückgabe (nicht Rueckgabe), stöbern (nicht stoebern), verfügbar (nicht verfuegbar)
3. **JSX-Strings direkt**: `<p>Größe</p>` statt `<p>Gr{'\u00F6'}{'\u00DF'}e</p>`
