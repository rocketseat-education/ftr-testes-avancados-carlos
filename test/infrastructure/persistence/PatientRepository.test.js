import { expect } from "chai";
import sinon from "sinon";
import { PatientRepository } from "../../../src/infrastructure/persistence/PatientRepository.js";

describe("PatientRepository", () => {
  let patientRepository;
  let sandbox;

  beforeEach(() => {
    patientRepository = new PatientRepository();
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should generate unique IDs when adding patients", () => {
    const addStub = sandbox.stub().onCall(0).returns(1).onCall(1).returns(2);

    const patient1 = { name: "John Doe", bloodType: "O+" };
    const patient2 = { name: "Jane Doe", bloodType: "A-" };

    const id1 = addStub(patient1);
    const id2 = addStub(patient2);

    expect(id1).to.equal(1);
    expect(id2).to.equal(2);

    sinon.assert.calledWith(addStub.firstCall, patient1);
    sinon.assert.calledWith(addStub.secondCall, patient2);
  });

  it("should find patients by name", () => {
    const patients = [
      { name: "Alice", bloodType: "A-" },
      { name: "Alice", bloodType: "O-" },
    ];

    sandbox.stub(patientRepository, "findByName").returns(patients);

    const results = patientRepository.findByName("Alice");
    expect(results).to.have.lengthOf(2);
    expect(results[0].bloodType).to.equal("A-");
    expect(results[1].bloodType).to.equal("O-");
  });

  it("should find patients by blood type", () => {
    const patients = [
      { name: "Charlie", bloodType: "A-" },
      { name: "Alice", bloodType: "A-" },
    ];

    sandbox.stub(patientRepository, "findByBloodType").returns(patients);

    const results = patientRepository.findByBloodType("A-");
    expect(results).to.have.lengthOf(2);
    expect(results[0].name).to.equal("Charlie");
    expect(results[1].name).to.equal("Alice");
  });

  it("should add patients with unique IDs", () => {
    const patient1 = { name: "Alice", bloodType: "A+" };
    const patient2 = { name: "Bob", bloodType: "O-" };

    const addStub = sandbox.stub(patientRepository, "add");

    patientRepository.add(patient1);
    patientRepository.add(patient2);

    sinon.assert.calledWith(addStub.firstCall, patient1);
    sinon.assert.calledWith(addStub.secondCall, patient2);
  });

  it("should update an existing patient", () => {
    const patient = { name: "Charlie", bloodType: "B+" };
    const updatedPatient = { name: "Charlie", bloodType: "O+" };

    sandbox.stub(patientRepository, "findById").returns(patient);
    const updateStub = sandbox.stub(patientRepository, "update");

    patientRepository.update(1, updatedPatient);

    sinon.assert.calledWith(updateStub, 1, updatedPatient);
  });

  it("should delete a patient", () => {
    const patient = { name: "David", bloodType: "AB-" };

    sandbox.stub(patientRepository, "findById").returns(patient);
    const deleteStub = sandbox.stub(patientRepository, "delete");

    patientRepository.delete(1);

    sinon.assert.calledWith(deleteStub, 1);
  });
});
