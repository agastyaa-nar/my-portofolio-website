import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export const Connect = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');

  // ganti URL di bawah dengan URL Web App Google Script kamu
  const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

  useEffect(() => {
    // cek apakah koneksi ke Google Script bisa dilakukan
    const checkConnection = async () => {
      try {
        const res = await fetch(GOOGLE_SCRIPT_URL, { method: "POST", body: JSON.stringify({ test: true }) });
        if (!res.ok) throw new Error("Connection failed");
        setConnectionStatus("connected");
      } catch (err) {
        console.error(err);
        setConnectionStatus("error");
      }
    };
    checkConnection();
  }, [GOOGLE_SCRIPT_URL]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields.");
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to send message.");

      toast.success("Message sent successfully! I'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
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
                <span className="text-green-500">Connected to Google Sheet</span>
              </>
            )}
            {connectionStatus === 'error' && (
              <>
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span className="text-red-500">Connection failed</span>
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
            <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">Name</label>
            <input type="text" id="name" name="name" value={formData.name}
              onChange={handleChange} required
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">Email</label>
            <input type="email" id="email" name="email" value={formData.email}
              onChange={handleChange} required
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground">Message</label>
            <textarea id="message" name="message" value={formData.message}
              onChange={handleChange} required rows={6}
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
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" /> Sending...
              </>
            ) : (
              <>
                Send Message <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              </>
            )}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};
