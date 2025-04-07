import { expect } from "chai";
import { Diagnosis } from "../../../../src/domain/value-objects/medical-record/Diagnosis.js";

describe("Diagnosis", () => {
  it("should create a diagnosis with valid data", () => {
    const diagnosis = new Diagnosis("Common cold", "2025-10-01");

    expect(diagnosis.description).to.equal("Common cold");
    expect(diagnosis.date).to.equal("2025-10-01");
  });
});
