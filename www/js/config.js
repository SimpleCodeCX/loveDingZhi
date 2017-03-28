/**
 * Created by simple on 2016/11/25.
 */
var configModule=angular.module("starter.config",[]);
configModule.constant("THEGLOBAL",{
  "serviceAPI":"http://localhost:8080"
  /*"serviceAPI":"http://10.60.231.136:8080"//宿舍的服务器ip*/
  /*"serviceAPI":"http://192.168.0.106:8080"//家里的服务器ip*/
  /*"serviceAPI":"http://192.168.1.103:8080"//5号楼的服务器ip*/
  /*"serviceAPI":"http://192.168.0.135:8080"//公司宿舍的服务器ip*/
  /*"serviceAPI":"http://10.219.91.216:8080"//公司的服务器ip*/
  /*"serviceAPI":"http://10.32.2.228:8080"//公司宿舍的服务器ip*/
  /*"serviceAPI":"http://10.219.91.216:8080"//公司的服务器ip*/
})
  .factory("userDataFactory",function (THEGLOBAL,$resource,$rootScope) {
    //用户信息
    var userDataConfig={
      isLogin:false,//是否已经登录
      userName:"simple",//用户名
      accountNumber:15767973362,//账号
      password:123,//密码
      realName:"陈旭东",//真实姓名
      phoneNumber:15767973362,//手机号码
      address:null,//收获地址
      isDesigner:true,//是否为设计师
      isBusiness:true,//是否为商家
      touXiangUrl:null,//头像url
      nickname:null//昵称
    };
    //初始化为localStorage里存放的用户数据
    /*console.log("初始化为localStorage里存放的用户数据");*/
    if(window.localStorage.getItem("userData")!=null){
      userDataConfig=JSON.parse(window.localStorage.getItem("userData"));
    }

    return{
      setUserDataConfig:function (isLogin_, userName_, accountNumber_,password_,realName_,
                                  phoneNumber_, address_,isDesigner_,isBusiness_,touXiangUrl_,nickname_) {
        userDataConfig.isLogin=isLogin_;
        userDataConfig.userName=userName_;
        userDataConfig.accountNumber=accountNumber_;
        userDataConfig.password=password_;
        userDataConfig.realName=realName_;
        userDataConfig.phoneNumber=phoneNumber_;
        userDataConfig.address=address_;
        userDataConfig.isDesigner=isDesigner_;
        userDataConfig.isBusiness=isBusiness_;
        userDataConfig.touXiangUrl=touXiangUrl_;
        userDataConfig.nickname=nickname_;
      },
      getUserDataConfig:function () {
        return userDataConfig;
      },
      clearUserDataConfig:function () {
        userDataConfig.isLogin=null;
        userDataConfig.userName=null;
        userDataConfig.accountNumber=null;
        userDataConfig.password=null;
        userDataConfig.realName=null;
        userDataConfig.phoneNumber=null;
        userDataConfig.address=null;
        userDataConfig.isDesigner=null;
        userDataConfig.isBusiness=null;
        userDataConfig.touXiangUrl=null;
        userDataConfig.nickname=null;
      },
      pullFromLocalStorage:function () {//从localStorage获取数据
        //从localStorage获取数据是字符串，需要转化为json数据格式
        if(window.localStorage.getItem("userData")!=null){
          var userDataLocalStorage=JSON.parse(window.localStorage.getItem("userData"));
          userDataConfig.isLogin=userDataLocalStorage.isLogin;
          userDataConfig.userName=userDataLocalStorage.userName;
          userDataConfig.accountNumber=userDataLocalStorage.accountNumber;
          userDataConfig.password=userDataLocalStorage.password;
          userDataConfig.realName=userDataLocalStorage.realName;
          userDataConfig.phoneNumber=userDataLocalStorage.phoneNumber;
          userDataConfig.address=userDataLocalStorage.address;
          userDataConfig.isDesigner=userDataLocalStorage.isDesigner;
          userDataConfig.isBusiness=userDataLocalStorage.isBusiness;
          userDataConfig.touXiangUrl=userDataLocalStorage.touXiangUrl;
          userDataConfig.nickname=userDataLocalStorage.nickname;

        }
      },
      pushToLocalStorage:function () {//将userDataConfig数据更新至localStorage
        // json变量转化成json字符串
        var strUserDataConfig = JSON.stringify(userDataConfig);
        //保存
        window.localStorage.setItem("userData",strUserDataConfig);
      },
      removeLocalStorage:function () {
        window.localStorage.removeItem("userData");
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
      setAccountNumber:function (accountNumber_) {
        userDataConfig.accountNumber=accountNumber_;
      },
      getAccountNumber:function () {
        return userDataConfig.accountNumber;
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
      },
      setIsDesigner:function (isDesigner_) {
        userDataConfig.isDesigner=isDesigner_;
      },
      getIsDesigner:function () {
        return userDataConfig.isDesigner;
      },
      setIsBusiness:function (isBusiness_) {
        userDataConfig.isBusiness=isBusiness_;
      },
      getIsBusiness:function () {
        return userDataConfig.isBusiness;
      }

    }
  })


  .factory("configTest",function () {
  })




