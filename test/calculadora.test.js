const soma = require("../src/calculadora")
const expect = require("chai").expect;

describe('Função Soma', () => {
  it("deve retornar a soma de dois números", () => {
    const resultado = soma(2, 3);
    expect(resultado).to.equal(5);
  });

  it("deve retornar a soma correta com números negativos", () => {
    const resultado = soma(-1, -1);
    expect(resultado).to.equal(-2);
  })
})
