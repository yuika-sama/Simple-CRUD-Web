"use client"

import { useState } from "react"
import Button from "../UI/Button"
import Input from "../UI/Input"

const ProductSearch = ({ onSearch, loading = false }) => {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = () => {
    onSearch(searchTerm.trim())
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const handleClear = () => {
    setSearchTerm("")
    onSearch("")
  }

  return (
    <div className="search-container">
      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Tìm kiếm sản phẩm..."
        disabled={loading}
        aria-label="Tìm kiếm sản phẩm"
      />
      <Button onClick={handleSearch} loading={loading} disabled={loading}>
        Tìm kiếm
      </Button>
      {searchTerm && (
        <Button onClick={handleClear} variant="secondary" disabled={loading}>
          Xóa
        </Button>
      )}
    </div>
  )
}

export default ProductSearch
