<template>
	<div class="container pengyouquan">
		<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :error.sync="error" error-text="请求失败，点击重新加载">
			<div class="item" v-for="(item, index) in items" :key="index">
				<div class="photo-header">
					<img :src="item.headImg" alt="头像" class="photo">
					<div class="name">
						{{item.name}}
					</div>
					<div class='time'>
						{{item.strCreateTime}}
					</div>
				</div>
				<div class='introduce'>
					{{item.introduce}}
				</div>
				<div class="imgs">
					<img v-for="(img, index) in item.photoList" :key="index" v-lazy="img" class="img1" v-if="item.photoList.length==1" @click="imgPreview(item.photoList,index)">
					<img v-for="(img, index) in item.photoList" :key="index" v-lazy="img" class="img2" v-if="item.photoList.length==2" @click="imgPreview(item.photoList,index)">
					<img v-for="(img, index) in item.photoList" :key="index" v-lazy="img" class="img3456789" v-if="item.photoList.length>=3" @click="imgPreview(item.photoList,index)">
				</div>

			</div>
		</van-list>

	</div>
</template>

<script>
	// @ is an alias to /src
	// import HelloWorld from '@/components/HelloWorld.vue'
	import {
		List
	} from 'vant';
	import {
		Dialog
	} from "vant";
	import {
		Toast
	} from "vant";
	import {
		ImagePreview
	} from 'vant';
	import {
		Lazyload
	} from 'vant';
	export default {
		name: "myPhotoes",
		data() {
			return {
				//或者地址 赋值
				request: {},
				page: 1,
				rows: 10,
				total: '',
				//获取的数据列表
				items: [],
				loading: false,
				finished: false,
				error: false

			};
		},
		methods: {
			onLoad() {
				// 异步更新数据
				var that = this
				setTimeout(() => {
					that.getParam()
					// 数据全部加载完成
					if (this.items.length == this.total) {
						this.finished = true;
					}
				}, 500);
			},
			imgPreview(images, index) {
				// console.log(index)
				ImagePreview({
					images: images,
					showIndex: true,
					loop: false,
					showIndicators:true,
					showIndex: true,
					maxZoom: 10,
					minZoom: 1/10,
					startPosition: index
				})
			},
			getParam() {
				var _html = window.location.href;
				// var _html = 'http://share.laiscn.com/myPhotoes?userId=8ea36134-9d6a-4177-b641-e2bc7ceab465'
				var Request = new Object();
				if (_html.indexOf("?") != -1) {
					var str = _html.split("?")[1]; //去掉?号
					var strs = str.split("&");
					for (let i = 0; i < strs.length; i++) {
						Request[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
					}
				}
				this.request = Request;
				// console.log(this.request)
				this.getData()
			},
			getData() {
				let param = {
					"page": this.page,
					"rows": this.rows,
					"userId": this.request.userId
				};
				// console.log(param);return false;
				this.$http
					.post("/Home/PhotoPage", param)
					.then(res => {
						let data = res.data.data;
						this.page = data.page
						this.rows = data.rows
						this.total = data.records
						this.items = data.list
						console.log(data)
						// 加载状态结束
						this.loading = false;
					})
					.catch(res => {
						console.log(res);
					});
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
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;
		padding: 10px 15px 10px 15px;
		background-color: #fff;
		overflow-y: scroll;

		.item {
			box-sizing: border-box;
			padding: 0 0 10px 0;
			width: 100%;
			display: block;

			.photo-header {
				width: 100%;
				height: 50px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 8px;

				.photo {
					width: 43px;
					height: 43px;
					border-radius: 50%;
				}

				.name {
					margin-left: -39%;
					color: #666;
					font-size: 10px;
				}

				.time {
					line-height: 50px;
					color: #999;
					font-size: 8px;
				}
			}

			.introduce {
				color: #333;
				font-size: 14px;
			}

			.imgs {
				box-sizing: border-box;
				width: 100%;
				padding: 5px 0;
				float: left;
				img:last-child{
					margin-bottom: 30px;
				}
				img {
					float: left;
					object-fit:cover;
					margin-bottom: 8px;
				}

				.img1 {
					width: 60%;
					height:180px;
				}

				.img2 {
					width: 40%;
					margin-right: 2%;
					height:160px;
				}

				.img3456789 {
					width: 31.3%;
					margin-right: 2%;
					height:120px;
				}
			}

		}
		
		

	}
</style>
