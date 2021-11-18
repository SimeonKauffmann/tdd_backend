const usersData = [
  { login: "secret", name: "Patrik" },
  { login: "password", name: "Samuel" },
  { login: "tyst", name: "Simeon" },
]

const productsData = [
  { id: "66ed22217e81", name: "Köttbullar", price: 10 },
  { id: "66ed22217e82", name: "Potatis", price: 3 },
  { id: "66ed22217e83", name: "Gurka", price: 5 },
]

const cartsData = [
  {
    userLogin: "secret",
    cart: [
      { productId: "66ed22217e81", amount: 2 },
      { productId: "66ed22217e83", amount: 1 },
    ],
  },
  {
    userLogin: "password",
    cart: [
      { productId: "66ed22217e83", amount: 2 },
      { productId: "66ed22217e82", amount: 13 },
    ],
  },
]

class MockCRUD {
  constructor(data) {
    this.data = data
  }

  async getAll() {
    return this.data
  }

  async getOne(input) {
    if (input.userLogin)
      return this.data.find((item) => item.userLogin === input.userLogin)
    return this.data.find((item) => item.name === input)
  }

  async createOne(data) {
    try {
      this.data.push(data)
      return this.data
    } catch (err) {
      throw err
    }
  }

  async modifyOrder(input) {
    try {
      this.data.forEach((cart) => {
        if (cart.userLogin === input.userLogin) {
          if (
            cart.cart.find((product) => {
              product.productId === input.productId
            })
          ) {
            cart.cart.indexOf(product.productId === input.productId).product
              .amount++
          } else {
            cart.cart.push({ productId: input.productId, amount: 1 })
          }
        }
      })
      return this.data
    } catch (err) {
      throw err
    }
  }

  async deleteOne(input) {
    this.data = this.data.filter((item) => {
      return item.input !== input.name
    })
    return (this.deleted += 1)
  }

  async deleteOrder(input) {
    try {
      this.data.forEach((order) => {
        if (order.userLogin === input.userLogin) {
          order.cart.splice(
            order.cart.indexOf(order.cart.productId === input.productId),
            1
          )
        }
      })
      return this.data
    } catch (err) {
      throw err
    }
  }
}

const createMockDb = () => {
  const products = new MockCRUD(productsData)
  const users = new MockCRUD(usersData)
  const carts = new MockCRUD(cartsData)
  return { products, users, carts }
}

const mockdbDriver = () => {
  return createMockDb()
}

module.exports = mockdbDriver
