import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {editarProductoAction} from "../actions/productoActions";
import {useHistory} from 'react-router-dom'

const EditarProducto = () => {

    const history = useHistory();

    //nuevo state de producto
    const [producto, guardarProducto] = useState({
        nombre: '',
        precio: ''
    })

    //Utilizar useDispatch y te crea una funcion
    const dispatch = useDispatch();

    //Acceder al state del store
    const productoEditar = useSelector((state) => state.productos.productoeditar)

    //Llenar el state automaticamente
    useEffect(() => {
        guardarProducto(productoEditar)
    }, [productoEditar])

    //Leer los datos del formulario
    const onChangeFormulario = e => {
        guardarProducto({
            ...producto,
            [e.target.name]: e.target.value
        })
    }

    //Cuando el usuario haga submit
    const submitEditarProducto = e => {
        e.preventDefault();
        dispatch(editarProductoAction(producto));
        history.push('/');
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Editar Producto
                        </h2>

                        <form onSubmit={submitEditarProducto}>
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input
                                    type="text"
                                    className='form-control'
                                    placeholder='Nombre Producto'
                                    name={'nombre'}
                                    defaultValue={productoEditar.nombre}
                                    onChange={onChangeFormulario}
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio Producto</label>
                                <input
                                    type="number"
                                    className='form-control'
                                    placeholder='Precio Producto'
                                    name={'precio'}
                                    defaultValue={productoEditar.precio}
                                    onChange={onChangeFormulario}
                                />
                            </div>
                            <button
                                type={'submit'}
                                className='btn btn-primary font-weight-bold text-uppercase
                               d-block w-100'
                            >Guardar Cambios
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditarProducto;