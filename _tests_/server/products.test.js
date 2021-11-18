require('jest');
const { productsData, createMockDb } = require('../../src/drivers/mockdb');

describe('mockcrud', () => {
  it('Is returned data truthy', async () => {
    const mockDb = createMockDb(productsData);
    const data = await mockDb.getAll();
    expect(data).toBeTruthy();
  });

  it('check if object array has the right property', async () => {
    const mockDb = createMockDb(productsData);
    const data = await mockDb.getAll();
    expect(data[2]).toHaveProperty('name');
  });

  it('should return a specific product', async () => {
    const mockDb = createMockDb(productsData);
    const data = await mockDb.getAll();
    expect(data).toContainEqual({ id: 123, name: 'Bow', price: 10 });
  });

  it('should return one item', async () => {
    const mockDb = createMockDb(productsData);
    const data = await mockDb.getOne('Bow');
    expect(data).toStrictEqual({ id: 123, name: 'Bow', price: 10 });
  });

  it('Create a valid product', async () => {
    const mockDb = createMockDb(productsData);
    const newProduct = { id: 112, name: 'Ax', price: 9 };
    try {
      const count = await mockDb.getAll();
      await mockDb.createOne(newProduct);
      const newCount = await mockDb.getAll();
      expect(newCount.length).toBe(1 + count.length);
    } catch (err) {
      console.log(`Error ${err}`);
    }
  });
  it('Deletes a product', async () => {
    const mockDb = createMockDb(productsData);
    try {
      const count = await mockDb.getAll();
      await mockDb.deleteOne('Lax');
      const newCount = await mockDb.getAll();
      expect(newCount.length).toBe(count.length--);
    } catch (err) {
      console.log(`Error ${err}`);
    }
  });
});
