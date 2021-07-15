let add_task = document.getElementById("add_task"); 


function deleteTask(index){
    tasksJsonArrStr = localStorage.getItem("tasksJson"); 
    task_json_arr = JSON.parse(tasksJsonArrStr);
    task_json_arr.splice(index, 1); 
    localStorage.setItem("tasksJson", JSON.stringify(task_json_arr));
    updateTasks();
}

function clearList(){
    if (confirm("Are you sure you want to clear the list?")){
        localStorage.clear(); 
        updateTasks();
    }
}

function updateTasks(){
    // Display tasks in the table 
    let table_body = document.getElementById("table_body"); 
    let task_details = ""; // empty string at first

    if (localStorage.getItem("tasksJson") == null){
        task_json_arr = []; 
        localStorage.setItem("tasksJson", JSON.stringify(task_json_arr));
    }
    else{
        tasksJsonArrStr = localStorage.getItem("tasksJson"); 
        task_json_arr = JSON.parse(tasksJsonArrStr);
    }
    
    task_json_arr.forEach((element, index) => {
        task_details +=    `
            <tr>
                <th scope="row">${index+1}</th>
                <td>${element[0]}</td>
                <td>${element[1]}</td>
                <td><button class="btn btn-primary btn-sm" onclick=deleteTask(${index})>Delete</button></td>
            </tr>
        `
    });

    table_body.innerHTML = task_details;    
}

function getAndUpdateTasks(){

    task_title = document.getElementById("task_title").value;
    task_description = document.getElementById("task_description").value;

    if (task_title.split(" ").join("") == "" || task_title == null){
        alert("Task title can't be empty");
        return false; 
    }
    
    if (localStorage.getItem("tasksJson") == null){
        task_json_arr = []; 
        task_json_arr.push([task_title, task_description]); 
        localStorage.setItem("tasksJson", JSON.stringify(task_json_arr));
    }
    else{
        tasksJsonArrStr = localStorage.getItem("tasksJson"); 
        task_json_arr = JSON.parse(tasksJsonArrStr);
        task_json_arr.push([task_title, task_description]);;
        localStorage.setItem("tasksJson", JSON.stringify(task_json_arr));
    }
    
    updateTasks(); 
}

add_task.addEventListener("click", getAndUpdateTasks);
updateTasks();
