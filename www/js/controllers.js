/**
 * Created by simple on 2016/10/15.
 */

angular.module("starter.controllers",[])

.controller('Design_drawingCtrl', ["$scope","$ionicModal","$state","getSjgListFactory","getSjgDetailsFactory"
  ,function($scope,$ionicModal,$state,getSjgListFactory,getSjgDetailsFactory) {

  $scope.sjgList=[];
  getSjgListFactory.getSjgListFromService(1);
  var onGetSjgListFromService=$scope.$on("getSjgListFactory.getSjgListFromService",function () {
    onGetSjgListFromService();
    $scope.sjgList=getSjgListFactory.getSjgList();
  });

  $scope.getSjgDetails=function (sjgId) {
    //根据设计稿id获得sjg详情数据
    getSjgDetailsFactory.getSjgDetailsFromService(sjgId);
    var onGetSjgDetailsFromService=$scope.$on("getSjgDetailsFactory.getSjgDetailsFromService",function () {
      onGetSjgDetailsFromService();
      $scope.sjgDetails=getSjgDetailsFactory.getSjgDetails();
      $scope.modal.show();
    });

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
  .controller('ShoppingCtrl', ["$scope","$ionicModal","$state","userDataFactory","getShangChengClothListFactory","imageFactory",
    function($scope,$ionicModal,$state,userDataFactory,getShangChengClothListFactory,imageFactory) {

    //保存用户的数据(需要用到用户的数据，前端判断是否为商家)
    $scope.userDataView={};
    //从config获取用户数据
    $scope.userDataView=userDataFactory.getUserDataConfig();
    $scope.selectShangChengCloth="../img/sjg/sjg1.jpg";
    $scope.shangChengClothList={
      id:null,
      caption:"",
      introduction:"",
      businesser:null,
      price:null,
      imgUrl:""
    };
    getShangChengClothListFactory.getGetShangChengClothListService(1);
    var onGetGetShangChengClothListService=$scope.$on("getShangChengClothListFactory.getGetShangChengClothListService",function () {
      onGetGetShangChengClothListService();
      $scope.shangChengClothList=getShangChengClothListFactory.getShangChengClothList();
      });
    $ionicModal.fromTemplateUrl("shopping_details",{
      scope: $scope,
      animation: "slide-in-down"
    }).then (function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function(shangChengClothIndex) {
      $scope.selectShangChengCloth=$scope.shangChengClothList[shangChengClothIndex].imgUrl;
      $scope.selectShangChengClothId=$scope.shangChengClothList[shangChengClothIndex].id;
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    $scope.diyCloth=function () {
      $scope.modal.hide();
      $state.go("diyCloth",{imgUrl:$scope.selectShangChengCloth,businessClothId:$scope.selectShangChengClothId});
    }
    $scope.goToShangJia_details=function () {
      $scope.modal.hide();
      $state.go("shangJia_details");
    }
  }])



  .controller('Shangjia_uploadCtrl', ["$scope","$ionicSlideBoxDelegate", "$cordovaImagePicker","$ionicActionSheet","$state",
    function($scope,$ionicSlideBoxDelegate,$cordovaImagePicker,$ionicActionSheet,$state) {
    $scope.slideCloth=function () {
      $ionicSlideBoxDelegate.previous();
    };
    $scope.slideLogo=function () {
      $ionicSlideBoxDelegate.next();
    };

     //保存衣服图片
      $scope.imgClothSrc="";
      //保存Logo图片
      $scope.imgLogoSrc="";
    //此函数实现从相册中挑选一张照片，imgType取值为logo或cloth，当imgType为logo时，图片保存在$scope.imgLogoSrc，当imgType为cloth时，图片保存在$scope.imgClothSrc
    function selectImg(imgType) {
      alert("调用相册接口，因为是在公司，无法进行手机测试");
      if(imgType=="cloth"){
        $state.go("shangjia_upload_cloth");
      }
      else {
        $state.go("shangjia_upload_logo");
      }

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
            if(imgType=="logo"){
              //选择logo图片
              $scope.imgLogoSrc=results[0];
              $state.go("shangjia_upload_logo");
            }
            else {
              //选择衣服图片
              $scope.imgClothSrc=results[0];
              $state.go("shangjia_upload_cloth");
            }

          },function (error) {

          });
      }, false);
    }
    //此函数实现显示一个ActionSheet，提示用户选择从相册上传照片，imgType取值为logo或cloth，当imgType为logo时，提示用户上传logo，当imgType为cloth时，提示用户上传衣服
    function uploadImg(imgType) {
      if(imgType=="logo"){
        //选择logo图片
        var titleMessage="请从相册挑选一个logo图片进行上传";

      }
      else {
        //选择衣服图片
        var titleMessage="请从相册挑选一件衣服图片进行上传";
      }
      // Show the action sheet
      var hideSheet= $ionicActionSheet.show({
        cancelOnStateChange:true,
        cssClass:'action_s',
        titleText: "<b>"+titleMessage+"</b>",
        buttons: [
          { text: "相册" }
        ],
        buttonClicked: function() {
          selectImg(imgType);
          return true;
        },
        cancelText: "取消",
        cancel: function() {
          // add cancel code..
          console.log('执行了取消操作');
          return true;
        }
      });
    }

      //上传衣服,imgType取值为logo或cloth,当imgType为logo时，上传logo，当imgType为cloth时上传衣服
      $scope.uploadCloth= function (imgType) {
        uploadImg(imgType);

      };

  /*    //上传Logo
      $scope.uploadLogo= function () {
        var options = {
          maximumImagesCount: 1,
          width: 150,
          height: 150,
          quality: 80
        };
        /!*当Cordova加载完成后才可以调用Cordova插件*!/
        document.addEventListener("deviceready", function () {
          //alert();
          $cordovaImagePicker.getPictures(options)
            .then(function (results) {
              $scope.imgLogoSrc=results[0];
            },function (error) {

            });
        }, false);
      };*/

  }])


  .controller('Apply_shangjiaCtrl', ["$scope","$state","$cordovaImagePicker","$cordovaCamera","imageFactory","applyBusinessFactory"
    ,function($scope,$state,$cordovaImagePicker,$cordovaCamera,imageFactory,applyBusinessFactory) {
    //商家的申请资料
   $scope.applyShangjiaData={
     businessLicenseImg:"../img/sjg/sjg1.jpg"
   };
   //点击提交开通数据
   $scope.applyShangjia=function () {
     //将图片转化为base64数据
     var businessLicenseImgBase64=imageFactory.getBase64Image(document.getElementById("majorImg"),"image/png");
     //调用服务层，发送数据到服务器
     applyBusinessFactory.applyBusiness(businessLicenseImgBase64);
     var onApplyBusiness=$scope.$on("applyBusinessFactory.applyBusiness",function () {
       onApplyBusiness();
       if(applyBusinessFactory.getIspplyBusinessSuccess()){
         alert("提交成功，请等待审核");
         $state.go("myShop");
       }

     });
   }
    //上传营业执照
    $scope.uploadImgBusinessLicense= function () {
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
            $scope.applyShangjiaData.businessLicenseImg=results[0];
          },function (error) {
            alert(error);
          });
      }, false);
    };


  }])
  .controller('ShangJia_detailsCtrl', ["$scope","$state",function($scope,$state) {

  }])
  .controller('Shangjia_upload_clothCtrl', ["$scope","$state","shangjiaUploadClothFactory","imageFactory",function($scope,$state,shangjiaUploadClothFactory,imageFactory) {

    $scope.shangjiaClothData={
      caption:"",
      price:null,
      introduction:""
    }
    //调用服务器层发送数据到服务器
    $scope.uploadToService=function () {
      //从前端获得商家衣服商品的图片，并转化为base64的格式
      var shangjiaClothImgBase64=imageFactory.getBase64Image(document.getElementById("shangjiaClothImg"),"image/png");
      shangjiaUploadClothFactory.shangjiaUploadCloth($scope.shangjiaClothData.caption,$scope.shangjiaClothData.price,$scope.shangjiaClothData.introduction,shangjiaClothImgBase64);
      var onShangjiaUploadCloth=$scope.$on("shangjiaUploadClothFactory.shangjiaUploadCloth",function () {
        onShangjiaUploadCloth();
        if(shangjiaUploadClothFactory.getIsShangjiaUploadClothSuccess())
        {
          alert("商家上传衣服商品成功");
          alert("跳转到我的商城的我的商品。");
        }
      });

    }


  }])
  .controller('Shangjia_upload_logoCtrl', ["$scope","$state","imageFactory","shangjiaUploadLogoFactory",function($scope,$state,imageFactory,shangjiaUploadLogoFactory) {

    $scope.shangjiaLogoData={
      caption:"",
      introduction:""
    }
    //调用服务器层发送数据到服务器
    $scope.uploadToService=function () {

      //从前端获得商家衣服商品的图片，并转化为base64的格式
      var shangjiaLogoImgBase64=imageFactory.getBase64Image(document.getElementById("shangjiaLogoImg"),"image/png");
      shangjiaUploadLogoFactory.shangjiaUploadLogo($scope.shangjiaLogoData.caption,$scope.shangjiaLogoData.introduction,shangjiaLogoImgBase64);
      var onShangjiaUploadLogo=$scope.$on("shangjiaUploadLogoFactory.shangjiaUploadLogo",function () {
        onShangjiaUploadLogo();
        if(shangjiaUploadLogoFactory.getIsShangjiaUploadLogoSuccess())
        {
          alert("商家上传衣服商品成功");
          alert("跳转到我的商城的我的商品。");
        }
      });

    }

  }])

  .controller('DesignCtrl', ["$scope",function($scope) {
    $scope.designDatas=["../img/sjg/sjg1.jpg",
                        "../img/sjg/sjg2.jpg",
                        "../img/sjg/sjg3.jpg",
                        "../img/sjg/sjg4.jpg",
                        "../img/sjg/sjg5.png"];
  }])
  .controller('DesignerCtrl', ["$scope","$state","userDataFactory","getDesignerListFactory",
    function($scope,$state,userDataFactory,getDesignerListFactory) {
      //保存用户的数据
      $scope.userDataView={};
      //从config获取用户数据
      $scope.userDataView=userDataFactory.getUserDataConfig();
      $scope.designerList=[{
        touXiangUrl:"../img/touxiang/1.jpg",
        userName:"ben",
        worksCount:20,
        nickname:"擅长衣服设计"
      },{
        touXiangUrl:"../img/touxiang/2.png",
        userName:"max",
        worksCount:21,
        nickname:"擅长衣服设计"
      },{
        touXiangUrl:"../img/touxiang/3.png",
        userName:"mike",
        worksCount:23,
        nickname:"擅长衣服设计"
      },{
        touXiangUrl:"../img/touxiang/4.png",
        userName:"adam",
        worksCount:25,
        nickname:"擅长衣服设计"
      },{
        touXiangUrl:"../img/touxiang/5.png",
        userName:"perry",
        worksCount:12,
        nickname:"擅长衣服设计"
      }];

      $scope.$on("$ionicView.enter", function(event, data){
        /*自动加载数据*/
        getDesignerListFactory.getDesignerListFromService();
        var onGetDesignerListFromService=$scope.$on("getDesignerListFactory.getDesignerListFromService",function () {
          onGetDesignerListFromService();
          $scope.designerList= getDesignerListFactory.getDesignerList();
        });
      });

      $scope.test=function () {
        getDesignerListFactory.getDesignerListFromService();
        var onGetDesignerListFromService=$scope.$on("getDesignerListFactory.getDesignerListFromService",function () {
          onGetDesignerListFromService();
          $scope.designerList= getDesignerListFactory.getDesignerList();
        });
      }


    $scope.goToDesignDetails=function (userId_) {
      // userId_为设计师的userId
      $state.go("designer_details",{userId:userId_});
    }
  }])

  .controller('Designer_detailsCtrl', ["$scope","$state","$stateParams","getDesignerDetailsFactory",function($scope,$state,$stateParams,getDesignerDetailsFactory) {
    //获得设计师的用户id
    var designerUserId=$stateParams["userId"];
    $scope.designerDetails={};
    //根据设计师的用户id获取设计师详情数据
    getDesignerDetailsFactory.getDesignerDetailsFromService(designerUserId);
    var onGetDesignerDetailsFromService=$scope.$on("getDesignerDetailsFactory.getDesignerDetailsFromService",function () {
      onGetDesignerDetailsFromService();
      $scope.designerDetails = getDesignerDetailsFactory.getDesignerDetails();

    });
    $scope.test=function () {
      getDesignerDetailsFactory.getDesignerDetailsFromService(designerUserId);
    }

    $scope.goToSjgDetails=function (sjgId_) {
      // sjgId_为设计稿的sjgId
      $state.go("sjg_details",{sjgId:sjgId_});
    }
  }])

  .controller('Sjg_detailsCtrl', ["$scope","$state","$stateParams","getSjgDetailsFactory", function($scope,$state,$stateParams,getSjgDetailsFactory) {
    //获得设计师的用户id
    var sjgId=$stateParams["sjgId"];
    $scope.sjgDetails={};
    //根据设计稿id获得sjg详情数据
    getSjgDetailsFactory.getSjgDetailsFromService(sjgId);
    var onGetSjgDetailsFromService=$scope.$on("getSjgDetailsFactory.getSjgDetailsFromService",function () {
      onGetSjgDetailsFromService();
      $scope.sjgDetails=getSjgDetailsFactory.getSjgDetails();
    });
    /*console.log($scope.sjgDetails);//这样访问不到数据，但是实际上数据是存在的*/
    $scope.test=function () {
      alert(sjgId);
    };

    $scope.goToDesignDetails=function (userId_) {
      // userId_为设计师的userId
      $state.go("designer_details",{userId:userId_});
    }

  }])
  .controller('Apply_designerCtrl', ["$scope","$state","$cordovaImagePicker","$cordovaCamera",
    "applyDesignerFactory","imageFactory",
    function($scope,$state,$cordovaImagePicker,$cordovaCamera,applyDesignerFactory,imageFactory) {

    //设计师的申请资料
    $scope.applyData={
      educationBackground:"",//学历
      major:"",//专业
      majorImg:"../img/sjg/sjg1.jpg",//专业证书
      sjgImgs:["../img/sjg/sjg1.jpg","../img/sjg/sjg2.jpg"]//设计稿
    };
    //点击开通提交数据
    $scope.applyDesigner=function () {
      //将图片转化为base64数据
      var majorImgBase64=imageFactory.getBase64Image(document.getElementById("majorImg"),"image/png");
      //设计稿是多张图片，每张的图片的数据以&_&作为分隔符
      var sjgImgsBase64=imageFactory.getBase64Image(document.getElementById("sjgImg0"),"image/png");
      for(var i=1;i<$scope.applyData.sjgImgs.length;i++){
        sjgImgsBase64=sjgImgsBase64+"&_&"+imageFactory.getBase64Image(document.getElementById("sjgImg"+i),"image/png");
      }
      //调用服务层，发送数据到服务器
      applyDesignerFactory.applyDesigner($scope.applyData.educationBackground, $scope.applyData.major, majorImgBase64, sjgImgsBase64);
      var onApplyDesigner=$scope.$on("applyDesignerFactory.applyDesigner",function () {
        onApplyDesigner();
        if(applyDesignerFactory.getIspplyDesignerSuccess()){
          alert("提交成功，请等待审核");
          $state.go("designer");
        }

      });

    }
      //"../img/sjg/sjg1.jpg"
      /*$scope.applyData.sjgImgs.push("../img/sjg/sjg1.jpg");
      $scope.applyData.sjgImgs.push("../img/sjg/sjg2.jpg");*/
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
              $scope.applyData.sjgImgs=results;
              /*$scope.imgWorksSrc=results;*/
            },function (error) {
              alert(error);
            });
        }, false);
      };
      //上传专业证书
      $scope.uploadImgMajor= function () {
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
              $scope.applyData.majorImg=results[0];
            },function (error) {
              alert(error);
            });
        }, false);
      };



  }])



  .controller('Upload_sjgCtrl', ["$scope",'$cordovaImagePicker','$ionicSlideBoxDelegate',
    "designerUploadSjsFactory","imageFactory",
    function($scope,$cordovaImagePicker,$ionicSlideBoxDelegate,designerUploadSjsFactory,imageFactory) {
      //设计稿数据，从前端获取
      $scope.sjgData={
        caption:"",//设计稿标题
        introduction:"",//设计稿介绍或灵感
        sjgImgs:[]//设计稿
      };
      //点击上传我的作品
    $scope.uploadWorks=function () {
      var options = {
        maximumImagesCount: 5,
       /* width: 150,
        height: 150,*/
        quality: 100
      };
      document.addEventListener("deviceready", function () {
        $cordovaImagePicker.getPictures(options)
          .then(function (results) {
            $scope.sjgData.sjgImgs=results;
            $ionicSlideBoxDelegate.update();
          },function (error) {
            alert(error);
          });
      }, false);
    };
    //调用服务器层发送数据到服务器
    $scope.uploadToService=function () {
      //设计稿是多张图片，每张图片的数据以&_&作为分隔符
      var sjgImgsBase64=imageFactory.getBase64Image(document.getElementById("sjgImg0"),"image/png");
      for(var i=1;i<$scope.sjgData.sjgImgs.length;i++){
        sjgImgsBase64=sjgImgsBase64+"&_&"+imageFactory.getBase64Image(document.getElementById("sjgImg"+i),"image/png");
      }
      designerUploadSjsFactory.designerUploadSjs($scope.sjgData.caption,$scope.sjgData.introduction,sjgImgsBase64);
      var onDesignerUploadSjs=$scope.$on("designerUploadSjsFactory.designerUploadSjs",function () {
        onDesignerUploadSjs();
        if(designerUploadSjsFactory.getIsDesignerUploadSjsSuccess())
        {
          alert("设计师上传设计稿成功");
          alert("跳转到我的作品的我的设计稿。");
        }
      });
    }


  }])
  .controller('Upload_logoCtrl', ["$scope","$ionicSlideBoxDelegate","$cordovaImagePicker","imageFactory","designerUploadLogoFactory",
    function($scope,$ionicSlideBoxDelegate,$cordovaImagePicker,imageFactory,designerUploadLogoFactory) {
      //设计师logo数据，从前端获取
      $scope.logoData={
        caption:"",//logo标题
        introduction:"",//logo介绍或灵感
        logoImgs:[]//logo图片
      };
    $scope.uploadWorks=function () {
      var options = {
        maximumImagesCount: 1,
        /*width: 150,
        height: 150,*/
        quality: 100
      };
      document.addEventListener("deviceready", function () {
        $cordovaImagePicker.getPictures(options)
          .then(function (results) {
            $scope.logoData.logoImgs[0]=results[0];
            /*$scope.imgLogos=results;*/
            $ionicSlideBoxDelegate.update();
          },function (error) {
            alert(error);
          });
      }, false);

    }

      $scope.uploadDesignerLogoToService=function () {
        var logoImgBase64=imageFactory.getBase64Image(document.getElementById("logoImg"),"image/png");
        designerUploadLogoFactory.designerUploadLogo($scope.logoData.caption,$scope.logoData.introduction,logoImgBase64);
        var onDesignerUploadLogo=$scope.$on("designerUploadLogoFactory.designerUploadLogo",function () {
          onDesignerUploadLogo();
          if(designerUploadLogoFactory.getIsDesignerUploadSjsSuccess()){
            alert("设计师上传logo成功");
            alert("跳转到我的作品的我的logo。");
          }
        });
      }



  }])

  .controller('LogoCtrl', ["$scope","$state","$ionicModal","getDesignerLogoListFactory","getDesignerLogoDetailsFactory", function($scope,$state,$ionicModal,getDesignerLogoListFactory,getDesignerLogoDetailsFactory) {
    /*$scope.logoDatas=[{
      imgUrl:"logo1.png",
      caption:"logo1"
       }, {
      imgUrl:"logo2.png",
      caption:"logo2"
      }, {
      imgUrl:"logo3.png",
      caption:"logo3"
    }, {
      imgUrl:"logo4.png",
      caption:"logo4"
    }, {
      imgUrl:"logo5.png",
      caption:"logo5"
    }, {
      imgUrl:"logo6.png",
      caption:"logo6"
    }];*/
    $scope.designerLogoList=[];
    $scope.designerLogoDetails={};//一个logo详情
    getDesignerLogoListFactory.getDesignerLogoListFromService(1);//获取第一页
    var onGetDesignerLogoListFromService=$scope.$on("getDesignerLogoListFactory.getDesignerLogoListFromService",function () {
      onGetDesignerLogoListFromService();
      $scope.designerLogoList=getDesignerLogoListFactory.getDesignerLogoList();
    });
      $ionicModal.fromTemplateUrl("logo_details",{
        scope: $scope,
        animation: "slide-in-down"
      }).then (function(modal) {
        $scope.modal = modal;
      });
      $scope.openLogoDetailsModal = function(designerLogoId) {
        getDesignerLogoDetailsFactory.getDesignerLogoDetailsFromService(designerLogoId);
        var onGetDesignerLogoDetailsFromService=$scope.$on("getDesignerLogoDetailsFactory.getDesignerLogoDetailsFromService",function () {
          onGetDesignerLogoDetailsFromService();
          $scope.designerLogoDetails=getDesignerLogoDetailsFactory.getDesignerLogoDetails();
        });
        $scope.modal.show();
      };
      $scope.closeLogoDetailsModal = function() {
        $scope.modal.hide();
      };

  }])
  .controller('DingzhiCtrl', ["$scope","$stateParams",function($scope,$stateParams) {
    $scope.myDiyClothId=$stateParams["myDiyClothId"];
    $scope.imgUrl=$stateParams["imgUrl"];
    /*$state.go("dingzhi",{myDiyClothId:myDiyCloth.myDiyClothId,imgUrl:myDiyCloth.imgUrl});*/
  }])

  .controller('MakeOrder_shoppingCtrl', ["$scope","$stateParams","$ionicModal","$state","getDiyClothDetailsFactory","saveShoppingMakeOrderFactory"
    ,function($scope,$stateParams,$ionicModal,$state,getDiyClothDetailsFactory,saveShoppingMakeOrderFactory) {
      $scope.myDiyClothId=$stateParams["myDiyClothId"];
      $scope.imgUrl=$stateParams["imgUrl"];
      $scope.myDiyClothDetails= {
        isBusinessLogo:null,
        price:null,
        userName:""
      };
      //logo价格，如果是设计师的logo这需要1元，如果是商家的logo则免费
      $scope.logoPrice=0;
      //总单价（衣服+logo）
      $scope.price=50;
      //总件数
      $scope.totalCount=10;
      //总价格
      $scope.totalPrice=10;
      getDiyClothDetailsFactory.getDiyClothDetailsFromService($scope.myDiyClothId);
      var onGetDiyClothDetailsFromService= $scope.$on("getDiyClothDetailsFactory.getDiyClothDetailsFromService",function () {
        onGetDiyClothDetailsFromService();
        $scope.myDiyClothDetails = getDiyClothDetailsFactory.getMyDiyClothDetails();
        $scope.price=$scope.myDiyClothDetails.price;
        //判断是否为设计师的logo
        if(!$scope.myDiyClothDetails.isBusinessLogo){
          $scope.logoPrice=1;
          $scope.price=$scope.price+$scope.logoPrice;
        }
      });

      /* //添加一行选择尺码和件数的item，方法一
       var theBarItem = document.querySelector("#theBarItem");
       var theContent = document.querySelector("#theContent");
       var select = document.getElementsByTagName('select');
       $scope.addTheBarItem=function () {
       var theBarItemStr=theBarItem.innerHTML;
       var newNode = document.createElement("div");
       newNode.innerHTML = theBarItemStr;
       /!*newNode.innerHTML = theBarItemStr+"</ion-item>";*!/
       console.log(newNode);
       theContent.appendChild(newNode);

       }*/
      //添加一行选择尺码和件数的item，方法二
      $scope.addTheBarItem=function () {
        var item={selectSize:"请选择",sizes:["请选择","S","M","L","XL","2XL"],selectQuantity:0,quantitys:jianshu,isHaveBtnAdd:false};
        $scope.items.push(item);
      }
      var jianshu=new  Array(100);
      for(i=0;i<=100;i++){
        jianshu[i]=i;
      }
      $scope.items=[
        {selectSize:"请选择",sizes: ["请选择","S","M","L","XL","2XL"],selectQuantity:0,quantitys:jianshu,isHaveBtnAdd:true},
        {selectSize:"请选择",sizes:["请选择","S","M","L","XL","2XL"],selectQuantity:0,quantitys:jianshu,isHaveBtnAdd:false},
      ];

      $scope.count = function(newValue,oldValue,scope){
        $scope.totalCount=0;
        for(var i=0;i<$scope.items.length;i++){
          $scope.totalCount=$scope.totalCount+$scope.items[i].selectQuantity;
        }

        $scope.totalPrice=$scope.totalCount*$scope.price;
      };
      $scope.$watch('items',$scope.count,true)
      //下单
      $scope.orderPay=function () {
        $scope.modal.show();
      }
      //取消下单
      $scope.cancleOrderPay=function () {
        $scope.modal.hide();
      }
      //确定下单
      $scope.confirmOrderPay=function () {
        //保存尺码
        var clothSizeItems=[];
        for(var i=0;i<$scope.items.length;i++){
          clothSizeItems.push({clothSize:$scope.items[i].selectSize,quantity:$scope.items[i].selectQuantity});
        }
        saveShoppingMakeOrderFactory.saveShoppingMakeOrderToService($scope.myDiyClothId,$scope.price,$scope.totalCount,$scope.totalPrice,clothSizeItems);
        var onSaveShoppingMakeOrderToService = $scope.$on("saveShoppingMakeOrderFactory.saveShoppingMakeOrderToService",function () {
          onSaveShoppingMakeOrderToService();
          if(saveShoppingMakeOrderFactory.getIsSaveSuccess()){
            $scope.modal.hide();
            $state.go("orderPay_shopping",{totalPrice:$scope.totalPrice});
          }
        });

      };
      $ionicModal.fromTemplateUrl("confirmOrderPay",{
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
  .controller('MakeOrder_designCtrl', ["$scope","$stateParams","$ionicModal","$state",function($scope,$stateParams,$ionicModal,$state) {

  }])


  .controller('OrderPay_shoppingCtrl', ["$scope","$ionicModal","saveUserAddressFactory","getUserAddressListFactory","$stateParams",function($scope,$ionicModal,saveUserAddressFactory,getUserAddressListFactory,$stateParams) {
    $scope.totalPrice=$stateParams["totalPrice"];
    $scope.userAddressList=[{
      userAddressId:null,
      userId:null,
      realName:"",
      phoneNumber:null,
      sheng:"",
      shi:"",
      qu:"",
      detailAddress:"",
      postalcode:null
    }];

    getUserAddressListFactory.getUserAddressListFromService();
    var onGetUserAddressListFromService=$scope.$on("getUserAddressListFactory.getUserAddressListFromService",function () {
      onGetUserAddressListFromService();
      $scope.userAddressList=getUserAddressListFactory.getUserAddressList();
      $scope.data.userAddressId=$scope.userAddressList[0].userAddressId;
    });

    $scope.data={
      userAddressId:null
    };

    //保存用户新增的地址信息
    $scope.customerInfo={
      realName:"",
      phoneNumber:"",
      areaData:{
        sheng:"",//省
        shi:"",//市
        qu:""//区
      },
      detailAddress:"",
      postalcode:""
    };

    var vm=$scope.vm={};
    vm.cb = function () {
      $scope.customerInfo.areaData.sheng=vm.CityPickData1.areaData[0];
      $scope.customerInfo.areaData.shi=vm.CityPickData1.areaData[1];
      $scope.customerInfo.areaData.qu=vm.CityPickData1.areaData[2];
    }
    //例1
    vm.CityPickData1 = {
      areaData: [],
      backdrop: true,
      backdropClickToClose: true,
      buttonClicked: function () {
        vm.cb()
      },
      title: '所在地区：'
    };

    $ionicModal.fromTemplateUrl("addAddressHtml",{
      scope: $scope,
      animation: "slide-in-down"
    }).then (function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function(shangChengClothIndex) {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    //保存新增的地址到服务器
    $scope.saveAddress=function () {
      //将用户地址数据保存到服务器
      saveUserAddressFactory.saveUserAddressToService($scope.customerInfo.realName,$scope.customerInfo.phoneNumber,$scope.customerInfo.areaData.sheng,$scope.customerInfo.areaData.shi,$scope.customerInfo.areaData.qu,$scope.customerInfo.detailAddress,$scope.customerInfo.postalcode);
      var onSaveUserAddressToService=$scope.$on("saveUserAddressFactory.saveUserAddressToService",function () {
        onSaveUserAddressToService();
        //保存成功
        if(saveUserAddressFactory.getIsSaveSuccess()){
          $scope.modal.hide();
          var address={
            userAddressId:saveUserAddressFactory.getUserAddressId(),
            userId:null,
            realName:$scope.customerInfo.realName,
            phoneNumber:$scope.customerInfo.phoneNumber,
            sheng:$scope.customerInfo.areaData.sheng,
            shi:$scope.customerInfo.areaData.shi,
            qu:$scope.customerInfo.areaData.qu,
            detailAddress:$scope.customerInfo.detailAddress,
            postalcode:$scope.customerInfo.postalcode
          };
          $scope.data.userAddressId=address.userAddressId;
          $scope.userAddressList.push(address);
        }
      });
    };



    $scope.pay=function () {
      alert("请进行支付，下单成功.");

    }




  }])
  .controller('OrderPay_designCtrl', ["$scope",function($scope) {
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

  .controller('DiyClothCtrl', ["$scope","$state","$stateParams","getImageBase64Factory","$ionicActionSheet",
    "$ionicModal", "getDesignerLogoListFactory","saveDiyClothFactory",
    function($scope,$state,$stateParams,getImageBase64Factory,$ionicActionSheet,$ionicModal,
             getDesignerLogoListFactory,saveDiyClothFactory) {
      $scope.clothImgUrl=$stateParams["imgUrl"];
      $scope.businessClothId=$stateParams["businessClothId"];
      $scope.selectLogoId=0;
      //选择的logo是否为商家的logo，1代表是商家的logo
      $scope.isBusinessLogo=1;
      var clothImg=new Image();
      var logoImg=new Image();
      getImageBase64Factory.getImageBase64FromService($scope.clothImgUrl);
      var onGetImageBase64FromService= $scope.$on("getImageBase64Factory.getImageBase64FromService",function () {
        onGetImageBase64FromService();
        /*clothImg.crossOrigin = 'anonymous';*/
        /*clothImg.src="../img/shangcheng/cloth/1.jpg";*/
        // var clothImg=document.querySelector("#clothImg");
        clothImg.src = getImageBase64Factory.getImgBase64();
        logoImg.src="../img/logo/logo7.png";

        var clothCanvas=document.querySelector("#clothCanvas");
        var clothCanvasCtx=clothCanvas.getContext("2d");

        //设置canvas的宽和高,宽要设置成屏幕的大小
        clothCanvas.width= document.body.clientWidth;-2;
        clothCanvas.height=450;

        var clothCanvasWidth=clothCanvas.width;
        var clothCanvasHeight=clothCanvas.height;

        //初始化logo的位置
        var logoLeft= 44;
        var logoTop=  16;

        //初始化logo的大小
        var logoWidth=100;
        var logoHeight=100;

        //放大次数
        var multipleCount=0;
        //每次缩放的倍数
        var multiple=1.1;

        clothImg.onload=function () {
          logoImg.onload=function () {
            drawing();
          }
        };

        function drawing(coordinate) {
          if(coordinate && clothCanvasCtx.isPointInPath(coordinate.x, coordinate.y)) {
            logoLeft = coordinate.x - logoWidth/2;
            logoTop = coordinate.y - logoHeight/2;
          }
          clothCanvasCtx.clearRect(0,0,clothCanvasWidth,clothCanvasHeight);
          clothCanvasCtx.drawImage(clothImg,0,0,clothCanvasWidth,clothCanvasHeight);
          clothCanvasCtx.beginPath();
          clothCanvasCtx.strokeStyle="#fff";
          clothCanvasCtx.rect(logoLeft,logoTop,logoWidth,logoHeight);
          clothCanvasCtx.closePath();
          clothCanvasCtx.stroke();
          clothCanvasCtx.drawImage(logoImg,logoLeft,logoTop,logoWidth,logoHeight);
        }

        //触摸移动
        clothCanvas.addEventListener("touchmove",function (e) {

          var moveTouch = e.targetTouches[0];

          //layerX || offsetX
          var coordinate = {
            x: moveTouch.clientX - moveTouch.target.offsetLeft,
            y: moveTouch.clientY - moveTouch.target.offsetTop
          };
          coordinate.x=coordinate.x;
          coordinate.y=coordinate.y;
          drawing(coordinate);
        },false);

        //放大
        $scope.zoomLogoBig=function () {
          if(multipleCount >= 8){
            console.log('not big');
            return false;
          }
          scale(multiple);
          multipleCount += 1;
          drawing();
        }
        //缩小
        $scope.zoomLogoSmall= function (){
          if(multipleCount <= -8) {
            console.log('not small');
            return false;
          }
          scale(1/multiple);
          multipleCount -= 1;
          drawing();
        }
        function scale(multiple) {
          logoWidth = multiple * logoWidth;
          logoHeight = multiple * logoHeight;
        }
      });

      $scope.logoList=[
        {
          id:null,
          caption:"",
          introduction:"",
          author:null,
          imgUrl:""
        }
      ];
      //选择Logo
      $scope.selectLogoActionSheet= function () {
        // Show the action sheet
        var hideSheet= $ionicActionSheet.show({
          cancelOnStateChange:true,
          cssClass:'action_s',
          titleText: "<b>选择logo</b>",
          buttons: [
            { text: "设计师的logo" }
          ],
          buttonClicked: function() {
            getDesignerLogoListFactory.getDesignerLogoListFromService(1);
            var onGetDesignerLogoListFromService=$scope.$on("getDesignerLogoListFactory.getDesignerLogoListFromService",function () {
              onGetDesignerLogoListFromService();
              $scope.logoList=getDesignerLogoListFactory.getDesignerLogoList();
              $scope.modal.show();
            })

            return true;
          },
          cancelText: "取消",
          cancel: function() {
            // add cancel code..
            console.log('执行了取消操作');
            return true;
          }
        });
      }


      $ionicModal.fromTemplateUrl("selectLogo",{
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

      $scope.dingZhi=function () {
        var diyImg=clothCanvas.toDataURL("image/png");
        var diyImgBase64=diyImg.substr(diyImg.indexOf(",") + 1)//去掉base64的格式头，因为格式头不属于图片的数据，否则后台将图片的base64保存为图片时会出错
        saveDiyClothFactory.saveDiyClothToService($scope.businessClothId,$scope.selectLogoId,$scope.isBusinessLogo,diyImgBase64);
        var onSaveDiyClothToService=$scope.$on("saveDiyClothFactory.saveDiyClothToService",function () {
          onSaveDiyClothToService();
          var myDiyCloth= {
            myDiyClothId:null,
            imgUrl:""
          };
          myDiyCloth=saveDiyClothFactory.getMyDiyCloth();
          $state.go("makeOrder_shopping",{myDiyClothId:myDiyCloth.myDiyClothId,imgUrl:myDiyCloth.imgUrl});
        });

      }

      $scope.selectLogo=function (index_) {
        $scope.modal.hide();
        getImageBase64Factory.getImageBase64FromService($scope.logoList[index_].imgUrl);
        $scope.selectLogoId=$scope.logoList[index_].id;
        $scope.isBusinessLogo=0;
        var onGetImageBase64FromService=$scope.$on("getImageBase64Factory.getImageBase64FromService",function () {
          onGetImageBase64FromService();
          logoImg.src= getImageBase64Factory.getImgBase64();
        });
      }
  }])


  .controller('AiDingZhiCtrl', ["$scope","$state","getDataFactory"
              ,function($scope,$state,getDataFactory) {
      $scope.designDatas=[
        "../img/sjg/sjg13.jpg",
        "../img/sjg/sjg1.jpg",
        "../img/sjg/sjg3.jpg",
        "../img/sjg/sjg4.jpg",
        "../img/sjg/sjg5.png"];
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
      //清除全局数据
      userDataFactory.removeLocalStorage();
      //清除localStorage数据
      userDataFactory.clearUserDataConfig();
      /*var onLoginOut= $scope.$on("loginOutFactory.loginOut",function () {
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
      });*/

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
    $scope.goToMyAddress=function () {
      $state.go("myAddress");
    }

    $scope.test=function () {
      /*alert("test");*/
    }


  }])
  .controller('MyAddressCtrl',["$scope","$state","getUserAddressListFactory",function($scope,$state,getUserAddressListFactory) {
    $scope.userAddressList=[{
      userAddressId:null,
      userId:null,
      realName:"",
      phoneNumber:null,
      sheng:"",
      shi:"",
      qu:"",
      detailAddress:"",
      postalcode:null
    }];
    getUserAddressListFactory.getUserAddressListFromService();
    var onGetUserAddressListFromService=$scope.$on("getUserAddressListFactory.getUserAddressListFromService",function () {
      onGetUserAddressListFromService();
      $scope.userAddressList=getUserAddressListFactory.getUserAddressList();
    });
    $scope.goToAdd_address=function () {
      $state.go("add_address");
    };
    $scope.goToUpdate_address=function (userAddressId) {
      $state.go("update_address",{userAddressId:userAddressId});
    };

  }])
  .controller('Add_addressCtrl',["$scope","$state","saveUserAddressFactory",function($scope,$state,saveUserAddressFactory) {
    $scope.customerInfo={
      realName:"",
      phoneNumber:"",
      areaData:{
        sheng:"",//省
        shi:"",//市
        qu:""//区
      },
      detailAddress:"",
      postalcode:""
    };

    var vm=$scope.vm={};
    vm.cb = function () {
      $scope.customerInfo.areaData.sheng=vm.CityPickData1.areaData[0];
      $scope.customerInfo.areaData.shi=vm.CityPickData1.areaData[1];
      $scope.customerInfo.areaData.qu=vm.CityPickData1.areaData[2];
    }
    //例1
    vm.CityPickData1 = {
      areaData: [],
      backdrop: true,
      backdropClickToClose: true,
      defaultAreaData: ['江苏', '无锡', '江阴市'],
      buttonClicked: function () {
        vm.cb()
      },
      title: "所在地区："
    };

    //保存新增的地址到服务器
    $scope.saveAddress=function () {
      //将用户地址数据保存到服务器
      saveUserAddressFactory.saveUserAddressToService($scope.customerInfo.realName,$scope.customerInfo.phoneNumber,$scope.customerInfo.areaData.sheng,$scope.customerInfo.areaData.shi,$scope.customerInfo.areaData.qu,$scope.customerInfo.detailAddress,$scope.customerInfo.postalcode);
      var onSaveUserAddressToService=$scope.$on("saveUserAddressFactory.saveUserAddressToService",function () {
        onSaveUserAddressToService();
        //保存成功
        if(saveUserAddressFactory.getIsSaveSuccess()){
         $state.go("myAddress");
        }
      });
    };






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
      $state.go("myShangCheng_cloth");
    };
    $scope.goToShangjia_logo=function () {
      $state.go("myShangCheng_logo");
    };
    $scope.goToShangjia_upload=function () {
      $state.go("shangjia_upload");
    };
  }])
  .controller('MyShangCheng_clothCtrl', ["$scope","getMyShangChengClothListFactory","userDataFactory",function($scope,getMyShangChengClothListFactory,userDataFactory) {
    //保存用户的数据
    $scope.userDataView={};
    //从config获取用户数据
    $scope.userDataView=userDataFactory.getUserDataConfig();

    $scope.myShangChengClothList={
      id:null,
      caption:"",
      introduction:"",
      businesser:null,
      price:null,
      imgUrl:""
    };
    getMyShangChengClothListFactory.getMyShangChengClothListFromService($scope.userDataView.userName);
    var onGetMyShangChengClothListFromService=$scope.$on("getMyShangChengClothListFactory.getMyShangChengClothListFromService",function () {
      onGetMyShangChengClothListFromService();
      $scope.myShangChengClothList=getMyShangChengClothListFactory.getShangChengClothList();
    })

    $scope.openModal=function () {
      alert("查看详情");
    }


  }])

  .controller('MyShangCheng_logoCtrl', ["$scope","getMyShangChengLogoListFactory","userDataFactory",function($scope,getMyShangChengLogoListFactory,userDataFactory) {
    //保存用户的数据
    $scope.userDataView={};
    //从config获取用户数据
    $scope.userDataView=userDataFactory.getUserDataConfig();

    $scope.myShangChengLogoList={
      id:null,
      caption:"",
      introduction:"",
      businesser:null,
      imgUrl:""
    };
    getMyShangChengLogoListFactory.getMyShangChengLogoListFromService($scope.userDataView.userName);
    var onGetMyShangChengLogoListFromService=$scope.$on("getMyShangChengLogoListFactory.getMyShangChengLogoListFromService",function () {
      onGetMyShangChengLogoListFromService();
      $scope.myShangChengLogoList=getMyShangChengLogoListFactory.getShangChengLogoList();
    })

    $scope.openModal=function () {
      alert("查看详情");
    }
  }])
  .controller('Collect_sjgCtrl', ["$scope",function($scope) {
  }])

  .controller('Collect_logoCtrl', ["$scope",function($scope) {
  }])

  .controller('MySjgCtrl', ["$scope","$state","getMySjgListFactory","userDataFactory","$cordovaImagePicker","$ionicActionSheet",function($scope,$state,getMySjgListFactory,userDataFactory,$cordovaImagePicker,$ionicActionSheet) {

    //保存用户的数据
    $scope.userDataView={};
    //从config获取用户数据
    $scope.userDataView=userDataFactory.getUserDataConfig();
    //我的设计稿列表
    $scope.mySjgList=[];
    getMySjgListFactory.getMySjgListFromService($scope.userDataView.userName);
    var onGetMySjgListFromService=$scope.$on("getMySjgListFactory.getMySjgListFromService",function () {
      onGetMySjgListFromService();
      $scope.mySjgList = getMySjgListFactory.getMySjgList();
    });

    $scope.goToMySjgDetails=function (sjgId_) {
      // sjgId_为设计稿的sjgId
      $state.go("mySjg_details",{sjgId:sjgId_});
    }

    //保存衣服图片
    $scope.imgClothSrc="";
    //此函数实现从相册中挑选一张照片
    function selectImg() {
      alert("调用相册接口，因为是在公司，无法进行手机测试");
      $state.go("upload_sjg");
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
              //选择衣服图片
              $scope.imgClothSrc=results[0];
              $state.go("upload_sjg");
          },function (error) {

          });
      }, false);
    }
    //此函数实现显示一个ActionSheet，提示用户选择从相册上传照片
     $scope.uploadImg=function() {
      // Show the action sheet
      var hideSheet= $ionicActionSheet.show({
        cancelOnStateChange:true,
        cssClass:'action_s',
        titleText: "<b>请从相册挑选一件衣服图片进行上传</b>",
        buttons: [
          { text: "相册" }
        ],
        buttonClicked: function() {
          selectImg();
          return true;
        },
        cancelText: "取消",
        cancel: function() {
          // add cancel code..
          console.log('执行了取消操作');
          return true;
        }
      });
    }


  }])

  .controller('MySjg_detailsCtrl', ["$scope","$state","getSjgDetailsFactory","$stateParams",function($scope,$state,getSjgDetailsFactory,$stateParams) {
    //获得设计稿id
    var sjgId=$stateParams["sjgId"];
    $scope.sjgDetails={};
    //根据设计稿id获得sjg详情数据
    getSjgDetailsFactory.getSjgDetailsFromService(sjgId);
    var onGetSjgDetailsFromService=$scope.$on("getSjgDetailsFactory.getSjgDetailsFromService",function () {
      onGetSjgDetailsFromService();
      $scope.sjgDetails=getSjgDetailsFactory.getSjgDetails();
    });
    /*console.log($scope.sjgDetails);//这样访问不到数据，但是实际上数据是存在的*/
    $scope.test=function () {
      alert(sjgId);
    };
    $scope.goToMySjg=function () {
      $state.go("mySjg");
    }
  }])

  .controller('MyLogoCtrl', ["$scope","getMyLogoListFactory","userDataFactory",function($scope,getMyLogoListFactory,userDataFactory) {
    //保存用户的数据
    $scope.userDataView={};
    //从config获取用户数据
    $scope.userDataView=userDataFactory.getUserDataConfig();
    //我的logo列表
    $scope.myLogoList=[];
    getMyLogoListFactory.getMyLogoListFromService($scope.userDataView.userName);
    var onGetMyLogoListFromService=$scope.$on("getMyLogoListFactory.getMyLogoListFromService",function () {
      onGetMyLogoListFromService();
      $scope.myLogoList = getMyLogoListFactory.getMyLogoList();
    });

  }])

  .controller('UpdateInfoCtrl',["$scope","$state",function($scope,$state) {
  }])

  .controller('Update_touxiangCtrl',["$scope","$state",
    "$ionicActionSheet","$timeout","$cordovaImagePicker",
    "$cordovaCamera","userDataFactory", "updateUserTouXiangFactory",function($scope,$state,$ionicActionSheet,$timeout,$cordovaImagePicker,
                               $cordovaCamera,userDataFactory,updateUserTouXiangFactory) {

      //保存用户的数据
      $scope.userDataView={};
      //从config获取用户数据
      $scope.userDataView=userDataFactory.getUserDataConfig();
      /*$scope.test=function () {
        $scope.userDataView.touXiangUrl="http://www.runoob.com/images/pulpit.jpg";
      };*/
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
            var options={};
            if(index==0)//拍照
            {
              options = {
                /*quality: 100,*/
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA
                /*correctOrientation:true*/
              };

            }
            else {//从手机选择照片
              //定义Camera的参数
              options = {
                /*quality: 100,*/
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY
                /*correctOrientation:true*/
                /*allowEdit: true,*/
                /*encodingType: Camera.EncodingType.JPEG,*/
                /*targetWidth: 100,
                 targetHeight: 100,*/
                /*popoverOptions: CameraPopoverOptions,*/
                /*saveToPhotoAlbum: false,*/
                /*correctOrientation:true*/
              };
            }
            //调用Camera
            document.addEventListener("deviceready", function () {
              $cordovaCamera.getPicture(options).then(function(imageData) {
                $scope.userDataView.touXiangUrl="data:image/jpeg;base64,"+imageData;
                //调用服务层将头像的base64发送到服务器
                updateUserTouXiangFactory.updateUserTouXiang($scope.userDataView.accountNumber,imageData);
                //获取修改头像结果
                var onUpdateUserTouXiang=$scope.$on("updateUserTouXiangFactory.updateUserTouXiang",function () {
                  onUpdateUserTouXiang();
                  var isUpdateUserTouXiangSucess=updateUserTouXiangFactory.getIsUpdateUserTouXiangSucess();
                  if(isUpdateUserTouXiangSucess){
                    //将用户头像base64的修改更新到localStorage
                    userDataFactory.pushToLocalStorage();
                    $state.go("myInformation");
                  }
                  else {
                    alert("保存失败");
                  }

                });

                /*alert(imageData);*/

                /*var image = document.getElementById('myImage');
                 image.src = "data:image/jpeg;base64," + imageData;*/
              }, function(err) {
                alert(err);
                // error
              });
            }, false);

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

  .controller('Update_addressCtrl',["$scope","$state","$stateParams","getUserAddressByUserAddressIdFactory","updateUserAddressByUserAddressIdFactory",function($scope,$state,$stateParams,getUserAddressByUserAddressIdFactory,updateUserAddressByUserAddressIdFactory) {

    var userAddressId=$stateParams["userAddressId"];
    $scope.customerInfo={
      realName:"",
      phoneNumber:"",
      areaData:{
        sheng:"",//省
        shi:"",//市
        qu:""//区
      },
      detailAddress:"",
      postalcode:""
    };
     vm=$scope.vm={};
    vm.cb = function () {
      $scope.customerInfo.areaData.sheng=vm.CityPickData1.areaData[0];
      $scope.customerInfo.areaData.shi=vm.CityPickData1.areaData[1];
      $scope.customerInfo.areaData.qu=vm.CityPickData1.areaData[2];
    }
    //例1
    vm.CityPickData1 = {
      areaData: [],
      backdrop: true,
      backdropClickToClose: true,
      buttonClicked: function () {
        vm.cb()
      },
      title: "所在地区："
    };
    getUserAddressByUserAddressIdFactory.getUserAddressByUserAddressIdFromService(userAddressId);
    var onGetUserAddressByUserAddressIdFromService=$scope.$on("getUserAddressByUserAddressIdFactory.getUserAddressByUserAddressIdFromService",function () {
      onGetUserAddressByUserAddressIdFromService();
      var userAddress=getUserAddressByUserAddressIdFactory.getUserAddress();
      $scope.customerInfo.realName=userAddress.realName;
      $scope.customerInfo.phoneNumber=userAddress.phoneNumber;
      $scope.customerInfo.detailAddress=userAddress.detailAddress;
      $scope.customerInfo.postalcode=userAddress.postalcode;
      $scope.customerInfo.areaData.sheng=userAddress.sheng;
      $scope.customerInfo.areaData.shi=userAddress.shi;
      $scope.customerInfo.areaData.qu=userAddress.qu;
    });
    $scope.updateAddress=function () {

      updateUserAddressByUserAddressIdFactory.updateUserAddressByUserAddressIdToService(
        userAddressId,
        $scope.customerInfo.realName,
        $scope.customerInfo.phoneNumber,
        $scope.customerInfo.areaData.sheng,
        $scope.customerInfo.areaData.shi,
        $scope.customerInfo.areaData.qu,
        $scope.customerInfo.detailAddress,
        $scope.customerInfo.postalcode
      );
      var onUpdateUserAddressByUserAddressIdToService=$scope.$on("updateUserAddressByUserAddressIdFactory.updateUserAddressByUserAddressIdToService",function () {
        onUpdateUserAddressByUserAddressIdToService();
        if(updateUserAddressByUserAddressIdFactory.getisUpdateSuccess()){
          $state.go("myAddress");
        }
      });
    }
  }])















/*angular.module("starter.controllers",[])
  .controller('ControllerIndex', ["$state",function($state) {
    $state.go("tab");
  }]);*/
