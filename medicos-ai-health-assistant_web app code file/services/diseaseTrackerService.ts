import { DiseaseData } from '../types';
import { diseaseDatabase } from '../data/diseaseDatabase';

export const getDiseaseData = (): Promise<DiseaseData[]> => {
    // Simulate an API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(diseaseDatabase);
        }, 500);
    });
};
