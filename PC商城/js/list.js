"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var List =
/*#__PURE__*/
function () {
  function List(elems) {
    _classCallCheck(this, List);

    this.elems = elems;
    this.autocomplete(); //搜索框关键字自动提示

    this.mouseShow(); //鼠标滑到某个元素上触发事件

    this.getDataFromJson();
    this.goodsClick();
    this.buyBtn();
    this.getDataFromLocalStorage();
    this.getUserName(); //获取登录成功的用户信息
  } //搜索框关键字自动提示


  _createClass(List, [{
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
    }
  }, {
    key: "getDataFromJson",
    value: function getDataFromJson() {
      var _this = this;

      $.getJSON('data/data2.json', function (response) {
        _this.showDataToHtml(response);
      });
    }
  }, {
    key: "showDataToHtml",
    value: function showDataToHtml(result) {
      var html = "";
      $.each(result, function (index, obj) {
        var jsonstr = JSON.stringify(obj); // console.log(jsonstr)

        html += "\n                <li>\n                    <a href=\"#\"><img src=\"images/".concat(obj.img, "\" data-id='").concat(jsonstr, "'></a>\n                    <p><a href=\"#\">").concat(obj.title, "</a></p>\n                    <p>").concat(obj.price, "\u5143</p>\n                    <div>\n                    <input type=\"button\" value=\"\u8D2D\u4E70\" data-id='").concat(jsonstr, "'>\n                    </div>\n                </li>\n                \n            ");
      });
      $('.goodsList').html(html);
    } //点击商品图片存储数据

  }, {
    key: "goodsClick",
    value: function goodsClick() {
      $('.goodsList').delegate('img', 'click', function () {
        // console.log(this)
        var obj = JSON.parse(this.dataset.id);
        var id = obj.id;
        console.log(id);
        location.href = "GoodsDetail.html?id=" + id;
        var goods = localStorage.getItem("goods");

        if (goods) {
          var arr = JSON.parse(goods);
          var index = arr.findIndex(function (item, index) {
            return item.id == obj.id;
          });

          if (index > -1) {
            save(arr);
          } else {
            save([].concat(_toConsumableArray(arr), [_objectSpread({}, obj, {
              num: 0
            })]));
          }
        } else {
          save([_objectSpread({}, obj, {
            num: 0
          })]);
        }

        function save(result) {
          localStorage.setItem("goods", JSON.stringify(result));
        }
      });
    } //点击购买,添加商品数据

  }, {
    key: "buyBtn",
    value: function buyBtn() {
      $('.goodsList').delegate('input', 'click', function () {
        window.open("buycar.html");
        var obj = JSON.parse(this.dataset.id);
        var id = obj.id;
        var goods = localStorage.getItem("goods");

        if (goods) {
          var arr = JSON.parse(goods);
          var index = arr.findIndex(function (item, index) {
            return item.id == obj.id;
          });

          if (index > -1) {
            arr[index].num++;
            save(arr);
          } else {
            save([].concat(_toConsumableArray(arr), [_objectSpread({}, obj, {
              num: 1
            })]));
          }
        } else {
          save([_objectSpread({}, obj, {
            num: 1
          })]);
        }

        function save(result) {
          localStorage.setItem("goods", JSON.stringify(result));
        }

        location.reload(true); //刷新
      });
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
    }
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

  return List;
}();

new List();