// selectors
const todoInput = document.querySelector(".todo-input")
const todoButton = document.querySelector(".todo-button")
const todoList = document.querySelector(".todo-list")
const filterOption = document.querySelector(".filter-todo")

// event listeners

document.addEventListener("DOMContentLoaded", getTodos())
todoButton.addEventListener("click", addTodo)
todoList.addEventListener("click", deleteCheck)
filterOption.addEventListener("click", filterTodo)
// functions

function addTodo(event){
    // prevents form from submitting
    event.preventDefault()
    // console.log("hi")

    // todo div
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")
    // create an LI
    const newTodo = document.createElement("li")
    newTodo.innerText = todoInput.value
    
    newTodo.classList.add("todo-item")
    todoDiv.appendChild(newTodo)

    // add todo to local storage
    saveLocalTodos(todoInput.value)
    // add a completed button
    const completedButton = document.createElement("button")
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add("completedButton")
    todoDiv.appendChild(completedButton)

    // add a deleted button
    const trashButton = document.createElement("button")
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add("trashButton")
    todoDiv.appendChild(trashButton)

    // append to list
    todoList.appendChild(todoDiv)

    // Clear field value of the input
    todoInput.value = ""
}


function deleteCheck(event){
    const item = event.target
    const todo = item.parentElement
    // console.log(item)
    

    if (item.classList[0] ==="completedButton"){
        todo.classList.toggle("completedTask")
    }

    if (item.classList[0] ==="trashButton"){
        // run animation
        // todo.completedButton.style.transition = "0.6s"
        // document.getElementsByClassName("completedButton").style["transition"] = "0.6"
        
        todo.classList.add("fade-delete")
        removeLocalTodos(todo)
                
        // when animation is done
        todo.addEventListener('transitionend', function detect_end(event){
            // this makes sure that the todo element is deleted after the fade delete is exectuted

            // this finds the last element of the classlist which will always be fade-delete!
            if(event.path[0].classList[event.path[0].classList.length - 1] === "fade-delete"){
                todo.remove()
            }
        })
    }
}


// understand why spaces in the ul section confuses this set
function filterTodo(event){
    const todos = todoList.childNodes
 
    todos.forEach(function(todo){
        console.log(event.target.value)
        console.log(todo.classList.contains("completedTask"))

        switch(event.target.value){
            case "all":
                todo.style.display = "flex"
                break
            case "completed":
                if (todo.classList.contains("completedTask")){
                    todo.style.display = "flex"
                }else{
                    todo.style.display = "none"
                }
                break
            case "waiting":
                
                if (!todo.classList.contains("completedTask")){
                    todo.style.display = "flex"
                }else{
                    todo.style.display = "none"
                }
                break
        }
    })
}

// ***************************************************
// ***************************************************
// ***************************************************
// ***************************************************
// study this section way more in depth
// ***************************************************
// ***************************************************
// ***************************************************
// ***************************************************
function saveLocalTodos(todo){
    // check if there is already a downloaded todo

    let todos
    if(localStorage.getItem("todos") === null){
        todos = []
    } else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos))
}

function getTodos(){
    let todos
    if(localStorage.getItem("todos") === null){
        todos = []
    } else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    todos.forEach(function(todo){

        // todo div
        const todoDiv = document.createElement("div")
        todoDiv.classList.add("todo")
        // create an LI
        const newTodo = document.createElement("li")
        newTodo.innerText = todo
        
        newTodo.classList.add("todo-item")
        todoDiv.appendChild(newTodo)

        // add a completed button
        const completedButton = document.createElement("button")
        completedButton.innerHTML = '<i class="fas fa-check"></i>'
        completedButton.classList.add("completedButton")
        todoDiv.appendChild(completedButton)

        // add a deleted button
        const trashButton = document.createElement("button")
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add("trashButton")
        todoDiv.appendChild(trashButton)

        // append to list
        todoList.appendChild(todoDiv)

    })

}

function removeLocalTodos(todo){
    let todos
    if(localStorage.getItem("todos") === null){
        todos = []
    } else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    // console.log(todos.indexOf(todo.children[0].innerText))
    todos.splice(todos.indexOf(todo.children[0].innerText),1)
    localStorage.setItem("todos",JSON.stringify(todos))
}