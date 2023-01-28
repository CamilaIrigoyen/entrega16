import knexLib from 'knex';


class Contenedor {

    //conexion con knex
    constructor (config){
        this.knex = knexLib(config)



    }

    //ver la tabla esta mal

    // TABLA PRODUCTOS
    crearTabla() {
        return this.knex.schema.dropTableIfExists('productos')
            .finally(() => {
                return this.knex.schema.createTable('productos', table => {
                    table.increments('nombre').primary();
                    table.float('precio').notNullable();
                    table.string('url',50).notNullable();
                    table.integer('stock').notNullable();
                })
            })
    }
 // TABLA DE MENSAJES
    
//  crearTabla() {
//     return this.knex.schema.dropTableIfExists(item[1])
//         .finally(() => {
//             return this.knex.schema.createTable('mensajes', table => {
//                 table.increments('msj_id').primary();
//                 table.string('msj_entrante', 50).notNullable();
//                 table.string('msj saliente',50).notNullable();
//             })
//         })}


        

        insertarArticulos(productos) {
            return this.knex('productos').insert(productos)
        }
    
        listarArticulos() {
            return this.knex('productos').select('*');
        }
    
        borrarArticulosPorId(id) {
            return this.knex.from('articulos').where('id', id).del()
        }
    
        actualizarArticulosPorId(stock, id) {
            return this.knex.from('articulos').where('id', id).update({ stock: stock})
        }
    
        close() {
            this.knex.destroy();
        }
        
    }
    
    export default Contenedor;





   