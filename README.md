# Lo Gandey

**Lo Gandey** is a smart mirror platform built for the Maldives — a modular, always-on display for homes, hotels, and retail spaces.

It is based on [MagicMirror²](https://github.com/MagicMirrorOrg/MagicMirror), the open source smart mirror project, customized with local defaults for Malé and the wider Maldives.

![MagicMirror² demo](https://magicmirror.builders/img/demo.gif)

## Features

- **Clock & calendar** — Maldives timezone (`Indian/Maldives`) and public holidays
- **Weather** — current conditions and forecast via Open-Meteo (Malé coordinates)
- **News** — local headlines from TNN Maldives
- **Modular layout** — add or remove widgets via `config/config.js`
- **Runs on Raspberry Pi** — fullscreen mirror mode, or browser-only for development

## Quick start

### Requirements

- [Node.js](https://nodejs.org/) 22 or higher
- Raspberry Pi OS (64-bit, desktop) for production mirrors
- Windows, macOS, or Linux for development

### Install

```bash
git clone https://github.com/adhuhaam/logandey.git
cd logandey
node --run install-mm
cp config/config.js.sample config/config.js
```

### Run

**Browser (development):**

```bash
npm run server
```

Open [http://localhost:8080](http://localhost:8080)

**Windows (Electron):**

```bash
npm run start:windows
```

**Raspberry Pi (Linux):**

```bash
node --run start:x11
```

## Configuration

Edit `config/config.js` to change modules, layout, and API settings. The included sample config is pre-set for the Maldives:

| Setting | Default |
|---------|---------|
| Locale | `en-MV` |
| Timezone | `Indian/Maldives` |
| Location | Malé (4.1755, 73.5093) |
| Calendar | Maldives public holidays |
| News | TNN Maldives local news |

Validate your config:

```bash
npm run config:check
```

## Project structure

| Path | Purpose |
|------|---------|
| `config/` | Mirror configuration and custom CSS |
| `defaultmodules/` | Built-in modules (clock, weather, calendar, etc.) |
| `modules/` | Custom and third-party modules |
| `js/` | Core application and server |

## Hardware

Lo Gandey targets **Raspberry Pi 4 or 5** with Raspberry Pi OS (64-bit desktop). See the [MagicMirror² requirements](https://docs.magicmirror.builders/getting-started/requirements.html) for full details.

## Upstream & license

Lo Gandey is a fork of **MagicMirror²** (MIT License). Core platform credit goes to [Michael Teeuw](https://michaelteeuw.nl/tagged/magicmirror) and the [MagicMirror community](https://github.com/MagicMirrorOrg/MagicMirror/graphs/contributors).

- Upstream docs: [docs.magicmirror.builders](https://docs.magicmirror.builders)
- Upstream repo: [MagicMirrorOrg/MagicMirror](https://github.com/MagicMirrorOrg/MagicMirror)

## Repository

[github.com/adhuhaam/logandey](https://github.com/adhuhaam/logandey)
