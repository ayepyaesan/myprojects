//UI

//add new task button
const addtask=document.querySelector('.addtasks');
const addbtn=document.querySelector('.addbtn');
const addbox=document.querySelector('.add');
const todoul=document.querySelector('.todos');
const formel=document.querySelector('form');
const tasks=document.querySelector('.tasks');
const searchbox=document.querySelector('.search');

addbtn.addEventListener('click',()=>{
    addtask.classList.toggle('active');
    addbox.focus();
});


const todos=JSON.parse(localStorage.getItem('todos'));
// console.log(todos);
if(todos){
    todos.forEach(todo=>addtodo(todo));
}
formel.addEventListener('submit',(e)=>{
    addtodo();
    e.preventDefault();
});


function addtodo(todo){
    let todotext=addbox.value;
    if(todo){
        todotext=todo.text;
    }

    if(todotext){
        const li=document.createElement('li');
        if(todo && todo.complete){
            //add class
            // console.log(todo.complete);
            li.classList.add('completed');
        }
        li.appendChild(document.createTextNode(todotext));
        todoul.appendChild(li);
        addbox.value='';
        updatelocalstorage();

        li.addEventListener('click',()=>{
            li.classList.toggle('completed');
            updatelocalstorage();
        });
        li.addEventListener('contextmenu',(e)=>{
            if(confirm('Are you sure?')){
                li.remove();
            }
            updatelocalstorage();
            e.preventDefault();
        });
        // li.addEventListener('dblclick',(e)=>{
        //     let txtarea=document.createElement('textarea');
        //     txtarea.classList.add('maintxt');
        //     li.classList.add('hidden');
        //     todoul.appendChild(txtarea);
        //
        //     e.preventDefault();
        //
        // })
    }else{
        // window.alert('Enter your todo');
    }
}

function updatelocalstorage(){

    const todolis=document.querySelectorAll('li');
    let todos=[];
    todolis.forEach(todoli=>{
        todos.push({
            text:todoli.innerText,
            complete:todoli.classList.contains('completed')
        });
    });

    localStorage.setItem('todos',JSON.stringify(todos));
    let completeli=document.querySelectorAll('.completed');
    // console.log(completeli.length);
    let taskstogo=todos.length - completeli.length;
    console.log(taskstogo);
    if(taskstogo <= 1){
        tasks.innerHTML=`${taskstogo} task to go`;
    }else{
        tasks.innerHTML=`${taskstogo} tasks to go`;
    }
}

searchbox.addEventListener('keyup',(e)=>filtertask(e.target.value));

function filtertask(task){
    const todolis=document.querySelectorAll('li');
    todolis.forEach(todoli=>{
        if(todoli.innerText.toLocaleLowerCase().includes(task.toLowerCase())){
            todoli.classList.remove('hide');
        }else{
            todoli.classList.add('hide');
        }
    })
}

let date=new Date();
let weekday=date.getDay();
let weekdays=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Sunday'];
// console.log(weekdays[weekday].toUpperCase());

let day=date.getDate();
// console.log(day);

let month=date.getMonth();
let months=['January','February','March','April','May','June','july','August','September','October','November','December'];
// console.log(months[month].toUpperCase());

let subdate=document.querySelector('.subdate');
subdate.innerText=`${weekdays[weekday].toUpperCase()} , ${months[month].toUpperCase()} ${day}`;