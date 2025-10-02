import { Moon, Sun, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Certifications", href: "#certifications" },
  { name: "Connect", href: "#connect" },
];

export const Navigation = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-[9998] bg-background/90 backdrop-blur-lg border-b border-border shadow-lg"
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-bold neon-text"
        >
          Portfolio
        </motion.div>

        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map((link, index) => (
            <motion.button
              key={link.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => scrollToSection(link.href)}
              className="text-foreground hover:text-primary transition-colors relative group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </motion.button>
          ))}

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="ml-4"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile menu button and theme toggle */}
        <div className="md:hidden flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="hover:bg-muted"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="ml-2 hover:bg-muted border border-border/50 hover:border-primary/50 transition-all mobile-menu-button"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden"
            style={{ zIndex: 9999 }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-80 bg-card border-l-2 border-primary/30 shadow-2xl mobile-menu-panel"
              style={{ 
                zIndex: 10000,
                backgroundColor: 'hsl(var(--card))',
                position: 'fixed'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Full height background container */}
              <div className="h-full w-full bg-card flex flex-col">
                {/* Header section with Navigation title */}
                <div className="flex justify-between items-center p-6 bg-card border-b border-border/20">
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent"
                  >
                    Navigation
                  </motion.h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:bg-primary/10 rounded-full bg-card"
                  >
                    <X className="h-6 w-6 text-primary" />
                  </Button>
                </div>

                {/* Navigation Links - Full background coverage */}
                <div className="flex-1 flex flex-col px-6 py-8 space-y-4 bg-card">
                  {navLinks.map((link, index) => (
                    <motion.button
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (index + 1) * 0.1 }}
                      onClick={() => scrollToSection(link.href)}
                      className="text-left text-lg font-medium transition-all duration-300 py-4 px-4 rounded-lg hover:bg-muted/50 group bg-card relative overflow-hidden"
                      style={{ backgroundColor: 'hsl(var(--card))' }}
                    >
                      <span className="relative z-10 bg-gradient-to-r from-card-foreground to-card-foreground bg-clip-text text-transparent group-hover:from-primary group-hover:via-accent group-hover:to-secondary transition-all duration-300">
                        {link.name}
                      </span>
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary via-accent to-secondary group-hover:w-full transition-all duration-500" />
                      
                      {/* Subtle background gradient on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.button>
                  ))}
                </div>

                {/* Footer decoration */}
                <div className="p-6 bg-card border-t border-border/20">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center"
                  >
                    <div className="w-12 h-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-full mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">Portfolio Navigation</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};