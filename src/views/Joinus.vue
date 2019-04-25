<template>
  <div class="container">
    <div style="background: #2C317E;">
        <img src="https://daiyue.site/img/joinus.jpeg" style="width: 100%;">
        <div class="showForm" @click="clickme" id="clickme">点我入驻</div>
        <div v-show="showForm" id="form" style="margin-top:0;">
            手机号码：<input type="text" placeholder="请输入手机号码" v-model="phonenum" id="num">
            姓&nbsp;&nbsp;名：<input type="text" placeholder="请输入姓名" v-model="name" id="name">
            <div class="submit" @click="submit">
                提 交
            </div>
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { Toast } from 'vant';

export default {
  name: "joinus",
  data() {
    return {
      phonenum: '',
      name: '',
      showForm: false
    };
  },
  methods: {
    submit(){
      if(!this.phonenum){
        Toast.fail('请填写手机号');
        return false
      }
      if(!this.name){
        Toast.fail('请填写姓名');
        return false
      }
      let param ={
        mobile: this.phonenum,
        name: this.name
      }
      this.$http.post('/Extend/JoinRegister',param)
      .then(res=>{
        console.log(1111,res.data)
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
    
  },
  created() {
    document.title = "非常欢迎您的加盟，感谢您的信任"
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
        text-align: left;
        color:#FFF;
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
        margin:0 auto;
        height:40px;
        margin-top: 15px;
        margin-bottom:25px;
        border-radius: 5px;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
        color:#333;
    }
}
</style>
