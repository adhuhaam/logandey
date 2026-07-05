# Lo Gandey

### The smart mirror, made for the Maldives.

**Lo Gandey** transforms a two-way mirror into a private command centre — live weather, time, news, and calendar built for Malé, the atolls, and every island in between.

No foreign defaults. No cloud lock-in. No monthly subscriptions.

**Always on. Always local. Always yours.**

---

## The problem with other smart mirrors

Most smart mirror software ships configured for London, New York, or Berlin. Wrong timezone. Wrong holidays. Wrong news. Hours of setup — and it still feels foreign.

**Lo Gandey is different.** Every unit leaves our hands ready for the Maldives:

| | **Lo Gandey** | Generic software |
|---|---------------|------------------|
| Timezone | Indian/Maldives (UTC+5) | US / Europe |
| Weather | Your island, your coordinates | Random foreign city |
| Calendar | Maldives public holidays | US / UK feeds |
| News | Local Maldivian headlines | International wire |
| Units | Metric | Often imperial |
| Support | Direct from the team | Forum threads |

---

## Who it's for

### Home
Wake up to Malé weather, the correct time, and today's headlines — without unlocking your phone.

### Hotels & resorts
Greet guests in the lobby or villa with island conditions, resort events, and branded welcome screens.

### Offices & reception
A polished, always-current display for visitors, staff schedules, and company announcements.

### Retail & showrooms
A futuristic fixture that draws eyes and keeps your space feeling premium and current.

---

## What's included

Every Lo Gandey system comes ready to run:

- **Clock & date** — Maldives timezone, clean 24-hour display
- **Live weather** — Current conditions and multi-day forecast for your exact location
- **Calendar** — Maldives public holidays plus your custom events
- **News ticker** — Rolling local headlines across the bottom of the mirror
- **Modular layout** — Widgets placed exactly where you want them
- **Silent 24/7 operation** — Fullscreen, borderless, built for always-on use
- **Low power** — Runs on Raspberry Pi 4 or 5 behind the glass

**Want more?** Resort branding, prayer times, room service menus, occupancy dashboards, guest Wi‑Fi info — we build custom modules to order.

---

## How a Lo Gandey mirror works

```
   ┌────────────────┐      ┌─────────────────┐      ┌──────────────────┐
   │  Two-way       │      │  Raspberry Pi   │      │  Lo Gandey       │
   │  mirror glass  │ ───▶ │  4 or 5         │ ───▶ │  display engine  │
   │  + monitor     │      │  (on-board)     │      │  (local software)│
   └────────────────┘      └─────────────────┘      └──────────────────┘
```

1. A compact computer sits hidden behind the mirror.
2. Lo Gandey starts automatically on power-up — no login, no browser tabs.
3. Weather, news, and calendar refresh over your Wi‑Fi connection.

We supply the software. We can supply the full mirror too.

---

## Built to stay on

Lo Gandey is designed for mirrors that run for months without attention:

- Starts automatically when power returns
- Recovers gracefully from network interruptions
- Lightweight enough for Pi 4 with 4 GB RAM
- Each unit independently configured — different island, different layout, different brand
- Updates applied locally — no dependency on external app stores or third-party accounts

---

## Packages

### Home Mirror
Ready-to-hang smart mirror for apartments and villas. Standard layout, Maldives defaults, one island location.

### Business Mirror
Custom branding, multi-module layouts, and priority setup for hotels, offices, and retail.

### Software License
For integrators and builders who supply their own frame and hardware. Full Lo Gandey engine, your enclosure.

### Custom
Multi-screen setups, resort-wide deployments, bespoke modules. Tell us what you need — we design it.

---

## Technical setup

For installers and technical customers deploying Lo Gandey on a Raspberry Pi:

**You need:** Node.js 22+, Raspberry Pi OS 64-bit (desktop), Raspberry Pi 4 or 5

Copy the Lo Gandey software folder to your device, then:

```bash
cd logandey
node --run install-mm
cp config/config.js.sample config/config.js
```

**Preview in a browser (testing):**

```bash
npm run server
```

Open `http://localhost:8080`

**Production on Raspberry Pi:**

```bash
node --run start:x11
```

Edit `config/config.js` for your island coordinates, modules, and layout. Run `npm run config:check` to validate.

---

## Get in touch

Ready for a mirror in your home, hotel, or office? We handle design, software, and installation across the Maldives.

**Email:** adhuhamlayaal55@gmail.com

Tell us your space, your island, and what you want on the mirror — we'll reply with options and pricing.

---

## About Lo Gandey

**Lo Gandey** — smart mirror technology rooted in the Maldives.

Designed here. Configured here. Supported here.

© 2026 Lo Gandey. All rights reserved.
