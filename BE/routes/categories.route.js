const express = require("express")
const router = express.Router()
const {
  getCategoriesController,
  getCategoryByIdController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
} = require("../controllers/categories.controller")

router.get("/", getCategoriesController)
router.get("/:id", getCategoryByIdController)
router.post("/", createCategoryController)
router.put("/:id", updateCategoryController)
router.delete("/:id", deleteCategoryController)

module.exports = router
