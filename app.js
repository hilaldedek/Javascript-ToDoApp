const addBtn = document.getElementById("todo-button");
const todoInput = document.getElementById("todo-input");
const todoUl = document.getElementById("todo-ul");
const alert = document.querySelector(".alertmsg");
const today = document.querySelector(".today");

let todos = JSON.parse(localStorage.getItem("TODOS")) || [];
console.log(todos);

const renderSavedTodos = () =>{
    todos.forEach((todo) => {
        createListElement(todo);
    });
};

renderSavedTodos();


addBtn.addEventListener("click",function(){
    if(!todoInput.value){
        alert.innerText = `Please enter an item!`;
        setTimeout(()=>{
            alert.innerText=""
        },5000);
    }
    else{
        const newTodo = {
            id: new Date().getTime(),
            completed: false,
            text: todoInput.value,
        };

        createListElement(newTodo);
        todos.push(newTodo);

        localStorage.setItem("TODOS",JSON.stringify(todos));
        console.log(todos);
        todoInput.value = "";
    }
});

function createListElement(newTodo){
    const{ id , completed , text } = newTodo;

    const li = document.createElement("li");
    li.setAttribute("id",id);
    completed && li.classList.add("checked");

    const okIcon= document.createElement("i");
    okIcon.setAttribute("class","fas fa-check");
    li.appendChild(okIcon);

    const p = document.createElement("p");
    const pTextNode = document.createTextNode(text);
    p.appendChild(pTextNode);
    li.appendChild(p);

    const deleteIcon = document.createElement("i");
    deleteIcon.setAttribute("class","fas fa-trash");
    li.appendChild(deleteIcon);

    console.log(li);

    todoUl.appendChild(li);
}
todoUl.addEventListener("click",(e)=>{
    console.log(e.target);
    const id = e.target.parentElement.getAttribute("id");
    if(e.target.classList.contains("fa-trash")){
        e.target.parentElement.remove();
        todos=todos.filter((todo)=>todo.id !==Number(id));
        localStorage.setItem("TODOS",JSON.stringify(todos));
    } else if (e.target.classList.contains("fa-check")){
        e.target.parentElement.classList.toggle("checked");
        todos.map((todo, index)=>{
            if(todo.id == id){
                todos[index].completed = !todos[index].completed;
            }
        });
        console.log(todos);
        localStorage.setItem("TODOS",JSON.stringify(todos));
    }
});

todoInput.addEventListener("keydown",(e)=>{
    if(e.code === "Enter"){
        addBtn.click();
    }
});

window.onload = function (){
    var newDate = new Date();
    today.innerText=`Today: ${newDate.getDate()}.${newDate.getMonth()+1}.${newDate.getFullYear()}`;
    todoInput.focus();
};



