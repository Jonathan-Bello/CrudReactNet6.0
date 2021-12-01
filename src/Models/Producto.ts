import { Categoria } from './Categoria';

export interface Producto {
    id: number;
    nombre: string;
    precio: number;
    stock: number;
    id_Categoria: number;
    categoria?: Categoria;
}