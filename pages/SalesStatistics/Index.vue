<template >
	<view class="saleSta">
		<view class="saleSta-header">
			<uni-segmented-control class="hotContent-switch-left" @clickItem="changeIt" style-type="text" :current="current" :values="items" ></uni-segmented-control>
			<my-timerange v-if="type === '6'" @changeTime="changTimeIt" ref="timer"></my-timerange>
		</view>
		<view class="bar"></view>
		<!-- <view class="saleBox-title">
			当前数据统计截止到:2020-08-20 20:33:00
		</view> -->
		<view class="saleBox" v-if="form.customerPrice">
			<view class="saleBox-head">
				<text class="moeny">销售额</text>
				<text class="num">{{form.paymentMoney}}</text>
			</view>
			<uni-grid :column="2" borderColor="#E6EFFD">
				<uni-grid-item v-for="(item, index) in list" :key="index">
				        <view class="boxin">
							<text class="label">{{item.label}}</text>
							<text class="value" >{{item.value}}</text>
						</view>
				</uni-grid-item>
			</uni-grid>
		</view>
		<view class="bar"></view>
		
		<view class="classrank">
			<text class='storeRank'>商品销售排名</text>
			<no-data title="暂无数据" v-if="goodsList.length < 1 && !loading"></no-data>
			<my-goodscell :list="goodsList" v-if="goodsList.length > 0"></my-goodscell>
			<uni-load-more :status="status" ></uni-load-more>
		</view>
	</view>
</template>

<script>
	
	export default {
		
		data() {
			return {
				type: '1',
				goodsList: [
					
				],
				list: [
					{
						label: '订单数',
						value: 0,
					},
					{
						label: '客单价',
						value: 0,
					},
					{
						label: '毛利率',
						value: '0',
					},
					{
						label: '毛利额',
						value: 0,
					},
				],
				items: [
					'今日',
					'昨日',
					'本周',
					'本月',
					'上月',
					'自定义',
				],
				form: {},
				createTimeSt: '',
				createTimeEd: '',
				page: 1,
				status: 'loading',
				loading: false,
			}
		},
		async onLoad() {
			this.getPage()
			await this.goods(1)
		},
		async onReachBottom() {
				
				if ((this.goodsList.length < this.total) && !this.loading) {
					
					await this.goods()
				}
		    },
		methods: {
			async goods (val) {
				if (val ===1) {
					this.goodsList = []
					this.page = 1
				}else{
					this.page +=1
				}
				try {
					this.loading = true
					this.status = 'loading'
					let store = null
					store = uni.getStorageSync('store')
					let res =  await this.$api.getCommoditySalesStatistics({
						current: this.page,
						model: {
							type: this.type,
							storeCode: store,
							displaySize: 5,
							createTimeSt: this.createTimeSt,
							createTimeEd: this.createTimeEd,
						}
					})
					
					this.goodsList = this.goodsList.concat(res.data.records)
					this.total = res.data.total
					if(this.goodsList.length >= this.total) {
						this.status = 'noMore'
					}else{
						this.status = 'more'
					}
					this.loading = false
				}catch(e) {
					this.loading = false
				}
				
			},
			changTimeIt (st, et) {
					
					this.createTimeSt = st
					this.createTimeEd = et
					this.getPage(1)
					this.goods(1)
			},
			changeIt (val) {
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
				this.getPage(1)
				 this.goods(1)
			},
			async getPage() {
				let store = null
				store = uni.getStorageSync('store')
				let res =  await this.$api.getSalesStatisticsorderDetail({
						type: this.type,
						storeCode: store,
						createTimeSt: this.createTimeSt,
						createTimeEd: this.createTimeEd,
					
				})
			
				this.form = res
				let val = Number( this.form.profitMoney)/Number(this.form.paymentMoney)
				val = (val*100).toFixed(2)
				if (Number(this.form.paymentMoney) ==0) {
					val = 0
				}
				this.list[0].value = this.form.passengerFlow
				this.list[1].value = this.form.customerPrice
				this.list[2].value = val +'%'
				this.list[3].value = this.form.profitMoney
			},
		}
	}
</script>

<style lang="scss" >
	.saleSta {
		.boxin {
			padding: 30px 0 0 20px;
		}
		.classrank {
			.storeRank {
				display: block;
				margin: 10px;
				font-size: 18px;
				font-weight: 600;
			}
		}
		.uni-grid-item {
			height: 100px !important;
			}
		.bar {
			height: 12px;
			background-color: #f7f8fa;
		}
		.saleBox-title {
			padding: 10px 10px 10px 20px; 
			color: $uni-text-color-v;
		}
		.saleBox {
			margin: 10px;
			border-radius: 5px;
			border: 1px solid rgb(241,245,255);
			background-color: rgb(248,250,255);
			text {
				display: block;
			}
			.saleBox-head {
				padding: 10px 15px;
				.moeny {
					color: $uni-text-color-v;
				}
				.num {
					margin-top: 5px;
					color: $uni-color-primary;
					font-weight: 500;
					font-size: 20px;
				}
			}
		}
	}
</style>
