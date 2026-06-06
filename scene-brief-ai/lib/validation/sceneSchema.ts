import { z } from 'zod';

export const sceneRequestSchema = z.object({
    projectName: z.string().min(1, 'Tên dự án không được để trống'),
    spaceType: z.string().min(1, 'Loại không gian không được để trống'),
    customSpaceType: z.string().optional(),
    description: z.string().min(10, 'Mô tả phải có ít nhất 10 ký tự'),
    targetCustomers: z.string().min(5, 'Nhóm khách hàng mục tiêu không được để trống'),
    outputLanguage: z.enum(['vi', 'en']),
    tone: z.enum(['professional', 'dynamic', 'impressive']),
});

export type SceneRequestInput = z.infer<typeof sceneRequestSchema>;
