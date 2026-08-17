import {Link} from "@/i18n/navigation";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-20">
      <div className="max-w-lg rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
          404
        </p>
        <h1 className="mt-4 text-2xl font-bold text-[#072b52]">
          Page not found
        </h1>
        <p className="mt-4 text-slate-600">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-lg bg-[#072b52] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#05233f]"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
