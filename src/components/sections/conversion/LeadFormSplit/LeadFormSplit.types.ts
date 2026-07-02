/* AUTO-GENERATED from the sibling *.schema.json by scripts/gen-types.mjs.
 * Do NOT edit by hand - edit the schema and run `npm run content:types`. */

/**
 * Lead capture band: light-grey section with a centered eyebrow + heading over the shared LeadForm split (value rail + trust badges beside the form card). The form logic, fields, spam defense, and /api/lead contract live in components/forms/LeadForm; this section only supplies the band chrome and LeadForm's copy props. This file is the SINGLE SOURCE OF TRUTH for the section's shape - the TS type is generated from it (LeadFormSplit.types.ts) and the landing-page doc schema $refs it.
 */
export interface LeadFormSplitSection {
  _type: "leadFormSplit";
  /**
   * Funnel id recorded with the lead. Must be one of LeadForm's typed funnels (the /api/lead contract).
   */
  formId: "contact" | "bulk-pricing" | "quote";
  /**
   * Neon-outline pill above the band heading, e.g. 'Talk to us'.
   */
  eyebrow?: string;
  /**
   * Centered band heading, e.g. 'Questions, quotes, or bulk orders'.
   */
  heading?: string;
  /**
   * LeadForm's charcoal rail pill. Defaults inside LeadForm.
   */
  railEyebrow?: string;
  /**
   * LeadForm's rail headline. Defaults inside LeadForm.
   */
  headline?: string;
  /**
   * LeadForm's rail lead copy. Defaults inside LeadForm.
   */
  lead?: string;
  /**
   * Submit button label. Defaults inside LeadForm.
   */
  submitLabel?: string;
}
