import Menu from './GUI/Menu'
import Inicio from './GUI/Inicio'
import ProductosPages from './ProductosGUI/ProductosPage'
import AgregarProducto from './ProductosGUI/AgregarProducto'
import ActualizarProducto from './ProductosGUI/ActualizarProducto'
import EliminarProducto from './ProductosGUI/EliminarProducto'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <Menu></Menu>

        <div className="container">
          <Routes>
            <Route path="/" element={<Inicio></Inicio>}></Route>
            <Route path="/Productos" element={<ProductosPages></ProductosPages>}></Route>
            <Route path="/AgregarProducto" element={<AgregarProducto />}></Route>
            <Route path="/ActualizarProducto/:id" element={<ActualizarProducto />}></Route>
            <Route path="/EliminarProducto/:id" element={<EliminarProducto />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App;
