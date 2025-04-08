import { expect } from "chai";
import sinon from "sinon";
import { PatientService } from "../../../src/domain/services/PatientService.js";
import { Patient } from "../../../src/domain/entities/Patient.js";
import { PatientRepository } from "../../../src/infrastructure/persistence/PatientRepository.js";

describe("PatientService", () => {
  let patientService;
  let patientRepository;
  let sandbox;

  const mockPatientData = {
    identificationDocument: "12345678901",
    name: "John Doe",
    birthDate: "1990-01-01",
    gender: "male",
    bloodType: "A+",
    address: {},
    phone: "555-1234",
    email: "john@example.com",
    emergencyContact: {},
  };

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    patientRepository = sandbox.createStubInstance(PatientRepository);

    const mockPatient = new Patient(mockPatientData);
    mockPatient._setId(1);

    patientRepository.add.returns(1);

    patientRepository.findById.withArgs(1).returns(mockPatient);

    patientService = new PatientService(patientRepository);
  });

  describe("addPatient", () => {
    it("should add a new patient and return it with ID", () => {
      const patient = new Patient(mockPatientData);
      const result = patientService.addPatient(patient);

      expect(result).to.be.instanceOf(Patient);
      expect(result.id).to.equal(1);
      expect(result.name).to.equal("John Doe");

      expect(patientRepository.add.calledOnce).to.be.true;
      expect(patientRepository.findById.calledWith(1)).to.be.true;
    });

    it("should throw error when repository fails", () => {
      patientRepository.add.throws(new Error("Failed to save patient"));
      const patient = new Patient(mockPatientData);
      expect(() => patientService.addPatient(patient)).to.throw(
        "Failed to save patient"
      );
    });
  });

  describe("findPatientById", () => {
    it("should return the patient when found", () => {
      const foundPatient = patientService.findPatientById(1);
      expect(foundPatient).to.be.instanceOf(Patient);
      expect(foundPatient.name).to.equal("John Doe");

      expect(patientRepository.findById.calledOnce).to.be.true;
    });

    it("should return null when patient not found", () => {
      const foundPatient = patientService.findPatientById(999);

      expect(foundPatient).to.be.null;

      expect(patientRepository.findById.calledOnce).to.be.true;
    });
  });

  describe("deletePatient", () => {
    it("should delete the patient and return it", () => {
      const deletedPatient = patientService.deletePatient(1);
      expect(deletedPatient).to.be.instanceOf(Patient);
      expect(deletedPatient.id).to.equal(1);
      expect(patientRepository.delete.calledOnce).to.be.true;
    });

    it("should throw error when patient not found", () => {
      expect(() => patientService.deletePatient(999)).to.throw(
        "Patient not Found!"
      );
    });
  });
});
