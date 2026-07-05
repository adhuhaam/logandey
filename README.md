# Lo Gandey

### Smart mirrors, built for the Maldives.

**Lo Gandey** turns an ordinary mirror into a living display — time, weather, news, and calendar at a glance. Designed for Maldivian homes, resorts, offices, and retail spaces.

Always on. Always local. Always yours.

---

## Why Lo Gandey?

Most smart mirror software is built for Europe or North America — wrong time zones, wrong holidays, wrong news. **Lo Gandey is configured for the Maldives from day one.**

| | Lo Gandey | Generic alternatives |
|---|-----------|---------------------|
| **Timezone** | Indian/Maldives (UTC+5) | US / Europe defaults |
| **Weather** | Malé & island coordinates | Foreign cities |
| **Calendar** | Maldives public holidays | US / UK holiday feeds |
| **News** | Local Maldivian headlines | International wire services |
| **Units** | Metric | Often imperial |

No tinkering required. Plug in, power on, and your mirror speaks your language.

---

## Perfect for

**Homes** — Start the day with local weather, time, and headlines without reaching for your phone.

**Hotels & resorts** — Welcome guests with branded information, events, and island conditions in the lobby or suite.

**Offices & co-working** — Keep teams aligned with shared calendars, news, and a polished reception display.

**Retail & showrooms** — Combine product messaging with live info in a sleek, futuristic fixture customers remember.

---

## What you get

Every Lo Gandey mirror ships with a ready-to-run experience:

- **Live clock & date** — Maldives timezone, 24-hour format
- **Weather** — Current conditions and multi-day forecast for your location
- **Calendar** — Maldives public holidays and custom event feeds
- **News ticker** — Rolling local headlines
- **Compliments & alerts** — A mirror that feels alive, not static
- **Modular layout** — Widgets positioned exactly where you want them
- **Silent operation** — Runs fullscreen, borderless, 24/7 on low-power hardware

Need something extra? Calendar sync, resort branding, prayer times, room service menus, occupancy stats — **Lo Gandey is fully customizable.**

---

## How it works

```
  ┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
  │  Display +  │ ──▶ │  Raspberry   │ ──▶ │    Lo Gandey    │
  │ two-way     │     │  Pi 4 / 5    │     │    software     │
  │ mirror glass│     │  (built-in)  │     │  (this repo)    │
  └─────────────┘     └──────────────┘     └─────────────────┘
```

1. **Hardware** — A Raspberry Pi 4 or 5 sits behind the mirror, connected to your display.
2. **Software** — Lo Gandey runs on boot, fullscreen, with no browser or login required.
3. **Content** — Weather, news, and calendar update automatically over Wi‑Fi.

We handle the software. You — or we — handle the frame, glass, and install.

---

## Built for reliability

Lo Gandey is engineered for mirrors that stay on for months without babysitting:

- Auto-starts on power-up
- Recovers from network drops
- Lightweight — runs smoothly on Raspberry Pi 4 (4 GB RAM recommended)
- Configurable per unit — each mirror can have its own location, branding, and modules
- Remote-friendly — update config and redeploy without opening the frame

---

## Get started (self-install)

For technicians, developers, and early adopters who want to run Lo Gandey themselves:

**Requirements:** Node.js 22+, Raspberry Pi OS 64-bit (desktop), Raspberry Pi 4 or 5

```bash
git clone https://github.com/adhuhaam/logandey.git
cd logandey
node --run install-mm
cp config/config.js.sample config/config.js
```

**Run in browser (testing):**

```bash
npm run server
```

Open [http://localhost:8080](http://localhost:8080)

**Run on Raspberry Pi (production):**

```bash
node --run start:x11
```

Edit `config/config.js` to set your island, modules, and layout. Validate anytime with `npm run config:check`.

---

## Order a mirror

Lo Gandey is available as:

- **Turnkey smart mirrors** — Frame, glass, Pi, and software, ready to hang
- **Software-only licenses** — For builders and integrators who supply their own hardware
- **Custom deployments** — Resort branding, multi-screen setups, and bespoke modules

**Interested?** Reach out to discuss your space, timeline, and budget.

- GitHub: [github.com/adhuhaam](https://github.com/adhuhaam)
- Repository: [github.com/adhuhaam/logandey](https://github.com/adhuhaam/logandey)
- Email: adhuhamlayaal55@gmail.com

---

## About

**Lo Gandey** — *logandey* in Dhivehi spirit, smart mirror technology in practice.

Made in the Maldives, for the Maldives.

© 2026 Lo Gandey. All rights reserved.
