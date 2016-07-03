(function(){
			angular.module('myApp', ['bootstrapSubmenu']);

			angular.module('myApp')
				.controller('menuController', function($scope){
					$scope.menuItems = [
					{ display: 'Home', href: 'index.html', children: []},
					{ display: 'About Us', href: 'about.html', children: []},
					{ display: 'Courses', href: '#', children: [
						{ display: 'Fitness', href: '#', children: [
															{ display: 'Zumba', href: 'courses.html', children: []},
															{ display: 'Exercise', href: '#', children: []},
															{ display: 'Aerobics', href: '#', children: []}
						]},
						{ display: 'Dance', href: '#', children: []},

						{ display: 'Music', href: '#', children: []},

						{ display: 'Cooking', href: '#', children: [
															{ display: 'Cooking', href: '#', children: []},
															{ display: 'Baking', href: '#', children: []},
						]},

						{ display: 'Painting', href: '#', children: []},

						{ display: 'Art & Craft', href: '#', children: []},

						{ display: 'Yoga', href: '#', children: []},

						{ display: 'Photography', href: '#', children: []},

						{ display: 'Foreign Language', href: '#', children: []}


						]},
					{ display: 'Workshops', href: '#', children: []},
					{ display: 'Gallery', href: '#', children: []},
					{ display: 'Contact', href: 'contact.html', children: []}
					];
				});
		})();