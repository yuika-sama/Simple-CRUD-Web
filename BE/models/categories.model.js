const pool = require("../config/db")

const Category = {
  id: {
    type: Number,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: String,
    allowNull: false,
  },
  description: {
    type: String,
    allowNull: true,
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
  createCategory: async (category) => {
    const [rows] = await pool.query("INSERT INTO categories (name, description) VALUES (?, ?)", [
      category.name,
      category.description,
    ])
    return rows
  },
  getCategories: async () => {
    const [rows] = await pool.query("SELECT * FROM categories")
    return rows
  },
  getCategoryById: async (id) => {
    const [rows] = await pool.query("SELECT * FROM categories WHERE id = ?", [id])
    return rows[0]
  },
  updateCategory: async (id, category) => {
    const [result] = await pool.query("UPDATE categories SET name = ?, description = ? WHERE id = ?", [
      category.name,
      category.description,
      id,
    ])
    return result
  },
  deleteCategory: async (id) => {
    const [rows] = await pool.query("DELETE FROM categories WHERE id = ?", [id])
    return rows
  },
}