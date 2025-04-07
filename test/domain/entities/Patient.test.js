import { expect } from "chai";
import sinon from "sinon";
import { Patient } from "../../../src/domain/entities/Patient.js";
import { Address } from "../../../src/domain/value-objects/Address.js";
import { EmergencyContact } from "../../../src/domain/value-objects/EmergencyContact.js";

describe("Patient Entity", () => {
  const defaultPatientData = {
    identificationDocument: "12345678901",
    name: "John Doe",
    birthDate: "1990-01-01",
    gender: "male",
    bloodType: "A+",
    address: new Address("123 Main St", 10, "Springfield", "IL", "12345"),
    phone: "555-1234",
    email: "john.doe@example.com",
    emergencyContact: new EmergencyContact("Jane Doe", "555-5678"),
  };

  afterEach(() => {
    sinon.restore();
  });

  describe("Constructor", () => {
    it("should create a valid Patient instance with correct properties", () => {
      const patient = new Patient(defaultPatientData);

      expect(patient).to.be.instanceOf(Patient);
      expect(patient.name).to.equal("John Doe");
      expect(patient.identificationDocument).to.equal("12345678901");
      expect(patient.birthDate).to.be.instanceOf(Date);
      expect(patient.gender).to.equal("male");
      expect(patient.bloodType).to.equal("A+");
      expect(patient.address).to.equal(defaultPatientData.address);
      expect(patient.phone).to.equal("555-1234");
      expect(patient.email).to.equal("john.doe@example.com");
      expect(patient.emergencyContact).to.equal(
        defaultPatientData.emergencyContact
      );
    });

    it("should convert birthDate string to Date object", () => {
      const clock = sinon.useFakeTimers(new Date("2025-10-01"));
      const patient = new Patient({
        ...defaultPatientData,
        birthDate: "2005-10-05",
      });

      expect(patient.birthDate.getFullYear()).to.equal(2005);
      expect(patient.birthDate.getMonth() + 1).to.equal(10);
      expect(patient.birthDate.getDate() + 1).to.equal(5);
      clock.restore();
    });

    it("should initialize with a new MedicalRecord instance", () => {
      const patient = new Patient(defaultPatientData);
      expect(patient.medicalRecord).to.exist;
      expect(patient.medicalRecord).to.be.an("object");
    });
  });

  describe("Getters", () => {
    let patient;

    beforeEach(() => {
      patient = new Patient(defaultPatientData);
    });

    it("should return correct address via getter", () => {
      expect(patient.address).to.equal(defaultPatientData.address);
    });

    it("should return correct emergency contact via getter", () => {
      expect(patient.emergencyContact).to.equal(
        defaultPatientData.emergencyContact
      );
    });

    it("should return a copy of medicalRecord", () => {
      const originalRecord = patient.medicalRecord;
      const returnedRecord = patient.medicalRecord;

      expect(returnedRecord).to.not.equal(originalRecord);
    });
  });
});
