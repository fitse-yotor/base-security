const fs = require('fs');
const path = require('path');

const content = [
  "import { create } from 'zustand';",
  "",
  "// CMS Types",
  "",
  "export interface HeroContent {",
  "  badge: string;",
  "  title: string;",
  "  highlightWord: string;",
  "  subtitle: string;",
  "  primaryButtonText: string;",
  "  secondaryButtonText: string;",
  "  backgroundImage: string;",
  "}",
  ""
].join('\n');

fs.writeFileSync('src/app/lib/cms-store.ts', content, 'utf8');
console.log('done');
