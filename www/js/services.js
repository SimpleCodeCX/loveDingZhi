/**
 * Created by simple on 2016/10/25.
 */
angular.module("starter.services",[])
  //实现用户登录功能
  .factory("loginFactory",function (THEGLOBAL,$resource,$rootScope) {

  })
  //实现用户注册功能
  .factory("registerFactory",function (THEGLOBAL,$resource,$rootScope) {
    var registerApi=THEGLOBAL.serviceAPI+"/account/register";
    var resource=$resource(registerApi);
    return {
      makeRegister:function () {
        return resource.get({
          a:"数据1",
          b:"数据2"
        });

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
