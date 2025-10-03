import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  experience: {
    title: string;
    organization: string;
    period: string;
    description: string;
    images: string[];
    logo: string; 
  };
}

export const ExperienceModal = ({ isOpen, onClose, experience }: ExperienceModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-slide functionality with smoother transition
  useEffect(() => {
    if (!isOpen || !isAutoPlaying || experience.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % experience.images.length);
    }, 4000); // Change image every 4 seconds for smoother experience

    return () => clearInterval(interval);
  }, [isOpen, isAutoPlaying, experience.images.length]);

  // Reset to first image when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
      setIsAutoPlaying(true);
    }
  }, [isOpen]);

  const handleImageClick = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden bg-card border-2 border-primary/20 dark:border-primary/30 flex flex-col">
        <DialogHeader className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <img 
                src={experience.logo} 
                alt={`${experience.organization} logo`}
                className="w-6 h-6 object-contain bg-white p-1 rounded-full"
                onError={(e) => {
                  // Fallback to gradient circle if logo fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'block';
                }}
              />
              <div className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full hidden" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold neon-text">
                {experience.title}
              </DialogTitle>
              <DialogDescription className="text-primary font-semibold text-lg">
                {experience.organization}
              </DialogDescription>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            {experience.period}
          </div>
        </DialogHeader>

        <div className="flex-1 flex flex-col space-y-4 min-h-0">
          {/* Image Slideshow */}
          {experience.images.length > 0 && (
            <div className="flex flex-col" style={{ height: '60vh', maxHeight: '400px' }}>
              <div className="flex-1 relative overflow-hidden rounded-lg bg-muted/20 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, x: 300, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -300, scale: 0.8 }}
                    transition={{ 
                      duration: 0.8, 
                      ease: [0.4, 0.0, 0.2, 1],
                      type: "spring",
                      stiffness: 100,
                      damping: 20
                    }}
                    className="relative group w-full h-full flex items-center justify-center"
                  >
                    <img
                      src={experience.images[currentImageIndex]}
                      alt={`${experience.title} - Image ${currentImageIndex + 1}`}
                      className="max-w-full max-h-full w-auto h-auto object-contain cursor-pointer transition-transform duration-500 hover:scale-105"
                      onClick={handleImageClick}
                    />
                    
                    {/* Auto-play indicator */}
                    <div className="absolute top-4 right-4">
                      <motion.div 
                        className={`w-3 h-3 rounded-full transition-colors duration-500 ${
                          isAutoPlaying 
                            ? 'bg-green-400 shadow-[0_0_15px_rgba(34,197,94,0.6)]' 
                            : 'bg-gray-400'
                        }`}
                        animate={isAutoPlaying ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>

                    {/* Image counter */}
                    <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                      {currentImageIndex + 1} / {experience.images.length}
                    </div>

                    {/* Gradient overlay for better text visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Dots indicator */}
              {experience.images.length > 1 && (
                <div className="flex justify-center gap-3 mt-4">
                  {experience.images.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleDotClick(index)}
                      className={`relative w-3 h-3 rounded-full transition-all duration-500 ${
                        index === currentImageIndex
                          ? 'bg-primary scale-125'
                          : 'bg-muted-foreground/40 hover:bg-muted-foreground/70'
                      }`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {index === currentImageIndex && (
                        <motion.div
                          className="absolute inset-0 rounded-full bg-primary/30"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Description */}
          <div className="flex-shrink-0 min-h-0">
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <p className="text-muted-foreground leading-relaxed text-sm">
                {experience.description}
              </p>
            </div>
          </div>

          {/* Auto-play controls */}
          {experience.images.length > 1 && (
            <motion.div 
              className="flex-shrink-0 flex items-center justify-center gap-4 pt-3 border-t border-border/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 hover:bg-muted/80 transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className={`w-2 h-2 rounded-full ${
                    isAutoPlaying ? 'bg-green-400' : 'bg-gray-400'
                  }`}
                  animate={isAutoPlaying ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {isAutoPlaying ? 'Auto-playing' : 'Paused'}
                </span>
              </motion.button>
              <span className="text-xs text-muted-foreground/70">
                Click image to toggle
              </span>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
