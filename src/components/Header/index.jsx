"use client";

import React, { useState, useEffect } from "react";
import TopBar from "./TopBar";
import MainHeader from "./MainHeader";
import MobileSidebar from "./MobileSidebar";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolledEnough, setScrolledEnough] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = 10; // Minimum scroll distance to trigger hide/show
      
      // Determine if scrolled enough to adjust TopBar position
      if (currentScrollY > 40) {
        setScrolledEnough(true);
      } else {
        setScrolledEnough(false);
      }

      // Hide header when scrolling down, show when scrolling up
      // Only trigger if scroll difference is significant enough
      if (Math.abs(currentScrollY - lastScrollY) > scrollThreshold) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down and past initial threshold
          setShowHeader(false);
        } else if (currentScrollY < lastScrollY) {
          // Scrolling up
          setShowHeader(true);
        }
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 w-full bg-[#1f1b1a] shadow-lg border-b-2 border-[var(--color-light-blue)] transition-transform duration-300 ease-in-out ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <TopBar scrolledEnough={scrolledEnough} />
        <MainHeader setIsMenuOpen={setIsMenuOpen} />
      </header>
      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-20 md:h-24 lg:h-28" />
      <MobileSidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </>
  );
}
