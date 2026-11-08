# Northline Air Care — page-to-route map

Prototype: `Northline Air Care.dc.html` (hash routes `#/...`). Production: Next.js App Router paths below.

| Page | Prototype | Next.js route | Template / notes |
|---|---|---|---|
| Home | #/ | / | Hero + quick form, services grid, sticky "Where we work" story, sticky "How it works", packages teaser, why us, recent work gallery, signs, FAQ, closing CTA |
| Services hub | #/services | /services | Banner, 8-card grid, 3 helper cards, closing CTA |
| Split System Cleaning | #/services/split-system-cleaning | /services/split-system-cleaning | Service detail template |
| Ducted System Cleaning | #/services/ducted-system-cleaning | /services/ducted-system-cleaning | Service detail template |
| Cassette Unit Cleaning | #/services/cassette-cleaning | /services/cassette-cleaning | Service detail template |
| Under-Ceiling Unit Cleaning | #/services/under-ceiling-cleaning | /services/under-ceiling-cleaning | Service detail template |
| Bulkhead System Cleaning | #/services/bulkhead-cleaning | /services/bulkhead-cleaning | Service detail template |
| Window Unit Cleaning | #/services/window-unit-cleaning | /services/window-unit-cleaning | Service detail template |
| Portable AC Cleaning | #/services/portable-ac-cleaning | /services/portable-ac-cleaning | Service detail template |
| Outdoor Condenser Cleaning | #/services/outdoor-condenser-cleaning | /services/outdoor-condenser-cleaning | Service detail template |
| Residential | #/residential | /residential | Sector template (residential data) |
| Commercial | #/commercial | /commercial | Sector template (commercial data) |
| About | #/about | /about | Banner, who we are, how we work, team placeholder |
| FAQ | #/faq | /faq | Tabbed accordion: Services / Pricing / Booking / Aftercare |
| Contact | #/contact | /contact | Info cards, enquiry form (validated), booking FAQs |
| Request a Booking | #/book | /book | 3-step form (validated), side panel; no closing CTA |
| Booking confirmation | #/thank-you | /book/thank-you | Summary; shown only after real delivery in production |
| Privacy Policy | #/privacy | /privacy | Legal template |
| Terms | #/terms | /terms | Legal template |

Service detail template sections: hero (H1, summary, CTAs, photo) → overview + scope → packages (quote only) → process (5 steps) → safety note → FAQs → related services → closing CTA.

Removed from scope by client: installation, repair, service areas.

Prototype limitations: form submissions are simulated (no email/CRM); tel: links depend on device; browser back/forward works via hash history.
