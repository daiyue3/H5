<template>
  <div class="container">
    <div id="show" style="position:fixed; display: none;width:100vw;height:100vh;background-color:#323334;z-index:9999;box-sizing:border-box;padding:0 10px;">
      <img src="https://daiyue.site/img/showimg.png" style="width: 100%;">
    </div>
    <div style="background:#FFF;">
        <img :src="imgSrc" alt="" style="width:100%;">
        <div  v-html="articleContent" class="articleContent"></div>
        <div class="showForm" @click="clickme" id="clickme">点我减肥</div>
        <div v-show="showForm" class="form">
          手机号码：<input type="text" placeholder="请输入手机号码" v-model="phonenum" id="phonenum">
          登录密码：<input type="password" placeholder="请输入密码" v-model="psw" id="psw">
          确认密码：<input type="password" placeholder="请再次输入密码" v-model="psw1" id="psw1">
          推荐人：<input type="text" placeholder="请填写推荐人的手机号" v-model="num" id="num">
          <div class="submit" @click="submit">
             注 册
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
  name: "article",
  data() {
    return {
      articleContent: '',
      imgSrc: '',
      phonenum: '',
        psw: '',
        psw1: '',
        num: '',
      showForm: false
    };
  },
  methods: {
    getArticleDetails (){
       //var html = "https://share.laiscn.com/article?id=ba1fab42-f536-45d0-808e-c55ceda6dd3a"
      var html = window.location.href
      var Request = new Object();
      if(html.indexOf("?")!=-1){
          var str = html.split("?")[1]; //去掉?号
          var strs = str.split("&");
          for(let i=0;i<strs.length;i++){
              Request[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
          }
      }
      console.log(Request)

      let param = {
        id: Request.id
      }
      this.$http.post('/Article/ArticleDetails',param)
      .then(res=>{
        console.log(res.data.data)
        this.articleContent = res.data.data.articleContent
        this.imgSrc= res.data.data.img
        document.title= res.data.data.articleTitle
      })
      .catch(res=>{
        console.log(res)
      })
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
      if(!this.num){
        Toast.fail("推荐人手机号不能为空")
        return false
      }
      let param ={
        mobile: this.phonenum,
        password: this.$md5(this.psw),
        confirmPwd: this.$md5(this.psw1),
        recommendMobile: this.num
      }
      this.$http.post('/Extend/PromoteArticle',param)
      .then(res=>{
        console.log("注册成功")
        this.phonenum=''
        this.psw=''
        this.psw1=''
        this.num=''
        Toast.success(res.data.message)
      })
      .catch(res=>{
        console.log(res)
        Toast.fail(res.data.message || '注册失败')
      })
    },
    clickme(){
      this.showForm = true
    }
  },
  mounted() {
    this.getArticleDetails()
    
  },
  created() {
    document.title = "文章详情"
    function isweixin(){
			var ua = navigator.userAgent.toLowerCase();  
			if(ua.match(/MicroMessenger/i)=="micromessenger") { 	
				//document.getElementById("show").style.display="none";//隐藏
				document.getElementById("show").style.display="block";//显示
			} else {
        document.getElementById("show").style.display="none";//隐藏
			}  
		}
		//isweixin()
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.container {
  width: 100%;
  height: auto;
  min-height:100vh;
  box-sizing: border-box;
  padding: 10px 10px;
  text-align: center;
  background-color: #FFF;
  .articleContent{
    width: 100%;
    box-sizing: border-box;
    padding: 0;
    height: auto;
    background-color: #FFF;
  }
  .showForm {
    font-size: 18px;
    width: 100%;
    height: 40px;
    margin: 10px 0;
    color: #fff;
    display: block;
    line-height: 40px;
    text-align: center;
    background-color: #FACA3C;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }
  .form{
        padding: 10px;
        box-sizing: border-box;
        margin: 0 auto;
        font-size: 18px;
        width: 80%;
        text-align: left;
        background: #FFF;
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
          background-color: #FACA3C;
          width: 80%;
          margin:15px auto 25px;
          height:40px;
          border-radius: 5px;
          line-height: 40px;
          text-align: center;
          cursor: pointer;
          color:#fff;
      }
}
</style>
