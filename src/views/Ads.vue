<template>
  <div class="container">
    <div style="background-color: #CB3B27;">
        <img src="https://daiyue.site/img/ads.jpg" style="width: 100%;min-height: 400px;">
        <div class="showForm" @click="clickme" id="clickme">点我减肥</div>
        <div v-show="showForm" id="form" style="color:#fff;">
            手机号码：<input type="text" placeholder="请输入手机号码" v-model="phonenum" id="phonenum">
            登录密码：<input type="password" placeholder="请输入密码" v-model="psw" id="psw">
            确认密码：<input type="password" placeholder="请再次输入密码" v-model="psw1" id="psw1">
            推荐人：<input type="text" placeholder="" v-model="num" id="num" readonly="readonly">
            <div class="submit" @click="submit">
                提 交
            </div>
        </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { Toast } from 'vant';

export default {
  name: "ads",
  data() {
    return {
      phonenum: '',
        psw: '',
        psw1: '',
        num: '',
      showForm: false
    };
  },
  methods: {
    getParam() {
      var _html = window.location.href;
      //var _html = "http://share.laiscn.com/ads?id=8ea36134-9d6a-4177-b641-e2bc7ceab465&mobile=18355138722=&random=201903242201099987"
      var Request = new Object();
      if (_html.indexOf("?") != -1) {
        var str = _html.split("?")[1]; //去掉?号
        var strs = str.split("&");
        for (let i = 0; i < strs.length; i++) {
          Request[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
      }
      this.request = Request
      this.num = Request.mobile //安卓返回的推荐人号码
      console.log("id以及推荐人的额手机号码", this.request);
    },
    submit(){
      if(!this.phonenum){
        Toast.fail('请填写手机号');
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
        Toast.fail("两次密码必须相等")
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
        console.log("推荐成功")
        this.phonenum=''
        this.psw=''
        this.psw1=''
        Toast.success(res.data.message)
      })
      .catch(res=>{
        console.log(res)
        Toast.fail(res.data.message)
      })
    },
    clickme(){
      this.showForm = true
    }
  },
  mounted() {
    this.getParam()
  },
  created() {
    document.title = "真挚邀请您注册我们的会员"
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
  background-color: #CB3B27;
  .showForm {
    font-size: 18px;
    width: 100%;
    height: 40px;
    margin-top: 10px;
    padding-bottom: 10px;
    color: #fff;
    display: block;
    line-height: 40px;
    text-align: center;
  }
  #form{
    padding: 10px;
    box-sizing: border-box;
    margin: 0 auto;
    font-size: 18px;
    width: 80%;
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
    }
  }
  .submit{
    display:block;
    color: #fff;
    background-color: #FACA3C;
    width: 80%;
    margin:15px auto 25px;
    height:40px;
    border-radius: 5px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
  }
}
</style>
