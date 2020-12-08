<template>
	<view class="me" v-if="form.name">
		<view class="me-header">
			<image :src="form.avatar || images"></image>
			<view class="me-header-name">
				<text class="name">{{form.name}}</text>
				<text class="number">{{form.mobile}}</text>
			</view>
		</view>
		<view class="bar"></view>
		<uni-list v-if="form.name">
		    <uni-list-item  title="所属门店"   :rightText="form.orgParentName" :showArrow="false"></uni-list-item>
		    <uni-list-item  title="商户编码"   :rightText="form.tenant" :showArrow="false"></uni-list-item>
		    <uni-list-item  title="门店工号"   :rightText="form.jobNumber" :showArrow="false"></uni-list-item>
		    <uni-list-item  title="联系号码"   :rightText="form.mobile" :showArrow="false"></uni-list-item>
		    <uni-list-item  title="注册时间"   :rightText="form.createTime" :showArrow="false"></uni-list-item>
		    <uni-list-item  title="当前版本"   :rightText="form.version" :showArrow="false"></uni-list-item>
		    <uni-list-item  title="剩余天数"   :rightText="form.validDay" :showArrow="false"></uni-list-item>
		</uni-list>
		<view class="me-button">
		
			<button type="default" hover-class="hover" :disabled="loading" :loading="loading" @click="loginFrom">退出登录</button>
		</view>
	</view>
</template>

<script>
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		components: {
			uniPopupDialog
		},
		data() {
			return {
				images: require('../../static/images/me.jpg'),
				form: {},
				loading: false
			}
		},
		async onLoad() {
			this.getInfo()
		},
		methods: {
			async loginFrom () {
				this.loading = true
				let account = uni.getStorageSync('account');
				await this.$api.unbundling({
					account: account
				})
				 uni.removeStorageSync('account');
				 uni.removeStorageSync('token');
				 uni.removeStorageSync('tenant');
				uni.reLaunch({
				    url: '../index/login'
				});
			},
			async getInfo () {
				let res = await this.$api.getCurrentUserMessage({})
				
				this.form = res
			},
			doEdit () {
				this.$refs.popup.open()
			},
			confirm(done,value) {
				console.log(value)
				done()
			}
		}
	}
</script>

<style lang="scss" >
	.me {
		.me-button {
			margin-top: 10px;
			padding: 10px;
			button {
				color: #FFFFFF;
				margin-top: 10px;
				border: none;
				// background-color: $uni-color-primary;
				background-color:  rgb(81,136,235);
			}
		}
		.bar {
			height: 12px;
			background-color: #f7f8fa;
		}
		&-header {
			position: relative;
			padding: 30px 20px;
			display: flex;
			flex-direction: row;
			align-items: center;
			.icon {
				position: absolute;
				top: 12px;
				right: 12px;
			}
			&-name {
				text {
					display: block;
				}
				.name {
					font-size: 17px;
					font-weight: 500;
				}
				.number {
					font-size: 15px;
					font-weight: 500;
					color: $uni-text-color-v;
				}
			}
			image {
				border: 1px solid #EEEEEE;
				margin-right: 10px;
				height: 70px;
				width: 70px;
				border-radius: 50%;
			}
		}
		
	}
</style>
