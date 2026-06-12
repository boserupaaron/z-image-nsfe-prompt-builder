# Z-Image NSFE Prompt Builder

A local, self-contained web app for generating original, candid, narrative-driven Z-Image / Z-Turbo prompts using the NSFE (Narrative-First, Subject-Reaction, Evidence, Observer) methodology.

**Core Principle**: Every generated prompt answers *"Why did the photographer press the shutter at this exact instant?"*

## Features
- Rough idea input + 7 structured selectors (Scene, Subject, Moment Type, Reaction Pair, Observer Perspective, Visual Style)
- Original prompt generation engine that **recombines** modular components (never stitches copied examples)
- Supports the full range of timing-driven candid moments including insinuated intimate, awkward explicit reactions, voyeuristic framing, and private discoveries
- Exact output format: English Version + Simplified Chinese Version (one clean paragraph each)
- Remix button for variations
- Local prompt history (localStorage, last 12)
- One-click copy for both languages
- Fully local — no external APIs or tracking

## Data
- `raw-data/`: Publicly scraped prompt titles and patterns from PromptDexter.com (for reference only)
- `transformed-data/`: Deduplicated, abstracted reusable components (subjects, actions, environments, lighting, observer perspectives, moment types)

All final prompts are **original recombinations** created by the local engine.

## Setup & Run
```bash
npm install
npm run dev
```

Open http://localhost:5173

## Methodology
The generator always constructs prompts following this order:
1. Narrative Event (the "why shutter now")
2. Subject Reaction (visible, timing-specific)
3. Relationship / Context Clues (via visible evidence)
4. Visible Evidence (objects, environment details)
5. Observer Perspective (candid / voyeuristic / amateur framing)
6. Technical Photography Style (fixed high-quality suffix)

## Attribution
Inspired by the general concept of modular prompt galleries but built entirely from scratch with original logic, UI, and generation engine. Transformed public example patterns only — no proprietary content or direct copies used in final prompts.

Built with Vite + React + TypeScript. Tailwind via CDN for dev.

## License
Personal / internal use. All generated prompts are original.

---

**NSFE Prompt Builder** — Timing-driven. Narrative-first. Fully local.