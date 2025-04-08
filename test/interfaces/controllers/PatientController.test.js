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
});
