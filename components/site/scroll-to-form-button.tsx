"use client";

/** The form section's id — the scroll target for the in-page CTAs. */
export const PARTNER_FORM_ID = "partner-form";

const SETTLED_WITHIN_PX = 200;

function restingOffset(target: HTMLElement) {
  const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
  return window.scrollY + target.getBoundingClientRect().top - margin;
}

/**
 * Scrolls back up to the form without putting a #fragment in the address bar,
 * matching how the main site's RFP links behave.
 */
export function ScrollToFormButton({
  label,
  variant = "solid",
}: {
  label: string;
  variant?: "solid" | "outline";
}) {
  function handleClick() {
    const target = document.getElementById(PARTNER_FORM_ID);
    if (!target) return;

    window.scrollTo({top: restingOffset(target), behavior: "smooth"});

    // Smooth scrolling is ignored in some environments; check the outcome
    // rather than assuming it worked, then move focus to the form.
    window.setTimeout(() => {
      const current = document.getElementById(PARTNER_FORM_ID);
      if (!current) return;
      const margin = parseFloat(getComputedStyle(current).scrollMarginTop) || 0;
      if (
        Math.abs(current.getBoundingClientRect().top - margin) >
        SETTLED_WITHIN_PX
      ) {
        window.scrollTo({top: restingOffset(current), behavior: "auto"});
      }
      current.querySelector("input")?.focus({preventScroll: true});
    }, 700);
  }

  const styles =
    variant === "solid"
      ? "bg-[#072b52] text-white hover:bg-[#05233f]"
      : "border border-[#072b52] text-[#072b52] hover:bg-[#072b52] hover:text-white";

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex rounded-lg px-8 py-3.5 text-sm font-semibold transition ${styles}`}
    >
      {label}
    </button>
  );
}
