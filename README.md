# Carbon Prototype

Interactive interface prototypes built with the [IBM Carbon Design System](https://github.com/carbon-design-system/carbon). This app uses **only** Carbon components for UI so you can explore and extend the design system in a real Next.js app.

## Run the app

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use the header to switch between **Home** and **Dashboard**.

## Adding new pages

1. Create a new folder under `app/` (e.g. `app/my-page/`).
2. Add a `page.tsx` that uses Carbon components.
3. Add `'use client';` at the top of the file (Carbon components are client-side).
4. Import components from `@carbon/react` and icons from `@carbon/react/icons`.
5. Add a link in `components/AppHeader.tsx` so the new page appears in the nav.

## Building with Carbon

- **Components**: Import from `@carbon/react` (e.g. `Button`, `TextInput`, `Grid`, `Tabs`, `DataTable`).
- **Icons**: Import from `@carbon/react/icons` (e.g. `import { Add } from '@carbon/react/icons'`).
- **Styles**: Global Carbon styles are loaded in `app/globals.scss` via `@use '@carbon/react'`. You can add page-specific SCSS there or in component-level files.

Keep all UI built with Carbon so prototypes stay consistent and accessible.

## Resources

- [Carbon React Storybook](https://react.carbondesignsystem.com/) – browse and copy component usage.
- [Carbon React tutorial](https://carbondesignsystem.com/developing/react-tutorial/overview) – official Next.js + Carbon walkthrough.
- [Carbon Design System](https://carbondesignsystem.com/) – guidelines and documentation.
