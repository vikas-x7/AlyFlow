import Link from 'next/link';

const navLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'Why Alyflow', href: '/#about' },
  { label: 'Stats', href: '/#stats' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Login', href: '/login' },
];

export const Footer = () => {
  return (
    <footer className="w-full bg-white text-black px-4 sm:px-6 lg:px-15 py-14 sm:py-16 border-t border-black/10 font-gothic">
      <div className="w-full  mx-auto flex flex-col gap-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2 w-fit">
              <img src="/images/alylogo.jpg" alt="" className="w-6 h-6 p-1 bg-black rounded-[3px]" />
              <span className="text-[17px] font-bold -tracking-[0.5px] text-black">Alyflow</span>
            </Link>

            <p className="text-[13px] sm:text-sm text-black/60 leading-relaxed mt-4">Design, connect and organize every idea in one infinite canvas.</p>

            <Link href="/canvas" className="mt-6 w-fit inline-flex items-center gap-2 bg-[#171717] text-white rounded-full px-5 py-2.5 text-sm font-medium transition hover:bg-black/80">
              Open canvas
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </Link>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-black/60 -tracking-[0.75px]">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className="hover:text-black transition-colors duration-200">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-t border-black/5 pt-6">
          <p className="text-xs sm:text-[13px] text-black/40">© {new Date().getFullYear()} Alyflow. All rights reserved.</p>
          <p className="text-xs sm:text-[13px] text-black/40">Built for visual thinkers.</p>
        </div>
      </div>
    </footer>
  );
};
