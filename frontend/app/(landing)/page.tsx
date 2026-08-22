import FeaturePreview from "@/components/landing/FeaturePreview";
import Features from "@/components/landing/Features";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/ui/Footer";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Navbar from "@/components/landing/ui/Navbar";
import UseCases from "@/components/landing/UseCases";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <Hero />
      <FeaturePreview />
      <Features />
      <HowItWorks />
      <UseCases />
      <FinalCTA />
      <Footer />
    </div>
  );
}
