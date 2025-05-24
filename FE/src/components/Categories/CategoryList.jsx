"use client"

const CategoryList = ({ categories, onEdit, onDelete }) => {
  if (categories.length === 0) {
    return (
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên danh mục</th>
              <th>Mô tả</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="4" className="text-center">
                Không có danh mục nào
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên danh mục</th>
            <th>Mô tả</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>{category.description || ""}</td>
              <td>
                <button className="action-btn edit-btn" onClick={() => onEdit(category)}>
                  Sửa
                </button>
                <button className="action-btn delete-btn" onClick={() => onDelete(category.id)}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CategoryList
