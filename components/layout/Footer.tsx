"use client";
import Link from "next/link";
import Image from "next/image";
import {
  RiLinkedinFill,
  RiTwitterXFill,
  RiInstagramLine,
  RiWhatsappLine,
  RiArrowUpLine,
  RiBuildingLine,
  RiBriefcaseLine,
  RiStackLine,
  RiMailLine,
  RiGraduationCapLine,
  RiPaletteLine,
  RiComputerLine,
  RiRobotLine,
  RiShieldCheckLine,
  RiFileTextLine,
  RiGlobalLine
} from "react-icons/ri";

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const year = new Date().getFullYear();

  const footerLinks = {
    Company: [
      { label: "About Us", href: "/about", icon: RiBuildingLine },
      { label: "Our Work", href: "/work", icon: RiBriefcaseLine },
      { label: "Products", href: "/products", icon: RiStackLine },
      { label: "Contact", href: "/contact", icon: RiMailLine },
    ],
    Services: [
      { label: "Medical Education", href: "/work", icon: RiGraduationCapLine },
      { label: "Creative & Design", href: "/work", icon: RiPaletteLine },
      { label: "Digital Solutions", href: "/products", icon: RiComputerLine },
      { label: "AI & Automation", href: "/products", icon: RiRobotLine },
    ],
    Legal: [
      { label: "Privacy Policy", href: "#", icon: RiShieldCheckLine },
      { label: "Terms of Service", href: "#", icon: RiFileTextLine },
      { label: "Cookie Policy", href: "#", icon: RiGlobalLine },
    ],
  };

  return (
    <footer className="relative bg-surface-light dark:bg-surface-dark border-t p-4 pt-6 border-border-light dark:border-border-dark">
      {/* Gradient top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />

      <div className="container-custom pt-16 pb-8">
        {/* Main footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-12 border-b border-border-light dark:border-border-dark">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Image
                src="/Logo.png"
                alt="Marvel Group Logo"
                width={100}
                height={60}
                className="object-contain"
              />
            </Link>
            <p className="text-muted-light dark:text-muted-dark text-sm leading-relaxed mb-6 max-w-xs">
              A global medical-tech creative & technology group operating across Egypt, UAE, and KSA. Transforming healthcare communication since 2015.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              {[
                { icon: RiLinkedinFill, href: "#", label: "LinkedIn" },
                { icon: RiTwitterXFill, href: "#", label: "X (Twitter)" },
                { icon: RiInstagramLine, href: "#", label: "Instagram" },
                { icon: RiWhatsappLine, href: "https://wa.me/201000000000", label: "WhatsApp" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center text-muted-light dark:text-muted-dark hover:text-primary-500 dark:hover:text-primary-400 hover:bg-primary-500/10 transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="font-display font-semibold text-sm uppercase tracking-widest text-muted-light dark:text-muted-dark mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-primary-500 rounded-full" />
                {group}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-light dark:text-muted-dark hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200 flex items-center gap-2 group"
                      >
                        <IconComponent size={14} className="text-muted-light/50 dark:text-muted-dark/50 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors" />
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <div className="text-xs text-muted-light dark:text-muted-dark flex items-center gap-2">
            <span className="text-secondary-500">©</span>
            {year} Marvel Group. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs text-muted-light dark:text-muted-dark">
              <span className="w-2 h-2 rounded-full bg-secondary-500 animate-pulse" />
              <span className="text-secondary-500">Egypt</span>
              <span className="text-muted-light/30 dark:text-muted-dark/30">·</span>
              <span className="text-secondary-500">UAE</span>
              <span className="text-muted-light/30 dark:text-muted-dark/30">·</span>
              <span className="text-secondary-500">KSA</span>
            </div>
            <button
              onClick={scrollTop}
              className="w-8 h-8 rounded-lg bg-primary-500 hover:bg-primary-600 flex items-center justify-center text-white hover:shadow-lg hover:shadow-primary-500/25 transition-all"
              aria-label="Scroll to top"
            >
              <RiArrowUpLine size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
