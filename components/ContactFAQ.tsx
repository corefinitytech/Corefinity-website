import Tag from "./Tag";
import Accordion from "./Accordion";

const faqItems = [
  {
    question: "What services does CoreFinity offer?",
    answer: "CoreFinity provides comprehensive digital solutions including web platform development, mobile applications, AI solutions, and cloud deployment services. We specialize in building scalable, secure, and high-performance digital products tailored to your business needs.",
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary depending on complexity and scope. A typical web application takes 2-4 months, while mobile apps may take 3-6 months. We provide detailed timelines during the initial consultation phase.",
  },
  {
    question: "Do you offer ongoing support and maintenance?",
    answer: "Yes, we provide comprehensive post-launch support including bug fixes, performance optimization, security updates, and feature enhancements. We offer flexible maintenance packages tailored to your needs.",
  },
  {
    question: "What technologies do you work with?",
    answer: "We work with modern, battle-tested technologies including React, Next.js, Flutter, Python, FastAPI, TensorFlow, AWS, Google Cloud, Docker, and Kubernetes. Our tech stack is carefully selected based on project requirements.",
  },
];

export default function ContactFAQ() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-[#030712]" />

      <div className="relative max-w-[1400px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left - FAQ Accordion */}
          <Accordion items={faqItems} />

          {/* Right - Heading */}
          <div className="flex flex-col justify-center">
            <div className="inline-block mb-6 w-fit">
              <Tag>FAQS</Tag>
            </div>
            <h2 className="text-5xl font-bold text-white mb-6">
              Frequently<br />
              asked questions
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Find answers to common questions about our services, processes, and support. If you need more information, feel free to reach out to our team.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
