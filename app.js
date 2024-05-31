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

