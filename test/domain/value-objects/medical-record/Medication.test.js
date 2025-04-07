import { expect } from "chai";
import { Medication } from "../../../../src/domain/value-objects/medical-record/Medication.js";

describe("Medication", () => {
  it("should create a medication with valid data", () => {
    const medication = new Medication(
      "Paracetamol",
      "500mg",
      "Take once daily"
    );

    expect(medication.name).to.equal("Paracetamol");
    expect(medication.dosage).to.equal("500mg");
    expect(medication.instructions).to.equal("Take once daily");
  });
});
