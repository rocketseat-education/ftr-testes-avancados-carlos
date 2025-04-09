import { StockService } from "./StockService.js";

export class OrderBuilder {
  constructor() {
    this.products = [];
    this.customer = null;
  }

  addProduct(name, quantity) {
    this.products.push({ name, quantity });
    return this;
  }

  setCustomer(email) {
    this.customer = email;
    return this;
  }

  async build() {
    for (const product of this.products) {
      const inStock = await StockService.checkStock(
        product.name,
        product.quantity,
      );
      if (!inStock) {
        throw new Error(`Insufficient stock for: ${product.name}`);
      }
    }

    return {
      customer: this.customer,
      products: this.products,
      status: 'created',
    }
  }
}
