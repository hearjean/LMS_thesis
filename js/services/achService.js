angular.module('lmsApp')

.factory('Achievement',['$firebaseArray', "$firebaseObject", function($firebaseArray, $firebaseObject){

  function addAchievment(score, total, details) {
    if (score === total) {
      console.log(achObj);
      var achRef = firebase.database().ref("users").child(firebase.auth().currentUser.uid).child("achievements");
      var achObj = $firebaseArray(achRef);
      console.log("achievements");
      details.date = Math.floor(Date.now()/1000);
      achObj.$add(details);
    }
  };


  return{
    addAchievment: addAchievment
  }


}]);
