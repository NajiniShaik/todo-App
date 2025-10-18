let todoItemContainerEl = document.getElementById("todoItemContainer");

let addTodoBtnEl = document.getElementById("addTodoButton");

let todoUserInputEl = document.getElementById("todoUserInput");

let saveTodoButtonEl = document.getElementById("saveTodoButton");



// Get Todo list from the localstorage

function getTodoListFromLocalStorage() {

    let stringiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringiedTodoList);

    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}



let todoList = getTodoListFromLocalStorage();



// Save Todo list in localstorage

saveTodoButtonEl.onclick = function () {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}


// Delete Todo

function deleteTodo(todoId) {
    let todoEl = document.getElementById(todoId);
    todoItemContainerEl.removeChild(todoEl);

    let deleteElementIndex = todoList.findIndex(function (eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    })
    todoList.splice(deleteElementIndex, 1);
}


// Status Change 

function onTodoStatusChange(inputElId, labelElId, todoId) {
    let checkboxEl = document.getElementById(inputElId);
    let labelEl = document.getElementById(labelElId);

    /*

    if (checkboxEl.checked === true) {
        labelEl.classList.add("checked");
    } else {
        labelEl.classList.remove("checked");
    }
       
    */

    labelEl.classList.toggle("checked");

    let todoObjectIndex = todoList.findIndex(function (eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    })

    let todoObj = todoList[todoObjectIndex];

    if (todoObj.isChecked === true) {
        todoObj.isChecked = false;
    } else {
        todoObj.isChecked = true;
    }


}


// Create And Append Todo

function createAndAppendTodo(todo) {

    let todoId = "todo" + todo.uniqueNo;
    let inputId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;


    // Li Element

    let todoElement = document.createElement("li");
    todoElement.id = todoId;
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");

    todoItemContainerEl.appendChild(todoElement);


    // Input Element

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = inputId;
    inputElement.classList.add("checkbox-input");

    inputElement.onclick = function () {
        onTodoStatusChange(inputId, labelId, todoId);
    }

    inputElement.checked=todo.isChecked;

    todoElement.appendChild(inputElement);


    // Label Container (div)

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("d-flex", "flex-row", "label-container");

    todoElement.appendChild(labelContainer);


    // Label Element 

    let labelElement = document.createElement("label");
    labelElement.textContent = todo.text;
    labelElement.setAttribute("for", inputId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");

    if (todo.isChecked === true){
        labelElement.classList.add("checked");
    }

    labelContainer.appendChild(labelElement);


    // Delete Icon Container (div)

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");

    labelContainer.appendChild(deleteIconContainer);


    // Delete Icon 

    let deleteIconElement = document.createElement("i");
    deleteIconElement.classList.add("far", "fa-trash-alt", "delete-icon");

    deleteIconElement.onclick = function () {
        deleteTodo(todoId);
    }

    deleteIconContainer.appendChild(deleteIconElement);


}


// Loop 

for (let todo of todoList) {
    createAndAppendTodo(todo);
}


// Add Todo

function onAddTodo() {
    let userInputValue = todoUserInputEl.value;
    let todosCount = todoList.length;

    if (userInputValue === "") {
        alert("Enter Valid Input");
        return;
    }

    let todo = {
        text: userInputValue,
        uniqueNo: todosCount + 1,
        isChecked: false,
    };

    createAndAppendTodo(todo);

    todoList.push(todo);

    todoUserInputEl.value = "";
}


addTodoBtnEl.onclick = function () {
    onAddTodo();
}