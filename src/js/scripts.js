let cardTask =  document.getElementById('card_list');
let descriptionTask= document.getElementById(['descriptionTask']);
let colorTask= document.getElementById(['colorTask']);
let dateTask= document.getElementById(['dateTask']);

document.getElementById('formTask').addEventListener('submit', saveTask);
document.getElementById('colorTask').addEventListener('change', colorSelect);

function saveTask(e) {
    const description = descriptionTask.value;
    const color = colorTask.value;
    const date = dateTask.value;
    const todayDateValue = Date.parse(new Date());
    const dateValue = Date.parse(date);
    let dateBoolean = false;
    if (dateValue < todayDateValue ) {
        alert('fecha incorrecta, elija una fecha mayor a la de hoy');
    } else {
        dateBoolean = true;
    }
    if(description != '' && dateBoolean == true) {
        const uniqID = 'id' + (new Date()).getTime();
        let tasks;
        
        const task = {
            description,
            color,
            date,
            uniqID,
        };
        
        const getTasks = JSON.parse(localStorage.getItem('tasks'));
        
        if (getTasks === null) {
            tasks = [];
        } else {
            tasks = getTasks;
        }
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        generateTasks();
        clearForm();
        
        e.preventDefault();
    } else {
        alert('Escriba una descripcion de la tarea');
    }
}

function deleteTask(uniqID) {
    const getTasks = JSON.parse(localStorage.getItem('tasks'));
    for(let i=0; i<getTasks.length; i++) {
        if(getTasks[i].uniqID == uniqID) {
            getTasks.splice(i, 1);
        } 
    }
    localStorage.setItem('tasks', JSON.stringify(getTasks));
    generateTasks();
    
}

function generateTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const tasksView = cardTask;
    tasksView.innerHTML = '';
    for(let i=0; i<tasks.length; i++) {
        let description = tasks[i].description;
        let date = tasks[i].date;
        let color = tasks[i].color;
        let uniqID = tasks[i].uniqID;

        tasksView.innerHTML += `<div class="card" style="background-color: ${color}">
            <div class="card__check">  </div>
            <div class="card__description"> ${description} </div>
            <div class="card__date"> ${date}</div>
            <a href="#" onclick="deleteTask('${uniqID}')" class="card__delete">X</a>
            <div class="card__edit"> </div>
        </div>`;
    }
    console.log(tasks.length);
}

function clearForm() {
    document.getElementById('formTask').reset();
    document.getElementById('dateTask').valueAsDate = new Date();
}

function colorSelect() {
    colorTask.style.backgroundColor = colorTask.value;
    colorTask.style.color = 'transparent';
}

generateTasks();
clearForm();
colorSelect();








