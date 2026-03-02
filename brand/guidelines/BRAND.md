# 🔱 Yarlis Brand System — v1.0
_Last updated: 2026-03-02 | Maintained by DEEJR_

---

## Brand Architecture

```
Yarlis (parent brand)
├── yarlis.com      — Identity, auth, billing
├── yarlis.ai       — AI orchestration
├── mybotbox.com    — SMB chatbot SaaS
├── sdods.com       — Open-core SDK
├── rapidtriage.me  — Developer triage platform ← most mature
└── yarlis.io       — Deployment accelerator (parked)
```

---

## Color Palette

### Primary (Yarlis)
| Name | Hex | Use |
|------|-----|-----|
| **Indigo** | `#6366F1` | Yarlis primary |
| **Purple** | `#8B5CF6` | Accent, gradients |
| **Blue** | `#3B82F6` | Links, highlights |
| **Emerald** | `#10B981` | Active, live, success |

### RTM (RapidTriageME)
| Name | Hex | Use |
|------|-----|-----|
| **Electric Blue** | `#3B82F6` | Primary |
| **Violet** | `#8B5CF6` | Accent |
| **Cyan** | `#00D9FF` | Hover, glow |
| **Emerald** | `#10B981` | Live status |

### Backgrounds
| Name | Hex | Use |
|------|-----|-----|
| **Midnight** | `#0A0A0F` | Page background |
| **Navy** | `#0F172A` | Body dark |
| **Card** | `#1E293B` | Cards, panels |
| **Border** | `#334155` | Dividers |

### Text
| Name | Hex | Use |
|------|-----|-----|
| **Primary** | `#F8FAFC` | Headings, body |
| **Muted** | `#94A3B8` | Subtext, labels |
| **Dim** | `#64748B` | Placeholders |

---

## Typography

### Primary Font: Inter
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```
- **H1:** 800 weight, -0.8px tracking
- **H2:** 700 weight, -0.5px tracking
- **H3:** 600 weight
- **Body:** 400 weight, 1.6 line height
- **Labels:** 500 weight, 2px+ letter-spacing uppercase

### Monospace: JetBrains Mono
```css
font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
```
- Use for: code snippets, version numbers, API tokens, terminal output

---

## Logo System

### RapidTriageME

| File | Use case |
|------|----------|
| `logos/rtm/rapidtriage-primary.svg` | Main logo, dark backgrounds, website header |
| `logos/rtm/rapidtriage-icon.svg` | Favicon, app icon, badge, npm badge |

**Icon concept:** Magnifying glass (triage/investigation) + lightning bolt inside (fast/instant) + scan pulse lines (real-time).

**Clearspace rule:** Min padding = icon height × 0.5 on all sides.

**Minimum sizes:**
- Full logo: 160px wide minimum
- Icon only: 16px minimum (favicon)

**Don't:**
- Stretch or distort
- Change gradient colors
- Use on light backgrounds (light version TBD)
- Add drop shadows

### Yarlis (Parent Brand)

| File | Use case |
|------|----------|
| `logos/yarlis/yarlis-primary.svg` | Website, pitch decks, legal docs |

**Icon concept:** Abstracted trident 🔱 — three prongs = three pillars (identity, orchestration, deployment). Crown dots = enterprise-grade.

---

## Gradient Recipes

```css
/* RTM Primary */
background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);

/* Yarlis Primary */
background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #3B82F6 100%);

/* Hero text gradient */
background: linear-gradient(90deg, #60A5FA 0%, #C084FC 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;

/* Subtle card border */
border: 1px solid #334155;
background: #1E293B;

/* Glow effect */
box-shadow: 0 0 24px rgba(59, 130, 246, 0.15);
```

---

## UI Patterns

### Buttons
```css
/* Primary */
background: linear-gradient(135deg, #3B82F6, #8B5CF6);
border-radius: 8px;
padding: 12px 24px;
font-weight: 600;

/* Secondary */
background: transparent;
border: 1px solid #334155;
color: #F8FAFC;

/* Danger */
background: transparent;
border: 1px solid #991B1B;
color: #FCA5A5;
```

### Cards
```css
background: #1E293B;
border: 1px solid #334155;
border-radius: 12px;
padding: 24px;
```

### Code Blocks
```css
background: #0F172A;
border: 1px solid #334155;
border-radius: 8px;
font-family: 'JetBrains Mono', monospace;
color: #60A5FA;  /* blue for commands */
color: #10B981;  /* green for output */
```

---

## Brand Voice

| Tone | Example |
|------|---------|
| **Direct** | "Debug faster. Ship today." — not "We help you maybe debug?" |
| **Technical** | Uses correct terms: MCP, SSE, OIDC, WIF — no dumbing down |
| **Confident** | "The only MCP-native triage tool" — not "one of the tools that might help" |
| **No filler** | Skip "Great question!", "Certainly!", "We're excited to..." |

### Naming Rules
- **RapidTriageME** — always camelCase, always full name in copy
- **Yarlis** — title case, never all-caps
- **@rapidtriageme/mcp** — always monospace in docs
- **MCP** — always uppercase (Model Context Protocol)
- **IDE** — always uppercase

---

## Domain Brand Personalities

| Domain | Personality | Primary Color |
|--------|-------------|---------------|
| yarlis.com | Enterprise, trust, identity | Indigo `#6366F1` |
| yarlis.ai | Intelligent, orchestrating | Purple `#8B5CF6` |
| mybotbox.com | Friendly, accessible, SMB | Blue `#3B82F6` |
| sdods.com | Open, community, developer | Emerald `#10B981` |
| rapidtriage.me | Fast, precise, debugging | Blue→Violet gradient |
| yarlis.io | Speed, deploy, ship | Cyan `#00D9FF` |

---

## Social / Marketing Assets

### npm Badge (RTM)
```markdown
[![npm](https://img.shields.io/npm/v/@rapidtriageme/mcp?color=3B82F6&label=%40rapidtriageme%2Fmcp)](https://www.npmjs.com/package/@rapidtriageme/mcp)
```

### GitHub Badge
```markdown
[![CI](https://github.com/siri1410/smartrapidtriage/actions/workflows/firebase-deploy.yml/badge.svg)](https://github.com/siri1410/smartrapidtriage/actions)
```

### Standard taglines
- **RTM short:** "MCP-native browser triage for Claude Code + Cursor"
- **RTM long:** "Debug faster. RapidTriageME bridges browser context and your AI coding assistant — real-time triage, zero copy-paste."
- **Yarlis:** "The AI ecosystem for serious builders."

---

## File Structure
```
brand/
├── logos/
│   ├── rtm/
│   │   ├── rapidtriage-primary.svg   ← main logo
│   │   ├── rapidtriage-icon.svg      ← icon only
│   │   └── rapidtriage-light.svg     ← (TODO: light bg version)
│   ├── yarlis/
│   │   ├── yarlis-primary.svg        ← wordmark
│   │   └── yarlis-icon.svg           ← (TODO: standalone trident)
│   └── ecosystem/                    ← (TODO: per-domain marks)
├── guidelines/
│   └── BRAND.md                      ← this file
└── exports/                          ← PNG exports (TODO: generate via script)
```

---

## Where to Find Brand Assets

| Location | URL |
|----------|-----|
| GitHub (source) | `github.com/siri1410/yarlis-portfolio/brand/` |
| Figma (design specs) | `figma.com/files/project/557500720` (rapidtriage.me project) |
| Notion (strategy) | Yarlis Strategy Hub → Brand |
| Local workspace | `/Users/sy/.openclaw/workspace/brand/` |
