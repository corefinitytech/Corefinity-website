import { MapPin, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  { label: "About Us", href: "#" },
  { label: "Our Work", href: "#" },
  { label: "Blog & Insights", href: "#" },
];

const services = [
  { label: "Web Applications", href: "#" },
  { label: "Mobile Applications", href: "#" },
  { label: "AI Solutions", href: "#" },
  { label: "Cloud & Deployment", href: "#" },
];

const contactInfo = [
  { icon: MapPin, text: "Karachi, Saeedabad, Baldia Town" },
  { icon: Mail, text: "abc@corefinity.site" },
  { icon: Phone, text: "+92 123 456 7890" },
];

export default function Footer() {
  return (
    <footer className="relative pt-8 pb-6 border-t border-[#1e3a5f]/50">
      <div className="absolute inset-0 bg-[#030712]" />

      <div className="relative max-w-[1400px] mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-6">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center mb-2">
              <Image
                src="/images/corefinity-logo.png"
                alt="CoreFinity Logo"
                width={200}
                height={60}
                className="object-contain scale-125"
                priority
              />
            </Link>
            <p className="text-gray-400 text-sm max-w-xs">
              Building scalable web, mobile, and AI tools for startups,
              businesses, and growing teams.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    href={service.href}
                    className="text-gray-400 text-sm hover:text-blue-400 transition-colors"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-start gap-2">
                  <info.icon className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-400 text-sm">{info.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-5 border-t border-[#1e3a5f]/50 mb-6">
          <div>
            <h3 className="text-white font-semibold text-lg mb-1">
              Have a project in mind?
            </h3>
            <p className="text-gray-400 text-sm">
              {"Let's build something great together."}
            </p>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-xl hover:from-blue-500 hover:to-blue-400 transition-all duration-300 shadow-lg shadow-blue-500/25">
            Get Started
          </button>
        </div>

        {/* Copyright */}
        <div className="text-center pt-4 border-t border-[#1e3a5f]/50">
          <p className="text-gray-500 text-sm">
            © 2024 CoreFinity. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
