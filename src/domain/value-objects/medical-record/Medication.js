export class Medication {
  #name;
  #dosage;
  #instructions;

  constructor(name, dosage, instructions) {
    this.#name = name;
    this.#dosage = dosage;
    this.#instructions = instructions;
  }

  get name() {
    return this.#name;
  }

  get dosage() {
    return this.#dosage;
  }

  get instructions() {
    return this.#instructions;
  }
}
