/**
 * Created by simple on 2016/11/25.
 */
var configModule=angular.module("starter.config",[]);
configModule.constant("THEGLOBAL",{
  "serviceAPI":"http://localhost:8080"
  /*"serviceAPI":"http://10.200.14.208:8080"*/
})
  .factory("userDataFactory",function (THEGLOBAL,$resource,$rootScope) {
    //用户信息
    var userDataConfig={
      isLogin:null,//是否已经登录
      userName:null,//用户名
      realName:null,//真实姓名
      phoneNumber:null,//手机号码
      address:null,//收获地址
      isDesigner:true,//是否为设计师
      isBusiness:true,//是否为商家
      touXiangUrl:null//头像url
    };
    return{
      setUserDataConfig:function (isLogin_, userName_, realName_, phoneNumber_, address_) {
        userDataConfig.isLogin=isLogin_;
        userDataConfig.userName=userName_;
        userDataConfig.realName=realName_;
        userDataConfig.phoneNumber=phoneNumber_;
        userDataConfig.address=address_;
      },
      getUserDataConfig:function () {
        return userDataConfig;
      },
      setIsLogin:function (isLogin_) {
        userDataConfig.isLogin=isLogin_;
      },
      getIsLogin:function () {
        return userDataConfig.isLogin;
      },
      setUserName:function (userName_) {
        userDataConfig.userName=userName_;
      },
      getUserName:function () {
        return userDataConfig.userName;
      },
      setRealName:function (realName_) {
        userDataConfig.realName=realName_;
      },
      getRealName:function () {
        return userDataConfig.realName;
      },
      setPhoneNumber:function (phoneNumber_) {
        userDataConfig.phoneNumber=phoneNumber_;
      },
      getPhoneNumber:function () {
        return userDataConfig.phoneNumber;
      },
      setAddress:function (address_) {
        userDataConfig.address=address_;
      },
      getAddress:function () {
        return userDataConfig.address;
      }

    }
  })


  .factory("configTest",function () {
  })




