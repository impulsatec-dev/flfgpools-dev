# About Horizontal Scroll Mockups Design

**Goal:** Create three visual alternatives for the homepage About section so a new visitor can understand FLFG Pools' story while preserving the horizontal-scroll concept and the existing imagery.

**Scope:** Mockups only in `/mock`; do not modify `app/[locale]/page.tsx` until one direction is selected.

## Shared constraints

- Reuse the existing About copy and image assets.
- Keep the FLFG visual language: pool cream, pool deep, aqua accents, display typography, editorial labels.
- Preserve horizontal progression on desktop.
- Use a normal vertical flow on mobile rather than forcing horizontal page scrolling.
- Make the sequence and progress understandable without relying on hover.
- Prioritize clarity first and visual impact second.

## Alternative 1: Editorial Narrative

Six sequential panels: intro, paragraph 1, first image archive, paragraph 2, second image archive, CTA. Each panel uses a consistent chapter header and a stable grid. Images remain asymmetrical, but arbitrary offsets are replaced with intentional alignment. This is the recommended baseline because it preserves the content and makes the reading order explicit.

## Alternative 2: Gallery Protagonist

Four larger stages: intro, showroom gallery with supporting facts, installation/process gallery with supporting copy, CTA. The copy is condensed into contextual labels and fact blocks adjacent to the photography. This maximizes visual impact and reduces the feeling of isolated text panels, while risking less narrative depth.

## Alternative 3: FLFG Timeline

A continuous horizontal timeline connects the major milestones: 2013, showroom, 150+ styles, 1,000+ installations, exclusive distribution, lifetime warranty, and CTA. Text and image groups alternate around the timeline. This gives the section a memorable concept and a clear story arc, but requires stronger visual discipline than the other alternatives.

## Comparison UI

The `/mock` route presents all three alternatives with a visible selector, shared viewport framing, and labels identifying the design direction. Each alternative is independently navigable and uses the same content/assets so the comparison focuses on structure rather than content differences.

## Success criteria

- A first-time visitor can identify the beginning, middle, and end of the section.
- The relationship between text, image groups, and CTA is visually apparent.
- The three concepts feel materially different, not like color variations of one layout.
- Desktop horizontal scrolling is visually compelling without confusing the reading order.
- Mobile remains readable and accessible as a vertical sequence.
