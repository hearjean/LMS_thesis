angular.module('lmsApp')
  .controller('teacherUploadsCtrl', ['$scope', '$location', 'File', '$firebaseArray', '$firebaseObject', '$routeParams',function($scope, $location, File, $firebaseArray, $firebaseObject, $routeParams){

    $scope.classID = $routeParams.id;

    //for uploads delete
    // $scope.getUploads=function(upl) {
    //   $scope.selectedupl = upl;
    //     //$scope.edited= upl.cont;
    // };

    $scope.uploads = getResources();
    function getResources(){
      var currentTeacher = firebase.auth().currentUser.uid;
      var ref = firebase.database().ref('users/' + currentTeacher + "/classFiles");

     $firebaseArray(ref).$loaded()
     .then(function(result) {
       $scope.files = result;
     });
    }


    $scope.deleteFile = function(id) {
      console.log(id);
      var currentTeacher = firebase.auth().currentUser.uid;
      var ref = firebase.database().ref('users/' + currentTeacher + "/classFiles");
      var object = $firebaseObject(ref.child(id));
      object.$remove();
    };


}]);
