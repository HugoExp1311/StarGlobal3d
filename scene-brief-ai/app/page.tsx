'use client';

import { useState } from 'react';
import { SceneRequest, SceneResponse } from '@/types/scene';
import SceneForm from '@/components/SceneForm';
import SampleScenarioButtons from '@/components/SampleScenarioButtons';
import ResultCards from '@/components/ResultCards';
import JsonViewer from '@/components/JsonViewer';
import LoadingState from '@/components/LoadingState';
import ErrorMessage from '@/components/ErrorMessage';
import { saveResult } from '@/lib/storage/recentResults';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SceneResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formKey, setFormKey] = useState(0);

  const handleSubmit = async (data: SceneRequest) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/describe-scene', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(json.error || 'Đã xảy ra lỗi khi gọi API');
      }

      setResult(json);
      saveResult(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi không xác định');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSampleSelect = (data: SceneRequest) => {
    setFormKey(prev => prev + 1);
    setResult(null);
    setError(null);
    // Trigger form update
    setTimeout(() => handleSubmit(data), 100);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            SceneBrief AI
          </h1>
          <p className="text-lg text-gray-600">
            Tạo nội dung marketing chuyên nghiệp cho không gian 3D với AI
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Powered by Gemini AI • Star Global 3D
          </p>
        </header>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Thông tin dự án
              </h2>
              <SampleScenarioButtons
                onSelect={handleSampleSelect}
                disabled={isLoading}
              />
              <SceneForm
                key={formKey}
                onSubmit={handleSubmit}
                isLoading={isLoading}
              />
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">
                💡 Thông tin
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• AI sẽ tạo tiêu đề, mô tả và điểm nổi bật cho dự án</li>
                <li>• Kết quả được tạo bằng Gemini AI hoặc mock fallback</li>
                <li>• Lịch sử được lưu trong trình duyệt của bạn</li>
              </ul>
            </div>
          </div>

          {/* Right Column - Results */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Kết quả
              </h2>

              {!isLoading && !result && !error && (
                <div className="text-center py-12">
                  <svg className="w-20 h-20 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-gray-500">
                    Nhập thông tin và nhấn "Tạo nội dung" để bắt đầu
                  </p>
                </div>
              )}

              {isLoading && <LoadingState />}

              {error && <ErrorMessage message={error} />}

              {result && (
                <div className="space-y-4">
                  <ResultCards result={result} />
                  <JsonViewer result={result} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 text-sm text-gray-500">
          <p>© 2026 Star Global 3D - Internship Technical Test</p>
        </footer>
      </div>
    </main>
  );
}
