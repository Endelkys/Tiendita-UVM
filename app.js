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

