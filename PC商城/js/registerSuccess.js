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
  }]);

  return Index;
}();

new Index();