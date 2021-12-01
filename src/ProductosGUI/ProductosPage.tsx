import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Producto } from "../Models/Producto";
import ProductoRow from './ProductoRow'

const ProductosPage = () => {

    const GetProductos = async () => {
        await axios.get("https://localhost:7227/api/Productos/ProductosCategorias")
            .then((respuesta: AxiosResponse<Producto[]>) => {
                setProductos(respuesta.data)
                console.log(respuesta.data);
            }).catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        GetProductos()
    }, [])

    const [productos, setProductos] = useState<Producto[]>([])

    return (
        <>
            <h1 className="">Productos</h1>
            <hr />
            <NavLink to="/AgregarProducto" className="btn btn-lg btn-success">Agregar</NavLink>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Categoria</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((p: Producto) => <ProductoRow
                        // id={p.id}
                        // nombre={p.nombre}
                        // precio={p.precio}
                        // stock={p.stock}
                        // id_Categoria={p.id_Categoria}
                        {...p}
                        key={p.id}
                    />)}
                </tbody>
            </table>
        </>
    )
}

export default ProductosPage
