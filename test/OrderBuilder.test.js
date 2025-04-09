import { expect } from 'chai';
import sinon from 'sinon';
import { OrderBuilder } from '../src/OrderBuilder.js';
import { StockService } from '../src/StockService.js';

describe('OrderBuilder - TDD with Stubs', () => {
  let stockServiceStub;

  beforeEach(() => {
    stockServiceStub = sinon.stub(StockService, 'checkStock');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should fail to build order if stock is insufficient', async () => {
    stockServiceStub.resolves(false);

    const builder = new OrderBuilder()
      .addProduct('iPhone', 1)
      .setCustomer('customer@email.com');

    try {
      await builder.build();
      throw new Error('Expected error was not throw');
    } catch (err) {
      expect(err.message).to.equal('Insufficient stock for: iPhone');
    }
  });

  it('should build order successfully if stock is available', async () => {
    stockServiceStub.resolves(true);

    const order = await new OrderBuilder()
      .addProduct('iPhone', 1)
      .addProduct('Case', 2)
      .setCustomer('customer@email.com')
      .build();

    expect(order).to.deep.equal({
      customer: 'customer@email.com',
      products: [
        { name: 'iPhone', quantity: 1 },
        { name: 'Case', quantity: 2 },
      ],
      status: 'created',
    })
  })
})
