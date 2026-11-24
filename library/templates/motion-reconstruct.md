# Motion reconstruction template (MR)
Manestream Build Library, added 9 Oct 2026 from the Three Leaves test (`DBD/docs/MOTION-RESEARCH.md` has the worked examples R1–R8).

**Why this exists.** Public motion-prompt galleries (prompt-motion.com and the "one prompt for motion graphics" posts) show great output, but the prompts behind it are mostly one loose paragraph with no timing, easing, fallback or test. They also target rendered video (Remotion, Manim, HyperFrames), while our sites animate live in the browser. The value is in the *output*. So: watch it, then write the prompt that would rebuild it, in this format.

## Method (timebox 2 hours per project)
1. **Gather** only what's relevant to the client's industry. Sources: prompt-motion.com (by category), repos tagged with the industry, Codrops demos, the project's reference sites. Note the licence of each.
2. **Watch, don't copy.** For each candidate, write what the viewer sees beat by beat. Never paste a prompt's or a site's text into the repo.
3. **Reconstruct** with the template below.
4. **Map** each one to a section and mark it: *built*, *candidate*, *deferred* (with whose call) or *rejected* (with the reason). Reject anything that adds mood but no information.
5. **Build** the top one or two through the `animate` skill, then `review-animations`.

## Template
```text
MR-{{N}} {{NAME}}
Seen in: {{SOURCES, with licence}}
Beat: what the viewer sees, and the one fact it proves ({{FACT}} from the content file).
Scene / elements: what is drawn, from which real asset or data; nothing invented.
Motion: properties animated (transform and opacity first), ranges, easing (entrances ease out, never in), stagger.
Trigger: scroll-scrubbed (scroll length, scrub value) or timed (duration, skippable, interruptible).
Source of truth: the single value both the animation and any on-screen number read from.
Phones: what changes at 390 px (framing, pan, pull-back, list instead of hover).
Fallbacks: reduced motion = {{STATIC VERSION}}; no WebGL = {{STILL OR SVG}}; data-saver = {{LIGHTER}}.
Budget: KB added, which chunk, frame-rate target.
Done when: {{MEASURABLE CHECK}}, at 390 and 1280.
```

## Field weights (what changed results most in the Three Leaves test)
1. The fact the motion proves.
2. One shared source of truth for animation and numbers.
3. Fallbacks named up front.
4. A measurable "done when".
5. Camera, timing and easing (tuning, last).

## Industry starter list: real estate
Tower assembly with a synced storeys counter · the amenity lap (runner on the track, metres, amenities lighting as passed) · line art to render · windows lighting by cluster · a falling motif with a physical turn · plan to axonometric extrude · a spline camera between stat shots · route lines to landmarks (only along real roads, with real drive times).
