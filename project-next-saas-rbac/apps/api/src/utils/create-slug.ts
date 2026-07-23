/**
 * Converts a string into a URL-friendly slug.
 *
 * @example
 * slugify("Olá, Mundo!")
 * // "ola-mundo"
 *
 * @example
 * slugify("TypeScript & React 2026")
 * // "typescript-react-2026"
 */
export function createSlug(text: string): string {
  return text
    .normalize('NFD') // Separate accented characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '') // Remove quotes
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric chars with "-"
    .replace(/^-+|-+$/g, '') // Remove leading/trailing "-"
    .replace(/-{2,}/g, '-') // Collapse multiple "-"
}
