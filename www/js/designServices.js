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


  /**
   * * Created by simple on 2016/12/11.
   * 设计师上传设计稿
   * 调用接口：design/designerUploadSjs_authority：
   *            上传成功：flat=true
   *                失败：flat=false
   */
  .factory("designerUploadSjsFactory",function (THEGLOBAL,$resource,$rootScope,userDataFactory) {
    var theUrl=THEGLOBAL.serviceAPI + "/design/designerUploadSjs_authority";
    var isDesignerUploadSjsSuccess;//true代表上传成功
    return{
      designerUploadSjs:function (caption_,introduction_,sjgImgs_) {

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
            caption:caption_,
            introduction:introduction_,
            sjgImgs:sjgImgs_
          },
          success:function (data) {
            var jsonData=JSON.parse(data);
            isDesignerUploadSjsSuccess=jsonData.flat;
            $rootScope.$broadcast("designerUploadSjsFactory.designerUploadSjs");
          }
        });
      },
      getIsDesignerUploadSjsSuccess:function () {
        return isDesignerUploadSjsSuccess;
      }
    }
  })


  /**
   * * Created by simple on 2017/02/05.
   * 设计师上传logo
   * 调用接口：design/designerUploadLogo_authority：
   *            上传成功：flat=true
   *                失败：flat=false
   */
  .factory("designerUploadLogoFactory",function (THEGLOBAL,$resource,$rootScope,userDataFactory) {
    var theUrl=THEGLOBAL.serviceAPI + "/design/designerUploadLogo_authority";
    var isDesignerUploadLogoSuccess;//true代表上传成功
    return{
      designerUploadLogo:function (caption_,introduction_,logoImgs_) {

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
            caption:caption_,
            introduction:introduction_,
            logoImgs:logoImgs_
          },
          success:function (data) {
            var jsonData=JSON.parse(data);
            isDesignerUploadLogoSuccess=jsonData.flat;
            $rootScope.$broadcast("designerUploadLogoFactory.designerUploadLogo");
          }
        });
      },
      getIsDesignerUploadSjsSuccess:function () {
        return isDesignerUploadLogoSuccess;
      }
    }
  })



  /**
   * * Created by simple on 2016/12/11.
   * 获取设计师列表数据
   * 调用接口：design/getDesignerList：
   *返回设计师列表数据：
   [{
     userId:21，//用户id
     userName:"simple", //用户名
     nickname:"擅长衣服设计",//个性签名
     worksCount:20，//作品数
     touXiangUrl："images/touXiang/123.jpg"//头像url
     }]
   */
  .factory("getDesignerListFactory",function (THEGLOBAL,$resource,$rootScope) {
    var theUrl=THEGLOBAL.serviceAPI + "/design/getDesignerList";
    var isGetDesignerListSuccess;//true代表成功
    var designerList=[];
    return{
      //请求服务器获取数据
      getDesignerListFromService:function () {
        $.ajax({
          type:"get",
          url:theUrl,
          xhrFields: {
            withCredentials: true
          },
          success:function (data) {
            /*var jsonData=JSON.parse(data);*/
            designerList=data;
            for(i=0;i<designerList.length;i++){
              designerList[i].touXiangUrl=THEGLOBAL.serviceAPI+"/"+designerList[i].touXiangUrl;
            }
            $rootScope.$broadcast("getDesignerListFactory.getDesignerListFromService");
          }
        });
      },
      //返回数据
      getDesignerList:function () {
        return designerList;
      }

    }
  })

  /**
   * * Created by simple on 2016/12/11.
   * 获取设计稿列表数据
   * 调用接口：design/getSjgList：
   * 返回设计稿列表数据：List<DesignDrawing>
   */
  .factory("getSjgListFactory",function (THEGLOBAL,$resource,$rootScope) {
    var theUrl=THEGLOBAL.serviceAPI + "/design/getSjgList";
    var isGetSjgListSuccess;//true代表成功
    var sjgList=[
      {
        id:null,
        caption:"",
        introduction:"",
        author:null,
        price:null,
        firstImgUrl:""
      }
    ];
    return{
      //请求服务器获取数据
      getSjgListFromService:function (page_) {
        $.ajax({
          type:"get",
          url:theUrl,
          xhrFields: {
            withCredentials: true
          },
          data:{page:page_},
          success:function (data) {
            sjgList=data;
            for(i=0;i<sjgList.length;i++){
              sjgList[i].firstImgUrl=THEGLOBAL.serviceAPI+"/"+sjgList[i].firstImgUrl;
            }
            $rootScope.$broadcast("getSjgListFactory.getSjgListFromService");
          }
        });
      },
      //返回数据
      getSjgList:function () {
        return sjgList;
      }

    }
  })
  /**
   * * Created by simple on 2016/12/11.
   * 获取设计师的logo列表数据
   * 调用接口：design/getDesignerLogoList：
   * 返回设计稿列表数据：List<DesignerLogo>
   */
  .factory("getDesignerLogoListFactory",function (THEGLOBAL,$resource,$rootScope) {
    var theUrl=THEGLOBAL.serviceAPI + "/design/getDesignerLogoList";
    var isGetDesignerLogoListSuccess;//true代表成功
    var designerLogoList=[
      {
        id:null,
        caption:"",
        introduction:"",
        author:null,
        imgUrl:""
      }
    ];
    return{
      //请求服务器获取数据
      getDesignerLogoListFromService:function (page_) {
        $.ajax({
          type:"get",
          url:theUrl,
          xhrFields: {
            withCredentials: true
          },
          data:{page:page_},
          success:function (data) {

            /*console.log(data);*/
            designerLogoList=data;
            for(i=0;i<designerLogoList.length;i++){
              designerLogoList[i].imgUrl=THEGLOBAL.serviceAPI+"/"+designerLogoList[i].imgUrl;
            }
            $rootScope.$broadcast("getDesignerLogoListFactory.getDesignerLogoListFromService");
          }
        });
      },
      //返回数据
      getDesignerLogoList:function () {
        return designerLogoList;
      }

    }
  })



  /**
   * * Created by simple on 2016/12/14.
   * 获取一个设计师的详情数据
   * 调用接口：design/getDesignerDetails
   * 返回设计师的详情数据:DesignerVo数据结构
   */
  .factory("getDesignerDetailsFactory",function (THEGLOBAL,$resource,$rootScope) {
    var theUrl=THEGLOBAL.serviceAPI + "/design/getDesignerDetails";
    var isGetDesignerDetailsSuccess;//true代表成功
    var designerDetails={
      userId:null,//用户id
      userName:null,
      touXiangUrl:null,
      introduction:"",//介绍
      sjgs:[{
        sjgId:null,
        sjgImg:null,
        sjgCaption:null
      },{
        sjgId:null,
        sjgImg:null,
        sjgCaption:null
      }]//设计稿集
    };
    return{
      //请求服务器获取数据
      getDesignerDetailsFromService:function (userId_) {
        $.ajax({
          type:"get",
          url:theUrl,
          xhrFields: {
            withCredentials: true
          },
          data:{
            userId:userId_
          },
          success:function (data) {
            // 清空
            designerDetails={};
            designerDetails.sjgs=[];


            /*var jsonData=JSON.parse(data);*/
            designerDetails.userId=data.userId;
            designerDetails.introduction=data.introduction;
            designerDetails.userName=data.user.userName;
            var sjg={};
            for(i=0;i<data.designDrawingExtendList.length;i++){
              designerDetails.sjgs[i]={
                sjgId:data.designDrawingExtendList[i].id,
                sjgCaption:data.designDrawingExtendList[i].caption,
                sjgImg:THEGLOBAL.serviceAPI+"/"+data.designDrawingExtendList[i].firstImgUrl
              };
            };
            designerDetails.touXiangUrl=THEGLOBAL.serviceAPI+"/"+data.user.touXiangUrl;

            /*console.log(designerDetails);*/

            $rootScope.$broadcast("getDesignerDetailsFactory.getDesignerDetailsFromService");
          }
        });
      },
      //返回数据
      getDesignerDetails:function () {
        return designerDetails;
      }

    }
  })

  /**
   * * Created by simple on 2017/02/05.
   * 获取一个设计稿的详情数据
   * 调用接口：design/getSjgDetails
   * 返回设计师的详情数据:DesignDrawing数据结构
   */
  .factory("getSjgDetailsFactory",function (THEGLOBAL,$resource,$rootScope) {
    var theUrl=THEGLOBAL.serviceAPI + "/design/getSjgDetails";
    var isGetSjgDetailsSuccess;//true代表成功
    var sjgDetails={
      sjgId:null,//用户id
      caption:null,
      introduction:"",//介绍
      designer:null,
      price:null,
      sjgFirstImg:""//设计稿封面
    };
    return{
      //请求服务器获取数据
      getSjgDetailsFromService:function (sjgId_) {
        $.ajax({
          type:"get",
          url:theUrl,
          xhrFields: {
            withCredentials: true
          },
          data:{
            sjgId:sjgId_
          },
          success:function (data) {
          /*  // 清空
            designerDetails={};
            designerDetails.sjgs=[];*/
            /*var jsonData=JSON.parse(data);*/
            sjgDetails.sjgId=data.id;
            sjgDetails.caption=data.caption;
            sjgDetails.introduction=data.introduction;
            sjgDetails.designer=data.author;
            sjgDetails.price=data.price;
            sjgDetails.sjgFirstImg=THEGLOBAL.serviceAPI+"/"+data.firstImgUrl;
            $rootScope.$broadcast("getSjgDetailsFactory.getSjgDetailsFromService");
          }
        });
      },
      //返回数据
      getSjgDetails:function () {
        return sjgDetails;
      }

    }
  })
