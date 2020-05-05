import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR

} from '../types'
import clienteAxios from "../config/axios";
import Swal from "sweetalert2";

//Crear nuevos productos------------------------------------------------
export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        dispatch(agregarProducto());
        try {
            //Insertar en la API
            await clienteAxios.post('/productos', producto)

            //Si todo sale bien, actualizar el state
            dispatch(agregarProductoExito(producto))
            Swal.fire('Correcto', 'El producto se agrego correctamente', "success")

        } catch (e) {
            console.log(e)
            //Si hay un error cambia el state
            dispatch(agregarProductoError(true))
            Swal.fire('Error', 'Hubo un error intenta de nuevo', "error")

        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
});

//si el producto se guarda en la base e datos
const agregarProductoExito = (producto) => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

//si hubo un error
const agregarProductoError = (estado) => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
});


//Funcion que descarga los productos de la base de datos---------------------------------
export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch(descargarProductos());
        try {
            //Descargar de la API
            const respuesta = await clienteAxios.get('/productos')

            //Si todo sale bien, actualizar el state
            dispatch(descargarProductosExitosa(respuesta.data))

        } catch (e) {
            console.log(e)
            //Si hay un error cambia el state
            dispatch(descargarProductosError(true))
            await Swal.fire('Error', 'Hubo un error intenta de nuevo', "error")


        }
    }

}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})

//si el producto se guarda en la base e datos
const descargarProductosExitosa = (productos) => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
})

//si hubo un error
const descargarProductosError = (estado) => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: estado
});


//Funcion que selecciona y elimina el producto----------------------------------------
export function borrarProductoAction(id) {
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id));
        try {
            //Eliminar de la API
            await clienteAxios.delete(`/productos/${id}`)

            //Si todo sale bien, actualizar el state
            dispatch(eliminarProductoExito())

            //Mostrar mensaje de confirmacion
            await Swal.fire(
                'Eliminado!',
                'El producto ha sido eliminado.',
                'success'
            )

        } catch (e) {
            console.log(e)
            //Si hay un error cambia el state
            dispatch(eliminarProductoError(true))
            await Swal.fire('Error', 'Hubo un error intenta de nuevo', "error")


        }
    }

}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})

const eliminarProductoExito=()=>({
    type:PRODUCTO_ELIMINADO_EXITO,
})

const eliminarProductoError=(estado)=>({
    type:PRODUCTO_ELIMINADO_EXITO,
    payload:estado
})