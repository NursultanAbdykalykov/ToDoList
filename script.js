"use strict"

const inputBox = document.querySelector(".addInput");
const buttonAdd = document.querySelector(".add-todo");
const containerUL = document.querySelector(".todo-list");


function createInput(liElement, spanElement) {
    const inputEdit = document.createElement("input");
    inputEdit.style.width = "25%";
    inputEdit.value = spanElement.textContent;
    inputEdit.addEventListener('change', (event) => {
        liElement.textContent = "";
        const span = document.createElement("span");
        span.textContent = event.target.value;
        const editButton = createEditButton(liElement, span);
        const delButton = createDeleteButton(liElement, spanElement);
        liElement.append(span, editButton, delButton);

    });
    return inputEdit;
}

function createEditButton(liElement, spanElement) {
    const editButton = document.createElement("button");
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
        let li = document.createElement('li');
        let span = document.createElement("span");
        span.textContent = inputBox.value;
        const editButton = createEditButton(li, span);
        const delButton = createDeleteButton(li, span);
        containerUL.appendChild(li);
        li.appendChild(span);
        li.append(editButton, delButton);
    }
    inputBox.value = '';
});

function createDeleteButton(liElement, spanElement) {
    const delButton = document.createElement("button");
    delButton.textContent = "Удалить";
    delButton.addEventListener("click", () => {
        // liElement.textContent = "";
        containerUL.removeChild(liElement);
    })
    return delButton;
}

