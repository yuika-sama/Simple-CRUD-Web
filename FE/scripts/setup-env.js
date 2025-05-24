const fs = require("fs")
const readline = require("readline")
const path = require("path")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

console.log("🔧 Thiết lập cấu hình môi trường cho ứng dụng")
console.log("=" * 50)

const questions = [
  {
    key: "PORT",
    question: "Nhập port cho React app (mặc định: 3001): ",
    default: "3001",
    validate: (value) => {
      const port = Number.parseInt(value)
      return !isNaN(port) && port >= 1000 && port <= 65535
    },
  },
  {
    key: "REACT_APP_API_BASE_URL",
    question: "Nhập URL API backend (mặc định: http://localhost:3000): ",
    default: "http://localhost:3000",
    validate: (value) => value.startsWith("http"),
  },
  {
    key: "REACT_APP_APP_NAME",
    question: "Nhập tên ứng dụng (mặc định: Hệ Thống Quản Lý Sản Phẩm): ",
    default: "Hệ Thống Quản Lý Sản Phẩm",
    validate: () => true,
  },
  {
    key: "REACT_APP_VERSION",
    question: "Nhập version (mặc định: 1.0.0): ",
    default: "1.0.0",
    validate: () => true,
  },
  {
    key: "REACT_APP_ENV",
    question: "Nhập môi trường (development/production, mặc định: development): ",
    default: "development",
    validate: (value) => ["development", "production"].includes(value),
  },
  {
    key: "REACT_APP_DEBUG",
    question: "Bật debug mode? (true/false, mặc định: true): ",
    default: "true",
    validate: (value) => ["true", "false"].includes(value),
  },
]

const config = {}
let currentQuestion = 0

function askQuestion() {
  if (currentQuestion >= questions.length) {
    createEnvFile()
    return
  }

  const q = questions[currentQuestion]
  rl.question(q.question, (answer) => {
    const value = answer.trim() || q.default

    if (!q.validate(value)) {
      console.log("❌ Giá trị không hợp lệ! Vui lòng nhập lại.")
      askQuestion()
      return
    }

    config[q.key] = value
    currentQuestion++
    askQuestion()
  })
}

function createEnvFile() {
  const envContent = Object.entries(config)
    .map(([key, value]) => `${key}=${value}`)
    .join("\n")

  const envPath = path.join(process.cwd(), ".env")

  fs.writeFileSync(envPath, envContent)

  console.log("\n✅ File .env đã được tạo thành công!")
  console.log("📁 Đường dẫn:", envPath)
  console.log("\n📋 Nội dung file .env:")
  console.log("-" * 30)
  console.log(envContent)
  console.log("-" * 30)
  console.log("\n🚀 Bây giờ bạn có thể chạy: npm start")
  console.log("🔧 Để thay đổi cấu hình, chỉnh sửa file .env hoặc chạy lại: npm run setup")

  rl.close()
}

// Kiểm tra xem file .env đã tồn tại chưa
const envPath = path.join(process.cwd(), ".env")
if (fs.existsSync(envPath)) {
  rl.question("⚠️  File .env đã tồn tại. Bạn có muốn ghi đè? (y/N): ", (answer) => {
    if (answer.toLowerCase() === "y" || answer.toLowerCase() === "yes") {
      console.log("🔄 Đang tạo file .env mới...")
      askQuestion()
    } else {
      console.log("✅ Giữ nguyên file .env hiện tại.")
      rl.close()
    }
  })
} else {
  askQuestion()
}
