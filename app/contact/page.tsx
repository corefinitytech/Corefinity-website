import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import ContactFAQ from "@/components/ContactFAQ";

export default function Contact() {
  return (
    <main className="min-h-screen bg-[#030712] overflow-x-hidden w-full">
      <Navbar />
      <ContactForm />
      <ContactFAQ />
      <Footer />
    </main>
  );
}
