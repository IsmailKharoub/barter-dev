# BARTER DEV — Revised v2

## Key Changes

1. **No equity** — Removed from trade options
2. **Anonymous Portfolio** — Show what you built, not who for. 12 years of work demonstrated through animated product walkthroughs, no names/logos
3. **Portfolio comes last** — Credibility section after they already understand the offer
4. **Headless API question** — Let's address this

---

## On the Headless API

**Options:**

| Approach | Pros | Cons |
|----------|------|------|
| **Strapi** | You already like it, quick setup, handles forms/content | Another service to maintain |
| **Payload CMS** | TypeScript native, can double as app framework | Heavier |
| **Build it yourself** | Full control, minimal, exactly what you need | Time investment |
| **No backend** | Form submits to Notion/Airtable/Google Sheets via Zapier or direct API | Zero maintenance, "good enough" |
| **Formspree / Basin** | Hosted form endpoints, dead simple | Less control, small cost |

**My take:** 

For a site like this, you don't need a full CMS. The content is mostly static. The only dynamic piece is the application form.

**Recommendation:**
- **Form submissions:** Direct to Notion database (free, API is solid) or Airtable
- **Or:** Build a minimal API route in Next.js that writes to a database (Turso/SQLite, Supabase, or even a JSON file for now)
- **Skip the CMS** unless you plan to blog or update content frequently

If you want to dogfood your own stack for credibility, build a minimal Hono + Drizzle + Turso API. Fast, cheap, shows you practice what you preach.

---

## Revised Site Structure

```
1. Hero
2. How It Works (animated explainer)
3. Products I Build (animated demos)
4. What I Accept (trade types)
5. Apply (productized form)
6. What I've Built (anonymous portfolio — comes last)
7. Footer
```

---

## Section 1: Hero

**3D Element:** Two abstract shapes orbiting each other — symbolizing exchange/trade

**Headline:**
> # Dev Work.
> # No Cash Required.

**Subhead:**
> 12 years building products. Now I trade skills for skills. You bring value, I bring code.

**CTA:** `[See How It Works ↓]`

---

## Section 2: How It Works (Animated Explainer)

**This is the centerpiece animation section.**

User scrolls through a visual journey — each step animates in sequence, not just fades. Think of it like a mini-movie.

---

### Animation Sequence:

**Frame 1 — The Problem**
> *Animation: A price tag appears ($15,000), then cracks and shatters*
> 
> "Dev agencies charge $10k-50k. You've got a great idea but no budget."

**Frame 2 — The Alternative**
> *Animation: The shattered price tag pieces reassemble into different icons (camera, legal scale, handshake, box)*
> 
> "But you have value. Skills. Services. Products. Access."

**Frame 3 — You Apply**
> *Animation: A form/card slides in, fills itself out with example text*
> 
> "You tell me what you need built and what you can offer. Takes 5 minutes."

**Frame 4 — I Evaluate**
> *Animation: Two scales appear, balancing — dev work on one side, trade offer on the other. They balance.*
> 
> "I scope the project. You scope your trade. We find equilibrium."

**Frame 5 — We Agree**
> *Animation: A contract/document unfolds, checkmarks appear*
> 
> "Everything in writing. Milestones for both sides. No surprises."

**Frame 6 — We Deliver**
> *Animation: Split screen — left side shows code/website building, right side shows the trade being delivered (photos, products, etc). Both complete simultaneously.*
> 
> "I build. You deliver. Fair and done."

**End Frame — CTA**
> *Animation: The two orbiting shapes from hero return, now connected*
> 
> `[Apply Now]`

---

## Section 3: Products I Build (Animated Showcases)

**Headline:**
> # What I Build

**No screenshots. Each product is demonstrated through animation.**

---

### Product 1: Marketing Sites

**Animation:** 
A blank browser window appears. As user scrolls, the site literally builds itself in real-time — navigation draws in, hero text types out, images fade in, sections stack. The final result is a polished landing page.

**Text overlay (appears as animation plays):**
> Landing pages and business sites that convert. Fast, responsive, scroll-animated. 
> 
> **Typical trade value:** $3,000 - $8,000

---

### Product 2: Web Applications

**Animation:**
A login screen appears → user "logs in" → dashboard assembles piece by piece (sidebar slides in, cards populate with data, charts animate, notifications ping in)

**Text overlay:**
> Custom dashboards, booking systems, internal tools. Your logic, built to spec.
> 
> **Typical trade value:** $8,000 - $20,000

---

### Product 3: E-Commerce Stores

**Animation:**
Product cards fall into a grid like Tetris → a cart icon pulses → checkout flow animates through (shipping → payment → confirmation with confetti)

**Text overlay:**
> Full storefronts powered by Medusa. Inventory, payments, shipping — handled.
> 
> **Typical trade value:** $10,000 - $25,000

---

### Product 4: CMS & Content Platforms

**Animation:**
A Strapi-style admin panel opens → content blocks drag and drop into place → preview window shows the content appearing live on a website

**Text overlay:**
> Content systems you can actually use. No dev needed after handoff.
> 
> **Typical trade value:** $4,000 - $12,000

---

## Section 4: What I Accept

**Headline:**
> # What I'll Trade For

**Grid with icons — animated on scroll (stagger in):**

```
[Design & Creative]        [Professional Services]      [Physical Goods]
 - Graphic design           - Legal consultation         - Furniture/decor
 - Photography/video        - Accounting                 - Electronics
 - Copywriting              - Marketing/PR               - Equipment
 - Brand identity           - Business coaching          - Product inventory

[Access & Opportunity]     [Skilled Labor]              [Hybrid]
 - Warm intros              - Carpentry/trades           - Partial cash + trade
 - Speaking/events          - Property work              - Retainer arrangements
 - Collaboration            - Catering/food              - Creative proposals
```

**Note:**
> No equity deals. I trade for tangible value I can use now.

---

## Section 5: Apply (Productized Application)

**Headline:**
> # Apply for a Trade

**Subhead:**
> This isn't a contact form. It's an application. Be specific — vague requests get ignored.

---

**Form Structure (Multi-step, animated transitions):**

### Step 1: What You Need
```
What are you building? (select one)
[Marketing Site] [Web App] [E-Commerce] [CMS/Content] [Other]

Describe the project in 2-3 sentences:
[textarea]

Ideal launch timeline:
[< 1 month] [1-3 months] [3-6 months] [Flexible]
```

### Step 2: What You're Offering
```
Primary trade type: (select one)
[Services] [Physical Goods] [Hybrid (Cash + Trade)] [Other]

Describe your offer specifically:
[textarea]
(Example: "50 hours of photography including editing" or "Custom furniture for home office")

Estimated market value of your offer:
[$ input]
```

### Step 3: About You
```
Your name:
[input]

Email:
[input]

Website or portfolio (optional):
[input]

Anything else I should know?
[textarea]
```

### Step 4: Confirmation
```
Review your application:
[Summary of inputs]

[ ] I understand this is not a guarantee — trades are accepted selectively.
[ ] I'm prepared to scope and negotiate in good faith.

[Submit Application →]
```

---

**After submit:**
> *Animation: The two orbiting shapes merge momentarily, then separate*
> 
> "Got it. I'll review within 48 hours. If there's a fit, we'll scope it out."

---

## Section 6: What I've Built (Anonymous Portfolio)

**Headline:**
> # 12 Years of Building

**Subhead:**
> I don't name names. But I show the work.

---

### Format: Animated Product Walkthroughs

Each project is a **mini animated demo** — no company names, no logos, no case study text. Just the product in motion, with a brief descriptor.

---

**Project 1**

*Animation: A fintech dashboard loads — accounts populate, transactions stream in, charts animate, user clicks through tabs*

**Label:**
> Banking Platform — Consumer Fintech
> 
> *Role: Technical Lead*

---

**Project 2**

*Animation: A logistics tracking interface — map with moving dots (shipments), sidebar with status updates, delivery confirmations pinging*

**Label:**
> Real-Time Logistics Tracker — Supply Chain
> 
> *Role: VP Engineering*

---

**Project 3**

*Animation: A healthcare portal — patient selects appointment, provider calendar updates, confirmation email preview slides in*

**Label:**
> Patient Scheduling System — Healthcare
> 
> *Role: Founding Engineer*

---

**Project 4**

*Animation: An e-commerce admin — inventory grid, drag-and-drop reordering, bulk edit modal, export to CSV*

**Label:**
> Inventory Management System — Retail
> 
> *Role: CTO*

---

**Project 5**

*Animation: A content platform — editor types, preview updates live, publish button triggers distribution animation (social icons, email, RSS)*

**Label:**
> Publishing Platform — Media
> 
> *Role: Head of Product*

---

**Project 6**

*Animation: A B2B SaaS dashboard — team members grid, permission toggles, usage graphs, billing section*

**Label:**
> Team Management SaaS — Enterprise
> 
> *Role: Technical Co-founder*

---

**End of section — simple line:**
> 47 products shipped. 12 years. Now I trade.

---

## Section 7: Footer CTA

**3D Element:** Shapes return, now pulsing gently

**Headline:**
> # Ready?

**Two buttons:**
```
[Apply Now]     [See How It Works ↑]
```

---

## Footer
```
BARTER DEV © 2026

[X] [GitHub] [LinkedIn]

No agencies. No invoices. Just fair trades.
```

---

# Tech Stack

## Frontend

| Tool | Purpose |
|------|---------|
| Next.js (App Router) | Framework |
| TypeScript | Language |
| Tailwind CSS | Styling |
| React Three Fiber + Drei | 3D elements |
| GSAP + @bsmnt/scrollytelling | Scroll animations |
| Framer Motion | UI transitions (form steps, reveals) |
| Lenis | Smooth scroll |

## Animation Mapping

| Section | Animation Approach |
|---------|-------------------|
| Hero | R3F floating shapes, mouse parallax |
| How It Works | Scroll-linked GSAP + @bsmnt/scrollytelling |
| Products | Scroll-triggered GSAP sequences |
| Portfolio | Lottie animations or optimized video/WebM |
| Form | Framer Motion step transitions |
| Throughout | Lenis smooth scroll, stagger reveals |

## Backend

No backend for now. Form handling TBD (Notion API, Formspree, or Next.js API route).

---

## Summary

| Section | Purpose |
|---------|---------|
| Hero | Hook — dev work without cash |
| How It Works | Animated explainer — the process |
| Products | What I build — animated demos of deliverables |
| What I Accept | Trade types — no equity |
| Apply | Productized application form |
| What I've Built | Anonymous portfolio — animated walkthroughs, no names |
| Footer | Close it out |

---

Ready to build.
