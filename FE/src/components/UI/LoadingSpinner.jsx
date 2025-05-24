const LoadingSpinner = ({ size = "medium", text = "Đang tải..." }) => {
    const sizeClass = {
      small: "spinner-small",
      medium: "spinner-medium",
      large: "spinner-large",
    }[size]
  
    return (
      <div className="loading-container" role="status" aria-live="polite">
        <div className={`spinner ${sizeClass}`}></div>
        <span className="sr-only">{text}</span>
        {text && <p>{text}</p>}
      </div>
    )
  }
  
  export default LoadingSpinner
  