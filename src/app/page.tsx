import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Projects from "@/components/Projects";
import Process from "@/components/Process";
import Experience from "@/components/Experience";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Projects />
        <Process />
        <Experience />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
