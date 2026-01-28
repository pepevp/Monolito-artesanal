const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: false
    },
    tecnologia: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    fecha_creacion: {
        type: Date,
        required: true
    },
    fecha_eliminacion: {
        type: Date,
        default: Date.now
    }
}, { collection: 'history' });

module.exports = mongoose.model('History', HistorySchema);
