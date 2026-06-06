import { SceneRequest, SceneData } from '@/types/scene';

const templates = {
    'apartment': {
        vi: {
            title: 'Căn Hộ Cao Cấp - Không Gian Sống Hiện Đại',
            shortDescription: 'Khám phá không gian sống tinh tế với thiết kế hiện đại, tối ưu công năng và ánh sáng tự nhiên. Trải nghiệm 3D cho phép bạn cảm nhận từng chi tiết trước khi quyết định.',
            highlights: [
                'Thiết kế mở tối ưu ánh sáng tự nhiên',
                'Nội thất cao cấp, hiện đại',
                'View đẹp, không gian thoáng đãng',
                'Tiện ích đầy đủ trong khu vực',
                'Bố trí thông minh, tối ưu diện tích'
            ],
            digitizationNotes: [
                'Chụp vào buổi sáng để tận dụng ánh sáng tự nhiên',
                'Chú ý các góc nhìn từ ban công và cửa sổ',
                'Ghi lại chi tiết nội thất và vật liệu hoàn thiện'
            ],
            seoKeywords: ['căn hộ cao cấp', 'virtual tour', '3D apartment', 'không gian sống hiện đại', 'bất động sản số hóa']
        },
        en: {
            title: 'Premium Apartment - Modern Living Space',
            shortDescription: 'Explore an elegant living space with modern design, optimized functionality, and natural lighting. The 3D experience lets you feel every detail before making your decision.',
            highlights: [
                'Open design maximizing natural light',
                'Premium, modern furnishings',
                'Beautiful views, spacious environment',
                'Complete amenities in the area',
                'Smart layout, optimized space'
            ],
            digitizationNotes: [
                'Capture during morning hours for natural lighting',
                'Focus on views from balconies and windows',
                'Document interior details and finishing materials'
            ],
            seoKeywords: ['premium apartment', 'virtual tour', '3D apartment', 'modern living space', 'digital real estate']
        }
    },
    'office': {
        vi: {
            title: 'Văn Phòng Sáng Tạo - Nơi Ý Tưởng Phát Triển',
            shortDescription: 'Không gian làm việc linh hoạt, khuyến khích sáng tạo và hợp tác. Tour 3D mang đến trải nghiệm chân thực về môi trường làm việc hiện đại của bạn.',
            highlights: [
                'Khu vực làm việc mở, linh hoạt',
                'Phòng họp hiện đại với công nghệ',
                'Khu vực thư giãn và brainstorming',
                'Hệ thống ánh sáng thông minh',
                'Không gian xanh tích hợp'
            ],
            digitizationNotes: [
                'Ghi lại các khu vực làm việc chung và riêng',
                'Chụp phòng họp với thiết bị công nghệ',
                'Thể hiện flow di chuyển giữa các khu vực'
            ],
            seoKeywords: ['văn phòng hiện đại', 'creative office', 'virtual office tour', 'không gian làm việc', 'coworking space']
        },
        en: {
            title: 'Creative Office - Where Ideas Thrive',
            shortDescription: 'A flexible workspace that encourages creativity and collaboration. The 3D tour provides an authentic experience of your modern work environment.',
            highlights: [
                'Open, flexible workspace',
                'Modern meeting rooms with technology',
                'Relaxation and brainstorming areas',
                'Smart lighting system',
                'Integrated green spaces'
            ],
            digitizationNotes: [
                'Document both shared and private work areas',
                'Capture meeting rooms with tech equipment',
                'Show flow between different zones'
            ],
            seoKeywords: ['modern office', 'creative office', 'virtual office tour', 'workspace', 'coworking space']
        }
    },
    'exhibition': {
        vi: {
            title: 'Không Gian Triển Lãm Tương Tác - Trải Nghiệm Số Hóa',
            shortDescription: 'Triển lãm hiện đại với trải nghiệm tương tác và công nghệ tiên tiến. Virtual tour cho phép khách tham quan từ mọi nơi, mọi lúc.',
            highlights: [
                'Khu vực trưng bày tương tác',
                'Trải nghiệm công nghệ VR/AR',
                'Thiết kế ánh sáng ấn tượng',
                'Booth đối tác chuyên nghiệp',
                'Luồng tham quan tối ưu'
            ],
            digitizationNotes: [
                'Chụp theo flow tham quan dự kiến',
                'Ghi lại các điểm tương tác và màn hình',
                'Chú ý hiệu ứng ánh sáng và âm thanh'
            ],
            seoKeywords: ['triển lãm số', 'virtual exhibition', '3D showroom', 'interactive display', 'digital event']
        },
        en: {
            title: 'Interactive Exhibition Space - Digital Experience',
            shortDescription: 'Modern exhibition with interactive experiences and advanced technology. Virtual tour allows visitors to explore from anywhere, anytime.',
            highlights: [
                'Interactive display areas',
                'VR/AR technology experiences',
                'Impressive lighting design',
                'Professional partner booths',
                'Optimized visitor flow'
            ],
            digitizationNotes: [
                'Capture following expected visitor flow',
                'Document interactive points and screens',
                'Focus on lighting and sound effects'
            ],
            seoKeywords: ['digital exhibition', 'virtual exhibition', '3D showroom', 'interactive display', 'digital event']
        }
    }
};

export function generateMockScene(request: SceneRequest): SceneData {
    const spaceType = request.spaceType.toLowerCase();
    const lang = request.outputLanguage;

    // Use template if available, otherwise generic
    let template = templates['apartment'][lang]; // default

    if (spaceType.includes('apartment') || spaceType.includes('căn hộ')) {
        template = templates['apartment'][lang];
    } else if (spaceType.includes('office') || spaceType.includes('văn phòng')) {
        template = templates['office'][lang];
    } else if (spaceType.includes('exhibition') || spaceType.includes('triển lãm')) {
        template = templates['exhibition'][lang];
    }

    return {
        title: `${request.projectName} - ${template.title}`,
        shortDescription: template.shortDescription,
        highlights: template.highlights,
        digitizationNotes: template.digitizationNotes,
        seoKeywords: template.seoKeywords
    };
}
