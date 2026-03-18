"use client";

import { Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Button from "./Button";
import Tag from "./Tag";

export default function ContactForm() {
  return (
    <section className="pt-32 pb-24 relative">
      <div className="absolute inset-0 bg-[#030712]" />

      <div className="relative max-w-[1400px] mx-auto px-6">
        <div className="border border-gray-700/50 rounded-2xl p-8 lg:p-12 overflow-hidden relative bg-gradient-to-br from-blue-900/10 via-transparent to-transparent">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-transparent pointer-events-none" />
          
          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 flex flex-col justify-center">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Get in touch<br />
                with us today
              </h1>

              <p className="text-gray-400 text-lg max-w-xl">
                Have a project in mind or want to discuss how we can help transform your business? Reach out to our team and let's create something amazing together.
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Send us a message</p>
                    <p className="text-white font-medium">contact@appulus.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Give us a call</p>
                    <p className="text-white font-medium">(414) 850 - 7230</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <label className="absolute -top-2.5 left-4 text-gray-300 text-xs font-medium pointer-events-none">Full name</label>
                  <input
                    type="text"
                    placeholder="John Carter"
                    className="w-full px-4 py-3 bg-[#0a1628]/40 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>
                <div className="relative">
                  <label className="absolute -top-2.5 left-4 text-gray-300 text-xs font-medium pointer-events-none">Email address</label>
                  <input
                    type="email"
                    placeholder="example@yourmail.com"
                    className="w-full px-4 py-3 bg-[#0a1628]/40 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <label className="absolute -top-2.5 left-4 text-gray-300 text-xs font-medium pointer-events-none">Phone number</label>
                  <input
                    type="tel"
                    placeholder="(123) 456 - 7890"
                    className="w-full px-4 py-3 bg-[#0a1628]/40 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>
                <div className="relative">
                  <label className="absolute -top-2.5 left-4 text-gray-300 text-xs font-medium pointer-events-none">Company</label>
                  <input
                    type="text"
                    placeholder="ex. Google"
                    className="w-full px-4 py-3 bg-[#0a1628]/40 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="absolute -top-2.5 left-4 text-gray-300 text-xs font-medium pointer-events-none">Message</label>
                <textarea
                  placeholder="Write your message here..."
                  rows={5}
                  className="w-full px-4 py-3 bg-[#0a1628]/40 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                <Button>Send message</Button>
                <div className="flex gap-3">
                  <a href="#" className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center hover:bg-blue-500/20 transition-colors">
                    <Facebook className="w-5 h-5 text-white" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center hover:bg-blue-500/20 transition-colors">
                    <Twitter className="w-5 h-5 text-white" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center hover:bg-blue-500/20 transition-colors">
                    <Instagram className="w-5 h-5 text-white" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center hover:bg-blue-500/20 transition-colors">
                    <Linkedin className="w-5 h-5 text-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
