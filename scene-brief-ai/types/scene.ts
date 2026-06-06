export interface SceneRequest {
  projectName: string;
  spaceType: string;
  customSpaceType?: string;
  description: string;
  targetCustomers: string;
  outputLanguage: 'vi' | 'en';
  tone: 'professional' | 'dynamic' | 'impressive';
}

export interface SceneData {
  title: string;
  shortDescription: string;
  highlights: string[];
  digitizationNotes: string[];
  seoKeywords: string[];
}

export interface SceneResponse {
  success: boolean;
  source: 'gemini' | 'mock';
  notice?: string;
  data: SceneData;
}

export interface SampleScenario {
  id: string;
  label: string;
  data: SceneRequest;
}
