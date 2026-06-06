'use client';

import { SceneResponse } from '@/types/scene';

interface ResultCardsProps {
    result: SceneResponse;
}

export default function ResultCards({ result }: ResultCardsProps) {
    const { data, source, notice } = result;

    return (
        <div className="space-y-4">
            {notice && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                    <div className="flex items-start">
                        <svg className="w-5 h-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <div>
                            <p className="text-sm text-yellow-800 font-medium">Mock AI Fallback</p>
                            <p className="text-sm text-yellow-700">{notice}</p>
                        </div>
                    </div>
                </div>
            )}

            {source === 'gemini' && (
                <div className="bg-green-50 border border-green-200 rounded-md p-2">
                    <p className="text-xs text-green-700 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Gemini AI
                    </p>
                </div>
            )}

            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Tiêu đề dự án</h3>
                <p className="text-gray-800">{data.title}</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Mô tả ngắn</h3>
                <p className="text-gray-700 leading-relaxed">{data.shortDescription}</p>
            </div>

            {data.highlights.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Điểm nổi bật</h3>
                    <ul className="space-y-2">
                        {data.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-start">
                                <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-gray-700">{highlight}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {data.digitizationNotes.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Lưu ý khi số hóa 3D</h3>
                    <ul className="space-y-2">
                        {data.digitizationNotes.map((note, idx) => (
                            <li key={idx} className="flex items-start">
                                <svg className="w-5 h-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                <span className="text-gray-700">{note}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {data.seoKeywords.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Từ khóa SEO/Marketing</h3>
                    <div className="flex flex-wrap gap-2">
                        {data.seoKeywords.map((keyword, idx) => (
                            <span
                                key={idx}
                                className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-200"
                            >
                                {keyword}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
