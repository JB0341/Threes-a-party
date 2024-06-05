// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) ?? 0;
const taskDisplayEl = $('#task-display');
const taskFormEl = $('#task-form');
const taskTitleInput = $('#task-title');
const taskDescriptionInput = $('#task-description');
const taskDueDateInput = $('#task-due-date');
// Todo: create a function to generate a unique task id
function generateTaskId() {
    if (!nextId) {
        nextId === 1;
    } else {
        nextId++;
    }

}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = $('<div class="task card mb-3">');
    const titleEl = $('<h3>').text(task.title);
    const cardDeleteBtn = $('<button>')
        .addClass('btn btn-danger delete')
        .text('Delete')
        .attr('data-task-id', task.id);
    cardDeleteBtn.on('click', handleDeleteTask);

    const today = dayjs(dayjs().format('MM/DD/YYYY'), 'MM/DD/YYYY');
    const taskDueDate = dayjs(task.dueDate, 'MM/DD/YYYY');


    if (today.isAfter(taskDueDate)) taskCard.addClass('bg-danger');
    if (today.isSame(taskDueDate)) taskCard.addClass('bg-warning');


    $('#todo-cards').append(taskCard);
    return taskCard;
}
// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    for (let task of taskList) {
        createTaskCard(task);
    }
    $(function () {
        $("#todo-cards").draggable();
    });
}

// Todo: create a function to handle adding a new task
function handleAddTask() {
    if (!taskList) {
        taskList = [];
    }
    task = {
        title: $('#title').val().trim(),
        date: $('#dueDate').val().trim(),
        description: $('#description').val().trim(),
        id: nextId
    }
    taskList.push(task);

    localStorage.setItem('tasks', JSON.stringify(taskList));


    renderTaskList();
}

// Todo: create a function to handle deleting a task
function handleDeleteTask() {
    const taskId = $(this).attr('todo-cards');
    const tasks = readProjectsFromStorage();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const tasks = readTasksFromStorage();
    const taskId = ui.draggable[0].dataset.projectId;
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();

    $('#add-task').on('click', handleAddTask);

    $('#task-due-date').datepicker({
        changeMonth: true,
        changeYear: true,
    });



    $('.lane').droppable({
        drop: function( event, ui ) {
            $(this).addClass( "ui-state-highlight" )
        }
    });
});
