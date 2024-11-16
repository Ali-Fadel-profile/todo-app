const swithchThemeBtn = document.querySelector(".header__button");
const themeIcon = document.querySelector(".header__img");
const addtodoInput = document.querySelector(".addTodo__input");
const addtodoBtn = document.querySelector(".addTodo__button");
const todoList = document.querySelector(".showTodo__list");
const emptyTodo = document.querySelector(".showTodo__empty");
const showtodoSection = document.querySelector(".showTodo");
const label = document.querySelector(".label");
const totalTasks = document.querySelector(".showTodo__control-total");
const buttonsContainer = document.querySelector(".showTodo__control-buttons");
const filterButtons = document.querySelectorAll(".showTodo__control-buttons button");
const clearCompletedBtn = document.querySelector("#Clear__completed-btn");

// Toggle Theme
const toggleTheme = () => {
    const isLightTheme = document.body.classList.toggle("light__theme");
    localStorage.setItem("theme", isLightTheme ? "light" : "dark");
};
swithchThemeBtn.addEventListener("click", toggleTheme);

// Apply Saved Theme on Reload
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
    document.body.classList.add("light__theme");
}

// Retrieve tasks from local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Utility functions
const saveTasks = () => localStorage.setItem("tasks", JSON.stringify(tasks));

const updateEmptyTodoDisplay = () => {    
    emptyTodo.style.display = tasks.length > 0 ? "none" : "block";
    showtodoSection.style.display = tasks.length > 0 ? "block" : "none";
    label.style.display = tasks.length > 0 ? "block" : "none";     
};


const showTodo = (filter = "all") => {
    todoList.innerHTML = "";
    const filteredTasks = tasks.filter(task => 
        filter === "all" || 
        (filter === "active" && task.state === "active") || 
        (filter === "completed" && task.state === "completed")
    );

    filteredTasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.classList.add("showTodo__item");
        listItem.setAttribute("data-id", task.id);
        listItem.setAttribute("draggable", "true");
        listItem.setAttribute("data-index", index); // Add index for drag-and-drop

        listItem.innerHTML = `
            <button class="circle ${task.state === "completed" ? "completed" : ""}"></button>
            <div class="showTodo__item-task">
                <p class="text ${task.state === "completed" ? "completed__text" : ""}">${task.task}</p>
                <button class="showTodo__item-delete"></button>
            </div>
        `;
        todoList.appendChild(listItem);
    });

    totalTasks.textContent = `${tasks.filter(task => task.state === "active").length} items left`;

    // Attach drag-and-drop event listeners
    addDragAndDropListeners();
};


// Add a new todo
const addTodo = () => {
    const todoText = addtodoInput.value.trim();
    if (todoText) {
        const newTask = { id: Date.now(), task: todoText, state: "active" }; // Ensure default state is active
        tasks.push(newTask);
        addtodoInput.value = "";
        saveTasks();
        showTodo("active");
        activateFilterButton("active");
        updateEmptyTodoDisplay();
    }
};
addtodoBtn.addEventListener("click", addTodo);

// Delete a todo
const deleteTodo = id => {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    showTodo();
    updateEmptyTodoDisplay();
};

// Update todo state
const updateTodoState = id => {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.state = task.state === "completed" ? "active" : "completed";
        saveTasks();
        showTodo();
        activateFilterButton("all");
    }
};

// Activate the appropriate filter button
const activateFilterButton = activeFilter => {
    filterButtons.forEach(button => {
        button.classList.toggle("active", button.getAttribute("data-type") === activeFilter);
    });
};

// Event delegation for todo actions
todoList.addEventListener("click", event => {
    const target = event.target;
    const listItem = target.closest(".showTodo__item");

    if (listItem) {
        const id = parseInt(listItem.getAttribute("data-id"), 10);

        if (target.classList.contains("showTodo__item-delete")) {
            deleteTodo(id);
        } else if (target.classList.contains("circle")) {
            updateTodoState(id);
        }
    }
});

// Filter buttons event listener
buttonsContainer.addEventListener("click", event => {
    const filter = event.target.getAttribute("data-type");
    if (filter) {
        activateFilterButton(filter);
        showTodo(filter);
    }
});

// Clear completed tasks
clearCompletedBtn.addEventListener("click", () => {
    tasks = tasks.filter(task => task.state !== "completed");
    saveTasks();
    showTodo();
    updateEmptyTodoDisplay();
    activateFilterButton("all");
});

let draggedIndex = null;

const handleDragStart = event => {
    draggedIndex = parseInt(event.target.getAttribute("data-index"), 10);
    event.target.classList.add("dragging");
};

const handleDragOver = event => {
    event.preventDefault(); 
    const target = event.target.closest(".showTodo__item");

    if (target && !target.classList.contains("dragging")) {
        const draggedElement = todoList.querySelector(".dragging");
        const boundingRect = target.getBoundingClientRect();
        const offset = event.clientY - boundingRect.top;

        if (offset < boundingRect.height / 2) {
            todoList.insertBefore(draggedElement, target);
        } else {
            todoList.insertBefore(draggedElement, target.nextSibling);
        }
    }
};

const handleDragEnd = event => {
    event.target.classList.remove("dragging");
    const reorderedTasks = Array.from(todoList.children).map(item => {
        const id = parseInt(item.getAttribute("data-id"), 10);
        return tasks.find(task => task.id === id);
    });
    tasks = reorderedTasks;
    saveTasks();
    showTodo(); 
};

const addDragAndDropListeners = () => {
    const items = todoList.querySelectorAll(".showTodo__item");
    items.forEach(item => {
        item.addEventListener("dragstart", handleDragStart);
        item.addEventListener("dragover", handleDragOver);
        item.addEventListener("dragend", handleDragEnd);
    });
};

// Initialize display
activateFilterButton("active");
showTodo("active"); 
updateEmptyTodoDisplay();
