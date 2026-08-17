/**
 * TypeScript 6 checks side-effect imports (`noUncheckedSideEffectImports`).
 * Next ships ambient types for `*.module.css` but not for global stylesheets,
 * so `import "./globals.css"` needs this declaration.
 */
declare module "*.css";
