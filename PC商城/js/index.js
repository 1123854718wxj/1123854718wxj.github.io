"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Index =
/*#__PURE__*/
function () {
  function Index(elems) {
    _classCallCheck(this, Index);

    this.elems = elems;
    this.autocomplete(); //搜索框关键字自动提示

    this.mouseShow(); //鼠标滑到某个元素上触发事件

    this.bannerMove(); //背景图轮播

    this.gooodsShowTime(); //倒计时

    this.getData(); //从data1.json获取数据

    this.goodsMove(); //商品轮播

    this.getDataFromLocalStorage(); //首页购物车显示

    this.getUserName(); //获取登录成功的用户信息
  } //搜索框关键字自动提示


  _createClass(Index, [{
    key: "autocomplete",
    value: function autocomplete() {
      var availableTags = ["电脑", "电脑包", "电脑椅", "电脑电源", "电脑显示器", "电脑音箱", "电脑配件", "电脑桌", "手机", "手机电池", "手机内存卡", "手机耳机", "手机充电器", "手机贴膜", "手机套", "苹果手机", "苹果笔记本", "苹果iphone", "联想笔记本", "联想手机", "联想ThinkPad", "华为手机", "华为mate20", "华为P30", "华为笔记本", "小米9", "小米8", "小米手环", "小米笔记本", "小米电视机", "一加7", "一加", "一加6T"];
      $('#inp').autocomplete({
        source: availableTags
      });
    }
  }, {
    key: "mouseShow",
    value: function mouseShow() {
      //鼠标滑到掌上新蛋时,出现二维码
      $('.headerLeft>span').mouseenter(function () {
        $('.headerLeft>span>.twoCode').show();
      }).mouseleave(function () {
        $('.headerLeft>span>.twoCode').hide();
      }); //鼠标滑到我的订单出现

      $('.headerMy>li:eq(0)').mouseenter(function () {
        $('li:eq(0)').find(".newShowBox").show();
        $('.headerMy>li:eq(0)').css('background', "#fff");
        $('li:eq(0)').find("i").attr("class", "iconfont icon-arrow-up");
      }).mouseleave(function () {
        $('li:eq(0)').find(".newShowBox").hide();
        $('.headerMy>li:eq(0)').css('background', "");
        $('li:eq(0)').find("i").attr("class", "iconfont icon-arrow-down");
      }); //鼠标滑到我的新蛋上出现

      $('.headerMy>li:eq(1)').mouseenter(function () {
        $('li:eq(1)').find(".newShowBox").show();
        $('.headerMy>li:eq(1)').css('background', "#fff");
        $('li:eq(1)').find("i").attr("class", "iconfont icon-arrow-up");
      }).mouseleave(function () {
        $('li:eq(1)').find(".newShowBox").hide();
        $('.headerMy>li:eq(1)').css('background', "");
        $('li:eq(1)').find("i").attr("class", "iconfont icon-arrow-down");
      }); //鼠标滑到客户中心时出现

      $('.headerMy>li:eq(3)').mouseenter(function () {
        $('li:eq(3)').find(".centerBox").show();
        $('.headerMy>li:eq(3)').css('background', "#fff");
        $('li:eq(3)').find("i").attr("class", "iconfont icon-arrow-up");
      }).mouseleave(function () {
        $('li:eq(3)').find(".centerBox").hide();
        $('.headerMy>li:eq(3)').css('background', "");
        $('li:eq(3)').find("i").attr("class", "iconfont icon-arrow-down");
      }); //鼠标滑到首页等位置时改变样式

      $('.menu>ul>li').mouseenter(function () {
        $(this).css('background', '#0789f8');
      }).mouseleave(function () {
        $(this).css('background', '');
      }); //鼠标滑到侧边导航栏时出现二级导航菜单

      $('.mainFirst>ul>li').mouseenter(function () {
        $('.navFirst').show();
        $('.mainFirst>ul>li').find('a').mouseenter(function () {
          $(this).css('text-decoration', 'underline');
        }).mouseleave(function () {
          $(this).css('text-decoration', 'none');
        });
      }).mouseleave(function () {
        $('.navFirst').hide();
      }); //鼠标滑到购物车时显示内容

      $('.shoppingCar>a:eq(0)').mouseenter(function () {
        $('.shoppingShadow').show();
        $('.shoppingCar>a:eq(0)').css({
          'background': '#fff',
          'color': '#000',
          'border-left': '2px solid #ff6600',
          'border-top': '2px solid #ff6600'
        });
        $('.shoppingCar>a:eq(0)>i').attr("class", "iconfont icon-arrow-up");
      }).mouseleave(function () {
        $('.shoppingShadow').hide();
        $('.shoppingCar>a:eq(0)').css({
          'background': '',
          'color': ''
        });
        $('.shoppingCar>a:eq(0)>i').attr("class", "iconfont icon-arrow-down");
      }); //鼠标滑到收藏提醒时出现

      $('.shoppingCar>a:eq(1)').mouseenter(function () {
        $('.promShadow').show();
        $('.shoppingCar>a:eq(1)').css({
          'background': '#fff',
          'color': '#000',
          'border-right': '2px solid #ff6600',
          'border-top': '2px solid #ff6600'
        });
        $('.shoppingCar>a:eq(1)').find("i").attr("class", "iconfont icon-arrow-up");
      }).mouseleave(function () {
        $('.promShadow').hide();
        $('.shoppingCar>a:eq(1)').css({
          'background': '',
          'color': ''
        });
        $('.shoppingCar>a:eq(1)').find("i").attr("class", "iconfont icon-arrow-down");
      });
    }
  }, {
    key: "bannerMove",
    value: function bannerMove() {
      var index = 0;
      var liList = $('.navLi').children();
      var delay = setTimeout(startSwipper, 3000); //鼠标滑到li上触发事件

      var _loop = function _loop(i) {
        var li = liList[i];

        li.onmouseenter = function () {
          clearTimeout(delay);
          index = i;
          startMove();
          $(this).attr('class', 'active');
        };

        li.onmouseleave = function () {
          $(this).attr('class', '');
          delay = setTimeout(startSwipper, 3000);
        };
      };

      for (var i = 0; i < liList.length; i++) {
        _loop(i);
      }

      function startSwipper() {
        index++;

        for (var i = 0; i < liList.length; i++) {
          liList[i].className = "";
        }

        $('#imgBox').animate({
          left: -771 * index
        }, 1000, function () {
          if (index == 6) {
            index = 0;
            $('#imgBox').css("left", "0px");
          }

          liList[index].className = "active";
          delay = setTimeout(startSwipper, 3000);
        });
      }

      function startMove() {
        for (var i = 0; i < liList.length; i++) {
          liList[i].className = "";
        }

        $('#imgBox').animate({
          left: -771 * index
        }, 1000);
      }
    }
  }, {
    key: "gooodsShowTime",
    value: function gooodsShowTime() {
      var ShowTime = setInterval(function () {
        //计时器
        var nowTime = new Date();
        var futureTime = new Date("2019-6-1 00:00:00:000");
        var time = futureTime - nowTime;
        var hour = parseInt(time / (1000 * 60 * 60)) % 24;
        var minute = parseInt(time / (1000 * 60)) % 60;
        var second = parseInt(time / 1000) % 60;
        var millsecond = time % 1000;
        var hourStr = hour < 10 ? "0" + hour : hour;
        var minuteStr = minute < 10 ? "0" + minute : minute;
        var secondStr = second < 10 ? "0" + second : second;
        var str = "剩余时间：" + hourStr + ":" + minuteStr + ":" + secondStr;
        $('.goodsMoveTitle>span:eq(1)').html(str);

        if (hour == 0 && minute == 0 && second == 0) {
          clearInterval(ShowTime);
        }
      }, 1000);
    }
  }, {
    key: "getData",
    value: function getData() {
      var _this = this;

      $.getJSON('./data/data1.json', function (response) {
        // console.log(response);
        _this.showData(response);
      });
    }
  }, {
    key: "showData",
    value: function showData(result) {
      var html = '';
      $.each(result, function (index, obj) {
        html += "\n            <li>\n                <img src=\"images/".concat(obj.img, "\">\n                <p><a href=\"\">").concat(obj.title, "</a></p>\n                <span>").concat(obj.price, "</span>\n            </li>\n        ");
      });
      this.elems.showSwipper.innerHTML = html;
    }
  }, {
    key: "goodsMove",
    value: function goodsMove() {
      var j = 0;
      var goodsMoveTimer = setTimeout(swipper, 4000);

      function swipper() {
        j++;
        $('#showSwipper').animate({
          left: -771 * j
        }, 1000, function () {
          if (j == 2) {
            j = 0;
            $('#showSwipper').css('left', '0px');
          }

          goodsMoveTimer = setTimeout(swipper, 4000);
        });
      }
    } //将数据渲染到购物车

  }, {
    key: "getDataFromLocalStorage",
    value: function getDataFromLocalStorage() {
      var arr = JSON.parse(localStorage.getItem("goods") || '[]');
      var html = '';

      for (var i = 0; i < arr.length; i++) {
        var obj = arr[i];

        if (obj.num > 0) {
          html += "\n                    <p>\n                    <img src=\"images/".concat(obj.img, "\" alt=\"\">\n                    <span class=\"title\">").concat(obj.content, "</span>\n                    <span>\u4EF7\u683C:").concat(obj.price, "\u5143</span>\n                    <span>\u6570\u91CF:").concat(obj.num, "</span>\n                    </p>\n                    ");
        }
      }

      $('.shoppingShadow').html(html);
    }
  }, {
    key: "getUserName",
    value: function getUserName() {
      var myName = this.getCookie("my");

      if (myName) {
        var result = myName.filter(function (item, index) {
          return index == myName.length - 1;
        });
        $('.welcome').html(result + ",欢迎来到新蛋商城&emsp;");
        var loginOut = $('<a href="login.html">退出</a>');
        $('.welcome').append(loginOut);
        var str = $('<a href="buycar.html">购物车</a>');
        $('.newShowBox').html(str);
      }
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

  return Index;
}();

new Index({
  showSwipper: showSwipper
});