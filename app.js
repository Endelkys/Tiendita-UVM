// Definición de la clase Producto
class Producto {
    constructor(id, nombre, cantidad, precio) {
        this.id = id;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precio = precio;
    }
}

// Variables globales
let productos = [];
let editandoProductoId = null;

// Cargar productos desde LocalStorage al iniciar la aplicación
document.addEventListener('DOMContentLoaded', cargarDesdeLocalStorage);

// Event listeners
document.getElementById('add-product').addEventListener('click', mostrarFormularioAgregar);
document.getElementById('save-product').addEventListener('click', guardarProducto);
document.getElementById('cancel').addEventListener('click', cancelarEdicion);
document.getElementById('search').addEventListener('input', filtrarProductos);

// Función para mostrar el formulario de agregar producto
function mostrarFormularioAgregar() {
    limpiarFormulario();
    document.getElementById('form-container').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

// Función para limpiar el formulario
function limpiarFormulario() {
    document.getElementById('product-name').value = '';
    document.getElementById('product-quantity').value = '';
    document.getElementById('product-price').value = '';
    editandoProductoId = null;
}

// Función para cancelar la edición
function cancelarEdicion() {
    limpiarFormulario();
    document.getElementById('form-container').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

// Función para guardar producto (nuevo o editado)
function guardarProducto() {
    const nombre = document.getElementById('product-name').value;
    const cantidad = parseInt(document.getElementById('product-quantity').value);
    const precio = parseFloat(document.getElementById('product-price').value);

    if (!nombre || isNaN(cantidad) || isNaN(precio)) {
        mostrarAlerta('Por favor, complete todos los campos', 'error');
        return;
    }

    const id = editandoProductoId || Date.now();
    const producto = new Producto(id, nombre, cantidad, precio);

    if (editandoProductoId) {
        // Editar producto existente
        productos = productos.map(p => p.id === editandoProductoId ? producto : p);
        mostrarAlerta('Producto actualizado con éxito', 'success');
    } else {
        // Agregar nuevo producto
        productos.push(producto);
        mostrarAlerta('Producto agregado con éxito', 'success');
    }

    actualizarInterfaz();
    guardarEnLocalStorage();
    limpiarFormulario();
    document.getElementById('form-container').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

// Función para actualizar la interfaz de usuario
function actualizarInterfaz() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    productos.forEach(producto => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            ${producto.nombre} - Cantidad: ${producto.cantidad} - Precio: ${producto.precio}
            <button onclick="editarProducto(${producto.id})">Editar</button>
            <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Función para guardar productos en LocalStorage
function guardarEnLocalStorage() {
    localStorage.setItem('productos', JSON.stringify(productos));
}

// Función para cargar productos desde LocalStorage
function cargarDesdeLocalStorage() {
    const data = localStorage.getItem('productos');
    if (data) {
        productos = JSON.parse(data);
        actualizarInterfaz();
    }
}

// Función para filtrar productos
function filtrarProductos() {
    const query = document.getElementById('search').value.toLowerCase();
    const filteredProducts = productos.filter(producto => 
        producto.nombre.toLowerCase().includes(query)
    );
    actualizarInterfazConFiltro(filteredProducts);
}

// Función para actualizar la interfaz con productos filtrados
function actualizarInterfazConFiltro(productosFiltrados) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    productosFiltrados.forEach(producto => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            ${producto.nombre} - Cantidad: ${producto.cantidad} - Precio: ${producto.precio}
            <button onclick="editarProducto(${producto.id})">Editar</button>
            <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Función para mostrar alertas
function mostrarAlerta(mensaje, tipo) {
    const alerta = document.createElement('div');
    alerta.className = `alert ${tipo}`;
    alerta.textContent = mensaje;
    document.body.appendChild(alerta);
    setTimeout(() => {
        alerta.remove();
    }, 3000);
}