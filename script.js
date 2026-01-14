let tasks = [];
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
let currentFilter = "all";

// localStorage functions
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
}

function renderTasks() {
        if (tasks.length === 0) {
            setTimeout((e) => {
                taskList.innerHTML = "<li class'empty'>✨No tasks left.you're winning</li>";
                return
            },5000);
        }
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        if (currentFilter === "completed" && !task.completed) return;
        if (currentFilter === "pending" && task.completed) return;

        const li = document.createElement("li");

        li.innerHTML = `
      <input type="checkbox" ${task.completed ? "checked" : ""}
        onclick="toggleTask(${index})" />
        
      <span class="task-text" onclick="startEdit(${index}, this)" 
            style="text-decoration: ${task.completed ? "line-through" : "none"}">
        ${task.text}
      </span>

      <button onclick="deleteTask(${index})">Delete</button>
    `;

        taskList.appendChild(li);
    });
}

function addTask() {
    if (taskInput.value.trim() === "") return;

    tasks.push({
        text: taskInput.value,
        completed: false
    });
    taskInput.value = "";
    saveTasks();
    renderTasks();
    if (window.innerWidth <= 768) { // for mobile
        gsap.from("li:last-child", {
            x: 300,
            duration: 1.5,
            rotation: 60,
            opacity: 0,
            ease: "back.out(1.5)",
        });
    } else {// for large screen
        gsap.from("li:last-child", {
            x: 700,
            duration: 1.9,
            rotation: 60,
            opacity: 0,
            ease: "back.out(1.5)",
        });
    }
}

function editTask(index) {
    const newtask = prompt('Edit your task', tasks[index].text);
    if (newtask !== null && newtask.trim() !== "") {
        tasks[index].text = newtask;
        saveTasks();
        renderTasks();
    }
}

function deleteTask(index) {
    const li = document.querySelectorAll("#taskList li")[index]; // get the actual <li> element

    // Animate with GSAP for mobile
    if (window.innerWidth <= 768) {
        gsap.to(li, {
            x: -250,
            opacity: 0,
            rotation: -70,
            scale: 0.8,
            duration: 0.35,
            ease: "power3.in",
            onComplete: () => {
                // Remove from tasks array after animation
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            }
        });
    }
    else {// for large screen
        gsap.to(li, {
            duration: 0.7,
            x: -700,
            opacity: 0,
            rotation: -80,
            scale: 0.8,
            ease: "power3.in",
            onComplete: () => {
                // Remove from tasks array after animation
                tasks.splice(index, 1);
                saveTasks();
                renderTasks(); // re-render the list
            }
        });
    }
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function setFilter(filter) {
    currentFilter = filter;
    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.classList.remove("active");
    });
    event.target.classList.add('active');
    renderTasks();
}

function startEdit(index, spanElement) {
    const input = document.createElement("input");
    input.type = "text";
    input.value = tasks[index].text;
    input.className = "edit-input";

    // Replace the span with input
    spanElement.replaceWith(input);
    input.focus();
    gsap.from(input, {
        scale: 0.05,
        opacity: 0,
        duration: 0.3,
        ease: "sine.out",
    })

    // Save on Enter
    input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            // Update tasks
            input.style.display = "none";
            const newValue = input.value.trim();
            if (newValue !== "") {
                tasks[index].text = newValue;
                saveTasks();
            }
            // Hide input immediately by re-rendering the list
            renderTasks();
        }
    });

    // Optional: Save on blur as backup
    input.addEventListener("blur", function () {
        renderTasks(); // input disappears if user clicks outside
    });
}

function finishEdit(index, inputElement) {
    const newValue = inputElement.value.trim();
    if (newValue !== "") {
        tasks[index].text = newValue;
        saveTasks();
    }
    renderTasks(); // revert if empty
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    renderTasks();
    document.getElementById('addBtn').addEventListener('click', addTask);
});

// Enter key for adding tasks
document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

// Mobile nav bar
const navIcon = document.getElementById('navIcon');
const navLinks = document.getElementById('navLinks');
const logo = document.getElementById('logo');
let isOpen = false;

navIcon.addEventListener('click', (e) => {
     let mobileNav=gsap.timeline();
    if (!isOpen) {
        mobileNav.from("nav button", {
            scale: 0,
            y: -50,
            duration: 0.5,
            stagger: 0.2,
            opacity: 0,
            ease: "back.out(1.7)",
        });
        isOpen = true;
    }
    else {
        mobileNav.reverse();
        isOpen = false;
    }
});

