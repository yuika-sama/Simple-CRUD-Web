# Hệ Thống Quản Lý Sản Phẩm

## Giới thiệu
- Đây là bài tập thứ 3 của bộ môn ```Lập trình mạng```
- Sinh viên thực hiện: Nguyễn Đức Anh - B22DCPT009
- Đây là dự án cơ bản quản lý sản phẩm xây dựng bằng ReactJS và ExpressJS, với CSDL sử dụng là MySQL
- ---
## Cách cài đặt và khởi chạy

- Project sử dụng VSCode làm công cụ lập trình
- **Backend sử dụng:** `expressjs`, `mysql2`, ```cors```,  ```dotenv```
- **Frontend sử dụng:** ```ReactJs```
- **Yêu cầu:**
  - Đã cài đặt **Node.js** trên máy
  - Đã cài đặt **VSCode**
  - Đã cài đặt **MySQL**

> **Lưu ý:** Luôn khởi chạy theo thứ tự: **Back-end → Front-end**

---

## Back-end

### 1. Cài đặt môi trường

Mở terminal và thực hiện:
```
cd BE
npm install
```

- Tạo một schema MySQL tên: `ltm`
- Tạo file `.env` trong thư mục `BE` với nội dung:

    ```
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=<Password MySQL>
    DB_NAME=ltm
    PORT=3000<không nên thay đổi port hoặc phải sửa cả front-end>
    ```
 - Tạo file ```.env``` trong thư mục ```FE``` với nội dung

| Biến                    | Mô tả                         | Mặc định                  | Bắt buộc |
|-------------------------|-------------------------------|---------------------------|----------|
| `PORT`                  | Port chạy React app           | 5000                      | Không    |
| `REACT_APP_API_BASE_URL`| URL API backend               | http://localhost:3000     | Có       |
| `REACT_APP_APP_NAME`    | Tên ứng dụng                  | Hệ Thống Quản Lý Sản Phẩm | Không    |
| `REACT_APP_VERSION`     | Version ứng dụng              | 1.0.0                     | Không    |
| `REACT_APP_ENV`         | Môi trường                    | development               | Không    |
| `REACT_APP_DEBUG`       | Debug mode                    | true                      | Không    |

---

### 2. Khởi chạy back-end

```
cd BE
npm run dev
```

---

## Front-end

### 1. Cài đặt môi trường

Mở terminal và thực hiện:

```
cd FE
npm install
```

### 2. Khởi chạy front-end

```
npm start
```

## Các cách thay đổi port (Front-end)

Sửa file `.env` trong thư mục `FE`
```
PORT=4000
```
---

## Cấu trúc file môi trường

```

.env                 \# File cấu hình chính (không commit)
.env.example         \# Template file (commit)
.gitignore           \# Ignore .env file

```

---

## Lưu ý quan trọng

1. **Không chỉnh sửa PORT của Backend** – Nếu có, hãy đảm bảo đã sửa lại các phần có sử dụng Backend URL
2. **Tạo schema và tables trên MySQL** – Cần tạo cấu trúc bảng phù hợp trong MySQL trước
					👉 [Tham khảo cấu trúc bảng tại đây](https://drive.google.com/file/d/1UHhlPQEeNLR_DPZHa6ohGme3gnSZR240/view)
---

### API không kết nối được
1. Kiểm tra `REACT_APP_API_BASE_URL` trong `.env`
2. Đảm bảo backend đang chạy
3. Kiểm tra CORS settings

### Environment variables không hoạt động
1. Đảm bảo có prefix `REACT_APP_`
2. Restart ứng dụng
3. Kiểm tra syntax file `.env`

---

## Tổng kết

- **Back-end:**  
  - `cd BE` → `npm install` → `npm run dev`
- **Front-end:**  
  - `cd FE` → `npm install` → `npm start`

> **Luôn chạy back-end trước khi chạy front-end.**  
> **Cấu hình `.env` đúng và không commit file này lên repository.**