<template >
	<view class="hotList">
		<uni-popup type="bottom" ref="popup">
			<button type="default" @click="choseEd(1)">按销售额</button>
			<button type="default" @click="choseEd(2)">按毛利额</button>
			<button type="default" @click="choseEd(3)">取消</button>
		</uni-popup>
		<pop ref="pop" direction="below" :is_close="false"   :is_mask="true" :width="100">
			<button type="default" @click="choseEd(1)">按销售额</button>
			<button type="default" @click="choseEd(2)">按毛利额</button>
			<button type="default" @click="choseEd(3)">取消</button>
		</pop>
		<view class="search">
			<uni-search-bar @confirm="confirm"  placeholder="搜索商品名称/条码."/>
		</view>
		<view class="checkBox">
			<view class="checkBox-left" :class="active ===1? 'isActive': ''" @click="changeBox(1)">
				<image src="../../static/images/goods.png" v-if="active === 1" ></image>
				<image src="../../static/images/goodsActive.png" v-if="active === 2" ></image>
				<text class="chekbox-left-word">条码商品</text>
			</view>
			<view class="checkBox-left" :class="active ===2? 'isActive': ''" @click="changeBox(2)">
				<image src="../../static/images/fyActive.png" v-if="active === 1"></image>
				<image src="../../static/images/fy.png" v-if="active === 2"></image>
				<text class="checkBox-left-word">
					全部商品
				</text>
			</view>
		</view>
		<view class="bar"></view>
		<view class="hotContent">
			<view class="hotContent-switch">
				<uni-segmented-control class="hotContent-switch-left" @clickItem="changeclickItem" style-type="text" :current="current" :values="items" ></uni-segmented-control>
				<view class="hotContent-switch-right">
					<text @click="popupShow">{{!sortName?'按销售额':'按毛利'}}</text>
					<uni-icons type="arrowdown" @click="popupShow"></uni-icons>
				</view>
			</view>
			<no-data title="暂无数据" v-if="list.length < 1 && !loading"></no-data>
			<my-goodscell :list="list" v-if="list.length > 0" :title="title" @onclick="goodsDetali"></my-goodscell>
			<uni-load-more :status="status" ></uni-load-more>
		</view>
	</view>
</template>

<script>
	import pop from '../../components/ming-pop/ming-pop.vue'
	export default {
		components: {pop},
		data() {
			return {
				status: 'loading',
				loading: false,
				total: 0,
				list: [
				],
				page: 1,
				title: ['商品名称', '销量', '销售额(元)'],
				productNnature: '1', // 商品类型
				sortName: '', // 排序方式
				active: 1, 
				type: '', // 时间段
				productName: '', // 商品名
				current: 0,
				items: [
					'今日',
					'昨日',
					'近14天',
					'上月',
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
					 res = await this.$api.getHotSale({
						current: this.page,
						model: {
							storeCode: store,
							productName: this.productName,
							displaySize: 8,
							type: this.type,
							sortName: this.sortName,
							productNnature: this.productNnature
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
			changeclickItem(val) {
				if (val.currentIndex === 0)  {
					this.type = ''
				}
				if (val.currentIndex === 1)  {
					this.type = '1'
				}
				if (val.currentIndex === 2)  {
					this.type = '2'
				}
				if (val.currentIndex === 3)  {
					this.type = '3'
				}
				this.getGoods(1)
			},
			choseEd (val) {
				if (val ===3) {
					this.$refs.pop.close();
					return
				}
				if (val ===1) {
				this.title[2] = '销售额(元)'
				this.sortName = ''	
				}else{
				this.title[2] = '毛利额(元)'
				this.sortName = 'profitMoney'	
				}
				this.getGoods(1)
				// this.$refs.popup.close()
				this.$refs.pop.close();
			},
			popupShow () {
				this.$refs.pop.show();
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
				this.productName = val.value
				this.getGoods(1)
			},
		}
	}
</script>

<style lang="scss">
	.hotList {
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
