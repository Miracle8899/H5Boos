<template>
	<view class="bank">
		<view class="bank-header">
			<uni-segmented-control class="hotContent-switch-left" @clickItem="changeIt" style-type="text" :current="current" :values="items" ></uni-segmented-control>
		</view>
		<view class="bank-picker" v-if="type ==='6'">
			<text class="left" @click="showPicker">{{createTimeSt}}</text>
			<text class="mid">至</text>
			<text class="right" @click="showPicker">{{createTimeEd}}</text>
		</view>
		<view class="bar"></view>
		<no-data title="暂无数据" v-if="list.length < 1 && !loading"></no-data>
		<uni-list>
		    <uni-list-item :title="item.salesMan" :note="item.store" v-for="(item, index) in list" :key="index" thumb="../../static/images/face.png"
		     thumb-size="medium" :rightText="item.localAmount" :link="false" :showArrow="false"></uni-list-item>
		    
		</uni-list>
		<uni-load-more :status="status" ></uni-load-more>
		<w-picker
			:visible.sync="visible"
			mode="range" 
			startYear="2017" 
			
			:value="rangeVal"
			:current="false"
			@confirm="onConfirm($event,'range')"
			@cancel="onCancel"
			ref="range" 
		></w-picker>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				visible: false,
				startDate : '',
				endDate : '',
				list: [],
				page: 1,
				total: 0,
				status: 'loading',
				loading: false,
				createTimeSt: '',
				createTimeEd: '',
				type: '1',
				items: [
					'今日',
					'昨日',
					'上周',
					'本月',
					'上月',
					'自定义',
				]
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
					this.loading = true
					this.status = 'loading'
					let store = null
					store = uni.getStorageSync('store')
					let res =  await this.$api.cashierReconciliation({
						current: this.page,
						model: {
							type: this.type,
							storeCode: store,
							displaySize: 8,
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
					this.visible = true
					return
				}
				this.getPage(1)
			},
			onCancel () {},
			onConfirm (val) {
				
				this.createTimeSt = val.value[0]
				this.createTimeEd = val.value[1]
				this.getPage(1)
			},
			showPicker () {
				this.visible = true
			},
		}
	}
</script>

<style lang="scss">
	.bank {
		&-picker {
			padding: 15px 30px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-top: 1px solid #EEEEEE;
		}
		.bar {
			height: 12px;
			background-color: #f7f8fa;
		}
	}
</style>
