const Baseurl = "http://localhost:3000/to-do";
const tasksList = document.getElementById("tasks-list");
const form = document.querySelector("form");

async function loadTasks() {
  try {
    const res = await fetch(`${Baseurl}`, {
      method: "GET",
    });

    const data = await res.json();

    tasksList.innerHTML = "";

    data.todo.forEach((item) => {
      tasksList.insertAdjacentHTML(
        "beforeend",
        `
          <div class="border p-2 rounded border-slate-400 task-item" data-id="${
            item.id
          }">
            <p class="font-bold text-lg task-title">${item.title}</p>
            <p class="text-sm text-slate-400 mb-2 task-content">${
              item.content
            }</p>
            <div class="flex gap-4">
              <p class="text-sm text-slate-400 mb-2">${new Date(
                item.createdAt
              ).toLocaleDateString()}</p>
              <p class="text-sm text-slate-400 mb-2">${new Date(
                item.createdAt
              ).toLocaleTimeString()}</p>
            </div>
            <button class="bg-slate-600 text-white px-2 py-1 rounded text-sm cursor-pointer complete-btn" ${
              item.completed ? "disabled" : ""
            }>
              ${item.completed ? "Completed" : "Complete"}
            </button>
            <button class="delete-btn ml-130 bg-slate-600 text-white px-2 py-1 rounded text-sm cursor-pointer">Delete</button>
          </div>
        `
      );
    });

    data.todo.forEach((item, index) => {
      if (item.completed === true) {
        const taskItems = document.querySelectorAll(".task-item");
        const currentTask = taskItems[index];
        const btn = currentTask.querySelector(".complete-btn");

        if (currentTask) {
          currentTask.style.opacity = "0.5";
          currentTask.style.textDecoration = "line-through";

          if (btn) {
            btn.classList.remove("bg-slate-600");
            btn.classList.add("bg-green-600");
          }
        }
      }
    });
  } catch (error) {
    console.error("Error loading tasks:", error);
  }
}

tasksList.addEventListener("click", async (e) => {
  if (e.target.classList.contains("complete-btn")) {
    if (e.target.disabled) return;

    const taskItem = e.target.closest(".task-item");
    const id = taskItem.getAttribute("data-id");

    e.target.disabled = true;

    try {
      const response = await fetch(`${Baseurl}/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });

      if (response.ok) {
        taskItem.style.opacity = "0.5";
        taskItem.style.textDecoration = "line-through";
        e.target.textContent = "Completed";
        e.target.classList.remove("bg-slate-600");
        e.target.classList.add("bg-green-600");
        e.target.disabled = true;

        console.log("Task completed successfully");
      } else {
        e.target.disabled = false;
        e.target.textContent = "Complete";
        console.error("Failed to complete task");
      }
    } catch (error) {
      e.target.disabled = false;
      e.target.textContent = "Complete";
      console.error("Error completing task:", error);
    }
  }

  if(e.target.classList.contains("delete-btn")){
    const taskItem = e.target.closest(".task-item");
    const id = taskItem.getAttribute("data-id");

    e.target.disabled = true;
    await fetch(`${Baseurl}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    loadTasks()
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(`${Baseurl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: e.target.title.value,
        content: e.target.desc.value,
      }),
    });

    form.reset();
    loadTasks();
  } catch (error) {
    console.error("Error adding task:", error);
  }
});

loadTasks();
