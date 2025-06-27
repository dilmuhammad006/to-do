const Baseurl = "http://localhost:3000/to-do";
const tasksList = document.getElementById("tasks-list");
const form = document.querySelector("form");

async function DOMContentLoaded() {
  const res = await fetch(`${Baseurl}`, {
    method: "GET",
  });

  const data = await res.json();

  data.todo.forEach((item) => {
    tasksList.insertAdjacentHTML(
      "beforeend",
      `
        <div class="border p-2 rounded border-slate-400 task-item" data-id="${
          item.id
        }">
          <p class="font-bold text-lg">${item.title}</p>
          <p class="text-sm text-slate-400 mb-2">${item.content}</p>
          <div class="flex gap-4">
            <p class="text-sm text-slate-400 mb-2">${new Date(
              item.createdAt
            ).toLocaleDateString()}</p>
            <p class="text-sm text-slate-400 mb-2">${new Date(
              item.createdAt
            ).toLocaleTimeString()}</p>
          </div>
          <button class="bg-slate-600 text-white px-2 py-1 rounded text-sm cursor-pointer complete-btn">Complete</button>
        </div>
      `
    );
  });

  tasksList.addEventListener("click", async (e) => {
    if (e.target.classList.contains("complete-btn")) {
      if (e.target.disabled) return;
      
      const taskItem = e.target.closest(".task-item");
      const id = taskItem.getAttribute("data-id");
      
      e.target.disabled = true;
      e.target.textContent = "Processing...";
      
      
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
          
        } else {
          e.target.disabled = false;
          e.target.textContent = "Complete";
        }
      } catch (error) {
        e.target.disabled = false;
        e.target.textContent = "Complete";
      }
    }
  });
}

DOMContentLoaded();

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  await fetch(`${Baseurl}`, {
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

  tasksList.innerHTML = "";
  DOMContentLoaded();
});
