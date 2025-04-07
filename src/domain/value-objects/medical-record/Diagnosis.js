export class Diagnosis {
  #description;
  #date;

  constructor(description, date) {
    this.#description = description;
    this.#date = date;
  }

  get description() {
    return this.#description;
  }

  get date() {
    return this.#date;
  }
}
