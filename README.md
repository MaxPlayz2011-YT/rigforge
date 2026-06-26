# RigForge - AI PC Builder

An interactive PC builder website with AI-powered component recognition using Claude's vision API.

## Features

- 📱 BuildCores 3D builder preview embedded with iframe
- 🤖 AI-powered screenshot analysis to auto-fill components
- 💰 Real-time price calculation
- 🎯 60+ real PC components across 6 categories
- ✨ Modern glassmorphic UI with dark theme

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js + Express
- **AI:** Anthropic Claude Vision API
- **Hosting:** Vercel

## Quick Start

### Local Development

```bash
npm install
node api/analyze.js
```

### Deployment

1. Push to GitHub
2. Import repo to [Vercel](https://vercel.com)
3. Add environment variable:
   - `CLAUDE_API_KEY`: Your Claude API key
4. Deploy

Your site will be live at `https://your-project.vercel.app`

## File Structure

```
.
├── public/              # Static files (HTML, CSS, JS)
├── api/
│   └── analyze.js      # Backend API endpoint
├── package.json
├── vercel.json
└── README.md
```

## How It Works

1. Users configure a PC in the BuildCores 3D builder
2. Click "📸 Analyze with AI" to capture a screenshot
3. Claude Vision analyzes the screenshot and extracts component names
4. Components auto-fill in the dropdowns
5. Real-time pricing updates as selections change
