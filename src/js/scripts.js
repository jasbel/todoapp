let cardTask =  document.getElementById('card_list');
let descriptionTask= document.getElementById(['descriptionTask']);
let colorTask= document.getElementById(['colorTask']);
let dateTask= document.getElementById(['dateTask']);

document.getElementById('formTask').addEventListener('submit', saveTask);

function saveTask(e) {
    const description = descriptionTask.value;
    const color = colorTask.value;
    const date = dateTask.value;
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
    
    document.getElementById('formTask').reset();
    e.preventDefault();
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

        tasksView.innerHTML += `<div class="card">
            <div class="card__check"> ${color} </div>
            <div class="card__description"> ${description} </div>
            <div class="card__date"> ${date}</div>
            <a href="#" onclick="deleteTask('${uniqID}')" class="card__delete">X</a>
            <div class="card__edit"> </div>
        </div>`;
    }
    console.log(tasks.length);
}

generateTasks();

















//obtencion de da
//generete close to card list
const cardList = document.getElementsByClassName("card");
// for (let i = 0; i < cardList.length; i++) {
//     const spanClose = document.createElement("span");
//     const txt = document.createTextNode("\u00D7");
//     spanClose.className = "close"
//     spanClose.appendChild(txt);
//     cardList[i].appendChild(spanClose)

//     const element = cardList[i];

// }

const close = document.getElementsByClassName("close")
for (let i = 0; i < close.length; i++) {
    close[i].onclick = () => {
        const divParent = this.parentElement;
        divParent.style.display = "none";
    } ;

}

const list = document.querySelector('.card-list');
list.addEventListener('click', function(ev) {
    if(ev.target.className ==='card') {
        encodeURI.target.classList.toggle('checked');
    }

}, false)

const js_button = document.querySelector("#js_button_list");
js_button.addEventListener("click", function(e) {
    const addList = document.getElementById("card_list");
    const newTask = document.createElement("div");
    newTask.classList.add('card');
    const inputValue = document.getElementById("description").value;
    const listDescription = document.createTextNode(inputValue);
    newTask.appendChild(listDescription);
    if(inputValue === '') {
        alert('Not Task ~~~');
    } else {
        addList.appendChild(newTask);
        console.log(addList);
    }

    document.getElementById("description").value = "other";

    const span = document.createElement("span");
    const txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    newTask.appendChild(span);

    for (let i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            const div = this.parentElement;
            div.style.display = "none";
            console.log(this)
        }
    }

    e.preventDefault();
}, false);

