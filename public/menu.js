(function(){
			var module = angular.module('myApp', ['bootstrapSubmenu','ngRoute','ngSanitize']);

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
			                when('/videos/:param', {
			                    templateUrl: 'videosView.html',
			                    controller: 'VideoController'
			                }).
			                when('/:param', {
			                    templateUrl: 'coursesView.html',
			                    controller: 'TrainerController'
			                }).
			                otherwise({
			                    redirectTo: '/'
			                });
			        }]);

			module.config(function($sceProvider) {
			  $sceProvider.enabled(false);
			});

			module.controller("RouteController", function($scope,$routeParams,$http) {
					//nothing to do as of now
			});

			module.controller("VideoController", function($scope,$routeParams,$http) {
					$scope.param = $routeParams.param;
					var parameter = $scope.param;
					console.log('Video param ' + parameter);

					

					$scope.url = "https://www.youtube.com/embed/oOZ5CYlK5yA";

					//$scope.explicitlyTrustedUrl = $sce.trustAsUrl($scope.url);

					$scope.trainerVideoData = [
									    {
											"_id": "577a9a8f6acad2113441cd90",
											"Name": "First Name",
											"videos": [{
												"id": "https://www.youtube.com/embed/oOZ5CYlK5yA"
											}, {
												"id": "https://www.youtube.com/embed/ha1269QWpJM"
											}, {
												"id": "https://www.youtube.com/embed/oOZ5CYlK5yA"
											}]
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

			module.controller("TrainerController", function($scope,$routeParams,$http) {
					$scope.param = $routeParams.param;
					var parameter = $scope.param;
					console.log('param ' + parameter);

					$scope.trainerData = [
									    {
									      "_id":"577a9a8f6acad2113441cd90",
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
									    	"_id":"577a9a8f6acad2113441cd90",
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
									    	"_id":"577a9a8f6acad2113441cd90",
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
									    	"_id":"577a9a8f6acad2113441cd90",
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