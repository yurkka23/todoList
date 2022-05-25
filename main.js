const addTaskBtn = document.getElementById('add-task-btn');
const taskInput = document.getElementById('description-tast');
const todosWrapper = document.querySelector('.todos-wrapper');

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let todoItemElems = [];

function Task(description){
    this.description = description;
    this.completed = false;
}

const createTemplate = (task, index) => {
    return `
    <div class="todo-item ${task.completed ? 'checked' : ''}">
        <div class="description">${task.description}</div>
            <div class="buttons">
                <input onclick="completeTask(${index})" class="btn-complete" type="checkbox" ${task.completed ? 'checked' : ''}>
                <button onclick="deleteTask(${index})" class="btn-delete">Delete</button>
            </div>
        </div>
    </div>
    `
}

const filterTasks = () => {
    const activeTasks = tasks.length && tasks.filter(item => item.completed == false);
    const completedTasks = tasks.length && tasks.filter(item => item.completed == true);
    tasks = [...activeTasks, ...completedTasks];
}

const fillHtmlList = () => {
    todosWrapper.innerHTML = "";
    if(tasks.length > 0){
        filterTasks();
        tasks.forEach((item, index) => {
            todosWrapper.innerHTML += createTemplate(item, index); 
        });
        todoItemElems = document.querySelectorAll('.todo-item');
    }
}
fillHtmlList();

const updateLocal = () =>{
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const completeTask = index => {
    tasks[index].completed = !tasks[index].completed;
    if(tasks[index].completed){
        todoItemElems[index].classList.add('checked');
    }else{
        todoItemElems[index].classList.remove('checked');
    }
    updateLocal();
    fillHtmlList();

}


const deleteTask = index => {
    todoItemElems[index].classList.add('delition');
    setTimeout(() => {
        tasks.splice(index, 1);
        updateLocal();
        fillHtmlList();
    }, 1000);
}

addTaskBtn.addEventListener('click', () => {
    tasks.push(new  Task(taskInput.value));
    updateLocal();
    fillHtmlList();
    taskInput.value = '';
})
