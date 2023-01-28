// Importamos nuestros modulos
import  Contenedor from "./tablaMySql.js"
import  {options}  from './options/mysql.js';


export const nuevaTabla = new Contenedor(options)

nuevaTabla.crearTabla()
    .then(() => {
        console.log("Tabla creada")

       
        const productos = [
            { nombre: 'cafe1', precio: 450, url: '/imagenes/cafe1',  stock: 12},
            { nombre: 'cafe2', precio: 450, url: '/imagenes/cafe2',  stock: 16},
            { nombre: 'cafe3', precio: 450, url: '/imagenes/cafe3',  stock: 8},
        
        ]
        return  nuevaTabla.insertarArticulos(productos)
    })
    .then(() => {
        
        console.log("productos cargados con exito");
        return  nuevaTabla.listarArticulos();
    })
    
    .catch((err) => { console.log(err); throw err})
    .finally(() => {
        nuevaTabla.close()
    })