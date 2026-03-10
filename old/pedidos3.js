const dayjs = require('dayjs');

// ==========================================
// 1. Configuración y Datos
// ==========================================
const CONFIG = { 
    iva: 0.21,
    descuentoUmbral: 100,
    descuentoPorcentaje: 0.05,
    costeEnvio: 5.99,
    envioGratisUmbral: 50
};

const cliente = {
    nombre: "maría lópez",
    email: "maria@example.com"
};

// Hemos añadido la propiedad 'stockDisponible' a cada producto
const carrito = [
    { nombre: "Cesta de Verduras Ecológicas", precio: 45.00, cantidad: 1, esFragil: false, stockDisponible: 5 },
    { nombre: "Aceite de Oliva Virgen Extra", precio: 28.50, cantidad: 2, esFragil: true, stockDisponible: 10 },
    { nombre: "Miel Cruda Orgánica", precio: 12.00, cantidad: 1, esFragil: true, stockDisponible: 0 } // ¡Ojo! Sin stock
];

// ==========================================
// 2. Funciones Modulares
// ==========================================

// Verifica que haya stock suficiente para cada producto que queremos comprar
function validarStock(items) {
    // .every() comprueba si TODOS los elementos cumplen la condición
    return items.every(item => item.stockDisponible >= item.cantidad);
}

// Calcula el subtotal usando .reduce()
function calcularSubtotal(items) {
    return items.reduce((acumulador, item) => acumulador + (item.precio * item.cantidad), 0);
}

// Determina los gastos de envío
function calcularEnvio(subtotal) {
    return subtotal >= CONFIG.envioGratisUmbral ? 0 : CONFIG.costeEnvio;
}

// Genera la factura final
function procesarPedido(clienteData, items) {
    console.log("⏳ Procesando pedido...\n");

    // 1. Validar Stock
    if (!validarStock(items)) {
        return "❌ Error: Algunos productos de tu carrito no tienen stock suficiente. Pedido cancelado.";
    }

    // 2. Cálculos base
    const subtotal = calcularSubtotal(items);
    const tieneFragil = items.some(item => item.esFragil);
    
    // 3. Descuentos
    let descuento = 0;
    if (subtotal > CONFIG.descuentoUmbral) {
        descuento = subtotal * CONFIG.descuentoPorcentaje;
    }
    const subtotalConDescuento = subtotal - descuento;

    // 4. Impuestos y Envío
    const impuestos = subtotalConDescuento * CONFIG.iva;
    const gastosEnvio = calcularEnvio(subtotalConDescuento);
    const total = subtotalConDescuento + impuestos + gastosEnvio;

    // 5. Fecha
    const fechaEntrega = dayjs().add(3, 'day').format('DD/MM/YYYY');

    // 6. Formateo de salida
    const nombresProductos = items.map(p => `${p.cantidad}x ${p.nombre}`).join("\n  - ");

    return `
=========================================
🌱 TIENDA ECO - FACTURA OFICIAL 🌱
=========================================
👤 Cliente: ${clienteData.nombre.toUpperCase()}
📧 Contacto: ${clienteData.email}

📦 Productos:
  - ${nombresProductos}
⚠️ Embalaje especial: ${tieneFragil ? "SÍ (Precaución: Frágil)" : "No"}

--- Desglose ---
Subtotal: ${subtotal.toFixed(2)}€
Descuento: -${descuento.toFixed(2)}€
Base Imponible: ${subtotalConDescuento.toFixed(2)}€
IVA (21%): +${impuestos.toFixed(2)}€
Envío: ${gastosEnvio === 0 ? "GRATIS" : `+${gastosEnvio.toFixed(2)}€`}
-----------------------------------------
💶 TOTAL A PAGAR: ${total.toFixed(2)}€
=========================================
🚚 Entrega estimada: ${fechaEntrega}
=========================================
`;
}

// ==========================================
// 3. Ejecución del Programa
// ==========================================
const resultado = procesarPedido(cliente, carrito);
console.log(resultado);