# Marketing Baseline Audit & Conversion-Rate Optimisation (CRO) Assessment
**Platform:** Jaipur Estates  
**Live URL:** [https://client-five-delta-81.vercel.app](https://client-five-delta-81.vercel.app)  
**Date of Assessment:** October 16, 2026  
**Auditor:** Senior Digital Marketing Strategist & Conversion-Rate Optimisation Specialist  
**Document Status:** Diagnostic Baseline & Pre-Marketing Readiness Report  

---

## Executive Summary

Before investing financial resources into paid traffic (Google Search Ads, Meta Ads, social media marketing, or SEO link-building campaigns), a business must ensure that its digital property is technically equipped to **capture, track, and convert qualified leads**. Marketing an unoptimised funnel produces high bounce rates, wasted ad spend, and untracked pipeline attribution.

This diagnostic audit evaluates **Jaipur Estates** against real-world conversion benchmarks, regulatory standards in Rajasthan real estate, and the competitive landscape in Jaipur.

### Summary of Diagnostic Verdict:
* **Brand & Visual Aesthetics:** **High / Ready** (Luxury editorial design, cohesive palette of Obsidian, Sandstone, and Terracotta, clean mobile-responsive layout).
* **Funnel & Conversion Architecture:** **Incomplete / Not Ready for Paid Ads** (Web inquiry forms fail silently into browser `localStorage` on static Vercel hosting; business owners receive zero push notification unless the user clicks direct WhatsApp or Phone links).
* **Tracking & Attribution Infrastructure:** **Zero / Critical Failure** (No Google Analytics 4, no Google Tag Manager, no Meta Pixel, no click-event listeners on `tel:` or `wa.me` links, and no UTM query parameter preservation).
* **Marketing Readiness Recommendation:** **Do NOT launch paid media yet.** Implement the three critical technical and conversion prerequisites identified in Section 10 first.

---

## 1. Actual Business Model & Supported Services

To avoid marketing fictitious capabilities, we examined the codebase (`client/src/data/verifiedCatalog.js`, `client/src/services/api.js`, `client/src/pages/Home.jsx`, and `client/src/components/layout/Navbar.jsx`) to document strictly what exists vs. what is an unsupported assumption.

### Supported Services (What the Platform Actually Delivers):
1. **Curated Showcase of Jaipur Properties (Inquiry-Based Discovery):**
   * **Buy & Sell Catalog:** A curated dataset of 5 approved residential properties (apartments in Vaishali Nagar, duplex villas in Jagatpura, luxury penthouses on Tonk Road, commercial office plates in C-Scheme, and plots).
   * **Rent & Lease Catalog:** A curated dataset of 4 commercial/pre-leased assets (office suites on Tonk Road, pre-leased bank branches, high-street retail showrooms, and industrial warehousing near Sitapura SEZ).
   * **Airbnb & Stays Catalog:** A curated dataset of 4 boutique short-term rental listings (heritage havelis in the Walled City, luxury private pool villas, and serviced boutique flats).
2. **Direct Contact Coordination:**
   * 3 dedicated calling lines (`+91 77372 13615`, `+91 96642 47662`, `+91 63763 12638`).
   * Deep-linked WhatsApp messaging with pre-populated property title and reference ID.
   * Defined operating schedule: All 7 days (Monday–Sunday, 9:00 AM – 6:00 PM IST).
3. **Property Estimation & Calculators:**
   * An interactive EMI / investment yield calculation module on the homepage.
   * Estimated price benchmark display (`Est. ₹`) across all listings.
4. **User Authentication & Listing Submission Workflow:**
   * Standard registration/login JWT framework and an on-site property submission form (`/buy/submit` and `/stay/host/submit`).

### Unsupported Assumptions (What Does NOT Exist and Must NOT Be Marketed):
* ❌ **Automated Booking & Payments:** There is no payment gateway (Razorpay/Stripe/Cashfree) integrated. It is not an instant-booking OTA like MakeMyTrip or Airbnb. Stays can only be inquired about.
* ❌ **Real-Time Calendar Availability:** The stay dates do not sync via iCal or API with Airbnb, Booking.com, or VRBO.
* ❌ **Government Bureau / Formal Regulatory Identity:** The platform is an independent advisory and property showcase; it is not a government body or statutory authority.
* ❌ **Guaranteed Investment Returns:** Figures like 7.8% yield are historical estimates and must never be advertised as assured financial returns under SEBI/RERA marketing regulations.

---

## 2. Customer Segmentation & Initial Target Recommendation

### Evaluated Customer Segments

| Segment | Profile | Primary Motivations | Lead Quality | Acquisition Cost (Est.) |
| :--- | :--- | :--- | :--- | :--- |
| **Segment A: High-Intent Jaipur Homebuyers** | Affluent families, doctors, business owners, and senior corporate executives looking for 3–4 BHK apartments & villas in Vaishali Nagar, Jagatpura, and C-Scheme (Budget: ₹85 Lakh – ₹3.5 Crore). | Title security, spacious carpet area, ready-to-move status, transparent pricing without broker harassment. | **Very High** | Moderate (Targeted Google Search & Meta local campaigns) |
| **Segment B: Commercial Retail & Office Tenants** | Local retail franchises, banking branches, corporate regional offices looking for pre-leased spaces or bare-shell leases on Tonk Road, MI Road, or Sitapura. | Footfall, lease covenants, lock-in periods, immediate cash-flow yields (6.5% – 8.5%). | **High** | High (LinkedIn, B2B Outbound, Commercial Search Ads) |
| **Segment C: Out-of-City & NRI Heritage Investors** | Non-resident Rajasthanis (NRIs in Gulf/USA/UK) and metro investors (Delhi-NCR, Mumbai) seeking havelis or holiday villas for capital appreciation + Airbnb yield. | Pride of ownership, turnkey property management, legal due diligence from afar. | **High Ticket / Low Volume** | High (Requires high trust, video tours, NRI concierge proof) |
| **Segment D: Weekend Tourists & Staycationers** | Travelers from Delhi/Gurugram/NCR looking for weekend stays in Jaipur havelis or pool villas. | Instant confirmation, Instagrammable aesthetics, transparent per-night pricing. | **Low Margin** (High support overhead per transaction) | Low-to-Moderate (Competes against Airbnb/MakeMyTrip ad budgets) |
| **Segment E: Property Owners Seeking Listing Representation** | Jaipur landlords and developers wanting to sell inventory or hand over homes for Airbnb management. | Fast liquidation, verified buyers, minimal operational hassle. | **Strategic (Supply-side)** | Moderate (Local referral and seller-focused campaigns) |

### Recommended Initial Target Segment: **Segment A (High-Intent Local Jaipur Homebuyers)**

#### Strategic Rationale:
1. **Highest Near-Term Conversion Probability:** Buying a primary residence in established neighborhoods (Vaishali Nagar, Jagatpura, Mansarovar) is an active, ongoing demand in Jaipur with high search intent.
2. **Catalog Alignment:** The existing catalog's strongest inventory is its residential offerings (e.g., 3 BHK Amrapali Circle flat at ₹85L, 4 BHK Jagatpura Duplex Villa at ₹1.45Cr).
3. **Fewer Technical Dependencies:** Residential inquiries do not require complex instant calendar availability or lease covenant documents; they require an immediate telephone/WhatsApp conversation followed by an accompanied site visit.
4. **Unit Economics:** A single closed transaction generates high advisory revenue compared to managing short-term room bookings.

#### Evidence Still Needed Before Scaling:
* Baseline Cost-Per-Click (CPC) on local keywords (e.g., `"villas for sale in jagatpura jaipur"`, `"flats in vaishali nagar jaipur"`).
* Call-to-visit conversion rate: What percentage of callers agree to an accompanied site visit?
* Local competitor commission tolerance: Are buyers receptive to the advisory model vs. traditional local *dalals*?

---

## 3. Primary Customer Conversion Goal

To maximize Conversion-Rate Optimisation (CRO), every page must point toward a **single primary macro-conversion**, supported by secondary micro-conversions.

* **Primary Macro-Conversion Action:**  
  **"Schedule an Accompanied Site Visit via Direct WhatsApp or Telephone Call."**  
  *Why:* Real estate in India is never purchased online through a form submit or cart checkout. A customer becomes a qualified pipeline lead only when direct verbal or text contact is established and an on-ground property inspection date is agreed upon.
* **Secondary Micro-Conversions:**
  1. *Direct WhatsApp Listing Inquiry* (Clicking "Inquire on WhatsApp" with pre-filled property reference).
  2. *Download Marketing Overview Brief / Poster* (`/poster`).
  3. *Saved Listing / Loan Eligibility Check* (Using the on-site calculator).

---

## 4. Homepage Evaluation

We evaluated the current Homepage against the four foundational CRO questions:

### 1. Does it explain WHAT the business offers?
* **Status:** **PASS** (Clear & Explicit)
* **Evidence:** The hero headline *"Jaipur's Premier Property Advisory"* and the subtitle *"Direct owner connections, estimated market pricing, and turnkey Airbnb hospitality across Vaishali Nagar, C-Scheme, Jagatpura & prime Jaipur hubs"* immediately orient the visitor. The three vertical cards ("Buy & Sell", "Rent & Lease", "Airbnb & Stays") cleanly demarcate offerings.

### 2. Does it explain WHOM it serves?
* **Status:** **PARTIAL / NEEDS REFINEMENT**
* **Evidence:** The page addresses buyers, corporate tenants, and travelers simultaneously. While all three are valid pillars, displaying tourist accommodations next to ₹2.8 Crore pre-leased commercial assets slightly dilutes the premium advisory positioning for serious high-ticket property buyers.
* **Recommendation:** Group the audience callouts into distinct tabs or persona switches (e.g., "For Homebuyers" | "For Commercial Investors" | "For Property Owners").

### 3. Does it explain WHY customers should trust it?
* **Status:** **PARTIAL / TRUST DEFICIT DETECTED**
* **Positive Trust Elements:**
  * Displays "Est. ₹" market benchmarks, showing transparency.
  * Direct calling lines without anonymous call centers.
  * Clear operational schedule: Open All 7 Days, 9 AM – 6 PM.
  * Explicit Information & Advisory Notice at the bottom.
* **Critical Missing Trust Elements:**
  * ⚠️ **No Social Proof / Testimonials:** Zero client reviews, video testimonials, or case studies from past buyers/tenants in Jaipur.
  * ⚠️ **No Leadership / Advisory Profiles:** The site does not show the founders, senior advisors, or physical team faces. High-ticket real estate in Rajasthan relies heavily on personal reputation and established relationships.
  * ⚠️ **No Physical Office Address Verification:** The site states "Civil Lines & C-Scheme, Jaipur 302001", but lacks an exact office building name, suite number, or embedded Google Map pin.

### 4. Does it tell customers WHAT TO DO NEXT?
* **Status:** **PASS**
* **Evidence:** The search bar, category cards, and "Featured Verified Showcase" provide immediate pathways to view inventory. The bottom contact section offers clear "Call Now" and "WhatsApp" triggers.

---

## 5. Technical & User Journey Testing

We audited the functional execution across all key interactive flows:

### Navigation & Routing
* **Top Navigation:** Sticky desktop header with active routes (`/`, `/buy`, `/invest`, `/stay`). Clean logo, phone popover, and login CTA.
* **Mobile Drawer:** Accessible via hamburger menu. Tapping links navigates correctly.
* **Scroll-To-Top (Recently Fixed):** A global `ScrollToTop` listener now forces route changes to reset scroll position to `(0, 0)`, eliminating the previous bug where clicking footer links left users at the bottom.

### Inquiry Forms & Lead Routing (CRITICAL RISK IDENTIFIED)
* **Form Location:** Right sidebar on `PropertyDetail.jsx`, `InvestmentDetail.jsx`, and `StayDetail.jsx`.
* **Testing Result:**  
  * In the local/production environment on Vercel, the backend server (`server/src/server.js`) is **not deployed as serverless functions**. All `/api/inquiries` network requests hit `vercel.json` rewrite (`/(.*) -> /index.html`), returning an HTML response.
  * The frontend code in `api.js` catches this error and saves the lead to **`localStorage.getItem('jaipur_pending_inquiries')`** on the user's browser.
  * The user is shown: *"Inquiry Logged with Jaipur Advisory: An advisor will reach out within 24 business hours."*
  * **Consequence:** Unless an admin physically opens that exact user's browser, **the business owner receives zero notification of this lead**.
  * **Remedy Required:** Until the backend API and email/WhatsApp webhook dispatch are fully operational, the primary submission CTA must either trigger a direct WhatsApp chat or submit to a reliable serverless form endpoint (e.g., Formspree, Web3Forms, or direct Twilio/WhatsApp API).

### Direct Calling & WhatsApp Links
* **Testing Result:** **PASS (100% Functional)**
  * `tel:+917737213615` triggers device dialers cleanly.
  * `https://wa.me/917737213615?text=...` opens WhatsApp on desktop and mobile with pre-populated property title, price, and inquiry intent.

### Mobile Experience & Performance
* **Visual Viewport:** Tested with responsive breakpoints (375px, 414px, 768px, 1024px). Elements use Tailwind responsive classes (`sm:`, `md:`, `lg:`).
* **Typography:** `clamp()` styling and responsive text sizes (`text-3xl sm:text-5xl`) prevent horizontal overflow.
* **Floating Contact Bar:** `QuickContact.jsx` sits at `bottom-6 right-6`, providing quick access to phone lines and WhatsApp on mobile devices.

---

## 6. Competitor Landscape Analysis (Jaipur Micro-Market)

To establish benchmark standards, we researched five real estate consultancies and hospitality management firms operating in Jaipur.

*Note: All observations are derived from public web data; strategic deductions are labeled as analytical assessments.*

```
+----------------------------------------------------------------------------------------------------+
| 1. DHAMU & COMPANY                                                                                 |
| URL: https://dhamuandcompany.com                                                                   |
| Category: Established Local Jaipur Brokerage & Consultancy (Vaishali Nagar, C-Scheme, Mansarovar)  |
+----------------------------------------------------------------------------------------------------+
• Positioning: "Trusted Real Estate Consultants in Jaipur since 2005" - focused on residential resale,
  builder floors, and commercial plots.
• Customer Journey: Search listings by locality -> View detailed property specs -> Contact Form or Call.
• Call to Action (CTA): Prominent "Call Now", "WhatsApp Agent", and "Request Site Visit" buttons.
• Strengths & Differentiation: Deep organic SEO ranking for local search queries (e.g. "villas in
  Vaishali Nagar"); strong physical presence and local recognition.
• Weaknesses / Gaps: Cluttered interface, low-resolution phone photography, lacks transparent estimated
  benchmarks, zero Airbnb integration.
• Lesson for Jaipur Estates: Capture high-intent local organic search traffic by building dedicated
  locality-specific landing pages (e.g. `/buy/vaishali-nagar`, `/buy/jagatpura`).
```

```
+----------------------------------------------------------------------------------------------------+
| 2. JPAM (Jaipur Property Advisors & Management)                                                    |
| URL: https://jpam.in                                                                               |
| Category: Corporate Due Diligence & Luxury Asset Consultancy                                       |
+----------------------------------------------------------------------------------------------------+
• Positioning: End-to-end luxury property advisory, legal documentation, title deed verification,
  and long-term asset management.
• Customer Journey: Advisory consultation booking -> Bespoke property matching -> Legal vetting.
• Call to Action (CTA): "Book Confidential Consultation", "Speak with an Advisor".
• Strengths & Differentiation: Focuses heavily on legal safety, clear JDA titles, and preventing buyer
  litigation. Strong appeal to HNIs and NRI investors.
• Weaknesses / Gaps: Gated inventory; users cannot quickly browse pricing without submitting personal
  contact information first.
• Lesson for Jaipur Estates: Maintain transparent open browsing while adopting JPAM's high-trust
  language regarding legal title verification and accompanied due diligence.
```

```
+----------------------------------------------------------------------------------------------------+
| 3. REALTOR MOHIT MAHESHWARI                                                                        |
| URL: https://realtormohitmaheshwari.com                                                            |
| Category: Independent Buyer-Side Real Estate Consultant                                            |
+----------------------------------------------------------------------------------------------------+
• Positioning: Unbiased property consulting representing the buyer/investor rather than the builder;
  data-driven ROI forecasting.
• Customer Journey: Client intake questionnaire -> Data analysis of micro-market -> Curated shortlist.
• Call to Action (CTA): "Schedule 1-on-1 Advisory Call", "Download Jaipur Property Guide".
• Strengths & Differentiation: Personal branding, high credibility, transparency, no pushy broker tactics.
• Weaknesses / Gaps: Single-person bottleneck; lacks multi-coordinator calling desks or hospitality vertical.
• Lesson for Jaipur Estates: Infuse the site with personal advisory tone rather than sounding like an
  anonymous corporate portal.
```

```
+----------------------------------------------------------------------------------------------------+
| 4. PALM LEISURE STAYS                                                                              |
| URL: https://palmleisure.com                                                                       |
| Category: Dedicated Airbnb & Luxury Homestay Management (Jaipur)                                   |
+----------------------------------------------------------------------------------------------------+
• Positioning: Complete turnkey short-term rental management for property owners (dynamic pricing,
  guest vetting, 24/7 housekeeping, revenue optimization).
• Customer Journey: "List Your Villa" calculation calculator -> Revenue projection -> Consultation.
• Call to Action (CTA): "Estimate Your Property's Rental Income", "Onboard Your Home".
• Strengths & Differentiation: Strong visual appeal, hospitality-grade photography, clear value proposition
  for villa owners looking for passive income.
• Weaknesses / Gaps: Completely isolated from traditional real estate sales (cannot help an investor
  buy a property and then run it).
• Lesson for Jaipur Estates: This validates our unique "Buy to Airbnb" thesis: We help investors buy
  turnkey havelis/villas AND facilitate the management advisory.
```

```
+----------------------------------------------------------------------------------------------------+
| 5. AKIRA HOMES                                                                                     |
| URL: https://akirahomes.com                                                                        |
| Category: Curated Serviced Residences & Heritage Stays                                             |
+----------------------------------------------------------------------------------------------------+
• Positioning: Boutique luxury serviced stays catering to tourists, destination wedding groups, and expats.
• Customer Journey: Browse curated apartments/villas -> Check availability -> Book or WhatsApp Concierge.
• Call to Action (CTA): "Chat with Concierge on WhatsApp", "Instant Booking Inquiry".
• Strengths & Differentiation: Editorial photography, lifestyle branding, strong Instagram presence.
• Weaknesses / Gaps: Focuses purely on hospitality; no property sales or commercial lease brokerage.
• Lesson for Jaipur Estates: Ensure our "Stay" vertical has professional hospitality photography and
  direct concierge WhatsApp routing.
```

---

## 7. Ten High-Impact Conversion & Trust Improvements

Based on the audit, here are the 10 most critical improvements to achieve marketing readiness:

1. **Fix Lead Routing from Static Forms to Instant WhatsApp / Webhook:**  
   Replace the offline `localStorage` fallback with an active webhook (e.g. Formspree/Telegram/WhatsApp Business API) so every form submission instantly alerts the sales team on their phones.
2. **Implement Google Analytics 4 & Meta Conversion Tracking:**  
   Install GA4 via Google Tag Manager. Add custom click-event listeners to every `tel:` and `wa.me` click to record lead attribution across ad sources.
3. **Add Real Social Proof & Trust Badges:**  
   Introduce a "Client Reviews & Advisory Transactions" section featuring real testimonials, transaction amounts (anonymized if needed), and past buyer experiences.
4. **Publish Advisor Profiles & Physical Office Presence:**  
   Display photos and bios of the senior advisory team and provide an exact physical address in Civil Lines / C-Scheme with an interactive Google Maps card.
5. **Clean Up Lingering Commission Mentions on Detail Pages:**  
   Remove the `"1% Listing Commission"` green pill tags still present in `PropertyDetail.jsx`, `InvestmentDetail.jsx`, and `StayDetail.jsx` to maintain 100% consistency with the brand's no-commission promise.
6. **Fix Meta Tag Schema & Regulatory Consistency in `index.html`:**  
   Update `index.html` meta tags to remove contradictory legacy terms (`"Rajasthan Property & Hospitality Bureau"`, unverified RERA claims) and align Schema.org opening hours with "9:00 AM – 6:00 PM, All 7 Days".
7. **Create Dedicated Hyper-Local Landing Pages for SEO & Ads:**  
   Build dedicated routes for top search terms: `/buy/vaishali-nagar`, `/buy/jagatpura`, and `/invest/tonk-road` to increase Google Quality Score and lower Ad CPCs.
8. **Add an "Accompanied Site Visit" Booking Step:**  
   Add a calendar selector and "Request Guided Inspection" CTA on property detail pages, making the next physical step obvious and friction-free.
9. **Separate Tourist Inquiries from High-Ticket Investor Inquiries:**  
   Create clear homepage entry points separating retail travelers seeking weekend stays from investors looking to buy or lease commercial and residential assets.
10. **Implement WhatsApp Chatbot / Instant Auto-Responder:**  
    Configure the WhatsApp business numbers with instant automated greetings, catalog cards, and coordinator handoffs so off-hours inquiries receive responses within 60 seconds.

---

## 8. Analytics & Conversion Tracking Audit

### Current Setup Status: **NON-EXISTENT (FAIL)**

We inspected `client/index.html`, `client/package.json`, and all client-side code for analytics tags.

| Tool / Requirement | Current Codebase Status | Impact on Marketing |
| :--- | :--- | :--- |
| **Google Tag Manager (GTM)** | ❌ Not Installed | Cannot deploy or modify tracking tags without code deployments. |
| **Google Analytics 4 (GA4)** | ❌ Not Installed | Cannot measure traffic volume, bounce rate, session duration, or user journeys. |
| **Meta Pixel (Facebook/Instagram)** | ❌ Not Installed | Running Meta Ads will result in zero algorithm optimization for leads or retargeting. |
| **Call Click Tracking (`tel:`)** | ❌ No Event Listeners | Inbound calls generated by ads will show as 0 conversions in ad dashboards. |
| **WhatsApp Click Tracking (`wa.me`)** | ❌ No Event Listeners | WhatsApp leads (the primary conversion path) cannot be attributed to specific campaigns. |
| **UTM Parameter Preservation** | ❌ Not Stored in State/Session | If a user lands from `?utm_source=google&utm_campaign=jaipur_villas`, UTMs are lost when they navigate between pages. |

> **Strategic Directive:** Running paid marketing campaigns before installing GTM, GA4, and click-conversion tags will waste advertising budget, because neither the marketing specialist nor the ad algorithms (Google Smart Bidding / Meta Advantage+) can determine which keywords or ads generated phone calls.

---

## 9. Prioritized Action Matrix

The 10 recommendations are ranked below by business impact, technical implementation effort, and immediate urgency:

| Rank | Improvement | Business Impact | Implementation Effort | Urgency Level |
| :---: | :--- | :---: | :---: | :---: |
| **1** | **Fix Form Lead Routing (Connect to active Webhook/Email/WhatsApp)** | **Critical (Prevents 100% lead leakage)** | Low (2–3 hours) | **P0 (Immediate)** |
| **2** | **Install GTM, GA4 & WhatsApp/Phone Click Event Listeners** | **Critical (Required for any ad spend)** | Low–Medium (3–4 hours) | **P0 (Immediate)** |
| **3** | **Remove Lingering "1% Commission" badges in Detail Pages** | **High (Brand integrity & trust)** | Low (30 minutes) | **P0 (Immediate)** |
| **4** | **Clean Up `index.html` Meta Tags & Schema.org discrepancies** | **Medium–High (SEO & Regulatory compliance)** | Low (1 hour) | **P1 (Pre-Marketing)** |
| **5** | **Add Physical Office Location & Advisory Team Bios** | **High (Essential for HNI local trust)** | Medium (1 day) | **P1 (Pre-Marketing)** |
| **6** | **Add Real Customer Testimonials & Verified Deal Case Studies** | **High (Conversion rate multiplier)** | Medium (1–2 days) | **P1 (Pre-Marketing)** |
| **7** | **Preserve UTM Parameters Across Routes into Inquiries** | **High (Ad campaign ROI attribution)** | Low (2 hours) | **P1 (Pre-Marketing)** |
| **8** | **Set Up Automated WhatsApp Business Lead Greeting** | **High (Response time < 1 min)** | Low (2 hours) | **P2 (Scale)** |
| **9** | **Build Dedicated Locality Landing Pages for Ads (`/buy/vaishali-nagar`)** | **High (Lowers Google Ads CPC)** | Medium (2–3 days) | **P2 (Scale)** |
| **10** | **Add Interactive "Schedule Site Visit" Date/Time Picker** | **Medium (Improves inspection commitments)** | Medium (1 day) | **P2 (Scale)** |

---

## 10. The Three Most Important Actions to Take First

To ensure our marketing spend produces real, measurable revenue, execute these three actions prior to launching any public campaign:

### 1. Fix Lead Routing: Eliminate the Silent `localStorage` Lead Leak
* **Why it matters:** Currently, when a high-value prospect fills out an on-site inquiry form on the live Vercel site, the lead is stored solely in that prospect's individual browser `localStorage`. No email, SMS, or notification is sent to the Jaipur Estates team. Launching marketing today would burn capital on leads that will never be contacted.
* **Immediate Fix:** Connect the form submit handler to an active serverless endpoint (e.g., Formspree, Resend API, or Web3Forms) that immediately sends an email and SMS/WhatsApp alert with the prospect's name, phone, and property title to the sales desk.

### 2. Implement Analytics & Conversion Tracking (GA4 + GTM + WhatsApp Event Listeners)
* **Why it matters:** Over 85% of real estate inquiries in India happen via WhatsApp or direct phone calls. Without tracking click-events on `tel:+91...` and `wa.me/...`, your Google and Meta Ads will report 0 conversions, causing automated ad bidding algorithms to misfire and leaving you unable to know which marketing channels produce paying clients.
* **Immediate Fix:** Install Google Tag Manager in `index.html`. Configure custom GA4 events for `click_phone_number` and `click_whatsapp_inquiry`. Pass UTM parameters through to inquiry submissions.

### 3. Eliminate Detail-Page Inconsistencies & Add Grounded Trust Assets (Team + Office + Testimonials)
* **Why it matters:** Real estate transactions in Jaipur involve significant financial commitments (₹85 Lakh to ₹3+ Crore). Buyers will not commit to property viewings through an anonymous digital storefront. Furthermore, lingering `"1% Listing Commission"` badges on detail pages contradict the homepage and poster branding.
* **Immediate Fix:** Strip the remaining commission tags from `PropertyDetail.jsx`, `InvestmentDetail.jsx`, and `StayDetail.jsx`. Add a genuine "Meet Our Advisory Team" block and the exact physical office location in Civil Lines / C-Scheme to anchor the digital presence in the physical world.

---
*Report prepared and archived under `docs/marketing-baseline-audit.md`.*
