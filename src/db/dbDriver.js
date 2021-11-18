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
    user: { userLogin: "secret" },
    cart: [
      { productId: "66ed22217e81", amount: 2 },
      { productId: "66ed22217e83", amount: 1 },
    ],
  },
  {
    user: { userLogin: "password" },
    cart: [
      { productId: "66ed22217e83", amount: 2 },
      { productId: "66ed22217e82", amount: 13 },
    ],
  },
]

module.exports = { usersData, productsData, cartsData }
