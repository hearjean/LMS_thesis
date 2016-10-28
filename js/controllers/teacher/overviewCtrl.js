angular.module('lmsApp')
.controller( 'overviewCtrl', ['$scope', 'Todo', 'Events', '$firebaseArray',function($scope, Todo, Events, $firebaseArray) {


  Todo.setUID(firebase.auth().currentUser.uid);
  $scope.theEvents = Events.getEvents();

  $scope.theTodos = Todo.getTodos(firebase.auth().currentUser.uid);
//the modal and edit modal
  $scope.getAnnouncement=function(ann) {
    $scope.selectedPost = ann;
    
  };

  $scope.addTodos = function(task) {
    task.deadline = Math.floor(task.deadline/1000);
    Todo.addTodo(task);
    $scope.task = {desc: null};
  };

  $scope.deleteTodo = function(id) {
    Todo.removeTodo(id);
  };



//   var obj = $firebaseObject(ref);
// obj.foo = "bar";
// obj.$save().then(function(ref) {
//   ref.key === obj.$id; // true
// }, function(error) {
//   console.log("Error:", error);
// });



  function display_ann(){
    var currentTeacher = firebase.auth().currentUser.uid;
    var ref = firebase.database().ref('schedule');
    var query = ref.orderByChild("Teacher").startAt(currentTeacher).endAt(currentTeacher);

    return $firebaseArray(query);
  }

  $scope.theAnnouncements = display_ann();


}]);
