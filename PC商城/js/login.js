"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Login =
/*#__PURE__*/
function () {
  function Login(elems) {
    _classCallCheck(this, Login);

    this.elems = elems;
    this.mouseShow(); //鼠标滑入事件

    this.formDataCheck(); //表单数据验证

    this.submit(); //表单提交
  } //鼠标滑入事件


  _createClass(Login, [{
    key: "mouseShow",
    value: function mouseShow() {
      //鼠标滑到掌上新蛋时,出现二维码
      $('.headerLeft>span').mouseenter(function () {
        $('.headerLeft>span>.twoCode').show();
      }).mouseleave(function () {
        $('.headerLeft>span>.twoCode').hide();
      }); //鼠标滑到客户中心时出现

      $('.headerMy>li:eq(1)').mouseenter(function () {
        $('li:eq(1)').find(".centerBox").show();
        $('.headerMy>li:eq(1)').css('background', "#fff");
        $('li:eq(1)').find("i").attr("class", "iconfont icon-arrow-up");
      }).mouseleave(function () {
        $('li:eq(1)').find(".centerBox").hide();
        $('.headerMy>li:eq(1)').css('background', "");
        $('li:eq(1)').find("i").attr("class", "iconfont icon-arrow-down");
      });
    } //表单数据验证

  }, {
    key: "formDataCheck",
    value: function formDataCheck() {
      var _this = this;

      //邮箱输入框失焦时触发事件
      $(this.elems.userInp).blur(function () {
        var reg = /^\w+@\w+(\.com|\.cn|\.net)+$/;
        var str = $(_this.elems.userInp).val();

        var data = _this.getCookie('data');

        if (!reg.test(str)) {
          $(_this.elems.userInp).val('');
          $('#userSpan').html("<img src='images/false.jpg' alt='' width='20' style='vertical-align:middle'> 邮箱格式不正确");
        }

        if (data.indexOf($(_this.elems.userInp).val()) === -1) {
          $(_this.elems.userInp).val('');
          $('#userSpan').html("<img src='images/false.jpg' alt='' width='20' style='vertical-align:middle'> 邮箱不存在");
        }
      }); //密码输入框失焦时触发事件

      $(this.elems.userPwd).blur(function () {
        var data = _this.getCookie('data');

        if (data.indexOf($(_this.elems.userPwd).val()) === -1) {
          $(_this.elems.userPwd).val('');
          $('#pwdSpan').html("<img src='images/false.jpg' alt='' width='20' style='vertical-align:middle'> 密码不正确");
          setTimeout(function () {
            location.reload(true);
          }, 500);
        }
      });
    }
  }, {
    key: "submit",
    value: function submit() {
      var _this2 = this;

      $('form').submit(function (e) {
        var data = _this2.getCookie('data');

        var pwd = data.indexOf($(_this2.elems.userPwd).val());
        var user = data.indexOf($(_this2.elems.userInp).val());

        if (user == pwd - 1) {
          var user = $('#userInp').val();

          var my = _this2.getCookie('my');

          if (!my) {
            my = [];
          }

          my.push(user); // //如果存在相同数据,将会去重
          // function noRepeat(my) {
          //     return Array.from(new Set(my));
          // }
          // var newArr = noRepeat(my);

          _this2.setCookie('my', my);

          location.href = "index.html";
        } else {
          $('#pwdSpan').html("<img src='images/false.jpg' alt='' width='20' style='vertical-align:middle'> 密码不正确");
        }

        e.preventDefault();
      });
    } //设置cookie

  }, {
    key: "setCookie",
    value: function setCookie(cookieName, cookieValue, day) {
      var json = {
        obj: cookieValue
      };
      var jsonstr = JSON.stringify(json);
      var str = cookieName + "=" + jsonstr; // 过期时间

      if (day) {
        var dt = new Date();
        dt.setDate(dt.getDate() + day);
        str += ";expires=" + dt.toGMTString();
      }

      document.cookie = str;
    } //获取cookie

  }, {
    key: "getCookie",
    value: function getCookie(cookieName) {
      // 先获取所有的cookie
      var str = document.cookie; // 拆分成数组

      var arr = str.split("; "); // 循环判断

      for (var i = 0, len = arr.length; i < len; i++) {
        var tmp = arr[i];
        var ind = tmp.indexOf("=");
        var key = tmp.substring(0, ind);
        var val = tmp.substring(ind + 1);

        if (cookieName === key) {
          var json = JSON.parse(val);
          return json.obj;
        }
      }
    }
  }]);

  return Login;
}();

new Login({
  userInp: userInp,
  userPwd: userPwd
});