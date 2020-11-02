<template>
	<view class="orderDetail">
		<uni-card :title="form.store"   thumbnail="../../static/images/face.png">
			<view class="orderDetail-cell">
				<text>订单号: {{form.documentNumber || ''}} </text>
				<text>商品数量: {{form.productCnt || ''}}</text>
				<text>订单类型 : {{form.type}}</text>
				<text>客户 : {{form.customerName || ''}}</text>
				<text>金额 : {{form.paymentMoney || ''}}</text>
				<text>制单时间 : {{form.createTime || ''}}</text>
			</view>
		</uni-card>
		<uni-card  v-for="(item, idx) in goodsList" :key="idx">
			<view class="orderDetail-goods" >
				<text>商品名: {{item.productName || ''}} </text>
				<text>数量: {{item.quantity || ''}}</text>
			</view>
			<view class="orderDetail-goods" >
				<text>单位 : {{item.productUnit}}</text>
				<text>装数 : {{item.numberOfPieces || ''}}</text>
			</view>
			<view class="orderDetail-goods" >
				<text>价格 : {{item.price || ''}}</text>
				<text>金额 : {{item.totalAmount || ''}}</text>
			</view>
		</uni-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {},
				goodsList: []
			}
		},
		 onLoad(item) {
			 let res  = JSON.parse(item.item)
			 this.form = res
			this.getInfo(res)
		},
		methods: {
			async getInfo (item) {
				let res =await this.$api.searchProductByOrderId({
					orderId: item.documentNumber
				})
				this.goodsList = res
			}
		}
	}
</script>

<style lang="scss" >
	.orderDetail {
		.orderDetail-goods {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 10px;
			text {
				flex: 1;
				display: block;
				margin: 2px;
			}
		}
		.orderDetail-cell {
			margin-bottom: 10px;
			text {
				display: block;
				margin: 5px;
			}
		}
	}
</style>
