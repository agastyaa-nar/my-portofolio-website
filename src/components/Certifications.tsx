import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Award } from "lucide-react";

const certifications = [
  { 
    name: "Blockchain Basics", 
    issuer: "Great Learning", 
    year: "2024", 
    image: "/certs/1.png",
    logo: "/logos/GL.png",
    pdf: "/pdfs/1.pdf"
  },
  { 
    name: "Front End Development - CSS", 
    issuer: "Great Learning", 
    year: "2024", 
    image: "/certs/2.png",
    logo: "/logos/GL.png",
    pdf: "/pdfs/2.pdf"
  },
  { 
    name: "Data Science Foundations", 
    issuer: "Great Learning", 
    year: "2024", 
    image: "/certs/3.png",
    logo: "/logos/GL.png",
    pdf: "/pdfs/3.pdf"
  },
  { 
    name: "Front End Development - HTML", 
    issuer: "Great Learning", 
    year: "2024", 
    image: "/certs/4.png",
    logo: "/logos/GL.png",
    pdf: "/pdfs/4.pdf"
  },
  { 
    name: "Python Fundamentals for Beginners", 
    issuer: "Great Learning", 
    year: "2024", 
    image: "/certs/5.png",
    logo: "/logos/GL.png",
    pdf: "/pdfs/5.pdf"
  },
  { 
    name: "Architecting on AWS (Membangun Arsitektur Cloud di AWS)", 
    issuer: "Dicoding Academy", 
    year: "2025", 
    image: "/certs/6.png",
    logo: "/logos/Dicoding.png",
    pdf: "/pdfs/6.pdf"
  },
  { 
    name: " Belajar Back-End Pemula dengan JavaScript", 
    issuer: "Dicoding Academy", 
    year: "2025", 
    image: "/certs/7.png",
    logo: "/logos/Dicoding.png",
    pdf: "/pdfs/7.pdf"
  },
  { 
    name: " Belajar Dasar AI", 
    issuer: "Dicoding Academy", 
    year: "2025", 
    image: "/certs/8.png",
    logo: "/logos/Dicoding.png",
    pdf: "/pdfs/8.pdf"
  },
  { 
    name: "Belajar Dasar Cloud dan Gen AI di AWS", 
    issuer: "Dicoding Academy", 
    year: "2025", 
    image: "/certs/9.png",
    logo: "/logos/Dicoding.png",
    pdf: "/pdfs/9.pdf"
  },
  { 
    name: "Belajar Dasar Data Science", 
    issuer: "Dicoding Academy", 
    year: "2025", 
    image: "/certs/10.png",
    logo: "/logos/Dicoding.png",
    pdf: "/pdfs/10.pdf"
  },
  { 
    name: "Belajar Dasar Pemrograman JavaScript", 
    issuer: "Dicoding Academy", 
    year: "2025", 
    image: "/certs/11.png",
    logo: "/logos/Dicoding.png",
    pdf: "/pdfs/11.pdf"
  },
  { 
    name: " Belajar Dasar Pemrograman Web", 
    issuer: "Dicoding Academy", 
    year: "2025", 
    image: "/certs/12.png",
    logo: "/logos/Dicoding.png",
    pdf: "/pdfs/12.pdf"
  },
  { 
    name: "Belajar Dasar Structured Query Language (SQL)", 
    issuer: "Dicoding Academy", 
    year: "2025", 
    image: "/certs/13.png",
    logo: "/logos/Dicoding.png",
    pdf: "/pdfs/13.pdf"
  },
  { 
    name: "Belajar Fundamental Back-End dengan JavaScript", 
    issuer: "Dicoding Academy", 
    year: "2025", 
    image: "/certs/14.png",
    logo: "/logos/Dicoding.png",
    pdf: "/pdfs/14.pdf"
  },
  { 
    name: " Belajar Membuat Front-End Web untuk Pemula", 
    issuer: "Dicoding Academy", 
    year: "2025", 
    image: "/certs/15.png",
    logo: "/logos/Dicoding.png",
    pdf: "/pdfs/15.pdf"
  },
  { 
    name: "Memulai Pemrograman dengan Python", 
    issuer: "Dicoding Academy", 
    year: "2025", 
    image: "/certs/16.png",
    logo: "/logos/Dicoding.png",
    pdf: "/pdfs/16.pdf"
  },
  { 
    name: " Memulai Pemrograman Dengan Swift", 
    issuer: "Dicoding Academy", 
    year: "2025", 
    image: "/certs/17.png",
    logo: "/logos/Dicoding.png",
    pdf: "/pdfs/17.pdf"
  },
  { 
    name: "Code Generation and Optimization Using IBM Granite", 
    issuer: "IBM", 
    year: "2025", 
    image: "/certs/18.png",
    logo: "/logos/IBM.png",
    pdf: "/pdfs/18.pdf"
  },
  { 
    name: " IBM Granite Models for Software Development", 
    issuer: "IBM", 
    year: "2025", 
    image: "/certs/19.png",
    logo: "/logos/IBM.png",
    pdf: "/pdfs/19.pdf"
  },
  { 
    name: "Use Generative AI for Software Development", 
    issuer: "IBM", 
    year: "2025", 
    image: "/certs/20.png",
    logo: "/logos/IBM.png",
    pdf: "/pdfs/20.pdf"
  },
  { 
    name: "Back-End Developer Intermediate Program", 
    issuer: "AWS Training & Certifications", 
    year: "2025", 
    image: "/certs/21.png",
    logo: "/logos/AWS.png",
    pdf: "/pdfs/21.pdf"
  },
  { 
    name: "Intro to Software Engineering", 
    issuer: "RevoU", 
    year: "2025", 
    image: "/certs/22.png",
    logo: "/logos/RevoU.png",
    pdf: "/pdfs/22.pdf"
  },
];

const CertCard = ({ cert, index }: { cert: typeof certifications[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
      className="bg-card border border-border rounded-xl p-4 sm:p-6 hover:glow-magenta transition-all dark:hover:glow-cyan"
    >
      {/* Header logo & info */}
      <div className="flex items-start gap-3 sm:gap-4 mb-4">
        <div className="w-12 h-12 sm:w-16 sm:h-16 p-2 rounded-lg bg-primary/10 shrink-0 flex items-center justify-center">
          {cert.logo ? (
            <img src={cert.logo} alt={cert.issuer} className="w-full h-full object-contain" />
          ) : (
            <Award className="w-full h-full text-primary" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base sm:text-lg font-bold text-foreground mb-2 line-clamp-2">{cert.name}</h3>
          <p className="text-xs sm:text-sm text-muted-foreground mb-1 truncate">{cert.issuer}</p>
          <p className="text-xs text-primary font-semibold">{cert.year}</p>
        </div>
      </div>

      {/* Sertifikat klik → buka PDF */}
      <div className="flex justify-center cursor-pointer">
        <a href={cert.pdf} target="_blank" rel="noopener noreferrer" className="w-full h-48 sm:h-56">
          <div className="w-full h-full rounded-md border bg-background flex items-center justify-center overflow-hidden">
            <img
              src={cert.image}
              alt={`${cert.name} Certificate`}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </a>
      </div>
    </motion.div>
  );
};

export const Certifications = () => {
  return (
    <section id="certifications" className="py-16 sm:py-20 px-4 bg-muted/20">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 neon-text">Certifications</h2>
          <p className="text-muted-foreground text-lg">Professional credentials and achievements</p>
        </motion.div>

        {/* grid responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {certifications.map((cert, index) => (
            <CertCard key={index} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};