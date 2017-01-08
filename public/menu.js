(function(){
			var module = angular.module('myApp', ['ngRoute','ngSanitize','ngAnimate','ui.bootstrap']);

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
			                when('/videos/:param1/:param2/rating', {
			                    templateUrl: 'onlyRatingView.html',
			                    controller: 'VideoController'
			                }).
			                when('/workshop', {
			                    templateUrl: 'workshopView.html',
			                    controller: 'WorkShopController'
			                }).
			                when('/courses/:param', {
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
					//for index page
			});



			module.controller("WorkShopController", function($scope,$routeParams,$http) {
					$scope.workshops = [];

					$scope.hasWorkshops = false;

                    $http.get("/workshop")
                        .then(function(response) {
                        $scope.workshops = response.data;
                        if($scope.workshops.length > 0){
                        	$scope.hasWorkshops = true;
                        }

                    }, function(response) {
                        console.log('error '+ response);
                        $scope.workshop = "Something went wrong";
                    });

			});

			
			module.controller("Email",function($scope,$routeParams,$http,$httpParamSerializerJQLike){ 		
				$scope.sendMail=function(mail){

						$('#success').html('<i class="fa fa-spinner" aria-hidden="true"></i>'); 		
				         			
				        $http.post('/email',mail) 			
				      .success(function(data){ 			
				              $('#success').html('<i class="fa fa-check" aria-hidden="true"></i>Message sent successfully');
				              $('#name').val('');	
				              $('#email').val('');
				              $('#message').val('');
				              $('#submit').attr('disabled', true);
				      }) 			
				      .error(function(err){ 			 			
				              console.log(err); 
				              $('#success').html('<i class="fa fa-times" aria-hidden="true"></i>Oops,something went wrong');					
				      }); 			
					
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

	    

	    	module.controller("VideoController", function($scope,$routeParams,$http,$uibModal, $log,$httpParamSerializerJQLike) {
					$scope.subCategory = $routeParams.param1;
					$scope.id = $routeParams.param2;
					
					$scope.trainerVideoData = [];
					$scope.totalRate = 0;
				  	$scope.counter = 0;

					if($scope.subCategory != undefined && $scope.id != undefined){
						
						$http.get("/trainer/"+ $scope.subCategory+"/"+$scope.id)
						    .then(function(response) {
						        $scope.trainerVideoData = response.data[0];

						        $scope.trainerVideoData.hasVideo = (response.data[0].videos != undefined);

						        if($scope.trainerVideoData.totalRate !== undefined){
						        	$scope.totalRate = $scope.trainerVideoData.totalRate;
						        }

						        if($scope.trainerVideoData.counter !== undefined){
				  					$scope.counter = $scope.trainerVideoData.counter;
						        }
						        

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


				  //$scope.totalRate = $scope.trainerVideoData.totalRate;
				  $scope.rate = 0;
				  $scope.max = 10;
				  $scope.isReadonly = false;
				  //$scope.counter = $scope.trainerVideoData.counter;

				  $scope.hoveringOver = function(value) {
				    $scope.overStar = value;
				    $scope.percent = 100 * (value / $scope.max);
				  };

			      $scope.$watch('rate', function(newValue, oldValue) {
				    if(newValue!==oldValue){
				        $scope.totalRate = Math.round((($scope.totalRate * $scope.counter)  + $scope.rate)/( $scope.counter +1 ));
				        $scope.counter = $scope.counter + 1;

				        $scope.trainerVideoData.totalRate = $scope.totalRate;
				        $scope.trainerVideoData.counter = $scope.counter;

				        $http.put("/trainer/"+ $scope.subCategory+"/"+$scope.id, $scope.trainerVideoData );
				  	}
				  });

			});
			

			module.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, toMobile) {
				
			  $scope.ok = function (trainerVideoData) {
			  	$uibModalInstance.close($scope.toMobile);
			  };

			  $scope.cancel = function () {
			    $uibModalInstance.dismiss('cancel');
			  };
			});
			

			module.controller("OnlyPicsController", function($scope,$routeParams,$http, $log,$httpParamSerializerJQLike) {
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

						        $scope.hasPics = (response.data != undefined);
						   		
						    }, function(response) {
						        console.log('error '+ response);
						        $scope.allPics = "Something went wrong";
						    });
					}

		});




			

			

			
})();