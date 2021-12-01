import axios, { AxiosResponse } from 'axios';
import { ErrorMessage, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router'
import { NavLink, useNavigate } from 'react-router-dom';
import { Categoria } from '../Models/Categoria';
import { Producto } from "../Models/Producto"
import * as Yup from "yup"


const ActualizarProducto = () => {
    const { id } = useParams()
    const navigate = useNavigate()


    const initialProducto: Producto = {
        id: 0,
        nombre: "",
        precio: 0,
        stock: 0,
        id_Categoria: 0
    }

    const [producto, setProducto] = useState<Producto>(initialProducto)
    const [categorias, setCategorias] = useState<Categoria[]>([])

    const getProducto = async () => {
        await axios.get(`https://localhost:7227/api/Productos/${id}`)
            .then((respuesta: AxiosResponse<Producto>) => {
                setProducto(respuesta.data)
            }).catch((error) => {
                console.log(error);
            })
    }

    const getCategorias = async () => {

        await axios.get('https://localhost:7227/api/categorias')
            .then((res: AxiosResponse<Categoria[]>) => {
                setCategorias(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const putProducto = async (producto: Producto) => {
        try {
            await axios.put(`https://localhost:7227/api/Productos`, producto)
                .then((respuesta: AxiosResponse<Producto>) => {
                    setProducto(respuesta.data)
                }).catch((error) => {
                    console.log(error);
                })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProducto()
        getCategorias()
    }, [])

    const validationSchema = Yup.object().shape({
        nombre: Yup.string().required('El nombre es requerido').max(150, 'El nombre no puede tener mas de 50 caracteres'),
        precio: Yup.number().required('El precio es requerido')
            .min(0, 'El precio no puede ser negativo')
            .typeError('El precio debe ser un numero'),
        stock: Yup.number().required('El stock es requerido')
            .min(0, 'El stock no puede ser negativo')
            .typeError('El stock debe ser un numero'),
        id_Categoria: Yup.number().required('La categoria es requerida')
            .oneOf([...categorias.map(c => c.id)], 'Eliga una categoria profavor')
    })

    return (
        <>
            <h2>Actualizar Producto</h2>
            <Formik
                initialValues={producto}
                enableReinitialize={true}
                onSubmit={async values => {
                    await putProducto(values)
                    navigate('/Productos')
                }}
                validationSchema={validationSchema}
            >
                {(formikProps) => (
                    <Form onSubmit={formikProps.handleSubmit}>
                        <div className="row mb-3">
                            <label htmlFor="txtNombre">Nombre</label>
                            <input type="text" id="txtNombre" className="form-control"
                                {...formikProps.getFieldProps('nombre')}
                            />
                            <ErrorMessage name="nombre" component="span" className="text-danger">
                                {msg => <span className="text-danger">{msg}</span>}
                            </ErrorMessage>
                        </div>

                        <div className="row mb-3">
                            <label htmlFor="txtPrecio">Precio</label>
                            <input type="number" id="txtPrecio" className="form-control" step="0.01"
                                {...formikProps.getFieldProps('precio')}
                            />
                            <ErrorMessage name="precio" component="span" className="text-danger">
                                {msg => <span className="text-danger">{msg}</span>}
                            </ErrorMessage>
                        </div>

                        <div className="row mb-3">
                            <label htmlFor="txtStock">Stock</label>
                            <input type="number" id="txtStock" className="form-control"
                                {...formikProps.getFieldProps('stock')}
                            />
                            <ErrorMessage name="stock" component="span" className="text-danger">
                                {msg => <span className="text-danger">{msg}</span>}
                            </ErrorMessage>
                        </div>

                        <div className="row mb-3">
                            <label htmlFor="cmbCategorias">Categorias</label>
                            <select id="cmbCategorias" className="form-select"
                                {...formikProps.getFieldProps('id_Categoria')}
                            >
                                <option value="0">Seleccione una categoria</option>
                                {categorias.map(c => <option value={c.id} key={c.id}>{c.nombre}</option>)}
                            </select>
                            <ErrorMessage name="id_Categoria" component="span" className="text-danger">
                                {msg => <span className="text-danger">{msg}</span>}
                            </ErrorMessage>
                        </div>

                        <div className="row mb-3">
                            <div className="col-12 text-center">
                                <button type="submit" className="btn btn-warning"
                                    onClick={() => formikProps.submitForm}
                                >Actualizar</button>
                                <NavLink className="btn btn-dark ms-3" to="/Productos">Regresar</NavLink>
                            </div>
                        </div>
                    </Form>
                )
                }
            </Formik>
        </>
    )
}

export default ActualizarProducto
