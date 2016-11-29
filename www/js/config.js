/**
 * Created by simple on 2016/11/25.
 */
var configModule=angular.module("starter.config",[]);
configModule.constant("THEGLOBAL",{
  "serviceAPI":"http://localhost:8080"
  /*"serviceAPI":"http://10.200.14.208:8080"*/
})
  .factory("userDataFactory",function (THEGLOBAL,$resource,$rootScope) {
    var userData={
      isLogin:null,
      userName:null,
      realName:null,
      phoneNumber:null,
      address:null
    };
    return{
      setUserData:function (isLogin_, userName_, realName_, phoneNumber_, address_) {
        userData.isLogin=isLogin_;
        userData.userName=userName_;
        userData.realName=realName_;
        userData.phoneNumber=phoneNumber_;
        userData.address=address_;
      },
      getUserData:function () {
        return userData;
      },
      setIsLogin:function (isLogin_) {
        isLogin=isLogin_;
      },
      getIsLogin:function () {
        return isLogin;
      },
      setUserName:function (userName_) {
        userName=userName_;
      },
      getUserName:function () {
        return userName;
      },
      setRealName:function (realName_) {
        realName=realName_;
      },
      getRealName:function () {
        return realName_;
      },
      setPhoneNumber:function (phoneNumber_) {
        phoneNumber=phoneNumber_;
      },
      getPhoneNumber:function () {
        return phoneNumber;
      },
      setAddress:function (address_) {
        address=address_;
      },
      getAddress:function () {
        return address;
      }

    }
  })
  .factory("configTest",function () {
    /*登录成功返回的数据*/
    var userData=
    {
      isLogin:true,
      userName:"simple",
      realName:"dong",
      phoneNumber:"15767973362",
      address:"惠州学院"
    }

  })




