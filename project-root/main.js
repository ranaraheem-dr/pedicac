import { calculateMedications } from './medications.js';
import { getFluids, getLabCorrections, getResusProtocols, getGuidelines } from './data.js';

// Add event listener to button
document.getElementById("calculate-button").addEventListener("click", function() {
  const weightInput = document.getElementById("weight");
  const weight = parseFloat(weightInput.value);

  // Check if weight is a valid number
  if (isNaN(weight) || weight <= 0.1) {
    // Display error message
    weightInput.classList.add("error");
    document.getElementById("error-message").innerHTML = "Please enter a valid weight value.";
  } else {
    // Remove error message and class
    weightInput.classList.remove("error");
    document.getElementById("error-message").innerHTML = "";

    // Call calculation functions
    calculateFluids(weight);
    calculateMedicationsForAllCategories(weight);
    calculateLabCorrections(weight);
    calculateResuscitation(weight);
    populateGuidelinesTable();
  }
});

// Function to calculate fluid requirements based on weight
function calculateFluids(weight) {
    const fluidsTable = document.getElementById("fluidsTable");
    fluidsTable.innerHTML = ''; 

    const fluidsData = getFluids();
    fluidsData.forEach(fluid => {
        const totalVolume = fluid.rate * weight * 24; 
        fluidsTable.insertAdjacentHTML('beforeend', `
            <table>
              <tr>
                <th>Fluid Type</th>
                <th>Hourly Rate (mL/hr)</th>
                <th>Total Volume (mL) for 24 hours</th>
              </tr>
              <tr>
                <td><span class="math-inline">\{fluid\.name\}</td\>
<td\></span>{fluid.rate.toFixed(2)}</td>
                <td>${totalVolume.toFixed(2)}</td>
              </tr>
            </table>
        `);
    });
}

// Function to calculate medication dosages for all categories
function calculateMedicationsForAllCategories(weight) {
    const categories = [
      "Dehydration", "Fluid Resuscitation", "Fluid Maintenance", "Antibiotics", "Antivirals", 
      "Antimalarials", "Antifungals", "Antituberculars", "Aminoglycosides", "Vasodilators", 
      "Antiarrythmics", "Sedatives", "Muscle relaxants", "Antihistamines", "Corticosteroids", 
      "Diuretics", "Electrolytes", "Antacids", "Nonsteroidal anti-inflammatory drugs (NSAIDs)", 
      "Vitamins", "Beta blockers", "Resuscitation", "Cardioversion", "Antiepileptics", 
      "Pulmonary Vasodilators", "Bronchodilators", "Antiarrythmics", "Opioids", "Vasoconstrictors", 
      "Beta agonists", "Reversals", "Insulin", "Blood Products", "Hyperkalemia", "Vasoactive Medications"
    ];
    for (const category of categories) {
        calculateMedications(weight, category);
    }
}

// Function to calculate lab corrections based on weight
function calculateLabCorrections(weight) {
    const labsTable = document.getElementById("labsTable");
    labsTable.innerHTML = '';

    const labCorrectionsData = getLabCorrections();
    labCorrectionsData.forEach(lab => {
        // Placeholder calculation - replace with actual logic
        const dosage = weight; 
        labsTable.insertAdjacentHTML('beforeend', `
            <table>
              <tr>
                <th>Correction</th>
                <th>Dosage</th>
              </tr>
              <tr>
                <td><span class="math-inline">\{lab\.test\}</td\>
<td\></span>{dosage.toFixed(2)} (Adjust units as needed)</td>
              </tr>
            </table>
        `);
    });
}

// Function to calculate resuscitation data based on weight
function calculateResuscitation(weight) {
    const resusTable = document.getElementById("resusTable");
    resusTable.innerHTML = '';

    const resusProtocolsData = getResusProtocols();
    resusProtocolsData.forEach(protocol => {
        resusTable.insertAdjacentHTML('beforeend', `
            <table>
              <tr>
                <th>Protocol</th>
                <th>Steps</th>
              </tr>
              <tr>
                <td><span class="math-inline">\{protocol\.name\}</td\>
<td\></span>{protocol.steps.join('<br>')}</td> 
              </tr>
            </table>
        `);
 });
}

// Function to populate guidelines table
function populateGuidelinesTable() {
    const guidelinesTable = document.getElementById("guidelinesTable");
    guidelinesTable.innerHTML = ''; 

    const guidelinesData = getGuidelines();
    guidelinesData.forEach(guideline => {
      guidelinesTable.insertAdjacentHTML('beforeend', `
          <table>
            <tr>
              <th>Guideline</th>
              <th>Details</th>
            </tr>
            <tr>
              <td>${guideline.name}</td>
              <td>${guideline.details}</td> 
            </tr>
          </table>
      `);
    });
}

// Initial table population on page load
const defaultWeight = 0.1; // kg
calculateFluids(defaultWeight);
calculateMedicationsForAllCategories(defaultWeight);
calculateLabCorrections(defaultWeight);
calculateResuscitation(defaultWeight);
populateGuidelinesTable();
