import { expect } from 'chai';
import sinon from 'sinon';
import { DiscountCalculator } from '../src/DiscountCalculator.js';
import { DiscountStrategy } from '../src/DiscountStrategies.js';

describe('DiscountCalculator', () => {
  let calculator;
  let mockStrategy;

  beforeEach(() => {
    mockStrategy = sinon.createStubInstance(DiscountStrategy);
    calculator = new DiscountCalculator(mockStrategy);
  });

  it('should use the current strategy for calculation', () => {
    mockStrategy.calculateDiscount.returns(25);
    const finalPrice = calculator.calculate(100);

    expect(finalPrice).to.equal(75);
    expect(mockStrategy.calculateDiscount.calledWith(100)).to.be.true;
  });

  it('should allow strategy switching', () => {
    const newStrategy = sinon.createStubInstance(DiscountStrategy);
    newStrategy.calculateDiscount.returns(10);

    calculator.setStrategy(newStrategy);
    const finalPrice = calculator.calculate(100);

    expect(finalPrice).to.equal(90);
  });
});
