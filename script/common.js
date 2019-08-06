function config_ajax(param){
  console.log("ajax请求");
  api.ajax({
        url: param.pathName,
        method: 'post',
        headers:param.header,
        dataType:'json',                                   //返回类型
        returnAll:true,                                    //是否全部返回（包括请求头）
        data:{
          body:param.ajaxData                              //传递参数，body如果传json类型，header中必须加上传参类             型'Content-Type': "application/json"
        }
    }, function(ret, err) {
        console.log("进入ajax");
        if (ret) {
            console.log('成功：'+JSON.stringify(ret));
            if(ret.body.code == '10001'){
              api.toast({                                    //错误提示信息
                  msg: '您还没有登录',                            //错误信息
                  duration: 2000,                            //显示时间长度
                  location: 'bottom'                         //显示位置
              });
              setTimeout(config_method.openWin(),1000)
              return;
            }
            if(param.method){
              console.log("有回调方法");
              param.method(ret);                           //调用方法
              return;
            }
            console.log("无回调方法");
        } else {
            console.log('失败'+JSON.stringify(err));
            api.toast({                                    //错误提示信息
                msg: err.msg,                              //错误信息
                duration: 2000,                            //显示时间长度
                location: 'bottom'                         //显示位置
            });
            return;
        }
    });
}

/**
 * 替换url传参
 * @param {String} url
 * @param {Object} params 必须是平铺的object
 */
function replaceUrlPathParams(url, params) {
  return url.replace(/\{(.*?)\}/g, function (match, match2) {
    let replace = params[match2];
    //删掉params中的属性，避免在url query参数上再次添加
    if (typeof params[match2] != 'undefined') {
      delete params[match2];
    }
    return replace
  })
}
var winW = "";

//屏幕宽度发生改变时
// $(window).resize(function() {
//     partCom();
// });
partCom();
//根据屏幕宽度匹配字体大小
function partCom() {
    winW = $(window).width();
    // $('html').css('font-size', winW / 10);
};
