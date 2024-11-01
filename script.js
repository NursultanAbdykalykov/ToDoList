"use strict"

const inputBox = document.querySelector(".addInput");
const buttonAdd = document.querySelector(".add-todo");
const containerUL = document.querySelector(".todo-list");

const data = ["Сделать дз", "Помыть посуду", "Погулять с собакой"];

function renderToDos(array) {
    for (const item of array) {
        let li = document.createElement('li');
        let span = document.createElement('span');
        const checkButton = createInputCheckbox(li, span);
        li.appendChild(checkButton);
        span.textContent = item;
        const editButton = createEditButton(li, span);
        const delButton = createDeleteButton(li, span);
        containerUL.appendChild(li);
        li.appendChild(span);
        li.append(editButton, delButton);
    };
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

function createEditButton(liElement, spanElement) {
    const editButton = document.createElement("button");
    editButton.classList.add("editButton");
    editButton.textContent = "Редактировать";
    editButton.addEventListener("click", () => {
        const inputEdit = createInput(liElement, spanElement);
        liElement.textContent = "";
        liElement.appendChild(inputEdit);
    });
    return editButton;
}

buttonAdd.addEventListener("click", () => {
    if (inputBox.value === '') {
        console.log("Поле ввода пустое");
    } else {
        // let li = document.createElement('li');
        // let span = document.createElement("span");
        // span.textContent = inputBox.value;
        // const editButton = createEditButton(li, span);
        // const delButton = createDeleteButton(li, span);
        // containerUL.appendChild(li);
        // li.appendChild(span);
        // li.append(editButton, delButton);
        data.push(inputBox.value);
        renderOneToDo(inputBox.value);
        console.log(data);
    }
    inputBox.value = '';
});

function createDeleteButton(liElement, spanElement) {
    const delButton = document.createElement("button");
    delButton.classList.add("delButton");
    delButton.textContent = "Удалить";
    delButton.addEventListener("click", () => {
        // liElement.textContent = "";
        containerUL.removeChild(liElement);
    })
    return delButton;
}

function createInputCheckbox(liElement, spanElement) {
    const checkButton = document.createElement("input");
    checkButton.classList.add("checkbox");
    checkButton.setAttribute('type', 'checkbox');
    checkButton.addEventListener("change", () => {
        if (checkButton.checked) {
            spanElement.style.textDecoration = 'line-through';
        } else {
            spanElement.style.textDecoration = 'none';
        }

    })
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
    const checkButton = createInputCheckbox(li, span);
    li.appendChild(checkButton);
    span.textContent = element;
    const editButton = createEditButton(li, span);
    const delButton = createDeleteButton(li, span);
    containerUL.appendChild(li);
    li.appendChild(span);
    li.append(editButton, delButton);
}
