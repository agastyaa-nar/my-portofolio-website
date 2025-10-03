# Narr-Homepage

A modern, responsive personal portfolio website built with React, TypeScript, and Tailwind CSS. Features a futuristic neon design for dark mode and peaceful aesthetics for light mode, complete with interactive particle backgrounds and a contact form powered by Supabase.

## 🚀 Live Demo

[View Live Portfolio](https://your-portfolio-url.com) *(Update with your actual deployment URL)*

## ✨ Features

### 🎨 Design & UI
- **Dual Theme Support**: Dark mode with neon aesthetics and light mode with peaceful design
- **Interactive Particle Background**: Dynamic particle effects that adapt to the current theme
- **Responsive Design**: Fully responsive across all device sizes
- **Modern UI Components**: Built with shadcn/ui and Radix UI primitives
- **Smooth Animations**: Framer Motion animations for enhanced user experience

### 📱 Sections
- **About**: Personal introduction with profile image and bio
- **Experience**: Professional work experience timeline
- **Projects**: Showcase of featured projects with live demos and GitHub links
- **Tech Stack**: Interactive technology showcase with logos
- **Certifications**: Display of professional certifications
- **Connect**: Contact form with real-time database connectivity status

### 🔧 Technical Features
- **Real-time Contact Form**: Powered by Supabase with form validation
- **Database Integration**: PostgreSQL database for storing contact messages
- **Type Safety**: Full TypeScript implementation
- **Modern Build System**: Vite for fast development and optimized builds
- **Component Architecture**: Modular, reusable React components

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **shadcn/ui** - UI components
- **Radix UI** - Accessible primitives
- **React Router** - Routing
- **React Query** - State management
- **Lucide React** - Icons

### Backend & Database
- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Database
- **Row Level Security** - Data security

### Development Tools
- **Vite** - Build tool
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 📦 Installation

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn
- Supabase account

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/Narr-Homepage.git
cd Narr-Homepage
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

### 4. Database Setup
1. Create a new Supabase project
2. Run the migration file located in `supabase/migrations/`
3. The migration creates the `contact_messages` table with proper RLS policies

### 5. Start Development Server
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:8080`

## 🏗️ Project Structure

```
Narr-Homepage/
├── public/                 # Static assets
│   ├── logos/             # Technology logos
│   └── projects/          # Project screenshots
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── About.tsx     # About section
│   │   ├── Connect.tsx   # Contact form
│   │   ├── Experience.tsx # Experience timeline
│   │   ├── Navigation.tsx # Navigation bar
│   │   ├── ParticleBackground.tsx # Particle effects
│   │   ├── Projects.tsx  # Projects showcase
│   │   └── ...
│   ├── hooks/            # Custom React hooks
│   ├── integrations/     # External service integrations
│   │   └── supabase/    # Supabase client and types
│   ├── pages/           # Page components
│   └── App.tsx          # Main application component
├── supabase/
│   ├── migrations/      # Database migrations
│   └── config.toml     # Supabase configuration
├── package.json         # Dependencies and scripts
├── tailwind.config.ts   # Tailwind CSS configuration
├── vite.config.ts       # Vite configuration
└── tsconfig.json        # TypeScript configuration
```

## 🎨 Customization

### Adding New Projects
Edit `src/components/Projects.tsx` and add new project objects to the `projects` array:

```typescript
{
  title: "Your Project Name",
  description: "Project description...",
  tech: ["React", "TypeScript", "Tailwind CSS"],
  demo: "https://your-demo-url.com",
  github: "https://github.com/your-username/project",
  image: "/projects/project-image.png",
}
```

### Updating Personal Information
1. **About Section**: Edit `src/components/About.tsx`
2. **Experience**: Update `src/components/Experience.tsx`
3. **Tech Stack**: Modify `src/components/TechStack.tsx`
4. **Certifications**: Update `src/components/Certifications.tsx`

### Theme Customization
The theme system uses CSS custom properties. Edit `src/index.css` to customize colors:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  /* ... other theme variables */
}
```

### Particle Effects
Customize particle effects in `src/components/ParticleBackground.tsx`:

```typescript
// Modify particle options
const particleOptions = {
  particles: {
    number: { value: 80 },
    color: { value: "#ffffff" },
    // ... other particle configurations
  }
};
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Add environment variables in Netlify settings

### Manual Deployment
1. Build the project:
   ```bash
   npm run build
   ```
2. Upload the `dist` folder to your web server
3. Ensure environment variables are configured on your server

## 📊 Database Schema

The contact form uses a simple PostgreSQL table:

```sql
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
```

### Row Level Security (RLS)
- Public insert policy for contact form submissions
- View policy for message retrieval (can be restricted for admin use)

## 🔒 Security Features

- **Environment Variables**: Sensitive data stored in environment variables
- **Input Validation**: Form validation on both client and server side
- **SQL Injection Protection**: Supabase handles SQL injection prevention
- **CORS Configuration**: Proper CORS settings for production

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Dhanar Agastya Rakalangi**
- Portfolio: [https://narr-curi.vercel.app/]
- LinkedIn: [https://www.linkedin.com/in/dhanaragastya/]
- GitHub: [https://github.com/agastyaa-nar]
- Email: [agastyadhanar@gmail.com]

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the amazing UI components
- [Supabase](https://supabase.com/) for the backend infrastructure
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Lucide](https://lucide.dev/) for the beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

## 📝 Changelog

### v1.0.0
- Initial release
- Dark/light theme support
- Interactive particle background
- Contact form with Supabase integration
- Responsive design
- Project showcase
- Experience timeline
- Tech stack display
- Certifications section

---

⭐ **Star this repository if you found it helpful!**
