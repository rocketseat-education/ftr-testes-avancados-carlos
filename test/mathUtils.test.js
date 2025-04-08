import { expect } from "chai"
import { sum } from "../src/mathUtils.js"

describe('sum', () => {
  it('should add two numbers', () => {
    expect(sum(2, 3)).to.equal(5);
  });

  it('should throw error for non-number inputs', () => {
    expect(() => sum("2", 3)).to.throw('Invalid arguments');
  });
})
