# Circle8 Website — Complete Build
## File Structure
```
circle8/
├── index.html                          ← Homepage
├── round-table.html                    ← Round Table page
├── css/style.css                       ← All styles
├── js/main.js                          ← Nav, share buttons, forms
├── images/                             ← Drop all images here
│   ├── hero-bg.jpg                     ← Homepage hero (construction cranes)
│   ├── paulette-portrait.jpg           ← About section portrait (blue background)
│   ├── og-home.jpg                     ← Social share preview (homepage)
│   ├── og-gds.jpg                      ← Social share preview (design series)
│   ├── og-roundtable.jpg               ← Social share preview (round table)
│   ├── turkey-hero.jpg                 ← Turkey country card (aerial Istanbul)
│   ├── turkey-editions-hero.jpg        ← Turkey page hero (minaret)
│   ├── greece-hero.jpg                 ← Greece country card (Santorini windmill)
│   ├── lebanon-hero.jpg                ← Lebanon country card (coastal aerial)
│   ├── galataport-card.jpg             ← Edition 01 card thumbnail (Paulette selfie, port)
│   ├── galataport-hero.jpg             ← Galataport article hero
│   ├── galataport-sculpture.jpg        ← White KAWS sculpture / Istanbul Modern forecourt
│   ├── galataport-retail.jpg           ← Retail precinct (travertine paving, brown buildings)
│   ├── galataport-bosphorus.jpg        ← Bosphorus promenade + mosque behind
│   ├── galataport-waterfront.jpg       ← Istanbul waterfront / Bosphorus view with seagulls
│   ├── galataport-paulette-sculpture.jpg ← Paulette selfie with red circular sculpture
│   ├── galataport-promenade-art.jpg    ← Red disc sculpture, promenade, cruise ship
│   ├── galataport-post-office.jpg      ← Karaköy post office / white heritage building
│   ├── istanbul-skyline.jpg            ← Istanbul skyline building / waterfront shot
│   ├── hagia-sophia-card.jpg           ← Edition 02 card thumbnail (Paulette in red)
│   ├── hagia-sophia-hero.jpg           ← Hagia Sophia exterior (palm trees, dome, blue sky)
│   ├── hagia-sophia-doors.jpg          ← Bronze entrance doors (dark, ornate)
│   ├── hagia-sophia-nave.jpg           ← Full sweep of the nave (panoramic interior)
│   ├── hagia-sophia-dome-interior.jpg  ← Looking through marble columns to dome
│   ├── hagia-sophia-gold-mosaic.jpg    ← Gold mosaic ceiling close-up
│   ├── hagia-sophia-mosaic-christ.jpg  ← Byzantine Christ mosaic (gold background)
│   ├── hagia-sophia-deesis-mosaic.jpg  ← Deesis mosaic (three figures)
│   ├── hagia-sophia-mosaic-faded.jpg   ← Faded colourful mosaic corner detail
│   ├── hagia-sophia-narthex.jpg        ← Inner narthex corridor (mosaic vaults)
│   ├── hagia-sophia-surroundings.jpg   ← Surrounding domed buildings / exterior crowd
│   ├── hagia-sophia-paulette.jpg       ← Paulette in red inside Hagia Sophia
│   └── testimonials/                   ← One photo per person (square crop, face visible)
│       ├── angela-sampson.jpg          ← Hassell Architecture
│       ├── sumedh-maddison.jpg         ← Plus Architecture
│       ├── lynette-apostolou.jpg       ← Jackson Teece
│       ├── george-abagi.jpg            ← Alspec
│       ├── michael-viskovich.jpg       ← Greenfields
│       ├── brenton-bailey.jpg          ← Verosol
│       ├── peter-cutajar.jpg           ← Stamford Capital
│       ├── charlie-rizk.jpg            ← Sitecorp
│       ├── barney-oros.jpg             ← LFD Developments
│       ├── rod-loni-fox.jpg            ← 1st City Real Estate
│       ├── poppi-kavaratzis.jpg        ← Kav Kreative
│       └── adrian-ramsay.jpg           ← AR Design Home
└── design-series/
    ├── index.html                      ← GDS hub
    └── turkey/
        ├── index.html                  ← Turkey editions
        ├── galataport.html             ← Edition 01
        └── hagia-sophia.html           ← Edition 02
```

## Image Guidelines
- Testimonials: square crop, at least 200×200px, face clearly visible
- Hero images: landscape, at least 1600px wide, high quality
- Article images: at least 1000px wide
- OG images: 1200×630px for best social previews
- The site works perfectly without images — placeholders are in place

## Social Media Setup
Each article has LinkedIn share, Instagram copy-link, and copy-link buttons built in.

**For LinkedIn Newsletter:**
Go to linkedin.com/company → Newsletter → Create
Title: "Circle8 Global Design Series"
Paste article content directly — it performs very well as native LinkedIn content.

**For Instagram:**
Each article's pull quotes are ready-made Instagram captions.
Share the article link in bio, use the caption as the post text.

**For Industry Press:**
- The Urban Developer: submit via theurbandeveoper.com/contributors
- Architecture & Design: submit via architectureanddesign.com.au
- Property Observer: property-focused pieces

## Connecting to Your GoDaddy Domain

### Your email and domain STAY at GoDaddy. Only the website moves.

### Option A — Netlify (Recommended, Free)
1. Go to netlify.com → Sign up free (use Google)
2. Drag the entire circle8 folder to the Netlify dashboard
3. Netlify gives you a URL like amazing-name-123.netlify.app
4. Go to Site Settings → Domain Management → Add custom domain → circle8.co
5. Netlify shows you two nameservers (e.g. dns1.p01.nsone.net)
6. In GoDaddy → My Products → DNS → Nameservers → Change to Custom
7. Enter the Netlify nameservers → Save
8. Wait 24-48 hours → circle8.co now shows your new site
9. Your email (paulette@circle8.co) is completely unaffected

### Option B — GoDaddy Hosting (if you already pay for hosting)
1. GoDaddy → My Products → Web Hosting → Manage → File Manager
2. Navigate to public_html → Delete existing files
3. Upload all circle8 files maintaining the folder structure
4. Your domain already points here — site goes live immediately

## Contact Details on Site
- Email: paulette@circle8.co
- Phone: 0404 004 477
- Location: Waterloo, Sydney
- Website: www.circle8.co
- Copyright: © 2025 Circle8

## Pages Built
1. index.html — Homepage (Hero, About, Strategic Collaboration, Round Table teaser, GDS teaser, Subscribe, 12 Testimonials, Social links, Contact)
2. round-table.html — Round Table (Philosophy, Rules of 8, Three formats, Why it works, Register interest form)
3. design-series/index.html — GDS hub (Three country cards)
4. design-series/turkey/index.html — Turkey editions (4 slots, 2 published)
5. design-series/turkey/galataport.html — Edition 01 (Full article + share buttons + Round Table prompt)
6. design-series/turkey/hagia-sophia.html — Edition 02 (Full article + share buttons + Round Table prompt)
