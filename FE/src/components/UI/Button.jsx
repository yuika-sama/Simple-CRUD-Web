"use client"

import { forwardRef } from "react"

const Button = forwardRef(
  (
    {
      children,
      onClick,
      type = "button",
      variant = "primary",
      disabled = false,
      loading = false,
      className = "",
      "aria-label": ariaLabel,
      id,
    },
    ref,
  ) => {
    const baseClass = "btn"
    const variantClass = `btn-${variant}`
    const classes = `${baseClass} ${variantClass} ${className}`.trim()

    return (
      <button
        ref={ref}
        id={id}
        type={type}
        onClick={onClick}
        disabled={disabled || loading}
        className={classes}
        aria-label={ariaLabel}
      >
        {loading ? "Đang xử lý..." : children}
      </button>
    )
  },
)

Button.displayName = "Button"

export default Button
