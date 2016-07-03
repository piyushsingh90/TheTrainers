(function(){
			angular.module('myApp', ['bootstrapSubmenu']);

			angular.module('myApp')
				.controller('menuController', function($scope){
					$scope.menuItems = [
					{ display: 'Home', href: 'index.html', children: []},
					{ display: 'About Us', href: 'about.html', children: []},
					{ display: 'Courses', href: '#', children: [
						{ display: 'Fitness', href: '#', children: [
						{ display: 'Yoga', href: 'courses.html', children: []},
						{ display: 'Zumba', href: '#', children: []}
						]},
						{ display: 'Cooking', href: '#', children: []}
						]},
					{ display: 'Workshops', href: '#', children: []},
					{ display: 'Gallery', href: '#', children: []},
					{ display: 'Contact', href: 'contact.html', children: []}
					];
				});
		})();