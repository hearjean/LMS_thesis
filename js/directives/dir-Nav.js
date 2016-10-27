angular.module('lmsApp')

.directive('dirNav', ['$location', 'LoggedInUser', '$firebaseAuth' , function($location, LoggedInUser, $firebaseAuth) {


  var linker = function(scope) {
    var id = firebase.auth().currentUser.uid;

    userTypeData = LoggedInUser.getUsertype();

    if (userTypeData == "student") {
      scope.utypePath = "#/student_page";
    }else if (userTypeData == "teacher") {
      scope.utypePath = "#/teacher/home";
    }

    console.log(scope.utypePath);

    scope.logOutUser = function() {
      firebase.auth().signOut();
      console.log("signing out");
      $location.path('/');

      firebase.auth().onAuthStateChanged(function(user) {
       if (!user) {
         $location.path('/');
        }
      });

    }

    scope.newPass = function(pass) {

      var user = firebase.auth().currentUser;

      user.updatePassword(pass).then(function() {
        console.log(pass)
      }, function(error) {
        console.log(error);
      });
    }

    scope.location = function(href) {
      return href.substr(1) === $location.url();
    };

    // scope.utype_dash;
    // scope.utypePath;
    (function typeToPath() {
      // userTypeData = LoggedInUser.getUsertype();
      //
      // if (userTypeData == "student") {
      //   scope.utypePath = "#/student_page";
      // }else if (userTypeData == "teacher") {
      //   scope.utypePath = "#/teacher/home";
      // }
      //
      // console.log(scope.utypePath);
    })()
    //
    // function setUtype_Path(path) {
    //   scope.utypePath = path;
    // }


    function getNewPath() {
      return utypePath;
    }

    scope.$watch('utypePath', function() {

    });

    scope.path = '#/profile/' + id;
    scope.name = firebase.auth().currentUser.displayName;
    scope.userid = id;

    // scope.NotifNum = 3;

  }




  return {
    restrict: 'A',
    templateUrl: 'components/partials/navbar.html',
    link: linker
  };

}]);
