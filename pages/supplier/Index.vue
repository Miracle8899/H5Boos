<template>
	<view class="supplier">
		<view class="supplier-search">
			<uni-search-bar @confirm="confirm"  placeholder="搜索供应商名称/联系人/手机号."/>
		</view>
		
		<view class="supplier-box" v-for="(item, index) in list" :key="index" >
			<uni-card :title="item.supplierName"   thumbnail="../../static/images/face.png">
				<view class="supplier-box-cell">
					<text>联系人: {{item.linkMan || ''}} </text>
					<text>手机号: {{item.phoneNumber || ''}}</text>
					<text>地 址 : {{item.address || ''}}</text>
				</view>
			</uni-card>
		</view>
		<no-data title="暂无数据" v-if="list.length < 1 && !loading"></no-data>
		<uni-load-more :status="status" ></uni-load-more>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				page: 1,
				list: [],
				total: 0,
				status: 'loading',
				loading: false,
				supplierName: ''
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
			async getPage (val) {
				if (val ===1) {
					this.list = []
					this.page = 1
				}else{
					this.page +=1
				}
				try {
					let store = null
					this.loading = true
					this.status = 'loading'
					store = uni.getStorageSync('store')
					let res =  await this.$api.searchByParametersupplierInfo({
						current: this.page,
						model: {
							storeCode: store,
							displaySize: 5,
							supplierName: this.supplierName
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
				this.supplierName = val.value
				this.getPage(1)
			}
		},
		
	}
</script>

<style lang="scss">
	.supplier {
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
