<template >
	<view class="catList">
		<uni-popup type="bottom" ref="popup">
			<button type="default" @click="choseEd(1)">按销售额</button>
			<button type="default" @click="choseEd(2)">按毛利额</button>
			<button type="default" @click="choseEd(3)">取消</button>
		</uni-popup>
		<view class="search">
			<uni-search-bar @confirm="confirm"  placeholder="搜品牌名查询"/>
		</view>
		
		<view class="bar"></view>
		<view class="hotContent">
			<view class="hotContent-switch">
				<uni-segmented-control class="hotContent-switch-left" @clickItem="changeclickItem" style-type="text" :current="current" :values="items" ></uni-segmented-control>
			</view>
			<my-timerange v-if="type === '6'" @changeTime="changTimeIt" ref="timer"></my-timerange>
			<no-data title="暂无数据" v-if="list.length < 1 && !loading"></no-data>
			<my-goodscell :list="list" v-if="list.length > 0" :title="title"></my-goodscell>
			<uni-load-more :status="status" ></uni-load-more>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status: 'loading',
				loading: false,
				total: 0,
				list: [
				],
				page: 1,
				title: ['门店', '品牌名称', '销售额(元)'],
				productNnature: '1', // 商品类型
				sortName: '', // 排序方式
				active: 1, 
				type: '1', // 时间段
				productBrand: '', // 商品名
				current: 0,
				createTimeSt: '',
				createTimeEd: '',
				items: [
					'今日',
					'昨日',
					'上周',
					'本月',
					'上月',
					'自定义',
				],
			}
		},
		async onLoad() {
			this.productNnature = '1'
			this.getGoods(1)
		},
		async onReachBottom() {
				if ((this.list.length < this.total) && !this.loading) {
					await this.getGoods()
				}
			
		    },
		methods: {
			goodsDetali (item) {
				uni.navigateTo({
					url: `../goods/index?id=${item.id}`
				})
			},
			async getGoods (val) {
				
				if (val ===1) {
					this.list = []
					this.page = 1
				}else{
					this.page +=1
				}
				let res 
				try {
					this.loading = true
					this.status = 'loading'
					let store = null 
					store = uni.getStorageSync('store')
					 res = await this.$api.getBrandRanking({
						current: this.page,
						model: {
							storeCode: store,
							label: this.label,
							createTimeSt: this.createTimeSt,
							createTimeEd: this.createTimeEd,
							type: this.type,
							productBrand: this.productBrand,
							displaySize: 8,
						
						}
					})
					this.list = this.list.concat(res.data.records)
					for (let i of this.list) {
						i.label = i.storeCode
						i.totalNumber = i.productBrand
					}
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
			changTimeIt (st, et) {
					
					this.createTimeSt = st
					this.createTimeEd = et
					this.getGoods(1)
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
				this.getGoods(1)
			},
			choseEd (val) {
				
				if (val ===1) {
				this.title[2] = '销售额(元)'
				this.sortName = ''	
				}else{
				this.title[2] = '毛利额(元)'
				this.sortName = 'profitMoney'	
				}
				this.getGoods(1)
				this.$refs.popup.close()
			},
			popupShow () {
				this.$refs.popup.open()
			},
			async changeBox(val) {
				this.active = val
				if (this.active === 1) {
					this.productNnature = '1'
					await this.getGoods(1)
				}else{
					this.productNnature = ''
					await this.getGoods(1)
				}
			},
			confirm(val) {
				this.productBrand = val.value
				this.getGoods(1)
			},
		}
	}
</script>

<style lang="scss">
	.catList {
		.bar {
			height: 12px;
			background-color: #f7f8fa;
		}
		.hotContent {
			&-switch {
				padding: 7px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				&-left {
					flex: 1;
				}
				&-right {
					text-align: right;
					width: 30%;
					flex: none;
				}
			}
		}
		.checkBox {
			padding: 10px;
			display: flex;
			flex-direction: row;
			align-items: center;
			.checkBox-left:first-child {
				margin-right: 10px;
			}
			.isActive {
				background: linear-gradient(to right,#569cf2,#4878f6)!important;
				text {
					color: #FFFFFF !important;
						}
			}
			&-left {
				padding: 12px 0;
				text {
					display: block;
					font-size: 13px;
				}
				flex: 1;
				color: $uni-text-color-v;
				border-radius: 5px;
				background-color: rgb(244, 247, 254);
				border: 1px solid rgb(234, 240,253);
				text-align: center;
				image {
					width: 30px;
					height: 30px;
				}
			}
		}
	}
</style>
