/**
 * Created by simple on 2016/10/25.
 */
angular.module("starter.services",[])

/**
 * * Created by simple on 2016/11/27.
 * 实现登录功能
 * 调用接口：phoneNumberIsExist：
 *            登录成功：flat=true
 *                失败：flat=false
 */
  .factory("loginFactory",function (THEGLOBAL,$resource,$rootScope,$http) {
    var theUrl=THEGLOBAL.serviceAPI + "/account/login";
    var isLoginSuccess;//true代表登录成功
    var userDataService={//保存用户数据
      isLogin:null,
      userName:null,
      accountNumber:null,
      realName:null,
      phoneNumber:null,
      address:null
    };
    //withCredentials: true允许发送cookie，才能让服务器记住登录状态
    var resource=$resource(theUrl,{},
      {login_get: {method: 'GET', withCredentials: true}}
      );
    return{
      login:function (userData_) {
        resource.login_get({
          accountNumber:userData_.accountNumber,
          password:userData_.password
        },function (data) {
          /*console.log(data);*/
          userDataService.isLogin=data.userData.isLogin;
          userDataService.userName=data.userData.userName;
          userDataService.accountNumber=data.userData.accountNumber;
          userDataService.realName=data.userData.realName;
          userDataService.phoneNumber=data.userData.phoneNumber;
          userDataService.address=data.userData.address;
          /*console.log(userDataService);*/
          isLoginSuccess=data.userData.isLogin;
          $rootScope.$broadcast("loginFactory.login");
        });
      },
      getIsLoginSuccess:function () {
        return isLoginSuccess;
      },
      getUserDataService:function () {
        return userDataService;
      }
    }
  })

  /**
   * Created by simple on 2016/11/27.
   * 检查数据库账号是否存在
   * 调用接口：accountNumberIsExist：
   *            存在：flat=true
   *            不存在：flat=false
   */
  .factory("checkAccountNumberFactory",function (THEGLOBAL,$resource,$rootScope) {
    var theUrl = THEGLOBAL.serviceAPI + "/account/accountNumberIsExist";
    var isAccountNumberExist;//布尔类型，true代表手机号码存在
    var resource=$resource(theUrl,{},
      {accountNumberIsExist_get: {method: 'GET', withCredentials: true}});
    return {
      accountNumberIsExist:function (accountNumber_) {
         resource.accountNumberIsExist_get({accountNumber:accountNumber_},function (data) {
           isAccountNumberExist=data.flat;
           // alert(data.flat);
           $rootScope.$broadcast("checkAccountNumberFactory.accountNumberIsExist");
        });
      },
      getIsAccountNumberExist:function () {
        return isAccountNumberExist;
      }
    }
  })
  /**
   * Created by simple on 2016/11/27.
   * 实现用户注册功能
   * 调用接口：register：
   *           成功：flat=true
   *           失败：flat=false
   */
  .factory("registerFactory",function (THEGLOBAL,$rootScope) {
    var registerUrl=THEGLOBAL.serviceAPI+"/account/register";
    var isRegisterSuccess;//布尔类型,是否注册成功,是则true
    return {
      register:function (userData) {
        $.ajax({
          type:"post",
          url:registerUrl,
          xhrFields: {
            withCredentials: true
          },
          data:userData,
          success:function (data) {
            isRegisterSuccess=JSON.parse(data).flat;
            $rootScope.$broadcast("registerFactory.makeRegister");
          }
        });

      },
      getIsRegisterSuccess:function () {
        return isRegisterSuccess;
      }
    }
  })
  /**
   * Created by simple on 2016/12/03.
   * 实现修改用户名
   * 调用接口：updateUserName：
   *           成功：flat=true
   *           失败：flat=false
   */
  .factory("updateUserNameFactory",function (THEGLOBAL,$rootScope) {
    var theUrl=THEGLOBAL.serviceAPI+"/account/updateUserName_authority";
    var isUpdateUserNameSucess;//布尔类型,是否修改成功,是则true
    return {
      updateUserName:function (accountNumber_,userName_) {
        $.ajax({
          type:"post",
          url:theUrl,
          xhrFields: {
            withCredentials: true
          },
          data:{
            accountNumber:accountNumber_,
            userName:userName_
          },
          success:function (data) {
            isUpdateUserNameSucess=JSON.parse(data).flat;
            /*console.log(data);*/
            $rootScope.$broadcast("updateUserNameFactory.updateUserName");
          }
        });

      },
      getIsUpdateUserNameSucess:function () {
        return isUpdateUserNameSucess;
        /*console.log(isUpdateUserNameSucess);*/
      }
    }
  })






















  /*----------------------以下为Test-------------------------------*/
  .factory("getDataFactory",function (THEGLOBAL,$resource,$rootScope) {
    var theUrl=THEGLOBAL.serviceAPI+"/test/data1";
    var topics = {};
    var resource=$resource(theUrl);
    return{
      getData:function () {
        resource.get({},function (data) {
          topics[10]={
            hasNextPage:true,
            'nextPage': 2,
            'data': data
          };
          //请求数据成功，通知子控制器，这里是所有控制器，因为$rootScope是根Scope
          $rootScope.$broadcast('PortalList.portalsUpdated');
        });
      },
      getArticles:function(){
        if(topics[10]===undefined){
          return false
        }
        return topics[10].data;
      }
    }

  })
  .factory("getDataByHttpFactory",function (THEGLOBAL,$http,$rootScope) {
    var theUrl=THEGLOBAL.serviceAPI+"/account/register";
    var data={};
    return {
      getDataByHttp:function () {
         $http({
          method: 'post',
          /*data:{a:"aa",b:"bb"},//加上这个就会自动采用contentType:"application/json，浏览器会使用非简单请求*/
          url: theUrl
        }).then(function successCallback(response) {
          data=response.data;
          $rootScope.$broadcast("getDataByHttpFactory.getDataByHttp");
        }, function errorCallback(error) {
          alert("error");
        });
      },
      getData:function () {
        return data;
      }
    }
  })
  .factory("getDataByAjaxFactory",function (THEGLOBAL,$rootScope) {
    var theUrl=THEGLOBAL.serviceAPI+"/account/register";
    var data={};
    return {
      getDataByAjax:function () {
        $.ajax({
          type:"post",
          url: theUrl,
          data:{a:"dong",b:18},
          /*contentType:"application/json;",*/
          success: function (data2) {
            data=data2;

            $rootScope.$broadcast("getDataByAjaxFactory.getDataByAjax");
          }
        });
      },
      getData:function () {
        return data;
      }
    }
  })
  .factory("UploadSjg",function ($cordovaImagePicker) {
    return{
      all:function () {
        /*      var options = {
         maximumImagesCount: 1,
         width: 150,
         height: 150,
         quality: 80
         };
         /!*当Cordova加载完成后才可以调用Cordova插件*!/
         document.addEventListener("deviceready", function () {
         $cordovaImagePicker.getPictures(options)
         .then(function (results) {

         },function (error) {
         data=error;
         });
         }, false);*/

      }
    }
  })
  .provider("providerService01",function () {
    this.$get=function () {
      return "this is in providerService01";
    }
  })
  .factory("factoryService01",function () {
    return "this is in factoryService01";
  })
  .service("serviceService01",function () {
    /*不能直接返回字符串*/
    /*return "this is in factoryService01";*/
    return{
      message:"this is in serviceService01"
    }
  });
