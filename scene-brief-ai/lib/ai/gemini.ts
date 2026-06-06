import { GoogleGenerativeAI } from '@google/generative-ai';
import { SceneRequest, SceneData } from '@/types/scene';
import { buildScenePrompt } from './scenePrompt';

export async function generateWithGemini(request: SceneRequest): Promise<SceneData> {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        throw new Error('GEMINI_API_KEY not found');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = buildScenePrompt(request);

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean potential markdown code blocks
    let cleanedText = text.trim();
    if (cleanedText.startsWith('```json')) {
        cleanedText = cleanedText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanedText.startsWith('```')) {
        cleanedText = cleanedText.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    const parsed = JSON.parse(cleanedText);

    // Validate structure
    if (!parsed.title || !parsed.shortDescription || !Array.isArray(parsed.highlights)) {
        throw new Error('Invalid response structure from Gemini');
    }

    return {
        title: parsed.title,
        shortDescription: parsed.shortDescription,
        highlights: parsed.highlights,
        digitizationNotes: parsed.digitizationNotes || [],
        seoKeywords: parsed.seoKeywords || [],
    };
}
