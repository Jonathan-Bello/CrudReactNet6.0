import { NavLink } from 'react-router-dom'
import { Producto } from '../Models/Producto'

const ProductoRow = (p: Producto) => {
    return (
        <tr>
            <td>{p.nombre}</td>
            <td>{p.stock}</td>
            <td>{p.precio}</td>
            <td>{p.categoria!.nombre}</td>
            <td><NavLink to={`/ActualizarProducto/${p.id}`} className="btn btn-warning">Actualizar</NavLink></td>
            <td><NavLink to={`/EliminarProducto/${p.id}`} className="btn btn-danger">Eliminar</NavLink></td>
        </tr>
    )
}

export default ProductoRow
