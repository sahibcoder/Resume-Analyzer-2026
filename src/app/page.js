import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustedCompanies from "@/components/TrustedCompanies";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      {/* <TrustedCompanies /> */}
      <Features />
      <HowItWorks />
      {/* <Pricing /> */}
      <Testimonials />
      <FAQ />
      {/* <CTA /> */}
      <Footer />
    </div>
  );
}
