"use strict"

const inputBox = document.querySelector(".addInput");
const buttonAdd = document.querySelector(".add-todo");
const containerUL = document.querySelector(".todo-list");
const buttonActiveTasks = document.querySelector(".active-todos");
const buttonClosedTasks = document.querySelector(".completed-todos");
const buttonAllTasks = document.querySelector(".all-todos");

// const data = ["Сделать дз", "Помыть посуду", "Погулять с собакой"];
const data = [
    {task: "Сделать дз", isDone: true, id: 1},
    {task: "Помыть посуду", isDone: false, id: 2},
    {task: "Погулять с собакой", isDone: false, id: 3},
];

function renderToDos(array) {
    for (let i = 0; i < array.length; i++) {
        let li = document.createElement('li');
        let span = document.createElement('span');
        const checkButton = createInputCheckbox(li, span, array[i]);
        li.appendChild(checkButton);
        span.textContent = array[i].task;
        const editButton = createEditButton(li, span, array[i]);
        const delButton = createDeleteButton(li, span);
        if (array[i].isDone === true) {
            span.style.textDecoration = 'line-through';
        } else {
            span.style.textDecoration = 'none';
        }
        containerUL.appendChild(li);
        li.appendChild(span);
        li.append(editButton, delButton);
    }
}

renderToDos(data);

function createInput(liElement, spanElement) {
    const inputEdit = document.createElement("input");
    inputEdit.style.width = "25%";
    inputEdit.value = spanElement.textContent;
    inputEdit.addEventListener('change', (event) => {
        liElement.textContent = "";
        const span = document.createElement("span");
        span.textContent = event.target.value;
        const checkButton = createInputCheckbox(liElement, span);
        liElement.appendChild(checkButton)
        const editButton = createEditButton(liElement, span);
        const delButton = createDeleteButton(liElement, spanElement);
        liElement.append(span, editButton, delButton);

    });
    return inputEdit;
}

function createEditButton(liElement, spanElement, todoItem) {
    const editButton = document.createElement("button");
    editButton.classList.add("editButton");
    editButton.textContent = "Редактировать";

    editButton.addEventListener("click", () => {
        const inputEdit = document.createElement("input");
        inputEdit.style.width = "25%";
        inputEdit.value = spanElement.textContent;

        inputEdit.addEventListener('change', (event) => {
            liElement.textContent = ""; // Очищаем элемент для обновления
            spanElement.textContent = event.target.value;


            todoItem.task = event.target.value;


            const checkButton = createInputCheckbox(liElement, spanElement, todoItem);
            const editButton = createEditButton(liElement, spanElement, todoItem);
            const delButton = createDeleteButton(liElement, spanElement);

            liElement.appendChild(checkButton);
            liElement.appendChild(spanElement);
            liElement.append(editButton, delButton);
        });

        liElement.textContent = "";
        liElement.appendChild(inputEdit);
    });

    return editButton;
}


buttonAdd.addEventListener("click", () => {
    if (inputBox.value === '') {
        console.log("Поле ввода пустое");
    } else {
        const obj = {task: inputBox.value, isDone: false};
        data.push(obj);
        console.log(data);
        renderOneToDo(obj);
        // console.log(data);
    }
    inputBox.value = '';
});

function createDeleteButton(liElement, spanElement) {
    const delButton = document.createElement("button");
    delButton.classList.add("delButton");
    delButton.textContent = "Удалить";
    delButton.addEventListener("click", () => {
        containerUL.removeChild(liElement);
    })
    return delButton;
}

function createInputCheckbox(liElement, spanElement, todoItem) {
    const checkButton = document.createElement("input");
    checkButton.classList.add("checkbox");
    checkButton.setAttribute('type', 'checkbox');


    checkButton.checked = todoItem.isDone;

    checkButton.addEventListener("change", () => {
        if (checkButton.checked) {
            spanElement.style.textDecoration = 'line-through';
            todoItem.isDone = true;
            console.log(data);
        } else {
            spanElement.style.textDecoration = 'none';
            todoItem.isDone = false;
            console.log(data);
        }
    });

    return checkButton;
}


function addTask() {
    let li = document.createElement('li');
    let span = document.createElement("span");
    span.textContent = inputBox.value;
    const editButton = createEditButton(li, span);
    const delButton = createDeleteButton(li, span);
    containerUL.appendChild(li);
    li.appendChild(span);
    li.append(editButton, delButton);

}

function renderOneToDo(element) {
    let li = document.createElement('li');
    let span = document.createElement('span');
    const checkButton = createInputCheckbox(li, span, element);
    li.appendChild(checkButton);
    span.textContent = element.task;
    if (element.isDone === true) {
        span.style.textDecoration = 'line-through';
    } else {
        span.style.textDecoration = 'none';
    }
    const editButton = createEditButton(li, span, element);
    const delButton = createDeleteButton(li, span);
    containerUL.appendChild(li);
    li.appendChild(span);
    li.append(editButton, delButton);
}
///////////////////////////////////////////////////////////////////////////



buttonActiveTasks.addEventListener("click", () => {
    containerUL.innerHTML = "";
    data.forEach((elem) => {
        if (!elem.isDone) {
            renderOneToDo(elem);
        }
    });
});

buttonClosedTasks.addEventListener("click", () => {
    containerUL.innerHTML = "";
    data.forEach((elem) => {
        if (elem.isDone) {
            renderOneToDo(elem);
        }
    });
});

buttonAllTasks.addEventListener("click", () => {
    containerUL.innerHTML = "";
    data.forEach((elem) => {
        renderOneToDo(elem);
    });
});