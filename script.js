const input=document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const list=document.getElementById('todo-list');
let tasks=JSON.parse(localStorage.getItem('tasks'))||[];
function renderTasks(){
    list.innerHTML='';
    tasks.forEach((task,index)=>{
        const li=document.createElement('li');
        li.textContent=task;
        const delBtn=document.createElement('button');
        delBtn.textContent='Delete';
        delBtn.onclick=()=>{
            tasks.splice(index,1);
            updateLocalStorage();
            renderTasks();
        };
        li.appendChild(delBtn);
        list.appendChild(li);
    });
}
function updateLocalStorage(){
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
addBtn.onclick=()=>{
    const task=input.value.trim();
    if(task){
        tasks.push(task);
        updateLocalStorage();
        renderTasks();
        input.value='';
    }
};
renderTasks();
