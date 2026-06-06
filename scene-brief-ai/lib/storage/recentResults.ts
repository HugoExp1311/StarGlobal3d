import { SceneResponse } from '@/types/scene';

const STORAGE_KEY = 'scene-brief-recent-results';
const MAX_RESULTS = 5;

export function saveResult(result: SceneResponse): void {
    if (typeof window === 'undefined') return;

    try {
        const existing = getRecentResults();
        const updated = [
            { ...result, timestamp: Date.now() },
            ...existing
        ].slice(0, MAX_RESULTS);

        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

export function getRecentResults(): any[] {
    if (typeof window === 'undefined') return [];

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return [];
    }
}

export function clearResults(): void {
    if (typeof window === 'undefined') return;

    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Error clearing localStorage:', error);
    }
}
