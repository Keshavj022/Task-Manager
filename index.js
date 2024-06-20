let tasks = [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };
    tasks.push(task);
    taskInput.value = '';
    playSound('addSound');
    displayTasks(tasks);
}

function toggleTaskCompletion(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            const updatedTask = { ...task, completed: !task.completed };
            if (updatedTask.completed) {
                playSound('completeSound');
            }
            return updatedTask;
        }
        return task;
    });
    displayTasks(tasks);
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    playSound('deleteSound');
    displayTasks(tasks);
}

function filterTasks(filter) {
    let filteredTasks = [];
    if (filter === 'all') {
        filteredTasks = tasks;
    } else if (filter === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (filter === 'completed') {
        filteredTasks =  tasks.filter(task => task.completed);
    }
    displayTasks(filteredTasks);
}

function displayTasks(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.classList.toggle('completed', task.completed);
        li.innerHTML = `
            <span onclick="toggleTaskCompletion(${task.id})">${task.text}</span>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

function playSound(soundId) {
    const sound = document.getElementById(soundId);
    sound.play();
}
