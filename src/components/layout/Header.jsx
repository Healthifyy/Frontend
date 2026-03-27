import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, Menu, X } from "lucide-react";
import clsx from "clsx";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "How It Works", path: "/#how" }
  ];

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 w-full bg-white transition-shadow duration-200 border-b border-[#e2e8f0] h-[64px]",
        scrolled && "shadow-[0_1px_8px_rgba(0,0,0,0.08)]"
      )}
    >
      <div className="h-full px-4 md:px-6 lg:px-8 mx-auto max-w-7xl flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
          <Heart className="w-5 h-5 text-primary fill-current" />
          <span className="font-serif font-semibold text-[20px] text-[#0f172a]">
            Healthify
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={clsx(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive(link.path) && link.path !== "/#how" 
                  ? "text-primary" 
                  : "text-[#64748b]"
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center gap-3 ml-2">
            <Link
              to="/check"
              className="bg-primary text-white rounded-full px-4 py-2 text-sm font-medium transition ease-in-out hover:brightness-95 active:scale-95"
            >
              Check Symptoms
            </Link>
            <Link
              to="/worker"
              className="border border-primary text-primary rounded-full px-4 py-2 text-sm font-medium transition ease-in-out hover:bg-primary/5 active:scale-95"
            >
              Worker Login
            </Link>
          </div>
        </nav>

        {/* Mobile Hamburger Icon */}
        <button
          className="md:hidden p-2 -mr-2 text-[#0f172a]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={clsx(
          "md:hidden absolute top-[64px] left-0 right-0 bg-white border-b border-[#e2e8f0] shadow-md transition-all duration-300 overflow-hidden",
          mobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-4 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={clsx(
                "font-medium text-lg",
                isActive(link.path) && link.path !== "/#how" 
                  ? "text-primary" 
                  : "text-[#64748b]"
              )}
              onClick={closeMenu}
            >
              {link.name}
            </Link>
          ))}
          <hr className="border-[#e2e8f0]" />
          <Link
            to="/check"
            className="bg-primary text-white rounded-full px-4 py-3 text-center font-medium"
            onClick={closeMenu}
          >
            Check Symptoms
          </Link>
          <Link
            to="/worker"
            className="border border-primary text-primary rounded-full px-4 py-3 text-center font-medium"
            onClick={closeMenu}
          >
            Worker Login
          </Link>
        </div>
      </div>
    </header>
  );
}
