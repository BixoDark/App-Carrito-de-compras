// ===============================
// Datos de la aplicación
// ===============================

//inventario de productos a la venta
const inventario = [
    { id: 1, nombre: "Taladro", precio: 40000, stock: 10 },
    { id: 2, nombre: "Alicate", precio: 5000, stock: 5 },
    { id: 3, nombre: "Sierra Circular", precio: 30000, stock: 5 },
    { id: 4, nombre: "Serrucho", precio: 10000, stock: 7 },
    { id: 5, nombre: "Galletero", precio: 30000, stock: 10 },
    { id: 6, nombre: "Martillo", precio: 8000, stock: 16 },
    { id: 7, nombre: "Escuadra Rápida", precio: 7000, stock: 6 },
    { id: 8, nombre: "Huincha de medir", precio: 6000, stock: 20 },
    { id: 9, nombre: "Cinta Aislante", precio: 2000, stock: 50 },
    { id: 10, nombre: "Desatornillador", precio: 3000, stock: 16 },
    { id: 11, nombre: "Tijeras", precio: 3000, stock: 15 },
    { id: 12, nombre: "Baterías Herramientas Inalámbricas", precio: 55000, stock: 3 }
];

// ===============================
// Constantes
// ===============================

//Menu principal despegable.
const menu = (`Bienvenido a la tienda digital Ferretera.
        Para continuar ingrese un número de las siguientes opciones:
            1. Ingresar productos al carrito de compras.
            2. Eliminar producto del carrito de compras.
            3. Declarar presupuesto.
            4. Revisar el carrito de compras.
            5. Ingresar cupón de descuento.
            6. Comprar.
            7. Salir de la tienda.`);


// ===============================
// Funciones auxiliares
// ===============================

//Realiza una lista para imprimir en pantalla.
function mostrarProducto(productos, filtrarStock = false) {
    let lista = "";

    productos.forEach(producto => {
        if (!filtrarStock || producto.stock > 0) {
            lista += `ID: ${producto.id} | ${producto.nombre}= $${producto.precio.toLocaleString("es-CL")}\n`;
        }
    });

    return lista;
}

// Se busca el producto con el id.
function buscarProducto(idProducto, inventario) {
    return inventario.find(item => item.id === idProducto);

}

//eliminamos el producto del carro ingresando el id
function quitarDelCarrito(idProducto, carrito) {
    const indice = carrito.findIndex(item => item.id === idProducto);

    if (indice === -1) {
        return false;
    }

    carrito[indice].stock++;
    carrito.splice(indice, 1);

    return true;
}

// Se agrega el producto al carrito de compras.
function agregarAlCarrito(idProducto, carrito, inventario) {
    const producto = buscarProducto(idProducto, inventario);

    if (!producto || producto.stock <= 0) {
        return false;
    }

    carrito.push(producto);
    producto.stock--;

    return true;
}

//devuelve el resultado final, usando las funciones aplicarDescuento y calculoTotal
function calculoTotalFinal(carrito, descuento) {
    const subTotal = calcularSubTotal(carrito);
    const total = aplicarDescuento(subTotal, descuento);
    return { subTotal, total };
}
// aplica el descuento, segun el cupon usado por el usuario
function aplicarDescuento(total, descuento) {
    return total - (total * descuento / 100);
}

// Suma de productos en el carro de compras.
function calcularSubTotal(carrito) {
    return carrito.reduce((total, producto) => {
        return total + producto.precio;
    }, 0);
}

//se utiliza un swich para comprobar si el cupon ingresado esta en la lista.
function validarCupon(cupon) {
    switch (cupon) {
        case "primeracompra":
            return 15;

        case "10%off":
            return 10;

        case "5%off":
            return 5;

        case "7%off":
            return 7;

        default:
            return 0;
    }
}

// ===============================
// Función principal
// ===============================

function iniciarAplicacion() {
    console.log("La aplicación comenzó");

    let carritoDeCompras = [];

    let presupuesto = 0;

    let descuento = 0;

    let continuar = true;

    while (continuar) {
        const opcion = Number(prompt(menu));

        switch (opcion) {
            case 1: {
                let listaDeProducto = mostrarProducto(inventario, true);//Al enviar true permito, a la funcion llamada, filtrar los articulos que no tengan stock, para no mostrarlos en pantalla.
                let id = Number(prompt("Ingrese el id del producto que quiera agregar al carro\n" + listaDeProducto));
                if (!isNaN(id)) {
                    if (agregarAlCarrito(id, carritoDeCompras, inventario)) {
                        alert("¡El producto ha sido agregado exitosamente!");
                    } else {
                        alert("Producto no encontrado o sin stock.");
                    }

                } else {
                    alert("Ingrese un id correcto.");
                }

                break;
            }
            case 2: {
                if (carritoDeCompras.length === 0) {
                    alert("Su carrito de compras está vacío.");
                    break;
                }

                const listaDelCarrito = mostrarProducto(carritoDeCompras);

                const idEliminar = Number(
                    prompt(
                        "Ingrese el ID del producto que desea eliminar del carrito:\n\n" +
                        listaDelCarrito
                    )
                );

                if (isNaN(idEliminar)) {
                    alert("Ingrese un ID válido.");
                    break;
                }

                if (quitarDelCarrito(idEliminar, carritoDeCompras)) {
                    alert("Producto eliminado correctamente.");
                } else {
                    alert("El producto no se encuentra en el carrito.");
                }
                break;
            }
            case 3: {
                presupuesto = Number(prompt("Ingrese su presupuesto de compras."));
                if (!isNaN(presupuesto)) {
                    alert("Su presupuesto ha sido agregado exitosamente.");
                } else {
                    alert("Ha ingresado un presupuesto no válido.");
                    presupuesto = 0;
                }
                break;
            }
            case 4: {
                const compra = calculoTotalFinal(carritoDeCompras, descuento);

                alert(`Los artículos de su carrito son:\n${mostrarProducto(carritoDeCompras)}
                Subtotal: $${compra.subTotal.toLocaleString("es-CL")}.
                Descuento: ${descuento}%.
                Total: $${compra.total.toLocaleString("es-CL")}.`);

                break;
            }
            case 5: {
                let cupon = prompt("Ingrese un cupón de descuento.");
                let valorDescuento = 0;

                if (cupon !== null) {
                    valorDescuento = validarCupon(cupon.trim().toLowerCase());
                }

                if (valorDescuento) {
                    descuento = valorDescuento;
                    alert(`El cupón ingresado es del ${descuento}%`);
                } else {
                    alert("Cupón inválido.");
                }

                break;
            }
            case 6: {
                const cuentaTotal = calculoTotalFinal(carritoDeCompras, descuento);
                let confirmacionDeCompra = prompt(`Su cuenta a pagar es:
                    Subtotal: $ ${cuentaTotal.subTotal.toLocaleString("es-CL")}
                    Descuento: ${descuento}%
                    Total: $ ${cuentaTotal.total.toLocaleString("es-CL")}
                    
                    Si desea continuar, responda con un "Si".`
                );
                if (confirmacionDeCompra && confirmacionDeCompra.trim().toLowerCase() === "si") {
                    if (cuentaTotal.total <= presupuesto) {
                        alert("Su compra fue un éxito, Gracias por confiar en nosotros.");
                        continuar = false

                    } else {
                        alert("La compra excede su presupuesto.\nRealice un abono o retire artículos de su carrito de compras.");
                    }
                } else {
                    alert("Transacción no realizada, continúe utilizando la plataforma.");
                }
                break;
            }
            case 7: {
                alert("Gracias por su visita, Vuelva pronto.");
                console.log("Programa finalizado");
                continuar = false;
                break;
            }

            default: {
                alert("Opción no válida, reintente nuevamente.");
                console.log("El usuario ingresó una opción no válida.");
            }
        }
    }
}


// ===============================
// Eventos
// ===============================

const boton = document.getElementById("iniciar");

boton.addEventListener("click", iniciarAplicacion);