# Om Singh - AI Developer Portfolio

A modern, minimalist portfolio website showcasing AI development projects and expertise in creating technology solutions for non-developers.

## 🚀 Features

- **Minimalist Design**: Clean, professional layout with purple accent colors
- **Interactive Projects**: Detailed showcase of AI-Writer and Auther projects
- **Responsive**: Fully responsive design that works on all devices
- **Smooth Animations**: Framer Motion animations for engaging user experience
- **Contact Form**: Functional contact form for potential collaborations
- **SEO Optimized**: Built with performance and SEO in mind

## 🛠️ Technologies Used

- **React 18**: Modern React with hooks
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions
- **React Icons**: Beautiful icon library
- **React Intersection Observer**: Scroll-triggered animations

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🌐 Hosting Options

### Option 1: Netlify (Recommended)
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Deploy automatically on every push

### Option 2: Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project directory
3. Follow the prompts to deploy

### Option 3: GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts:
   ```json
   "homepage": "https://yourusername.github.io/portfolio-website",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
3. Run `npm run deploy`

### Option 4: Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Run `firebase login` and `firebase init hosting`
3. Set public directory to `build`
4. Run `npm run build && firebase deploy`

## 🎨 Customization

### Colors
The portfolio uses a purple color scheme defined in `tailwind.config.js`. You can customize the colors by modifying the `primary` color palette.

### Content
- Update personal information in `src/App.js`
- Replace placeholder images with your own
- Modify project details in the `projects` array
- Update contact information

### Styling
- Modify `src/index.css` for global styles
- Update component styles in `src/App.js`
- Customize animations in the Framer Motion components

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔧 Performance Optimizations

- Lazy loading of images
- Optimized animations
- Minimal bundle size
- Fast loading times
- SEO-friendly structure

## 📞 Contact

- **Email**: oms202705@gmail.com
- **Phone**: +91 8318112998
- **Location**: Lucknow, UP, India
- **GitHub**: [@Om-Singh1808](https://github.com/Om-Singh1808)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ by Om Singh - AI Developer passionate about making technology accessible to everyone.