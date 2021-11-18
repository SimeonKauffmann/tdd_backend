const { v4: uuid } = require('uuid');

let productsData = [
  { id: 123, name: 'Bow', price: 10 },
  { id: uuid(), name: 'Köttbullar', price: 40 },
  { id: uuid(), name: 'Lax', price: 50 },
  { id: uuid(), name: 'Svamp', price: 5 }
];

class MockCRUD {
  constructor(data) {
    this.data = data;
  }

  async getAll() {
    return this.data;
  }

  async getOne(input) {
    return this.data.find((item) => item.name === input);
  }

  async createOne(data) {
    try {
      return this.data.push(data);
    } catch (err) {
      throw err;
    }
  }

  async deleteOne(input) {
    try {
      this.data = this.data.filter((item) => {
        return item.name !== input.name;
      });
    } catch (err) {
      throw err;
    }
  }
}

const createMockDb = () => {
  const products = new MockCRUD(productsData);
  return products;
};

const mockdbDriver = () => {
  return createMockDb();
};

module.exports = { createMockDb, mockdbDriver, productsData };