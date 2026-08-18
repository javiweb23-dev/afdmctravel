/**
 * Google Analytics 4 measurement ID.
 *
 * Hardcoded rather than read from the environment on purpose: it is a public
 * identifier, visible in the page source of every request, so there is nothing
 * to protect. Keeping it here means analytics cannot silently stop working
 * because a deploy went out without the variable set.
 */
export const GA_MEASUREMENT_ID = "G-Q4HSH3LE0D";
