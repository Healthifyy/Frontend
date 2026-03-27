import { SYMPTOM_MAP } from '../utils/symptomMap';

export const SYMPTOMS = Object.entries(SYMPTOM_MAP).map(([label, value]) => ({
  label,
  value
}));
