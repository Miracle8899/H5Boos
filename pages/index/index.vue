<template>
	<view class="container">
		<uni-popup ref="popup" type="center">
			<view class="pop">
				<text class="titleList">提示</text>
				<text class="popTitle">您暂未登录</text>
				<button open-type="getPhoneNumber" type="primary" @getphonenumber="getPhoneNumber">授权获取手机号码登录</button>
				<!-- <button open-type="getPhoneNumber" @getphonenumber="getphonenumber">获取手机号码</button> -->
			</view>
		</uni-popup>
		<!-- <view>
			<button open-type="getPhoneNumber" @getphonenumber="getphonenumber">获取手机号码</button>
		</view> -->
		<view class="header">
			<uni-search-bar @confirm="confirm"  placeholder="请输入门店名称进行搜索."/>
		</view>
		<view class="title" v-if="storeList.length > 0">
			<text>您拥有多家门店的后台管理权限,请选择需要查看的门店</text>
		</view>
		<view class="content">
			<uni-collapse>
				<uni-collapse-item title="门店" :showAnimation="true"  v-if="storeList.length > 0">
					<my-cell @click="goit('', '全部门店')" name="全部" v-if="showALL == 1"></my-cell>
					<my-cell :key="idx" v-for="(item, idx) in storeList" @click="goit(item.id, item.label)" :name="item.label"></my-cell>
					
				</uni-collapse-item>
			</uni-collapse>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				storeList: [],
				keywords: null,
				href: 'https://uniapp.dcloud.io/component/README?id=uniui',
				openId: null,
				sessionKey: null,
				showALL: 0,
			}
		},
		async onShow() {
			// let vm = this
			// uni.login({
			//   provider: 'weixin',
			//   success: async function (loginRes) {
			// 	let res = await vm.$api.codeToosession({
			// 		code: loginRes.code
			// 	})
			// 	if(res.tenant) {
			// 		 uni.setStorageSync('token', res.userInfo.data.token);
			// 		 uni.setStorageSync('tenant', res.tenant);
			// 		await vm.getStore()
			// 	}else{
			// 		vm.$refs.popup.open()
			// 		vm.openId = res.openId
			// 		vm.sessionKey = res.sessionKey
			// 	}
				  
			//   }
			// });
		await this.getStore()
		},
		async onLoad () {
			let res = await this.$api.selectAllorgcheck({})
			this.showALL = res
		},
		methods: {
			async getStore (val) {
				let res 
				if (val) {
					 res = await this.$api.selectAllOrg({
						name: val 
					})
				}else{
					 res = await this.$api.selectAllOrg({
						 name: ''
					 })
				}
				
				this.storeList = res
			},
			async getPhoneNumber (val) {
				
			 await this.$api.weChatlogin({
					encryptedData: val.mp.detail.encryptedData,
					iv: val.mp.detail.iv,
					sessionKey: this.sessionKey,
					openId: this.openId
				})
				
				let vm = this
				uni.login({
				  provider: 'weixin',
				  success: async function (loginRes) {
					let res = await vm.$api.codeToosession({
						code: loginRes.code
					})
					
					if(res.tenant) {
						uni.setStorageSync('token', res.userInfo.data.token);
						uni.setStorageSync('account', res.userInfo.data.account)
						uni.setStorageSync('tenant', res.tenant);
						vm.$nextTick(async ()=>{
							await vm.getStore()
						})
						vm.$refs.popup.close()
					}else{
						vm.$refs.popup.open()
						vm.openId = res.openId
						vm.sessionKey = res.sessionKey
					}
					  
				  }
				});
						
			},
			sumInfo () {
				console.log(val)
			},
			goit (val , name) {
				uni.setStorageSync(
					'store',val)
				uni.setStorageSync(
					'storeName',name)
				uni.reLaunch({
					url: "../boat/Index"
				})
			},
			confirm(val) {
				this.getStore(val.value)
				// this.keywords = val.value
			},
		}
	}
</script>

<style lang="scss" >
	.container {
		.pop {
			padding: 10px;
			width: 300px;
			background-color: #fff;
			.titleList {
				display: block;
				text-align: center;
				font-weight: bold;
				font-size: 20px;
				margin-bottom: 10px;
				
			}
			.popTitle {
				display: block;
				text-align: center;
				margin-bottom: 15px;
				font-size: 18px;
			}
			
		}
		.popupBoat {
			width: 270px;
			background-color: #fff;
			padding: 20px 10px;
			.popupBoat-box{
				margin-top: 20px;
				display: flex;
				flex-direction: row;
				align-items: center;
				input {
					margin-left: 10px;
				}
			}
		}
		.uni-collapse-cell__content {
			padding-left: 15px;
		}
		.header {
			padding: 5px;
		}
		.title {
			background: $uni-bg-color-v;
			padding: 10px;
			font-size: 15px;
			color: $uni-text-color-v
		}
	}
</style>
