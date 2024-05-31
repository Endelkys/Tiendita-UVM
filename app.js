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
