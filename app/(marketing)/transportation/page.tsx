import Image from "next/image";
import Link from "next/link";

export default function TransportationPage() {
  return (
    <div className="w-full">
      <section className="relative flex min-h-[40vh] w-full items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        <Image
          src="https://picsum.photos/seed/transport-pc/1920/700"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-slate-900/55" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl font-bold sm:text-5xl">Transportation</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-100">
            Private transfers, airport meet-and-greet, and group movement coordinated end to end.
          </p>
          <Link
            href="/"
            className="mt-8 inline-block rounded-md bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
}
