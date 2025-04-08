import { expect } from "chai";
import sinon from "sinon";
import { Patient } from "../../../src/domain/entities/Patient.js";
import { PatientService } from "../../../src/domain/services/PatientService.js";
import { PatientController } from "../../../src/interfaces/controllers/PatientController.js";

describe("PatientController", () => {
  let patientController;
  let patientService;
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
    patientService = sandbox.createStubInstance(PatientService);
    patientController = new PatientController(patientService);
  });

  describe("createPatient", () => {
    it("should add a new patient via service", async () => {
      const req = { body: mockPatientData };
      const res = {
        status: sandbox.stub().returnsThis(),
        json: sandbox.stub(),
      };

      patientService.addPatient.resolves(mockPatientData);

      await patientController.createPatient(req, res);

      expect(patientService.addPatient.calledWith(mockPatientData)).to.be.true;
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(mockPatientData)).to.be.true;
    });
  });

  describe("getPatientById", () => {
    it("should return a patient when found", async () => {
      const req = { params: { id: "1" } };
      const res = {
        status: sandbox.stub().returnsThis(),
        json: sandbox.stub(),
      };
      const mockPatient = new Patient(mockPatientData);
      mockPatient._setId(1);

      patientService.findPatientById.resolves(mockPatient);

      await patientController.getPatientById(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(mockPatient)).to.be.true;
    });

    it("should return 404 when patient is not found", async () => {
      const req = { params: { id: "999" } };
      const res = {
        status: sandbox.stub().returnsThis(),
        json: sandbox.stub(),
      };

      patientService.findPatientById.resolves(null);

      await patientController.getPatientById(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ error: "Patient not found" })).to.be.true;
    });
  });

  describe("deletePatient", () => {
    it("should delete the patient and return it", async () => {
      const req = { params: { id: "1" } };
      const res = {
        status: sandbox.stub().returnsThis(),
        json: sandbox.stub(),
      };
      const mockPatient = new Patient(mockPatientData);
      mockPatient._setId(1);

      patientService.deletePatient.resolves(mockPatient);

      await patientController.deletePatient(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(mockPatient)).to.be.true;
    });

    it("should return 404 when patient is not found", async () => {
      const req = { params: { id: "999" } };
      const res = {
        status: sandbox.stub().returnsThis(),
        json: sandbox.stub(),
      };

      patientService.deletePatient.rejects(new Error("Patient not found"));

      await patientController.deletePatient(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ error: "Patient not found" })).to.be.true;
    });
  });

  describe("updatePatient", () => {
    it("should update the patient and return it with 200 status", async () => {
      const req = {
        params: { id: "1" },
        body: { name: "Jane Doe Updated" },
      };

      const res = {
        status: sandbox.stub().returnsThis(),
        json: sandbox.stub(),
      };

      const updatedPatient = new Patient({
        ...mockPatientData,
        name: "Jane Doe Updated",
        id: 1,
      });

      patientService.updatePatient.resolves(updatedPatient);

      await patientController.updatePatient(req, res);

      expect(
        patientService.updatePatient.calledWith("1", {
          name: "Jane Doe Updated",
        })
      ).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;

      expect(res.json.calledWith(updatedPatient)).to.be.true;
    });
  });
});
