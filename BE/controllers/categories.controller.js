const categoriesModel = require("../models/categories.model")

const getCategoriesController = async (req, res) => {
  try {
    const categories = await categoriesModel.getCategories()
    res.json(categories)
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error: error.message })
  }
}

const getCategoryByIdController = async (req, res) => {
  try {
    const { id } = req.params
    const category = await categoriesModel.getCategoryById(id)
    if (!category) {
      return res.status(404).json({ message: "Category not found" })
    }
    res.json(category)
  } catch (error) {
    res.status(500).json({ message: "Error fetching category", error: error.message })
  }
}

const createCategoryController = async (req, res) => {
  try {
    const { name, description } = req.body
    if (!name) {
      return res.status(400).json({ message: "Category name is required" })
    }
    const result = await categoriesModel.createCategory({ name, description })
    res.status(201).json({ id: result.insertId, name, description })
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error: error.message })
  }
}

const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params
    const { name, description } = req.body
    if (!name) {
      return res.status(400).json({ message: "Category name is required" })
    }
    const result = await categoriesModel.updateCategory(id, { name, description })
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Category not found" })
    }
    res.json({ id, name, description })
  } catch (error) {
    res.status(500).json({ message: "Error updating category", error: error.message })
  }
}

const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params
    const result = await categoriesModel.deleteCategory(id)
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Category not found" })
    }
    res.json({ message: "Category deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error: error.message })
  }
}

module.exports = {
  getCategoriesController,
  getCategoryByIdController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
}
