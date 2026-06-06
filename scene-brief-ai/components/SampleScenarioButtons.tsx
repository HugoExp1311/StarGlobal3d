'use client';

import { SAMPLE_SCENARIOS } from '@/lib/data/sampleScenarios';
import { SceneRequest } from '@/types/scene';

interface SampleScenarioButtonsProps {
    onSelect: (data: SceneRequest) => void;
    disabled: boolean;
}

export default function SampleScenarioButtons({ onSelect, disabled }: SampleScenarioButtonsProps) {
    return (
        <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Dùng dữ liệu mẫu:</p>
            <div className="flex flex-wrap gap-2">
                {SAMPLE_SCENARIOS.map(scenario => (
                    <button
                        key={scenario.id}
                        type="button"
                        onClick={() => onSelect(scenario.data)}
                        disabled={disabled}
                        className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {scenario.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
