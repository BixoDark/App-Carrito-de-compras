# Simulador de Tienda Digital Ferretera con carrito de compras

## Descripción del Proyecto

Este proyecto es una aplicación de consola desarrollada en JavaScript que simula el funcionamiento de una tienda digital ferretera. El sistema permite al usuario interactuar mediante ventanas emergentes (`prompt` y `alert`) para gestionar un carrito de compras, evaluar presupuestos y aplicar cupones de descuento, finalizando con la simulación del pago.

## Funcionalidades Principales

La aplicación interactiva permite a los usuarios:

- **Visualizar el catálogo:** Muestra una lista de herramientas (como taladros, sierras circulares de marcas como Makita, etc.) filtrando aquellos que no tienen stock disponible.
- **Gestionar el carrito:** Ingresar y eliminar productos del carrito de compras utilizando el ID del producto.
- **Control de presupuesto:** Declarar un presupuesto inicial para validar si la compra puede concretarse.
- **Aplicación de descuentos:** Sistema de validación de cupones (ej: `primeracompra`, `10%off`) que reduce el total a pagar.
- **Cálculo total:** Muestra el subtotal, el descuento aplicado y el valor final de la compra.

## Documentación y Análisis Técnico

El código fue estructurado siguiendo las mejores prácticas y cumpliendo con los fundamentos de programación solicitados:

### 1. Arreglos y Objetos

- **Catálogo:** Se utilizó un arreglo de objetos (`inventario`) para estructurar los datos de los productos. Cada objeto contiene propiedades como `id`, `nombre`, `precio` y `stock`.
- **Carrito dinámico:** El carrito de compras (`carritoDeCompras`) es un arreglo que muta dinámicamente según las acciones del usuario.

### 2. Funciones y Modularización

El código está dividido en funciones con responsabilidades únicas y específicas, evitando la redundancia:

- `mostrarProducto()`: Itera sobre el inventario usando `forEach()`.
- `buscarProducto()`: Utiliza el método `.find()` para aislar productos.
- `quitarDelCarrito()`: Implementa `.findIndex()` y `.splice()` para manipular el arreglo.
- `calcularSubTotal()`: Emplea el método `.reduce()` para sumarizar los valores.
- `calculoTotalFinal()`: Función integradora que retorna múltiples valores en un objeto.

### 3. Estructuras Condicionales y de Bucles

- **Bucle principal:** Se implementó un ciclo `while` basado en la variable booleana `continuar` que mantiene la aplicación ejecutándose hasta que el usuario decida salir.
- **Navegación:** Un bloque `switch` gestiona la selección del usuario en el menú principal.
- **Validaciones:** Se utilizan sentencias `if/else` para el control de inventario (evitar ventas sin stock), validación de cupones y comprobación del límite presupuestario. También se utiliza `isNaN()` para asegurar que las entradas de ID sean numéricas.

## Instrucciones de Ejecución

1. Descargar o clonar el repositorio.
2. Abrir el archivo `index.html` (que debe tener enlazado el script `.js`) en cualquier navegador web moderno.
3. Hacer clic en el botón de inicio (identificado en el DOM con el ID "iniciar").
4. Seguir las instrucciones en pantalla a través de las ventanas de diálogo (`prompt` y `alert`).

---

**Autor:** Victor Hugo Navarrete Duran
