myApp.controller('LoginCtrl', ['$scope', '$window', '$location', 'UserAuthFactory', 'AuthenticationFactory',
function($scope, $window, $location, UserAuthFactory, AuthenticationFactory) {
	$scope.user = {
		username: '',
		password: ''
	};
	$scope.login = function() {

		var username = $scope.user.username,
		password = $scope.user.password;
		if (username !== undefined && password !== undefined) {
			alert("Este el primer alert "+username+" "+password);
			UserAuthFactory.login(username, password).success(function(data) {
				AuthenticationFactory.isLogged = true;
				AuthenticationFactory.user = data.user.username;
				AuthenticationFactory.userRole = data.user.role;
				alert("Este es el tercer alert "+data.user.username+" "+data.user.role);
				$window.sessionStorage.token = data.token;
				$window.sessionStorage.user = data.user.username; // to fetch the user details on refresh
				$window.sessionStorage.userRole = data.user.role; // to fetch the user details on refresh
				$location.path("/");
			}).error(function(status) {
			alert('Nombre de usuario y/o contraseña incorrectos');
			});
		} else {
		alert('Invalid credentials');
		}
	};
}
]);