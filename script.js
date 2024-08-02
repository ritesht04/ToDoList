document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    if (taskInput.value.trim() !== '') {
        const task = {
            id: Date.now(),
            text: taskInput.value,
            completed: false
        };
        saveTask(task);
        taskInput.value = '';
        renderTasks();
    }
}

function saveTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function loadTasks() {
    renderTasks();
}

function renderTasks(filter = 'all') {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    const tasks = getTasks();
    tasks.filter(task => {
        if (filter === 'all') return true;
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
    }).forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.dataset.id = task.id;
        li.innerHTML = `
            <span class="text" onclick="toggleComplete(${task.id})">${task.text}</span>
            <div class="actions">
                <span class="edit" onclick="editTask(${task.id})">Edit</span>
                <span class="remove" onclick="removeTask(${task.id})">X</span>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function toggleComplete(id) {
    const tasks = getTasks();
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
}

function editTask(id) {
    const tasks = getTasks();
    const task = tasks.find(task => task.id === id);
    if (task) {
        const newText = prompt('Edit task:', task.text);
        if (newText !== null && newText.trim() !== '') {
            task.text = newText;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        }
    }
}

function removeTask(id) {
    const tasks = getTasks();
    const updatedTasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    renderTasks();
}

function filterTasks(filter) {
    renderTasks(filter);
}
