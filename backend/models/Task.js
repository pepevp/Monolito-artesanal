const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, 'El título es obligatorio']
    },
    descripcion: {
        type: String,
        required: false
    },
    tecnologia: {
        type: String,
        required: [true, 'La tecnología es obligatoria']
    },
    estado: {
        type: String,
        enum: ['pending', 'done'],
        default: 'pending'
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Task', TaskSchema);
