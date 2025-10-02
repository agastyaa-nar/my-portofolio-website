import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Download, Maximize } from "lucide-react";

export const About = () => {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center px-4 py-16 sm:py-20"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl"
      >
        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto rounded-full bg-gradient-to-br from-primary via-secondary to-accent p-1 animate-float">
            <div className="w-full h-full rounded-full bg-card flex items-center justify-center text-6xl">
              <img
                src="/profile.png"
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 neon-text pb-2 px-4"
        >
          Dhanar Agastya Rakalangi
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed px-4"
        >
          I am an entry-level full-stack developer with a background in
          Mathematics at Sepuluh Nopember Institute of Technology. Passionate
          about building modern web applications, I enjoy solving problems
          creatively and turning ideas into clean, user-friendly digital
          experiences. My main focus is on web development, and I plan to expand
          into mobile development in the future.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center px-4"
        >
          {/* Contact Button */}
          <button className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all hover:glow-cyan hover:scale-105">
            <a href="#connect">Contact Me</a>
          </button>

          {/* Curriculum Vitae Modal */}
          <Dialog>
            <DialogTrigger asChild>
              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all hover:scale-105 hover:glow-cyan">
                Curriculum Vitae
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl w-[95vw] sm:w-full h-[90vh] flex flex-col p-0 overflow-hidden">
              {/* Header dengan tombol download & fullscreen */}
              <DialogHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 py-3 border-b border-border bg-gradient-to-r from-primary/30 to-accent/30 gap-3 sm:gap-0">
                <DialogTitle className="text-base sm:text-lg font-bold">
                  My Curriculum Vitae
                </DialogTitle>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <a
                    href="/cv.pdf"
                    download="Dhanar-Agastya-Rakalangi-CV.pdf"
                    className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all hover:scale-105 text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                  <a
                    href="/cv.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all hover:scale-105 text-sm"
                  >
                    <Maximize className="w-4 h-4" />
                    Fullscreen
                  </a>
                </div>
              </DialogHeader>

              {/* PDF Preview */}
              <div className="flex-1">
                <iframe
                  src="/cv.pdf"
                  className="w-full h-full"
                  title="CV Preview"
                />
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>
      </motion.div>
    </section>
  );
};
