<template>
	<view class="supplier">
		<view class="supplier-search">
			<uni-search-bar @confirm="confirm"  placeholder="搜索单号查询."/>
		</view>
		<pop ref="pop" direction="below" :is_close="false"   :is_mask="true" :width="100">
			<button type="default" @click="choseEd('')">全部</button>
			<button type="default" @click="choseEd('销售出库')">销售出库</button>
			<button type="default" @click="choseEd('销售赠送')">销售赠送</button>
			<button type="default" @click="choseEd('销售退货')">销售退货</button>
			<button type="default" @click="choseEd('100')">取消</button>
		</pop>
		<view class="changebox">
			<uni-segmented-control class="changebox-switch-left" @clickItem="changeclickItem" style-type="text" :current="current" :values="items" ></uni-segmented-control>
			<view class="changebox-switch-right">
				<text @click="popupShow">类型</text>
				<uni-icons type="arrowdown" @click="popupShow"></uni-icons>
			</view>
		</view>
		<my-timerange v-if="type === '6'" @changeTime="changTimeIt" ref="timer"></my-timerange>
		<view class="supplier-box" v-for="(item, index) in list" :key="index" @click="goDetail(item)" >
			<uni-card :title="item.store"   thumbnail="../../static/images/face.png">
				<view class="supplier-box-cell">
					<text>订单号: {{item.documentNumber || ''}} </text>
					<text>商品数量: {{item.productCnt || ''}}</text>
					<text>订单类型 : {{item.type}}</text>
					<text>客户 : {{item.customerName || ''}}</text>
					<text>金额 : {{item.paymentMoney || ''}}</text>
					<text>制单时间 : {{item.createTime || ''}}</text>
				</view>
			</uni-card>
		</view>
		<no-data title="暂无数据" v-if="list.length < 1 && !loading"></no-data>
		<uni-load-more :status="status" ></uni-load-more>
		
		
	</view>
</template>

<script>
	import pop from '../../components/ming-pop/ming-pop.vue'
	export default {
		components: {pop},
		data () {
			return {
				types: [
					'全部',
					'正常',
					'单品退货',
					'整单退货',
					'退货订单',
					'作废',
					'错误订单',
				
				],
				items: [
					'今日',
					'昨日',
					'上周',
					'本月',
					'上月',
					'自定义',
				],
				page: 1,
				type: '1',
				createTimeSt: '',
				createTimeEd: '',
				current: 0,
				list: [],
				total: 0,
				status: 'loading',
				loading: false,
				documentNumber: '',
				statust: ''
		
			}
		},
		async onLoad () {
			this.getPage(1)
		},
		async onReachBottom() {
				
				if ((this.list.length < this.total) && !this.loading) {
					
					await this.getPage()
				}
		    },
		methods: {
			goDetail (item) {
				item = JSON.stringify(item)
				uni.navigateTo({
				url: `./pfDetail?item=${item}`
				})
				},
			choseEd (val) {
				if (val == 100) {
					this.$refs.pop.close();
					return
				}
				this.statust = val
				this.$refs.pop.close();
				this.getPage(1)
			},
			typeChange (item) {
				let res = '正常'
				if (item == 1) {
					res = '正常'
				}
				if (item == 2) {
					res = '单品退货'
				}
				if (item == 3) {
					res = '整单退货'
				}
				if (item == 4) {
					res = '退货订单'
				}
				if (item == 5) {
					res = '作废'
				}
				if (item == 6) {
					res = '错误订单'
				}
				return res
			},
			changTimeIt (st, et) {
					
					this.createTimeSt = st
					this.createTimeEd = et
					this.getPage(1)
			},
			changeclickItem(val) {
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
				// if (val.currentIndex === 6)  {
				// 	// this.type = '1'
				// 	this.$refs.pop.show();
				// 	return
				// }
				this.getPage(1)
			},
			popupShow () {
				this.$refs.pop.show();
				return
			},
			async getPage (val) {
				if (val ===1) {
					this.list = []
					this.page = 1
				}else{
					this.page +=1
				}
				try {
					this.loading = true
					this.status = 'loading'
					let store = null
					store = uni.getStorageSync('store')
					let res =  await this.$api.getWholesaleInquiry({
						current: this.page,
						model: {
							storeCode: store,
							displaySize: 5,
							type: this.type,
							documentNumber: this.documentNumber,
							status: this.statust,
							createTimeSt: this.createTimeSt,
							createTimeEd: this.createTimeEd,
						}
					})
					
					this.list = this.list.concat(res.data.records)
					this.total = res.data.total
					if(this.list.length >= this.total) {
						this.status = 'noMore'
					}else{
						this.status = 'more'
					}
					this.loading = false
				}catch(e) {
					this.loading = false
				}
				
			},
			confirm(val) {
				this.documentNumber = val.value
				this.getPage(1)
			}
		},
		
	}
</script>

<style lang="scss">
	.supplier {
		.changebox-switch-left {
			flex: 1;
		}
		.changebox-switch-right {
			text-align: right;
			width: 60px;
			flex: none;
		}
		.changebox {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		background-color: $uni-bg-color-v;
		min-height: 100vh;
		.uni-card__header-title-text {
			font-weight: 500;
		}
		.uni-card {
			background-color: rgb(255,255,255)
		}
		.supplier-search {
			padding: 10px;
		}
		.supplier-box {
			margin-bottom: 10px;
			.supplier-box-cell {
				text {
					margin: 5px 0;
					display: block;
				}
			}
		}
	}
</style>
