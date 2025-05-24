const { spawn } = require("child_process")
const readline = require("readline")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

console.log("🚀 Chọn port để chạy ứng dụng:")
console.log("1. Port 3001 (Mặc định)")
console.log("2. Port 3002 (Development)")
console.log("3. Port 4000")
console.log("4. Port 8080 (Production)")
console.log("5. Nhập port tùy chỉnh")

rl.question("Nhập lựa chọn (1-5): ", (answer) => {
  let port

  switch (answer) {
    case "1":
      port = 3001
      break
    case "2":
      port = 3002
      break
    case "3":
      port = 4000
      break
    case "4":
      port = 8080
      break
    case "5":
      rl.question("Nhập port tùy chỉnh: ", (customPort) => {
        port = Number.parseInt(customPort)
        if (isNaN(port) || port < 1000 || port > 65535) {
          console.log("❌ Port không hợp lệ! Sử dụng port mặc định 3001")
          port = 3001
        }
        startApp(port)
        rl.close()
      })
      return
    default:
      console.log("❌ Lựa chọn không hợp lệ! Sử dụng port mặc định 3001")
      port = 3001
  }

  startApp(port)
  rl.close()
})

function startApp(port) {
  console.log(`🚀 Đang khởi động ứng dụng trên port ${port}...`)

  const env = { ...process.env, PORT: port }
  const child = spawn("npm", ["start"], {
    env,
    stdio: "inherit",
    shell: true,
  })

  child.on("error", (error) => {
    console.error("❌ Lỗi khi khởi động:", error)
  })
}
