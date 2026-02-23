"use client";

import { Zap, TrendingUp, Users, Lightbulb, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import Image from "next/image";

export default function FlexForceCaseStudy() {
  const stats = [
    {
      value: "45%",
      label: "Reduction in scheduling time",
      icon: TrendingUp,
    },
    {
      value: "+38%",
      label: "Improvement in team satisfaction",
      icon: Users,
    },
    {
      value: "$120K",
      label: "Annual cost savings",
      icon: Lightbulb,
    },
    {
      value: "98%",
      label: "Team adoption rate",
      icon: CheckCircle,
    },
  ];

  const problems = [
    "Manual scheduling consumed 20+ hours per week",
    "Frequent scheduling conflicts and double bookings",
    "Poor visibility into team availability",
    "High employee turnover due to frustration",
    "Inability to optimize resource allocation",
    "Compliance risks with labor regulations",
  ];

  const features = [
    {
      title: "Intelligent Scheduling Engine",
      description: "AI-powered algorithm optimizing schedules based on skills, availability, and workload",
    },
    {
      title: "Real-time Collaboration",
      description: "Live updates and instant notifications for all team members",
    },
    {
      title: "Mobile-First Design",
      description: "Responsive interface accessible on all devices",
    },
    {
      title: "Analytics Dashboard",
      description: "Comprehensive insights into team performance and resource utilization",
    },
    {
      title: "Integration Capabilities",
      description: "Seamless integration with existing HR and payroll systems",
    },
    {
      title: "Compliance Automation",
      description: "Automatic checks against labor laws and regulations",
    },
  ];

  const timeline = [
    {
      phase: "Week 1-2",
      title: "Discovery & Planning",
      description: "Mapped existing workflows, interviewed stakeholders, and identified critical pain points",
    },
    {
      phase: "Week 3-4",
      title: "Design & Prototyping",
      description: "Delivered high-fidelity prototypes and conducted usability testing with end users",
    },
    {
      phase: "Month 2",
      title: "Development & Integration",
      description: "Built scheduling engine, notification layer, and HRIS integration with 50 pilot users",
    },
    {
      phase: "Month 3",
      title: "Launch & Scale",
      description: "Full production rollout to 400 employees across 6 sites with 99.8% uptime",
    },
  ];

  return (
    <main className="min-h-screen bg-[#030712] overflow-x-hidden w-full">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-24 relative">
        <div className="absolute inset-0 bg-[#030712]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

        <div className="relative max-w-[1400px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full">
                <Zap className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-blue-400 font-medium">HR Solution</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                FlexForce
              </h1>

              <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                A comprehensive workforce management platform that revolutionized how teams handle scheduling, resource allocation, and team coordination in real-time.
              </p>

              <div className="flex flex-wrap gap-3 pt-4">
                {["Workforce Management", "Scheduling", "Analytics"].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-gray-900/50 border border-gray-700/50 rounded-full text-sm text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-[400px] rounded-2xl overflow-hidden border border-gray-700/50"
            >
              <Image
                src="/images/FlexForce.PNG"
                alt="FlexForce"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent" />
      </div>

      {/* Problem Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[#030712]" />
        <div className="relative max-w-[1400px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <span className="text-blue-400 text-sm font-medium uppercase tracking-wider">01 · The Problem</span>
              <h2 className="text-4xl font-bold text-white mt-4">
                Manual scheduling was consuming valuable resources
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <p className="text-gray-400 text-lg leading-relaxed">
                  The client, a mid-sized tech company with 150+ employees across multiple locations, faced significant challenges with their workforce management. Their HR team spent over 20 hours per week on manual scheduling alone.
                </p>
                <ul className="space-y-3">
                  {problems.map((problem, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 text-gray-400"
                    >
                      <span className="text-blue-400 mt-1">→</span>
                      <span>{problem}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-2xl p-8">
                <h3 className="text-white font-semibold mb-4">Impact</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm">Time spent on scheduling</p>
                    <p className="text-2xl font-bold text-white">20+ hours/week</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Scheduling conflicts per month</p>
                    <p className="text-2xl font-bold text-white">15-20 incidents</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Employee turnover increase</p>
                    <p className="text-2xl font-bold text-white">+12% annually</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent" />
      </div>

      {/* Target Users Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[#030712]" />
        <div className="relative max-w-[1400px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <span className="text-blue-400 text-sm font-medium uppercase tracking-wider">02 · Target Users</span>
              <h2 className="text-4xl font-bold text-white mt-4">
                Designed for three key user groups
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "HR Managers",
                  needs: ["Create and manage schedules", "Track team availability", "Ensure compliance"],
                },
                {
                  title: "Team Leads",
                  needs: ["Real-time team visibility", "Quick schedule adjustments", "Instant notifications"],
                },
                {
                  title: "Employees",
                  needs: ["View personal schedules", "Request time off", "Fair shift distribution"],
                },
              ].map((user, index) => (
                <motion.div
                  key={user.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-gray-900/50 to-gray-900/20 border border-gray-700/50 rounded-2xl p-8 hover:border-blue-500/30 transition-colors"
                >
                  <h3 className="text-white font-semibold text-lg mb-4">{user.title}</h3>
                  <ul className="space-y-3">
                    {user.needs.map((need, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-400 text-sm">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>{need}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent" />
      </div>

      {/* Approach Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[#030712]" />
        <div className="relative max-w-[1400px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <span className="text-blue-400 text-sm font-medium uppercase tracking-wider">03 · Our Approach</span>
              <h2 className="text-4xl font-bold text-white mt-4">
                Six core features that power FlexForce
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-gray-900/50 to-gray-900/20 border border-gray-700/50 rounded-2xl p-8 hover:border-blue-500/30 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                    <Lightbulb className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent" />
      </div>

      {/* Stats Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[#030712]" />
        <div className="relative max-w-[1400px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <span className="text-blue-400 text-sm font-medium uppercase tracking-wider">04 · Results & Impact</span>
              <h2 className="text-4xl font-bold text-white mt-4">
                Measurable outcomes that transformed operations
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-2xl p-8"
                  >
                    <Icon className="w-8 h-8 text-blue-400 mb-4" />
                    <p className="text-4xl font-bold text-white mb-2">{stat.value}</p>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent" />
      </div>

      {/* Timeline Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[#030712]" />
        <div className="relative max-w-[1400px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <span className="text-blue-400 text-sm font-medium uppercase tracking-wider">05 · What Happened</span>
              <h2 className="text-4xl font-bold text-white mt-4">
                From kickoff to launch in 90 days
              </h2>
            </div>

            <div className="space-y-6">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.phase}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-r from-gray-900/50 to-gray-900/20 border border-gray-700/50 rounded-2xl p-8 hover:border-blue-500/30 transition-colors"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-500/10 border border-blue-500/30">
                        <span className="text-blue-400 font-semibold text-sm">{index + 1}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-blue-400 text-sm font-medium mb-1">{item.phase}</p>
                      <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent" />
      </div>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[#030712]" />
        <div className="relative max-w-[1200px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-2xl p-12 text-center space-y-6"
          >
            <h2 className="text-4xl font-bold text-white">
              Ready to transform your operations?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Let's discuss how we can build a custom solution tailored to your organization's unique needs.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Link href="/contact">
                <Button>Start Your Project</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
