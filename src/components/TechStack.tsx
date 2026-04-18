import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const techStacks = [
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Bootstrap", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
  { name: "jQuery", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg" },
];

export const TechStack = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [copyWidth, setCopyWidth] = useState(0);

  useEffect(() => {
    let rafId: number;
    let timer: ReturnType<typeof setTimeout>;

    const measure = () => {
      const track = trackRef.current;
      if (!track || track.children.length < 2) return;
      // Distance from start of copy[0] to start of copy[1] = exact pixel offset for seamless loop
      setCopyWidth(
        (track.children[1] as HTMLElement).offsetLeft -
        (track.children[0] as HTMLElement).offsetLeft
      );
    };

    rafId = requestAnimationFrame(measure);

    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => { rafId = requestAnimationFrame(measure); }, 150);
    };

    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      clearTimeout(timer);
    };
  }, []);

  // Always enough copies to fill 2× the viewport — auto-adapts when tech stacks are added
  const copies = copyWidth > 0
    ? Math.max(4, Math.ceil((window.innerWidth * 2) / copyWidth) + 2)
    : 4;

  return (
    <section className="py-16 sm:py-20 border-y border-border bg-muted/30 relative">
      {/* Title */}
      <div className="container mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold neon-text"
        >
          Tech Stack
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground mt-4 text-lg"
        >
          Tools & technologies I often use to build projects
        </motion.p>
      </div>

      {/* Infinite scroll logos */}
      <div className="relative overflow-hidden -my-8 py-16">
        {/*
         * key={copyWidth}: restarts animation cleanly whenever the measured
         * copy width changes (e.g. on viewport resize across breakpoints)
         */}
        <motion.div
          key={copyWidth}
          ref={trackRef}
          className="flex w-max gap-8 sm:gap-10 md:gap-12"
          animate={copyWidth > 0 ? { x: [0, -copyWidth] } : {}}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          {[...Array(copies)].map((_, loopIndex) => (
            <div key={loopIndex} className="flex gap-8 sm:gap-10 md:gap-12 px-4 sm:px-6">
              {techStacks.map((tech, index) => (
                <div
                  key={`${loopIndex}-${index}`}
                  className="flex-shrink-0 flex items-center justify-center"
                  title={tech.name}
                >
                  <img
                    src={tech.logo}
                    alt={tech.name}
                    className="h-10 sm:h-12 md:h-14 lg:h-16 object-contain transition-transform duration-300 hover:scale-125
                               hover:drop-shadow-[0_0_10px_magenta] dark:hover:drop-shadow-[0_0_10px_cyan]"
                  />
                </div>
              ))}
            </div>
          ))}
        </motion.div>

        {/* Gradient mask kiri */}
        <div className="absolute top-0 left-0 w-16 sm:w-20 md:w-24 h-full bg-gradient-to-r from-background to-transparent pointer-events-none z-20" />
        {/* Gradient mask kanan */}
        <div className="absolute top-0 right-0 w-16 sm:w-20 md:w-24 h-full bg-gradient-to-l from-background to-transparent pointer-events-none z-20" />
      </div>
    </section>
  );
};
