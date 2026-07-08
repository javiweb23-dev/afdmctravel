import Image from "next/image";

type PageHeroProps = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  priority?: boolean;
};

export function PageHero({
  imageSrc,
  imageAlt,
  title,
  subtitle,
  align = "left",
  priority = true,
}: PageHeroProps) {
  const contentClass =
    align === "center"
      ? "max-w-4xl text-center"
      : "max-w-3xl text-white";

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority={priority}
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#05233f]/92 via-[#05233f]/78 to-[#05233f]/40" />
      </div>
      <div
        className={`relative mx-auto grid min-h-[78vh] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8 ${
          align === "center" ? "justify-items-center" : ""
        }`}
      >
        <div className={contentClass}>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-6 text-lg leading-relaxed text-slate-100">{subtitle}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
