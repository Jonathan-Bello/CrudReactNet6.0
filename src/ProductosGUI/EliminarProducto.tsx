import axios, { AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Producto } from "../Models/Producto"

const EliminarProducto = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [eliminado, setEliminado] = useState(false)


    const initialProducto: Producto = {
        id: 0,
        nombre: "",
        precio: 0,
        stock: 0,
        id_Categoria: 0
    }

    const [producto, setProducto] = useState<Producto>(initialProducto)

    const getProducto = async () => {
        await axios.get(`https://localhost:7227/api/Productos/${id}`)
            .then((respuesta: AxiosResponse<Producto>) => {
                setProducto(respuesta.data)
            }).catch((error) => {
                console.log(error)
            })
    }

    const deleteProducto = async (producto: Producto) => {
        try {
            await axios.delete(`https://localhost:7227/api/Productos`, { data: producto })
                .then((respuesta: AxiosResponse<Producto>) => {
                    setEliminado(true)
                }).catch((error) => {
                    setEliminado(false)
                })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProducto()
    }, [])

    deleteProducto(producto)
    return (
        <div>
            {eliminado ? <h1>Producto eliminado correctamente</h1> : <h1>No se pudo eliminar el producto</h1>}
            <button onClick={() => {
                navigate("/productos")
            }}>Regresar</button>
        </div>
    )
}

export default EliminarProducto
