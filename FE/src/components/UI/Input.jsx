"use client"

import { forwardRef } from "react"

const Input = forwardRef(
  (
    {
      type = "text",
      value,
      onChange,
      onKeyPress,
      placeholder,
      required = false,
      min,
      max,
      className = "form-control",
      disabled = false,
      "aria-label": ariaLabel,
      id,
      name,
    },
    ref,
  ) => {
    return (
      <input
        ref={ref}
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        disabled={disabled}
        className={className}
        aria-label={ariaLabel || placeholder}
      />
    )
  },
)

Input.displayName = "Input"

export default Input
