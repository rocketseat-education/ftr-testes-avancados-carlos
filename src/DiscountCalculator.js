import { BlackFridayStrategy } from "./DiscountStrategies.js";

export class DiscountCalculator {
  constructor(strategy = new BlackFridayStrategy()) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  calculate(amount) {
    return amount - this.strategy.calculateDiscount(amount);
  }
}
