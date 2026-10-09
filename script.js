let data = [];

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
  let user_data = {
    id: createId(),
    title: title,
    desc: name,
    createdAt: Date.now(),
  };

  data.push(user_data);

  titleInput.value = "";
  nameInput.value = "";
  titleInput.focus();
  renderTasks();
}
function deleteTask(id) {
  data = data.filter((task) => {
    return task.id !== id;
  });

  renderTasks();
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
      <p class="task-title">${task.title}</p>
      <div class="task-btns">
        <button class="deleteBtn" onclick = "deleteTask('${task.id}')">Delete</button>
      </div>
    `;
    todoList.appendChild(taskElement);
  });
}

document.getElementById("addBtn").addEventListener("click", () => {
  let inputBox = document.querySelector(".input-box");
  inputBox.classList.remove("hidden");
});

document.getElementById("closeBtn").addEventListener("click", () => {
  let inputBox = document.querySelector(".input-box");
  inputBox.classList.add("hidden");

  document.getElementById("input-title").value = "";
  document.getElementById("input-task").value = "";
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
