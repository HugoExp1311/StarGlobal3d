export const SAMPLE_SCENARIOS = [
    {
        id: 'apartment',
        label: 'Căn hộ cao cấp',
        data: {
            projectName: 'The Horizon Apartment',
            spaceType: 'apartment',
            customSpaceType: '',
            description: 'Căn hộ cao cấp 2 phòng ngủ, thiết kế hiện đại, có ban công rộng và khu vực sinh hoạt mở.',
            targetCustomers: 'Gia đình trẻ, chuyên gia đi làm, nhà đầu tư bất động sản',
            outputLanguage: 'vi' as const,
            tone: 'professional' as const
        }
    },
    {
        id: 'office',
        label: 'Văn phòng sáng tạo',
        data: {
            projectName: 'Nova Creative Office',
            spaceType: 'office',
            customSpaceType: '',
            description: 'Không gian làm việc mở dành cho đội ngũ sáng tạo, có khu brainstorming, phòng họp kính và pantry.',
            targetCustomers: 'Startup, công ty công nghệ, agency sáng tạo',
            outputLanguage: 'vi' as const,
            tone: 'dynamic' as const
        }
    },
    {
        id: 'exhibition',
        label: 'Không gian triển lãm',
        data: {
            projectName: 'Future Tech Expo',
            spaceType: 'exhibition',
            customSpaceType: '',
            description: 'Không gian triển lãm công nghệ tương tác, trưng bày sản phẩm số, khu trải nghiệm VR và booth đối tác.',
            targetCustomers: 'Khách tham quan triển lãm, doanh nghiệp công nghệ, nhà tài trợ',
            outputLanguage: 'vi' as const,
            tone: 'impressive' as const
        }
    }
];
