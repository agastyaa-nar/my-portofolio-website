import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? experience.images.length - 1 : prev - 1
    );
    setIsAutoPlaying(false);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % experience.images.length);
    setIsAutoPlaying(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-[98vw] sm:w-[90vw] lg:w-[80vw] max-h-[98vh] sm:max-h-[90vh] overflow-hidden bg-card/95 backdrop-blur-sm border-2 border-primary/30 shadow-2xl modal-content modal-transition">
        {/* Header Section */}
        <DialogHeader className="space-y-1 pb-2 border-b border-border/50 relative">
          <div className="flex items-start gap-2 pr-12">
            <div className="p-1 rounded-md bg-gradient-to-br from-primary/20 to-primary/10 ring-1 ring-primary/20 flex-shrink-0">
              <img 
                src={experience.logo} 
                alt={`${experience.organization} logo`}
                className="w-3 h-3 sm:w-4 sm:h-4 object-contain bg-white p-0.5 rounded-sm"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'block';
                }}
              />
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-sm hidden" />
            </div>
            <div className="flex-1 min-w-0 overflow-hidden">
              <DialogTitle className="text-sm sm:text-lg font-bold neon-text leading-tight">
                <span className="block break-words">{experience.title}</span>
              </DialogTitle>
              <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2 mt-0.5">
                <DialogDescription className="text-primary font-semibold text-xs sm:text-sm break-words">
                  {experience.organization}
                </DialogDescription>
                <Badge variant="secondary" className="text-xs flex-shrink-0 hidden sm:inline-flex">
                  {experience.period}
                </Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Content Section */}
        <div className="flex-1 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-6 h-full">
            {/* Left Column - Images */}
            {experience.images.length > 0 && (
              <div className="flex flex-col space-y-2">
                <div className="relative h-40 xs:h-48 sm:h-64 lg:h-72 overflow-hidden rounded-lg sm:rounded-xl bg-muted/20 ring-1 sm:ring-2 ring-border/50 image-container">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      transition={{ 
                        duration: 0.5, 
                        ease: "easeInOut"
                      }}
                      className="relative w-full h-full flex items-center justify-center group"
                    >
                      <img
                        src={experience.images[currentImageIndex]}
                        alt={`${experience.title} - Image ${currentImageIndex + 1}`}
                        className="max-w-full max-h-full w-auto h-auto object-contain cursor-pointer transition-transform duration-300 hover:scale-105"
                        onClick={handleImageClick}
                      />
                      
                      {/* Navigation Arrows */}
                      {experience.images.length > 1 && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 hover:bg-black/40 text-white"
                            onClick={handlePreviousImage}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 hover:bg-black/40 text-white"
                            onClick={handleNextImage}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </>
                      )}

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
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Image Navigation */}
                {experience.images.length > 1 && (
                  <div className="flex flex-col space-y-1 sm:space-y-2">
                    {/* Dots indicator */}
                    <div className="flex justify-center gap-1.5 sm:gap-2">
                      {experience.images.map((_, index) => (
                        <motion.button
                          key={index}
                          onClick={() => handleDotClick(index)}
                          className={`relative w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
                            index === currentImageIndex
                              ? 'bg-primary scale-125'
                              : 'bg-muted-foreground/40 hover:bg-muted-foreground/70'
                          }`}
                          whileHover={{ scale: 1.3 }}
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

                    {/* Controls */}
                    <div className="flex flex-col xs:flex-row items-center justify-center gap-2 xs:gap-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                        className="flex items-center gap-1.5 text-xs"
                      >
                        {isAutoPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                        <span className="text-xs hidden xs:inline">
                          {isAutoPlaying ? 'Pause' : 'Play'}
                        </span>
                      </Button>
                      <span className="text-xs text-muted-foreground text-center xs:text-left">
                        Click image to toggle
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Right Column - Description Only */}
            <div className="flex flex-col justify-start overflow-hidden">
              <div className="prose prose-sm sm:prose-lg max-w-none dark:prose-invert overflow-hidden">
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base lg:text-lg break-words">
                  {experience.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
