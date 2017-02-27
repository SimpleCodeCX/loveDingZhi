/**
 * Created by simple on 2016/10/25.
 */
angular.module("starter.shoppingServices",[])
/**
 * * Created by simple on 2016/12/09.
 * 实现申请成为商家的功能
 * 调用接口：shopping/applyBusiness_authority：
 *            提交成功：flat=true
 *                失败：flat=false
 */
  .factory("applyBusinessFactory",function (THEGLOBAL,$resource,$rootScope,userDataFactory) {
    var theUrl=THEGLOBAL.serviceAPI + "/shopping/applyBusiness_authority";
    var ispplyBusinessSuccess;//true代表提交成功
    return{
      applyBusiness:function (businessLicenseImg_) {
        //账号
        var accountNumber_=userDataFactory.getUserDataConfig().accountNumber;
        $.ajax({
          type:"post",
          url:theUrl,
          xhrFields: {
            withCredentials: true
          },
          data:{
            accountNumber:accountNumber_,
            businessLicenseImg:businessLicenseImg_
          },
          success:function (data) {
            var jsonData=JSON.parse(data);
            ispplyBusinessSuccess=jsonData.flat;
            if(ispplyBusinessSuccess){
              //申请成功 修改缓存里的数据
              userDataFactory.setIsBusiness(true);
              userDataFactory.pushToLocalStorage();
            }
            $rootScope.$broadcast("applyBusinessFactory.applyBusiness");
          }
        });
      },
      getIspplyBusinessSuccess:function () {
        return ispplyBusinessSuccess;
      }
    }
  })
