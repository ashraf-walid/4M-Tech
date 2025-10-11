"use client";

import React, { useState } from "react";
import TopBar from "./TopBar";
import MainHeader from "./MainHeader";
import MobileSidebar from "./MobileSidebar";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full shadow-lg border-b-2 border-[var(--color-lemon)]">
      <TopBar />
      <MainHeader setIsMenuOpen={setIsMenuOpen} />
      <MobileSidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </header>
  );
}
