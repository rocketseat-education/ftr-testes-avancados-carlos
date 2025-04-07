import { expect } from "chai";
import { Address } from "../../../src/domain/value-objects/Address.js";

describe("Address", () => {
  let address;
  const validAddress = {
    street: "Rua dos Bobos",
    number: 10,
    city: "São Paulo",
    state: "SP",
    zipCode: "12345",
  };

  beforeEach(() => {
    address = new Address(
      validAddress.street,
      validAddress.number,
      validAddress.city,
      validAddress.state,
      validAddress.zipCode
    );
  });

  describe("Valid Creation", () => {
    it("should create an Address with correct properties", () => {
      expect(address.street).to.equal(validAddress.street);
      expect(address.number).to.equal(validAddress.number);
      expect(address.city).to.equal(validAddress.city);
      expect(address.state).to.equal(validAddress.state);
      expect(address.zipCode).to.equal(validAddress.zipCode);
    });
  });

  describe("Validation", () => {
    const invalidCases = [
      { field: "street", value: "", error: "Address fields cannot be empty" },
      { field: "city", value: "", error: "Address fields cannot be empty" },
      { field: "state", value: "", error: "Address fields cannot be empty" },
      { field: "zipCode", value: "", error: "Address fields cannot be empty" },
      {
        field: "number",
        value: -5,
        error: "Number must be a positive integer",
      },
      {
        field: "number",
        value: "abc",
        error: "Number must be a positive integer",
      },
      { field: "number", value: 0, error: "Number must be a positive integer" },
    ];

    invalidCases.forEach(({ field, value, error }) => {
      it(`should throw an error when ${field} is invalid`, () => {
        const params = { ...validAddress, [field]: value };
        expect(
          () =>
            new Address(
              params.street,
              params.number,
              params.city,
              params.state,
              params.zipCode
            )
        ).to.throw(error);
      });
    });
  });

  describe("Equality Check", () => {
    let anotherAddress;

    beforeEach(() => {
      anotherAddress = new Address(
        "Rua dos Bobos",
        10,
        "São Paulo",
        "SP",
        "12345"
      );
    });

    it("should return true for identical addresses", () => {
      expect(address.equals(anotherAddress)).to.be.true;
    });

    it("should return false for different addresses", () => {
      const differentAddress = new Address(
        "456 Elm St",
        validAddress.number,
        validAddress.city,
        validAddress.state,
        validAddress.zipCode
      );
      expect(address.equals(differentAddress)).to.be.false;
    });

    it("should return false when compared to a non-Address object", () => {
      expect(address.equals({ street: "123 Main St", number: 10 })).to.be.false;
    });
  });
});
