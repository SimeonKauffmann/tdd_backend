require('jest');
const { productsData, createMockDb } = require('../../src/drivers/mockdb');

describe('mockcrud', () => {
  it('should return all data', async () => {
    const mockDb = createMockDb(productsData);
    const data = await mockDb.getAll();
    expect(data).toContainEqual({ id: 123, name: 'Bow', price: 10 });
  });
});
