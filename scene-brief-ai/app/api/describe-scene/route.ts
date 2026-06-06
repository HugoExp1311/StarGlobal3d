import { NextResponse } from 'next/server';
import { sceneRequestSchema } from '@/lib/validation/sceneSchema';
import { generateWithGemini } from '@/lib/ai/gemini';
import { generateMockScene } from '@/lib/ai/mockSceneAI';
import { SceneResponse } from '@/types/scene';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate request
        const validation = sceneRequestSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: validation.error.errors[0].message
                },
                { status: 400 }
            );
        }

        const sceneRequest = validation.data;
        let response: SceneResponse;

        // Try Gemini first
        try {
            const data = await generateWithGemini(sceneRequest);
            response = {
                success: true,
                source: 'gemini',
                data
            };
        } catch (geminiError) {
            // Fallback to mock AI
            console.log('Gemini failed, using mock fallback:', geminiError);
            const data = generateMockScene(sceneRequest);
            response = {
                success: true,
                source: 'mock',
                notice: 'Gemini API không khả dụng, đã sử dụng mock AI fallback.',
                data
            };
        }

        return NextResponse.json(response);
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Đã xảy ra lỗi khi xử lý yêu cầu'
            },
            { status: 500 }
        );
    }
}
