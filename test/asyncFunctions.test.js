const { fetchData, fetchDataPromise } = require('../src/asyncFunctions');
const { expect } = require('chai');

describe('Função fetchData com async/await', () => {
  it('deve retornar "dados recebidos"', async () => {
    const resultado = await fetchDataPromise();
    expect(resultado).to.equal('dados recebidos');
  });
});
