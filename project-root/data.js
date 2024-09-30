// data.js

// Fluids Data
const fluids = [
  getFluids
];

// Lab Corrections Data
const labCorrections = [
  { test: "Sodium", normalRange: "135-145 mEq/L", correctionFormula: "3% NaCl at 1 mEq/kg/dose" },
  { test: "Potassium", normalRange: "3.5-5.0 mEq/L", correctionFormula: "KCl 2 mEq/kg/day" },
  { test: "Calcium", normalRange: "2.5-3.5 mEq/L", correctionFormula: "CaCl 2 mEq/kg/day" },
  { test: "Chloride", normalRange: "85-95 mEq/L", correctionFormula: "Cl 1.5 mEq/kg/day" },
  // Add more lab corrections as needed
];

// Resuscitation Protocols Data
const resusProtocols = [
  {
    name: "Pediatric Advanced Life Support (PALS)", 
    steps: [
      "Assess ABCs (Airway, Breathing, Circulation)",
      "Provide oxygen if needed",
      "Establish IV/IO access",
      "Administer fluid bolus (20 ml/kg)",
      "Consider medications based on rhythm and clinical condition"
    ]
  },
  // Add more resuscitation protocols as needed
];

// Guidelines Data
const guidelines = [
  { condition: "Diabetic Ketoacidosis", symptoms: "Hyperglycemia, ketosis, acidosis", guidelines: "Check blood glucose, ketones, and pH; administer insulin and fluids" },
  { condition: "Diabetic Ketoacidosis", symptoms: "Hyperglycemia, ketosis, acidosis", guidelines: "Administer insulin, fluids, and electrolytes; monitor blood glucose and ketones" },
  { condition: "Metabolic Disorder", symptoms: "Varying symptoms depending on disorder", guidelines: "Check blood glucose, electrolytes, and pH; administer treatment based on disorder" },
  { condition: "Anaphylaxis", symptoms: "Hives, itching, swelling, difficulty breathing", guidelines: "Check for symptoms; administer epinephrine and antihistamines" },
  { condition: "Anaphylaxis", symptoms: "Hives, itching, swelling, difficulty breathing", guidelines: "Administer epinephrine, antihistamines, and corticosteroids" },
  { condition: "Lower Extremity Injury", symptoms: "Pain, swelling, difficulty walking", guidelines: "Check for fractures, sprains, and strains; administer pain medication" },
  { condition: "Respiratory Distress", symptoms: "Difficulty breathing, wheezing", guidelines: "Administer oxygen, nasal cannula, or noninvasive ventilation" },
  { condition: "Dehydration", symptoms: "Vomiting, diarrhea, dry mouth", guidelines: "Administer fluids, electrolytes, and anti-diarrheal medication" },
  { condition: "Critically Ill Neonate", symptoms: "Respiratory distress, hypotension, hypoglycemia", guidelines: "Administer oxygen, fluids, and medications as needed" },
  { condition: "Pain and Anxiety", symptoms: "Pain, anxiety, fear", guidelines: "Administer pain medication, sedation, and anxiety medication" },
  { condition: "Jaundice", symptoms: "Yellow skin and eyes, dark urine", guidelines: "Administer phototherapy, exchange transfusion, and bilirubin monitoring" },
  { condition: "Enterovirus", symptoms: "Fever, rash, respiratory distress", guidelines: "Administer antiviral medication, supportive care" },
  { condition: "Influenza", symptoms: "Fever, cough, sore throat", guidelines: "Check for symptoms, administer antiviral medication" },
  { condition: "Seizure", symptoms: "Convulsions, loss of consciousness", guidelines: "Administer anticonvulsant medication, supportive care" },
  { condition: "Neutropenia", symptoms: "Fever, infection", guidelines: "Administer antibiotics, monitor for signs of infection" }
  // Completed data
];

// Store data in localStorage
localStorage.setItem('fluids', JSON.stringify(fluids));
localStorage.setItem('labCorrections', JSON.stringify(labCorrections));
localStorage.setItem('resusProtocols', JSON.stringify(resusProtocols));
localStorage.setItem('guidelines', JSON.stringify(guidelines));

// API-like functions to retrieve data
export function getFluids() {
  return JSON.parse(localStorage.getItem('fluids'));
}

/**
 * Retrieves lab corrections from local storage.
 * @return {Object[]} An array of lab corrections, each containing a test, normal range, and correction formula.
 */
export function getLabCorrections() {
  return JSON.parse(localStorage.getItem('labCorrections'));
}

/**
 * Retrieves resuscitation protocols from local storage.
 * @return {Object[]} An array of resuscitation protocols, each containing a name and steps.
 */
export function getResusProtocols() {
  return JSON.parse(localStorage.getItem('resusProtocols'));
}

/**
 * Retrieves guidelines from local storage.
 * @return {Object[]} An array of guidelines, each containing a condition, symptoms, and guidelines.
 */
export function getGuidelines() {
  return JSON.parse(localStorage.getItem('guidelines'));
}