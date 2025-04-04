const addBtn = document.querySelector("#add-btn");

const newTaskInput = document.querySelector("#wrapper input");

const taskContainer = document.querySelector("#tasks");

const error = document.getElementById("error");

const countValue = document.querySelector(".count-value");

let taskCount = 0;

const displayCount = (taskCount) => {
  countValue.innerText = taskCount;
};

const addTask = () => {
  const taskName = newTaskInput.value.trim();
  error.style.display = "none";

  if (!taskName) {
    setTimeout(() => {
      error.style.display = "block";
    }, 200);
    return;
  }

  const task = `<div class="task">
  <input type="checkbox" class="task-check">
  <span class="taskname"> ${taskName}</span>
  <button class="edit">
  <i class="fa-solid fa-pen-to-square"></i>
  </button>
  <button class="delete">
  <i class="fa-solid fa-trash"></i>
  </button>
  </div>`;

  taskContainer.insertAdjacentHTML("afterbegin", task);
  taskCount++;
  displayCount(taskCount);
  newTaskInput.value = "";

  const deleteButtons = document.querySelectorAll(".delete");

  deleteButtons.forEach((curElem) => {
    curElem.onclick = () => {
      curElem.parentNode.remove();
      taskCount -= 1;
      displayCount(taskCount);
    };
  });

  const editButtons = document.querySelectorAll(".edit");
  editButtons.forEach((editBtn) => {
    editBtn.onclick = (e) => {
      let targetElement = e.target;
      if (!(e.target.className == "edit")) {
        targetElement = e.target.parentElement;
      }
      newTaskInput.value = targetElement.previousElementSibling?.innerText;
      targetElement.parentNode.remove();
      taskCount -= 1;
      displayCount(taskCount);
    };
  });
  const tasksCheck = document.querySelectorAll(".task-check");
  tasksCheck.forEach((checkBox) => {
    checkBox.onchange = () => {
      checkBox.nextElementSibling.classList.toggle("completed");
      if (checkBox.checked) {
        taskCount - 1;
      } else {
        taskCount + 1;
      }
      displayCount(taskCount);
    };
  });
};

addBtn.addEventListener("click", addTask);
