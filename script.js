let data = [];
let editingId = null;
let dragElement = null;

const todo = document.getElementById("todo");
const progress = document.getElementById("progress");
const done = document.getElementById("done");

function saveData() {
  localStorage.setItem("kanban-data", JSON.stringify(data));
}

function loadData() {
  const saved = localStorage.getItem("kanban-data");
  if (saved) {
    data = JSON.parse(saved);
  }
}

function addDragEventOnColumn(column, status) {
  column.addEventListener("dragenter", (e) => {
    e.preventDefault();
    column.classList.add("hover-over");
  });

  column.addEventListener("dragleave", () => {
    column.classList.remove("hover-over");
  });

  column.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  column.addEventListener("drop", (e) => {
    e.preventDefault();
    column.classList.remove("hover-over");

    if (!dragElement) return;

    const id = dragElement.dataset.id;

    data = data.map((t) => (t.id === id ? { ...t, status } : t));

    dragElement = null;
    renderTasks();
    saveData();
  });
}

addDragEventOnColumn(todo, "todo");
addDragEventOnColumn(progress, "progress");
addDragEventOnColumn(done, "done");

function createId() {
  return String(Date.now() + Math.floor(Math.random() * 1000));
}

function editTask(id) {
  editingId = id;

  const taskToEdit = data.find((t) => t.id === id);
  if (!taskToEdit) return;

  document.getElementById("task-name").value = taskToEdit.title;
  document.getElementById("task-desc").value = taskToEdit.desc;

  document.querySelector(".add-task-btn").textContent = "Update Task";

  document.querySelector(".modal").classList.add("active");
  document.getElementById("task-name").focus();
}

function renderTasks() {
  const allColumns = [todo, progress, done];

  allColumns.forEach((col) => {
    col.querySelectorAll(".task").forEach((task) => task.remove());
  });

  data.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    taskElement.dataset.id = task.id;
    taskElement.setAttribute("draggable", "true");

    taskElement.innerHTML = `
      <h2>${task.title}</h2>
      <p>${task.desc}</p>
      <div class="task-actions">
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
      </div> 
    `;

    taskElement.querySelector(".delete-btn").addEventListener("click", () => {
      deleteTask(task.id);
    });

    taskElement.querySelector(".edit-btn").addEventListener("click", () => {
      editTask(task.id);
    });

    taskElement.addEventListener("dragstart", () => {
      dragElement = taskElement;
    });

    let targetCol;
    if (task.status === "progress") targetCol = progress;
    else if (task.status === "done") targetCol = done;
    else targetCol = todo;

    targetCol.appendChild(taskElement);
  });

  allColumns.forEach((col) => {
    const count = col.querySelector(".heading .right");
    const totalTasks = col.querySelectorAll(".task").length;
    count.innerText = totalTasks;
  });
}

function addTask() {
  let taskName = document.getElementById("task-name");
  let taskDesc = document.getElementById("task-desc");
  let Name = taskName.value.trim();
  let Desc = taskDesc.value.trim();
  if (!Name || !Desc) {
    alert("Please enter both values");
    return;
  }

  if (editingId !== null) {
    data = data.map((task) => {
      if (task.id === editingId) {
        return { ...task, title: Name, desc: Desc };
      } else {
        return task;
      }
    });

    editingId = null;
    document.querySelector(".modal").classList.remove("active");
  } else {
    let user_data = {
      id: createId(),
      title: Name,
      desc: Desc,
      status: "todo",
      createdAt: Date.now(),
    };

    data.push(user_data);
  }

  document.querySelector(".add-task-btn").textContent = "Add Task";
  taskName.value = "";
  taskDesc.value = "";
  document.querySelector(".modal").classList.remove("active");
  renderTasks();
  saveData();
}
function deleteTask(id) {
  data = data.filter((task) => {
    return task.id !== id;
  });

  renderTasks();
  saveData();
}

const toggleModalBtn = document.querySelector("#toggle-modal");
const modal = document.querySelector(".modal");
const bg = document.querySelector(".bg");

toggleModalBtn.addEventListener("click", () => {
  editingId = null;
  document.getElementById("task-name").value = "";
  document.getElementById("task-desc").value = "";
  document.querySelector(".add-task-btn").textContent = "Add Task";
  modal.classList.add("active");
  document.getElementById("task-name").focus();
});

bg.addEventListener("click", () => {
  modal.classList.remove("active");
  editingId = null;
  document.querySelector(".add-task-btn").textContent = "Add Task";
});

document.getElementById("add-new-task").addEventListener("click", addTask);

["task-name", "task-desc"].forEach((id) => {
  document.getElementById(id).addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTask();
    }
  });
});

document.getElementById("task-desc").addEventListener("keydown", (e) => {
  if (e.key === "Enter" && e.ctrlKey) {
    e.preventDefault();
    addTask();
  }
});

loadData();
renderTasks();
