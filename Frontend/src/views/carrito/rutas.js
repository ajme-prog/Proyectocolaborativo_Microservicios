let host ="localhost"

export let URL = {
    obtener_productos: `http://${host}:9000/carrito/obtener_libros`,
    generar_pedido: `http://${host}:9000/carrito/generar_pedido`,
    obtener_compras: `http://${host}:9000/carrito/obtener_compras/`
};