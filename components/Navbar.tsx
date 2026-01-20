"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#030712] w-full">
      <div className="max-w-[1400px] mx-auto px-6 w-full">
        <div className="flex items-center justify-between h-24 relative">

          <Link href="/" className="flex items-center">
            <Image 
              src="/images/corefinity-logo.png" 
              alt="CoreFinity Logo"
              width={200}
              height={60}
              className="object-contain brightness-[1.3] contrast-[1.15]"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <Link
              href="#services"
              className="text-gray-300 hover:text-white transition-colors text-base"
            >
              Services
            </Link>
            <Link
              href="#work"
              className="text-gray-300 hover:text-white transition-colors text-base"
            >
              Work
            </Link>
            <Link
              href="#about"
              className="text-gray-300 hover:text-white transition-colors text-base"
            >
              About
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="px-6 py-2.5 border border-gray-600 text-white text-sm font-normal rounded-lg hover:bg-white/5 transition-all duration-300">
              Get a Quote
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#1e3a5f]/50">
            <div className="flex flex-col gap-4">
              <Link
                href="#services"
                className="text-gray-300 hover:text-white transition-colors text-sm"
              >
                Services
              </Link>
              <Link
                href="#work"
                className="text-gray-300 hover:text-white transition-colors text-sm"
              >
                Work
              </Link>
              <Link
                href="#about"
                className="text-gray-300 hover:text-white transition-colors text-sm"
              >
                About
              </Link>
              <button className="px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-medium rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all duration-300 w-fit">
                Get a Quote
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
