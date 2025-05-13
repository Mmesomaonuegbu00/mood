import Features from "@/components/Control/Control";
import CallToAction from "@/components/Frames/Frames";
import Hero from "@/components/Hero/Hero";
import HowItWorks from "@/components/HowItWorks/HowItWorks";
import Footer from '@/components/Footer/Footer';
import ResponsiveNav from "@/components/Navbar/ResponsiveNav";

export default function Home() {

  
  return (
    <div>
      <ResponsiveNav/>
      <Hero />
      <Features />
      <HowItWorks/>
      <CallToAction/>
      <Footer/>
    </div>
  );
}


