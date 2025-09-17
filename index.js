let todos = [];

    function saveTodos() {
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    function loadTodos() {
        try {
            const raw = localStorage.getItem("todos");
            todos = raw ? JSON.parse(raw) : [];
            if (!Array.isArray(todos)) todos = [];
        } catch (e) {
            todos = [];
        }
    }
    function addTodo() {
        const input = document.querySelector("#todo-input");
        const title = (input.value || "").trim();
        if (!title) return;
        todos.push({
            title: title
        });
        input.value = "";
        saveTodos();
        render();
    }

    function deleteLastTodo() {
        if (todos.length === 0) return;
        todos.splice(todos.length - 1, 1); // removes last element from the array.
        saveTodos();
        render();
    }

    function deleteFirstTodo() {
        if (todos.length === 0) return;
        todos.splice(0, 1);
        saveTodos();
        render();
    }

    function deleteTodo(index) {
        if (index < 0 || index >= todos.length) return;
        todos.splice(index, 1);
        saveTodos();
        render();
    }

    function createTodoComponent(todo, index) {

        const div = document.createElement("div");
        div.setAttribute("role", "listitem");
        div.className = "todo-item";
        const h1 = document.createElement("h1");
        h1.innerHTML = todo.title;

        const editBtn = document.createElement("button");
        editBtn.innerHTML = "Edit";
        editBtn.setAttribute("aria-label", `Edit todo ${index + 1}`);
        editBtn.className = "btn-primary";
        editBtn.onclick = function () {
            const next = prompt("Edit todo title", todo.title);
            if (next === null) return;
            const newTitle = next.trim();
            if (!newTitle) return;
            todos[index].title = newTitle;
            saveTodos();
            render();
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Delete";
        deleteBtn.setAttribute("aria-label", `Delete todo ${index + 1}`);
        deleteBtn.onclick = function () { deleteTodo(index); };
        deleteBtn.className = "btn-danger";

        div.appendChild(h1);
        div.appendChild(editBtn);
        div.appendChild(deleteBtn);
        return div;
    }


    // later in react 
    function render() {
        const container = document.querySelector("#todo");
        container.innerHTML = "";
        for (let i = 0; i < todos.length; i++) {
            const element = createTodoComponent(todos[i], i);
            container.appendChild(element);
        }
    }

    // initialize from storage
    loadTodos();
    render();