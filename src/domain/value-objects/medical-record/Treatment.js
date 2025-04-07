export class Treatment {
  #description;
  #startDate;
  #endDate;

  constructor(description, startDate, endDate) {
    this.#description = description;
    this.#startDate = startDate;
    this.#endDate = endDate;
  }

  get description() {
    return this.#description;
  }

  get startDate() {
    return this.#startDate;
  }

  get endDate() {
    return this.#endDate;
  }
}
