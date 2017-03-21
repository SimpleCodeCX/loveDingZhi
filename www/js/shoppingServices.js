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

  /**
   * Created by simple on 2017/03/01.
   * 上传商家衣服商品
   * 调用接口：shopping/shangjiaUploadCloth_authority：
   *            上传成功：flat=true
   *                失败：flat=false
   */
  .factory("shangjiaUploadClothFactory",function (THEGLOBAL,$resource,$rootScope,userDataFactory) {
    var theUrl=THEGLOBAL.serviceAPI + "/shopping/shangjiaUploadCloth_authority";
    var isShangjiaUploadClothSuccess;//true代表上传成功
    return{
      shangjiaUploadCloth:function (caption_,price_,introduction_,shangjiaClothImg_) {

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
            price:price_,
            introduction:introduction_,
            shangjiaClothImg:shangjiaClothImg_
          },
          success:function (data) {
            var jsonData=JSON.parse(data);
            isShangjiaUploadClothSuccess=jsonData.flat;
            $rootScope.$broadcast("shangjiaUploadClothFactory.shangjiaUploadCloth");
          }
        });
      },
      getIsShangjiaUploadClothSuccess:function () {
        return isShangjiaUploadClothSuccess;
      }
    }
  })

  /**
   * Created by simple on 2017/03/01.
   * 上传商家衣服商品
   * 调用接口：shopping/shangjiaUploadLogo_authority：
   *            上传成功：flat=true
   *                失败：flat=false
   */
  .factory("shangjiaUploadLogoFactory",function (THEGLOBAL,$resource,$rootScope,userDataFactory) {
    var theUrl=THEGLOBAL.serviceAPI + "/shopping/shangjiaUploadLogo_authority";
    var isShangjiaUploadLogoSuccess;//true代表上传成功
    return{
      shangjiaUploadLogo:function (caption_,introduction_,shangjiaLogoImg_) {
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
            shangjiaLogoImg:shangjiaLogoImg_
          },
          success:function (data) {
            var jsonData=JSON.parse(data);
            isShangjiaUploadLogoSuccess=jsonData.flat;
            $rootScope.$broadcast("shangjiaUploadLogoFactory.shangjiaUploadLogo");
          }
        });
      },
      getIsShangjiaUploadLogoSuccess:function () {
        return isShangjiaUploadLogoSuccess;
      }
    }
  })

  /**
   * * Created by simple on 2016/12/11.
   * 获得商城的衣服商品列表数据
   * 调用接口：shopping/getShangChengClothList：
   * 返回衣服商品列表数据：List<BusinessCloth>
   */
  .factory("getShangChengClothListFactory",function (THEGLOBAL,$resource,$rootScope) {
    var theUrl=THEGLOBAL.serviceAPI + "/shopping/getShangChengClothList";
    var isGetShangChengClothListSuccess;//true代表成功
    var shangChengClothList=[
      {
        id:null,
        caption:"",
        introduction:"",
        businesser:null,
        price:null,
        imgUrl:""
      }
    ];
    return{
      //请求服务器获取数据
      getGetShangChengClothListService:function (page_) {
        $.ajax({
          type:"get",
          url:theUrl,
          xhrFields: {
            withCredentials: true
          },
          data:{page:page_},
          success:function (data) {
            shangChengClothList=data;
            for(i=0;i<shangChengClothList.length;i++){
              shangChengClothList[i].imgUrl=THEGLOBAL.serviceAPI+"/"+shangChengClothList[i].imgUrl;
            }
            $rootScope.$broadcast("getShangChengClothListFactory.getGetShangChengClothListService");
          }
        });
      },
      //返回数据
      getShangChengClothList:function () {
        return shangChengClothList;
      }

    }
  })
  /**
   * * Created by simple on 2016/12/11.
   * 获得商城的衣服商品列表数据
   * 调用接口：shopping/getShangChengClothList：
   * 返回衣服商品列表数据：List<BusinessCloth>
   */
  .factory("saveDiyClothFactory",function (THEGLOBAL,$resource,$rootScope,userDataFactory) {
    var theUrl=THEGLOBAL.serviceAPI + "/shopping/saveDiyCloth_authority";
    var isSaveDiyCloth;//true代表成功

    var myDiyCloth= {
      myDiyClothId:null,
      imgUrl:""
      };
    return{
      //请求服务器获取数据
      saveDiyClothToService:function (businessClothId_,logoId_,isBusinessLogo_,diyImgBase64_) {
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
            businessClothId:businessClothId_,
            logoId:logoId_,
            isBusinessLogo:isBusinessLogo_,
            diyImgBase64:diyImgBase64_
          },
          success:function (data) {
            myDiyCloth=JSON.parse(data);
            myDiyCloth.imgUrl=THEGLOBAL.serviceAPI+"/"+myDiyCloth.imgUrl;
            $rootScope.$broadcast("saveDiyClothFactory.saveDiyClothToService");
          }
        });
      },
      //返回数据
      getMyDiyCloth:function () {
        return myDiyCloth;
      }

    }
  })


  /**
   * Created by simple on 2017/03/20.
   * 根据diyCloth的id获得diy衣服的详情,需要登录
   * * 调用接口：shopping/getDiyClothDetails_authority：
   * 返回衣服商品列表数据：MyDiyClothVo
   */
  .factory("getDiyClothDetailsFactory",function (THEGLOBAL,$resource,$rootScope) {
    var theUrl=THEGLOBAL.serviceAPI + "/shopping/getDiyClothDetails_authority";
    var myDiyClothDetails= {
      isBusinessLogo:null,
      price:null,
      userName:""
    };
    return{
      //请求服务器获取数据
      getDiyClothDetailsFromService:function (myDiyClothId_) {
        $.ajax({
          type:"get",
          url:theUrl,
          xhrFields: {
            withCredentials: true
          },
          data:{
            myDiyClothId:myDiyClothId_
          },
          success:function (data) {

            myDiyClothDetails.isBusinessLogo=data.isBusinessLogo;
            myDiyClothDetails.price=data.businessCloth.price;
            myDiyClothDetails.userName=data.user.userName;
            console.log(myDiyClothDetails);
            $rootScope.$broadcast("getDiyClothDetailsFactory.getDiyClothDetailsFromService");

          }
        });
      },
      //返回数据
      getMyDiyClothDetails:function () {
        return myDiyClothDetails;
      }

    }
  })

  /**
   * Created by simple on 2017/03/22.
   * 商城订单生成（生成但还没支付）   需要登录
   * * 调用接口：shopping/shoppingMakeOrder_authority：
   * 支付成功，返回{flat:true},否则返回{flat:false}
   */
  .factory("saveShoppingMakeOrderFactory",function (THEGLOBAL,$resource,$rootScope) {
    var theUrl=THEGLOBAL.serviceAPI + "/shopping/shoppingMakeOrder_authority";
    var isSaveSuccess;
    return{
      //请求服务器获取数据
      saveShoppingMakeOrderToService:function (myDiyClothId_,price_,totalCount_,totalPrice_,clothSizeItems_) {
        $.ajax({
          type:"post",
          url:theUrl,
          xhrFields: {
            withCredentials: true
          },
          data:{
            myDiyClothId:myDiyClothId_,
            price:price_,
            totalCount:totalCount_,
            totalPrice:totalPrice_,
            clothSizeItems:JSON.stringify(clothSizeItems_)
          },
          success:function (data) {
            var jsonData=JSON.parse(data);
            isSaveSuccess=jsonData.flat;
            $rootScope.$broadcast("saveShoppingMakeOrderFactory.saveShoppingMakeOrderToService");

          }
        });
      },
      //返回数据
      getIsSaveSuccess:function () {
        return isSaveSuccess;
      }

    }
  })

  /**
   * Created by simple on 2017/03/22.
   * 商城订单支付   需要登录
   * * 调用接口：shopping/saveAddressAndshoppingOrderPay_authority：
   * 支付成功，返回{flat:true},否则返回{flat:false}
   */
  .factory("saveAddressAndshoppingOrderPayFactory",function (THEGLOBAL,$resource,$rootScope) {
    var theUrl=THEGLOBAL.serviceAPI + "/shopping/saveAddressAndshoppingOrderPay_authority";
    var isSuccess;
    return{
      //请求服务器获取数据
      saveShoppingMakeOrderToService:function (myDiyClothId_,price_,totalCount_,totalPrice_,clothSizeItems_) {
        $.ajax({
          type:"post",
          url:theUrl,
          xhrFields: {
            withCredentials: true
          },
          data:{
            myDiyClothId:myDiyClothId_,
            price:price_,
            totalCount:totalCount_,
            totalPrice:totalPrice_,
            clothSizeItems:JSON.stringify(clothSizeItems_)
          },
          success:function (data) {
            var jsonData=JSON.parse(data);
            isSaveSuccess=jsonData.flat;
            $rootScope.$broadcast("saveShoppingMakeOrderFactory.saveShoppingMakeOrderToService");

          }
        });
      },
      //返回数据
      getIsSaveSuccess:function () {
        return isSaveSuccess;
      }

    }
  })
