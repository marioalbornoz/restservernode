
const { Schema, model } = require('mongoose');

// roles validos y mensaje en caso contrario
// let rolesValidos = {
//     values: ['ADMIN_ROLE', 'USER_ROLE'],
//     message: '{VALUE} no es un rol valido'
// }

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        require: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'El correo es obligatorio'],
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        default: 'USER_ROLE',
        // enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

// no mostrar ciertos campos del modelo al usuario
UsuarioSchema.methods.toJSON  = function(){
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model( 'Usuario', UsuarioSchema );