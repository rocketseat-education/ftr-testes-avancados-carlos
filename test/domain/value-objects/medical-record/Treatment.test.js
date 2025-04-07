import { expect } from "chai";
import { Treatment } from "../../../../src/domain/value-objects/medical-record/Treatment.js";

describe("Treatment", () => {
  it("should create a treatment with valid data", () => {
    const treatment = new Treatment(
      "Physical therapy",
      "2025-10-01",
      "2025-12-01"
    );

    expect(treatment.description).to.equal("Physical therapy");
    expect(treatment.startDate).to.equal("2025-10-01");
    expect(treatment.endDate).to.equal("2025-12-01");
  });
});
