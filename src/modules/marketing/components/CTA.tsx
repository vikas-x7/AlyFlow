import Link from "next/link";

export function CTA() {
  return (
    <section className="py-12 text-center">
      <Link href="/canvas" className="inline-flex rounded bg-black px-6 py-2 text-sm font-medium text-white">
        Get started
      </Link>
    </section>
  );
}
