
function createVariables(id,type, selector) {
    var value = type === 'id' ? document[selector](id) : document[selector](id)[0];
    function make() {
        return value;
    }
    return make();
}

var taskInput = createVariables("new-task",'id','getElementById');
var addButton = createVariables("button",'tag','getElementsByTagName');
var incompleteTasksHolder = createVariables("incomplete-tasks",'id','getElementById');
var completedTasksHolder = createVariables("completed-tasks",'id','getElementById');

window.onload = function() {
    if(localStorage.getItem("list") && JSON.parse(localStorage.getItem("list")).length > -1){
        let list = JSON.parse(localStorage.getItem("list"));
        list.forEach(element => {
            getLocalStorageTasks(element);
        });
    }
  }

var createNewTaskElement = function (taskString, arr) {
    listItem = document.createElement("li");
    checkBox = document.createElement("input");
    label = document.createElement("label");
    editInput = document.createElement("input");
    editButton = document.createElement("button");
    deleteButton = document.createElement("button");

    checkBox.type = "checkbox";
    editInput.type = "text";
    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";
    label.innerText = taskString;

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
};

var getLocalStorageTasks = function (value) {
    var listItemName = value 
    listItem = createNewTaskElement(listItemName)
    incompleteTasksHolder.appendChild(listItem)
    bindTaskEvents(listItem, taskCompleted)
};

var addTask = function () {
    if(taskInput.value){
        taskInput.removeAttribute('required');
    var listItemName = taskInput.value
    listItem = createNewTaskElement(listItemName)
    incompleteTasksHolder.appendChild(listItem)
    bindTaskEvents(listItem, taskCompleted)
    taskInput.value = "";
    setTasksToLocalStorage(listItemName, "add")
    } else {
        taskInput.setAttribute('required',true);
    }
};

var setTasksToLocalStorage = function(listItemName, type, currentValue) {
    if(localStorage.getItem("list") && JSON.parse(localStorage.getItem("list")).length > -1){
        let getvalues = JSON.parse(localStorage.getItem("list"));
        if(type === 'delete' && getvalues.includes(listItemName)){
            getvalues.splice(getvalues.indexOf(listItemName),1);
        } else if(type === 'edit' && getvalues.includes(currentValue)){
            getvalues[getvalues.indexOf(currentValue)] = listItemName;
        }
        else {
        let addValues = getvalues.push(listItemName);
        }
        localStorage.setItem("list", JSON.stringify(getvalues));
    } else {
        let value = [listItemName]
        localStorage.setItem("list", JSON.stringify(value));
    }
}

var editTask = function () {
    var listItem = this.parentNode;
    var editInput = listItem.querySelectorAll("input[type=text")[0];
    var label = listItem.querySelector("label");
    var button = listItem.getElementsByTagName("button")[0];

    var containsClass = listItem.classList.contains("editMode");
    if (containsClass) {
        setTasksToLocalStorage(editInput.value, 'edit', label.innerText)
        label.innerText = editInput.value
        button.innerText = "Edit";
    } else {
        editInput.value = label.innerText
        button.innerText = "Save";
    }

    listItem.classList.toggle("editMode");
};

var deleteTask = function (el) {
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    ul.removeChild(listItem);
    setTasksToLocalStorage(listItem.getElementsByTagName("label")[0].textContent, 'delete')
};

var taskCompleted = function (el) {
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
};

var taskIncomplete = function () {
    var listItem = this.parentNode;
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
};

var bindTaskEvents = function (taskListItem, checkBoxEventHandler, cb) {
    var checkBox = taskListItem.querySelectorAll("input[type=checkbox]")[0];
    var editButton = taskListItem.querySelectorAll("button.edit")[0];
    var deleteButton = taskListItem.querySelectorAll("button.delete")[0];
    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
};

addButton.addEventListener("click", addTask);

for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}