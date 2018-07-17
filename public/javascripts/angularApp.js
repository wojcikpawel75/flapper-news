var app=angular.module('flapperNews',['ui.router']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider,$urlRouterProvider) {
	$stateProvider.state('home',{
		url: '/home',
		templateUrl: '/home.html',
		controller: 'MainCtrl'
	});
	$stateProvider.state('posts',{
		url: '/posts/{id}',
		templateUrl: '/posts.html',
		controller: 'PostsCtrl'
	});
	$urlRouterProvider.otherwise('home');
}]);

app.factory('postsFactory', function(){
var _posts = [
		{title: 'post 1', upvotes: 5, link: '', comments: [{author: 'Bili', body: 'Good post', upvotes: 0}]},
		{title: 'post 2', upvotes: 2, link: '', comments: [{author: 'Joe', body: 'Excelent post', upvotes: 0}]},
		{title: 'post 3', upvotes: 15, link: '', comments: [{author: 'Bob', body: 'Poor post', upvotes: 0}]},
		{title: 'post 4', upvotes: 9, link: '', comments: [{author: 'Alice', body: 'Avarage post', upvotes: 0}]},
		{title: 'post 5', upvotes: 4, link: '', comments: [{author: 'Joanna', body: 'Bad post', upvotes: 0}]}
		];
var service = {};
service.getPosts = function() {
	return _posts;
}
service.setPosts = function(posts) {
	_posts = posts;
}
return service;
});

app.controller('MainCtrl', [
'$scope','postsFactory',
function($scope,postsFactory) {
	$scope.posts = postsFactory.getPosts();
	$scope.addPost = function() {
		if(!$scope.title || $scope.title === '') {return;}
		$scope.posts.push({
			title: $scope.title || 'New post',
			link: $scope.link,
			upvotes: 0,
			comments: [
				{author: 'Joe', body: 'Cool post!', upvotes: 0},
				{author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
			]
		});
		$scope.title = '';
		$scope.link = '';
	};
	$scope.incrementUpvotes = function(post) {
		post.upvotes += 1;
	};
}]);

app.controller('PostsCtrl', [
'$scope','$stateParams','postsFactory',
function($scope,$stateParams,postsFactory) {
	$scope.post = postsFactory.getPosts()[$stateParams.id];
	$scope.incrementUpvotes = function(comment) {
		comment.upvotes += 1;
	};
	$scope.addComment = function() {
		if(!$scope.body || $scope.body === '') { return; }
		$scope.post.comments.push({
			body: $scope.body,
			author: 'user',
			upvotes: 0
		});
		$scope.body = '';
	};
}]);

app.controller('SecondCtrl', [
'$scope','postsFactory',
function($scope,postsFactory) {
	$scope.posts = postsFactory.getPosts();
	$scope.incrementUpvotes = function(post) {
		post.upvotes += 1;
	};
}]);