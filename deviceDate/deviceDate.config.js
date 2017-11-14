(function() {
  'use strict';

  angular
    .module('myapp.deviceDate')
    .config(configure);

  /* @ngInject */
  function configure(c8yViewsProvider) {
    c8yViewsProvider.when('/device/:deviceId', {
      name: '维修日志',
      icon: 'book',
      priority: 0,
      templateUrl: ':::PLUGIN_PATH:::/views/deviceDate.html',
      controller: 'deviceDateCtrl'
    });
  }
}());
