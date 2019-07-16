"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Buycar =
/*#__PURE__*/
function () {
  function Buycar() {
    _classCallCheck(this, Buycar);

    this.getDataFromLocalStorage(); //获取数据并渲染到页面

    this.checkBox(); //点击单选或全选按钮

    this.init(); //初始化

    this.getUserName(); //获取登录成功的用户信息

    this.that = this;
  } //初始化


  _createClass(Buycar, [{
    key: "init",
    value: function init() {
      var a = $('table')[0].clientHeight;
      $('.sumBox').css('height', a);
    } //获取数据并渲染到页面

  }, {
    key: "getDataFromLocalStorage",
    value: function getDataFromLocalStorage() {
      var arr = JSON.parse(localStorage.getItem("goods") || '[]');
      var html = '';

      for (var i = 0; i < arr.length; i++) {
        var obj = arr[i];
        var sum = obj.price * obj.num;

        if (obj.num > 0) {
          html += "\n                <tr>\n                    <td class=\"checkbox\"><input class=\"check-one\" type=\"checkbox\" /></td>\n                    <td class=\"goods\"><img src=\"images/".concat(obj.img, "\" alt=\"\" />\n                        <span>").concat(obj.title, "</span>\n                    </td>\n                    <td class=\"price\">").concat(obj.price, "\u5143</td>\n                    <td class=\"count\" data-id=\"").concat(obj.id, "\">\n                        <input class=\"count-input\" type=\"text\" value=\"").concat(obj.num, "\"/>\n                        <div class=\"inlineblock\">\n                            <span class=\"add\">+</span>\n                            <span class=\"reduce\">-</span>\n                        </div>\n                    </td>\n                    <td class=\"subtotal\">").concat(sum, "\u5143</td>\n                    <td class=\"operation\"><span class=\"delete\">\u5220\u9664</span></td>\n                </tr>\n                ");
        }
      }

      $('tbody').html(html);
      this.addBtn(); //点击按键,让商品数量增加或减少

      this.getall();
    }
  }, {
    key: "getGoodsData",
    value: function getGoodsData() {
      return JSON.parse(localStorage.getItem("goods") || '[]');
    }
  }, {
    key: "setGoodsData",
    value: function setGoodsData(arr) {
      localStorage.setItem("goods", JSON.stringify(arr));
      this.getDataFromLocalStorage();
    } //点击按键,让商品数量增加或减少

  }, {
    key: "addBtn",
    value: function addBtn() {
      $('.count').delegate("span", "click", function () {
        var arr = p.that.getGoodsData();
        var par = $(this).parent().parent();
        var id = par.data('id'); //获取自定义属性data-id的值
        //查找arr中是否包含某个元素,包含返回下标,不包含返回-1

        var index = arr.findIndex(function (item) {
          return item.id == id;
        });

        if ($(this).text() === "+") {
          arr[index].num++;
        }

        if ($(this).text() === "-") {
          arr[index].num--;

          if (arr[index].num <= 1) {
            //当商品减少到0时,商品从购物车删除
            arr[index].num = 1;
          }
        }

        p.that.setGoodsData(arr);
        p.that.getall();
      });
      $('.delete').click(function () {
        var arr = p.that.getGoodsData();

        if (window.confirm("是否删除商品")) {
          arr.splice(0, 1);
          p.that.setGoodsData(arr);
        }
      });
    } //点击单选或全选按钮

  }, {
    key: "checkBox",
    value: function checkBox() {
      var _this = this;

      //点击全选按钮
      $('.checkall').click(function () {
        $('.sumBox>a').css('background', 'orange');
        var flag = $('.checkall').prop("checked");

        if (!flag) {
          $('.sumBox>a').css('background', '#767676');
          $('.priceBox').hide();
        } else {
          $('.priceBox').show();
        }

        var checkoneList = $('.check-one');
        $.each(checkoneList, function (index, item) {
          item.checked = flag;
        });

        _this.getall();
      });
      $('.check-one').click(function () {
        $('.sumBox>a').css('background', 'orange');
        var flag = $('.check-one').is(":checked");
        console.log(flag);

        if (!flag) {
          $('.sumBox>a').css('background', '#767676');
          $('.priceBox').hide();
        } else {
          $('.priceBox').show();
          $('.sumBox>a').css('background', 'orange');
        }
      }); //单选按钮

      var checkoneList = $('.check-one');
      $.each(checkoneList, function (ind, item) {
        $(item).click(function () {
          var count = 0;

          for (var i = 0; i < checkoneList.length; i++) {
            if (checkoneList[i].checked) {
              count++;
            }
          }

          if (count == checkoneList.length) {
            $('.checkall').prop('checked', true);
          } else {
            $('.checkall').prop('checked', false);
          }

          _this.getall();
        });
      });
      $('.play').click(function () {
        $('.shadowBox').show(500);
      });
    }
  }, {
    key: "getall",
    value: function getall() {
      var allprice = 0;
      var checkoneList = $('.check-one');
      $.each(checkoneList, function (ind, item) {
        if ($(item).prop('checked')) {
          var par = $(item).parent().parent();
          var subtotal = par.find(".subtotal");
          var price = parseInt(subtotal.text()) * 1;
          allprice += price;
          var str = allprice + "元";
          $('.right').html(str);
        }
      });
    }
  }, {
    key: "getUserName",
    value: function getUserName() {
      var myName = this.getCookie("my");

      if (myName) {
        var result = myName.filter(function (item, index) {
          return index == myName.length - 1;
        });
        $('.userMs>span').html(result);
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

  return Buycar;
}();

var p = new Buycar();