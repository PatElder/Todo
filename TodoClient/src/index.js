import "core-js/stable";
import "regenerator-runtime/runtime";

import "./css/styles.css";
import TodoView from "./hbs/TodoItemsTemplate.hbs";
import TodoItems from "./hbs/todoItems.hbs";

import Todos from "./js/todoApi";

let app = document.getElementById("app");
app.innerHTML = TodoView({ now: new Date().toISOString() });

let todos = new Todos("https://localhost:5001/api/");
let items = {};

let refresh = () => {
  todos.getTodos().then((list) => {
    items = list;
    let itemsList = document.getElementById("items");
    // console.log(list);
    itemsList.innerHTML = TodoItems(list);

    let deleteBtns = document.getElementsByClassName("delete-task");
    deleteBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let id = e.target.dataset.id;
        todos.deleteTodo(id).then((res) => {
          refresh();
        });
      });
    });
    let completeBtns = document.getElementsByClassName("complete-task");
    completeBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let id = e.target.dataset.id;
        let item = null;
        list.forEach((todo) => {
          if (todo.id == id) {
            item = todo;
          }
        });

        if (item === null) {
          return;
        }

        item.isComplete = !item.isComplete;

        todos.setTodoEdit(item, id).then((res) => {
          refresh();
        });
      });
    });
    let editBtns = document.getElementsByClassName("edit-task");
    let confirmEditBtns = document.getElementsByClassName(
      "updateDescriptionButton"
    );
    let editDescFieds = document.getElementsByClassName("edit-form");

    editBtns.forEach((btn, i) => {
      btn.addEventListener("click", (e) => {
        let id1 = btn.dataset.id;
        let currentUpdateDescBtn = confirmEditBtns[i];
        let currentUpdateDescField = editDescFieds[i];
        if (currentUpdateDescBtn.dataset.id == id1) {
          currentUpdateDescBtn.style.display = "flex";
          currentUpdateDescField.style.display = "flex";
          currentUpdateDescBtn.parentNode.parentNode.style.height = "12vh";
        }
      });
    });
    confirmEditBtns.forEach((btn, i) => {
      btn.addEventListener("click", (e) => {
        let id = e.target.dataset.id;
        let item = null;
        list.forEach((todo) => {
          if (todo.id == id) {
            item = todo;
          }
        });

        if (item === null) {
          return;
        }

        if (confirmEditBtns[i].dataset.id == editDescFieds[i].dataset.id) {
          console.log(editDescFieds[i]);
          item.description = editDescFieds[i].value;
          todos.setTodoEdit(item, id).then((res) => {
            refresh();
          });
        }
      });
    });
  });
};

document.getElementById("add").addEventListener("click", () => {
  let fields = document.querySelectorAll("#new input, #new textarea");
  if (fields.length > 0) {
    let newTodo = {};
    fields.forEach((field) => {
      let val = field.value.trim();
      if (val !== "") {
        newTodo[field.id] = val;
      }
    });

    console.log(newTodo);
    todos.addTodo(newTodo).then((res) => {
      refresh();
    });
  }
});
refresh();
