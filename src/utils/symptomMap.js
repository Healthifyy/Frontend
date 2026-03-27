export const SYMPTOM_MAP = {
  "Fever": "high_fever",
  "Mild Fever": "mild_fever",
  "Cough": "cough",
  "Chest Pain": "chest_pain",
  "Breathlessness": "breathlessness",
  "Headache": "headache",
  "Vomiting": "vomiting",
  "Diarrhoea": "diarrhoea",
  "Fatigue": "fatigue",
  "Body Ache": "muscle_pain",
  "Skin Rash": "skin_rash",
  "Itching": "itching",
  "Nausea": "nausea",
  "Dizziness": "dizziness",
  "Back Pain": "back_pain",
  "Joint Pain": "joint_pain",
  "Loss of Appetite": "loss_of_appetite",
  "Sweating": "sweating",
  "Chills": "chills",
  "Runny Nose": "runny_nose",
  "Sore Throat": "throat_irritation",
  "Swelling": "swelled_lymph_nodes",
  "Yellow Eyes": "yellowing_of_eyes",
  "Dark Urine": "dark_urine",
  "Abdominal Pain": "abdominal_pain",
  "Constipation": "constipation",
  "Burning Urination": "burning_micturition",
  "Neck Stiffness": "neck_stiffness",
  "Fast Heartbeat": "fast_heart_rate",
  "Weight Loss": "weight_loss"
};

export const mapSymptomsToAPI = (labelArray) => {
  return labelArray.map(label => SYMPTOM_MAP[label]).filter(Boolean);
};
