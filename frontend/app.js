const API_URL = 'http://localhost:3000/api/tasks';

// DOM Elements
const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');

// Fetch and display tasks
async function fetchTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();
        renderTasks(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        taskList.innerHTML = '<div class="loader">Error al conectar con el servidor. Asegúrate de que el backend está corriendo.</div>';
    }
}

// Render tasks to the DOM
function renderTasks(tasks) {
    taskList.innerHTML = '';
    taskCount.textContent = tasks.length;

    if (tasks.length === 0) {
        taskList.innerHTML = '<div class="loader">No hay tareas pendientes. ¡Buen trabajo!</div>';
        return;
    }

    tasks.forEach(task => {
        const taskCard = document.createElement('div');
        taskCard.className = `task-card ${task.estado === 'done' ? 'done' : ''}`;
        
        taskCard.innerHTML = `
            <div class="task-info">
                <h3>${task.titulo}</h3>
                <p>${task.descripcion || 'Sin descripción'}</p>
            </div>
            <div class="task-footer">
                <div class="task-meta">
                    <span class="tech-tag">${task.tecnologia}</span>
                    <span style="font-size: 0.75rem; color: var(--text-low);">${new Date(task.fecha).toLocaleDateString()}</span>
                </div>
                <button class="delete-btn" onclick="deleteTask('${task._id}')">Eliminar</button>
            </div>
        `;
        
        taskList.appendChild(taskCard);
    });
}

// Create a new task
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;
    const tecnologia = document.getElementById('tecnologia').value;
    const estado = document.getElementById('estado').value;

    const newTask = { titulo, descripcion, tecnologia, estado };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        });

        if (response.ok) {
            taskForm.reset();
            fetchTasks(); // Refresh list
        } else {
            const error = await response.json();
            alert('Error: ' + error.error);
        }
    } catch (error) {
        console.error('Error creating task:', error);
        alert('No se pudo conectar con el servidor.');
    }
});

// Delete a task
async function deleteTask(id) {
    if (!confirm('¿Estás seguro de eliminar esta tarea y enviarla al histórico?')) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            fetchTasks(); // Refresh list
        } else {
            alert('Error al eliminar la tarea');
        }
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}

// Initial load
document.addEventListener('DOMContentLoaded', fetchTasks);
