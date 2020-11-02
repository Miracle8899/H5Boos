<template>
	<view class="member">
		<view class="memberCard" >
			<view class="memberCard-box">
				<view class="label">会员销售额</view>
				<view class="value">{{fx.total}}</view>
				<view class="desc">会员订单数: {{fx.count}}</view>
			</view>
			<view class="memberCard-box, miniBorder">
				<view class="label">充值金额</view>
				<view class="value">{{fx.changeMoney}}</view>
				<view class="desc">赠送金额: {{fx.giveMoney}}</view>
			</view>
		</view>
		<view class="memberCardTime">
				<uni-segmented-control active-color="#ffffff"  @clickItem="changeclickItem" color="#B6C9FB" class="hotContent-switch-left" style-type="text" :current="current" :values="items" ></uni-segmented-control>
		</view>
		<my-timerange v-if="type === '6'" @changeTime="changTimeIt" ref="timer"></my-timerange>
		<view class="bar"></view>
		<view class="memberStatus" >
			<view class="title">会员统计</view>
			<view class="memberStatusBox">
				<view class="minibox">
					<view class="number">{{form.memberInfo}}</view>
					<view class="label">会员总数</view>
				</view>
				<view class="minibox">
					<view class="number">{{form.todayMembers}}</view>
					<view class="label">今日消费会员</view>
				</view>
				
			</view>
			<view class="memberStatusBox">
				<view class="minibox">
					<view class="number">{{form.weekMembers}}</view>
					<view class="label">本周消费会员</view>
				</view>
				<view class="minibox">
					<view class="number">{{form.monthMembers}}</view>
					<view class="label">本月消费会员</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				current: 0,
				items: [
					'今日',
					'昨日',
					'上周',
					'本月',
					'上月',
					'自定义',
				],
				form: {},
				fx: {},
				type: '1',
				createTimeSt: '',
				createTimeEd: '',
			}
		},
		onLoad() {
			this.getfx()
			this.gettj()
		},
		methods: {
			changTimeIt (st, et) {
					
					this.createTimeSt = st
					this.createTimeEd = et
					this.getfx()
			},
			changeclickItem (val) {
				if (val.currentIndex === 0)  {
					this.type = '1'
				}
				if (val.currentIndex === 1)  {
					this.type = '2'
				}
				if (val.currentIndex === 2)  {
					this.type = '3'
				}
				if (val.currentIndex === 3)  {
					this.type = '4'
				}
				if (val.currentIndex === 4)  {
					this.type = '5'
				}
				if (val.currentIndex === 5)  {
					this.type = '6'
					this.$nextTick(function(){
						this.$refs.timer.visible = true
					})
					return
				}
				this.getfx()
			},
			async getfx (){
				let store = null
				store = uni.getStorageSync('store')
				let res = await this.$api.getMemberAnalysis({
					type: this.type,
					storeCode: store,
					createTimeSt: this.createTimeSt,
					createTimeEd: this.createTimeEd,
				})
				this.fx = res
			},
			async gettj () {
				let store = null
				store = uni.getStorageSync('store')
				let res = await this.$api.getMemberStatisticsmemberInfo({
					storeCode: store,
				})
				this.form = res
			},
		}
	}
</script>

<style lang="scss">
	.member {
		.bar {
			height: 12px;
			background-color: #f7f8fa;
		}
		padding: 10px;
		.segmented-control__text {
			color: rgb(182,201,251)
		}
		.memberCardTime {
			padding-bottom: 5px;
			border-top: 1px solid rgb(96,153,244);
			background-color: rgb(77,131,245);
			border-bottom-left-radius: 5px;
			border-bottom-right-radius: 5px;
		}
		.memberCard {
			border-top-right-radius: 5px;
			border-top-left-radius: 5px;
			color: #FFFFFF;
			background-color: rgb(77,131,245);
			display: flex;
			flex-direction: row;
			align-items: center;
			.miniBorder  {
				border-left: rgb(96,153,244) solid 1px;
			}
			.memberCard-box {
				padding: 15px;
				flex: 1;
				.label {
					font-size: 15px;
				}
				.value {
					font-size: 18px;
					margin: 10px 0;
				}
				.desc {
					
					font-size: 13px;
				}
			}
		}
		.memberStatus {
			margin-top: 20px;
			.title {
				font-weight: 600;
				font-size: 17px;
				margin-bottom: 15px;
			}
			.memberStatusBox {
				margin-bottom: 10px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.minibox:first-child {
					margin-right: 10px;
				}
				.minibox {
					padding: 20px 0 30px 20px;
					border-radius: 5px;
					background-color: rgb(243,250,252);
					border: 1px solid rgb(240,247,250);
					color: rgb(81,171,202);
					flex: 1;
					.number {
						font-size: 17px;
						font-weight: 600;
						margin-bottom: 15px;
					}
					.label {
						color: #000000;
					}
				}
			}
		}
	}
</style>
