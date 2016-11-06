
  angular.module('lmsApp')

    .controller('adminUsersCtrl', ['$scope', 'Users', "$firebaseObject", "$firebaseAuth", "$firebaseArray" , function($scope, Users, $firebaseObject, $firebaseAuth, $firebaseArray){

      $scope.theUsers = Users.getUsers();

      //sort and filters
      $scope.searchUsers = '';
      $scope.sortType = 'email';
      $scope.sortReverse = 'false';

      //checkbox function
      $scope.checkAll = function () {
        if ($scope.selectedAll) {
            $scope.selectedAll = true;
        } else {
            $scope.selectedAll = false;
        }
        angular.forEach($scope.theUsers, function (user) {
            user.Selected = $scope.selectedAll;
        });

      };

      $scope.deactvate = function(id) {
        Users.deactivate(id);
      }

      $scope.activate = function(id) {
        Users.activate(id);
      }

      $scope.addAdmin = function(info) {

        var authObj = $firebaseAuth();

        var ref = firebase.database().ref("/users");
        // var userInfo = $firebaseArray(ref);

        // if($scope.reg_form.$valid){


          authObj.$createUserWithEmailAndPassword(info.email, info.password)
            .then(function(result) {
              var userInfo = $firebaseObject(ref.child(result.uid));

              userInfo.utype = "admin";
              userInfo.firstname = info.fname;
              userInfo.lastname = info.lname;
              // userInfo.description = data.Description;
              userInfo.email = info.email;
              userInfo.isActive = true;
              userInfo.uid = result.uid


            userInfo.$save();

            alert("New admin created!");


        }).catch(function(e) {
            $scope.load = false;
            if (e.code === "auth/email-already-in-use") {
                alert(e.message);
            }else {
              alert(e.message);
            }
        })

      // }
    }



    }]);
