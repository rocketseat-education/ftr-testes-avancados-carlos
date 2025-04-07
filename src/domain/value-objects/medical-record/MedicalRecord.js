import { Diagnosis } from "./Diagnosis.js";
import { Medication } from "./Medication.js";
import { Treatment } from "./Treatment.js";

export class MedicalRecord {
  #diagnoses;
  #medications;
  #treatments;

  constructor(diagnoses = [], medications = [], treatments = []) {
    this.#diagnoses = diagnoses;
    this.#medications = medications;
    this.#treatments = treatments;
  }

  get diagnoses() {
    return [...this.#diagnoses];
  }

  get medications() {
    return [...this.#medications];
  }

  get treatments() {
    return [...this.#treatments];
  }

  addDiagnosis(diagnosis) {
    if (!(diagnosis instanceof Diagnosis)) {
      throw new Error("Invalid diagnosis object.");
    }
    this.#diagnoses.push(diagnosis);
  }

  addMedication(medication) {
    if (!(medication instanceof Medication)) {
      throw new Error("Invalid medication object.");
    }
    this.#medications.push(medication);
  }

  addTreatment(treatment) {
    if (!(treatment instanceof Treatment)) {
      throw new Error("Invalid treatment object.");
    }
    this.#treatments.push(treatment);
  }
}
