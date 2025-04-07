// Mocha
describe("Calculadora", () => {
  it("deve somar dois números corretamente", () => {});

  it("deve multiplicar dois números corretamente", () => {});

  it("deve dividir dois números corretamente", () => {});

  it("deve subtrair dois números corretamente", () => {});
})

// Chai
assert.equal(1 + 1, 2);

expect(1 + 1).to.equal(2);

(1 + 1).should.equal(2);

// Sinon
const spy = sinon.spy();
spy();
expect(spy.calledOnce).to.be.true;

const stub = sinon.stub().returns(42);
expect(stub()).to.equal(42);

const mock = sinon.mock(objeto);
mock.expects("metodo").once().withArgs(1);
objeto.metodo(1);
mock.verify();
