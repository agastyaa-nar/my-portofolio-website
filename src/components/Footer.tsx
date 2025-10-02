import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Twitter, Mail } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/agastyaa-nar", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/dhanaragastya/", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/agastyaa.ra", label: "Instagram" },
  { icon: Mail, href: "mailto:agastyadhanar@gmail.com", label: "Email" },
];

export const Footer = () => {
  return (
    <footer className="py-8 sm:py-12 px-4 border-t border-border bg-card/50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-8"
        >
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="p-2 sm:p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all dark:hover:glow-cyan"
                  aria-label={link.label}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.a>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center text-muted-foreground px-4"
          >
            <p className="text-xs sm:text-sm">
              © {new Date().getFullYear()} Dhanar Agastya Rakalangi. All rights reserved.
            </p>
            <p className="text-xs mt-2">
              Built with React, Tailwind CSS, and Framer Motion
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};