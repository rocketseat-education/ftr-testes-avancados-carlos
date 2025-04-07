export class Allergy {
  #name;

  constructor(name) {
    if (!name) {
      throw new Error("Allergy name is required");
    }
    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  equals(other) {
    return other instanceof Allergy && this.#name === other.name;
  }
}
