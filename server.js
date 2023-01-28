/* Declarar nuestras constantes */
import express from "express";
import handlebars from "express-handlebars";
import  { Server, Socket } from "socket.io";
import {options} from "./options/mysql.js"
import knexLib from 'knex';
import { createConnection } from "mysql";


const app = express()




app.use(express.urlencoded({ extended: true }));

let mensajes = []
let productos = []

// llamada a socket ///
app.use(express.static('./views'));






// Establecemos la configuración de handlebars

app.engine(
    "hbs",
    handlebars.engine  ({
        extname: "*.hbs",
        defaultLayout: "index.hbs",
    })
    );
    
    app.set('view engine', "hbs");
    app.set("views", "./views");
    
    app.get('/formulario', (req, res) => {
        res.render('datos', productos)
        
    })
    
    app.get('/datos', (req, res) => {
        console.log(productos.length)
        res.render('datos', {productos});
    });
    
    
    app.post('/datos', (req, res) => {
        const {nombre, precio, url, stock} = req.body
        const producto = {
            'nombre':nombre,
            'precio':precio,
            'url':url,
            'stock':stock
        }
        let enviar = window.document.getElementById("enviar")
        enviar.addEventListener("click", ()=>{
            insertarArticulos(productos); {
                return this.knex('productos').insert(productos)
            }
        })
    //     connection('productos').insertarArticulos({
    //     'nombre':nombre,
    //     'precio':precio,
    //     'url':url,
    //     'stock': 10
    // })
        productos.push(producto)
        // console.log(productos)
        res.redirect('/datos')
    });
    
    
    /* Configuración del servidor */
    
    const PORT = 8080
    const srv = app.listen(PORT, function()  {
        console.log('Tu servidor esta funcionando en el puerto: ', PORT);
    })
    srv.on('error', error => console.log('Error en el servidor', error));
    
    
    const io = new Server(srv)
    io.on('connection', socket => {
        console.log('Nuevo cliente conectado');
        
    socket.emit('mensajes', mensajes)

    socket.on('mensaje', data => {
        mensajes.push({socketid: socket.id, mensaje: data})
        io.sockets.emit('mensajes', mensajes)
    });
});

