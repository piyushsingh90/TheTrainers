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

			


			module.controller("RouteController", function($scope,$routeParams,$http) {
					$scope.myInterval = 10000;
					  $scope.noWrapSlides = false;
					  $scope.active = 0;
					  var slides = $scope.slides = [];
					  var currIndex = 0;

					  slides.push({
					      image: 'assets/images/image-slider-1.jpg',
					      text: 'Nice image',
					      id: currIndex++
					    });

					  slides.push({
					      image: 'assets/images/image-slider-2.jpg',
					      text: 'Nice image',
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
					console.log()
					//var parameter = $scope.param;
					//console.log('Video param ' + parameter);


					$scope.trainerVideoData = [];
									    					

					if($scope.subCategory != undefined && $scope.id != undefined){
						
						$http.get("/trainer/"+ $scope.subCategory+"/"+$scope.id)
						    .then(function(response) {
						        console.log(response.data[0]);
						        console.log(response.data[1]);
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
															{ display: 'Aerobics', href: '#/Aerobics', children: []}
						]},

						{ display: 'Dance', href: '#', children: [
															{ display: 'Dance', href: '#/Dance', children: []},
															{ display: 'Zumba', href: '#/Zumba', children: []}
						]},

						{ display: 'Music', href: '#/Music', children: []},

						{ display: 'Cooking', href: '#', children: [
															{ display: 'Cooking', href: '#/Cooking', children: []},
															{ display: 'Baking', href: '#/Baking', children: []},
						]},

						{ display: 'Painting', href: '#/Painting', children: []},

						{ display: 'Art & Craft', href: '#/ArtAndCraft', children: []},

						{ display: 'Others', href: '#', children: [
															{ display: 'Photography', href: '#/Photography', children: []},
															{ display: 'Foreign Language', href: '#/ForeignLanguage', children: []},
						]}

						]},
					{ display: 'Workshops', href: '#', children: []},
					{ display: 'Gallery', href: '#', children: []},
					{ display: 'Contact', href: '#/contact', children: []}
					];
				});
		})();