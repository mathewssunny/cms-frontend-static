# CoolPicsUK Photography Website

A professional, responsive single-page website for CoolPicsUK - a premium photography and videography service specializing in portrait, event, and landmark photography across the UK.

## Features

- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- **Black & White Theme**: Elegant, premium aesthetic that lets photography shine
- **Single-Page Architecture**: Smooth scrolling navigation between sections
- **Interactive Components**: 
  - Sticky navigation with scroll-spy
  - Mobile hamburger menu
  - Testimonial carousel with autoplay
  - Contact form with validation
  - Smooth scroll animations
- **SEO Optimized**: Proper meta tags, semantic HTML, and Schema.org markup
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation and screen reader support
- **Performance**: Lazy loading images, optimized CSS/JS, fast load times

## Project Structure

```
coolpicsuk/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles (design system + components)
├── js/
│   └── script.js       # All JavaScript functionality
├── images/
│   ├── hero/          # Hero section images
│   ├── services/      # Service package images
│   ├── portfolio/     # Portfolio gallery images
│   ├── testimonials/  # Client photos (optional)
│   └── about/         # Team photos
└── assets/
    └── favicon.png    # Website favicon
```

## Setup & Installation

1. **Clone or download** the project files
2. **Add images** to the respective folders in `/images`
3. **Open** `index.html` in a web browser
4. **Optional**: Use a local server for development:
   ```bash
   # Python 3
   python3 -m http.server 8000
   
   # Node.js (with http-server)
   npx http-server
   ```

## Customization

### Colors
The color scheme is defined in CSS custom properties in `css/style.css`:
```css
:root {
    --color-black: #000000;
    --color-white: #FFFFFF;
    /* etc. */
}
```

### Typography
The website uses Google Fonts (Playfair Display & Source Sans Pro). To change fonts, update the Google Fonts link in `index.html` and the CSS variables in `style.css`.

### Content
- Edit text content directly in `index.html`
- Update service packages, testimonials, and contact information
- Add your own photography to the portfolio section

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Performance

- Lightweight: ~50KB HTML, ~40KB CSS, ~15KB JS (unminified)
- No external dependencies (vanilla JavaScript)
- Optimized for fast loading
- Lazy loading for images

## Future Enhancements

- Backend integration for contact form
- Portfolio gallery with lightbox
- Blog section
- Online booking system
- Client login portal
- E-commerce for print sales

## AWS Deployment (Free Tier)

This project is ready to be hosted on AWS using a serverless architecture that fits within the Free Tier.

### 1. Static Hosting (AWS Amplify)
1. Log in to the [AWS Console](https://console.aws.amazon.com/).
2. Search for **AWS Amplify**.
3. Click **Host web app**.
4. Choose **Deploy without Git provider** (or connect your GitHub repo if you have one).
5. Drag and drop the following files/folders:
   - `index.html`
   - `css/`
   - `js/`
   - `assets/`
   - `photos/` (ensure images are in the correct path)
6. Amplify will provide a `https://...amplifyapp.com` URL.

### 2. Contact Form Backend (Lambda + SES + API Gateway)
To make the contact form work, follow these steps:

#### **A. Verify Email in SES**
1. Search for **SES (Simple Email Service)**.
2. Go to **Verified Identities** -> **Create Identity**.
3. Add `stevenagecoolpics@gmail.com` and verify it via the email link AWS sends you.

#### **B. Create Lambda Function**
1. Search for **Lambda** -> **Create Function**.
2. Name: `coolpics-contact-form`.
3. Runtime: **Node.js 18.x** (or later).
4. Copy the code from `aws-backend/lambda_handler.js` into the Lambda editor.
5. In **Configuration** -> **Permissions**, click the execution role and add the `AmazonSESFullAccess` policy.

#### **C. Set up API Gateway**
1. Search for **API Gateway** -> **Create API** -> **HTTP API**.
2. Click **Add Integration** -> **Lambda**. Select your `coolpics-contact-form` function.
3. Configure the route: `POST /contact`.
4. Once created, copy the **Invoke URL**.

#### **D. Update Website Code**
1. Open `js/script.js`.
2. Find the constant `API_ENDPOINT` near line 391.
3. Replace `'YOUR_API_GATEWAY_URL_HERE'` with your API Gateway Invoke URL (e.g., `https://xyz.execute-api.region.amazonaws.com/contact`).
4. Re-upload `js/script.js` to Amplify.

---

## Contact Information

Update contact details in:
- Navigation CTA button (line 80)
- Contact section (lines 600-650)
- Footer (lines 750-800)

## License

© 2025 CoolPicsUK. All rights reserved.

## Credits

- Design & Development: Custom built for CoolPicsUK
- Fonts: Google Fonts (Playfair Display, Source Sans Pro)
- Icons: Unicode emoji (replace with icon font/SVG as needed)

---

**Need help?** Contact the development team for support and customization.
