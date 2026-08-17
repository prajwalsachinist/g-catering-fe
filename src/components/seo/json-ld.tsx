/**
 * Renders a JSON-LD script tag. The payload is built server-side from typed
 * objects in @/lib/jsonld, so no user input is serialised here.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
