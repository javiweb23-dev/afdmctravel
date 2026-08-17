"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & {digest?: string};
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-20">
      <div className="max-w-lg rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-lg">
        <h1 className="text-2xl font-bold text-[#072b52]">
          Something went wrong
        </h1>
        <p className="mt-4 text-slate-600">
          An unexpected error occurred. Please try again, or contact us at{" "}
          <a
            href="mailto:director@afdmctravel.com"
            className="font-semibold text-[#072b52] underline-offset-2 hover:underline"
          >
            director@afdmctravel.com
          </a>
          .
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 inline-flex rounded-lg bg-[#072b52] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#05233f]"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
