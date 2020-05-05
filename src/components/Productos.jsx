import React, {Fragment, useEffect} from 'react';
import Producto from "./Producto";

// Actions de redux
import {obtenerProductosAction} from '../actions/productoActions'
import {useDispatch, useSelector} from "react-redux";


const Productos = () => {

    //Utilizar useDispatch y te crea una funcion
    const dispatch = useDispatch();

    useEffect(() => {
        //Consultar la API
        const cargarProductos = () => dispatch(obtenerProductosAction());
        cargarProductos();
    }, [dispatch])

    //Acceder al state del store
    const productos = useSelector((state) => state.productos.productos)
    const cargando = useSelector((state) => state.productos.loading)


    return (
        <Fragment>
            <h2 className="text-center my-5">Listado de Productos</h2>
            {cargando?<p className='text-center'>Cargando...</p>:null}
            <table className="table table-striped">
                <thead className="bg-primary table-dark">
                <tr>
                    <th scope='col'>Nombre</th>
                    <th scope='col'>Precio</th>
                    <th scope='col'>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {productos.length === 0
                    ?
                    <tr>
                        <td>No hay productos</td>
                    </tr>
                    :
                    productos.map(producto => (
                        <Producto key={producto.id} producto={producto}/>
                    ))
                }

                </tbody>
            </table>
        </Fragment>
    );
};

export default Productos;