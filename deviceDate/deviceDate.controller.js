(function() {
	'use strict';

	angular
		.module('myapp.deviceDate')
		.controller('deviceDateCtrl', DeviceDateController);
	/* @ngInject */
	function DeviceDateController($scope, $routeParams, c8yDevices, c8yAlert) {
		$scope.form={};
		$scope.form.show=false;
		$scope.regex=/^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d)(:|：)[0-5]\d$/;
		$scope.open = function() {
			$scope.form.show=!$scope.form.show;
		}
		function load() {
			$scope.now = moment().format('YYYY-MM-DD HH:mm');
			c8yDevices.detail($routeParams.deviceId).then(function(res) {
				var equip = res.data;
				if(equip.diary == undefined) {
					equip.diary = new Array;
				}
				$scope.diary = equip.diary;
				$scope.name = equip.name;
				return equip;
			}).then(c8yDevices.update);
		}
		function save() {
			c8yDevices.detail($routeParams.deviceId).then(function(res1) {
				var time = document.getElementById('time');
				var device = res1.data
				if(Array.isArray(device.diary)) {
					device.diary.push({
						'component': $scope.component,
						'cause': $scope.cause,
						'startTime': time.value,
						'duration': $scope.duration,
						'opeartion': $scope.opeartion,
						'people': $scope.people
					})
				}
				return device;
			}).then(c8yDevices.update).then(onSave).then(load);
		}
		function onSave() {
			c8yAlert.success('维修日志成功保存！');
			$scope.component = undefined;
			$scope.cause = undefined;
			$scope.duration = undefined;
			$scope.opeartion = undefined;
			$scope.people = undefined;
		}
		$scope.save = save;
		$scope.device = {};
		load();
	}
}());