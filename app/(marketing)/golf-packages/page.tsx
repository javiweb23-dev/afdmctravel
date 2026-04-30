import Image from "next/image";
import Link from "next/link";

export default function GolfPackagesPage() {
  return (
    <div className="w-full">
      <section className="relative flex min-h-[40vh] w-full items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        <Image
          src="https://picsum.photos/seed/golf-banner/1920/700"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-emerald-950/55" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl font-bold sm:text-5xl">Golf Packages</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-emerald-50">
            Tee times, resort stays, and curated experiences across Punta Cana&apos;s premier courses.
          </p>
          <Link
            href="/"
            className="mt-8 inline-block rounded-md bg-white px-6 py-3 text-sm font-semibold text-emerald-950 hover:bg-emerald-50"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
}
