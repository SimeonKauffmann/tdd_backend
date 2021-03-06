const { v4: uuid } = require('uuid');

const usersData = [
  { userLogin: 'Patrik261', name: 'Patrik' },
  { userLogin: 'password', name: 'Samuel' },
  { userLogin: 'tyst', name: 'Simeon' },
  { userLogin: 'secret', name: 'Lulin' }
];

const productsData = [
  { id: '123', name: 'Bow', price: 10 },
  { id: '66ed22217e81', name: 'Köttbullar', price: 10 },
  { id: '66ed22217e82', name: 'Potatis', price: 3 },
  { id: uuid(), name: 'Gurka', price: 5 }
];

const cartsData = [
  {
    userLogin: 'secret',
    cart: [
      { productId: '66ed22217e81', amount: 2 },
      { productId: '66ed22217e83', amount: 1 }
    ]
  },
  {
    userLogin: 'password',
    cart: [
      { productId: '66ed22217e83', amount: 2 },
      { productId: '66ed22217e82', amount: 13 }
    ]
  }
];

class MockCRUD {
  constructor(data) {
    this.data = data;
  }

  async getAll() {
    return this.data;
  }

  async getOne(input) {
    if (input.userLogin) {
      return this.data.find((item) => item.userLogin === input.userLogin);
    }
    return this.data.find((item) => item.id === input);
  }
  async createOne(data) {
    try {
      this.data.push(data);
      return this.data;
    } catch (err) {
      throw err;
    }
  }
  // PRODUCTS OBJECT CHECK
  async createOneProduct(data) {
    try {
      this.data.push(data);
      return this.data;
    } catch (err) {
      throw err;
    }
  }
  async modifyOrder(input) {
    try {
      this.data.forEach((cart) => {
        if (cart.userLogin === input.userLogin) {
          if (
            cart.cart.find((product) => {
              product.productId === input.productId;
            })
          ) {
            cart.cart.indexOf(product.productId === input.productId).product
              .amount++;
          } else {
            cart.cart.push({ productId: input.productId, amount: 1 });
          }
        }
      });
      return this.data;
    } catch (err) {
      throw err;
    }
  }

  async deleteOne(input) {
    if (input.userLogin) {
      return (this.data = this.data.filter(
        (item) => item.userLogin === input.userLogin
      ));
    }
    return (this.data = this.data.filter((item) => item.id !== input.id));
  }

  async modifyProduct(input) {
    try {
      this.data.forEach((item) => {
        if (item.id === input.id) {
          item.name = input.name;
          item.price = input.price;
        }
      });
      return this.data;
    } catch (err) {
      throw err;
    }
  }

  async deleteOrder(input) {
    try {
      this.data.forEach((order) => {
        if (order.userLogin === input.userLogin) {
          order.cart.splice(
            order.cart.indexOf(order.cart.productId === input.productId),
            1
          );
        }
      });
      return this.data;
    } catch (err) {
      throw err;
    }
  }
}

const createMockDb = () => {
  const products = new MockCRUD(productsData);
  const users = new MockCRUD(usersData);
  const carts = new MockCRUD(cartsData);
  return { products, users, carts };
};

const mockdbDriver = () => {
  return createMockDb();
};

const db = mockdbDriver();

const getDB = () => db;

module.exports = {
  mockdbDriver,
  productsData,
  createMockDb,
  getDB
};
