"use client"

import { useState, useEffect, useCallback } from "react"
import { useApi } from "../contexts/ApiContext"
import { useMessage } from "../contexts/MessageContext"
import ProductForm from "../components/Products/ProductForm"
import ProductList from "../components/Products/ProductList"
import ProductSearch from "../components/Products/ProductSearch"
import LoadingSpinner from "../components/UI/LoadingSpinner"

const ProductsPage = () => {
  const { api } = useApi()
  const { showMessage } = useMessage()
  const [products, setProducts] = useState([])
  const [editingProduct, setEditingProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchLoading, setSearchLoading] = useState(false)

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true)
      const data = await api.products.getAll()
      setProducts(Array.isArray(data) ? data : [])
    } catch (error) {
      showMessage(`Lỗi khi tải sản phẩm: ${error.message}`, true)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }, [api.products, showMessage])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  const handleSearch = async (searchTerm) => {
    try {
      setSearchLoading(true)
      if (searchTerm.trim()) {
        const data = await api.products.search(searchTerm)
        setProducts(Array.isArray(data) ? data : [])
      } else {
        await loadProducts()
      }
    } catch (error) {
      showMessage(`Lỗi khi tìm kiếm sản phẩm: ${error.message}`, true)
    } finally {
      setSearchLoading(false)
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
  }

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      try {
        await api.products.delete(id)
        showMessage("Đã xóa sản phẩm!")
        await loadProducts()
      } catch (error) {
        showMessage(`Lỗi khi xóa sản phẩm: ${error.message}`, true)
      }
    }
  }

  const handleFormSuccess = async () => {
    setEditingProduct(null)
    await loadProducts()
  }

  const handleFormCancel = () => {
    setEditingProduct(null)
  }

  if (loading) {
    return <LoadingSpinner text="Đang tải sản phẩm..." />
  }

  return (
    <div>
      <ProductSearch onSearch={handleSearch} loading={searchLoading} />

      <ProductForm editingProduct={editingProduct} onSuccess={handleFormSuccess} onCancel={handleFormCancel} />

      <h2>Danh sách sản phẩm</h2>
      <ProductList products={products} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  )
}

export default ProductsPage
