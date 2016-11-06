
  angular.module('lmsApp')

    .controller('adminScheduleCtrl', ['$scope', 'Schedule', 'Users' , 'Subjects', 'Section','uibButtonConfig', function($scope, Schedule, Users, Subjects, Section, uibButtonConfig){

      $scope.theSchedule = Schedule.getSched();
      $scope.theTeachers = Users.getUsers();
      $scope.theSubjects = Subjects.getSubjects();
      $scope.theSections = Section.getSection();
      $scope.toggleAdd = true;
      uibButtonConfig.activeClass = 'btn-primary';

      //sort and filters
      $scope.searchSchedule = '';
      $scope.sortType = 'Section';
      $scope.sortReverse = 'false';

      //checkbox function
      // $scope.checkAll = function () {
      //   if ($scope.selectedAll) {
      //       $scope.selectedAll = true;
      //   } else {
      //       $scope.selectedAll = false;
      //   }
      //   angular.forEach($scope.theSchedule, function (sched) {
      //       sched.Selected = $scope.selectedAll;
      //   });
      //
      // };

      // $scope.setTeacher = function(teacherInfo) {
      //   console.log(teacherInfo);
      // };

      $scope.deactivate = function(id) {
        Schedule.deactivate(id);
      }

      $scope.activate = function(id) {

        Schedule.activate(id);
      }

      $scope.Days ={
        mon: false,
        tue: true,
        wed: false,
        thu: false,
        fri: false
      }
      $scope.sched = {
        Section: null
      };

      $scope.insertSched = function(data) {
        var yearNow = new Date().getFullYear();
        var yearNext = yearNow + 1;
        // set times to millisecond format
        data.timeStart = data.timeStart.getTime();
        data.timeEnd = data.timeEnd.getTime();
        data.isActive = true;
        data.SY = String(yearNow) + " - " + String(yearNext) ;

        Schedule.addSched(data);
        Schedule.addTeacherSched(data.Teacher, data);

        $scope.toggleAdd = !$scope.toggleAdd;
        $scope.sched = null;
        $scope.schedForm.$setPristine();
        $scope.schedForm.$setUntouched();
      }





    }]);
