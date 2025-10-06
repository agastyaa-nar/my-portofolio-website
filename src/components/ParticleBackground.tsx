import { useTheme } from "@/components/ThemeProvider";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useState, useCallback } from "react";
import { loadSlim } from "@tsparticles/slim";

export const ParticleBackground = () => {
  const [init, setInit] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const { theme } = useTheme();

  // Initialize window size
  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    
    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);
    
    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init || windowSize.width === 0) return null;

  const isDark = theme === "dark";
  const isMobile = windowSize.width < 768;
  const isTablet = windowSize.width < 1024;

  // Responsive particle configuration
  const getParticleConfig = useCallback(() => ({
    fullScreen: { enable: false },
    background: { color: "transparent" },
    particles: {
      number: { 
        value: isMobile ? 40 : isTablet ? 60 : 80, 
        density: { 
          enable: true, 
          width: windowSize.width, 
          height: windowSize.height 
        } 
      },
      color: { 
        value: isDark 
          ? ["#00ffff", "#8b5cf6", "#06b6d4"] 
          : ["#f59e0b", "#3b82f6", "#10b981"] 
      },
      size: { 
        value: { 
          min: 1, 
          max: isMobile ? 3 : 4 
        } 
      },
      move: { 
        enable: true, 
        speed: isMobile ? 0.5 : isDark ? 1 : 0.6, 
        outModes: { default: "bounce" } 
      },
      links: {
        enable: true,
        distance: isMobile ? 100 : 150,
        color: isDark ? "#38bdf8" : "#9ca3af",
        opacity: 0.4,
        width: 1,
      },
      opacity: { value: 0.7 },
    },
    interactivity: {
      events: {
        onHover: { 
          enable: !isMobile, 
          mode: "repulse" 
        },
        onClick: { enable: true, mode: "push" },
      },
      modes: { 
        repulse: { distance: 100 }, 
        push: { quantity: 4 } 
      },
    },
  }), [isDark, isMobile, isTablet, windowSize]);

  return (
    <div className="fixed inset-0 -z-10 w-full h-full overflow-hidden">
      <Particles
        id={`particles-${isDark ? 'dark' : 'light'}`}
        options={getParticleConfig()}
        className="w-full h-full"
      />
    </div>
  );
};
