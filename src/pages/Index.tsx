import { Navigation } from "@/components/Navigation";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { TechStack } from "@/components/TechStack";
import { Certifications } from "@/components/Certifications";
import { Connect } from "@/components/Connect";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ParticleBackground } from "@/components/ParticleBackground"; 

const Index = () => {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="relative min-h-screen">
        {/* Background Particles */}
        <ParticleBackground />

        {/* Konten Utama */}
        <div className="relative z-10">
          <Navigation />
          <main className="pt-16">
            <About />
            <Experience />
            <Projects />
            <TechStack />
            <Certifications />
            <Connect />
            <Footer />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;
