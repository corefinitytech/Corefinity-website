import {
  Facebook,
  Linkedin,
  Twitter,
  Github,
  Dribbble,
  Instagram,
} from "lucide-react";

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Dribbble, href: "#", label: "Dribbble" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export default function Connect() {
  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-[#030712]" />

      <div className="relative max-w-[1400px] mx-auto px-6">
        <div className="text-center">
          {/* Social Icons */}
          <div className="flex items-center justify-center gap-4 mb-8">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-full bg-[#0a1628] border border-[#1e3a5f] flex items-center justify-center hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300"
              >
                <social.icon className="w-5 h-5 text-gray-400 hover:text-blue-400" />
              </a>
            ))}
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Connect with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              Corefinity
            </span>
          </h2>

          <p className="text-gray-400 max-w-xl mx-auto">
            Follow us for insights on technology, product development, AI
            solutions, and our latest projects.
          </p>
        </div>
      </div>
    </section>
  );
}
