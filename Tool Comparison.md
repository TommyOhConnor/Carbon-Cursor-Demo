# AI Prototype Tool Evaluation (Tool Comparison)

## Tools Covered

1. Figma Make  
2. Cursor  
3. Lovable  
4. Bolt.new (StackBlitz)  
5. v0 (Vercel)  
6. Framer AI  
7. ProtoPie AI  
8. Galileo AI  
9. Uizard  

---

## 1. Output — What does the tool produce?

| Tool | Output Type | Live URL? | Code Ownership? |
|------|-------------|-----------|-----------------|
| **Figma Make** | Interactive prototype / publishable web app | Yes (Figma-hosted) | Limited — Figma ecosystem |
| **Cursor** | Real production-grade code (React, Next.js, etc.) | Yes (deploy anywhere) | Full |
| **Lovable** | Full-stack web app (React, Supabase) | Yes (Lovable-hosted) | Full (GitHub sync) |
| **Bolt.new** | Full-stack web app (various frameworks) | Yes (Netlify/Vercel deploy) | Full |
| **v0** | React/Next.js component code | Copy/paste into project | Full |
| **Framer AI** | Hosted interactive website/prototype | Yes (Framer-hosted) | Partial (can export HTML) |
| **ProtoPie AI** | Rich interactive prototype | Yes (ProtoPie Cloud) | Proprietary format |
| **Galileo AI** | High-fidelity Figma designs or HTML/Tailwind | Via Figma or export | Partial |
| **Uizard** | Wireframes/mockups → CSS/React code | Via Uizard share link | Partial |

**Key distinction:** Cursor, Lovable, Bolt, and v0 produce real running code. Figma Make, Framer, ProtoPie, Galileo, and Uizard produce prototypes or designs — closer to simulations.

---

## 2. Accessibility — Keyboard nav, ARIA, WCAG?

| Tool | Keyboard Support | WCAG/ARIA | Screen Reader | Notes |
|------|-----------------|-----------|---------------|-------|
| **Figma Make** | Depends on AI output | Not automatic | No | Must explicitly prompt for a11y; no built-in enforcement |
| **Cursor** | ★★★★★ Full control | Yes, via code | Yes | You write/prompt real semantic HTML; can use Carbon's built-in a11y |
| **Lovable** | Partial | Minimal automatic | No | Can be prompted in, but not enforced |
| **Bolt.new** | Partial | Minimal automatic | No | Same as Lovable; depends on prompting |
| **v0** | Good baseline | Yes (shadcn/ui default) | Partial | shadcn/ui components are accessible by default |
| **Framer AI** | Partial | Semantic tags, tab order | No | Has accessibility panel, alt text, reduced motion support |
| **ProtoPie AI** | None | None | None | Prototypes only; no semantic HTML output |
| **Galileo AI** | None | None | None | Figma/image output, not live code |
| **Uizard** | None | None | None | Wireframe tool; no a11y infrastructure |

**Key insight:** Only Cursor gives you true, auditable accessibility. v0 is second-best due to shadcn/ui defaults. All others depend heavily on what you prompt, with no enforcement or audit path.

---

## 3. Design System Integration — Tokens, themes, modes, animation?

| Tool | Custom DS | Tokens | Themes/Modes | Animation Tokens | Notes |
|------|-----------|--------|--------------|-----------------|-------|
| **Figma Make** | ★★★★ Yes (npm package) | Yes | Yes (via Figma vars) | Partial | Requires publishing DS as npm package; guidelines.md for AI context |
| **Cursor** | ★★★★★ Full | Yes | Yes (full code control) | Yes | Use any DS natively; Carbon, custom, etc. Rules enforce it |
| **Lovable** | ★★ Limited | No native support | Partial | No | Can describe a DS in prompts; no token-level integration |
| **Bolt.new** | ★★ Limited | No native support | Partial | No | Same as Lovable |
| **v0** | ★★★ Good | Yes (CSS vars / shadcn) | Dark mode built-in | No | Registry system for custom DS; best among quick-build tools |
| **Framer AI** | ★★ Moderate | Partial (Figma import) | Partial | Partial (motion) | Design tokens less mature; motion via Framer's own system |
| **ProtoPie AI** | ★ Minimal | No | No | Via ProtoPie interactions | Focused on interaction logic, not design system fidelity |
| **Galileo AI** | ★★ Moderate | In progress | No | No | Figma variable support coming; currently limited |
| **Uizard** | ★ Minimal | No | Theme from screenshot | No | "Brand kit" feature is basic |

**Key insight:** Cursor is the only tool where you can bring your full design system (Carbon, tokens, animation tokens, modes) with zero compromise. Figma Make is second if your DS is published as an npm package.

---

## 4. Ease of User Testing — How do testers access it?

| Tool | Tester Experience | Friction | Format |
|------|-------------------|----------|--------|
| **Figma Make** | Shareable URL, no login required | Low | Browser-based web app |
| **Cursor** | Deploy to Vercel/Netlify, share URL | Low (one deploy step) | Real web app in browser |
| **Lovable** | Published URL, instant share | Very low | Browser-based web app |
| **Bolt.new** | Deploy to Netlify/Vercel, share URL | Low | Browser-based web app |
| **v0** | Embeds in v0.dev, or copy into project | Medium (needs project setup) | Component preview or deployed app |
| **Framer AI** | Shareable URL, no login required | Very low | Browser-based website |
| **ProtoPie AI** | ProtoPie Cloud link or Player app | Medium (Player download for full features) | Proprietary player |
| **Galileo AI** | Export to Figma → share Figma link | Medium | Figma prototype link |
| **Uizard** | Uizard share link | Low | Browser-based prototype |

**Key insight:** Lovable and Framer are the fastest for getting a shareable link in front of testers with zero friction. Cursor requires one deploy step, but the result is a real app, indistinguishable from production.

---

## 5. Research Integrations — Analytics, heatmaps, surveys?

| Tool | Analytics | Heatmaps | Session Recording | Surveys | Notes |
|------|-----------|----------|-------------------|---------|-------|
| **Figma Make** | Via UserTesting (native) | Via Maze (native) | Via UserTesting | Via Maze | Best native research integration of any design tool |
| **Cursor** | PostHog, GA, Hotjar, Mixpanel — anything | Hotjar, Microsoft Clarity | Hotjar, LogRocket | Any survey tool | Unlimited; add any script or SDK via code |
| **Lovable** | Built-in analytics dashboard + Maze | Via Maze snippet | Via Maze | Via Maze | Maze is the primary research path |
| **Bolt.new** | GA, custom scripts | Via script injection | Via script injection | Via script injection | Add tracking codes manually |
| **v0** | Via deployed project | Via deployed project | Via deployed project | Via deployed project | Depends on where you deploy the component |
| **Framer AI** | GA, Meta Pixel, GTM native | Hotjar native | Hotjar | Via embed | Strong native integrations for a no-code tool |
| **ProtoPie AI** | None built-in | None | None | None | No research integrations; testing must happen externally |
| **Galileo AI** | None (Figma prototype) | Maze via Figma | None | Maze via Figma | Inherits Figma's integrations after export |
| **Uizard** | None | None | None | None | No research integrations |

**Key insight:** Cursor (with code) gives you full access to every research tool on the market. Figma Make is best-in-class for native integration of UserTesting and Maze. Framer is the best among no-code tools (Hotjar, GA, GTM out of the box).

---

## 6. Device / Responsiveness — Is the output responsive?

| Tool | Responsive? | Mobile Preview | Breakpoint Control |
|------|-------------|----------------|-------------------|
| **Figma Make** | Partial | Yes (preview panel) | Depends on AI output; can prompt for responsive |
| **Cursor** | ★★★★★ Full | Yes (browser DevTools) | Full CSS/Tailwind control |
| **Lovable** | ★★★★ Good | Yes (built-in preview) | Auto-responsive, promptable |
| **Bolt.new** | ★★★★ Good | Yes (built-in preview) | Auto-responsive |
| **v0** | ★★★★ Good | Yes | Tailwind breakpoints built-in |
| **Framer AI** | ★★★★★ Excellent | Yes (built-in) | Visual breakpoint editor, fluid grid |
| **ProtoPie AI** | ★★★ Moderate | Yes (device frames) | Manual screen setup |
| **Galileo AI** | ★★ Limited | Static screens | Manual in Figma after export |
| **Uizard** | ★★ Limited | Yes (mobile frame preview) | Basic |

**Key insight:** Framer is the strongest for responsive design with its visual breakpoint editor and fluid grid. Cursor gives full control via code. Galileo and Uizard are weakest — largely static.

---

## Summary Scorecard

| | Figma Make | Cursor | Lovable | Bolt.new | v0 | Framer | ProtoPie | Galileo | Uizard |
|---|---|---|---|---|---|---|---|---|---|
| **Output quality** | ★★★★ | ★★★★★ | ★★★★ | ★★★★ | ★★★★ | ★★★★ | ★★★ | ★★★ | ★★ |
| **Accessibility** | ★★ | ★★★★★ | ★★ | ★★ | ★★★ | ★★★ | ★ | ★ | ★ |
| **Design system** | ★★★★ | ★★★★★ | ★★ | ★★ | ★★★ | ★★ | ★ | ★★ | ★ |
| **User testing** | ★★★★★ | ★★★★ | ★★★★ | ★★★ | ★★★ | ★★★★ | ★★ | ★★ | ★★ |
| **Research integrations** | ★★★★★ | ★★★★★ | ★★★★ | ★★★ | ★★★ | ★★★★ | ★ | ★★ | ★ |
| **Responsiveness** | ★★★ | ★★★★★ | ★★★★ | ★★★★ | ★★★★ | ★★★★★ | ★★★ | ★★ | ★★ |
| **Non-technical ease** | ★★★★ | ★★ | ★★★★★ | ★★★★ | ★★★ | ★★★★ | ★★★ | ★★★ | ★★★★ |

---

## For Your Workflow (Launch Pad → Carbon → Test → Iterate → Handoff)

- **Cursor** is the strongest end-to-end fit: real Carbon design system, full accessibility, and production code handoff.
- **Figma Make** is the best companion for early exploration and has the strongest native user research integrations (UserTesting + Maze).
- **Lovable** is worth considering for non-technical teammates who need to build quickly without code — but you give up design system fidelity.
- **Framer** is a strong option if the output is a marketing page or lightweight prototype (not a Carbon-based enterprise UI).
- **ProtoPie, Galileo, and Uizard** are best limited to early ideation or client brainstorming — not suitable for your production prototype-to-handoff flow.
