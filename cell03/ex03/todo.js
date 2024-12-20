function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#ft_list .task').forEach(task => {
        tasks.push(task.textContent);
    });
    document.cookie = `tasks=${encodeURIComponent(JSON.stringify(tasks))}; path=/;`;
}

function loadTasks() {
    const cookies = document.cookie.split('; ');
    const tasksCookie = cookies.find(cookie => cookie.startsWith('tasks='));
    if (tasksCookie) {
        const tasks = JSON.parse(decodeURIComponent(tasksCookie.split('=')[1]));
        tasks.forEach(task => addTask(task));
    }
}

function addTask(content) {
    const taskDiv = document.createElement('div');
    taskDiv.textContent = content;
    taskDiv.className = 'task';
    taskDiv.onclick = function () {
        if (confirm('Do you want to remove this task?')) {
            taskDiv.remove();
            saveTasks();
        }
    };
    const ftList = document.getElementById('ft_list');
    ftList.prepend(taskDiv);
}

function createNewTask() {
    const taskContent = prompt('Enter a new task:');
    if (taskContent && taskContent.trim()) {
        addTask(taskContent.trim());
        saveTasks();
    }
}

window.onload = loadTasks;
