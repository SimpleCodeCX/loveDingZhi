/**
 * Created by simple on 2016/10/15.
 */

angular.module("starter",["ionic"])
  .run(function($ionicPlatform) {
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
            templateUrl:"design/design.html"
          }
        }
    })
      .state("tab.aiDingZhi",{
        url:"/aiDingZhi",
        views:{
          "tab-aiDingZhi":{
            templateUrl:"aiDingZhi/aiDingZhi.html"
          }
        }
      })
      .state("tab.shopping",{
        url:"/shopping",
        views:{
          "tab-shopping":{
            templateUrl:"shopping/shopping.html"
          }
        }
      })
      .state("tab.account",{
        url:"/account",
        views:{
          "tab-account":{
            templateUrl:"account/account.html"
          }
        }
      })
      .state("login",{
        url:"/login",
        templateUrl:"account/login.html"
      })
      .state("register",{
        url:"/register",
        templateUrl:"account/register.html"
      });

    $urlRouterProvider.otherwise("/tab/home");
  }]);








