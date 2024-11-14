// const swithchThemeBtn = document.querySelector(".header__button");
// const themeIcon  = document.querySelector(".header__img");
// const addtodoInput = document.querySelector(".addTodo__input");
// const addtodoBtn = document.querySelector(".addTodo__button");
// const todoList = document.querySelector(".showTodo__list");
// const emptyTodo = document.querySelector(".showTodo__empty");
// const showtodoSection = document.querySelector(".showTodo")
// const label = document.querySelector(".label");
// const totalTasks = document.querySelector(".showTodo__control-total");
// const buttonsContainer = document.querySelector(".showTodo__control-buttons");
// const filterButtons = document.querySelectorAll(".showTodo__control-buttons button");
// const clearCompletedBtn = document.querySelector("#Clear__completed-btn");

// const toggleTheme =  () => {  
//     document.body.classList.toggle("light__theme"); 
// }
// swithchThemeBtn.addEventListener("click",toggleTheme)

// let tasks =  JSON.parse(localStorage.getItem("tasks"))  || [];

// function showEmptyTodo() {
// if (tasks.length === 0) {    
//    emptyTodo.style.display = "block";
//    showtodoSection.style.display = "none"
//    label.style.display = "none"
// } else {
//    emptyTodo.style.display = "none";
//    showtodoSection.style.display = "block"
//    label.style.display = "block"
// }
// showTodo("all");
// }
// showEmptyTodo();

// function addToDo() {
//     if (addtodoInput.value.trim()) {
//         const todo = addtodoInput.value.trim()
//         tasks.push({task: todo, state: "active"}); 
//         addtodoInput.value = "";       
//         localStorage.setItem("tasks",JSON.stringify(tasks))
//         showTodo("all");
//         showEmptyTodo();
//     }    
// }
// addtodoBtn.addEventListener("click", addToDo);


// function showTodo(filter) {
//    todoList.innerHTML = "";
//    if (filter === "all") {
//     for (let index = 0; index < tasks.length; index++) {
//         const listItem = `
//         <li class="showTodo__item" data-index="${index}">
//             <button class="circle ${tasks[index].state === "completed" ? "completed" : ""}"></button>
//             <div class="showTodo__item-task">
//               <p class="text ${tasks[index].state === "completed" ? "completed__text" : ""}">${tasks[index].task}</p>
//               <button class="showTodo__item-delete"></button>
//             </div>
//         </li>`;
//         todoList.insertAdjacentHTML("beforeend", listItem);    
//     }
//     } else if(filter === "active") {
//        const filteredTasks = tasks.filter((element) => element.state === "active")
//         for (let index = 0; index < filteredTasks.length; index++) {
//             const listItem = `
//             <li class="showTodo__item" data-index="${index}">
//                 <button class="circle"></button>
//                 <div class="showTodo__item-task">
//                   <p class="text">${filteredTasks[index].task}</p>
//                   <button class="showTodo__item-delete"></button>
//                 </div>
//             </li>`;
//             todoList.insertAdjacentHTML("beforeend", listItem);    
//         }
//     } else if(filter === "completed") {
//        const filteredTasks = tasks.filter((element) => element.state === "completed")
//         for (let index = 0; index < filteredTasks.length; index++) {
//             const listItem = `
//             <li class="showTodo__item" data-index="${index}">
//                 <button class="circle completed"></button>
//                 <div class="showTodo__item-task">
//                   <p class="text completed__text">${filteredTasks[index].task}</p>
//                   <button class="showTodo__item-delete"></button>
//                 </div>
//             </li>`;
//         todoList.insertAdjacentHTML("beforeend", listItem);
//         }
//     }
   
//     totalTasks.textContent  = `${tasks.length} items left`
// }


// function deleteTodo(button) {
//    const listItem = button.closest(".showTodo__item")
//    const index = listItem.getAttribute("data-index");
//    tasks.splice(index, 1);           
//    localStorage.setItem("tasks",JSON.stringify(tasks))
//    showTodo("all");
//    showEmptyTodo();
// }
// function updateTodoState(element) {
//     element.classList.add("completed");
//     const listItem = element.closest(".showTodo__item");
//     const index = listItem.getAttribute("data-index");
//     tasks[index].state = "completed";
//     localStorage.setItem("tasks",JSON.stringify(tasks));
//     showTodo("all"); 
//     filterButtons.forEach(element => {
//         if (element.getAttribute("data-type") === "all") {
//             element.classList.add("active");
//         } else {
//             element.classList.remove("active");
//         }
//     });
// }
// todoList.addEventListener("click",function (event) {
//     if (event.target.classList.contains("showTodo__item-delete")) {
//         deleteTodo(event.target);
//     }else if (event.target.classList.contains("circle")) {
//         updateTodoState(event.target);
//     }
// });
// buttonsContainer.addEventListener("click", function (event) {    
//     const taskState = event.target.getAttribute("data-type");
//     filterButtons.forEach(element => {
//         if (element.getAttribute("data-type") === taskState) {
//             element.classList.add("active");
//         } else {
//             element.classList.remove("active");
//         }
//     });
//     showTodo(taskState)
// });
// clearCompletedBtn.addEventListener("click", function () {
//     const filteredTasks = tasks.filter((element) => element.state !== "completed" ? element : "" );
//     tasks = filteredTasks;
//     localStorage.setItem("tasks",JSON.stringify(tasks));
//     showTodo("all");
//     showEmptyTodo();    
//     filterButtons.forEach(element => {
//         if (element.getAttribute("data-type") === "all") {
//             element.classList.add("active");
//         } else {
//             element.classList.remove("active");
//         }
//     });
// });
// DOM Elements
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
const toggleTheme = () => document.body.classList.toggle("light__theme");
swithchThemeBtn.addEventListener("click", toggleTheme);

// Retrieve tasks from local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Utility functions
const saveTasks = () => localStorage.setItem("tasks", JSON.stringify(tasks));

const updateEmptyTodoDisplay = () => {
    emptyTodo.style.display = tasks.length ? "none" : "block";
    showtodoSection.style.display = tasks.length ? "block" : "none";
    label.style.display = tasks.length ? "block" : "none";
};

// Render tasks based on filter
const showTodo = (filter = "all") => {
    todoList.innerHTML = "";
    const filteredTasks = tasks.filter(task => filter === "all" || task.state === filter);
    
    filteredTasks.forEach(task => {
        const listItem = `
            <li class="showTodo__item" data-id="${task.id}">
                <button class="circle ${task.state === "completed" ? "completed" : ""}"></button>
                <div class="showTodo__item-task">
                  <p class="text ${task.state === "completed" ? "completed__text" : ""}">${task.task}</p>
                  <button class="showTodo__item-delete"></button>
                </div>
            </li>`;
        todoList.insertAdjacentHTML("beforeend", listItem);
    });

    totalTasks.textContent = `${tasks.length} items left`;
};

// Add a new todo
const addTodo = () => {
    const todoText = addtodoInput.value.trim();
    if (todoText) {
        const newTask = { id: Date.now(), task: todoText, state: "active" }; // Add unique ID
        tasks.push(newTask);
        addtodoInput.value = "";
        saveTasks();
        showTodo();
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

// Initialize display
updateEmptyTodoDisplay();
showTodo();
