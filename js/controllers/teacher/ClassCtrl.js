angular.module('lmsApp')
  .controller('ClassCtrl', ['$scope', 'Class', '$location', function($scope,Class, $location){

//search
  $scope.searchClass = '';
  $scope.DspClass = Class.getClass();
  $scope.id = firebase.auth().currentUser;



}])
