import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { Briefcase, GraduationCap, Book, Trophy, Laptop } from "lucide-react";
import { ExperienceModal } from "./ExperienceModal";

const experiences = [
  {
    title: "High School",
    organization: "SMA GIKI 2 Surabaya",
    period: "May 2019  - May 2022",
    description: "Graduated with honors, where I developed my first web projects, explored technologies such as Web Development, Macro Scripting (Lua), and Data Science, and ultimately discovered my passion for coding.",
    icon: Book,
    logo: "/logos/sma.png",
    images: [
      "/experience/sma-1.jpg",
      "/experience/sma-2.jpg",
      "/experience/sma-3.jpg",
    ],
  },
  {
    title: "Bachelor's Degree",
    organization: "Institute of Technology Sepuluh Nopember",
    period: " August 2022 - Present ",
    description: "Mathematic major. Strengthened IT skills through scholarships and certifications, while building leadership and teamwork experience in organizational committees.",
    icon: GraduationCap,
    logo: "/logos/its.png",
    images: [
      "/experience/s1-1.jpg",
      "/experience/s1-2.jpg",
      "/experience/s1-3.jpg",
      "/experience/s1-4.jpg",
      "/experience/s1-5.jpg",
      "/experience/s1-6.jpg",
    ],
  },
  {
    title: "Question Maker Team",
    organization: "ITS Mathematics Olympiad",
    period: "March 2024 - October 2024",
    description: "Served as Head of Elementary Subdivision Question Maker for the 17th OMITS, compiling the problem book with LaTeX, coordinating staff, reviewing problem quality, managing the problem bank, and organizing the online stage through MyITS Classroom.",
    icon: Trophy,
    logo: "/logos/omits.png",
    images: [
      "/experience/omits-1.jpg",
      "/experience/omits-2.jpg",
      "/experience/omits-3.jpg",
    ],
  },
  {
    title: " Laboratory Teaching Assistant",
    organization: "Programming and Visual Computation Laboratory",
    period: "September 2024 - November 2024",
    description: "Instructed students in the fundamentals of Java programming, prepared laboratory worksheets and assignments with LaTeX, evaluated reports, coordinated presentations, and facilitated lab sessions using MyITS Classroom.",
    icon: Laptop,
    logo: "/logos/lab.png",
    images: [
      "/experience/ta-1.jpg",
      "/experience/ta-2.jpg",
      "/experience/ta-3.jpg",
    ],
  },
  {
    title: "Internship",
    organization: "General Election Commission of East Java Province",
    period: "July 2025 - August 2025",
    description: "Conducted sentiment analysis of SIREKAP app reviews on Google Play using text preprocessing and Naive Bayes, created visualizations and concise reports to support KPU's digital service improvements, and prepared strategic recommendations on service quality.",
    icon: Briefcase,
    logo: "/logos/kpu.png",
    images: [
      "/experience/kpu-1.jpg",
      "/experience/kpu-2.jpg",
      "/experience/kpu-3.jpg",
      "/experience/kpu-4.jpg",
    ],
  },
];

const TimelineItem = ({ 
  experience, 
  index, 
  onClick 
}: { 
  experience: typeof experiences[0]; 
  index: number;
  onClick: () => void;
}) => {
  const isLeft = index % 2 === 0;

  return (
    <div className="relative mb-12 sm:mb-16 flex flex-col md:flex-row">
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className={`w-full md:w-5/12 ${isLeft ? "mr-auto md:text-right md:pr-8" : "ml-auto md:text-left md:pl-8"}`}
      >
        <div 
          className="bg-card border border-border rounded-lg p-4 sm:p-6 hover:scale-105 transition-all hover:glow-magenta dark:hover:glow-cyan cursor-pointer group relative overflow-hidden"
          onClick={onClick}
        >
          {/* Click indicator */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          </div>
          
          <div className={`flex items-center gap-3 mb-3 ${isLeft ? "md:flex-row-reverse" : ""}`}>
            <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors flex items-center justify-center">
              <img 
                src={experience.logo} 
                alt={`${experience.organization} logo`}
                className="w-6 h-6 sm:w-8 sm:h-8 object-contain bg-white p-1 rounded-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'block';
                }}
              />
              <experience.icon 
                className="w-6 h-6 sm:w-8 sm:h-8 text-primary hidden" 
                style={{ display: 'none' }}
              />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {experience.title}
            </h3>
          </div>
          <p className="text-sm text-primary font-semibold mb-2">{experience.organization}</p>
          <p className="text-xs text-muted-foreground mb-3">{experience.period}</p>
          
          {/* Click hint */}
          <div className="mt-3 text-xs text-muted-foreground/70 group-hover:text-muted-foreground transition-colors">
            Click to view details →
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedExperience, setSelectedExperience] = useState<typeof experiences[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // bikin transisi lebih smooth dengan spring
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    mass: 0.5,
  });

  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  const handleCardClick = (experience: typeof experiences[0]) => {
    setSelectedExperience(experience);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedExperience(null);
  };

  return (
    <section id="experience" className="py-16 sm:py-20 px-4 bg-muted/20">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 neon-text">Experience</h2>
          <p className="text-muted-foreground text-lg">My journey through education and career</p>
        </motion.div>

        <div ref={containerRef} className="relative">
          {/* Garis timeline tipis neon - hidden on mobile */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-1/2 -translate-x-1/2 top-0 w-[3px] 
                      bg-gradient-to-b from-pink-500 via-purple-500 to-cyan-400
                      dark:from-cyan-400 dark:via-purple-500 dark:to-pink-500
                      rounded-full shadow-[0_0_15px_rgba(0,255,255,0.7)]
                      dark:shadow-[0_0_15px_rgba(255,0,255,0.7)]
                      animate-[gradientShift_6s_linear_infinite] hidden md:block
                      z-10"
          />

          {/* Bulatan neon di ujung garis - hidden on mobile */}
          <motion.div
            style={{ top: lineHeight }}
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full 
                      bg-pink-500 shadow-[0_0_25px_rgba(255,0,255,0.9)]
                      dark:bg-cyan-400 dark:shadow-[0_0_25px_rgba(0,255,255,0.9)]
                      animate-pulse hidden md:block
                      z-20"
          />

          {experiences.map((exp, index) => (
            <TimelineItem 
              key={index} 
              experience={exp} 
              index={index} 
              onClick={() => handleCardClick(exp)}
            />
          ))}
        </div>

        {/* Modal */}
        {selectedExperience && (
          <ExperienceModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            experience={selectedExperience}
          />
        )}
      </div>
    </section>
  );
};
