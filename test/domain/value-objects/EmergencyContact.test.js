import { expect } from "chai";
import { EmergencyContact } from "../../../src/domain/value-objects/EmergencyContact.js";

describe("EmergencyContact", () => {
  it("should create an emergency contact with valid data", () => {
    const contact = new EmergencyContact("Jane Doe", "555-1234");

    expect(contact.name).to.equal("Jane Doe");
    expect(contact.phone).to.equal("555-1234");
  });

  it("should throw an error when creating an emergency contact with missing fields", () => {
    expect(() => new EmergencyContact("", "")).to.throw(
      "Emergency contact must have a name and phone number"
    );
  });
});
