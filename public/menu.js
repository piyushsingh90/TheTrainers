(function(){
			var module = angular.module('myApp', ['bootstrapSubmenu','ngRoute','ngSanitize','ngAnimate','ui.bootstrap']);

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
			                when('/videos/:param1/:param2', {
			                    templateUrl: 'videosView.html',
			                    controller: 'VideoController'
			                }).
			                when('/Workshop', {
			                    templateUrl: 'workshopView.html',
			                    controller: 'WorkShopController'
			                }).
			                when('/:param', {
			                    templateUrl: 'coursesView.html',
			                    controller: 'TrainerController'
			                }).
			                when('/filter/:param1/:param2', {
			                    templateUrl: 'coursesView.html',
			                    controller: 'FilterController'
			                }).
			                otherwise({
			                    redirectTo: '/'
			                });
			        }]);

			module.config(function($sceProvider) {
			  $sceProvider.enabled(false);
			});

			module.run(function ($rootScope, $location,$route, $timeout) {

			    $rootScope.config = {};
			    $rootScope.config.app_url = $location.url();
			    $rootScope.config.app_path = $location.path();
			    $rootScope.layout = {};
			    $rootScope.layout.loading = false;

			    $rootScope.$on('$routeChangeStart', function () {
			        //show loading gif
			        $timeout(function(){
			          $rootScope.layout.loading = true;          
			        });
			    });
			    $rootScope.$on('$routeChangeSuccess', function () {
			        //hide loading gif
			        $timeout(function(){
			          $rootScope.layout.loading = false;
			        }, 200);
			    });
			    $rootScope.$on('$routeChangeError', function () {

			        //hide loading gif
			        $rootScope.layout.loading = false;

			    });
			});

			module.controller("WorkShopController", function($scope,$routeParams,$http) {
					$scope.workshops = [];
                    $http.get("/workshop")
                        .then(function(response) {
                        console.log(response.data);
                        $scope.workshops = response.data;
                    }, function(response) {
                        console.log('error '+ response);
                        $scope.workshop = "Something went wrong";
                    });

			});

			


			module.controller("RouteController", function($scope,$routeParams,$http) {
					$scope.myInterval = 10000;
					  $scope.noWrapSlides = false;
					  $scope.active = 0;
					  var slides = $scope.slides = [];
					  var currIndex = 0;

					  slides.push({
					      image: 'assets/images/slides/banner.jpg',
					      id: currIndex++
					    });

			});

			module.controller("FilterController", function($scope,$routeParams,$http) {
					$scope.param1 = $routeParams.param1;
					$scope.param2 = $routeParams.param2;
					console.log('Filter '+ $scope.param2 +' by ' + $scope.param1);
			});

			module.controller("VideoController", function($scope,$routeParams,$http,$uibModal, $log,$httpParamSerializerJQLike) {
					$scope.subCategory = $routeParams.param1;
					$scope.id = $routeParams.param2;
					
					//var parameter = $scope.param;
					//console.log('Video param ' + parameter);
					

					$scope.trainerVideoData = [];
									    					

					if($scope.subCategory != undefined && $scope.id != undefined){
						
						$http.get("/trainer/"+ $scope.subCategory+"/"+$scope.id)
						    .then(function(response) {
						        $scope.trainerVideoData = response.data[0];
						    }, function(response) {
						        console.log('error '+ response);
						        $scope.trainerVideoData = "Something went wrong";
						    });
					}

					$scope.isCollapsed = true;



				  $scope.items = ['item1', 'item2', 'item3'];

			  	  $scope.toMobile;

				  $scope.animationsEnabled = true;

				  $scope.open = function (size) {

				    var modalInstance = $uibModal.open({
				      animation: $scope.animationsEnabled,
				      templateUrl: 'myModalContent.html',
				      controller: 'ModalInstanceCtrl',
				      size: size,
				      resolve: {
				        toMobile: function () {
				          return $scope.toMobile;
				        }
				      }
				    });

				    modalInstance.result.then(function (toMobile) {
				    	$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
				      $scope.toMobile = toMobile;
				      $log.info('you entered: ' + toMobile);
				      var msgBody = $scope.trainerVideoData;
				      msgBody.mobile = toMobile;
				      
				      $http.post('/sms',$httpParamSerializerJQLike(msgBody))
				      	.success(function(data){
				      		console.log("message successfully sent to "+toMobile);
				      		console.log(data);
				      	})
				      	.error(function(err){
				      		console.log(err);
				      	});
				    }, function () {
				      $log.info('Modal dismissed at: ' + new Date());
				    });
				  };

				  $scope.toggleAnimation = function () {
				    $scope.animationsEnabled = !$scope.animationsEnabled;
				  };

		});


			module.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, toMobile) {
				
			  console.log("toMobile "+$scope.toMobile);

			  $scope.ok = function (trainerVideoData) {
			  	$uibModalInstance.close($scope.toMobile);
			  };

			  $scope.cancel = function () {
			    $uibModalInstance.dismiss('cancel');
			  };
			});

			module.controller("TrainerController", function($scope,$routeParams,$http) {
					$scope.param = $routeParams.param;
					var parameter = $scope.param;
					$scope.trainerData = [];

					$scope.headerText = parameter.replace(/[a-z][A-Z]/g, function(str, offset) {
					    return str[0] + ' ' + str[1];
					});

					if(parameter !== undefined){
						console.log(parameter);
						$http.get("/trainer/"+ parameter)
						    .then(function(response) {
						    		$scope.trainerData = response.data;
						    }, function(response) {
						        $scope.trainerData = "Something went wrong";
						    });
					}
			});


			module.controller('menuController', function($scope){
					$scope.menuItems = [
					{ display: 'Home', href: '#/index', children: []},
					{ display: 'About Us', href: '#/about', children: []},
					{ display: 'Courses', href: '#', children: [
						{ display: 'Fitness', href: '#', children: [
															{ display: 'Yoga', href: '#/Yoga', children: []},
															{ display: 'Exercise', href: '#/Exercise', children: []},
															{ display: 'Fitness', href: '#/Fitness', children: []},
															{ display: 'Aerobics', href: '#/Aerobics', children: []},
															{ display: 'Zumba', href: '#/Zumba', children: []}
						]},

						{ display: 'Dance', href: '#', children: [
															{ display: 'Classical', href: '#/ClassicalDance', children: []},
															{ display: 'Western', href: '#/WesternDance', children: []},
															{ display: 'Zumba', href: '#/Zumba', children: []},
															{ display: 'Hip Hop', href: '#/HipHop', children: []},
															{ display: 'Other Dance', href: '#/Dance', children: []}
						]},

						{ display: 'Music', href: '#/', children: [
															{ display: 'Guitar', href: '#/Guitar', children: []},
															{ display: 'Violin', href: '#/Violin', children: []},
															{ display: 'Drums', href: '#/Drums', children: []},
															{ display: 'Others', href: '#/Music', children: []}
															
						]},

						{ display: 'Cooking', href: '#', children: [
															{ display: 'Cooking', href: '#/Cooking', children: []},
															{ display: 'Baking', href: '#/Baking', children: []}
						]},

						{ display: 'Cricket', href: '#/Cricket', children: []},

						{ display: 'Painting', href: '#/Painting', children: []},

						{ display: 'Photography', href: '#/Photography', children: []},

						{ display: 'Art', href: '#', children: [
															{ display: 'Art & Craft', href: '#/ArtAndCraft', children: []},
															{ display: 'Calligraphy', href: '#/Calligraphy', children: []},
															{ display: 'Martial Arts', href: '#/MartialArt', children: []}
						]},

						{ display: 'Foreign Language', href: '#', children: [
															{ display: 'Spanish', href: '#/Spanish', children: []},
															{ display: 'Japanese', href: '#/Japanese', children: []}
															
						]},

						{ display: 'Others', href: '#', children: [
															{ display: 'Athletics', href: '#/Athletics', children: []},
															{ display: 'Fashion', href: '#/Fashion', children: []},
															{ display: 'Embroidery', href: '#/Embroidery', children: []}
						]}

						]},
					{ display: 'Workshops', href: '#/Workshop', children: []},
					{ display: 'Contact', href: '#/contact', children: []}
					];
				});
		})();