const dayjs = require("dayjs");

const IVA = 0.21;

let nombreClientes = "Juan Perez";
let direccionClientes = "Calle Falsa 123";
let telefonoClientes = "555-1234";
let subtotal = 200;
let stock = true;
let fechaEntrega = dayjs().add(3, "day").format("YYYY-MM-DD"); // calcula la fecha de entrega sumando 3 días a la fecha actual y formateándola en formato "YYYY-MM-DD"

const productos = [
  { nombre: "Producto A", precio: 50, cantidad: 23 },
  { nombre: "Producto B", precio: 100, cantidad: 18 },
  { nombre: "Producto C", precio: 100, cantidad: 15 },
  { nombre: "Producto D", precio: 75, cantidad: 33 },
  { nombre: "Producto E", precio: 100, cantidad: 12 },
  { nombre: "Producto F", precio: 100, cantidad: 10 },
];

let clienteNormalizado = nombreClientes.toUpperCase();
let direccionNormalizada = direccionClientes.toUpperCase();
let telefonoNormalizado = telefonoClientes.replace(/-/g, "");

let tieneFragil = productos.some((producto) =>
  producto.nombre.toUpperCase().includes("FRAGIL"),
);

function comprobacionStock(productos) {
  if (!stock) {
    console.log("No hay stock disponible para los productos seleccionados.");
    return false;
  }
  return productos.every((producto) => producto.cantidad > 0); // devuelve true si todos los productos tienen cantidad mayor a 0
};

function obtenerPorcentajeDescuento(subtotal) {
  if (subtotal >= 100) {
    return (porcentajeDescuento = 0.05);
  } else {
    return (porcentajeDescuento = 0);
  }
};

function calcularTotal(subtotal, porcentajeDescuento) {
  const descuento = subtotal * porcentajeDescuento;
  const totalConDescuento = subtotal - descuento;
  const totalConIVA = totalConDescuento * (1 + IVA);
  return totalConIVA.toFixed(2);
};

function entregarPedido() {
  if (comprobacionStock(productos)) {
    // si hay stock disponible para todos los productos
    const descuentoAplicado = obtenerPorcentajeDescuento(subtotal); // calcula el porcentaje de descuento basado en el subtotal
    const total = calcularTotal(subtotal, descuentoAplicado); // calcula el total a pagar aplicando el descuento y el IVA
    console.log(
      `Pedido entregado a ${clienteNormalizado} en ${direccionNormalizada}. Total a pagar: $${total}. Fecha de entrega: ${fechaEntrega}.`); // muestra un mensaje indicando que el pedido ha sido entregado, incluyendo el nombre del cliente, la dirección y el total a pagar
  }
};

const descuento = obtenerPorcentajeDescuento(subtotal);
const subtotalConDescuento = subtotal - subtotal * descuento;
const ivaCalculado = subtotalConDescuento * IVA;
const total = calcularTotal(subtotal, descuento);


const resumenPedido = `
======================================
TIENDA ECO - RESUMEN DE PEDIDO
======================================
Cliente: ${clienteNormalizado}
Dirección: ${direccionNormalizada}
Teléfono: ${telefonoNormalizado}
¿Productos frágiles?: ${tieneFragil ? "Sí" : "No"}

--- Desglose de la facturación ---
Subtotal: ${subtotal.toFixed(2)}
Descuento aplicado: ${(descuento * 100).toFixed(2)}%
Subtotal con descuento: ${(subtotal - subtotal * descuento).toFixed(2)}
IVA (21%): ${ivaCalculado.toFixed(2)}




-----------------------------------------------------
TOTAL A PAGAR: ${total}
-----------------------------------------------------
Fecha de entrega estimada: ${fechaEntrega}
======================================
`;

console.log(resumenPedido);
