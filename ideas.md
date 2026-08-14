# Visual Direction Brainstorm

## Approach 1: Measured Waterline

### Theme Name

Measured Waterline

### Very Brief Intro

An information-first interface inspired by water gauges, field notebooks, and calm environmental instruments. It makes uncertainty visible without making the chat feel watched.

### Probability

0.07

## Approach 2: Tidal Signal

### Theme Name

Tidal Signal

### Very Brief Intro

A more expressive interface that uses changing tidal bands and restrained motion to make accumulated use feel alive. It would feel more visual, but it risks distracting from the host chat.

### Probability

0.04

## Approach 3: Quiet Lab

### Theme Name

Quiet Lab

### Very Brief Intro

A clinical research-tool direction with dense evidence panels, technical labels, and a monochrome palette. It would communicate rigor strongly, but it can feel too analytical for everyday chat use.

### Probability

0.09

## Chosen Direction: Measured Waterline

### Design Movement

Modern editorial utility with Swiss information design, field-instrument details, and soft aquatic material cues.

### Core Principles

1. **Show the measure, then the explanation.** A user sees the estimate quickly and can open the evidence behind it.
2. **Stay inside the host chat.** The extension uses small inline marks and an edge-anchored summary strip instead of large overlays.
3. **Treat uncertainty as part of the interface.** Confidence and source age are visible states, not hidden footnotes.
4. **Make motion quiet.** Animation confirms a completed response or a changed total. It never competes with typing or streaming.

### Color Philosophy

Use a pale mineral base, ink text, a deep river-teal signature, and a single warm warning tone. The palette should feel like a trustworthy measuring instrument, not an environmental campaign poster. Contrast must remain strong on arbitrary host-page backgrounds.

### Layout Paradigm

Use an edge-anchored total strip near the chat header and small response-level badges aligned with the host message rhythm. Detail views open as a compact side sheet or anchored popover. The system avoids centered dashboards and avoids inserting a new visual hierarchy over the AI product.

### Signature Elements

1. A thin **waterline meter** that fills only when the chat total changes.
2. A small **droplet-and-ruler mark** that pairs the estimate with its unit.
3. A **source seam**: one short evidence line that appears in detail views and connects the value to its factor version.

### Interaction Philosophy

The interface stays quiet until a value changes or a user asks for detail. A response badge is glanceable. A click or keyboard action reveals the calculation boundary, source, and limitation. Unknown values use an honest empty state instead of a decorative placeholder.

### Animation

Use 120–180 ms opacity and transform transitions for badges, popovers, and total changes. Animate only transform and opacity. Do not animate a water number for every streamed token. When a response completes, the badge can settle into place with a short fade and one waterline movement. Respect reduced-motion preferences and remove non-essential motion when requested.

### Typography System

Use **Space Grotesk** for headings and interface labels, **Source Sans 3** for readable explanatory copy, and **IBM Plex Mono** for units, factor versions, and source metadata. Use sentence case for user-facing labels. Keep data labels short and make the numeric estimate visually dominant without using fake precision.

### Brand Essence

An evidence-led companion that helps people see the resource cost of AI conversations without interrupting the work. Personality: **measured, curious, respectful**.

### Brand Voice

Headlines and labels are direct, calm, and specific. They name what the user can understand or control. They never use guilt, inflated environmental claims, or vague sustainability language.

Example lines:

“Estimated water for this response”

“The source gives an average, not a direct measurement.”

### Wordmark and Logo

Use a compact mark built from one horizontal waterline crossing a small open droplet. The line becomes a measurement tick at one end. The wordmark uses the chosen display face with a custom shortened crossbar on the “t” to echo the waterline. The mark must work without text at small sizes.

### Signature Brand Color

**River Teal: `#0B6F73`**. It is calm enough for a utility interface and distinct enough to own the measurement moment.

## Style Decisions

- The interface is an Operate surface, not a marketing landing page.
- The extension must preserve the host chat's visual rhythm.
- No purple AI gradients, emoji icons, fake testimonials, fake precision, or perpetual decorative animation.
- Evidence, confidence, and privacy controls are first-class visual states.
- The product demo must read as a host chat with a light extension layer, not as a standalone dashboard.
- A thin river-teal waterline with a measurement tick must appear above the fold and connect totals to response badges.
- Wordmarks and metadata use calibrated instrument cues: Space Grotesk for the wordmark and IBM Plex Mono for units, source age, and factor versions.
