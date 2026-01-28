require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('./models/Task');
const History = require('./models/History');

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

// DELETE /api/tasks/:id - Eliminar una tarea por ID y guardarla en el histórico
app.delete('/api/tasks/:id', async (req, res) => {
    console.log(`🗑️ Recibida petición para eliminar tarea: ${req.params.id}`);
    try {
        const taskToDelete = await Task.findById(req.params.id);
        
        if (!taskToDelete) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        // Crear entrada en el histórico
        const historyEntry = new History({
            titulo: taskToDelete.titulo,
            descripcion: taskToDelete.descripcion,
            tecnologia: taskToDelete.tecnologia,
            estado: taskToDelete.estado,
            fecha_creacion: taskToDelete.fecha
        });

        console.log(`📝 Guardando en histórico: ${taskToDelete.titulo}`);
        await historyEntry.save();
        console.log(`✅ Guardado en histórico. Eliminando de tasks...`);
        await Task.findByIdAndDelete(req.params.id);
        console.log(`✅ Tarea eliminada permanentemente.`);

        res.json({ message: 'Tarea eliminada y enviada al histórico', task: taskToDelete });
    } catch (err) {
        console.error('Error al eliminar:', err);
        res.status(500).json({ error: 'Error al eliminar la tarea' });
    }
});

// GET /api/history - Obtener el histórico de tareas eliminadas
app.get('/api/history', async (req, res) => {
    console.log('📜 Petición de historial recibida');
    try {
        const history = await History.find().sort({ fecha_eliminacion: -1 });
        res.json(history);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el histórico' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
