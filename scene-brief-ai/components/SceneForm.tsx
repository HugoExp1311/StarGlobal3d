'use client';

import { useState } from 'react';
import { SceneRequest } from '@/types/scene';

interface SceneFormProps {
    onSubmit: (data: SceneRequest) => void;
    isLoading: boolean;
}

export default function SceneForm({ onSubmit, isLoading }: SceneFormProps) {
    const [formData, setFormData] = useState<SceneRequest>({
        projectName: '',
        spaceType: 'apartment',
        customSpaceType: '',
        description: '',
        targetCustomers: '',
        outputLanguage: 'vi',
        tone: 'professional'
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.projectName.trim()) {
            newErrors.projectName = 'Tên dự án không được để trống';
        }
        if (!formData.spaceType) {
            newErrors.spaceType = 'Vui lòng chọn loại không gian';
        }
        if (formData.spaceType === 'other' && !formData.customSpaceType?.trim()) {
            newErrors.customSpaceType = 'Vui lòng nhập loại không gian tùy chỉnh';
        }
        if (!formData.description.trim() || formData.description.length < 10) {
            newErrors.description = 'Mô tả phải có ít nhất 10 ký tự';
        }
        if (!formData.targetCustomers.trim()) {
            newErrors.targetCustomers = 'Nhóm khách hàng không được để trống';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="projectName" className="block text-sm font-medium mb-1">
                    Tên dự án <span className="text-red-500">*</span>
                </label>
                <input
                    id="projectName"
                    name="projectName"
                    type="text"
                    value={formData.projectName}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    placeholder="Ví dụ: The Horizon Apartment"
                />
                {errors.projectName && <p className="text-red-500 text-sm mt-1">{errors.projectName}</p>}
            </div>

            <div>
                <label htmlFor="spaceType" className="block text-sm font-medium mb-1">
                    Loại không gian <span className="text-red-500">*</span>
                </label>
                <select
                    id="spaceType"
                    name="spaceType"
                    value={formData.spaceType}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                >
                    <option value="apartment">Căn hộ</option>
                    <option value="office">Văn phòng</option>
                    <option value="store">Cửa hàng</option>
                    <option value="exhibition">Triển lãm</option>
                    <option value="other">Khác</option>
                </select>
                {errors.spaceType && <p className="text-red-500 text-sm mt-1">{errors.spaceType}</p>}
            </div>

            {formData.spaceType === 'other' && (
                <div>
                    <label htmlFor="customSpaceType" className="block text-sm font-medium mb-1">
                        Loại không gian tùy chỉnh <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="customSpaceType"
                        name="customSpaceType"
                        type="text"
                        value={formData.customSpaceType || ''}
                        onChange={handleChange}
                        disabled={isLoading}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        placeholder="Nhập loại không gian"
                    />
                    {errors.customSpaceType && <p className="text-red-500 text-sm mt-1">{errors.customSpaceType}</p>}
                </div>
            )}

            <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                    Mô tả ngắn <span className="text-red-500">*</span>
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    disabled={isLoading}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    placeholder="Mô tả về nội dung/mục đích sử dụng không gian"
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            <div>
                <label htmlFor="targetCustomers" className="block text-sm font-medium mb-1">
                    Nhóm khách hàng mục tiêu <span className="text-red-500">*</span>
                </label>
                <input
                    id="targetCustomers"
                    name="targetCustomers"
                    type="text"
                    value={formData.targetCustomers}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    placeholder="Ví dụ: Gia đình trẻ, nhà đầu tư"
                />
                {errors.targetCustomers && <p className="text-red-500 text-sm mt-1">{errors.targetCustomers}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="outputLanguage" className="block text-sm font-medium mb-1">
                        Ngôn ngữ kết quả
                    </label>
                    <select
                        id="outputLanguage"
                        name="outputLanguage"
                        value={formData.outputLanguage}
                        onChange={handleChange}
                        disabled={isLoading}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    >
                        <option value="vi">Tiếng Việt</option>
                        <option value="en">English</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="tone" className="block text-sm font-medium mb-1">
                        Phong cách
                    </label>
                    <select
                        id="tone"
                        name="tone"
                        value={formData.tone}
                        onChange={handleChange}
                        disabled={isLoading}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    >
                        <option value="professional">Chuyên nghiệp</option>
                        <option value="dynamic">Năng động</option>
                        <option value="impressive">Ấn tượng</option>
                    </select>
                </div>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium transition-colors"
            >
                {isLoading ? 'Đang tạo...' : 'Tạo nội dung'}
            </button>
        </form>
    );
}
