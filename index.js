let body = document.querySelector("body");
let h1 = document.querySelector("h1");
let bodyContainer = document.querySelector(".container");
let taskFormContainer = document.querySelector(".form-container");
let taskList = document.querySelector(".task-list");
let addTaskButton = document.querySelector("#add-task-button");
let toDoInputBar = document.querySelector("#to-do-input-bar");
let toggleSwitch = document.querySelector(".checkbox-slider");
let darkMode = localStorage.getItem('darkMode');

function addNewTask() {

    const taskCard = document.createElement("div");
    taskCard.classList.add('card');
    taskList.appendChild(taskCard);
    
    const taskCardBody = document.createElement("div");
    taskCardBody.classList.add("card-body");
    
    const taskCardBodyP = document.createElement("p");
    taskCardBodyP.classList.add("card-body-p");

    const taskCardBodyButtonContainer = document.createElement("div");

    const completeButton = document.createElement("button");
    completeButton.classList.add("btn");
    completeButton.classList.add("btn-outline-secondary");
    const completeButtonIcon = document.createElement("span");
    completeButton.setAttribute("id", "task-card-body-button1");
    completeButtonIcon.classList.add("material-symbols-outlined");
    completeButtonIcon.innerText = "done";
    completeButton.appendChild(completeButtonIcon);

    completeButton.addEventListener("click", (ev) => {
        ev.preventDefault();
        taskCard.remove();
    })
    
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn");
    deleteButton.classList.add("btn-outline-secondary");
    const deleteButtonIcon = document.createElement("span");
    deleteButton.setAttribute("id", "task-card-body-button2");
    deleteButtonIcon.classList.add("material-symbols-outlined");
    deleteButtonIcon.innerText = "delete_forever";
    deleteButton.appendChild(deleteButtonIcon);

    deleteButton.addEventListener("click", (ev) => {
        ev.preventDefault();
        taskCard.remove();
    });

    const editButton = document.createElement("button");
    editButton.classList.add("btn");
    editButton.classList.add("btn-outline-secondary");
    const editButtonIcon = document.createElement("span");
    editButton.setAttribute("id", "task-card-body-button3");
    editButtonIcon.classList.add("material-symbols-outlined");
    editButtonIcon.innerText = "edit";
    editButton.appendChild(editButtonIcon);

    editButton.addEventListener("click", (ev) => {
        ev.preventDefault();

        if(taskCardBodyP.attributes.contentEditable === undefined || taskCardBodyP.attributes.contentEditable === "false"){
            taskCardBodyP.setAttribute("contentEditable", "true");
            taskCardBodyP.style.border = "2pt solid orange";
            taskCardBodyP.style.borderRadius = "4px";
        }

        taskCardBody.addEventListener("click", (ev) => {
            ev.preventDefault();

            let clickedElement = ev.target

            if(clickedElement === taskCardBody){
                taskCardBodyP.removeAttribute("contenteditable");
                taskCardBodyP.style.border = "none";
            } 
        })

        taskFormContainer.addEventListener("click", (ev) => {
            ev.preventDefault();

            let clickedElement = ev.target

            if(clickedElement === taskFormContainer){
                taskCardBodyP.removeAttribute("contenteditable");
                taskCardBodyP.style.border = "none"
            } 
        })
    })

    taskCard.appendChild(taskCardBody);
    taskCardBody.appendChild(taskCardBodyP);
    
    taskCardBodyP.innerText = toDoInputBar.value;

    addDBItem();
    
    taskCardBody.appendChild(taskCardBodyButtonContainer);
    taskCardBodyButtonContainer.appendChild(completeButton);
    taskCardBodyButtonContainer.appendChild(deleteButton);
    taskCardBodyButtonContainer.appendChild(editButton);

}
 
function errorAlert() {
    swal({
        title: "Whoops!",
        text: "Make sure the input value is not blank!",
    });
}

addTaskButton.addEventListener("click", (ev) => {
    ev.preventDefault();
    if(toDoInputBar.value != ""){
        addNewTask();     
        toDoInputBar.value = "";
    } else {
        errorAlert();
    }
})

const enableDarkMode = () => {
    body.classList.add('dark-mode');
    
    localStorage.setItem('darkMode', 'enabled');
}

const disableDarkMode = () => {
    body.classList.remove('dark-mode');
    
    localStorage.setItem('darkMode', null);
}

toggleSwitch.addEventListener("click", (ev) => {

    darkMode = localStorage.getItem('darkMode');
    
    if(darkMode === 'enabled'){
        disableDarkMode();
        h1.style.color = "black";

    } else if(darkMode === 'null'){
        enableDarkMode();
        h1.style.color = "white";
    }
})


function addDBItem() {
    try{
        db.collection('to-do-items').add({
            task: `${toDoInputBar.value}`
        });
    } catch(err){
        console.log(err)
    }
}

function removeDBItem(items) {
    try{
        let taskId = items.getAttribute("data-id");
        db.collection("to-do-items").doc(taskId).delete()
    } catch(err){
        console.log(err)
    }
}

function updateDBItem(items, taskCardBodyP) {
    try{
        let taskId = items.getAttribute("data-id");
        db.collection("to-do-items").doc(taskId).update({task: items.innerText})
    } catch(err){
        console.log(err)
    }
}

function renderItem(item) {
        const taskCard = document.createElement("div");
        taskCard.classList.add('card');
        taskList.appendChild(taskCard);

        const taskCardBody = document.createElement("div");
        taskCardBody.classList.add("card-body");
    
        const taskCardBodyP = document.createElement("p");
        taskCardBodyP.setAttribute("data-id", `${item.id}`);
        taskCardBodyP.classList.add("card-body-p");

        const taskCardBodyButtonContainer = document.createElement("div");

        const completeButton = document.createElement("button");
        completeButton.classList.add("btn");
        completeButton.classList.add("btn-outline-secondary");
        
        const completeButtonIcon = document.createElement("span");
        completeButton.setAttribute("id", "task-card-body-button1");
        completeButtonIcon.classList.add("material-symbols-outlined");
        completeButtonIcon.innerText = "done";
        completeButton.appendChild(completeButtonIcon);

        completeButton.addEventListener("click", (ev) => {
            ev.preventDefault();
            taskCard.remove();
            removeDBItem(taskCardBodyP);
        })
    
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("btn");
        deleteButton.classList.add("btn-outline-secondary");
        const deleteButtonIcon = document.createElement("span");
        deleteButton.setAttribute("id", "task-card-body-button2");
        deleteButtonIcon.classList.add("material-symbols-outlined");
        deleteButtonIcon.innerText = "delete_forever";
        deleteButton.appendChild(deleteButtonIcon);

        deleteButton.addEventListener("click", (ev) => {
            ev.preventDefault();
            taskCard.remove();
            removeDBItem(taskCardBodyP);
        });

        const editButton = document.createElement("button");
        editButton.classList.add("btn");
        editButton.classList.add("btn-outline-secondary");
        const editButtonIcon = document.createElement("span");
        editButton.setAttribute("id", "task-card-body-button3");
        editButtonIcon.classList.add("material-symbols-outlined");
        editButtonIcon.innerText = "edit";
        editButton.appendChild(editButtonIcon);

        editButton.addEventListener("click", (ev) => {
            ev.preventDefault();

            if(taskCardBodyP.attributes.contentEditable === undefined || taskCardBodyP.attributes.contentEditable === "false"){
                taskCardBodyP.setAttribute("contentEditable", "true");
                taskCardBodyP.style.border = "2pt solid orange";
                taskCardBodyP.style.borderRadius = "4px";
            }

            taskCardBody.addEventListener("click", (ev) => {
                ev.preventDefault();

                let clickedElement = ev.target

                if(clickedElement === taskCardBody){
                    taskCardBodyP.removeAttribute("contenteditable");
                    taskCardBodyP.style.border = "none";
                } 

                updateDBItem(taskCardBodyP)
            })

            taskFormContainer.addEventListener("click", (ev) => {
                ev.preventDefault();

                let clickedElement = ev.target

                if(clickedElement === taskFormContainer){
                    taskCardBodyP.removeAttribute("contenteditable");
                    taskCardBodyP.style.border = "none"
                } 

                updateDBItem(taskCardBodyP)
            })
        })

        taskCard.appendChild(taskCardBody);
        taskCardBody.appendChild(taskCardBodyP);
        
        taskCardBodyP.innerText = item.data().task;
    
        taskCardBody.appendChild(taskCardBodyButtonContainer);
        taskCardBodyButtonContainer.appendChild(completeButton);
        taskCardBodyButtonContainer.appendChild(deleteButton);
        taskCardBodyButtonContainer.appendChild(editButton);
}

db.collection('to-do-items').get().then((snapshot) => {
    snapshot.docs.forEach((doc) => {
        renderItem(doc);
    })
})
