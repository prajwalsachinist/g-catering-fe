import type { SVGProps } from "react";

/*
 * lucide-react v1 removed brand marks, so these are drawn inline.
 *
 * Two flavours of each:
 *  - `*Icon`      inherits currentColor, for use inside a coloured button
 *                 where a second brand colour would fight the button.
 *  - `*BrandIcon` renders the official brand colours, for the social row
 *                 and app links.
 *
 * All are decorative: every call site pairs them with a visible label or an
 * aria-label on the surrounding link, so they stay aria-hidden.
 */

/* -- monochrome ---------------------------------------------------------- */

export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.17 8.17 0 0 1-1.25-4.36c0-4.54 3.7-8.24 8.24-8.24a8.18 8.18 0 0 1 5.82 2.42 8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.25 8.23Z" />
    </svg>
  );
}

/* -- brand colours ------------------------------------------------------- */

/** WhatsApp: white glyph on the brand green (#25D366). */
export function WhatsAppBrandIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <circle cx="16" cy="16" r="16" fill="#25D366" />
      <path
        fill="#FFF"
        d="M22.19 19.3c-.33-.17-1.95-.96-2.25-1.07-.3-.11-.52-.17-.74.17-.22.33-.85 1.07-1.04 1.29-.19.22-.38.25-.71.08-.33-.17-1.4-.51-2.66-1.64-.98-.88-1.65-1.96-1.84-2.29-.19-.33-.02-.51.14-.68.15-.15.33-.38.5-.58.16-.19.22-.33.33-.55.11-.22.06-.41-.03-.58-.08-.17-.74-1.79-1.02-2.45-.27-.64-.54-.56-.74-.57h-.63c-.22 0-.58.08-.88.41-.3.33-1.15 1.13-1.15 2.75s1.18 3.19 1.35 3.41c.16.22 2.32 3.54 5.62 4.97.79.34 1.4.54 1.87.7.79.25 1.5.21 2.07.13.63-.09 1.95-.8 2.22-1.57.28-.77.28-1.43.2-1.57-.09-.14-.3-.22-.63-.39Z"
      />
      <path
        fill="#FFF"
        d="M16.02 6.4a9.55 9.55 0 0 0-8.1 14.61L6.6 25.6l4.7-1.23a9.55 9.55 0 1 0 4.72-17.97Zm0 17.47a7.9 7.9 0 0 1-4.03-1.1l-.29-.17-2.99.78.8-2.92-.19-.3a7.89 7.89 0 1 1 6.7 3.71Z"
      />
    </svg>
  );
}

/** Facebook: white "f" on the brand blue (#1877F2). */
export function FacebookBrandIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <circle cx="16" cy="16" r="16" fill="#1877F2" />
      <path
        fill="#FFF"
        d="M21.11 20.63l.71-4.6h-4.42v-2.99c0-1.26.62-2.49 2.6-2.49h2.01V7.63s-1.82-.31-3.57-.31c-3.64 0-6.02 2.21-6.02 6.2v3.51H8.37v4.6h4.05v11.12a16.1 16.1 0 0 0 4.98 0V20.63h3.71Z"
      />
    </svg>
  );
}

/**
 * Instagram: the camera glyph on the official gradient.
 *
 * The gradient needs an id, and this mark renders once per page (the footer
 * social row), so a fixed id is safe. If it is ever used twice on one page,
 * both references resolve to the same definition - visually identical.
 */
export function InstagramBrandIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <defs>
        <radialGradient id="ig-brand" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#FDF497" />
          <stop offset="5%" stopColor="#FDF497" />
          <stop offset="45%" stopColor="#FD5949" />
          <stop offset="60%" stopColor="#D6249F" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect width="32" height="32" rx="16" fill="url(#ig-brand)" />
      <path
        fill="none"
        stroke="#FFF"
        strokeWidth="2"
        d="M11.6 7.5h8.8a4.1 4.1 0 0 1 4.1 4.1v8.8a4.1 4.1 0 0 1-4.1 4.1h-8.8a4.1 4.1 0 0 1-4.1-4.1v-8.8a4.1 4.1 0 0 1 4.1-4.1Z"
      />
      <circle
        cx="16"
        cy="16"
        r="4.1"
        fill="none"
        stroke="#FFF"
        strokeWidth="2"
      />
      <circle cx="21.1" cy="10.9" r="1.35" fill="#FFF" />
    </svg>
  );
}
