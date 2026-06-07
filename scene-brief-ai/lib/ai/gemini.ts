import { SceneRequest, SceneData } from '@/types/scene';
import { buildScenePrompt } from './scenePrompt';

export async function generateWithGemini(request: SceneRequest): Promise<SceneData> {
    const apiKey = process.env.GEMINI_API_KEY;
    const baseURL = process.env.LITELLM_BASE_URL || 'https://litellm.vault.io.vn';

    if (!apiKey) {
        throw new Error('GEMINI_API_KEY not found');
    }

    console.log('[LiteLLM Debug] API Key:', apiKey?.substring(0, 10) + '...');
    console.log('[LiteLLM Debug] Base URL:', baseURL);

    const prompt = buildScenePrompt(request);

    // LiteLLM uses OpenAI-compatible API format
    const response = await fetch(`${baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: 'gemini-free',
            messages: [
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 2000
        })
    });

    console.log('[LiteLLM Debug] Response status:', response.status);

    if (!response.ok) {
        const errorText = await response.text();
        console.error('[LiteLLM Debug] Error response:', errorText);
        throw new Error(`LiteLLM API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const text = data.choices[0]?.message?.content;

    if (!text) {
        throw new Error('No content in LiteLLM response');
    }

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
