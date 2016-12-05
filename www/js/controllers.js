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


  .controller('AccountCtrl',["$scope","$state","userDataFactory","loginOutFactory",
    function($scope,$state,userDataFactory,loginOutFactory) {
    //保存用户的数据
    $scope.userDataView={};
    //从config获取用户数据
    $scope.userDataView=userDataFactory.getUserDataConfig();
    /*  JSON.parse(window.localStorage.getItem("userData"));*/

    //用户点击退出登录
    $scope.loginOut=function () {
      //调用service层发出退出请求
      loginOutFactory.loginOut();
      var onLoginOut= $scope.$on("loginOutFactory.loginOut",function () {
        onLoginOut();
        var isLoginOutSuccess=loginOutFactory.getIsLoginOutSuccess();
        if(isLoginOutSuccess){
          //用户已经退出
          //清楚全局数据
          userDataFactory.removeLocalStorage();
          //清楚localStorage数据
          userDataFactory.clearUserDataConfig();

          $state.go("tab.account");
        }
      });

    }
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
  .controller('LoginCtrl', ["$scope","$state","checkAccountNumberFactory","loginFactory","userDataFactory",
    function($scope,$state,checkAccountNumberFactory,loginFactory,userDataFactory) {
    //保存前端用户填写的登录信息
    $scope.userDataView={
      accountNumber:"",
      password:""
    };
    //错误提示信息，如账号不存在，密码错误等
    $scope.errorRemindData={
      isDisplay:false,
      message:""
    }
    //清除错误信息提示
    $scope.clearErrorRemind=function () {
      $scope.errorRemindData.isDisplay=false;
      $scope.errorRemindData.message="";
    }
    $scope.checkAccountNumber=function () {
      //调用服务层检查账号是否存在
      checkAccountNumberFactory.accountNumberIsExist($scope.userDataView.accountNumber);
      //获取检查结果
      var onAccountNumberIsExist= $scope.$on("checkAccountNumberFactory.accountNumberIsExist", function () {
        onAccountNumberIsExist();
        $scope.isAccountNumberExist = checkAccountNumberFactory.getIsAccountNumberExist();//账号是否存在
        if($scope.isAccountNumberExist){
          //账号存在
          $scope.errorRemindData.isDisplay=false;
          $scope.errorRemindData.message="";
        }
        else{//账号不存在，显示错误信息
          if($scope.userDataView.accountNumber!=""){
            $scope.errorRemindData.isDisplay=true;
            $scope.errorRemindData.message="该手机号码还未注册";
          }else {
            $scope.errorRemindData.isDisplay=false;
            $scope.errorRemindData.message="";
          }
        }
      });
    }
    //登录
    $scope.login=function () {
      //调用服务层进行登录
      loginFactory.login($scope.userDataView);
      var onLogin= $scope.$on("loginFactory.login",function () {
        //解除绑定，否则每次点击登录，事件会叠加执行
        onLogin();
        //获得登录状态
        $scope.isLoginSuccess=loginFactory.getIsLoginSuccess();
        if($scope.isLoginSuccess){
          //登录成功

          // 从服务层获取用户数据保存到config全局变量，并更新到缓存localStorage里
          var userDataService=loginFactory.getUserDataService();
           userDataFactory.setUserDataConfig(userDataService.isLogin,
           userDataService.userName,
           userDataService.accountNumber,
           userDataService.realName,
           userDataService.phoneNumber,
           userDataService.address,
           userDataService.isDesigner,
           userDataService.isBusiness,
           userDataService.touXiangUrl);
          //将数据更新到localStorage
          userDataFactory.pushToLocalStorage();


          // 从服务层获取用户数据并保存到缓存localStorage里
          // json变量转化成json字符串
          /*var strUserData = JSON.stringify(loginFactory.getUserDataService());
           //保存
           window.localStorage.setItem("userData",strUserData);*/



          $state.go("tab.account");
        }
        else {
          $scope.errorRemindData.isDisplay=true;
          $scope.errorRemindData.message="您输入的密码有误";
        }
      });
    };
    $scope.test=function () {
      /*console.log(JSON.parse(window.localStorage.getItem("userData")));*/
    }
  }])

  .controller('RegisterCtrl', ["$scope","$state","registerFactory","checkAccountNumberFactory",
    function($scope,$state,registerFactory,checkAccountNumberFactory) {
    //保存用户填写的注册信息
    $scope.userDataView={
      accountNumber:"",
      password:""
    };
      //错误提示信息，如账号不存在，密码错误等
      $scope.errorRemindData={
        isDisplay:false,
        message:""
      }
      //清除错误信息提示
      $scope.clearErrorRemind=function () {
        $scope.errorRemindData.isDisplay=false;
        $scope.errorRemindData.message="";
      }
    $scope.checkAccountNumber=function () {
      //检查账号是否存在
      checkAccountNumberFactory.accountNumberIsExist($scope.userDataView.accountNumber);
      //获取检查结果
      var onAccountNumberIsExist= $scope.$on("checkAccountNumberFactory.accountNumberIsExist", function () {
        $scope.isAccountNumberExist = checkAccountNumberFactory.getIsAccountNumberExist();
        onAccountNumberIsExist();
        if($scope.isAccountNumberExist){
          $scope.errorRemindData.isDisplay=true;
          $scope.errorRemindData.message="此手机号已经注册";
        }
        else{
          $scope.errorRemindData.isDisplay=false;
          $scope.errorRemindData.message="";
        }

      });
    }
    //实现注册功能
    $scope.register=function () {
      registerFactory.register($scope.userDataView);
      $scope.$on("registerFactory.makeRegister",function () {
        if(registerFactory.getIsRegisterSuccess()==true){
          alert("注册成功");
          $state.go("login");
        }
        else {
          $scope.errorRemindData.isDisplay=true;
          $scope.errorRemindData.message="注册失败请重新注册";
        }

      });
    }



  }])

  .controller('MyInformationCtrl', ["$scope","$state","userDataFactory",
    function($scope,$state,userDataFactory) {
      //保存用户的数据
      $scope.userDataView={};
      //从config全局变量获取用户数据
      $scope.userDataView=userDataFactory.getUserDataConfig();
    /*  $scope.$on("$ionicView.enter", function(event, data){
        //从localStorage获取用户数据
        $scope.userDataView=JSON.parse(window.localStorage.getItem("userData"));
      });*/

    $scope.goToUpdateTouXiang=function () {
      $state.go("update_touxiang");
    }
    $scope.goToUpdateName=function () {
      $state.go("update_name");
    }
    $scope.goToUpdateAddress=function () {
      $state.go("update_address");
    }

    $scope.test=function () {
      /*alert("test");*/
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

  .controller('Update_nameCtrl',["$scope","$state","userDataFactory","updateUserNameFactory","$rootScope","$window",
    function($scope,$state,userDataFactory,updateUserNameFactory,$rootScope,$window) {
    //保存用户的数据
    $scope.userDataView={};
    //从config获取用户数据
      $scope.userDataView=userDataFactory.getUserDataConfig();
      $scope.userName2=userDataFactory.getUserDataConfig().userName;
    /*$scope.userDataView=JSON.parse(window.localStorage.getItem("userData"));*/
      //点击保存触发函数
    $scope.updateUserName=function () {
      //调用service层的保存服务
      updateUserNameFactory.updateUserName($scope.userDataView.accountNumber,$scope.userDataView.userName);
      //获取保存结果
      var onUpdateUserName=$scope.$on("updateUserNameFactory.updateUserName",function () {
        onUpdateUserName();
        var isUpdateUserNameSucess=updateUserNameFactory.getIsUpdateUserNameSucess();
        if(isUpdateUserNameSucess){
          //将用户名的修改更新到localStorage
          userDataFactory.pushToLocalStorage();
          $state.go("myInformation");
        }
        else {
          alert("保存失败");
        }

      });
    };
    $scope.cancleUpdateUserName=function () {

     /* userDataFactory.setUserName($scope.userName2);*/
      /*userDataFactory.setUserName("ddddddd");
      console.log($scope.userDataView);*/
      userDataFactory.pullFromLocalStorage();
      /*console.log(JSON.parse(window.localStorage.getItem("userData")));*/
     /* console.log(userDataFactory.getUserDataConfig());*/
      $state.go("myInformation");
    }
      $scope.test=function () {
        $scope.item.number=55;
        /*window.location.reload();*/
      };



  }])

  .controller('Update_addressCtrl',["$scope","$state",function($scope,$state) {
  }])















/*angular.module("starter.controllers",[])
  .controller('ControllerIndex', ["$state",function($state) {
    $state.go("tab");
  }]);*/
