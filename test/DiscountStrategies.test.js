import { expect } from 'chai';
import {
  BlackFridayStrategy,
  CouponStrategy,
  LoyaltyStrategy,
} from '../src/DiscountStrategies.js';

describe('Discount Strategies', () => {
  describe('BlackFridayStrategy', () => {
    it('should apply 30% discount', () => {
      const strategy = new BlackFridayStrategy();
      expect(strategy.calculateDiscount(100)).to.equal(30);
    });
  });

  describe('CouponStrategy', () => {
    it('should apply fixed discount without exceeding 20%', () => {
      const strategy = new CouponStrategy(15);
      expect(strategy.calculateDiscount(100)).to.equal(15);
      expect(strategy.calculateDiscount(50)).to.equal(10);
    });
  });

  describe('LoyaltyStrategy', () => {
    it('should give 2% per year up to 20%', () => {
      const strategy5y = new LoyaltyStrategy(5);
      expect(strategy5y.calculateDiscount(100)).to.equal(10);

      const strategy15y = new LoyaltyStrategy(15);
      expect(strategy15y.calculateDiscount(100)).to.equal(20);
    });
  });
});
