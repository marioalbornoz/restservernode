const { Schema, model } = require("mongoose");



const CategoriaSchema = Schema({
    nombre:{
        type:String,
        required: [true, 'El nombre de categoria es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
})

// no mostrar ciertos campos del modelo al usuario
CategoriaSchema.methods.toJSON  = function(){
    const { __v, estado, ...data } = this.toObject();
    return data;
}


module.exports = model('Categoria', CategoriaSchema);