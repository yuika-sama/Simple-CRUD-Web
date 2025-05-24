"use client"

import { useState, useEffect, useCallback } from "react"
import { useApi } from "../contexts/ApiContext"
import { useMessage } from "../contexts/MessageContext"
import CategoryForm from "../components/Categories/CategoryForm"
import CategoryList from "../components/Categories/CategoryList"
import LoadingSpinner from "../components/UI/LoadingSpinner"

const CategoriesPage = () => {
  const { api } = useApi()
  const { showMessage } = useMessage()
  const [categories, setCategories] = useState([])
  const [editingCategory, setEditingCategory] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadCategories = useCallback(async () => {
    try {
      setLoading(true)
      const data = await api.categories.getAll()
      setCategories(Array.isArray(data) ? data : [])
    } catch (error) {
      showMessage(`Lỗi khi tải danh mục: ${error.message}`, true)
      setCategories([])
    } finally {
      setLoading(false)
    }
  }, [api.categories, showMessage])

  useEffect(() => {
    loadCategories()
  }, [loadCategories])

  const handleEdit = (category) => {
    setEditingCategory(category)
  }

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa danh mục này?")) {
      try {
        await api.categories.delete(id)
        showMessage("Đã xóa danh mục!")
        await loadCategories()
      } catch (error) {
        showMessage(`Lỗi khi xóa danh mục: ${error.message}`, true)
      }
    }
  }

  const handleFormSuccess = async () => {
    setEditingCategory(null)
    await loadCategories()
  }

  const handleFormCancel = () => {
    setEditingCategory(null)
  }

  if (loading) {
    return <LoadingSpinner text="Đang tải danh mục..." />
  }

  return (
    <div>
      <CategoryForm editingCategory={editingCategory} onSuccess={handleFormSuccess} onCancel={handleFormCancel} />

      <h2>Danh sách danh mục</h2>
      <CategoryList categories={categories} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  )
}

export default CategoriesPage
