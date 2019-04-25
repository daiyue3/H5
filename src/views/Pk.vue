<template>
  <div class="container">
    <div id="show" style="position:fixed; display: none;width:100vw;height:100vh;background-color:#323334;z-index:9999;box-sizing:border-box;padding:0 10px;">
      <img src="https://daiyue.site/img/showimg.png" style="width: 100%;">
    </div>
    
    
    <div style="background:#FFF;">
        <img :src="banner" style="width: 100%;">
        <p style="width: 100%;box-sizing: border-box;padding: 0 10px;text-align: left;">
            <span style="border-left: 3px solid #6CD07D;">&nbsp;&nbsp;&nbsp;好友PK</span>
        </p>
        <div class="imgs">
            <img :src="pkuserImg" alt="邀请PK人的头像">
            <img src="https://daiyue.site/img/pk-icon.png" alt="PK">
            <img src="https://daiyue.site/img/default.png" alt="被邀请人的头像">
        </div>
        <p style="text-align: center;width: 100%;height: 100px; box-sizing: border-box;padding: 0 10px;">
            <span>想知道自己的身材如何么</span>
            <br>
            <span>来比一比把</span>
        </p>
        <div class="footer" @click="confirm1" style="background:#6CD07D;">立即PK</div>
    </div>


    
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { Dialog } from 'vant';
import { Toast } from "vant";

export default {
  name: "pk",
  data() {
    return {
      laishou:  '',
      banner: 'https://daiyue.site/img/pk.jpg',
      pkuserImg: ''
    };
  },
  methods: {
    confirm1() {
      Dialog.confirm({
        title: '提示',
        message: '立即PK？'
      }).then(() => {
        console.log(this.laishou)
        Toast.loading({
          duration: 2500,
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
      //var _html = 'http://share.laiscn.com/pk?pkuser=1ac0851c-3e9d-4914-ae4f-3e78aedcc6a2&random=201903241515417846'
      var Request = new Object();
      if (_html.indexOf("?") != -1) {
        var str = _html.split("?")[1]; //去掉?号
        var strs = str.split("&");
        for (let i = 0; i < strs.length; i++) {
          Request[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
      }
      this.request = Request;
      this.laishou ="laishou://share.com/pk?pkuser=" + Request.pkuser + "&random=" + Request.random;
    },
    getData(){
        let param = {
            pkId: this.request.pkuser //|| '08c6f902-6548-4882-b845-75be2b1e2491'
        };
        this.$http.post("/Extend/PkUserHead", param)
        .then(res => {
            this.pkuserImg = res.data.data
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
    this.getParam()
    this.getData()
  },
  created() {
    document.title = "快来PK一下吧"    
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.container {
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 0;
  background-color: #FFF;
  min-height:100vh;
  .imgs{
      width: 80%;
      height: 100px; 
      margin: 0 auto;
      box-sizing: border-box;
      padding: 10px 40px;
      position: relative;
      img:nth-child(1){
          width:80px;
          height: 80px;border-radius: 50%;
          float: left;
      }
      img:nth-child(2){
          width: 91px;height: 60px;
          position: absolute;top: 25px;
          margin:auto;left: 0;right: 0;
      }
      img:nth-child(3){
          width:80px;height: 80px;border-radius: 50%;float: right;
      }
  }
  .footer{
      width: 100%;height: 50px;
      background-color: #6CD07D;
      position: fixed;
      bottom: 0;
      color: #FFF;text-align: center;
      line-height: 50px;
      font-size: 19px;
      cursor: pointer;
  }
}
</style>
