// Conexión en tiempo real al servidor usando Socket.IO
const socket = io();

// Accedemos a elementos clave del DOM
const productForm = document.getElementById('productForm');
const productList = document.getElementById('productList');

// Evento del formulario para crear un nuevo producto
productForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Evita el refresh del navegador

  // Armamos el nuevo producto desde los inputs del formulario
  const newProduct = {
    title: document.getElementById('title').value,
    description: document.getElementById('description').value,
    code: document.getElementById('code').value,
    price: parseFloat(document.getElementById('price').value),
    stock: parseInt(document.getElementById('stock').value),
    category: document.getElementById('category').value
  };

  socket.emit('newProduct', newProduct); // Enviamos el producto al servidor
  productForm.reset(); // Limpiamos el formulario
});

// Escuchamos actualizaciones del listado desde el servidor
socket.on('updateProducts', (products) => {
  productList.innerHTML = ''; // Reiniciamos la lista antes de renderizar

  products.forEach(p => {
    const li = document.createElement('li');

    // Mostramos el producto con un botón para eliminarlo
    li.innerHTML = `
      <strong>${p.title}</strong> - $${p.price} <br/>
      ${p.description}
      <button onclick="deleteProduct(${p.id})">Eliminar</button>
    `;

    productList.appendChild(li);
  });
});

// Función para emitir la eliminación de un producto por su ID
function deleteProduct(id) {
  socket.emit('deleteProduct', id);
}

