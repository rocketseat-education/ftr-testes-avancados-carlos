import { expect } from "chai"
import { sum, divide } from "../src/mathUtils.js"

describe('sum', () => {
  it('should add two numbers', () => {
    expect(sum(2, 3)).to.equal(5);
  });

  it('should throw error for non-number inputs', () => {
    expect(() => sum("2", 3)).to.throw('Invalid arguments');
  });
})

describe('divide', () => {
  it('should divide two numbers', () => {
    expect(divide(6, 3)).to.equal(2);
  });

  it('should throw error for division by zero', () => {
    expect(() => divide(6, 0)).to.throw('Division by zero');
  });
})
