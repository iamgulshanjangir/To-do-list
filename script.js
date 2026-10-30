
let taskInput = document.getElementById("taskInput");
let taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function showTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task.text;

    if (task.completed) {
      span.classList.add("completed");
    }

    span.onclick = function () {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
    };

    let button = document.createElement("button");
    button.textContent = "Delete";
    button.className = "delete-btn";

    button.onclick = function () {
      tasks.splice(index, 1);
      saveTasks();
    };

    li.appendChild(span);
    li.appendChild(button);
    taskList.appendChild(li);
  });
}

function addTask() {
  let task = taskInput.value.trim();

  if (task === "") {
    alert("Please enter a task");
    return;
  }

  tasks.push({ text: task, completed: false });
  taskInput.value = "";
  saveTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  showTasks();
}

taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

showTasks();
