/**
 * Created by simple on 2016/10/15.
 */

angular.module("starter.controllers",[])

.controller('Design_drawingCtrl', ["$scope","$ionicModal",function($scope,$ionicModal) {
  $scope.data="dddd";
  $scope.sho=function () {
    alert();
  }
  $ionicModal.fromTemplateUrl("drawing_details",{
    scope: $scope,
    animation: "slide-in-down"
  }).then (function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
}])
  .controller('DesignerCtrl', ["$scope","$state",function($scope,$state) {
    $scope.design_datas=[{
      touxiang:"1.jpg",
      name:"ben",
      works:20
    },{
      touxiang:"2.png",
      name:"max",
      works:21
    },{
      touxiang:"3.png",
      name:"mike",
      works:23
    },{
      touxiang:"4.png",
      name:"adam",
      works:25
    },{
      touxiang:"5.png",
      name:"perry",
      works:12
    }];
    $scope.goToDesignDetails=function () {
      $state.go("designer_details");
    }
  }])
  .controller('Designer_detailsCtrl', ["$scope","$state",function($scope,$state) {
    $scope.goToSjg_details=function () {
      $state.go("sjg_details");
    }
  }])
  .controller('Apply_designerCtrl', ["$scope","$state",function($scope,$state) {
  }])


  .controller('LogoCtrl', ["$scope","$state",function($scope,$state) {
    $scope.logoDatas=[{
      logo:"logo1.png",
      name:"logo1"
       }, {
        logo:"logo2.png",
        name:"logo2"
      }, {
      logo:"logo3.png",
      name:"logo3"
    }, {
      logo:"logo4.png",
      name:"logo4"
    }, {
      logo:"logo5.png",
      name:"logo5"
    }, {
      logo:"logo6.png",
      name:"logo6"
    }];
  }])













/*angular.module("starter.controllers",[])
  .controller('ControllerIndex', ["$state",function($state) {
    $state.go("tab");
  }]);*/
