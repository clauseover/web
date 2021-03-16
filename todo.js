const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const SecondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButon = document.querySelector("#clear-todos");
eventListeners();

function eventListeners() { // Tüm event listenerlar
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    SecondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodos);
    clearButon.addEventListener("click", clearAllTodos);


}

function clearAllTodos(e) {

    if (confirm("Tümünü silmek istediğinize emin misiniz?")) {
        // Arayüzden Todo'ları temizleme
        // todoList.innerHTML=""; // Yavaş yöntem

        while (todoList.firstElementChild != null) {
            todoList.removeChild(todoList.firstChild);
        }
        // let i; // for döngüsü ile silme 
        // for (i = todoList.childElementCount; i>0; i--){
        //     todoList.removeChild(todoList.firstChild);
        // }

        localStorage.removeItem("todos");


    }
}

function filterTodos(e) {
    const filterValue = e.target.value.toLowerCase();
    const ListItems = document.querySelectorAll(".list-group-item");
    ListItems.forEach(function (ListItem) {
        const text = ListItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1) {
            // Bulamadı
            ListItem.setAttribute("style", "display: none !important");
        } else {
            ListItem.setAttribute("style", "display: block");
        }

    });
}

function loadAllTodosToUI() {
    let todos = getTodosFromStorage();
    todos.forEach(function (todo) {
        addTodoToUI(todo);

    })
}

function deleteTodo(e) {
    if (e.target.className === "fa fa-remove") {
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success", "Silme işlemi başarıyla gerçekleştirildi.")
    }
}

function deleteTodoFromStorage(deletetodo) {
    let todos = getTodosFromStorage();
    todos.forEach(function (todo, index) {
        if (todo === deletetodo) {
            todos.splice(index, 1);//Array'den değeri silme
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));

}

function addTodo(e) {
    const newTodo = todoInput.value.trim();
    /*
    <div class="alert alert-danger d-inline" role="alert">
        Lütfen geçerli bir metin giriniz!
    </div>
           */
    if (newTodo === "") {
        showAlert("danger", "Lütgen bir metin giriniz!");
    } else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
    }
    e.preventDefault();
}

function getTodosFromStorage() { //Storage'den todo'ları alma
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;


}

function addTodoToStorage(newTodo) {
    let todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));

}

function showAlert(type, message) {
    const dalert = document.createElement("div");
    dalert.className = `alert alert-${type} d-inline`;
    dalert.textContent = message;
    let time = 0;

    if ((firstCardBody.childElementCount < 3) && (time === 0)) {
        time = 1;
        firstCardBody.appendChild(dalert);
        // Set Timeout
        setTimeout(function () { dalert.remove(); }, 2000)
        time = 0;
    }



}

function addTodoToUI(newTodo) { // String değerini list item olara UI'a ekle
    //ListItem oluşturma
    const ListItem = document.createElement("li");
    // Link oluşturma
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    ListItem.className = "list-group-item d-flex justify-content-between";
    // Text Node Ekleme
    ListItem.appendChild(document.createTextNode(newTodo));
    ListItem.appendChild(link);
    todoList.appendChild(ListItem);
    todoInput.value = "";
    showAlert("success", "Kayıt başarıyla eklendi.");
}

console.log();