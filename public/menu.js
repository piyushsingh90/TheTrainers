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
			                when('/videos/:param1/:param2/pics', {
			                    templateUrl: 'onlyPicsView.html',
			                    controller: 'OnlyPicsController'
			                }).
			                when('/videos/:param1/:param2/vids', {
			                    templateUrl: 'onlyVideosView.html',
			                    controller: 'VideoController'
			                }).
			                when('/videos/:param1/:param2/call', {
			                    templateUrl: 'onlyCallView.html',
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
                        $scope.workshops = response.data;
                    }, function(response) {
                        console.log('error '+ response);
                        $scope.workshop = "Something went wrong";
                    });

			});

			
	    module.controller("Email",function($scope,$routeParams,$http,$httpParamSerializerJQLike){ 		
				$scope.sendMail=function(mail){ 			
				        console.log(mail); 			
				         			
				        $http.post('/email',mail) 			
				      .success(function(data){ 			
				              console.log("mail successfully sent to Test and Train"); 			
				              console.log(data); 			
				      }) 			
				      .error(function(err){ 			
				              console.log("In error"); 			
				              console.log(err); 			
				      }); 			
					
				}; 			
	    })



			module.controller("RouteController", function($scope,$routeParams,$http) {
					$scope.myInterval = 3000;
					  $scope.noWrapSlides = false;
					  $scope.active = 0;
					  var slides = $scope.slides = [];
					  var currIndex = 0;

					  slides.push({
					      image: 'assets/images/slides/banner.jpg',
					      id: currIndex++
					    });
					  slides.push({
					      image: 'assets/images/slides/banner2.jpg',
					      id: currIndex++
					    });
					  slides.push({
					      image: 'assets/images/slides/banner3.jpg',
					      id: currIndex++
					    });
					  slides.push({
					      image: 'assets/images/slides/banner4.jpg',
					      id: currIndex++
					    });
					  slides.push({
					      image: 'assets/images/slides/banner6.jpg',
					      id: currIndex++
					    });

			});

			module.controller("FilterController", function($scope,$routeParams,$http) {
					$scope.param1 = $routeParams.param1;
					$scope.param2 = $routeParams.param2;
			});


			module.controller("VideoController", function($scope,$routeParams,$http,$uibModal, $log,$httpParamSerializerJQLike) {
					$scope.subCategory = $routeParams.param1;
					$scope.id = $routeParams.param2;
					
					$scope.trainerVideoData = [];

					if($scope.subCategory != undefined && $scope.id != undefined){
						
						$http.get("/trainer/"+ $scope.subCategory+"/"+$scope.id)
						    .then(function(response) {
						        $scope.trainerVideoData = response.data[0];

						        $scope.trainerVideoData.hasVideo = (response.data[0].videos != undefined);

						        $scope.subHeaderText = $scope.trainerVideoData.serviceType.replace(/[a-z][A-Z]/g, function(str, offset) {
								    return str[0] + ' ' + str[1];
								});		
						    }, function(response) {
						        console.log('error '+ response);
						        $scope.trainerVideoData = "Something went wrong";
						    });
					}

			  	  $scope.toMobile;

				  $scope.open = function (size) {

				    var modalInstance = $uibModal.open({
				      animation: 'true',
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
				      var msgBody = $scope.trainerVideoData;
				      msgBody.mobile = toMobile;
				      		     
				      
				      $http.post('/sms',$httpParamSerializerJQLike(msgBody))
				      	.success(function(data){
				      		console.log("message successfully sent to "+toMobile);
				      	})
				      	.error(function(err){
				      		console.log(err);
				      	});
					}, function () {
					      $log.info('Modal dismissed at: ' + new Date());
					});


				  };

		});

		module.controller("OnlyPicsController", function($scope,$routeParams,$http,$uibModal, $log,$httpParamSerializerJQLike) {
					$scope.subCategory = $routeParams.param1;
					$scope.id = $routeParams.param2;
					
					$scope.trainerVideoData = [];
					$scope.allPics = [];

					if($scope.subCategory != undefined && $scope.id != undefined){
						
						$http.get("/trainer/"+ $scope.subCategory+"/"+$scope.id)
						    .then(function(response) {
						        $scope.trainerVideoData = response.data[0];

						        $scope.trainerVideoData.hasVideo = (response.data[0].videos != undefined);

						        $scope.subHeaderText = $scope.trainerVideoData.serviceType.replace(/[a-z][A-Z]/g, function(str, offset) {
								    return str[0] + ' ' + str[1];
								});		
						    }, function(response) {
						        console.log('error '+ response);
						        $scope.trainerVideoData = "Something went wrong";
						    });

						$http.get("/images/"+$scope.id)
						    .then(function(response) {
						    	console.log(response.data);
						        $scope.allPics = response.data;
						   		
						    }, function(response) {
						        console.log('error '+ response);
						        $scope.allPics = "Something went wrong";
						    });
					}

		});


			module.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, toMobile) {
				
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
						{ display: 'Physical Activity', href: '#/PhysicalActivity', children: []},

						{ display: 'Dance', href: '#/Dance', children: []},

						{ display: 'Music', href: '#/Music', children: []},

						{ display: 'Cooking', href: '#/Cooking', children: []},

						{ display: 'Photography', href: '#/Photography', children: []},

						{ display: 'Art & Craft', href: '#/ArtAndCraft', children: []},

						{ display: 'Foreign Language', href: '#/ForeignLanguage', children: []},

						{ display: 'Others', href: '#', children: [
															{ display: 'Fashion', href: '#/Fashion', children: []},
															{ display: 'Computer', href: '#/Computer', children: []},
															{ display: 'Calligraphy', href: '#/Calligraphy', children: []}
						]}

						]},
					{ display: 'Workshops', href: '#/Workshop', children: []},
					{ display: 'Contact', href: '#/contact', children: []}
					];
				});
		})();