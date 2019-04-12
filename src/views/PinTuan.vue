<template>
  <div class="container">
    <div
      id="show"
      style="display: none;width:100%;height:100vh;background-color:#323334;z-index:9999;box-sizing:border-box;padding:0 10px;position:fixed;"
    >
      <img src="https://daiyue.site/img/showimg.png" style="width: 100%;">
    </div>

    <div class="banner">
      <van-swipe>
        <van-swipe-item v-for="(img, index) in banners" :key="index">
          <img v-lazy="img" style="width:100%;">
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="items">
      <div class="price">
        <p style="text-align:left;">
          <span style="font-size:16px;color:#ED8332;">￥</span>
          <span style="font-size:26px;color:#ED8332;" v-html="price"></span>
          <span style="font-size:14px;margin-left:10px;">￥</span>
          <span style="font-size:14px;text-decoration:line-through;" v-html="rawPrice"></span>
        </p>
        <p>
          已团
          <span>{{thenGroup}}</span>份，剩
          <span>{{inventory}}</span>份
        </p>
      </div>
      <div class="describe">
        <p v-html="goodsName"></p>
      </div>
    </div>
    <!-- <div class="type">
      <div class="left">
        <span>规格</span>
        <span>120g/份±0.2</span>
      </div>
      <div class="right">
        <p>
          <van-stepper v-model="value"/>
        </p>
      </div>
    </div>-->
    <div class="partner">
      <div class="title">
        参团成员（
        <span v-html="photoes.length"></span>
        ）
      </div>
      <div class="partners">
        <div class="photoes" v-for="(img, index) in photoes" :key="index">
          <img class="img" v-lazy="img.headImg" style="width:50px;height:50px;border-radius:50%;">
          <span style="display:block;font-size:14px;" v-html="img.name"></span>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="pintuan" style="cursor:pointer;"  @click="confirm1"><!--跳转安卓-->
          <!-- <span style="font-weight:500;margin-top:4px;">￥5.99</span> -->
          <span v-if="photoes.length==0">发起拼团</span>
          <span v-if="photoes.length>0">加入拼团</span>
          <!-- <span>加入拼团</span> -->
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { Dialog } from 'vant';
import { Toast } from "vant";

export default {
  name: "pin",
  data() {
    return {
      banners: [],
      value: 1,
      photoes: [],
      laishou: "",
      rawPrice: "",
      price: "",
      goodsName: "",
      thenGroup: '',
      inventory: ''
    };
  },
  methods: {
    confirm1() {
      Dialog.confirm({
        title: '提示',
        message: '是否确定拼团？'
      }).then(() => {
        console.log(this.laishou)
        Toast.loading({
          duration: 2000,
          mask: true,
          message: '正在打开中'
        });
        this.isweixin(this.laishou); //打开app
      }).catch(() => {
        console.log("用户取消")
      });

    },
    getParam() {
      var _html = window.location.href;
      // var _html = 'http://share.laiscn.com/webroot/pin?id=57a015d2-3891-49e3-baa2-f16bbff2610a&indentCode=20190324231738176411&random=201903242317403621&auth=PlzEAogxLfakhRDlHaPc2wixmIxTxnovRwmAzwmuFTEXZGLPlcbdqYyjWA32LVUK4bn7PylRpZQxY8prEF5uN9Dg4UKUxG8JB%2FwMBBdaS0ZptKCHEAZpmTyTXI0ywNJjqptCzlQ9zZc1TuDyE0WlmgsHKIj1HgzSs4jg4XfLicA%3D'
      var Request = new Object();
      if (_html.indexOf("?") != -1) {
        var str = _html.split("?")[1]; //去掉?号
        var strs = str.split("&");
        for (let i = 0; i < strs.length; i++) {
          Request[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
      }
      this.request = Request;
      this.laishou ="laishou://share.com/discount?id=" +Request.id + "&indentCode=" + Request.indentCode;
    },
    getData() {
      let param = {
        id: this.request.id // || "57a015d2-3891-49e3-baa2-f16bbff2610a"
      };
      this.$http
        .get("/SpellGoods/GetSpell", param)
        .then(res => {
          let data = res.data.data;
          console.log("打印拼团接口信息",data)
          this.photoes = data.userList;
          this.banners = [data.goodsUrl];
          this.rawPrice = data.rawPrice;
          this.price = data.price;
          this.goodsName = data.goodsName;
          this.thenGroup=data.thenGroup;
          this.inventory=data.inventory;

        })
        .catch(res => {
          console.log(res);
        });
    },
    isweixin(_href) {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        //document.getElementById("show").style.display="none";//隐藏
        document.getElementById("show").style.display = "block"; //显示
      } else {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {
          document.getElementById("show").style.display = "none"; //隐藏
          setTimeout(function() {
            window.location.href = _href; //打开安卓
          }, 200);
          setTimeout(function(){
            window.location.href="https://sj.qq.com/myapp/detail.htm?apkName=com.cherishTang.laishou"; //如果超时就跳转到app下载页
          },2000);
        }
        if (isiOS) {
          document.getElementById("show").style.display = "none"; //隐藏
          setTimeout(function() {
            window.location.href = _href; //打开IOS
          }, 200);
          setTimeout(function(){
            //Toast.fail('IOS暂不支持下载')
             window.location.href="https://itunes.apple.com/cn/app/1448462127/id1448462127?mt=8"; //如果超时就跳转到app下载页
          },2000);
        }
      }
    }


  },
  mounted() {
    this.getParam();
    this.getData();
  },
  created() {
    document.title = "拼团"
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.container {
  width: 100%;
  min-height:100vh;
  height: auto;
  box-sizing: border-box;
  padding: 0 0 50px 0;
  background-color: #eeeeee;
  .items {
    width: 100%;
    height: 100px;
    background-color: #fff;
    margin-top: -5px;
    box-sizing: border-box;
    .price {
      width: 100%;
      height: 30px;
      display: flex;
      align-items: center;
      p {
        width: 50%;
        float: left;
        color: #999999;
        padding: 0 10px;
        box-sizing: border-box;
        font-size: 14px;
        margin-top: 30px;
      }
    }
    .describe {
      width: 100%;
      p {
        font-size: 16px;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        padding: 0 10px;
        box-sizing: border-box;
      }
    }
  }
  .type {
    width: 100%;
    height: 80px;
    background-color: #fff;
    margin-top: 5px;
    box-sizing: border-box;
    .left,
    .right {
      height: 80px;
      width: 50%;
      float: left;
      box-sizing: border-box;
      padding: 0 10px;
    }
    .left {
      display: flex;
      justify-content: flex-start;
      align-content: space-between;
      align-items: flex-start;
      flex-direction: column;
      span {
        margin-top: 10px;
      }
      span:nth-child(2) {
        font-size: 14px;
        color: #747474;
      }
    }
    .right {
      display: flex;
      justify-content: flex-end;
      align-content: space-between;
      align-items: center;
    }
  }
  .partner {
    width: 100%;
    height: auto;
    background-color: #fff;
    margin-top: 5px;
    box-sizing: border-box;
    min-height: 300px;
    .title {
      padding: 15px 10px;
      box-sizing: border-box;
      text-align: left;
    }
    .partners {
      width: 100%;
      height: auto;
      padding: 15px 10px;
      box-sizing: border-box;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .photoes {
        margin-left: 5%;
        margin-bottom: 15px;
      }
    }
  }
  .footer {
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    z-index: 999;
	text-align: center;
    .pintuan {
      height: 50px;
      width: 100%;
      background-color: #6cd07d;
      color: #fff;
      display: flex;
      justify-content: center;
      flex-direction: column;
      font-size: 18px;
    }
  }
}
</style>
