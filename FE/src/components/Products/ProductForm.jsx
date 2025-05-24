"use client"

import { useState, useEffect, useCallback } from "react"
import { useApi } from "../../contexts/ApiContext"
import { useMessage } from "../../contexts/MessageContext"
import Button from "../UI/Button"
import Input from "../UI/Input"
import Select from "../UI/Select"

const ProductForm = ({ editingProduct, onSuccess, onCancel }) => {
  const { api } = useApi()
  const { showMessage } = useMessage()
  const [categories, setCategories] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    categoryId: "",
  })

  const loadCategories = useCallback(async () => {
    try {
      const data = await api.categories.getAll()
      setCategories(data)
    } catch (error) {
      showMessage(`Lỗi khi tải danh mục: ${error.message}`, true)
    }
  }, [api.categories, showMessage])

  useEffect(() => {
    loadCategories()
  }, [loadCategories])

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || "",
        price: editingProduct.price || "",
        stock: editingProduct.stock || "",
        categoryId: editingProduct.category_id || "",
      })
    } else {
      resetForm()
    }
  }, [editingProduct])

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      stock: "",
      categoryId: "",
    })
  }

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name || formData.price === "" || formData.stock === "") {
      showMessage("Vui lòng nhập đầy đủ thông tin!", true)
      return
    }

    try {
      const productData = {
        name: formData.name,
        price: Number.parseFloat(formData.price),
        stock: Number.parseInt(formData.stock),
        categoryId: formData.categoryId || null,
      }

      if (editingProduct) {
        await api.products.update(editingProduct.id, productData)
        showMessage("Cập nhật sản phẩm thành công!")
      } else {
        await api.products.create(productData)
        showMessage("Thêm sản phẩm thành công!")
      }

      resetForm()
      onSuccess()
    } catch (error) {
      showMessage(`Lỗi khi ${editingProduct ? "cập nhật" : "thêm"} sản phẩm: ${error.message}`, true)
    }
  }

  const categoryOptions = categories.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }))

  return (
    <div className="form-container">
      <h2>{editingProduct ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <Input value={formData.name} onChange={handleInputChange("name")} placeholder="Tên sản phẩm" required />
          <Input
            type="number"
            value={formData.price}
            onChange={handleInputChange("price")}
            placeholder="Giá"
            min="0"
            required
          />
          <Input
            type="number"
            value={formData.stock}
            onChange={handleInputChange("stock")}
            placeholder="Tồn kho"
            min="0"
            required
          />
          <Select
            value={formData.categoryId}
            onChange={handleInputChange("categoryId")}
            options={categoryOptions}
            placeholder="-- Chọn danh mục --"
          />
        </div>
        <div className="form-actions">
          <Button type="submit" variant="primary">
            {editingProduct ? "Cập nhật" : "Thêm sản phẩm"}
          </Button>
          {editingProduct && (
            <Button type="button" variant="secondary" onClick={onCancel}>
              Hủy
            </Button>
          )}
          <Button type="button" variant="secondary" onClick={resetForm}>
            Làm mới
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ProductForm
