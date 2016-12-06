/**
 * Created by simple on 2016/10/25.
 */
angular.module("starter.services",[])

/**
 * * Created by simple on 2016/11/27.
 * 实现登录功能
 * 调用接口：account/login：
 *            登录成功：flat=true
 *                失败：flat=false
 */
  .factory("loginFactory",function (THEGLOBAL,$resource,$rootScope,userDataFactory) {
    var theUrl=THEGLOBAL.serviceAPI + "/account/login";
    var isLoginSuccess;//true代表登录成功
    var userDataService={//保存用户数据
      isLogin:null,//是否已经登录
       userName:null,//用户名
       accountNumber:null,//账号
       realName:null,//真实姓名
       phoneNumber:null,//手机号码
       address:null,//收获地址
       isDesigner:true,//是否为设计师
       isBusiness:true,//是否为商家
       touXiangUrl:null//头像url
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
          /*console.log(userDataService);*/
          isLoginSuccess=data.userData.isLogin;

          if(isLoginSuccess){
            //登录成功

            // 将用户数据保存到config全局变量，并更新到缓存localStorage里
            userDataFactory.setUserDataConfig(data.userData.isLogin,
              data.userData.userName,
              data.userData.accountNumber,
              userData_.password,//这个密码保存的是加密前的密码，下一次登录才能成功
              data.userData.realName,
              data.userData.phoneNumber,
              data.userData.address,
              data.userData.isDesigner,
              data.userData.isBusiness,
              data.userData.touXiangUrl);
            //将数据更新到localStorage
            userDataFactory.pushToLocalStorage();
          }
          /*console.log(data);*/
         /* userDataService.isLogin=data.userData.isLogin;
          userDataService.userName=data.userData.userName;
          userDataService.accountNumber=data.userData.accountNumber;
          userDataService.realName=data.userData.realName;
          userDataService.phoneNumber=data.userData.phoneNumber;
          userDataService.address=data.userData.address;
          userDataService.isDesigner=data.userData.isDesigner;
          userDataService.isBusiness=data.userData.isBusiness;
          userDataService.touXiangUrl=data.userData.touXiangUrl;*/
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
   * * Created by simple on 2016/12/06.
   * 实现每次运行APP登录功能
   * 调用接口：account/login：
   *            登录成功：flat=true
   *                失败：flat=false
   */
  .factory("firstOpenLoginFactory",function (THEGLOBAL,$resource,userDataFactory) {
    var theUrl=THEGLOBAL.serviceAPI + "/account/login";
    var resource=$resource(theUrl,{},
      {login_get: {method: 'GET', withCredentials: true}}
    );
    return{
      autoLogin:function () {
        //通过缓存判断上一次关闭app之前是否为已登录状态，是的话进行app首次打开自动登录
        var isLogin=userDataFactory.getUserDataConfig().isLogin;
        if(isLogin){
          //是登录状态，使用缓存进行登录
          
          var accountNumber_=userDataFactory.getUserDataConfig().accountNumber;
          var password_=userDataFactory.getUserDataConfig().password;
          resource.login_get({
            accountNumber:accountNumber_,
            password:password_
          },function (data) {
            /*console.log(userDataService);*/
            if(data.userData.isLogin){
              //登录成功
              // 将用户数据保存到config全局变量，并更新到缓存localStorage里
              userDataFactory.setUserDataConfig(data.userData.isLogin,
                data.userData.userName,
                data.userData.accountNumber,
                password_,//这个密码保存的是加密前的密码，下一次登录才能成功
                data.userData.realName,
                data.userData.phoneNumber,
                data.userData.address,
                data.userData.isDesigner,
                data.userData.isBusiness,
                data.userData.touXiangUrl);
              //将数据更新到localStorage
              userDataFactory.pushToLocalStorage();
            }
            else {

              //登录失败，删除localStorage的用户数据缓存以及清楚全局变量的用户数据
              userDataFactory.removeLocalStorage();
              userDataFactory.clearUserDataConfig();
            }
          });
        }
      }
    }
  })






  /**
   * * Created by simple on 2016/12/05.
   * 实现退出登录功能
   * 调用接口：account/loginOut_authority：
   *         退出登录成功：flat=true
   *                失败：flat=false
   */
  .factory("loginOutFactory",function (THEGLOBAL,$resource,$rootScope) {
    var theUrl=THEGLOBAL.serviceAPI + "/account/loginOut_authority";
    var isLoginOutSuccess;//true代表登录成功
    //withCredentials: true允许发送cookie，才能让服务器记住登录状态
    var resource=$resource(theUrl,{},
      {loginOut_get: {method: 'GET', withCredentials: true}}
    );
    return{
      loginOut:function (userData_) {
        resource.loginOut_get({},function (data) {
          isLoginOutSuccess=data.flat;
          $rootScope.$broadcast("loginOutFactory.loginOut");
        });
      },
      getIsLoginOutSuccess:function () {
        return isLoginOutSuccess;
      }
    }
  })




  /**
   * Created by simple on 2016/11/27.
   * 检查数据库账号是否存在
   * 调用接口：account/accountNumberIsExist：
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
   * 调用接口：account/register：
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
   * 调用接口：account/updateUserName：
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
            var jsonData=JSON.parse(data);
            isUpdateUserNameSucess=jsonData.flat;
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
