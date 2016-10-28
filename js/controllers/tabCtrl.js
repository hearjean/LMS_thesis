angular.module('lmsApp')
.controller('TabsDemoCtrl', ['$scope', 'Questions', 'Events', 'Subjects','$firebaseArray', '$firebaseObject', 'Achievement',
function ($scope, Questions, Events, Subjects,$firebaseArray, $firebaseObject, Achievement) {
  $scope.model = {
    name: 'Tabs'
  };

  //Classes tab
  var subject_list = [];
  var currentStudent =  firebase.auth().currentUser.uid;
  var ref = firebase.database().ref('users').child(currentStudent).child('classes');
  $firebaseArray(ref).$loaded().then(function(result) {
    for (var i = 0; i < result.length; i++) {
      subject_list.push(result[i].subject);
    };

    return subject_list;

  }).then(function(newRes) {
    console.log(newRes)
    getSubjectInfo(subject_list);
  });

  var class_list = [];
  function getSubjectInfo(list) {
    for (var i = 0; i < list.length; i++) {
      var schedRef = firebase.database().ref('schedule').child(list[i]);
      $firebaseObject(schedRef).$loaded().then(function(schedResult) {
        class_list.push(schedResult);
      })
    }
  // console.log(class_list);
    $scope.theSchedule = class_list;
  }


  $scope.getTeacherName = function(id) {
    var teacherRef = firebase.database().ref("users").child(id);
    var teacherInfo = $firebaseObject(teacherRef);
    teacherInfo.$loaded().then(function(result) {
      return result.firstname + " " + result.lastname;
    })

    return teacher;

  }

  $scope.theEvents = Events.getEvents();
  $scope.theQizzes = Questions.getQuizzes();

  var achRef = firebase.database().ref("users").child(firebase.auth().currentUser.uid).child("achievements");
  var achArray = $firebaseArray(achRef);
  achArray.$loaded().then(function(result) {
    $scope.Achievements = result;
  });
  // $scope.theResoures = Files.getFiles(sched.resources);
  // $scope.fies = Files.getFile();

  // $scope.theFiles = Files.displayFiles();

  //SUBMISSIONS
  (function() {
    var user_ID = firebase.auth().currentUser.uid
    var scoreRef =  firebase.database().ref('users').child(user_ID).child("answers");
    $firebaseArray(scoreRef).$loaded().then(function(result) {
      $scope.scores = result;
    });
  })();







}]);
