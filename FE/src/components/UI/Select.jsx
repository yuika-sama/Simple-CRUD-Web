"use client"

import { forwardRef } from "react"

const Select = forwardRef(
  (
    {
      value,
      onChange,
      options,
      placeholder,
      className = "form-control",
      disabled = false,
      required = false,
      "aria-label": ariaLabel,
      id,
      name,
    },
    ref,
  ) => {
    return (
      <select
        ref={ref}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={className}
        disabled={disabled}
        required={required}
        aria-label={ariaLabel || placeholder}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    )
  },
)

Select.displayName = "Select"

export default Select
