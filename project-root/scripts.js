//scripts.js

// Service Worker Configuration for caching
const CACHE_NAME = 'paeds-er-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/scripts.js',
  '/medications.js',
];

// Service Worker Registration (enhanced)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js')
      .then(function(registration) {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(function(err) {
        console.error('Service Worker registration failed:', err);
      });
  });
}
// Categories for treatment types
const categories = {                    
  FluidResuscitation: [],                
  FluidMaintenance: [],                  
  Antibiotics: [],                       
  Antivirals: [],                        
  Antimalarials: [],                     
  Antifungals: [],                       
  Antituberculars: [],                   
  Aminoglycosides: [],                   
  Vasodilators: [],                      
  Antiarrythmics: [],                    
  Sedatives: [],                         
  MuscleRelaxants: [],                   
  Antihistamines: [],                    
  Corticosteroids: [],                   
  Diuretics: [],                         
  Electrolytes: [],                      
  Antacids: [],                          
  NSAIDs: [],                            
  Vitamins: [],                          
  BetaBlockers: [],                      
  Resuscitation: [],                     
  Cardioversion: [],                     
  Antiepileptics: [],                    
  PulmonaryVasodilators: [],             
  Bronchodilators: [],                   
  HypercyanoticSpells: [],               
  Opioids: [],                           
  Vasoconstrictors: [],                  
  Syrups: [],                            
  Reversals: [],                         
  Insulin: [],                           
  BloodProducts: [],                     
  Hyperkalemia: [],                      
  Infusions: []                          
};

// Import API functions from data.js
import { getFluids, getGuidelines, getResusProtocols, getLabCorrections } from './data.js';

// Import application setup functions from main.js
import { installApp, setupTables } from './main.js';

// Import button and linking functions from medications.js
import { showInstallButton } from './medications.js';

// Mock Data for testing – Dehydration Plans
const dehydrationPlan = [
  { name: "Plan A", dose: 50 },
  { name: "Plan B", dose: 100 },
  { name: "Plan C-30 percent", dose:30 },
  { name: "Plan C-70 percent", dose:70 },
];

// Mock Data for medications
const medications = [
  { name: "Ceftriaxone", dose: 50, frequency: "OD" },
  { name: "Amoxicillin", dose: 7.5, frequency: "BD" },
  { name: "Ciprofloxacin", dose: 10, frequency: "BD" },

];

// Mock Data for lab corrections
const labCorrections = [
  { name: "Sodium Correction", dose: 3 },
  { name: "Potassium Correction", dose: 2 },
  { name: "Calcium Correction", dose: 2 },
  { name: "Magnesium Correction", dose: 1 },
  { name: "Phosphorus Correction", dose: 1 },
  { name: "Vitamin D Correction", dose: 1 },
  { name: "Chloride Correction", dose: 1 }
];

// Mock Data for resuscitation protocols
const resuscitationProtocols = [
  { name: "Resuscitation A", dose: 10, frequency: "every 30 min" },
  { name: "Resuscitation B", dose: 20, frequency: "every 1 hour" }
];

// Trigger on weight input for calculations
document.getElementById('weight').addEventListener('input', function () {
  const weight = parseFloat(this.value);
  if (weight > 0) {
    calculateFluids(weight);

    // Calculate medications for all categories
    for (const category in categories) {
      calculateMedications(weight, category); 
    }

    calculateLabCorrections(weight);
    calculateResuscitation(weight);
    populateGuidelinesTable(); 
  }
});

// Functions for calculations

// Calculate fluid requirements based on weight
function calculateFluids(weight) {
  const tbody = document.querySelector('#fluidsTable tbody');
  tbody.innerHTML = ''; 
  const fluidsData = getFluids(); // Fetch fluids data using the API function
  fluidsData.forEach(fluid => {
    const tr = document.createElement('tr');
    const hourlyRate = calculateHourlyRate(weight, fluid.rate);
    const totalVolume = calculateTotalVolume(weight, fluid.rate);
    tr.innerHTML = `
      <td>${fluid.name}</td>
      <td>${hourlyRate} ml/hr</td>
      <td>${totalVolume} ml</td>
    `;
    tbody.appendChild(tr);
  });
}

// Calculate medication dosages based on weight
function calculateMedications(weight) {
  const tbody = document.querySelector('#medsTable tbody'); 
  tbody.innerHTML = ''; 
  medications.forEach(med => {
    const tr = document.createElement('tr'); 
    tr.innerHTML = `<td><span class="math-inline">\{med\.name\}</td\><td\></span>{(med.dose * weight).toFixed(2)} mg ${med.frequency}</td>`; 
    tbody.appendChild(tr); 
  });
}

// Calculate lab corrections based on weight
function calculateLabCorrections(weight) {
  const tbody = document.querySelector('#labsTable tbody');
  tbody.innerHTML = '';
  const labCorrectionsData = getLabCorrections(); // Fetch lab corrections data
  labCorrectionsData.forEach(lab => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${lab.test}</td>
      <td>${lab.normalRange}</td>
      <td>${lab.correctionFormula}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Calculate resuscitation dosages based on weight
function calculateResuscitation(weight) {
  const tbody = document.querySelector('#resusTable tbody');
  tbody.innerHTML = '';
  const resusProtocolsData = getResusProtocols(); // Fetch resuscitation protocols data
  resusProtocolsData.forEach(protocol => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${protocol.name}</td>
      <td>${protocol.steps.join('<br>')}</td> 
    `;
    tbody.appendChild(tr);
  });
}

// Visual Enhancements for Stunning UI (enhanced)
function setupTables() {
  ['fluidsTable', 'medsTable', 'labsTable', 'resusTable', 'guidelinesTable'].forEach(tableId => {
    const table = document.getElementById(tableId); 

    // Create table header if it doesn't exist
    if (!table.querySelector('thead')) {
      const thead = document.createElement('thead');
      const headerRow = document.createElement('tr');
      // Add appropriate header cells based on the table's purpose
      switch (tableId) {
        case 'fluidsTable':
          headerRow.innerHTML = `
            <th>Fluid Type</th>
            <th>Hourly Rate (mL/hr)</th>
            <th>Total Volume (mL) for 24 hours</th>
          `;
          break;
        case 'medsTable':
          headerRow.innerHTML = `
            <th>Medication</th>
            <th>Dose</th>
            <th>Formula Used</th>
            <th>Indications</th>
          `;
          break;
        case 'labsTable':
          headerRow.innerHTML = `
            <th>Correction</th>
            <th>Dosage</th>
          `;
          break;
        case 'resusTable':
          headerRow.innerHTML = `
            <th>Protocol</th>
            <th>Steps</th>
          `;
          break;
        case 'guidelinesTable':
          headerRow.innerHTML = `
            <th>Guideline</th>
            <th>Details</th>
          `;
          break;
      }
      thead.appendChild(headerRow);
      table.appendChild(thead);
    }

    // Create table body if it doesn't exist
    if (!table.querySelector('tbody')) {
      const tbody = document.createElement('tbody');
      tbody.id = `${tableId}-body`;
      table.appendChild(tbody);
    }

    table.classList.add('styled-table'); 
  });
}

// Call this once during initialization
setupTables();

const guidelinesData = [
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
  { condition: "Neutropenia", symptoms: "Fever, infection", guidelines: "Administer antibiotics, monitor for signs of infection" } // Completed data
];

// Populate Guidelines Function
function populateGuidelinesTable() {
  const tbody = document.querySelector('#guidelinesTable tbody');
  tbody.innerHTML = '';
  const guidelinesData = getGuidelines(); // Fetch guidelines data
  guidelinesData.forEach(guideline => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${guideline.name}</td>
      <td>${guideline.details}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Call populateGuidelinesTable initially
populateGuidelinesTable();

// Example service worker to cache all resources for offline use
self.addEventListener('install', event => {  // Listen for install event of the service worker
  event.waitUntil(  // Wait until the cache is opened
    caches.open(CACHE_NAME).then(cache => {  // Open the cache with the defined cache name
      console.log('Opened cache');  // Log to console when cache is opened
      return cache.addAll(urlsToCache);  // Cache all specified URLs
    })
  );
});

let deferredPrompt; // Variable to store the install prompt event

window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default mini-infobar from appearing
  event.preventDefault();

  // Stash the event so it can be triggered later
  deferredPrompt = event;

  // Update UI to notify the user they can install the app
  // (You'll need to implement this part based on your design)
  showInstallButton();
});

// Function to trigger the install prompt
function installApp() {
  if (deferredPrompt) {
    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult)   => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');   

      }
      deferredPrompt = null;
    });
  }
}

// Function   to show the install button (you'll need to implement this)
function showInstallButton() {
  // ... Add your logic to display the install button in your UI ...

  // Attach the installApp function to the button's click event
  document.getElementById('install-button').addEventListener('click', installApp);
}
