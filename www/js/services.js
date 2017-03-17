/**
 * Created by simple on 2016/10/25.
 */
angular.module("starter.services",[])
/**
 * * Created by simple on 2016/12/09.
 * 实现将图片转为base64数据
 * 参数，img：图片元素,outputFormat:为图片的格式如“image/png”
 * 返回值：图片的去掉文件头的base64数据
 */
  .factory("imageFactory",function () {
    return{
      getBase64Image:function (img,outputFormat) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);
        var dataURL = canvas.toDataURL(outputFormat);
        return dataURL.substr(dataURL.indexOf(",") + 1)//去掉base64的格式头，因为格式头不属于图片的数据，否则后台将图片的base64保存为图片时会出错
      },
      //url为图片的url,callback为成功的回调函数,outputFormat为图片的格式如“image/png”
      convertImgToBase64URL:function(url, callback, outputFormat){
        var canvas = document.createElement('CANVAS'),
          ctx = canvas.getContext('2d'),
          img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function(){
          var dataURL;
          canvas.height = img.height;
          canvas.width = img.width;
          ctx.drawImage(img, 0, 0);
          dataURL = canvas.toDataURL(outputFormat);
          callback(dataURL);
          canvas = null;
        };
        img.src = url;
      }
    }
  })


  /**
   * * Created by simple on 2017/3/17.
   * 实现通过imgUrl从服务器获取图片的base64数据
   * 返回值：图片的去掉文件头的base64数据
   */
  .factory("getImageBase64Factory",function (THEGLOBAL,$resource,$rootScope) {
    var theUrl=THEGLOBAL.serviceAPI + "/share/getImgBase64";
    var isGetImageBase64;//true代表成功
    var ImgBase64="";
    return{
      //请求服务器获取数据
      getImageBase64FromService:function (imgUrl_) {
        $.ajax({
          type:"get",
          url:theUrl,
          data:{imgUrl:imgUrl_},
          xhrFields: {
            withCredentials: true
          },
          success:function (data) {
            imgBase64=data;
            $rootScope.$broadcast("getImageBase64Factory.getImageBase64FromService");
          }
        });
      },
      //返回数据
      getImgBase64:function () {
        return imgBase64;
      }

    }
  })
