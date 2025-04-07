import { expect } from "chai";
import { MedicalRecord } from "../../../../src/domain/value-objects/medical-record/MedicalRecord.js";
import { Diagnosis } from "../../../../src/domain/value-objects/medical-record/Diagnosis.js";
import { Medication } from "../../../../src/domain/value-objects/medical-record/Medication.js";
import { Treatment } from "../../../../src/domain/value-objects/medical-record/Treatment.js";

describe("MedicalRecord", () => {
  let record;
  let diagnosis, medication, treatment;

  beforeEach(() => {
    diagnosis = new Diagnosis("Diabetes", "Chronic condition");
    medication = new Medication("Metformin", "500mg");
    treatment = new Treatment("Physical Therapy", "Weekly sessions");

    record = new MedicalRecord([diagnosis], [medication], [treatment]);
  });

  describe("Valid Creation", () => {
    it("should create a MedicalRecord with initial values", () => {
      expect(record.diagnoses).to.deep.equal([diagnosis]);
      expect(record.medications).to.deep.equal([medication]);
      expect(record.treatments).to.deep.equal([treatment]);
    });

    it("should create an empty MedicalRecord when no parameters are passed", () => {
      const emptyRecord = new MedicalRecord();
      expect(emptyRecord.diagnoses).to.be.empty;
      expect(emptyRecord.medications).to.be.empty;
      expect(emptyRecord.treatments).to.be.empty;
    });
  });

  describe("Adding Entries", () => {
    it("should add a valid diagnosis", () => {
      const newDiagnosis = new Diagnosis("Hypertension", "High blood pressure");
      record.addDiagnosis(newDiagnosis);
      expect(record.diagnoses).to.include(newDiagnosis);
    });

    it("should add a valid medication", () => {
      const newMedication = new Medication("Lisinopril", "10mg");
      record.addMedication(newMedication);
      expect(record.medications).to.include(newMedication);
    });

    it("should add a valid treatment", () => {
      const newTreatment = new Treatment("Dietary Changes", "Low-sodium diet");
      record.addTreatment(newTreatment);
      expect(record.treatments).to.include(newTreatment);
    });
  });

  describe("Validation Errors", () => {
    const invalidCases = [
      { method: "addDiagnosis", param: {}, error: "Invalid diagnosis object." },
      {
        method: "addMedication",
        param: {},
        error: "Invalid medication object.",
      },
      { method: "addTreatment", param: {}, error: "Invalid treatment object." },
    ];

    invalidCases.forEach(({ method, param, error }) => {
      it(`should throw an error when ${method} is called with an invalid object`, () => {
        expect(() => record[method](param)).to.throw(error);
      });
    });
  });
});
