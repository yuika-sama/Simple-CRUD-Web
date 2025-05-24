const Footer = () => {
  const appName = process.env.REACT_APP_APP_NAME || "Hệ Thống Quản Lý Sản Phẩm"
  const version = process.env.REACT_APP_VERSION
  const env = process.env.REACT_APP_ENV

  return (
    <footer>
      <p className="text-center" style={{ marginTop: "30px", color: "#666", fontSize: "14px" }}>
        &copy; 2024 {appName}
        {version && ` - Version ${version}`}
        {env === "development" && <span style={{ color: "#ff9800", marginLeft: "10px" }}>[Development Mode]</span>}
      </p>
    </footer>
  )
}

export default Footer
