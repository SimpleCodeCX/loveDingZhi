/**
 * Created by simple on 2016/10/15.
 */

angular.module('starter',['ionic','starter.controllers','starter.services','starter.accountServices',
  'starter.designServices','starter.shoppingServices','starter.aiDingZhiServices','ngCordova','ngResource','starter.config','ionic-citypicker'])
  .run(function($ionicPlatform,userDataFactory,firstOpenLoginFactory) {
    //这里是首次运行就会运行
    //app首次运行时，执行自动登录功能
    firstOpenLoginFactory.autoLogin();

    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })
  .config(["$stateProvider","$urlRouterProvider","$ionicConfigProvider",
    function ($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
      $ionicConfigProvider.platform.ios.tabs.style('standard');
      $ionicConfigProvider.platform.ios.tabs.position('bottom');
      $ionicConfigProvider.platform.android.tabs.style('standard');
      $ionicConfigProvider.platform.android.tabs.position('standard');

      $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
      $ionicConfigProvider.platform.android.navBar.alignTitle('left');

      $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
      $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

      $ionicConfigProvider.platform.ios.views.transition('ios');
      $ionicConfigProvider.platform.android.views.transition('android');
    $stateProvider
      .state("tab",{
        url:"/tab",
        templateUrl:"templates/tabs.html"
      })
      .state("tab.home",{
        url:"/home",
        views:{
          "tab-home":{
            templateUrl:"home/home.html"
          }
        }
      })
      .state("tab.home2",{
        url:"/home2",
        views:{
          "tab-home":{
            templateUrl:"home/home2.html"
          }
        }
      })
      .state("tab.design",{
        url:"/design",
        views:{
          "tab-design":{
            templateUrl:"design/design.html",
            controller: 'DesignCtrl'
          }
        }
    })
      .state("design_drawing",{
      url:"/design_drawing",
      templateUrl:"design/design_drawing.html",
        controller: 'Design_drawingCtrl'
    })
      .state("designer",{
      url:"/designer",
      templateUrl:"design/designer.html",
        controller: 'DesignerCtrl'
    })
      .state("apply_designer",{
        url:"/apply_designer",
        templateUrl:"design/apply_designer.html",
        controller:"Apply_designerCtrl"
      })


      .state("designer_details",{
        url:"/designer_details/:userId",
        templateUrl:"design/designer_details.html",
        controller:"Designer_detailsCtrl"
      })
      .state("sjg_details",{
        url:"/sjg_details/:sjgId",
        templateUrl:"design/sjg_details.html",
        controller:"Sjg_detailsCtrl"
      })
      .state("upload_logo",{
        url:"/upload_logo",
        templateUrl:"design/upload_logo.html",
        controller:"Upload_logoCtrl"
      })
      .state("upload_sjg",{
        url:"/upload_sjg",
        templateUrl:"design/upload_sjg.html",
        controller:"Upload_sjgCtrl"
      })
      .state("logo",{
      url:"/logo",
      templateUrl:"design/logo.html",
        controller:"LogoCtrl"
    })
      .state("dingzhi",{
      url:"/dingzhi/:myDiyClothId/:imgUrl",
      templateUrl:"design/dingzhi.html",
      controller:"DingzhiCtrl"
    })
      .state("makeOrder_shopping",{
        url:"/shopping/makeOrder_shopping/:myDiyClothId/:imgUrl",
        templateUrl:"shopping/makeOrder_shopping.html",
        controller:"MakeOrder_shoppingCtrl"
      })
      .state("makeOrder_design",{
        url:"/design/makeOrder_design/:myDiyClothId/:imgUrl",
        templateUrl:"design/makeOrder_design.html",
        controller:"MakeOrder_designCtrl"
      })

      .state("orderPay_shopping",{
        url:"/orderPay_shopping/:totalPrice",
        templateUrl:"shopping/orderPay_shopping.html",
        controller:"OrderPay_shoppingCtrl"
      })
      .state("orderPay_design",{
        url:"/orderPay_design",
        templateUrl:"design/orderPay_design.html",
        controller:"OrderPay_designCtrl"
      })


 /*     .state("design_tabs.design_drawing",{
        url:"/design_drawing",
        views:{
          "design_page":{
            templateUrl:"design/design_drawing.html"
          }
        }

      })*/
      .state("tab.aiDingZhi",{
        url:"/aiDingZhi",
        views:{
          "tab-aiDingZhi":{
            templateUrl:"aiDingZhi/aiDingZhi.html",
            controller:"AiDingZhiCtrl"
          }
        }
      })

      .state("postNeed",{
        url:"/postNeed",
        templateUrl:"aiDingZhi/postNeed.html",
        controller:"PostNeedCtrl"
      })

      .state("myDingZhi",{
        url:"/myDingZhi",
        templateUrl:"aiDingZhi/myDingZhi.html",
        controller:"MyDingZhiCtrl"
      })

      .state("tab.shopping",{
        url:"/shopping",
        views:{
          "tab-shopping":{
            templateUrl:"shopping/shopping.html",
            controller:"ShoppingCtrl"
          }
        }
      })

      .state("diyCloth",{
        url:"/diyCloth/:imgUrl/:businessClothId",
        templateUrl:"shopping/diyCloth.html",
        controller:"DiyClothCtrl"
      })

      .state("shangJia_details",{
        url:"/shangJia_details",
        templateUrl:"shopping/shangJia_details.html",
        controller:"ShangJia_detailsCtrl"
      })



      .state("shangjia_upload",{
        url:"/shangjia_upload",
        templateUrl:"shopping/shangjia_upload.html",
        controller:"Shangjia_uploadCtrl"
      })
      .state("apply_shangjia",{
        url:"/apply_shangjia",
        templateUrl:"shopping/apply_shangjia.html",
        controller:"Apply_shangjiaCtrl"
      })
      .state("shangjia_upload_cloth",{
        url:"/shangjia_upload_cloth",
        templateUrl:"shopping/shangjia_upload_cloth.html",
        controller:"Shangjia_upload_clothCtrl"
      })
      .state("shangjia_upload_logo",{
        url:"/shangjia_upload_logo",
        templateUrl:"shopping/shangjia_upload_logo.html",
        controller:"Shangjia_upload_logoCtrl"
      })




      .state("tab.account",{
        url:"/account",
        views:{
          "tab-account":{
            templateUrl:"account/account.html",
            controller:"AccountCtrl"
          }
        }
      })

      .state("myInformation",{
        url:"/myInformation",
        templateUrl:"account/myInformation.html",
        controller:"MyInformationCtrl"
      })
      .state("myCollect",{
        url:"/myCollect",
        templateUrl:"account/myCollect.html",
        controller:"MyCollectCtrl"
      })
      .state("myWorks",{
        url:"/myWorks",
        templateUrl:"account/myWorks.html",
        controller:"MyWorksCtrl"
      })
      .state("myShop",{
        url:"/myShop",
        templateUrl:"account/myShop.html",
        controller:"MyShopCtrl"
      })
      .state("myShangCheng_cloth",{
        url:"/myShangCheng_cloth",
        templateUrl:"account/myShangCheng_cloth.html",
        controller:"MyShangCheng_clothCtrl"
      })
      .state("myAddress",{
        url:"/myAddress",
        templateUrl:"account/myAddress.html",
        controller:"MyAddressCtrl"
      })
      .state("add_address",{
        url:"/add_address",
        templateUrl:"account/add_address.html",
        controller:"Add_addressCtrl"
      })
      .state("update_address",{
        url:"/update_address/:userAddressId",
        templateUrl:"account/update_address.html",
        controller:"Update_addressCtrl"
      })
      .state("myShangCheng_logo",{
        url:"/myShangCheng_logo",
        templateUrl:"account/myShangCheng_logo.html",
        controller:"MyShangCheng_logoCtrl"
      })
      .state("updateInfo",{
        url:"/updateInfo",
        templateUrl:"account/updateInfo.html",
        controller:"UpdateInfoCtrl"
      })
      .state("update_touxiang",{
        url:"/update_touxiang",
        templateUrl:"account/update_touxiang.html",
        controller:"Update_touxiangCtrl"
      })
      .state("update_name",{
        url:"/update_name",
        templateUrl:"account/update_name.html",
        controller:"Update_nameCtrl"
      })


      .state("collect_sjg",{
        url:"/collect_sjg",
        templateUrl:"account/collect_sjg.html",
        controller:"Collect_sjgCtrl"
      })

      .state("collect_logo",{
        url:"/collect_logo",
        templateUrl:"account/collect_logo.html",
        controller:"Collect_logoCtrl"
      })

      .state("mySjg",{
        url:"/mySjg",
        templateUrl:"account/mySjg.html",
        controller:"MySjgCtrl"
      })
      .state("mySjg_details",{
        url:"/mySjg_details/:sjgId",
        templateUrl:"account/mySjg_details.html",
        controller:"MySjg_detailsCtrl"
      })

      .state("myLogo",{
        url:"/myLogo",
        templateUrl:"account/myLogo.html",
        controller:"MyLogoCtrl"
      })








      .state("login",{
        url:"/login",
        templateUrl:"account/login.html",
        controller:"LoginCtrl"
      })

      .state("register",{
        url:"/register",
        templateUrl:"account/register.html",
        controller:"RegisterCtrl"
      });


    $urlRouterProvider.otherwise("/tab/home");
  }]);








