const element = (id) => document.querySelector(`#${id}`);

const todo = element("todo");
const add = element("add");
const todos = element("todos");

add.onclick = () => {
  const id = Date.now();
  if (todo.value) {
    const body = { id, todo: todo.value, isChecked: false };
    todo.value = "";
    axios
      .post("http://localhost:3000/add", body)
      .then((res) => {
        refreshTodos();
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response);
        }
      });
    refreshTodos();
  }
};

const refreshTodos = () => {
  axios
    .get("http://localhost:3000/")
    .then((res) => {
      if (!res.data.length) {
        todos.innerHTML = `<div class="todo">No Data Found!</div>`;
      } else {
        todos.innerHTML = "";

        res.data.forEach(({ todo, isChecked, id }, i) => {
          const checked = isChecked ? "checked" : "";
          const date = new Date(id).toString();

          const li = `
          <div class="todo">
              <div onclick="deleteTodo(this)" class="delete"> x </div>
              <div
                  class="checkBox ${checked}"
                  id="${id}"
                  onclick="toggle(this)"
                  
                /> </div>
                <span class="task  ${checked}">${todo}</span>
                <div class="date">${date.substr(0, 24)}</div>
                
          </div>
          `;
          todos.innerHTML += li;
        });
      }
    })
    .catch((err) => {
      if (err.response) {
        console.log(err.response);
      }
    });
};
const toggle = (el) => {
  axios.get(`http://localhost:3000/edit/${el.id}`).then((res) => {
    refreshTodos();
  });
};
const deleteTodo = (el) => {
  const id = el.parentNode.children[1].id;
  axios.get(`http://localhost:3000/delete/${id}`).then((res) => {
    refreshTodos();
  });
};
refreshTodos();
