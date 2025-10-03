import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export const Connect = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');

  // Check database connection on component mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { error } = await supabase
          .from('contact_messages')
          .select('count', { count: 'exact', head: true });
        
        if (error) throw error;
        setConnectionStatus('connected');
      } catch (error) {
        console.error('Database connection error:', error);
        setConnectionStatus('error');
      }
    };

    checkConnection();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in all fields.");
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("contact_messages")
        .insert([{
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim()
        }])
        .select();

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      console.log("Message sent successfully:", data);
      toast.success("Message sent successfully! I'll get back to you soon.", {
        duration: 5000,
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error: unknown) {
      console.error("Error sending message:", error);
      
      // More specific error messages
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorCode = error && typeof error === 'object' && 'code' in error ? error.code : null;
      
      if (errorMessage.includes("Failed to fetch")) {
        toast.error("❌ Network error. Please check your internet connection and try again.");
      } else if (errorMessage.includes("JWT")) {
        toast.error("❌ Authentication error. Please refresh the page and try again.");
      } else if (errorCode === "PGRST116") {
        toast.error("❌ Database connection error. Please try again later.");
      } else {
        toast.error(`❌ Failed to send message: ${errorMessage || "Unknown error"}. Please try again.`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="connect" className="py-16 sm:py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 neon-text">Let's Connect</h2>
          <p className="text-muted-foreground text-lg mb-4">Have a project in mind? Let's talk about it</p>
          
          {/* Connection Status Indicator */}
          <div className="flex items-center justify-center gap-2 text-sm">
            {connectionStatus === 'checking' && (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                <span className="text-muted-foreground">Connecting to database...</span>
              </>
            )}
            {connectionStatus === 'connected' && (
              <>
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-green-500">Database connected</span>
              </>
            )}
            {connectionStatus === 'error' && (
              <>
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span className="text-red-500">Database connection failed</span>
              </>
            )}
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
              placeholder="Tell me about your project..."
            />
          </div>

          <motion.button
            whileHover={{ scale: connectionStatus === 'connected' && !isSubmitting ? 1.02 : 1 }}
            whileTap={{ scale: connectionStatus === 'connected' && !isSubmitting ? 0.98 : 1 }}
            type="submit"
            disabled={isSubmitting || connectionStatus !== 'connected'}
            className={`w-full px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 text-sm sm:text-base ${
              connectionStatus === 'connected' && !isSubmitting
                ? 'bg-primary text-primary-foreground hover:opacity-90'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                Sending...
              </>
            ) : connectionStatus === 'error' ? (
              <>
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                Database Unavailable
              </>
            ) : connectionStatus === 'checking' ? (
              <>
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                Send Message
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              </>
            )}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};