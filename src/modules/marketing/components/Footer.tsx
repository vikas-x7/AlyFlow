import { FaXTwitter, FaGithub, FaDiscord, FaLinkedin } from "react-icons/fa6";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-white text-black px-6 py-16 border-t border-black/10 font-gothic">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-10">

        <span className="text-3xl font-semibold tracking-wide text-black">
          Alyflow
        </span>


        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-black/60">
          <Link
            href="#features"
            className="hover:text-black transition-colors duration-200"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="hover:text-black transition-colors duration-200"
          >
            Pricing
          </Link>
          <Link
            href="/changelog"
            className="hover:text-black transition-colors duration-200"
          >
            Changelog
          </Link>
          <Link
            href="/docs"
            className="hover:text-black transition-colors duration-200"
          >
            Documentation
          </Link>
          <Link
            href="/blog"
            className="hover:text-black transition-colors duration-200"
          >
            Blog
          </Link>
          <Link
            href="/privacy"
            className="hover:text-black transition-colors duration-200"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="hover:text-black transition-colors duration-200"
          >
            Terms of Service
          </Link>
        </nav>


        <p className="text-sm text-black/40">
          © {new Date().getFullYear()} Alyflow. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
