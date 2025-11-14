````markdown
# Emmanuel Obi - Portfolio

Minimalist portfolio website showcasing my work as a Senior Software Engineer specializing in Product Growth. Built with modern web technologies and optimized for performance, accessibility, and print.

## ✨ Features

- **Single Config Setup**: All content managed through one file [`src/data/resume-data.tsx`](./src/data/resume-data.tsx)
- **Modern Tech Stack**: Built with Next.js 14, React, TypeScript, shadcn/ui, and Tailwind CSS
- **AI-Ready Architecture**: Structured data and API endpoints ready for AI chatbot integration
- **Auto-Generated Layout**: Clean, professional design that adapts to your data
- **Fully Responsive**: Optimized for mobile, tablet, desktop, and print
- **SEO Optimized**: Comprehensive meta tags and Open Graph support
- **Fast Performance**: Optimized for Next.js and Vercel deployment
- **Comprehensive Sections**:
  - Work Experience
  - Education (with GPA and honors)
  - Skills & Technologies
  - Certificates
  - Awards & Recognition
  - Publications
  - Projects

## 🚀 Getting Started Locally

1. Clone this repository:

   ```bash
   git clone https://github.com/EmmanuelObi/Portfolio-2022.git
   ```

2. Move to the directory:

   ```bash
   cd Portfolio-2022
   ```

3. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

6. **Customize your content** by editing [`src/data/resume-data.tsx`](./src/data/resume-data.tsx)

## 🎨 Customization

All portfolio content is managed through the `RESUME_DATA` object in [`src/data/resume-data.tsx`](./src/data/resume-data.tsx):

```typescript
export const RESUME_DATA = {
  name: "Your Name",
  initials: "YN",
  location: "Your Location",
  about: "Your Title",
  summary: "Your professional summary...",
  // ... add your work experience, education, projects, etc.
};
```

## 🤖 AI Chatbot Integration

This portfolio is architected to easily integrate an AI chatbot. See [`AI_CHATBOT_INTEGRATION.md`](./AI_CHATBOT_INTEGRATION.md) for detailed instructions on:

- Setting up OpenAI, Anthropic, or other LLM providers
- Using the pre-built API endpoints
- Creating a chat UI component
- Leveraging structured resume data for AI context

**Key files for AI integration:**

- `src/contexts/ResumeContext.tsx` - Structured data provider
- `src/app/api/chat/route.ts` - API endpoint ready for AI
- `AI_CHATBOT_INTEGRATION.md` - Complete integration guide

## 🐳 Run with Docker

Build the container:

```bash
docker compose build
```

Run the container:

```bash
docker compose up -d
```

Stop the container:

```bash
docker compose down
```

## 📦 Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── chat/          # AI chatbot endpoint
│   │   ├── globals.css        # Global styles & animations
│   │   ├── layout.tsx         # Root layout with SEO
│   │   └── page.tsx           # Main portfolio page
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   ├── command-menu.tsx   # Keyboard shortcuts
│   │   └── project-card.tsx   # Project display
│   ├── contexts/
│   │   └── ResumeContext.tsx  # Resume data context (AI-ready)
│   ├── data/
│   │   └── resume-data.tsx    # 📝 Edit your content here!
│   └── lib/
│       └── utils.ts           # Utility functions
├── public/                    # Static assets
└── AI_CHATBOT_INTEGRATION.md  # AI setup guide
```

## 🛠️ Built With

- [Next.js 14](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Radix UI](https://www.radix-ui.com/) - Accessible primitives
- [Vercel Analytics](https://vercel.com/analytics) - Performance tracking

## 🌟 Key Features Explained

### Command Menu (⌘J)

Press `Cmd+J` (Mac) or `Ctrl+J` (Windows/Linux) to open a command palette for quick navigation and printing.

### Print Optimization

The layout automatically adjusts for professional printing. Just use your browser's print function (⌘P / Ctrl+P).

### SEO & Social Sharing

Comprehensive meta tags, Open Graph, and Twitter Card support for perfect social media previews.

### Type Safety

Full TypeScript support ensures your data is always correctly structured.

## 📱 Responsive Design

- **Mobile**: Single column, touch-optimized
- **Tablet**: Two-column project grid
- **Desktop**: Optimized reading width with three-column projects
- **Print**: Professional multi-page layout

## 🚢 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/EmmanuelObi/Portfolio-2022)

Or manually:

```bash
npm run build
npm run start
```

### Environment Variables

For AI chatbot integration, add to `.env.local`:

```bash
OPENAI_API_KEY=your_key_here
# or
ANTHROPIC_API_KEY=your_key_here
```

## 📄 License

[MIT](https://choosealicense.com/licenses/mit/)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/EmmanuelObi/Portfolio-2022/issues).

## 📧 Contact

Emmanuel Obi - [@koliko_man](https://x.com/koliko_man)

Project Link: [https://github.com/EmmanuelObi/Portfolio-2022](https://github.com/EmmanuelObi/Portfolio-2022)

---

**⭐ Star this repo if you find it helpful!**
````
