<template>
  <div class="container">
    <div class="register">
      <img src="../assets/img/ads.jpg" style="width: 100%;min-height: 400px;">
      <div id="form">
        手机号码：<input type="text" placeholder="请输入手机号码" v-model="phonenum" id="phonenum">
        登录密码：<input type="password" placeholder="请输入密码" v-model="psw" id="psw">
        确认密码：<input type="password" placeholder="请再次输入密码" v-model="psw1" id="psw1">
        推荐人：<input type="text" placeholder="" v-model="num" id="num" readonly="readonly">
        <div class="submit" @click="submit">
          注  册
        </div>
      </div>
      <div class="download-btn">
        <img src="../assets/img/logo.png" alt="" style="width: 40px;height: 40px;">
        <div class="desc">
          <p class="one">让生意更好做，让生活更精彩!</p>
          <p class="two">下载注册送价值198元大礼包</p>
        </div>
        <div class="btn" @click="download">
          免费下载
        </div>
      </div>
    </div>
    <div class="mask" v-show="showMask">
      <img src="https://daiyue.site/img/showimg.png" style="width: 100%;">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // @ is an alias to /src
  // import HelloWorld from '@/components/HelloWorld.vue'
  import { Toast } from 'vant';

  export default {
    name: "download",
    data() {
      return {
        phonenum: '',
        psw: '',
        psw1: '',
        num: '',
        showMask: false,
        siteAndroid: 'https://sj.qq.com/myapp/detail.htm?apkName=com.cherishTang.laishou',
        siteIos: 'https://itunes.apple.com/cn/app/%E8%8E%B1%E7%98%A6/id1448462127?mt=8',
        downloadUrl: 'http://url.lnk9.cn/79812134463'
      };
    },
    methods: {
      getParam() {
        var _html = window.location.href;
//        var _html = "http://share.laiscn.com/h5?id=08c6f902-6548-4882-b845-75be2b1e2491&phone=15210233318"
        var Request = new Object();
        if (_html.indexOf("?") != -1) {
          var str = _html.split("?")[1]; //去掉?号
          var strs = str.split("&");
          for (let i = 0; i < strs.length; i++) {
            Request[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
          }
        }
        this.request = Request;
        this.num = Request.phone; //安卓返回的推荐人号码
//        console.log("id以及推荐人的额手机号码", this.request);
      },
      submit(){
        let that = this;
        if(!this.phonenum){
          Toast.fail('请填写手机号');
          return false
        }
        if(!(/^1(3|4|5|7|8)\d{9}$/.test(this.phonenum))){
          Toast.fail('手机号码有误，请重新填写');
          return false
        }
        if(!this.psw){
          Toast.fail('请填写密码');
          return false
        }
        if(!this.psw1){
          if(this.psw){
            Toast.fail('请再次填写密码');
            return false
          }
        }
        if(this.psw!=this.psw1){
          Toast.fail("两次密码必须相等");
          return false
        }
        let param ={
          mobile: this.phonenum,
          password: this.$md5(this.psw),
          confirmPwd: this.$md5(this.psw1),
          recommendId: this.request.id  //推荐人的id
        }
        this.$http.post('/Extend/PromoteRegister',param)
                .then(res=>{
//                  console.log(res);
                  console.log("注册成功")
                  this.phonenum=''
                  this.psw=''
                  this.psw1=''
                  Toast.success(res.data.message)
                  setTimeout(function () {
                    var ua = navigator.userAgent.toLowerCase();
                    if (ua.match(/MicroMessenger/i) == "micromessenger") {
                      //document.getElementById("show").style.display="none";//隐藏
                      that.showMask = true; //显示
                      console.log('wechat')
                    } else {
                      var u = navigator.userAgent;
                      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
                      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                      if (isAndroid) {
//                        console.log('安卓');
                        that.showMask = false;  //隐藏
                        setTimeout(function() {
                          window.location.href = that.siteAndroid; //打开安卓
                        }, 200);
                        setTimeout(function(){
                          window.location.href="https://sj.qq.com/myapp/detail.htm?apkName=com.cherishTang.laishou"; //如果超时就跳转到app下载页
                        },2500);
                      }
                      if (isiOS) {
//                        console.log('ios')
                        that.showMask = false; //隐藏
                        setTimeout(function() {
                          window.location.href = that.siteIos; //打开IOS
                        }, 200);
                        setTimeout(function(){
                          //Toast.fail('IOS暂不支持下载')
                           window.location.href="https://itunes.apple.com/cn/app/1448462127/id1448462127?mt=8"; //如果超时就跳转到app下载页
                        },3000);
                      }
                    }
                  },2000)
                })
                .catch(res=>{
                  console.log(res)
                  Toast.fail(res.data.message)
                })
      },
      isweixin() {
        let that = this;
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
          //document.getElementById("show").style.display="none";//隐藏
          that.showMask = true; //显示
          console.log('wechat')
        } else {
          var u = navigator.userAgent;
          var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
          var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
          if (isAndroid) {
//                        console.log('安卓');
            that.showMask = false;  //隐藏
            setTimeout(function() {
              window.location.href = that.siteAndroid; //打开安卓
            }, 200);
            setTimeout(function(){
              window.location.href="https://sj.qq.com/myapp/detail.htm?apkName=com.cherishTang.laishou"; //如果超时就跳转到app下载页
            },2000);
          }
          if (isiOS) {
//                        console.log('ios')
            that.showMask = false; //隐藏
            setTimeout(function() {
              window.location.href = that.siteIos; //打开IOS
            }, 200);
            setTimeout(function(){
              //Toast.fail('IOS暂不支持下载');
               window.location.href="https://itunes.apple.com/cn/app/1448462127/id1448462127?mt=8"; //如果超时就跳转到app下载页
            },2000);
          }
        }
      },
      download(){
        console.log('clicked');
        window.location.href = this.downloadUrl;
      }
    },
    mounted() {
      this.getParam();
    },
    created() {
      document.title = "真挚邀请您为我助力"
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .container {
    width: 100%;
    height: auto;
    min-height:100vh;
    box-sizing: border-box;
    padding: 0;
/*    background: url("../assets/img/bg-color.png") repeat left top;
    -webkit-background-size: 100% auto;
    background-size: 100% auto;*/
    background: -webkit-linear-gradient(left, #e74a03 , #c90103,#e74a03); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #e74a03, #c90103,#e74a03); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #e74a03, #c90103,#e74a03); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #e74a03 , #c90103,#e74a03); /* 标准的语法 */
    #form{
      padding: 10px 10px 60px 10px;
      box-sizing: border-box;
      margin: -160px auto 0;
      font-size: 18px;
      width: 80%;
      color: #fff;
      input{
        width: 100%;
        height: 40px;
        border-radius: 5px;
        border: 1px solid #CB3B27;
        background-color: #FFF;
        font-size: 18px;
        padding: 0 10px;
        margin: 10px 0;
        color: #333;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
      }
    }
    .submit{
      display:block;
      background-color: #ee6b33;
      width: 80%;
      margin:0 auto;
      height:40px;
      margin-top: 15px;
      margin-bottom:25px;
      border-radius: 5px;
      line-height: 40px;
      text-align: center;
      cursor: pointer;
      color:#fff;
    }
    .download-btn {
      // display:box;
      display:-webkit-box;
      display:-webkit-flex;
      display:-moz-box;
      display:-ms-flexbox;
      display:flex;
      align-items: center;
      position: fixed;
      right: 0;
      bottom: 0;
      z-index: 1000;
      width: 100%;
      height: 50px;
      color: #fff;
      background-color: rgba(0,0,0,.5);
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      padding: 0 10px;
      img {
        height: 40px;
      }
      .desc {
        -prefix-box-flex: 1;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        -moz-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0 20px 0 10px;
        overflow: hidden;
        p {
          margin: 0;
          overflow: hidden;
          -ms-text-overflow: ellipsis;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 20px;
					font-size: 14px;
          &.one {
            font-weight: bold;
          }
        }
      }
      .btn {
        padding: 10px;
        background-color: #e6442d;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
      }
    }
    .mask {
      position: fixed;
      left: 0;
      top: 0;
      z-index: 990;
      width: 100%;
      height: 100%;
      background-color: #323334;
    }
  }
</style>
