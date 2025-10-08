import { motion, easeOut } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const techLogos: Record<string, string> = {
  React: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  PostgreSQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  Stripe: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/stripe.svg",
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  WebSocket: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/socketdotio.svg",
  MongoDB: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  "Vue.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
  Firebase: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  D3: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/d3js/d3js-original.svg",
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  FastAPI: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  Redis: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  RabbitMQ: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rabbitmq/rabbitmq-original.svg",
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "Hapi.js": "https://www.svgrepo.com/show/353857/hapi.svg",
  Supabase: "/logos/supabase.png",
  Zod: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/zod.svg", 
  Recharts: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/recharts.svg",
  "shadcn/ui": "/logos/shadcn.png",
  TypeScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  jQuery: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg",
  CSS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  HTML: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  Bootstrap: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  Vite: "https://vitejs.dev/logo.svg",
  PHP: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  Docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  JWT: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/jsonwebtokens.svg",
};

const projects = [
  {
    title: "Arch Store",
    description:
      "Arch Store is a modern and scalable e-commerce platform built with React (Vite + Tailwind CSS) for a fast, responsive frontend and PHP (PDO + JWT) backend connected to a PostgreSQL database. Designed with a modular architecture and clean REST API, it enables smooth product management, secure authentication, and real-time order tracking.",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "PHP", "PostgreSQL", "Docker", "JWT"],
    demo: "https://narr-online-store.vercel.app/",
    github: "https://github.com/agastyaa-nar/online-store",
    image: "/projects/ArchStore.png",
  },
  {
    title: "Study Tracker App",
    description:
      "Developed a web-based application that helps students track study activities and academic progress. Integrated IBM Granite AI for natural language processing, activity summarization, productivity pattern detection, and personalized study recommendations. Designed an interactive dashboard with charts, progress tracking, and calendar integration.",
    tech: ["React", "Supabase", "PostgreSQL", "Zod", "shadcn/ui", "TypeScript", "Next.js", "Vite", "Tailwind CSS"],
    demo: "https://study-mate-ai-one.vercel.app/",
    github: "https://github.com/agastyaa-nar/StudyMate-AI",
    image: "/projects/StudyTracker.png",
  },
  {
    title: "Notes App Back-End",
    description:
      "A back-end service for a note-taking application, designed with a focus on scalability, reliability, and clean code practices. The system provides RESTful APIs for managing notes, user authentication, and secure data handling.",
    tech: ["Node.js", "Hapi.js", "JavaScript", "PostgreSQL", "Redis", "RabbitMQ"],
    demo: "https://github.com/agastyaa-nar/notes-app-back-end",
    github: "https://github.com/agastyaa-nar/notes-app-back-end",
    image: "/projects/Notes.png",
  },
  {
    title: "Open Music API",
    description:
      "A back-end system for managing digital music collections, playlists, and collaborations. Supports authentication, playlist sharing, caching with Redis for performance, and an export service via RabbitMQ.",
    tech: ["Node.js", "Hapi.js", "PostgreSQL", "RabbitMQ", "Redis"],
    demo: "https://github.com/agastyaa-nar/openmusic-api",
    github: "https://github.com/agastyaa-nar/openmusic-api",
    image: "/projects/Music.png",
  },
  {
    title: "Movie Web Database",
    description:
      "Web Movie DB is designed as a lightweight movie database search engine. Users can search movies by keyword, browse results in card format, and view detailed information such as genre, director, actors, and plot using a modal dialog.",
    tech: ["jQuery", "Bootstrap", "HTML", "JavaScript"],
    demo: "https://movie-web-db.vercel.app/",
    github: "https://github.com/agastyaa-nar/movie-web-db",
    image: "/projects/Movie.png",
  },
];

// Variants untuk animasi
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut }, // pakai easing bawaan
  },
};


export const Projects = () => {
  return (
    <section id="projects" className="py-16 sm:py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }} // retrigger setiap masuk viewport
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 neon-text">
            Featured Projects
          </h2>
          <p className="text-muted-foreground text-lg">
            Some of my recent work and side projects
          </p>
        </motion.div>

        {/* Grid layout dengan stagger */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }} // retrigger tiap masuk
          className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-card border border-border rounded-2xl overflow-hidden 
                         min-h-[600px] sm:min-h-[650px] flex flex-col hover:glow-magenta transition-all dark:hover:glow-cyan"
            >
              {/* Thumbnail */}
              <div className="h-48 sm:h-56 w-full overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-contain transition-transform duration-500 hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6 flex-1 flex flex-col">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 text-foreground">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 flex-1 text-sm sm:text-base leading-relaxed">
                  {project.description}
                </p>

                {/* Tech logos */}
                <div className="flex flex-wrap gap-3 sm:gap-4 mb-4 sm:mb-6">
                  {project.tech.map((tech) => (
                    <img
                      key={tech}
                      src={techLogos[tech]}
                      alt={tech}
                      title={tech}
                      className="w-6 h-6 sm:w-8 sm:h-8 object-contain hover:scale-110 transition-transform"
                    />
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-auto">
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 sm:px-5 py-3 
                               bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all text-sm sm:text-base"
                  >
                    <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                    Demo
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 sm:px-5 py-3 
                               border-2 border-border rounded-lg hover:bg-muted transition-all text-sm sm:text-base"
                  >
                    <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                    Repo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
