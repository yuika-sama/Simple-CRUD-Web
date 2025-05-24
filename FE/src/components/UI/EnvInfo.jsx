const EnvInfo = () => {
    const isDebug = process.env.REACT_APP_DEBUG === "true"
    const env = process.env.REACT_APP_ENV
  
    if (!isDebug || env === "production") {
      return null
    }
  
    return (
      <div
        style={{
          position: "fixed",
          bottom: "10px",
          right: "10px",
          background: "rgba(0,0,0,0.8)",
          color: "white",
          padding: "8px 12px",
          borderRadius: "4px",
          fontSize: "12px",
          zIndex: 1000,
        }}
      >
        <div>🔧 Debug Mode</div>
        <div>Port: {window.location.port || "80"}</div>
        <div>API: {process.env.REACT_APP_API_BASE_URL}</div>
        <div>Env: {env}</div>
      </div>
    )
  }
  
  export default EnvInfo