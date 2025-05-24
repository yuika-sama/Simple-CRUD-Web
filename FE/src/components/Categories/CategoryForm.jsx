"use client"

import { useState, useEffect } from "react"
import { useApi } from "../../contexts/ApiContext"
import { useMessage } from "../../contexts/MessageContext"
import Button from "../UI/Button"
import Input from "../UI/Input"

const CategoryForm = ({ editingCategory, onSuccess, onCancel }) => {
  const { api } = useApi()
  const { showMessage } = useMessage()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  })

  useEffect(() => {
    if (editingCategory) {
      setFormData({
        name: editingCategory.name || "",
        description: editingCategory.description || "",
      })
    } else {
      resetForm()
    }
  }, [editingCategory])

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
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

    if (!formData.name) {
      showMessage("Vui lòng nhập tên danh mục!", true)
      return
    }

    try {
      if (editingCategory) {
        await api.categories.update(editingCategory.id, formData)
        showMessage("Cập nhật danh mục thành công!")
      } else {
        await api.categories.create(formData)
        showMessage("Thêm danh mục thành công!")
      }

      resetForm()
      onSuccess()
    } catch (error) {
      showMessage(`Lỗi khi ${editingCategory ? "cập nhật" : "thêm"} danh mục: ${error.message}`, true)
    }
  }

  return (
    <div className="form-container">
      <h2>{editingCategory ? "Cập nhật danh mục" : "Thêm danh mục mới"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <Input value={formData.name} onChange={handleInputChange("name")} placeholder="Tên danh mục" required />
          <Input value={formData.description} onChange={handleInputChange("description")} placeholder="Mô tả" />
        </div>
        <div className="form-actions">
          <Button type="submit" variant="primary">
            {editingCategory ? "Cập nhật" : "Thêm danh mục"}
          </Button>
          {editingCategory && (
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

export default CategoryForm
