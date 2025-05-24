import { useMessage } from "../../contexts/MessageContext"

const Message = () => {
  const { message, isError } = useMessage()

  if (!message) return <div id="message" style={{ minHeight: "20px" }}></div>

  return (
    <div
      id="message"
      style={{
        padding: "10px",
        marginBottom: "15px",
        borderRadius: "4px",
        textAlign: "center",
        minHeight: "20px",
        color: isError ? "red" : "green",
      }}
    >
      {message}
    </div>
  )
}

export default Message
