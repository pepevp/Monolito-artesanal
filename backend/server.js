require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('./models/Task');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Conectado a MongoDB Atlas'))
    .catch(err => {
        console.error('❌ Error de conexión a MongoDB:', err.message);
        process.exit(1);
    });

// API Routes

// GET /api/tasks - Obtener todas las tareas
app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await Task.find().sort({ fecha: -1 });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener las tareas' });
    }
});

// POST /api/tasks - Crear una nueva tarea
app.post('/api/tasks', async (req, res) => {
    try {
        const { titulo, descripcion, tecnologia, estado } = req.body;
        const newTask = new Task({
            titulo,
            descripcion,
            tecnologia,
            estado
        });
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE /api/tasks/:id - Eliminar una tarea por ID
app.delete('/api/tasks/:id', async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.json({ message: 'Tarea eliminada y enviada al histórico', task: deletedTask });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar la tarea' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
