/**
 * Created by simple on 2016/10/25.
 */
angular.module("starter.services",[])
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
});
