"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { t } from "@/i18n";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "#products", label: "Products" },
  { href: "#trade-types", label: "Trade Types" },
  { href: "#portfolio", label: "Portfolio" },
];

function Logo() {
  return (
    <a href="#hero" className="flex items-center gap-2 group">
      <motion.div 
        className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center"
        whileHover={{ scale: 1.05, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-bg-primary">
          <path
            d="M7 10H17L14 7M7 14H17L14 17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
      <span className="font-bold text-lg tracking-tight text-fg-primary group-hover:text-accent-primary transition-colors">
        BARTER
      </span>
    </a>
  );
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      onNavigate?.();
    }
  };

  return (
    <>
      {navLinks.map((link) => (
        <motion.a
          key={link.href}
          href={link.href}
          onClick={(e) => handleClick(e, link.href)}
          className="relative text-sm font-medium text-fg-secondary hover:text-fg-primary transition-colors py-2"
          whileHover="hover"
        >
          {link.label}
          <motion.span
            className="absolute bottom-0 left-0 h-0.5 bg-accent-primary"
            initial={{ width: 0 }}
            variants={{
              hover: { width: "100%" },
            }}
            transition={{ duration: 0.2 }}
          />
        </motion.a>
      ))}
    </>
  );
}

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleApply = () => {
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-bg-primary/80 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Menu panel */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-bg-secondary border-l border-border-subtle z-50 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border-subtle">
              <span className="text-sm text-fg-muted font-mono">Menu</span>
              <button
                onClick={onClose}
                className="flex items-center gap-2 text-sm text-fg-secondary hover:text-fg-primary transition-colors"
              >
                <span>Close</span>
                <kbd className="px-2 py-0.5 text-xs bg-bg-tertiary rounded border border-border-subtle">
                  ESC
                </kbd>
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 p-6">
              <ul className="space-y-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                        onClose();
                      }}
                      className="block py-4 text-2xl font-semibold text-fg-primary hover:text-accent-primary transition-colors border-b border-border-subtle"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Footer */}
            <div className="p-6 border-t border-border-subtle">
              <Button onClick={handleApply} className="w-full" size="lg">
                Apply for a Trade
              </Button>
              <p className="mt-4 text-center text-sm text-fg-muted">
                {t.footer.tagline}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function HamburgerButton({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 text-fg-primary hover:text-accent-primary transition-colors lg:hidden"
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <motion.span
        className="w-5 h-0.5 bg-current rounded-full"
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 4 : 0,
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="w-5 h-0.5 bg-current rounded-full"
        animate={{
          opacity: isOpen ? 0 : 1,
          scaleX: isOpen ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="w-5 h-0.5 bg-current rounded-full"
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? -4 : 0,
        }}
        transition={{ duration: 0.2 }}
      />
    </button>
  );
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // Show/hide based on scroll direction
    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }

    // Background on scroll
    setIsScrolled(latest > 50);
  });

  const handleApply = () => {
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isScrolled ? "bg-bg-primary/90 backdrop-blur-md border-b border-border-subtle" : ""
        }`}
        initial={{ y: -100 }}
        animate={{ y: isHidden ? -100 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Progress bar */}
        <ScrollProgress />

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Logo />

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8">
              <NavLinks />
            </nav>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-4">
              <Button
                onClick={handleApply}
                size="sm"
                className="hidden sm:flex"
              >
                Apply
              </Button>
              <HamburgerButton
                isOpen={isMenuOpen}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
            </div>
          </div>
        </div>
      </motion.header>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-accent-primary to-accent-secondary origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

