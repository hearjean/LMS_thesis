angular.module('lmsApp')

  .controller('ResourceCtrl', ['$scope','File', '$firebaseArray', '$routeParams',function($scope, File, $firebaseArray, $routeParams){

    $scope.classID = $routeParams.id;

    $scope.fileGetter = function() {
      var file = event.target.files[0];
      File.getFile(file);
      File.setStorage("resources/", file.name);
    };

    (function() {

      var ref1 = firebase.database().ref('/schedule');
      var scheduleList1 = $firebaseArray(ref1);
      return scheduleList1.$loaded().then(function(result) {

        var schedID = result[$routeParams.id].$id;

        var newref = ref1.child(schedID).child('resources');
        var resource = $firebaseArray(newref)
        $scope.getDetails = resource;
      });
    })()


    $scope.upload = function() {
      console.log("uploading");

      File.upload().on('state_changed',
        function progress(snapshot) {
          var percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          $scope.percent = percent;
        },

        // function setRemark(a){
        //   ref.push({
        //     remark = a.cont
        //   });
        // },
        function error(error) {
          alert(error);
        },
        function success() {

          File.getURL().then(function(snapshot) {
            var data = {};
            var details = File.getFileDetails();


            data.url = snapshot;
            data.name = details.name;
            data.size = details.size;
            data.type = details.type;
            data.uploadedOn = Math.floor(Date.now()/1000);
            data.remarks = $scope.remarks;




            //insert into /schedule/resources
            var ref = firebase.database().ref('/schedule');
            var scheduleList = $firebaseArray(ref);
            scheduleList.$loaded().then(function(result) {

              var schedID = result[$routeParams.id].$id;

              var newref = ref.child(schedID).child('resources');
              var resource = $firebaseArray(newref);


              resource.$add(data);
              alert("Upload done!");
              $scope.percent = "";

              //call function to save data to user/<teacher-id>/classFiles
              // TODO: prevent duplicate uploads
              data.sched_id = schedID;
              saveToTeacher(data);
            })


          })
        }
      )
    }

    function saveToTeacher(data) {
      var user = firebase.auth().currentUser.uid;
      var ref = firebase.database().ref('users/' + user + '/classFiles');
      var userList = $firebaseArray(ref);
      userList.$add(data);
    }

}]);
