// This file custom.d.ts is used to provide TypeScript type definitions for non-TS files, specifically for SVG files in this case. It allows TypeScript to understand how to handle imports of SVG files as modules.

declare module "*.svg" {
  const content: any;
  export default content;
}
