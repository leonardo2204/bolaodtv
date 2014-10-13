'use strict';

angular.module('bolaoDtvApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'pasvaz.bindonce',
  'infinite-scroll'
  ])
.config(function ($routeProvider, $locationProvider, $httpProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'partials/main',
    controller: 'MainCtrl'
  })
  .when('/login', {
    templateUrl: 'partials/login',
    controller: 'LoginCtrl'
  })
  .when('/signup', {
    templateUrl: 'partials/signup',
    controller: 'SignupCtrl'
  })
  .when('/settings', {
    templateUrl: 'partials/settings',
    controller: 'SettingsCtrl',
    authenticate: true
  })
  .when('/bolao', {
    templateUrl: 'partials/bolao',
    controller: 'BolaoCtrl',
    authenticate: true
  })
  .when('/times', {
    templateUrl: 'partials/times',
    controller: 'TimesCtrl',
    authenticate: true,
    admin : true
  })
  .when('/partidas', {
    templateUrl: 'partials/partidas',
    controller: 'PartidasCtrl',
    authenticate: true,
    admin : true
  })
  .when('/ranking', {
    templateUrl: 'partials/ranking',
    controller: 'RankingCtrl'
  })
  .when('/regulamento', {
    templateUrl: 'partials/regulamento',
    controller: 'RegulamentoCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });

  $locationProvider.html5Mode(true);

    // Intercept 401s and redirect you to login
    $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
      return {
        'responseError': function(response) {
          if(response.status === 401) {
            $location.path('/login');
            return $q.reject(response);
          }
          else {
            return $q.reject(response);
          }
        }
      };
    }]);
  })
.run(function ($rootScope, $location, Auth) {

    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {

      if (next.authenticate && !Auth.isLoggedIn()) {
        $location.path('/login');
      }


      if(next.admin && !Auth.isAdmin()){
        $location.path('/');
        $q.reject();
      }

    });
  });