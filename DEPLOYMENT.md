# Deployment Guide

## Quick Deploy Options

### ⚡ Vercel (Fast & Easy - Recommended)

#### Method 1: Deploy via Vercel Dashboard (Easiest)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Add Vercel configuration"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect React settings:
     - Framework Preset: Create React App
     - Build Command: `npm run build`
     - Output Directory: `build`
   - Click "Deploy"

3. **Automatic Deployments**
   - Every push to main branch triggers automatic deployment
   - Preview deployments for pull requests
   - Custom domains supported

#### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login and Deploy**
   ```bash
   vercel login
   vercel
   ```

3. **Follow prompts**
   - Link to existing project: No
   - Project name: your-portfolio-name
   - Directory: ./
   - Override settings: No

4. **Production Deploy**
   ```bash
   vercel --prod
   ```

### 🚀 Netlify (Alternative)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial portfolio setup"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub account
   - Select your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `build`
   - Click "Deploy site"

3. **Custom Domain (Optional)**
   - Go to Site settings > Domain management
   - Add your custom domain
   - Update DNS settings as instructed

### 📱 GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Deploy**
   ```bash
   npm run deploy
   ```

3. **Enable GitHub Pages**
   - Go to repository Settings > Pages
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Save

### 🔥 Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login and Initialize**
   ```bash
   firebase login
   firebase init hosting
   ```

3. **Configure**
   - Public directory: `build`
   - Single-page app: Yes
   - Overwrite index.html: No

4. **Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

## Vercel Configuration

Your project includes a `vercel.json` configuration file that optimizes deployment:

- **Static Build**: Uses `@vercel/static-build` for React apps
- **Caching**: Optimized caching for static assets
- **Security Headers**: Added security headers for better protection
- **SPA Routing**: Proper handling of React Router routes

### Environment Variables in Vercel

1. **Via Dashboard**:
   - Go to Project Settings > Environment Variables
   - Add your variables (use `.env.example` as reference)
   - Redeploy to apply changes

2. **Via CLI**:
   ```bash
   vercel env add REACT_APP_EMAIL_SERVICE_ID
   vercel env add REACT_APP_EMAIL_TEMPLATE_ID
   vercel env add REACT_APP_EMAIL_PUBLIC_KEY
   ```

## Environment Variables (Optional)

Create a `.env` file for any environment-specific settings:

```env
REACT_APP_EMAIL_SERVICE_ID=your_service_id
REACT_APP_EMAIL_TEMPLATE_ID=your_template_id
REACT_APP_EMAIL_PUBLIC_KEY=your_public_key
```

## Custom Domain Setup

### For Netlify:
1. Add domain in Site settings
2. Update DNS records as shown
3. Enable HTTPS (automatic)

### For Vercel:
1. **Add Domain**:
   - Go to Project Settings > Domains
   - Add your custom domain
   - Follow DNS configuration instructions

2. **DNS Configuration**:
   - Add CNAME record pointing to `cname.vercel-dns.com`
   - Or A record pointing to Vercel's IP addresses

3. **SSL Certificate**: Automatically provisioned by Vercel
4. **Automatic HTTPS**: Enabled by default

## Performance Optimization

After deployment, check your site's performance:

1. **Google PageSpeed Insights**: [pagespeed.web.dev](https://pagespeed.web.dev)
2. **GTmetrix**: [gtmetrix.com](https://gtmetrix.com)
3. **WebPageTest**: [webpagetest.org](https://webpagetest.org)

## Analytics Setup (Optional)

### Google Analytics
1. Create GA4 property
2. Add tracking code to `public/index.html`
3. Update measurement ID

### Vercel Analytics
```bash
npm i @vercel/analytics
```

## SEO Optimization

1. **Update meta tags** in `public/index.html`
2. **Add structured data** for better search results
3. **Submit sitemap** to Google Search Console
4. **Optimize images** (already using optimized Unsplash images)

## Maintenance

- **Regular updates**: Keep dependencies updated
- **Performance monitoring**: Check Core Web Vitals
- **Content updates**: Keep projects and information current
- **Backup**: Regular backups of your code

## Troubleshooting

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Deployment Issues
- Check build logs in your hosting platform
- Ensure all dependencies are in `package.json`
- Verify build command and output directory

### Performance Issues
- Optimize images
- Enable compression
- Use CDN for static assets
- Minimize bundle size

---

Your portfolio is now ready to showcase your AI development skills! 🎉
