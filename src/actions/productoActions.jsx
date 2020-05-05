import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR
} from '../types'
import clienteAxios from "../config/axios";
import Swal from "sweetalert2";

//Crear nuevos productos
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
})
