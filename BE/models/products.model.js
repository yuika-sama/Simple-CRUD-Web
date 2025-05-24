const pool = require("../config/db")

const Product = {
  id: {
    type: Number,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: String,
    allowNull: false,
  },
  price: {
    type: Number,
    allowNull: false,
  },
  stock: {
    type: Number,
    allowNull: false,
  },
  categoryId: {
    type: Number,
    allowNull: true,
    references: {
      model: "categories",
      key: "id",
    },
  },
  createdAt: {
    type: Date,
    allowNull: false,
    defaultValue: Date.now,
  },
  updatedAt: {
    type: Date,
    allowNull: false,
    defaultValue: Date.now,
  },
}

module.exports = {
  createProduct: async (product) => {
    const [rows] = await pool.query("INSERT INTO products (name, price, stock, category_id) VALUES (?, ?, ?, ?)", [
      product.name,
      product.price,
      product.stock,
      product.categoryId,
    ])
    return rows
  },
  getProducts: async () => {
    const [rows] = await pool.query(`
          SELECT p.*, c.name as category_name 
          FROM products p
          LEFT JOIN categories c ON p.category_id = c.id
      `)
    return rows
  },
  getProductById: async (id) => {
    const [rows] = await pool.query(
      `
          SELECT p.*, c.name as category_name 
          FROM products p
          LEFT JOIN categories c ON p.category_id = c.id
          WHERE p.id = ?
      `,
      [id],
    )
    return rows[0]
  },
  updateProduct: async (id, product) => {
    const [result] = await pool.query(
      "UPDATE products SET name = ?, price = ?, stock = ?, category_id = ? WHERE id = ?",
      [product.name, product.price, product.stock, product.categoryId, id],
    )
    return result
  },

  deleteProduct: async (id) => {
    const [rows] = await pool.query("DELETE FROM products WHERE id = ?", [id])
    return rows
  },
  searchProducts: async (query) => {
    const searchTerm = `%${query}%`
    const [rows] = await pool.query(
      `
          SELECT p.*, c.name as category_name 
          FROM products p
          LEFT JOIN categories c ON p.category_id = c.id
          WHERE p.name LIKE ? OR c.name LIKE ?
      `,
      [searchTerm, searchTerm],
    )
    return rows
  },
}
