"use client"

import { createContext, useContext, useState, useCallback, useRef } from "react"

const MessageContext = createContext()

export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState("")
  const [isError, setIsError] = useState(false)
  const timeoutRef = useRef(null)

  const showMessage = useCallback((msg, error = false) => {
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    setMessage(msg)
    setIsError(error)

    // Tự động ẩn thông báo sau 3 giây
    timeoutRef.current = setTimeout(() => {
      setMessage("")
      setIsError(false)
      timeoutRef.current = null
    }, 3000)
  }, [])

  const clearMessage = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setMessage("")
    setIsError(false)
  }, [])

  return (
    <MessageContext.Provider
      value={{
        message,
        isError,
        showMessage,
        clearMessage,
      }}
    >
      {children}
    </MessageContext.Provider>
  )
}

export const useMessage = () => {
  const context = useContext(MessageContext)
  if (!context) {
    throw new Error("useMessage must be used within a MessageProvider")
  }
  return context
}
