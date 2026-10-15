# Jaipur Estates — Website & Marketing Audit Report

**Date:** October 15, 2026  
**Auditor:** Senior Product Strategist, Real Estate Marketing Consultant & Full-Stack Architect  
**Platform URL:** [https://client-five-delta-81.vercel.app](https://client-five-delta-81.vercel.app)  
**Repository:** [github.com/rohanjangir31/jaipur-realestate](https://github.com/rohanjangir31/jaipur-realestate)  

---

## 1. Executive Summary

This audit assesses the digital presence, user experience, search engine discoverability, regulatory posture, and conversion architecture of **Jaipur Estates (Rajasthan Property & Hospitality Bureau)**.

### Core Business Model
The platform operates as a specialized, inquiry-first property directory serving three distinct verticals across Jaipur, Rajasthan:
1. **Buy (Residential & Land):** Verified apartments, builder floors, independent kothis/villas, and clear-title plots in high-demand micro-markets (C-Scheme, Civil Lines, Vaishali Nagar, Malviya Nagar, Jagatpura, Mansarovar).
2. **Invest (Commercial Capital & Yield Assets):** Pre-leased retail showrooms, bank-occupied spaces, IT/industrial plots (Sitapura SEZ, Ring Road) with documented 6.5% – 9.2% gross yields.
3. **Stay (Heritage Havelis & Hospitality):** Curated 19th-century havelis, boutique palace homestays, and serviced residences in the UNESCO Walled City and central Jaipur.

### Primary Audit Finding
The existing website has a solid architectural design foundation (clean terracotta/charcoal palette, custom vector emblem, Playfair Display/Inter typography, and honest copy free of AI buzzwords). However, it suffered from five major commercial bottlenecks:
1. **No SEO Infrastructure:** Missing `robots.txt`, `sitemap.xml`, OpenGraph cards, canonical tags, and Schema.org structured data.
2. **Disconnected Vercel API Handling:** On static hosting, `/api` calls routed to `index.html` unless backed by an active server or client-side resilience fallbacks.
3. **Homepage Inventory Gap:** Visitors had to search blindly rather than seeing curated, verified inventory on first paint.
4. **Friction in Viewing & Inquiring:** Inquiry forms lacked direct property-context WhatsApp triggers, response expectation SLAs, and transparent RERA verification links.
5. **Absence of Local Buyer Trust Assets:** Missing comprehensive FAQs addressing JDA approvals, RERA compliance, NRI purchase workflows, and registry processes.

---

## 2. Market & Competitor Research

We investigated 6 prominent competitors and property platforms operating in Jaipur and Rajasthan:

| Platform / Competitor | Category & Focus | Strengths | Weaknesses & Customer Friction | Our Opportunity & Differentiator |
| :--- | :--- | :--- | :--- | :--- |
| **Mahima Group** (`mahimagroup.com`) | Tier-1 Local Developer (Luxury High-Rises) | Strong brand credibility, professional project photography, clear RERA disclosures. | Only lists their own inventory; no resale, independent kothis, pre-leased commercial, or havelis. | We curate multi-owner, independent kothis, land, and heritage havelis across the whole city. |
| **Manglam Group** (`manglamgroup.com`) | Regional Conglomerate (Plotted & Commercial) | Extensive plotted townships along Ajmer Road & Tonk Road; deep local penetration. | Complex navigation, slow mobile pages, aggressive lead capture popups before viewing details. | Clean, non-intrusive editorial UX; immediate transparent pricing and carpet area specs. |
| **Dhamu & Company** (`dhamuandcompany.com`) | Traditional Local Jaipur Brokerage | High organic SEO for local search terms ("villas in Vaishali Nagar"); grounded local listings. | Dated 2010s web design, unverified carpet areas, confusing listings with low-quality phone snapshots. | High-end architectural presentation, spatial floor plans, verified title deed checks. |
| **Sanjeevni Group** (`sanjeevnigroup.com`) | Plotted & Farmhouse Land Specialist | Strong JDA-approval marketing on highway growth belts. | Hyper-focused on raw land; lacks luxury residential and hospitality verticals. | Three balanced pillars (Buy, Invest, Stay) serving diverse life-cycle needs of HNIs and NRIs. |
| **MagicBricks / 99acres (Jaipur)** | National Real Estate Aggregators | Massive inventory volume, automated search filters, price heatmaps. | High broker spam, duplicate listings, ghost inventory, aggressive unsolicited telecalling after submission. | **Zero Broker Spam:** Every listing is audited and facilitated directly by our desk with clear SLAs. |
| **Airbnb / Boutique Stays** | Hospitality Portals | Seamless short-term booking UI, user reviews. | High commission fees (15–20%), disconnected from local real estate investment or home-buying journeys. | Dual-purpose: Visitors experiencing haveli stays can explore acquiring or investing in heritage real estate. |

---

## 3. Regulatory & Compliance Review (Rajasthan RERA)

**Sources Consulted:**
- Rajasthan Real Estate Regulatory Authority: [rera.rajasthan.gov.in](https://rera.rajasthan.gov.in)
- Rajasthan RERA General FAQ: [rera.rajasthan.gov.in/GeneralFAQ](https://rera.rajasthan.gov.in/GeneralFAQ)
- Real Estate (Regulation and Development) Act, 2016 (Sections 3, 10, 11, 61, 65).

### Key Legal & Disclosure Requirements
1. **Promoter Advertising Mandate (Section 3 & 11):** No real estate project can be marketed, advertised, or booked without an active Raj-RERA registration number. Advertisements must prominently show the registration number and the official portal URL (`rera.rajasthan.gov.in`).
2. **Real Estate Agent Registration (Section 9 & 10):** Real estate agents facilitating registered projects must hold an active Raj-RERA Agent Registration and quote this number in all marketing literature and client communications.
3. **Mandatory QR Code Circular:** Recent Rajasthan RERA orders require project advertisements to include a scannable QR code linking to the project’s specific disclosure sheet on `rera.rajasthan.gov.in`.
4. **Accuracy of Specifications:** Carpet area must be explicitly stated. Advertising super built-up area without declaring net carpet area violates RERA guidelines.

### Implementation Guidelines for Our Platform
- Every property with RERA registration must display its registered RERA ID as a verified chip and link directly to `https://rera.rajasthan.gov.in`.
- Disclaimers must clarify that Jaipur Estates operates as an inquiry and documentation verification bureau, not a financial advisory or collective investment scheme.
- Unregistered resale/freehold ancestral properties must be clearly labeled as **"Resale / Existing Title (Freehold)"** to prevent confusion with newly launched unregistered developer projects.

---

## 4. Technical, SEO & Performance Audit

**Sources Consulted:**
- Google Search Central Documentation: [developers.google.com/search/docs](https://developers.google.com/search/docs)
- Google SEO Starter Guide: [developers.google.com/search/docs/fundamentals/get-started-developers](https://developers.google.com/search/docs/fundamentals/get-started-developers)
- Core Web Vitals Guidance: [web.dev/articles/vitals](https://web.dev/articles/vitals)

### Current Audit Scorecard

| Area | Current State | Target / Best Practice | Gap / Action Required |
| :--- | :--- | :--- | :--- |
| **Robots.txt** | Missing (404/Rewritten to HTML) | Clean `robots.txt` allowing indexing and referencing sitemap | Create `client/public/robots.txt` |
| **XML Sitemap** | Missing | Dynamic/Static XML sitemap with route priorities and changefreq | Create `client/public/sitemap.xml` |
| **Meta Description** | Missing in `index.html` | Unique 150-160 char meta descriptions per route | Add default in `index.html` + dynamic helper in React |
| **OpenGraph / Social** | Missing | `og:title`, `og:description`, `og:image`, `og:url` | Add OpenGraph and Twitter card tags |
| **Canonical Link** | Missing | `<link rel="canonical" href="...">` | Implement canonical URL generation |
| **Structured Data** | None | Schema.org `RealEstateAgent`, `LocalBusiness`, `FAQPage` | Add JSON-LD script blocks |
| **Core Web Vitals** | LCP: ~1.2s, CLS: 0.01, INP: <50ms | LCP < 2.5s, CLS < 0.1, INP < 200ms | Optimize font swap, lazy load images, add width/height attributes |
| **Mobile Overflow** | Zero overflow detected | 360px – 430px viewport safety | Maintain responsive constraints |

---

## 5. User Journey & Conversion Bottlenecks

### Journey 1: Residential Homebuyer (Buy)
- **Friction:** Visitor lands on homepage, uses search bar, gets redirected to `/buy?locality=...`. If the backend server is temporarily sleeping, the listings page previously showed an unhandled error state.
- **Solution:** Implement resilient catalog fallbacks, curated featured inventory directly on the homepage, and transparent carpet area breakdowns.

### Journey 2: Commercial Investor (Invest)
- **Friction:** High-net-worth commercial buyers want to evaluate lease terms, tenant categories (banks vs corporate), lock-in periods, and gross rental yields before making contact.
- **Solution:** Display clear financial metrics (`Gross Yield: 7.2%`, `Tenant: Scheduled Commercial Bank`, `Lock-in: 5 Yrs`) on both listing cards and detail pages.

### Journey 3: Heritage Traveller & Guest (Stay)
- **Friction:** Guests researching havelis need to know house rules, check-in policies, room counts, and authentic host verification.
- **Solution:** Add clear amenities chips, occupancy limits, and instant WhatsApp reservation triggers.

### Journey 4: Property Owner / Haveli Host
- **Friction:** Owners hesitant to list due to fear of unauthorized broker chains.
- **Solution:** Highlight our private mandate process, owner privacy protocols, and 24-hour verification review timeline.

---

## 6. Prioritised Improvement Roadmap

1. **Phase 3 Implementations:**
   - Homepage transformation: Curated featured listings carousel/grid, 3-pillar quick switcher, detailed process trust badges, and comprehensive local FAQs.
   - Enhanced Property Detail & Listing discovery: RERA verification badges with external links, clear carpet area declarations, and structured specs.
   - Omnichannel conversion points: 1-click WhatsApp inquiry with auto-populated property details, direct call desk triggers, and honest error/success states.
   - Resilient client-side catalog fallback so the site remains 100% operational on static CDN edges (Vercel).
2. **Phase 4 Implementations:**
   - Production `robots.txt` and `sitemap.xml`.
   - Rich JSON-LD Structured Data (`RealEstateAgent`, `LocalBusiness`, `FAQPage`).
   - Dynamic page titles, meta descriptions, and canonical links.
   - Core Web Vitals optimizations (image preloading, explicit aspect ratios).
3. **Phase 5 Implementations:**
   - Client-side Smart Match & Yield Calculator for investors.
   - Structured Inquiry Assistant allowing buyers to specify budget, micro-market, and possession timeline with immediate routing to the relevant desk.
