# Portfolio Website

A dynamic, customizable portfolio website built with React and Vite. This portfolio is designed to be easily updated through JSON configuration files and can be deployed for free on GitHub Pages.

## Features

- 🎨 **Professional & Vibrant Design** - Modern UI with gradient accents and smooth animations
- 🔧 **Easy to Customize** - Update content by editing JSON files, no code changes needed
- 📱 **Fully Responsive** - Looks great on all devices
- 🚀 **Fast & Optimized** - Built with Vite for optimal performance
- 🎯 **Dynamic Sections** - Easy to add, remove, or reorder sections
- 🎨 **Theme System** - Change colors easily through CSS variables

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Portfolio.git
cd Portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Customizing Your Portfolio

### Adding/Editing Content

All content is stored in JSON files in the `src/data/` directory:

- `about.json` - Your personal information and bio
- `skills.json` - Your skills organized by category
- `projects.json` - Your projects with descriptions and links
- `certifications.json` - Your certifications and credentials
- `experience.json` - Your work experience
- `education.json` - Your educational background
- `contact.json` - Your contact information and social links

Simply edit these files with your information - no coding knowledge required!

### Adding New Sections

To add a new section to your portfolio:

1. Create a JSON data file in `src/data/` (e.g., `achievements.json`)
2. Create a component in `src/components/Sections/` (e.g., `Achievements.jsx`)
3. Add the section to `src/config/sections.json`:
```json
{
  "id": "achievements",
  "component": "Achievements",
  "data": "achievements"
}
```

That's it! The section will automatically appear on your portfolio.

### Changing Colors

To change the color scheme:

1. Open `src/styles/themes.css`
2. Update the CSS custom property values (e.g., `--color-primary`, `--color-accent`, etc.)
3. All components will automatically use the new colors!

Example:
```css
:root {
  --color-primary: #your-color;
  --color-accent: #your-accent-color;
  /* ... */
}
```

## Deployment

### Automatic Deployment via GitHub Actions

The portfolio includes a GitHub Actions workflow that automatically deploys your site to GitHub Pages whenever you push to the `main` branch.

**Before deploying:**

1. Update the `base` path in `vite.config.js` to match your repository name:
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/Your-Repo-Name/', // Change this to your repo name
})
```

2. Enable GitHub Pages in your repository settings:
   - Go to Settings > Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` folder: `/ (root)`
   - Or use GitHub Actions (recommended)

3. Push your code to GitHub - the workflow will automatically build and deploy!

### Manual Deployment

If you prefer to deploy manually:

1. Build the project:
```bash
npm run build
```

2. The `dist` folder contains your static site

3. Deploy the `dist` folder contents to your hosting service

## Project Structure

```
Portfolio/
├── public/           # Static assets
├── src/
│   ├── components/   # React components
│   │   ├── Layout/   # Header, Footer, Navigation
│   │   └── Sections/ # Portfolio sections
│   ├── config/       # Configuration files
│   ├── data/         # JSON data files (edit these!)
│   ├── styles/       # CSS files
│   ├── App.jsx       # Main app component
│   └── main.jsx      # Entry point
├── .github/
│   └── workflows/    # GitHub Actions
└── package.json
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## License

MIT License - feel free to use this template for your own portfolio!

## Support

If you have any questions or run into issues, please open an issue on GitHub.

---

Built with ❤️ using React + Vite
