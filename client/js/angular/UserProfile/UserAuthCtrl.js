var userAuthModule = angular.module('UserAuth');
userAuthModule.controller('UserAuthController', ['$scope', 'UserAuthManager', function ($scope, userAuthManager) {
	$scope.manager = userAuthManager;
	userAuthManager.getTagline();
	$scope.tagline = userAuthManager.tagline;
}]);