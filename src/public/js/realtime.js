// Conexión al servidor via Socket.IO
const socket = io();

// Referencias a elementos del DOM
const productForm = document.getElementById('productForm');
const productList = document.getElementById('productList');

// Listener del formulario para AGREGAR producto
productForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const newProduct = {
    title: document.getElementById('title').value,
    description: document.getElementById('description').value,
    code: document.getElementById('code').value,
    price: parseFloat(document.getElementById('price').value),
    stock: parseInt(document.getElementById('stock').value),
    category: document.getElementById('category').value
  };

  socket.emit('newProduct', newProduct);

  productForm.reset();
});

// Escucha la lista actualizada desde el servidor
socket.on('updateProducts', (products) => {
  productList.innerHTML = '';
  products.forEach(p => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${p.title}</strong> - $${p.price} <br/>
      ${p.description}
      <button onclick="deleteProduct(${p.id})">Eliminar</button>
    `;
    productList.appendChild(li);
  });
});

// Función global para ELIMINAR producto
function deleteProduct(id) {
  socket.emit('deleteProduct', id);
}
