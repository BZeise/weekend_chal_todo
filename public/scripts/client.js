$(onReady);

function onReady() {
  console.log('js loaded');
  $('#submitButton').on('click', submitThis);
  $('#myTable').on('click', '.deleteButton', deleteThisRow);

  getTasks();
}

// New task submitted
function submitThis() {
  console.log('submitThis clicked');
  event.preventDefault();
  if($('#taskInput').val() === '') {
    alert("WE GOTTA DO SOMETHIN'!");
  }
  else {
    var newTaskObject = {
      task: $('#taskInput').val()
    };
    $('#taskInput').val('');
    console.log('newTaskObject is: ', newTaskObject);
    saveNewTask(newTaskObject);
  }
}

function saveNewTask(newestTask){
  $.ajax({
    type: 'POST',
    url: '/tasks',
    data: newestTask,
    success: function(response){
      console.log(response);
      getTasks();
    },
    error: function(error){
      console.log('The "/task" ajax post request failed with error: ', error);
    }
  });
}

function getTasks(){
  $.ajax({
    type: 'GET',
    url: '/tasks',
    success: function(tasksData){
      displayTasks(tasksData);
    },
    error: function(error){
      console.log('The "/tasks" ajax get request failed with error: ', error);
    }
  });
}

function displayTasks(taskThings){
  $('tbody').empty();
  for(var i = 0; i < taskThings.length; i++){
    var newRow = $('<tr>');
    newRow.data('taskId', taskThings[i].user_id);
    newRow.append('<td>' + taskThings[i].task + '</td>');
    // needs a complete button here
    // also needs an if statement to check if true, and toggleClass #completed
    newRow.append('<td>' + taskThings[i].complete + '</td>');
    //needs a a delete button here
    newRow.append('<td> <button class="deleteButton">Delete</button> </td>');
    $('tbody').append(newRow);
  }
}

function deleteThisRow() {
  console.log('deleteThisRow function called');
  console.log($(this));
  console.log($(this).parent().parent());
  console.log($(this).parent().parent().taskId);
  // $.ajax({
  //   type: 'POST',
  //   url: '/delete',
  //   data: newestTask,
  //   success: function(response){
  //     console.log(response);
  //     getTasks();
  //   },
  //   error: function(error){
  //     console.log('The "/delete" ajax post request failed with error: ', error);
  //   }
  // });
}
