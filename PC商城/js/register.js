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

        if (reg.test(str)) {
          $('#userSpan').html("<img src='images/true.jpg' alt='' width='20' style='vertical-align:middle'>");

          var data = _this.getCookie('data'); // console.log(data);


          if (!data) {
            data = [];
          } else {
            if (data.indexOf($(_this.elems.userInp).val()) != -1) {
              $('#userSpan').html('该邮箱已存在').css('color', '#f00');
              $(_this.elems.userInp).val('');
            }
          }

          var userInput = $(_this.elems.userInp).val();
          data.push(userInput);

          _this.setCookie('data', data, 10);
        } else {
          $(_this.elems.userInp).val('');
          $('#userSpan').html("<img src='images/false.jpg' alt='' width='20' style='vertical-align:middle'> 邮箱格式不正确");
        }
      }); //密码输入框失焦时触发事件

      $(this.elems.userPwd).blur(function () {
        var reg = /^[a-zA-Z_]\w{5,14}$/g;
        var str = $(_this.elems.userPwd).val();

        if (reg.test(str)) {
          $('#pwdSpan').html("<img src='images/true.jpg' alt='' width='20' style='vertical-align:middle'>");

          var data = _this.getCookie('data');

          console.log(data);

          if (!data) {
            data = [];
          }

          var pwdInput = $(_this.elems.userPwd).val();
          data.push(pwdInput);

          _this.setCookie('data', data, 10);
        } else {
          $(_this.elems.userPwd).val('');
          $('#pwdSpan').html("<img src='images/false.jpg' alt='' width='20' style='vertical-align:middle'>密码只能使用数字字母下划线，且数字不能开头，长度在6-15之间");
        }
      }); //再次密码输入框失焦时触发事件

      $(this.elems.rePwd).blur(function () {
        if ($(_this.elems.rePwd).val() === $(_this.elems.userPwd).val()) {
          $('#rePwdSpan').html("<img src='images/true.jpg' alt='' width='20' style='vertical-align:middle'>");
        } else {
          $(_this.elems.rePwd).val('');
          $('#rePwdSpan').html("<img src='images/false.jpg' alt='' width='20' style='vertical-align:middle'>密码输入不一致");
        }
      }); //生成后的4位验证码

      $('#checkCodeSpan').html(this.randomCode(checkCode, 4)).css({
        'background': '#6ff'
      }); //点击'看不清,换一张'时,刷新验证码

      $('#checkCodeSpan+span').click(function () {
        setTimeout(function () {
          $('#checkCodeSpan').html(_this.randomCode(checkCode, 4)).css({
            'background': '#6ff'
          });
        }, 100);
      }); //验证码输入框失焦时触发事件

      $(this.elems.checkCode).blur(function () {
        if ($(_this.elems.checkCode).val() != "") {
          var checkCodeVal = $(_this.elems.checkCode).val();
          var checkCodeSpanVal = $('#checkCodeSpan').html(); //判断输入验证码是否正确

          if (checkCodeVal.toLowerCase() != checkCodeSpanVal.toLowerCase()) {
            //验证码输入不正确,清空输入框内容
            $(_this.elems.checkCode).val(''); //如果验证码不正确,200ms后刷新验证码

            setTimeout(function () {
              $('#checkCodeSpan').html(_this.randomCode(checkCode, 4)).css({
                'background': '#6ff'
              });
            }, 300);
          }
        } else {
          //如果输入空的验证码,200ms后刷新验证码
          setTimeout(function () {
            $('#checkCodeSpan').html(_this.randomCode(checkCode, 4)).css({
              'background': '#6ff'
            });
          }, 300);
        }
      });
    } //随机生成4位验证码

  }, {
    key: "randomCode",
    value: function randomCode(checkCode, length) {
      //输出大小写英文字母
      var smallCodeArr = [];
      var bigCodeArr = [];

      for (var i = 97; i <= 97 + 25; i++) {
        var smallCode = String.fromCharCode(i);
        smallCodeArr.push(smallCode);
        var bigCode = String.fromCharCode(i - 32);
        bigCodeArr.push(bigCode);
      } //输出字符串类型的数字0~9


      var numCodeArr = [];

      for (var j = 48; j <= 48 + 9; j++) {
        var numCode = String.fromCharCode(j);
        numCodeArr.push(numCode);
      } //26个大小写英文字母与0~9数字


      var speciaNum = ["_", "$"];
      var arrList = smallCodeArr.concat(bigCodeArr, numCodeArr, speciaNum);
      var checkCode = smallCodeArr.concat(bigCodeArr, numCodeArr);
      var sum = "";

      for (var i = 0; i < length; i++) {
        var item = checkCode[Math.floor(Math.random() * checkCode.length)];

        if (sum.indexOf(item) == -1) {
          sum += item;
        } else {
          i--;
        }
      }

      return sum;
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
  }, {
    key: "submit",
    value: function submit() {
      var _this2 = this;

      $('form').submit(function (e) {
        if ($(_this2.elems.userInp).val() != '' && $(_this2.elems.userPwd).val() != '' && $(_this2.elems.rePwd).val() != '' && $(_this2.elems.checkCode).val() != '' && $('#checkbox')[0].checked == true) {
          location.href = "registerSuccess.html";
        }

        e.preventDefault();
      });
    }
  }]);

  return Login;
}();

new Login({
  userInp: userInp,
  userPwd: userPwd,
  rePwd: rePwd,
  checkCode: checkCode
});