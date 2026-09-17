/**
 * Renders a schema.org graph. Next keeps this in the server payload, so the
 * markup is present in the initial HTML where crawlers actually look.
 */
export default function JsonLd({ schema }: { schema: object }) {
  return (
    <script
      type="application/ld+json"
      // The argument is built from local constants, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
