"use client";

import {useEffect} from "react";
import {Link, usePathname} from "@/i18n/navigation";

/** id of the form section on the contact page — the scroll target. */
export const RFP_FORM_ID = "contact-form";

/** Survives the navigation from another page to /contact. */
const SCROLL_FLAG = "af:scroll-to-rfp";

const CONTACT_PATH = "/contact";

/** How close to its resting place counts as "arrived". */
const SETTLED_WITHIN_PX = 200;

/** The `scroll-mt-24` that keeps the section clear of the sticky header. */
function headerMargin(target: HTMLElement) {
  return parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
}

/** Absolute page offset the section should come to rest at. */
function restingOffset(target: HTMLElement) {
  return (
    window.scrollY + target.getBoundingClientRect().top - headerMargin(target)
  );
}

/** How far the section currently sits from where it should end up. */
function distanceFromRest(target: HTMLElement) {
  return Math.abs(target.getBoundingClientRect().top - headerMargin(target));
}

function scrollToForm() {
  const target = document.getElementById(RFP_FORM_ID);
  if (!target) return;

  window.scrollTo({top: restingOffset(target), behavior: "smooth"});

  // Re-measure and correct once things settle. This covers two cases: smooth
  // scrolling being stalled or ignored (reduced-motion, embedded webviews,
  // automated browsers), and the page growing after the first measurement,
  // which happens on client-side navigation while images lay out.
  window.setTimeout(() => {
    const current = document.getElementById(RFP_FORM_ID);
    if (!current) return;

    // Measured in both directions: the page can end up short of the form, or
    // past it when the browser's own #fragment jump fires against a layout
    // that then shifts.
    if (distanceFromRest(current) > SETTLED_WITHIN_PX) {
      window.scrollTo({top: restingOffset(current), behavior: "auto"});
    }
    // Focus last, once the position has settled, so keyboard and screen
    // reader users continue from the form instead of the top of the page.
    current.focus({preventScroll: true});
  }, 700);
}

type RfpLinkProps = {
  className?: string;
  children: React.ReactNode;
  /** Extra work on click, e.g. closing the mobile menu. */
  onNavigate?: () => void;
};

/**
 * Links to the contact form and scrolls to it, without putting a #fragment
 * in the address bar. When already on /contact it scrolls in place; from any
 * other page it navigates and the contact page picks the intent up on mount.
 */
export function RfpLink({className, children, onNavigate}: RfpLinkProps) {
  const pathname = usePathname();

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    onNavigate?.();

    // Let modifier-clicks open a new tab as the user expects.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) {
      return;
    }

    if (pathname === CONTACT_PATH) {
      event.preventDefault();
      scrollToForm();
      return;
    }

    sessionStorage.setItem(SCROLL_FLAG, "1");
  }

  return (
    <Link href={CONTACT_PATH} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}

/** Mounted on the contact page: scrolls to the form when arriving via RfpLink. */
export function ScrollToRfpOnArrival() {
  useEffect(() => {
    const arrivedViaLink = sessionStorage.getItem(SCROLL_FLAG) === "1";
    // Older links and bookmarks still point at /contact#contact-form.
    const arrivedViaHash = window.location.hash === `#${RFP_FORM_ID}`;
    if (!arrivedViaLink && !arrivedViaHash) return;

    sessionStorage.removeItem(SCROLL_FLAG);

    if (arrivedViaHash) {
      // Strip the fragment so the address bar matches the rest of the site.
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
    }

    // Give the incoming page a moment to lay out before measuring: on a
    // client-side navigation the document is still growing, and scrolling
    // too early lands far short of the form.
    //
    // Deliberately not cleared on unmount — React re-runs effects in
    // development, and a cleanup here would cancel the only scheduled scroll
    // while the flag has already been consumed.
    window.setTimeout(scrollToForm, 250);
  }, []);

  return null;
}
