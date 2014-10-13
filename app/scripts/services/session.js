'use strict';

angular.module('bolaoDtvApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
