let data = [

];

function createId() {
  return Date.now() + Math.floor(Math.random() * 1000)
}


function addTask() {
  let titleInput = document.getElementById("input-title")
  let nameInput = document.getElementById("input-task")
  let title = titleInput.value.trim();
  let name = nameInput.value.trim();
  
  let user_data = {
    id : createId(),
    title : title,
    desc: name,
    createdAt: Date.now(),
  }

  data.push(user_data);


  titleInput.value = "";
  nameInput.value = "";
  titleInput.focus();
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


document.getElementById("addBtn").addEventListener("click" , ()=> {
   let inputBox = document.querySelector(".input-box");
   inputBox.classList.remove("hidden")
   
})

document.getElementById("addTaskBtn").addEventListener("click" , addTask);



document.getElementById("closeBtn").addEventListener("click" , ()=> {
   let inputBox = document.querySelector(".input-box");
   inputBox.classList.add("hidden")
   
})

