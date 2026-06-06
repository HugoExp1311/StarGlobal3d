# SceneBrief AI

AI-powered content generator for 3D digitized spaces. Create professional marketing descriptions, highlights, and SEO keywords for virtual tours and digital spaces.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI Provider**: Google Gemini API (free tier)
- **Validation**: Zod
- **Storage**: Browser localStorage

## Features

- ✅ Vietnamese UI with bilingual output (Vietnamese/English)
- ✅ Gemini AI integration with automatic mock fallback
- ✅ Professional marketing content generation
- ✅ 3D digitization recommendations
- ✅ SEO keyword suggestions
- ✅ Sample scenario quick-fill buttons
- ✅ Raw JSON output viewer
- ✅ Recent results history (localStorage)
- ✅ Responsive design (desktop/mobile)
- ✅ Loading states and error handling

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the project root:

```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

**Note**: The app works without an API key using the mock AI fallback.

#### Getting a Gemini API Key (Free)

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key to your `.env.local` file

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
scene-brief-ai/
├── app/
│   ├── api/
│   │   └── describe-scene/
│   │       └── route.ts          # API endpoint
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Main page
│   └── globals.css               # Global styles
├── components/
│   ├── SceneForm.tsx             # Input form
│   ├── SampleScenarioButtons.tsx # Demo data buttons
│   ├── ResultCards.tsx           # Results display
│   ├── JsonViewer.tsx            # Raw JSON viewer
│   ├── LoadingState.tsx          # Loading spinner
│   └── ErrorMessage.tsx          # Error display
├── lib/
│   ├── ai/
│   │   ├── gemini.ts             # Gemini provider
│   │   ├── mockSceneAI.ts        # Mock fallback
│   │   └── scenePrompt.ts        # Prompt builder
│   ├── validation/
│   │   └── sceneSchema.ts        # Zod validation
│   ├── storage/
│   │   └── recentResults.ts      # localStorage utils
│   └── data/
│       └── sampleScenarios.ts    # Sample data
└── types/
    └── scene.ts                  # TypeScript types
```

## API Endpoint

### POST /api/describe-scene

**Request Body:**

```json
{
  "projectName": "The Horizon Apartment",
  "spaceType": "apartment",
  "customSpaceType": "",
  "description": "Premium 2-bedroom apartment with modern design",
  "targetCustomers": "Young families and investors",
  "outputLanguage": "vi",
  "tone": "professional"
}
```

**Response:**

```json
{
  "success": true,
  "source": "gemini",
  "data": {
    "title": "Project title",
    "shortDescription": "Description...",
    "highlights": ["...", "..."],
    "digitizationNotes": ["...", "..."],
    "seoKeywords": ["...", "..."]
  }
}
```

## Gemini + Mock Fallback

The app uses a **hybrid AI strategy**:

1. **Primary**: Gemini API (if `GEMINI_API_KEY` exists)
2. **Fallback**: Template-based mock AI (if Gemini fails or no key)

This ensures the app always works, even without an API key.

## Manual Testing Checklist

- [ ] Submit empty form → validation errors appear
- [ ] Click sample scenario button → form fills automatically
- [ ] Generate Vietnamese output → content displays correctly
- [ ] Generate English output → content displays correctly
- [ ] Remove `.env.local` → mock fallback works
- [ ] Check raw JSON viewer → JSON displays correctly
- [ ] Resize browser → responsive layout works
- [ ] Generate multiple results → localStorage saves history

## Build for Production

```bash
npm run build
npm start
```

## Deploy to Vercel (Optional)

1. Push code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Add `GEMINI_API_KEY` to environment variables
5. Deploy

## License

Created for Star Global 3D internship technical test.
