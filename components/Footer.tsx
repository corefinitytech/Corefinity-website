import { MapPin, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";

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
  { icon: MapPin, text: "Air University, AUBIC, E8 Islamabad" },
  { icon: Mail, text: "abc@corefinity.site" },
  { icon: Phone, text: "+92 123 456 7890" },
];

const socials = [
  { name: "Facebook", href: "#", icon: "/images/Facebook.svg" },
  { name: "Twitter", href: "#", icon: "/images/Twitter.svg" },
  { name: "LinkedIn", href: "#", icon: "/images/Linkedin.svg" },
  { name: "Discord", href: "#", icon: "/images/Discord.svg" },
  { name: "YouTube", href: "#", icon: "/images/Youtube.svg" },
];

export default function Footer() {
  return (
    <footer className="relative pt-10 pb-10 border-t border-[#1e3a5f]/50 overflow-hidden">
      <div className="absolute inset-0 bg-[#030712]" />

      <div className="relative max-w-[1400px] mx-auto px-6">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 md:gap-12 items-start mb-10">
          {/* Left column: logo, blurb, links */}
          <div className="space-y-8">
            <div className="space-y-3">
              <Link href="/" className="inline-flex items-center">
                <Image
                  src="/images/coreFinity-logo.svg"
                  alt="CoreFinity Logo"
                  width={200}
                  height={60}
                  className="object-contain brightness-[1.2] contrast-[1.1]"
                  priority
                />
              </Link>
              <p className="text-gray-300 text-sm max-w-lg leading-relaxed">
                Building scalable web, mobile, and AI solutions for startups, businesses, and enterprises.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="text-gray-400 text-sm hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Services</h4>
                <ul className="space-y-3">
                  {services.map((service, index) => (
                    <li key={index}>
                      <Link
                        href={service.href}
                        className="text-gray-400 text-sm hover:text-white transition-colors"
                      >
                        {service.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Contact</h4>
                <ul className="space-y-3">
                  {contactInfo.map((info, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <info.icon className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-400 text-sm leading-relaxed">{info.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right column: map panel with CTA */}
          <div className="relative w-full h-full">
            <div className="relative h-full min-h-[220px] sm:min-h-[360px] rounded-2xl overflow-hidden border border-[#1e3a5f]/60 bg-[#0b1124] shadow-[0_20px_60px_-24px_rgba(0,0,0,0.55)]">
              {/* Live Google Map */}
              <iframe
                title="CoreFinity Location"
                src="https://www.google.com/maps?q=Air+University+Islamabad&output=embed"
                className="absolute inset-0 w-full h-full"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0b1124]/70 via-[#0c1833]/65 to-[#0f2f64]/50 pointer-events-none" />

              <div className="relative h-full flex flex-col items-center justify-center gap-4 text-white text-lg font-medium tracking-wide px-4 py-6 text-center">
                <span className="text-base sm:text-lg font-semibold">MAPS</span>
                <Link
                  href="https://maps.google.com?q=Air+University+Islamabad"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="px-5 py-2 rounded-md shadow-lg hover:-translate-y-0.5 transition-transform">Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#1e3a5f]/50">
          <p className="text-gray-500 text-sm">© 2025 Corefinity. All rights reserved.</p>
          <div className="flex items-center gap-3">
            {socials.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                className="w-10 h-10 rounded-full border border-[#1e3a5f]/70 bg-white/5 flex items-center justify-center hover:border-blue-400 hover:bg-blue-500/10 transition-colors"
                aria-label={social.name}
              >
                <Image src={social.icon} alt={social.name} width={18} height={18} className="object-contain" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
