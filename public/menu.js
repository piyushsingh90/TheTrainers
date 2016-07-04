(function(){
			var module = angular.module('myApp', ['bootstrapSubmenu','ngRoute']);

			module.config(['$routeProvider',
			        function($routeProvider) {
			            $routeProvider.
			            	when('/', {
			                    templateUrl: 'indexView.html',
			                    controller: 'RouteController'
			                }).
			                when('/index', {
			                    templateUrl: 'indexView.html',
			                    controller: 'RouteController'
			                }).
			                when('/about', {
			                    templateUrl: 'aboutView.html',
			                    controller: 'RouteController'
			                }).
			                when('/contact', {
			                    templateUrl: 'contactView.html',
			                    controller: 'RouteController'
			                }).
			                when('/videos', {
			                    templateUrl: 'videosView.html',
			                    controller: 'RouteController'
			                }).
			                when('/:param', {
			                    templateUrl: 'coursesView.html',
			                    controller: 'RouteController'
			                }).
			                otherwise({
			                    redirectTo: '/'
			                });
			        }]);

			module.controller("RouteController", function($scope,$routeParams) {
					$scope.param = $routeParams.param;
					console.log('param ' + $scope.param);
    		});


			module.controller('menuController', function($scope){
					$scope.menuItems = [
					{ display: 'Home', href: '#/index', children: []},
					{ display: 'About Us', href: '#/about', children: []},
					{ display: 'Courses', href: '#', children: [
						{ display: 'Fitness', href: '#', children: [
															{ display: 'Zumba', href: '#/zumba', children: []},
															{ display: 'Exercise', href: '#/exercise', children: []},
															{ display: 'Aerobics', href: '#/aerobics', children: []}
						]},
						{ display: 'Dance', href: '#/dance', children: []},

						{ display: 'Music', href: '#/music', children: []},

						{ display: 'Cooking', href: '#', children: [
															{ display: 'Cooking', href: '#/cooking', children: []},
															{ display: 'Baking', href: '#/baking', children: []},
						]},

						{ display: 'Painting', href: '#/painting', children: []},

						{ display: 'Art & Craft', href: '#/artAndCraft', children: []},

						{ display: 'Yoga', href: '#/yoga', children: []},

						{ display: 'Photography', href: '#/photography', children: []},

						{ display: 'Foreign Language', href: '#/foreignLanguage', children: []}


						]},
					{ display: 'Workshops', href: '#', children: []},
					{ display: 'Gallery', href: '#', children: []},
					{ display: 'Contact', href: '#/contact', children: []}
					];
				});
		})();