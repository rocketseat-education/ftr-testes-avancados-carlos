import { expect } from "chai";
import { Allergy } from "../../../src/domain/value-objects/Allergy.js";

describe("Allergy", () => {
  it("should create an allergy with valid data", () => {
    const allergy = new Allergy("Peanuts");

    expect(allergy.name).to.equal("Peanuts");
  });

  it("should throw an error when creating an allergy without a name", () => {
    expect(() => new Allergy("")).to.throw("Allergy name is required");
  });
});
