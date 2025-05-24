"use client"

import { createContext, useContext } from "react"

const ApiContext = createContext()

// Lấy cấu hình từ environment variables
const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000"
const DEBUG_MODE = process.env.REACT_APP_DEBUG === "true"

const createApi = () => {
  const handleResponse = async (response) => {
    if (!response.ok) {
      const errorText = await response.text()
      const errorMessage = `HTTP error! status: ${response.status}, message: ${errorText}`

      if (DEBUG_MODE) {
        console.error("API Response Error:", {
          status: response.status,
          statusText: response.statusText,
          url: response.url,
          errorText,
        })
      }

      throw new Error(errorMessage)
    }
    return await response.json()
  }

  const handleError = (domain, method) => (url, options) => async () => {
    try {
      if (DEBUG_MODE) {
        console.log(`API Call: ${domain}.${method}`, { url, options })
      }

      const response = await fetch(url, options)
      const result = await handleResponse(response)

      if (DEBUG_MODE) {
        console.log(`API Success: ${domain}.${method}`, result)
      }

      return result
    } catch (error) {
      console.error(`API Error (${domain}.${method}):`, error)
      throw error
    }
  }

  return {
    products: {
      getAll: handleError("products", "getAll")(`${BASE_URL}/products`),
      getById: (id) => handleError("products", "getById")(`${BASE_URL}/products/${id}`)(),
      create: (product) =>
        handleError("products", "create")(`${BASE_URL}/products`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product),
        })(),
      update: (id, product) =>
        handleError("products", "update")(`${BASE_URL}/products/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product),
        })(),
      delete: (id) => handleError("products", "delete")(`${BASE_URL}/products/${id}`, { method: "DELETE" })(),
      search: (query) =>
        handleError("products", "search")(`${BASE_URL}/products/search?q=${encodeURIComponent(query)}`)(),
    },
    categories: {
      getAll: handleError("categories", "getAll")(`${BASE_URL}/categories`),
      getById: (id) => handleError("categories", "getById")(`${BASE_URL}/categories/${id}`)(),
      create: (category) =>
        handleError("categories", "create")(`${BASE_URL}/categories`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(category),
        })(),
      update: (id, category) =>
        handleError("categories", "update")(`${BASE_URL}/categories/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(category),
        })(),
      delete: (id) => handleError("categories", "delete")(`${BASE_URL}/categories/${id}`, { method: "DELETE" })(),
    },
  }
}

export const ApiProvider = ({ children }) => {
  const api = createApi()

  return <ApiContext.Provider value={{ api }}>{children}</ApiContext.Provider>
}

export const useApi = () => {
  const context = useContext(ApiContext)
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider")
  }
  return context
}
