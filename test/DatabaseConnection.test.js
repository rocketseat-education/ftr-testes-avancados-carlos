import { expect } from 'chai';
import sinon from 'sinon';
import { DatabaseConnection } from '../src/DatabaseConnection.js';

describe('DatabaseConnection Singleton', () => {
  afterEach(() => {
    DatabaseConnection.clearInstance();
  });

  it('it must mock connection', async () => {
    const mockConnection = {
      connect: sinon.stub().resolves(true),
    };
    DatabaseConnection.instance = mockConnection;

    const connection = DatabaseConnection.getInstance();
    await connection.connect();

    expect(mockConnection.connect.calledOnce).to.be.true;
  });

  it('it must return the same instance', () => {
    const config = { url: 'localhost' };
    const instance1 = DatabaseConnection.getInstance(config);
    const instance2 = DatabaseConnection.getInstance(config);

    expect(instance1).to.equal(instance2);
    expect(instance1.config).to.deep.equal(config);
  });

  it('it must block direct instances', () => {
    const config = { url: 'localhost' };
    const instance1 = new DatabaseConnection(config);
    const instance2 = new DatabaseConnection(config);

    expect(instance1).to.equal(instance2);
  });

  it('it must exchange instance in test', () => {
    const mockInstance = { isConnected: true };
    DatabaseConnection.instance = mockInstance;

    expect(DatabaseConnection.getInstance()).to.equal(mockInstance);
  });

});
