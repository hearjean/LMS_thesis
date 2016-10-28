angular.module('lmsApp')
.controller('take_quizCtrl', ['$scope', 'Questions', 'Answers','$routeParams','$location', "$firebaseObject", function ($scope, Questions, Answers, $routeParams, $location, $firebaseObject) {

  $scope.questions = Questions.getQuestions($routeParams.id);
  var questions = $scope.questions;

  $scope.answer = [];


  $scope.checkMC = function() {

    //compare each number answered with answer key
    var answerList = [];
    for (var i = 0; i < questions.q.length; i++) {

      var correct;
      if (questions.q[i].choice[0] === $scope.answer[i]){
        correct = true;
      } else {
        correct = false;
      }

      answerList.push({
        "question": questions.q[i].quest,
        "answered": $scope.answer[i],
        "correct": correct
      });
    }


    var counter = 0;
    for (var i = 0; i < answerList.length; i++) {
      if (answerList[i].correct === true) {
        counter++
      }
    }


    //insert into quiz collection
    var answers = {
      "student": firebase.auth().currentUser.uid,
      "score": counter
    };
    Questions.addAnswered(answers,questions.$id);

    var subjectRef = firebase.database().ref("schedule");
    $firebaseObject(subjectRef).$loaded().then(function(result) {
      var idReference = questions.q_subjectID;
      answerList.subject_name = result[idReference].Subject;
    }).then(function() {
      //insert to student's account
      answerList.submitted = Math.floor(Date.now()/1000);
      answerList.subject = questions.q_subjectID;
      answerList.quiz = questions.$id;
      answerList.quiz_name = questions.q_title;
      answerList.score = counter;
      answerList.total = answerList.length;
      Answers.addDone(answerList);

      alert("your score is: " + counter + '/' + answerList.length);
      $location.path('student_page');
    });



  }

  $scope.checkTF =function() {

    //compare each number answered with answer key
    var answerList = [];
    for (var i = 0; i < questions.q.length; i++) {

      var correct;
      if (questions.q[i].answer === $scope.answer[i]) {
        correct = true;
      } else {
        correct = false;
      }

      answerList.push({
        "question": questions.q[i].quest,
        "answered": $scope.answer[i],
        "correct": correct
      });
    }

    var counter = 0;
    for (var i = 0; i < answerList.length; i++) {
      if (answerList[i].correct === true) {
        counter++
      }
    }

    //insert into quiz collection
    var answers = {
      "student": firebase.auth().currentUser.uid,
      "score": counter
    };
    Questions.addAnswered(answers,questions.$id);

    var subjectRef = firebase.database().ref("schedule");
    $firebaseObject(subjectRef).$loaded().then(function(result) {
      var idReference = questions.q_subjectID;
      answerList.subject_name = result[idReference].Subject;
    }).then(function() {
      //insert to student's account
      answerList.submitted = Math.floor(Date.now()/1000);
      answerList.subject = questions.q_subjectID;
      answerList.quiz = questions.$id;
      answerList.quiz_name = questions.q_title;
      answerList.score = counter;
      answerList.total = answerList.length;
      Answers.addDone(answerList);

      alert("your score is: " + counter + '/' + answerList.length);
      $location.path('student_page');
    });

  }

}])
