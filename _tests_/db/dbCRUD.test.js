require("jest")
const { productsData, createMockDb } = require("../../src/drivers/mockdb")

describe("mockcrud", () => {
  it("Is returned data truthy", async () => {
    const mockDb = createMockDb(productsData)
    const data = await mockDb.products.getAll()
    expect(data).toBeTruthy()
  })

  it("check if object array has the right property", async () => {
    const mockDb = createMockDb(productsData)
    const data = await mockDb.products.getAll()
    expect(data[2]).toHaveProperty("name")
  })

  it("should return a specific product", async () => {
    const mockDb = createMockDb(productsData)
    const data = await mockDb.products.getAll()
    expect(data[0]).toEqual({ id: "123", name: "Bow", price: 10 })
  })

  it("should return one item", async () => {
    const mockDb = createMockDb(productsData)
    const data = await mockDb.products.getOne({ id: "123" })
    expect(data).toEqual({ id: "123", name: "Bow", price: 10 })
  })

  it("Create a valid product", async () => {
    const mockDb = createMockDb(productsData)
    const oldProducts = await mockDb.products.getAll()
    const newProduct = { id: "112", name: "Lax", price: 9 }
    const newProducts = await mockDb.products.createOne(newProduct)

    expect(newProducts.length).toEqual(oldProducts.length + 1)
  })

  it("Deletes a product", async () => {
    const mockDb = createMockDb(productsData)
    try {
      const count = await mockDb.products.getAll()
      await mockDb.products.deleteOne("Lax")
      const newCount = await mockDb.products.getAll()
      expect(newCount.length).toBe(count.length--)
    } catch (err) {
      console.log(`Error ${err}`)
    }
  })
})
