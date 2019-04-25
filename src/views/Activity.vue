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
      <div class="title">{{activityTitle}}</div>
      <div class="item">
        <img src="https://daiyue.site/img/activity.png" class="icon">
        <span class="strStartTime" v-html="strStartTime"></span>
        至
        <span class="strEndTime" v-html="strEndTime"></span>
      </div>
      <div class="item">
        <img src="https://daiyue.site/img/address.png" class="icon">
        <span v-html="clubAddress"></span>
      </div>
      <div class="item">
        <img src="https://daiyue.site/img/baoming.png" class="icon">
        已报名
        <span v-html="signList.length"></span>人
      </div>
      <div class="item">
        <img src="https://daiyue.site/img/activity.png" class="icon">
        举办方：
        <span v-html="clubName"></span>
      </div>
      <div class="item">
        <img src="https://daiyue.site/img/price.png" class="icon">
        <span v-html="price"></span>元
      </div>
    </div>

    <div class="activityContent" id="activityContent" v-html="activityContent"></div>

    <div class="footer">
      <div class="join" style="cursor:pointer;" @click="confirm1">
        <!--跳转安卓-->
        <span>立即报名</span>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { Dialog } from "vant";
import { Toast } from "vant";

export default {
  name: "activity",
  data() {
    return {
      banners: [],
      activityTitle: "",
      activityContent: "",
      strStartTime: "",
      strEndTime: "",
      clubAddress: "",
      price: "",
      signList: [],
      clubName: ""
    };
  },
  methods: {
    confirm1() {
      Dialog.confirm({
        title: "提示",
        message: "是否立即报名？"
      })
      .then(() => {
        console.log(this.laishou)
        Toast.loading({
          duration: 2500,
          mask: true,
          message: '正在打开中'
        });
        this.isweixin(this.laishou); //打开app
      })
      .catch(() => {
        console.log("用户取消");
      });
    },
    getParam() {
			var _html = window.location.href;
			//var _html = 'http://share.laiscn.com/activity?id=bdecd1ee-aa0e-4499-b877-552b2ef8e26d&random=201904081032101037'
      var Request = new Object();
      if (_html.indexOf("?") != -1) {
        var str = _html.split("?")[1]; //去掉?号
        var strs = str.split("&");
        for (let i = 0; i < strs.length; i++) {
          Request[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
      }
      this.request = Request;
      this.laishou =
        "laishou://share.com/joinactivity?id=" +
        Request.id +
        "&random=" +
        Request.random;
    },
    getData() {
      //this.request.id
      let param = {
        id: this.request.id
      };
      this.$http
        .post("/Activity/ActivityDetails", param)
        .then(res => {
          let data = res.data.data;
          this.activityTitle = data.activityTitle;
          this.activityContent = data.activityContent;
          this.strStartTime = data.strStartTime;
          this.strEndTime = data.strEndTime;
          this.banners = [data.img];
          this.clubAddress = data.clubAddress;
          this.price = data.price;
          this.signList = data.signList;
          this.clubName = data.clubName;
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
    },
		

    
  },
  mounted() {
    this.getParam();
    this.getData();
  },
  created() {
    document.title = "活动详情";
		
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.container {
  width: 100%;
  height: auto;
  min-height: 100vh;
  box-sizing: border-box;
  padding: 0 0 50px 0;
  background-color: #eeeeee;
  .banner {
    width: 100%;
  }
  .items {
    width: 100%;
    height: auto;
    padding: 5px 10px;
    background-color: #fff;
    margin-top: -5px;
    box-sizing: border-box;
    text-align: left;
    .title {
      font-weight: 500;
      font-size: 18px;
      margin-bottom: 8px;
    }
    .item {
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      .icon {
        width: 20px;
        height: 20px;
        margin-right: 5px;
      }
    }
  }
  .activityContent {
    width: 100%;
    height: auto;
    padding: 5px 10px;
    margin-top: 5px;
    background-color: #fff;
    box-sizing: border-box;
		text-align: center;
		
	p{
		width: 100vw;
		box-sizing: border-box;
		text-align: center;
		img{
		  width:100vw!important;
		}
	}
    
  }
  .footer {
    width: 100vw;
    height: 50px;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    z-index: 999;
	text-align: center;
    .join {
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
