"use client"

import { Component } from "react"

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Đã xảy ra lỗi!</h2>
          <p>Vui lòng tải lại trang hoặc liên hệ hỗ trợ.</p>
          <button onClick={() => window.location.reload()} className="btn btn-primary">
            Tải lại trang
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
