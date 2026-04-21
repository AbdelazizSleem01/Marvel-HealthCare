"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { RiSunLine, RiMoonLine, RiMenuLine, RiCloseLine, RiHomeLine, RiBriefcaseLine, RiStackLine, RiInformationLine, RiMailLine, RiArrowRightLine } from "react-icons/ri";
import { navItems } from "@/data";

const navIcons: Record<string, React.ReactNode> = {
  "/": <RiHomeLine size={16} />,
  "/work": <RiBriefcaseLine size={16} />,
  "/products": <RiStackLine size={16} />,
  "/about": <RiInformationLine size={16} />,
  "/contact": <RiMailLine size={16} />,
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
            ? "bg-surface-light/90 dark:bg-surface-dark/90 backdrop-blur-md shadow-lg py-2"
            : "bg-transparent py-3"
          }`}
      >
        <div className="container-custom flex items-center justify-between h-14">
          {/* Logo - Smaller */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <Image
              src="/Logo.png"
              alt="Marvel Group Logo"
              width={80}
              height={60}
              className="object-contain"
            />
          </Link>

          {/* Desktop Nav with Icons */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${pathname === item.href
                    ? "text-primary-500 bg-primary-500/10"
                    : "text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
              >
                {navIcons[item.href]}
                {item.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-200"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <RiSunLine size={16} /> : <RiMoonLine size={16} />}
              </button>
            )}

            {/* CTA with Icon */}
            <Link
              href="/contact"
              className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/25"
            >
              Get Started
              <RiArrowRightLine size={16} />
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center text-muted-dark hover:bg-white/10 transition-all"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <RiCloseLine size={18} /> : <RiMenuLine size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        <div className="absolute inset-0 bg-bg-light/95 dark:bg-bg-dark/95 backdrop-blur-xl" onClick={() => setMobileOpen(false)} />
        <div
          className={`absolute top-0 right-0 h-full w-72 glass-light dark:glass-dark p-8 pt-24 flex flex-col gap-2 transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${pathname === item.href
                  ? "text-primary-500 bg-primary-500/10"
                  : "text-text-light dark:text-text-dark hover:text-primary-500 hover:bg-black/5 dark:hover:bg-white/5"
                }`}
            >
              {navIcons[item.href]}
              {item.label}
            </Link>
          ))}
          <div className="mt-4">
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary-500 text-white font-medium"
            >
              Get Started
              <RiArrowRightLine size={18} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
