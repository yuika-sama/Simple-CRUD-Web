import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ApiProvider } from "./contexts/ApiContext"
import { MessageProvider } from "./contexts/MessageContext"
import Layout from "./components/Layout/Layout"
import ProductsPage from "./pages/ProductsPage"
import CategoriesPage from "./pages/CategoriesPage"
import ErrorBoundary from "./components/UI/ErrorBoundary"
import "./App.css"

function App() {
  return (
    <ErrorBoundary>
      <ApiProvider>
        <MessageProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<ProductsPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
              </Routes>
            </Layout>
          </Router>
        </MessageProvider>
      </ApiProvider>
    </ErrorBoundary>
  )
}

export default App
