'use strict';

angular.module('bolaoDtvApp')
.controller('NavbarCtrl', function ($scope, $location,$window, Auth) {
 
  $scope.login = function (form) {
    $scope.submitted = true;

    if (form.$valid) {
      Auth.login({
        email: $scope.user.email,
        password: $scope.user.password
      })
      .then(function () {
                        // Logged in, redirect to home
                        $window.location = '/';
                      })
      .catch(function (err) {
        err = err.data;
        $scope.errors.other = err.message;
      });
    }
  };

  
  $scope.logout = function() {
    Auth.logout()
    .then(function() {
      $location.path('/login');
    });
  };
  
  $scope.isActive = function(route) {
    return route === $location.path();
  };
});
