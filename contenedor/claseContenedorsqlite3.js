import knexLib from 'knex';


class Contenedor {

    //conexion con knex
    constructor (config){
       this.knex = knexLib(config)
       let item = [
        productos = [],
        mensajes = []
    ];

       
    }
 // TABLA DE MENSAJES
    
 crearTabla() {
    return this.knex.schema.dropTableIfExists(item[1])
        .finally(() => {
            return this.knex.schema.createTable('mensajes', table => {
                table.increments('msj_id').primary();
                table.string('msj_entrante', 50).notNullable();
                table.string('msj saliente',50).notNullable();
            })
        })}

       
        
   
        insertarArticulos(item) {
            return this.knex(item).insert(item)
        }
    
        listarArticulos() {
            return this.knex(item).select('*');
        }
    
        // borrarArticulosPorId(id) {
        //     return this.knex.from('articulos').where('id', id).del()
        // }
    
        // actualizarArticulosPorId(stock, id) {
        //     return this.knex.from('articulos').where('id', id).update({ stock: stock})
        // }
    
        close() {
            this.knex.destroy();
        }
        
    }
    
    export default Contenedor;





   