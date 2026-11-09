# Spoke

Spoke is a bike repair booking app. The designs live in Figma; this repo is the build.

- Build UI from Figma through the Figma MCP server. Work from frame links, not screenshots.
- Use the tokens in tokens/tokens.css (source of truth: tokens/tokens.json). No hardcoded colours, spacing or radius values.
- The app is Vue 3 (Composition API, `<script setup lang="ts">`). Components are single-file `.vue` files.
- Reuse components in src/components before adding new ones.
- Name components after their Figma component (PascalCase file name, e.g. BookingCard.vue).
