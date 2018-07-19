var app=angular.module('app.components.auth',['ui.router']);

app.config(AuthConfig);

function AuthConfig($stateProvider,$httpProvider) {
	'ngInject';
	
	$stateProvider.state('login',{
		url: '/login',
		templateUrl: '/templates/auth.html',
		controller: 'AuthCtrl as $ctrl',
		title: 'Sign in'
	})
	
	.state('register',{
		url: '/register',
		templateUrl: '/templates/auth.html',
		controller: 'AuthCtrl as $ctrl',
		title: 'Sign up'
	});
};

app.controller('AuthCtrl', [
'User','$state',
function(User, $state) {
	this._User = User;
	this.currentUser = this._User.current ? this._User.current.email : '';
	this.title = $state.current.title;
	this.authType = $state.current.name;
	this.submitForm = function() {
		this.isSubmitting = true;
		this.errors = {};
		this._User.attemptAuth(this.authType, this.formData).then(
			(res) => {
				this.isSubmitting = false;
				console.log(res);
				this.currentUser = res.data.user.email;
			},
			(err) => {
				this.isSubmitting = false;
				this.errors = err.data.errors;
			}
		);
	}
	this.signOut = function () {
		this._User.current = null;
		this.currentUser = null;
	}
}]);

app.constant('AppConstants',{api: "https://conduit.productionready.io/api"});

class User {
  constructor(AppConstants, $http) {
    'ngInject';
    this._AppConstants = AppConstants;
    this._$http = $http;
    this.current = null;
  }
  attemptAuth(type, credentials) {
    let route = (type === 'login') ? '/login' : '';
    return this._$http({
      url: this._AppConstants.api + '/users' + route,
      method: 'POST',
      data: {
        user: credentials
      }
    }).then(
      (res) => {
        this.current = res.data.user;
        return res;
      }
    );
  }
}

app.service('User', User);