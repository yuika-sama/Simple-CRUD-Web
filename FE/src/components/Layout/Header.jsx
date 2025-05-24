import { Link, useLocation } from "react-router-dom"

const Header = () => {
  const location = useLocation()
  const appName = process.env.REACT_APP_APP_NAME || "Hệ Thống Quản Lý Sản Phẩm"
  const version = process.env.REACT_APP_VERSION

  return (
    <header>
      <h1>
        {appName}
        {version && <span style={{ fontSize: "0.5em", color: "#666" }}> v{version}</span>}
      </h1>
      <nav className="nav-links">
        <Link to="/products" className={location.pathname === "/" || location.pathname === "/products" ? "active" : ""}>
          Quản lý sản phẩm
        </Link>
        <Link to="/categories" className={location.pathname === "/categories" ? "active" : ""}>
          Quản lý danh mục
        </Link>
      </nav>
    </header>
  )
}

export default Header
