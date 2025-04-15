export class DiscountStrategy {
  calculateDiscount(amount) {
    throw new Error('Method not implemented!');
  }
}

export class BlackFridayStrategy extends DiscountStrategy {
  calculateDiscount(amount) {
    return amount * 0.3;
  }
}

export class CouponStrategy extends DiscountStrategy {
  constructor(couponValue) {
    super();
    this.couponValue = couponValue;
  }

  calculateDiscount(amount) {
    return Math.min(this.couponValue, amount * 0.2);
  }
}

export class LoyaltyStrategy extends DiscountStrategy {
  constructor(userLoyaltyYears) {
    super();
    this.userLoyaltyYears = userLoyaltyYears;
  }

  calculateDiscount(amount) {
    return amount * (0.02 * Math.min(this.userLoyaltyYears, 10));
  }
}
