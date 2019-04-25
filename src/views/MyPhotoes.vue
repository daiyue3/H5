<template>
	<div class="container">
		<div id="show" style="display: none;width:100%;height:100vh;background-color:#323334;z-index:9999;box-sizing:border-box;padding:0 10px;position:fixed;">
			<img src="https://daiyue.site/img/showimg.png" style="width: 100%;">
		</div>

	</div>
</template>

<script>
	// @ is an alias to /src
	// import HelloWorld from '@/components/HelloWorld.vue'
	import {
		Dialog
	} from "vant";
	import {
		Toast
	} from "vant";

	export default {
		name: "myPhotoes",
		data() {
			return {

			};
		},
		methods: {

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
						setTimeout(function() {
							window.location.href = "https://sj.qq.com/myapp/detail.htm?apkName=com.cherishTang.laishou"; //如果超时就跳转到app下载页
						}, 2000);
					}
					if (isiOS) {
						document.getElementById("show").style.display = "none"; //隐藏
						setTimeout(function() {
							window.location.href = _href; //打开IOS
						}, 200);
						setTimeout(function() {
							//Toast.fail('IOS暂不支持下载')
							window.location.href = "https://itunes.apple.com/cn/app/1448462127/id1448462127?mt=8"; //如果超时就跳转到app下载页
						}, 2000);
					}
				}
			},



		},
		mounted() {

		},
		created() {
			document.title = "我的相册";

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




	}
</style>
