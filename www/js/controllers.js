/**
 * Created by simple on 2016/10/15.
 */

angular.module("starter.controllers",[])

.controller('Design_drawingCtrl', ["$scope","$ionicModal","$state",function($scope,$ionicModal,$state) {
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
  $scope.dingzhi=function (hasPrice) {
    if(hasPrice)
    {
      $scope.modal.hide();
      $state.go("dingzhi");
    }
    else {
      alert("此衣服尚未定价，请先咨询店长确定价格");
    }

  }
}])
  .controller('ShoppingCtrl', ["$scope","$ionicModal","$state",function($scope,$ionicModal,$state) {
    $ionicModal.fromTemplateUrl("shopping_details",{
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
    $scope.makeCloth=function () {
        $scope.modal.hide();
        $state.go("makeCloth");
    }
    $scope.goToShangJia_details=function () {
      $scope.modal.hide();
      $state.go("shangJia_details");
    }
  }])

  .controller('Shangjia_clothCtrl', ["$scope",function($scope) {

  }])

  .controller('Shangjia_logoCtrl', ["$scope",function($scope) {

  }])

  .controller('Shangjia_uploadCtrl', ["$scope","$ionicSlideBoxDelegate",
       "$cordovaImagePicker",function($scope,$ionicSlideBoxDelegate,$cordovaImagePicker) {
    $scope.slideCloth=function () {
      $ionicSlideBoxDelegate.previous();
    };
    $scope.slideLogo=function () {
      $ionicSlideBoxDelegate.next();
    };

      //衣服
      $scope.imgClothSrc="";


      //上传衣服
      $scope.uploadCloth= function () {
        var options = {
          maximumImagesCount: 1,
          width: 150,
          height: 150,
          quality: 80
        };
        /*当Cordova加载完成后才可以调用Cordova插件*/
        document.addEventListener("deviceready", function () {
          //alert();
          $cordovaImagePicker.getPictures(options)
            .then(function (results) {
              $scope.imgClothSrc=results[0];
            },function (error) {

            });
        }, false);
      };

      //Logo
      $scope.imgLogoSrc="";


      //上传Logo
      $scope.uploadLogo= function () {
        var options = {
          maximumImagesCount: 1,
          width: 150,
          height: 150,
          quality: 80
        };
        /*当Cordova加载完成后才可以调用Cordova插件*/
        document.addEventListener("deviceready", function () {
          //alert();
          $cordovaImagePicker.getPictures(options)
            .then(function (results) {
              $scope.imgLogoSrc=results[0];
            },function (error) {

            });
        }, false);
      };

  }])



  .controller('ShangJia_detailsCtrl', ["$scope","$state",function($scope,$state) {

  }])


  .controller('DesignCtrl', ["$scope",function($scope) {
    $scope.designDatas=["../img/sjg/sjg1.jpg",
                        "../img/sjg/sjg2.jpg",
                        "../img/sjg/sjg3.jpg",
                        "../img/sjg/sjg4.jpg",
                        "../img/sjg/sjg5.png"];
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
  .controller('Apply_designerCtrl', ["$scope","$state","$cordovaImagePicker","$cordovaCamera",
    function($scope,$state,$cordovaImagePicker,$cordovaCamera) {

      //"../img/sjg/sjg1.jpg"
      $scope.imgWorksSrc=[];

      //上传作品
      $scope.uploadImgWorks= function () {
        var options = {
          maximumImagesCount: 5,
          width: 150,
          height: 150,
          quality: 80
        };
        /*当Cordova加载完成后才可以调用Cordova插件*/
        document.addEventListener("deviceready", function () {
          //alert();
          $cordovaImagePicker.getPictures(options)
            .then(function (results) {
              $scope.imgWorksSrc=results;
              /*$scope.imgWorksSrc=results;*/
            },function (error) {
              alert(error);
            });
        }, false);
      };
  }])
  .controller('Upload_sjgCtrl', ["$scope",'$cordovaImagePicker','$ionicSlideBoxDelegate',
    function($scope,$cordovaImagePicker,$ionicSlideBoxDelegate) {
    $scope.imgWorks=[];
    $scope.uploadWorks=function () {
      var options = {
        maximumImagesCount: 5,
        width: 150,
        height: 150,
        quality: 80
      };
      document.addEventListener("deviceready", function () {
        $cordovaImagePicker.getPictures(options)
          .then(function (results) {
            $scope.imgWorks=results;
            $ionicSlideBoxDelegate.update();
          },function (error) {
            alert(error);
          });
      }, false);

    }
  }])
  .controller('Upload_logoCtrl', ["$scope","$ionicSlideBoxDelegate","$cordovaImagePicker",
    function($scope,$ionicSlideBoxDelegate,$cordovaImagePicker) {
    $scope.imgLogos=[];
    $scope.uploadWorks=function () {
      var options = {
        maximumImagesCount: 5,
        width: 150,
        height: 150,
        quality: 80
      };
      document.addEventListener("deviceready", function () {
        $cordovaImagePicker.getPictures(options)
          .then(function (results) {
            $scope.imgLogos=results;
            $ionicSlideBoxDelegate.update();
          },function (error) {
            alert(error);
          });
      }, false);

    }
  }])

  .controller('LogoCtrl', ["$scope","$state","$ionicModal",function($scope,$state,$ionicModal) {
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
      $ionicModal.fromTemplateUrl("logo_details",{
        scope: $scope,
        animation: "slide-in-down"
      }).then (function(modal) {
        $scope.modal = modal;
      });
      $scope.openLogoDetailsModal = function() {
        $scope.modal.show();
      };
      $scope.closeLogoDetailsModal = function() {
        $scope.modal.hide();
      };

  }])
  .controller('DingzhiCtrl', ["$scope",function($scope) {
  }])
  .controller('OrderPayCtrl', ["$scope",function($scope) {
  }])
  .controller('PostNeedCtrl', ["$scope","$ionicModal","$ionicSlideBoxDelegate",
    function($scope,$ionicModal,$ionicSlideBoxDelegate) {
    $scope.slideToPage1=function () {
      $ionicSlideBoxDelegate.slide(0);
    };
    $ionicModal.fromTemplateUrl("selectSjg_modal",{
      scope: $scope,
      animation: 'slide-in-up'
    })
      .then(function (modal) {
        $scope.modal = modal;
      });
    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    $scope.viewSjsDetails = function() {
      $scope.modal.show();
    };
      /*下一步*/
      $scope.slideNext=function () {
        $ionicSlideBoxDelegate.next();
      };
      /*上一步*/
      $scope.slidePre=function () {
        $ionicSlideBoxDelegate.previous();
      };

    //page2
    //是否要选择设计师
    $scope.toggleSelectSjs = {
      text: "选择设计师开关",
      checked: false
    };
    //是否显示设计师列表
    $scope.isDisplaySjsList=false;
    $scope.isSjsToggleOpen=function () {
      if($scope.toggleSelectSjs.checked)
      {
        $scope.isDisplaySjsList=true;
      }
      else
      {
        $scope.isDisplaySjsList=false;
      }
    }
    //是否已经选择设计师,如果是的话，显示该设计师
    $scope.isDisplaySelectSjs=false;
    //选择该设计师
    $scope.selectSjs=function () {
      $scope.modal.hide();
      $scope.isDisplaySjsList=false;
      $scope.isDisplaySelectSjs=true;

    }

      //page3
      //是否要定价
      $scope.isDisplayPrice=false;
      $scope.togglePrice = {
        text: "是否要定价",
        checked: false
      };
      $scope.isPriceToggleOpen=function () {
        if($scope.togglePrice.checked)
        {
          $scope.isDisplayPrice=true;
        }
        else
        {
          $scope.isDisplayPrice=false;
        }
      };
}])

  .controller('MakeClothCtrl', ["$scope","$state",function($scope,$state) {
    $scope.dingZhi=function () {
      $state.go("dingzhi");
    }
  }])

  .controller('AiDingZhiCtrl', ["$scope","$state","getDataFactory"
              ,function($scope,$state,getDataFactory) {
      $scope.goToPostNeed=function () {
        $state.go("postNeed");
      };
      $scope.goToMyDingZhi=function () {
        $state.go("myDingZhi");
      };

   /*   getDataFactory.getData();
      $scope.$on('PortalList.portalsUpdated', function() {
        $scope.portalListData=getDataFactory.getArticles();
        console.log(getDataFactory.getArticles());
      });*/
  }])

  .controller('MyDingZhiCtrl', ["$scope","$state",function($scope,$state) {
  }])


  .controller('AccountCtrl',["$scope","$state",function($scope,$state) {
    $scope.goToMyInformation=function () {
      $state.go("myInformation");
    };
    $scope.goToMyCollect=function () {
      $state.go("myCollect");
    };
    $scope.goToMyWorks=function () {
      $state.go("myWorks");
    };
    $scope.goToMyShop=function () {
      $state.go("myShop");
    };
    $scope.goToLogin=function () {
      $state.go("login");
    };
  }])
  .controller('LoginCtrl', ["$scope","$state",function($scope,$state) {
    $scope.test=function () {
      alert("test");
    }
  }])

  .controller('RegisterCtrl', ["$scope","$state","getDataByAjaxFactory",
    function($scope,$state,getDataByAjaxFactory) {
    //保存用户填写的注册信息
    $scope.userData={
      phoneNumber:"",
      password:""
    };

    $scope.test=function () {
      /*console.log(registerFactory.makeRegister());*/
      getDataByAjaxFactory.getDataByAjax();
      $scope.$on('getDataByAjaxFactory.getDataByAjax', function() {
        console.log(getDataByAjaxFactory.getData());
      });

    }


  }])

  .controller('MyInformationCtrl', ["$scope","$state",function($scope,$state) {
    $scope.goToUpdateTouXiang=function () {
      $state.go("update_touxiang");
    }
    $scope.goToUpdateName=function () {
      $state.go("update_name");
    }
    $scope.goToUpdateAddress=function () {
      $state.go("update_address");
    }
  }])
  .controller('MyCollectCtrl', ["$scope",'$state',function($scope,$state) {
    $scope.goToCollectSjg=function () {
      $state.go("collect_sjg");
    };
    $scope.goToCollectLogo=function () {
      $state.go("collect_logo");
    };
  }])

  .controller('MyWorksCtrl', ["$scope","$state",function($scope,$state) {
    $scope.goToMySjg=function () {
      $state.go("mySjg");
    };
    $scope.goToMyLogo=function () {
      $state.go("myLogo");
    };
    $scope.goToUpload_sjg=function () {
      $state.go("upload_sjg");
    };
  }])

  .controller('MyShopCtrl', ["$scope","$state",function($scope,$state) {

    $scope.goToShangjia_cloth=function () {
      $state.go("shangjia_cloth");
    };
    $scope.goToShangjia_logo=function () {
      $state.go("shangjia_logo");
    };
    $scope.goToShangjia_upload=function () {
      $state.go("shangjia_upload");
    };
  }])

  .controller('Collect_sjgCtrl', ["$scope",function($scope) {
  }])

  .controller('Collect_logoCtrl', ["$scope",function($scope) {
  }])

  .controller('MySjgCtrl', ["$scope",function($scope) {
  }])

  .controller('MyLogoCtrl', ["$scope",function($scope) {
  }])

  .controller('UpdateInfoCtrl',["$scope","$state",function($scope,$state) {
  }])

  .controller('Update_touxiangCtrl',["$scope","$state",
    "$ionicActionSheet","$timeout","$cordovaImagePicker",
    "$cordovaCamera", function($scope,$state,$ionicActionSheet,$timeout,$cordovaImagePicker,$cordovaCamera) {
      $scope.show = function() {

        // Show the action sheet
        var hideSheet = $ionicActionSheet.show({
          buttons: [
            { text: '<b>拍照</b> ' },
            { text: '<b>从手机相册选择</b>' }
          ],
          cancelText: '取消',
          cancel: function() {
            // add cancel code..
          },
          buttonClicked: function(index) {
            if(index==0)//拍照
            {
              document.addEventListener("deviceready", function () {

                var options = {
                  quality: 50,
                  destinationType: Camera.DestinationType.FILE_URI,
                  sourceType: Camera.PictureSourceType.CAMERA,
                  allowEdit: true,
                  encodingType: Camera.EncodingType.JPEG,
                  targetWidth: 100,
                  targetHeight: 100,
                  popoverOptions: CameraPopoverOptions,
                  saveToPhotoAlbum: false,
                  correctOrientation:true
                };

                $cordovaCamera.getPicture(options).then(function(imageData) {
                  alert(imageData);
                /*  var image = document.getElementById('myImage');
                  image.src = "data:image/jpeg;base64," + imageData;*/
                }, function(err) {
                  alert(err);
                  // error
                });

              }, false);
            }
            else {//从手机选择照片
              alert("从手机获取相片");
            }
            return true;
          }
        });

      /*  // 2s之后隐藏
        $timeout(function() {
          hideSheet();
        }, 2000);*/

      };
  }])

  .controller('Update_nameCtrl',["$scope","$state",function($scope,$state) {
  }])

  .controller('Update_addressCtrl',["$scope","$state",function($scope,$state) {
  }])















/*angular.module("starter.controllers",[])
  .controller('ControllerIndex', ["$state",function($state) {
    $state.go("tab");
  }]);*/
