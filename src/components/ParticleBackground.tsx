import { useTheme } from "@/components/ThemeProvider";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useState } from "react";
import { loadSlim } from "@tsparticles/slim";

export const ParticleBackground = () => {
  const [init, setInit] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) return null;

  const isDark = theme === "dark";

  return (
    <div className="fixed inset-0 -z-10">
      {/* Dark Particles */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          isDark ? "opacity-100" : "opacity-0"
        }`}
      >
        <Particles
          id="particles-dark"
          options={{
            fullScreen: { enable: false },
            background: { color: "#0d0d0d" },
            particles: {
              number: { value: 80, density: { enable: true, width: 800, height: 800 } },
              color: { value: ["#00ffff", "#8b5cf6", "#06b6d4"] },
              size: { value: { min: 1, max: 4 } },
              move: { enable: true, speed: 1, outModes: { default: "out" } },
              links: {
                enable: true,
                distance: 150,
                color: "#38bdf8",
                opacity: 0.4,
                width: 1,
              },
              opacity: { value: 0.7 },
            },
            interactivity: {
              events: {
                onHover: { enable: true, mode: "repulse" },
                onClick: { enable: true, mode: "push" },
              },
              modes: { repulse: { distance: 100 }, push: { quantity: 4 } },
            },
          }}
        />
      </div>

      {/* Light Particles */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          !isDark ? "opacity-100" : "opacity-0"
        }`}
      >
        <Particles
          id="particles-light"
          options={{
            fullScreen: { enable: false },
            background: { color: "#ffffff" },
            particles: {
              number: { value: 60, density: { enable: true, width: 800, height: 800 } },
              color: { value: ["#f59e0b", "#3b82f6", "#10b981"] },
              size: { value: { min: 1, max: 3 } },
              move: { enable: true, speed: 0.6, outModes: { default: "out" } },
              links: {
                enable: true,
                distance: 150,
                color: "#9ca3af",
                opacity: 0.4,
                width: 1,
              },
              opacity: { value: 0.7 },
            },
            interactivity: {
              events: {
                onHover: { enable: true, mode: "repulse" },
                onClick: { enable: true, mode: "push" },
              },
              modes: { repulse: { distance: 100 }, push: { quantity: 4 } },
            },
          }}
        />
      </div>
    </div>
  );
};
