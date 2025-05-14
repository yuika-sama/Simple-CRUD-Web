const API_URL = 'http://localhost:3000/products';

let editingId = null;

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();

    document.getElementById('addBtn').addEventListener('click', async () => {
        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const stock = document.getElementById('stock').value;

        if (!name || price === "" || stock === "") {
            showMessage('Vui lòng nhập đầy đủ thông tin!', true);
            return;
        }

        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, price, stock })
        });

        document.getElementById('productForm').reset();
        showMessage('Thêm sản phẩm thành công!');
        loadProducts();
    });

    document.getElementById('updateBtn').addEventListener('click', async () => {
        if (editingId === null) return;

        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const stock = document.getElementById('stock').value;

        if (!name || price === "" || stock === "") {
            showMessage('Vui lòng nhập đầy đủ thông tin!', true);
            return;
        }

        await fetch(`${API_URL}/${editingId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name, price, stock })
        });

        document.getElementById('productForm').reset();
        showMessage('Cập nhật sản phẩm thành công!');
        editingId = null;
        document.getElementById('updateBtn').disabled = true;
        document.getElementById('addBtn').disabled = false;
        loadProducts();
    });
});

async function loadProducts() {
    const res = await fetch(API_URL);
    const products = await res.json();
    const tbody = document.getElementById('productList');
    tbody.innerHTML = '';
    products.forEach(product => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.stock}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editProduct(${product.id}, '${product.name}', ${product.price}, ${product.stock})">Sửa</button>
                <button class="action-btn delete-btn" onclick="deleteProduct(${product.id})">Xóa</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

window.deleteProduct = async function(id) {
    if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        showMessage('Đã xóa sản phẩm!');
        loadProducts();
    }
};

window.editProduct = function(id, name, price, stock) {
    document.getElementById('name').value = name;
    document.getElementById('price').value = price;
    document.getElementById('stock').value = stock;
    editingId = id;
    document.getElementById('updateBtn').disabled = false;
    document.getElementById('addBtn').disabled = true;
};

function showMessage(msg, isError = false) {
    const div = document.getElementById('message');
    div.innerText = msg;
    div.style.color = isError ? 'red' : 'green';
    setTimeout(() => { div.innerText = ''; }, 2000);
}
