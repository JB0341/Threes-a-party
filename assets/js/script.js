// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));
// Todo: create a function to generate a unique task id
function generateTaskId() {
if (!nextId) {
    nextId === 1;
} else {
    nextId++
}


}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCardEl = $('<div class="task card mb-3 p-3">');
    const titleEl = $('<h3>').text(task.title);
    const dueDateEl = $('<div>').text(task.dueDate);
    const descriptionEl = $('<div>').text(task.description);

    const today = dayjs(dayjs().format('MM/DD/YYYY'), 'MM/DD/YYYY');
    const isDue = dayjs(task.dueDate, 'MM/DD/YYYY');



    if (today.isAfter(isDue)) taskCardEl.addClass('bg-danger');
    if (today.isSame(isDue)) taskCardEl.addClass('bg-warning');


    $('#todo-cards').append(taskCardEl);
    taskCardEl.append(titleEl, dueDateEl, descriptionEl);
}
// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    for (let task of taskList) {
        createTaskCard(task);
    }
    $(function () {
        $(".card").draggable({
            zIndex: 100,
        });
    });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();

    if (!taskList) {
        taskList = [];
    }

    const task = {
        title: $('#title').val().trim(),
        dueDate: $('#dueDate').val().trim(),
        description: $('#description').val().trim(),
    }
    taskList.push(task);

    localStorage.setItem('tasks', JSON.stringify(taskList));


    renderTaskList();
}

// Todo: create a function to handle deleting a task


// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    console.log(event.target);
    console.log(ui.draggable);
    $(event.target).children().eq(0).append($(ui.draggable));
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();

    $("#add-task").on('submit', handleAddTask);

    $('.lane .card-body').droppable({
        drop: handleDrop,
        accept: ".card",
        activeClass: "ui-state-highlight",
    });
});
$('#dueDate').datepicker({
    changeMonth: true,
    changeYear: true,
});