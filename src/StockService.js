export class StockService {
  static async checkStock(product, quantity) {
    throw new Error('Real integration should not be called in tests!');
  }
}
