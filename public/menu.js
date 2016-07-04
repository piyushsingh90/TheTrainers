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
			                    controller: 'TrainerController'
			                }).
			                otherwise({
			                    redirectTo: '/'
			                });
			        }]);

			module.controller("RouteController", function($scope,$routeParams,$http) {
					//nothing to do as of now
			});

			module.controller("TrainerController", function($scope,$routeParams,$http) {
					$scope.param = $routeParams.param;
					var parameter = $scope.param;
					console.log('param ' + parameter);

					$scope.trainerData = [
									    {
									      "Name": "First Name",
									      "Fees": "Rs 4000",
									      "serviceType": "music",
									      "openToWorkshops": "Yes",
									      "area": "Madhapur",
									      "privateOrGroup":"private",
									      "languages":"hindi,english",
									      "place":"Yours",
									      "noOfClasses":"4",
									      "image":"trainer1.jpg"
									    },
									    {
									      "Name": "Second Name",
									      "Fees": "Rs 5000",
									      "serviceType": "music",
									      "openToWorkshops": "No",
									      "area": "hitech",
									      "privateOrGroup":"group",
									      "languages":"bengali,english",
									      "place":"Mine",
									      "noOfClasses":"7",
									      "image":"trainer2.jpg"
									    },
									    {
									      "Name": "Third Name",
									      "Fees": "Rs 6000",
									      "serviceType": "dance",
									      "openToWorkshops": "Yes",
									      "area": "Gachibowli",
									      "privateOrGroup":"private",
									      "languages":"telugu,english",
									      "place":"Yours",
									      "noOfClasses":"0",
									      "image":"trainer3.jpg"
									    },
									    {
									      "Name": "Fourth Name",
									      "Fees": "Rs 0",
									      "serviceType": "Pata Nhi",
									      "openToWorkshops": "Yes",
									      "area": "Begupet",
									      "privateOrGroup":"private",
									      "languages":"spanish,english",
									      "place":"Yours",
									      "noOfClasses":"4",
									      "image":"trainer4.jpg"
									    }
									  ];

					if(parameter !== undefined){
						console.log(parameter);
						$http.get("/trainer/"+ parameter)
						    .then(function(response) {
						        console.log('success '+ JSON.stringify(response));
						        $scope.content = response.data;
						    }, function(response) {
						        console.log('error '+ response);
						        $scope.content = "Something went wrong";
						    });
					}
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