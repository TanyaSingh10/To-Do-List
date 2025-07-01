document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!! :)");
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTask(task);
    taskInput.value = "";
}

function renderTask(task) {
    const taskList = document.getElementById("taskList");
    const li = document.createElement("li");
    li.dataset.id = task.id;

    li.innerHTML = `
        <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
        <div class="task-actions">
            <button onclick="toggleTask(${task.id})">${task.completed ? 'Undo' : 'Completed'}</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        </div>
    `;

    taskList.appendChild(li);
}

function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function loadTasks() {
    const tasks = getTasks();
    tasks.forEach(renderTask);
}

function toggleTask(id) {
    let tasks = getTasks();
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    refreshTaskList();
}

function deleteTask(id) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    refreshTaskList();
}

function refreshTaskList() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    loadTasks();
}
