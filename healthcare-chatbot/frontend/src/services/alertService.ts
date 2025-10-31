export interface DiseaseAlert {
  id: string;
  disease: string;
  location: string;
  severity: 'High' | 'Medium' | 'Low';
  date: string; // ISO 8601 format
  summary: string;
  source: string;
}

// This is a mock database. In a real-world application, this would be a live API call
// to a source like the Integrated Disease Surveillance Programme (IDSP).
const mockAlerts: DiseaseAlert[] = [
  {
    id: 'dengue-del-2024-01',
    disease: 'Dengue Fever',
    location: 'Delhi, NCT',
    severity: 'High',
    date: '2024-07-15T00:00:00Z',
    summary: 'A sharp increase in Dengue cases has been reported across Delhi following heavy monsoon rains. Hospitals are seeing a surge in patients with high fever and joint pain. Residents are advised to eliminate stagnant water sources.',
    source: 'Integrated Disease Surveillance Programme (IDSP)',
  },
  {
    id: 'cholera-mh-2024-02',
    disease: 'Cholera',
    location: 'Mumbai, Maharashtra',
    severity: 'Medium',
    date: '2024-07-10T00:00:00Z',
    summary: 'A localized Cholera outbreak has been identified in several slum areas of Mumbai. Contaminated water is suspected to be the cause. Mobile medical camps are being set up.',
    source: 'National Health Portal',
  },
  {
    id: 'flu-ka-2024-03',
    disease: 'Influenza (H1N1)',
    location: 'Bengaluru, Karnataka',
    severity: 'Medium',
    date: '2024-07-18T00:00:00Z',
    summary: 'Seasonal influenza cases, including H1N1 subtype, are on the rise in Bengaluru. The public is encouraged to get vaccinated and practice good hygiene.',
    source: 'State Health Department, Karnataka',
  },
];

/**
 * Simulates fetching real-time disease outbreak alerts.
 * @returns An array of disease alert objects.
 */
export const fetchDiseaseAlerts = (): DiseaseAlert[] => {
  console.log('Fetching mock disease alerts...');
  return mockAlerts;
};