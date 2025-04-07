export class EmergencyContact {
  #name;
  #phone;

  constructor(name, phone) {
    if (!name || !phone) {
      throw new Error("Emergency contact must have a name and phone number");
    }
    this.#name = name;
    this.#phone = phone;
  }

  get name() {
    return this.#name;
  }

  get phone() {
    return this.#phone;
  }

  equals(other) {
    return (
      other instanceof EmergencyContact &&
      this.#name === other.name &&
      this.#phone === other.phone
    );
  }
}
