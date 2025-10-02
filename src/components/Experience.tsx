import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap, Book, Trophy, Laptop } from "lucide-react";

const experiences = [
  {
    title: "High School",
    organization: "SMA GIKI 2 Surabaya",
    period: "May 2019  - May 2022",
    description: "Graduated with honors, where I developed my first web projects, explored technologies such as Web Development, Macro Scripting (Lua), and Data Science, and ultimately discovered my passion for coding.",
    icon: Book,
  },
  {
    title: "Bachelor's Degree",
    organization: "Institute of Technology Sepuluh Nopember",
    period: " August 2022 - Present ",
    description: "Mathematic major. Strengthened IT skills through scholarships and certifications, while building leadership and teamwork experience in organizational committees.",
    icon: GraduationCap,
  },
  {
    title: "Question Maker Team",
    organization: "ITS Mathematics Olympiad",
    period: "March 2024 - October 2024",
    description: "Served as Head of Elementary Subdivision Question Maker for the 17th OMITS, compiling the problem book with LaTeX, coordinating staff, reviewing problem quality, managing the problem bank, and organizing the online stage through MyITS Classroom.",
    icon: Trophy,
  },
  {
    title: " Laboratory Teaching Assistant",
    organization: "Programming and Visual Computation Laboratory",
    period: "September 2024 - November 2024",
    description: "Instructed students in the fundamentals of Java programming, prepared laboratory worksheets and assignments with LaTeX, evaluated reports, coordinated presentations, and facilitated lab sessions using MyITS Classroom.",
    icon: Laptop,
  },
  {
    title: "Internship",
    organization: "General Election Commission of East Java Province",
    period: "July 2025 - August 2025",
    description: "Conducted sentiment analysis of SIREKAP app reviews on Google Play using text preprocessing and Naive Bayes, created visualizations and concise reports to support KPU’s digital service improvements, and prepared strategic recommendations on service quality.",
    icon: Briefcase,
  },
];

const TimelineItem = ({ experience, index }: { experience: typeof experiences[0]; index: number }) => {
  const isLeft = index % 2 === 0;
  const Icon = experience.icon;

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
        <div className="bg-card border border-border rounded-lg p-4 sm:p-6 hover:scale-105 transition-all hover:glow-cyan dark:hover:glow-cyan">
          <div className={`flex items-center gap-3 mb-3 ${isLeft ? "md:flex-row-reverse" : ""}`}>
            <div className="p-2 rounded-full bg-primary/10">
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-foreground">{experience.title}</h3>
          </div>
          <p className="text-sm text-primary font-semibold mb-2">{experience.organization}</p>
          <p className="text-xs text-muted-foreground mb-3">{experience.period}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{experience.description}</p>
        </div>
      </motion.div>
    </div>
  );
};

export const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.2", "end 0.9"],
  });

  // bikin transisi lebih smooth dengan spring
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    mass: 0.5,
  });

  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

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
                       bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500 
                       rounded-full shadow-[0_0_15px_rgba(255,0,255,0.7)]
                       animate-[gradientShift_6s_linear_infinite] hidden md:block"
          />

          {/* Bulatan neon di ujung garis - hidden on mobile */}
          <motion.div
            style={{ top: lineHeight }}
            className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full 
                       bg-cyan-400 shadow-[0_0_25px_rgba(0,255,255,0.9)] 
                       animate-pulse hidden md:block"
          />

          {experiences.map((exp, index) => (
            <TimelineItem key={index} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
