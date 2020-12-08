<template>
	<view class="login" v-show="show">
		<quick-message ref="message"></quick-message>
		<view class="title">
			<text class="big">绑定手机号</text>
			<text class="small">您还未绑定手机号,请先绑定</text>
		</view>
		<view class="form">
			<view class="form-accout">
				<input @input="accountInput"  placeholder="请输入手机号" placeholder-class="place"/>
			</view>
			<view class="form-accout">
				<input  @input="passwordInput"  password placeholder="请输入密码" placeholder-class="place"/>
			</view>
		</view>
		<view class="button">
			<button type="default" hover-class="hover" :disabled="loading" :loading="loading" @click="loginFrom">登录</button>
		</view>
	</view>
</template>

<script>
	export default { 
		data() {
			return {
				storeList: [],
				account: '',
				password: '',
				keywords: null,
				href: 'https://uniapp.dcloud.io/component/README?id=uniui',
				openId: null,
				sessionKey: null,
				show: false,
				disabled: false,
				loading: false,
			}
		},
		async onLoad() {
			let vm = this
			// this.show = true
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
					// await vm.getStore()
					uni.navigateTo({
						url:'./index'
					})
				}else{
					// vm.$refs.popup.open()
					vm.show = true
					vm.openId = res.openId
					vm.sessionKey = res.sessionKey
				}
				  
			  }
			});
		
		},
		methods: {
			accountInput (val) {
			
				this.account = val.detail.value
			},
			passwordInput (val) {
				this.password = val.detail.value
			},
			async loginFrom () {
				if (!this.account || !this.password) {
					return
				}
				try {
					this.loading = true
					let base64= require('../../common/base64.js').Base64;
					let password = ''
					 password = base64.encode(this.password)
					
					let val = await this.$api.weChatLogintoken({
						openId: this.openId,
						account: this.account,
					 	password: password,
					})
					if(val.tenant) {
						
						uni.setStorageSync('token', val.userInfo.data.token);
						uni.setStorageSync('tenant', val.tenant);
						uni.setStorageSync('account', val.userInfo.data.account);
						uni.navigateTo({
							url: './index'
						})
					}else{
						 this.$refs.message.show({
						                            type:'warning', //String 默认default
						                            msg:'手机号或者密码错误', //String 显示内容 *
						                            direction:'top', //String 默认顶部显示
						                            icon:true, //Boolean|String 显示icon(false/true/string 默认显示icon)
						                            mask:true, //Boolean 遮罩（默认false没有遮罩）
						                            time:3000, //Number|Boolean 默认3000/false为不自动关闭
						                            customStyle:{ //自定义样式
						                                    color:'#FFFFFF', //字体图标色
						                                    backgroundColor:'rgba(0,0,0,.5)' //背景色
						                            }, 
						                            iconSize: 16, //Number 自定义icon大小(单位px 默认16 设置后会覆盖自定义样式里的设置优先级最高)
						                            iconColor: '', //String icon颜色(默认主题颜色 设置后会覆盖自定义样式里的设置优先级最高)
						                    })
						this.loading = false
					}
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
					// 		// await vm.getStore()
					// 		// uni.navigateTo({
					// 		// 	url:'./index'
					// 		// })
					// 	}else{
					// 		// vm.$refs.popup.open()
					// 		vm.show = true
					// 		vm.openId = res.openId
					// 		vm.sessionKey = res.sessionKey
					// 	}
						  
					//   }
					// });
					this.loading = false
				}catch(e) {
					this.loading = false
				}
			}
		}
	}
</script>

<style lang="scss">
	.login {
		height: 100vh;
		background-color: rgb(245,246,248);
		padding: 30px 30px;
		.hover {
			scale: (0.95);
		}
		.button {
			button:after {
				border: none;
			}
			button {
				color: #FFFFFF;
				margin-top: 10px;
				border: none;
				// background-color: $uni-color-primary;
				background-color:  rgb(81,136,235);
			}
		}
		.place  {
			font-weight: 200;
			color: rgb(189,191,206);
		}
		.form {
			margin-top: 30px;
			.form-accout {
				margin: 20px 0;
				padding-bottom: 10px;
				border-bottom: 0.5px solid rgb(247,238,239);
			}
		}
		.title {
			
			text-align: center;
			.big  {
				font-size: 20px;
				font-weight: 500;
			}
			.small {
				color: $uni-text-color-v;
				font-weight: 400;
			}
			text {
				margin-bottom: 7px;
				display: block;
			}
		}
	}
</style>
