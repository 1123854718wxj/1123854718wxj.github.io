"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GoodsDetail =
/*#__PURE__*/
function () {
  function GoodsDetail(elems) {
    _classCallCheck(this, GoodsDetail);

    this.elems = elems;
    this.autocomplete(); //搜索框关键字自动提示

    this.mouseShow(); //鼠标滑到某个元素上触发事件

    this.getLocationId();
    this.goodsSwipper();
    this.clickBtn(); //商品增加或减少按钮

    this.getDataFromLocalStorage();
    this.getUserName(); //获取登录成功的用户信息
  } //搜索框关键字自动提示


  _createClass(GoodsDetail, [{
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
    } //从local地址栏中获取数据

  }, {
    key: "getLocationId",
    value: function getLocationId() {
      function locationSearch(data) {
        var str = location.search;
        var item = str.substring(1);
        var arr = item.split('=');

        if (arr[0] === data) {
          return arr[1];
        }
      }

      var id = locationSearch("id"); // console.log(id);

      this.getDataFromLocalStroage(id);
    } //从localstorage里面获取数据

  }, {
    key: "getDataFromLocalStroage",
    value: function getDataFromLocalStroage(id) {
      var arr = JSON.parse(localStorage.getItem('goods') || '[]');
      var html = '';

      for (var i = 0, len = arr.length; i < len; i++) {
        var obj = arr[i];

        if (obj.id == id) {
          html += "\n                <div class=\"goodsNav\">\u5546\u54C1\u8BE6\u60C5</div>\n                <div class=\"goodsContent\">\n                    <div class=\"imgBox\">\n                        <div class=\"bigImg\">\n                            <img src=\"images/".concat(obj.img, "\" alt=\"\"> \n                        </div>\n                        <div class=\"swipperImg\">\n                            <i class=\"iconfont icon-xiangyou\"></i>\n                            <ul>\n                                <li class=\"active\">\n                                    <img src=\"images/").concat(obj.imgs[0], "\" alt=\"\">\n                                </li>\n                                <li>\n                                    <img src=\"images/").concat(obj.imgs[1], "\" alt=\"\">\n                                </li>\n                                <li>\n                                    <img src=\"images/").concat(obj.imgs[2], "\" alt=\"\">\n                                </li>\n                                <li>\n                                    <img src=\"images/").concat(obj.imgs[3], "\" alt=\"\">\n                                </li>\n                                <li>\n                                    <img src=\"images/").concat(obj.imgs[4], "\" alt=\"\">\n                                </li>\n                                <li>\n                                    <img src=\"images/").concat(obj.imgs[5], "\" alt=\"\">\n                                </li>\n                                <li>\n                                    <img src=\"images/").concat(obj.imgs[6], "\" alt=\"\">\n                                </li>\n                            </ul>\n                            <i class=\"iconfont icon-arrow-right\"></i>\n                        </div>\n                    </div>\n                    <div class=\"goodsRight\">\n                        <div class=\"goodsTitle\">\n                            <h2>").concat(obj.title, "</h2>\n                            <p>\u8F93\u5165\u86CB\u5238SJ05,\u6EE11000-30\u5143,\u6EE13000-100\u5143,\u6570\u91CF\u6709\u9650,\u5148\u5230\u5148\u5F97!</p>\n                        </div>\n                        <ol>\n                            <li>\u54C1 \u724C\uFF1A").concat(obj.content, "</li>\n                            <li>\u4EA7\u54C1\u578B\u53F7\uFF1A").concat(obj.content, "</li>\n                            <li>\u65B0 \u86CB \u4EF7\uFF1A").concat(obj.price, "\u5143</li>\n                            <li>\u5546\u54C1\u652F\u6301:</li>\n                            <li>\u989C \u8272\uFF1A\n                                <span class=\"black\">\u9ED1\u8272</span>\n                                <span class=\"white\">\u767D\u8272</span>\n                                <span class=\"red\">\u7EA2\u8272</span>\n                                <span class=\"blue\">\u84DD\u8272</span>\n                            </li>\n                            <li>\u7248 \u672C\uFF1A\n                                <span class=\"model1\">\u5168\u7F51\u901A8GB+128GB</span>\n                                <span class=\"model2\">\u5168\u7F51\u901A6GB+128GB</span>\n                            </li>\n                            <li data-id=").concat(obj.id, ">\u6570 \u91CF\uFF1A\n                                <span class=\"reduce\">-</span>\n                                <span class=\"num\">").concat(obj.num, "</span>\n                                <span class=\"add\">+</span>\n                            </li>\n                            <li>\n\n                            </li>\n                        </ol>\n                        <div class=\"buttonBox\">\n                            <div class=\"quickBuy\">\n                                <a href=\"buycar.html\">\u7ACB\u5373\u8D2D\u4E70</a>\n                            </div>\n                            <div class=\"addShoppingCar\">\n                                <a> <i class=\"iconfont icon-gouwuche\"></i>\u52A0\u5165\u8D2D\u7269\u8F66</a>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                  ");
        }

        $('.goodsList').html(html);
      }
    } //点击商品数量增加或减少按钮

  }, {
    key: "clickBtn",
    value: function clickBtn() {
      var arr = JSON.parse(localStorage.getItem("goods") || '[]');
      $('ol>li:eq(10)').delegate("span", "click", function () {
        var par = this.parentNode;
        var id = par.dataset.id;
        console.log('id:', id);
        var index = arr.findIndex(function (item) {
          return item.id == id;
        });
        console.log(this.innerHTML);

        if (this.innerHTML === "+") {
          arr[index].num++;
          $('ol>li:eq(10)>.num').html(arr[index].num);
          localStorage.setItem("goods", JSON.stringify(arr));
        }

        if (this.innerHTML === "-") {
          arr[index].num--;
          $('ol>li:eq(10)>.num').html(arr[index].num);
          localStorage.setItem("goods", JSON.stringify(arr));

          if (arr[index].num <= 0) {
            arr[index].num = 1;
          }
        }
      });
      $('.addShoppingCar>a').click(function () {
        localStorage.setItem("goods", JSON.stringify(arr));
        alert('商品已经成功加入购物车');
      });
    } // //商品滑动

  }, {
    key: "goodsSwipper",
    value: function goodsSwipper() {
      var liList = $('.swipperImg>ul>li');
      $('.swipperImg>ul>li').mouseover(function () {
        $.each(liList, function (index, item) {
          item.className = "";
        });
        $(this).attr('class', 'active');
        var img = this.querySelector("img");
        var src = img.src;
        $('.bigImg>img')[0].src = src;
      });
      $('.icon-xiangyou').click(function () {
        $('.swipperImg>ul').css({
          left: -423
        });
      });
      $('.icon-arrow-right').click(function () {
        $('.swipperImg>ul').css({
          left: 0
        });
      });
    }
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

  return GoodsDetail;
}();

new GoodsDetail();