export class Address {
  #street;
  #number;
  #city;
  #state;
  #zipCode;

  constructor(street, number, city, state, zipCode) {
    if (!street || !city || !state || !zipCode) {
      throw new Error("Address fields cannot be empty");
    }

    if (typeof number !== "number" || number <= 0) {
      throw new Error("Number must be a positive integer");
    }

    this.#street = street;
    this.#number = number;
    this.#city = city;
    this.#state = state;
    this.#zipCode = zipCode;
  }

  get street() {
    return this.#street;
  }

  get number() {
    return this.#number;
  }

  get city() {
    return this.#city;
  }

  get state() {
    return this.#state;
  }

  get zipCode() {
    return this.#zipCode;
  }

  equals(other) {
    if (!(other instanceof Address)) {
      return false;
    }

    return (
      this.#street === other.street &&
      this.#number === other.number &&
      this.#city === other.city &&
      this.#state === other.state &&
      this.#zipCode === other.zipCode
    );
  }
}
