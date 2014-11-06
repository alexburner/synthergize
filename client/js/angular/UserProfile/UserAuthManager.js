var userAuthModule = angular.module('UserAuth', []);
userAuthModule.factory('UserAuthManager', [function () {
	var managerInstance;

	//Private Variables
	var tagLinePrivate = "Get Tagline from private manager"
	managerInstance = {
		tagline: "",

		getTagline: function () {
			this.tagline = tagLinePrivate;
		}
	};
	return managerInstance;
}]);