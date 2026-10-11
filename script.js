let data = [];
let editingId = null;

function createId() {
  return String(Date.now() + Math.floor(Math.random() * 1000));
}

function addTask() {
  let titleInput = document.getElementById("input-title");
  let nameInput = document.getElementById("input-task");
  let title = titleInput.value.trim();
  let name = nameInput.value.trim();
  if (!title || !name) {
    alert("Please enter both values");
    return;
  }

  if (editingId !== null) {
    data = data.map((task) => {
      if (task.id === editingId) {
        return { ...task, title: title, desc: name };
      } else {
        return task;
      }
    });

    editingId = null;
    document.querySelector(".input-box").classList.add("hidden");
  } else {
    let user_data = {
      id: createId(),
      title: title,
      desc: name,
      createdAt: Date.now(),
    };

    data.push(user_data);
  }

  titleInput.value = "";
  nameInput.value = "";
  titleInput.focus();
  document.getElementById("addTaskBtn").textContent = "Add Task";
  renderTasks();
}
function deleteTask(id) {
  data = data.filter((task) => {
    return task.id !== id;
  });

  renderTasks();
}

function editTask(id) {
  editingId = id;
  let titleInput = document.getElementById("input-title");
  let inputBox = document.querySelector(".input-box");
  let nameInput = document.getElementById("input-task");
  inputBox.classList.remove("hidden");
  let editData = data.find((t) => {
    return t.id === id;
  });
  titleInput.value = editData.title;
  nameInput.value = editData.desc;
  document.getElementById("addTaskBtn").textContent = "Update Task";
  titleInput.focus();
}

function renderTasks() {
  const todoList = document.getElementById("todoList");
  todoList.innerHTML = "";
  const progressList = document.getElementById("progressList");
  const doneList = document.getElementById("doneList");

  data.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    taskElement.setAttribute("id", `task${task.id}`);
    taskElement.innerHTML = `
      <div class="task-content">
          <p class="task-desc">${task.desc}</p>
          <p class="task-title">${task.title}</p>
       </div>
      <div class="task-btns">
       <button class="editBtn" onclick = "editTask('${task.id}')">Edit</button>
        <button class="deleteBtn" onclick = "deleteTask('${task.id}')">Delete</button>
      </div>
    `;
    todoList.appendChild(taskElement);
  });
}

document.getElementById("addBtn").addEventListener("click", () => {
  editingId = null;
  let inputBox = document.querySelector(".input-box");
  inputBox.classList.remove("hidden");
  document.getElementById("addTaskBtn").textContent = "Add Task";
  document.getElementById("input-title").value = "";
  document.getElementById("input-task").value = "";
  document.getElementById("input-title").focus();
});

document.getElementById("closeBtn").addEventListener("click", () => {
  let inputBox = document.querySelector(".input-box");
  inputBox.classList.add("hidden");

  document.getElementById("input-title").value = "";
  document.getElementById("input-task").value = "";
  editingId = null;
});
document.getElementById("addTaskBtn").addEventListener("click", addTask);

["input-title", "input-task"].forEach((id) => {
  document.getElementById(id).addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  });
});
renderTasks();
