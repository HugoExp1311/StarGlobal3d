import { SceneRequest } from '@/types/scene';

export function buildScenePrompt(request: SceneRequest): string {
    const language = request.outputLanguage === 'vi' ? 'Vietnamese' : 'English';
    const toneMap = {
        professional: 'professional and trustworthy',
        dynamic: 'energetic and modern',
        impressive: 'impressive and premium'
    };

    const tone = toneMap[request.tone];
    const spaceType = request.spaceType === 'other' ? request.customSpaceType : request.spaceType;

    return `You are an AI assistant for a 3D digitization company specializing in creating virtual tours and digital spaces.

Generate marketing content for a 3D space project with the following details:
- Project Name: ${request.projectName}
- Space Type: ${spaceType}
- Description: ${request.description}
- Target Customers: ${request.targetCustomers}

Requirements:
- Output language: ${language}
- Tone: ${tone}
- Content must be customer-facing and marketing-focused
- Avoid unsupported claims or overly technical jargon

You MUST return ONLY valid JSON with this exact structure (no markdown, no code blocks):
{
  "title": "A compelling project title for the introduction page",
  "shortDescription": "A 2-3 sentence engaging description for customers in ${language}",
  "highlights": ["Highlight 1", "Highlight 2", "Highlight 3", "Highlight 4", "Highlight 5"],
  "digitizationNotes": ["Important consideration 1 for 3D digitization", "Important consideration 2 for 3D digitization", "Important consideration 3 for 3D digitization"],
  "seoKeywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
}

Generate 3-5 highlights that emphasize the space's key features.
Generate 3 digitization notes about important aspects to capture when creating the 3D digital version.
Generate 5 SEO/marketing keywords relevant to this space type and target audience.`;
}
