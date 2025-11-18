let tasks = [];

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskDate = document.getElementById("taskDate");

  if (taskInput.value.trim() === "") return;

  tasks.push({
    text: taskInput.value,
    date: taskDate.value,
    completed: false,
  });

  taskInput.value = "";
  taskDate.value = "";
  renderTasks();
}

function renderTasks(filter = "all") {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  let filteredTasks = tasks;
  if (filter === "completed") {
    filteredTasks = tasks.filter((t) => t.completed);
  } else if (filter === "pending") {
    filteredTasks = tasks.filter((t) => !t.completed);
  }

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <span>
        ${task.text} <br />
        <small>${task.date ? new Date(task.date).toLocaleString() : ""}</small>
      </span>
      <div>
        <button onclick="toggleComplete(${index})">✔</button>
        <button onclick="deleteTask(${index})">🗑</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function deleteAll() {
  tasks = [];
  renderTasks();
}

function filterTasks(type) {
  renderTasks(type);
}