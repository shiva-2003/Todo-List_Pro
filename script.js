const input_Txt=document.getElementById("input-txt")
const add_Btn=document.getElementById("add_btn")
const todo_List=document.getElementById("todo-list")

let editTodo=null;

const addtodo=(e)=>{
    e.preventDefault()

    let inputText=input_Txt.value.trim()
    if(inputText.length<=0){
        alert("write something");
        return false
    }

    if(add_Btn.innerText==="EDIT"){
        editTodo.querySelector("p").innerText=inputText
        editLocalTodos(editTodo.originalText, inputText)
        add_Btn.innerText="Add";
        input_Txt.value="";
        editTodo=null;
        return;
    }
    
    //creating the li>p
    const li=document.createElement("li");
    const p=document.createElement("p");
    p.innerHTML=inputText;
    li.appendChild(p)

    //creating the edit-btn
    const edit_btn=document.createElement("button")
    edit_btn.classList.add("edit-btn")
    edit_btn.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>`;
    li.appendChild(edit_btn)


    //creating the del-btn
    const del_btn=document.createElement("button")
    del_btn.classList.add("delete-btn")
    del_btn.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>`;
    li.appendChild(del_btn)

    

    todo_List.insertAdjacentElement("afterbegin",li)
    input_Txt.value=""
    
    saveLocalTodos(inputText)
}

const updatetodo=(e)=>{
    if(e.target.closest(".delete-btn")){
        const li=e.target.closest("li")
        todo_List.removeChild(li)
        delLocalTodos(li)
    }

    if(e.target.closest(".edit-btn")){        //e.target rep the exact element that was clicked && the closet() checks if the clicked element has .edit-btn or it closest parent has .edit-btn.
        const li=e.target.closest("li")
        const taskText=li.querySelector("p").innerText

        input_Txt.value=taskText;
        input_Txt.focus();
        add_Btn.innerText="EDIT"

        editTodo=li;
        editTodo.originalText=taskText;
    }
}

const saveLocalTodos=(todo)=>{
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[]
    }else{
        todos=JSON.parse(localStorage.getItem("todos"))
    }
   
    todos.push(todo)
    console.log(todos);
    localStorage.setItem("todos",JSON.stringify(todos))
    
}

const getLocalTodos=()=>{
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[]
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
        todos.forEach((todo) => {
          //creating the li>p
          const li = document.createElement("li");
          const p = document.createElement("p");
          p.innerHTML = todo;
          li.appendChild(p);

          //creating the edit-btn
          const edit_btn = document.createElement("button");
          edit_btn.classList.add("edit-btn");
          edit_btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>`;
          li.appendChild(edit_btn);

          //creating the del-btn
          const del_btn = document.createElement("button");
          del_btn.classList.add("delete-btn");
          del_btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>`;
          li.appendChild(del_btn);

          todo_List.insertAdjacentElement("afterbegin", li);
        });
    }
}

const delLocalTodos=(todo)=>{
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[]
    }else{
        todos=JSON.parse(localStorage.getItem("todos"))
    }
    let todoText=todo.children[0].innerHTML;
    let todoTxtIndx=todos.indexOf(todoText)
    todos.splice(todoTxtIndx,1)
    localStorage.setItem("todos",JSON.stringify(todos))
    console.log(todoTxtIndx);
    
    
    
}

const editLocalTodos=(originalText,newText)=>{
    let todos=JSON.parse(localStorage.getItem("todos"));
    let indxOfTodos=todos.indexOf(originalText);
    if(indxOfTodos !== -1){
        todos[indxOfTodos]=newText;
        localStorage.setItem("todos",JSON.stringify(todos));
    }
}

document.addEventListener("DOMContentLoaded",getLocalTodos)
add_Btn.addEventListener('click',addtodo);
todo_List.addEventListener('click',updatetodo);

