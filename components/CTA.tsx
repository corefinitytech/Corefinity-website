import Image from "next/image";
import Button from "./Button";

export default function CTA() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-[#030712]" />

      <div className="relative max-w-[1400px] mx-auto px-6">
        <div className="relative overflow-hidden rounded-3xl bg-[#030712] border border-blue-500/30">
          {/* Background Illustration */}
          <div className="absolute inset-0 opacity-90">
            <Image
              src="/images/digital-solution-bg.svg"
              alt="Digital solutions background"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>

          {/* Color overlays to match reference: top/bottom #347BD7, center #0E112A */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,_#347BD7_0%,_#0E112A_50%,_#347BD7_100%)] opacity-60 mix-blend-screen pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(14,17,42,0.45)_0%,_rgba(14,17,42,0.78)_52%,_rgba(3,7,18,0.9)_100%)] pointer-events-none" />

          {/* Background Pattern */}
          <div className="absolute inset-0 grid-pattern opacity-30" />

          {/* Glow Effects */}
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl" />

          <div className="relative py-16 px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Build Scalable Digital
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300">
                Solutions with Corefinity
              </span>
            </h2>

            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              We help startups, businesses, and enterprises design, develop, and
              deploy secure web, mobile, and AI solutions tailored to real-world
              needs.
            </p>

            <Button>Start Your Project</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
