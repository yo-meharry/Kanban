let data = [
  {
    id: 1,
    title: "Task 1 is here..",
    status: "todo",
    priority: "high",
  },
  {
    id: 2,
    title: "Task 2 is here..",
    status: "todo",
    priority: "medium",
  },
];

function addTask(title, status, priority) {
  const newTask = {
    id: data.length + 1,
    title: title,
    status: status,
    priority: priority,
  };
  data.push(newTask);
}

function renderTasks() {
  const todoList = document.getElementById("todoList");
  const progressList = document.getElementById("progressList");
  const doneList = document.getElementById("doneList");

  data.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    taskElement.setAttribute("id", `task${task.id}`);
    taskElement.innerHTML = `
      <p class="task-title">${task.title}</p>
      <div class="task-btns">
        <button class="deleteBtn" id="deleteBtn${task.id}">Delete</button>
      </div>
    `;
    todoList.appendChild(taskElement);
  });
}

renderTasks();

const addTaskBtn = document.getElementById("addTaskBtn");
