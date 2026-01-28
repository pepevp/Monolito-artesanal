require('dotenv').config();
const mongoose = require('mongoose');
const Task = require('./models/Task');
const History = require('./models/History');

async function checkCollections() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Conectado a MongoDB para diagnóstico');

        const tasksCount = await Task.countDocuments();
        const historyCount = await History.countDocuments();
        
        // Check for 'histories' as well (default Mongoose pluralization)
        const db = mongoose.connection.db;
        const historiesCollection = db.collection('histories');
        const historiesCount = await historiesCollection.countDocuments();

        console.log(`\n--- Conteo de Documentos ---`);
        console.log(`Tareas (tasks): ${tasksCount}`);
        console.log(`Historial (history): ${historyCount}`);
        console.log(`Historial extra (histories): ${historiesCount}`);

        if (historyCount > 0) {
            const lastHistory = await History.findOne().sort({ fecha_eliminacion: -1 });
            console.log(`\nÚltima tarea en history:\n`, JSON.stringify(lastHistory, null, 2));
        }

        if (historiesCount > 0) {
            const lastHistories = await historiesCollection.findOne({}, { sort: { _id: -1 } });
            console.log(`\nÚltima tarea en histories:\n`, JSON.stringify(lastHistories, null, 2));
        }

        await mongoose.disconnect();
    } catch (err) {
        console.error('❌ Error en diagnóstico:', err);
    }
}

checkCollections();
