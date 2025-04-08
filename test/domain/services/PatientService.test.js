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
});
