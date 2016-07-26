  angular.module('lmsApp', [

    'ngRoute',
    'ngAnimate',
    'angularCSS',
    'oc.lazyLoad',
    'firebase'
  ]);


  angular.module('lmsApp')
    .config(function($routeProvider, $locationProvider){
      $routeProvider
        .when('/', {
          title: 'STC Learning Management System',
          templateUrl: 'view/home.html',
          css: 'style/home.css'
        })

        .when('/home', {
          title: 'STC Learning Management System',
          templateUrl: 'view/home.html',
          css: 'style/home.css'
        })

        .when('/profile', {
          title: 'Profile',
          templateUrl: 'view/studentProfile.html',
          css: 'style/profile.css',
          resolve: {
                 lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({files: ['js/controllers/studentProfileCtrl.js']});
                 }]
              }
        })

        .when('/about', {
          title: 'About Us',
          templateUrl: 'view/about.html',
          css: [
            {href: 'style/home.css', preload: true},
            {href: 'style/aboutus.css', preload: true}
          ]
        })

        .when('/signup', {
          title: 'Sign Up',
          templateUrl: 'view/signup.html',
          css: 'style/signup.css',
          controller: 'signupCtrl',
          resolve: {
                 lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({files: ['js/controllers/signupCtrl.js']});
                 }]
              }
        })

        .when('/class_dashboard', {
          title: 'Manage your class',
          templateUrl: 'view/classDash/classDash.html',
          css: ['style/classDash/component.css', 'style/classDash/default.css', 'style/classDash/Sample.css'],
          resolve: {
                 lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({files: ['lib/modernizr.custom.js', 'lib/classie.js']});
                 }]
              }
        })

        .when('/class_dashboard/class_recordList', {
          title: 'Manage your class',
          templateUrl: 'view/classDash/classRecord.html',
          css: ['style/classDash/component.css', 'style/classDash/default.css', 'style/classDash/Sample.css'],
          resolve: {
                 lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({files: ['lib/classie.js', 'lib/modernizr.custom.js' ]});
                 }]
              }
        })

        .when('/class_dashboard/class_recordThumb', {
          title: 'Manage your class',
          templateUrl: 'view/classDash/classRecord2.html',
          css: ['style/classDash/component.css', 'style/classDash/default.css', 'style/classDash/Sample.css'],
          // 'style/classDash/classThumb.css'
          resolve: {
                 lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({files: ['lib/classie.js', 'lib/modernizr.custom.js' ]});
                 }]
              }
        })

        .when('/class_dashboard/resources', {
          title: 'View your resources',
          templateUrl: 'view/classDash/classResources.html',
          css: ['style/classDash/component.css', 'style/classDash/default.css', 'style/classDash/Sample.css'],
          // 'style/classDash/classThumb.css'
          resolve: {
                 lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({files: ['lib/modernizr.custom.js', 'lib/classie.js']});
                 }]
              }
        })

        .when('/group', {
          title: 'Your Groups',
          templateUrl: 'view/group.html',
          css: [
            {href:'style/group.css', preload: true},
            {href:'style/profile.css', preload: true}
          ]
        })

        .when('/forum_home', {
          title: 'Latest Forum Topics',
          templateUrl: 'view/forum_home.html',
          css: [
            {href: 'style/forum/forum_home.css', preload: true},
            {href:'style/profile.css', preload: true}
          ]
        })

        .when('/forum_post', {
          title: 'Forum',
          templateUrl: 'view/forum_post.html',
          css: [
            {href: 'style/forum/forum_post.css', preload: true},
            {href:'style/profile.css', preload: true}
          ]
        })

        .otherwise({
          redirectTo: '/'
        });

      // $locationProvider.html5Mode(true);
    });


  angular.module('lmsApp')
  .run(['$rootScope', function($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {

      if (current.hasOwnProperty('$$route')) {

          $rootScope.title = current.$$route.title;
      }

    });
  }]);


  var lmsApp=angular.module('lmsApp',[]);

    // create angular controller
    // lmsApp.factory();
    lmsApp.controller('signupCtrl', function($scope, $firebaseArray){


      $scope.firstname = "Franchette";
      $scope.lastname = "Camoro";
      $scope.email = "nicole@yahoo.com"
      $scope.Gend = "female";
      $scope.scrtQuestion1 = "Mother's maiden name";
      $scope.scrtans1 = "Geniza Sotto";
      $scope.scrtQuestion2 = "Favorite color";
      $scope.scrtans2 = "Blue";
      $scope.utype = "student";
      $scope.username = "xyronna";
      $scope.password = "Franchette";
      $scope.ConfPass = "Franchette";

      // var ref = firebase.database().ref();
      // $scope.data = $firebaseArray(ref);


      try {
        var ref = firebase.database().ref("/users");
        var syncObj = $firebaseObject(ref);
        syncObj.$bindTo($scope, "data");

        console.log('Everything\'s (I think) ok!');
      } catch (e) {
        console.log('Something\'s wrong! ');
      }

      // function to submit the form
      $scope.submitForm = function(){
        // check to make sure the form is completely valid
        if($scope.reg_form.$valid){
          console.log("Submit clicked!");

          // $scope..add({
          //   firstname: $scope.firstname;
          // });


        }
      };


    });

angular.module('lmsApp', [])

.controller('studentProfileCtrl', function($scope, $http) {
  getTask(); // Load all available tasks
  function getTask(){
  $http.post("ajax/getTask.php").success(function(data){
        $scope.tasks = data;
       });
  };
  $scope.addTask = function (task) {
    $http.post("ajax/addTask.php?task="+task).success(function(data){
        getTask();
        $scope.taskInput = "";
      });
  };
  $scope.deleteTask = function (task) {
    if(confirm("Are you sure to delete this line?")){
    $http.post("ajax/deleteTask.php?taskID="+task).success(function(data){
        getTask();
      });
    }
  };

  $scope.toggleStatus = function(item, status, task) {
    if(status=='2'){status='0';}else{status='2';}
      $http.post("ajax/updateTask.php?taskID="+item+"&status="+status).success(function(data){
        getTask();
      });
  };

});