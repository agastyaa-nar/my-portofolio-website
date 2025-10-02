import { motion } from "framer-motion";

const techStacks = [
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Vue.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
  { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "Bootstrap", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
  { name: "jQuery", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg" },
];

export const TechStack = () => {
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
        <div className="flex animate-scroll-left w-max gap-8 sm:gap-10 md:gap-12">
          {[...Array(2)].map((_, loopIndex) => (
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
                               hover:drop-shadow-[0_0_20px_rgba(139,92,246,0.9)]
                               dark:hover:drop-shadow-[0_0_25px_rgba(168,85,247,1)]"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Gradient mask kiri */}
        <div className="absolute top-0 left-0 w-16 sm:w-20 md:w-24 h-full bg-gradient-to-r from-background to-transparent pointer-events-none z-20" />
        {/* Gradient mask kanan */}
        <div className="absolute top-0 right-0 w-16 sm:w-20 md:w-24 h-full bg-gradient-to-l from-background to-transparent pointer-events-none z-20" />
      </div>
    </section>
  );
};