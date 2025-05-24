const express = require("express")
const router = express.Router()
const {
  getProductsController,
  getProductByIdController,
  createProductController,
  updateProductController,
  deleteProductController,
  searchProductsController,
} = require("../controllers/products.controller")

router.get("/", getProductsController)

router.get("/search", searchProductsController)

router.get("/:id", getProductByIdController)

router.post("/", createProductController)

router.put("/:id", updateProductController)

router.delete("/:id", deleteProductController)

module.exports = router
