const productsModel = require("../models/products.model")

const getProductsController = async (req, res) => {
  try {
    const products = await productsModel.getProducts()
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" })
  }
}

const getProductByIdController = async (req, res) => {
  try {
    const { id } = req.params
    const product = await productsModel.getProductById(id)
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: "Error fetching product" })
  }
}

const createProductController = async (req, res) => {
  try {
    const { name, price, stock, categoryId } = req.body
    const product = await productsModel.createProduct({ name, price, stock, categoryId })
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error: error.message })
  }
}

const updateProductController = async (req, res) => {
  try {
    const { id } = req.params
    const { name, price, stock, categoryId } = req.body
    const result = await productsModel.updateProduct(id, { name, price, stock, categoryId })
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm để cập nhật" })
    }
    res.json({ id, name, price, stock, categoryId })
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error: error.message })
  }
}
const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params
    const product = await productsModel.deleteProduct(id)
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" })
  }
}

const searchProductsController = async (req, res) => {
  try {
    const { q } = req.query
    if (!q) {
      return res.status(400).json({ message: "Search query is required" })
    }
    const products = await productsModel.searchProducts(q)
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: "Error searching products", error: error.message })
  }
}

module.exports = {
  getProductsController,
  getProductByIdController,
  createProductController,
  updateProductController,
  deleteProductController,
  searchProductsController,
}
