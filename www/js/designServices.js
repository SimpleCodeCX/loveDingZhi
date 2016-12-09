/**
 * Created by simple on 2016/10/25.
 */
angular.module("starter.designServices",[])
/**
 * * Created by simple on 2016/12/09.
 * 实现申请成为设计师的功能
 * 调用接口：design/applyDesigner_authority：
 *            提交成功：flat=true
 *                失败：flat=false
 */
  .factory("applyDesignerFactory",function (THEGLOBAL,$resource,$rootScope,userDataFactory) {
    var theUrl=THEGLOBAL.serviceAPI + "/design/applyDesigner_authority";
    var ispplyDesignerSuccess;//true代表提交成功
    return{
      applyDesigner:function (educationBackground_,major_,majorImg_,sjgImgs_) {
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
            educationBackground:educationBackground_,
            major:major_,
            majorImg:majorImg_,
            sjgImgs:sjgImgs_
          },
          success:function (data) {
            var jsonData=JSON.parse(data);
            ispplyDesignerSuccess=jsonData.flat;
            if(ispplyDesignerSuccess){
              //申请成功 修改缓存里的数据
              userDataFactory.setIsDesigner(true);
              userDataFactory.pushToLocalStorage();
            }
            $rootScope.$broadcast("applyDesignerFactory.applyDesigner");
          }
        });
      },
      getIspplyDesignerSuccess:function () {
        return ispplyDesignerSuccess;
      }
    }
  })
