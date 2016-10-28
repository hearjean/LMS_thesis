angular.module('lmsApp')
  .controller('AssignmentCtrl', ['$scope', 'Assignment', '$routeParams', '$location',function($scope, Assignment, $routeParams, $location){

  var id = $routeParams.id;

  $scope.saveAss = function(a, id){
    a.deadline = Math.floor(a.deadline/1000);
    a.timecreated = Math.floor(Date.now()/1000);
    console.log(a.deadline);
    Assignment.addAss(a);
    $location.path('/teacher/assignment');
  };

  var datetime = new Date();
  $scope.dateNow = datetime;

  $scope.classID = $routeParams.id;
}]);
