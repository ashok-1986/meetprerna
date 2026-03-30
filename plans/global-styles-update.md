# Global Styles Update Plan

## Current State
The current `src/styles/globals.css` file contains basic Tailwind CSS setup with custom color variables.

## Required Changes
Update the global styles to match Ashfall Studio design language requirements:

1. Hide default cursor sitewide (`* { cursor: none; }`)
2. Add smooth scroll behavior
3. Remove default margins between sections
4. Prevent horizontal body overflow
5. Add custom selection colors
6. Style scrollbar
7. Preserve existing color variables and font utilities

## Updated CSS Content
```css
@import "tailwindcss";

:root {
  --color-primary: #C4FF61;
  --color-secondary: #EAFF27;
  --color-bg: #1A1A1A;
  --color-contrast: #FDFFE9;
  --color-muted: #3A3A3A;

  --background: var(--color-bg);
  --foreground: var(--color-contrast);
  --primary: var(--color-primary);
  --secondary: var(--color-secondary);
  --muted: var(--color-muted);
  --contrast: var(--color-contrast);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  cursor: none;
}

body {
  background-color: #1A1A1A;
  color: #FDFFE9;
  font-family: var(--font-lato), sans-serif;
  min-height: 100vh;
  overflow-x: hidden;
}

/* Font utility classes */
.font-lato {
  font-family: var(--font-lato), sans-serif;
}

.font-serif {
  font-family: "Times New Roman", Times, serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: "Times New Roman", Times, serif;
}

/* Hide default cursor sitewide */
* { cursor: none; }

/* Smooth scroll */
html { scroll-behavior: smooth; }

/* Remove default margins between sections */
section, main > * { margin: 0; padding-top: 0; }

/* Horizontal scroll — prevent body overflow during portfolio section */
body { overflow-x: hidden; }

/* Selection colour */
::selection {
  background: #C4FF61;
  color: #1A1A1A;
}

/* Scrollbar styling */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: #1A1A1A; }
::-webkit-scrollbar-thumb { background: #C4FF61; border-radius: 2px; }