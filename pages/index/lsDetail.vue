<template>
	<view class="orderDetail">
		<uni-card :title="form.store"   thumbnail="../../static/images/face.png">
			<view class="orderDetail-cell">
				<text>订单号: {{form.orderSn || ''}} </text>
				<text>商品数量: {{form.productCnt || ''}}</text>
				<text>订单类型 : {{typeShow(form.type)}}</text>
				<text>收银员 : {{form.salesMan || ''}}</text>
				<text>金额 : {{form.paymentMoney || ''}}</text>
				<text>制单时间 : {{form.createTime || ''}}</text>
			</view>
		</uni-card>
		<uni-card  v-for="(item, idx) in goodsList" :key="idx">
			<view class="orderDetail-goods" >
				<text>商品名: {{item.productName || ''}} </text>
				<text>数量: {{item.productCnt || ''}}</text>
			</view>
			<view class="orderDetail-goods" >
				<text>折扣金额 : {{item.discountAmount}}</text>
				<text>商品状态 : {{typeChange(item.saleType)}}</text>
			</view>
			<view class="orderDetail-goods" >
				<text>价格 : {{item.productPrice || ''}}</text>
				<text>金额 : {{(Number(item.productPrice) *Number(item.productCnt)).toFixed(2)}}</text>
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
			typeChange (item) {
				let res = '正常'
				if (item == 'retail') {
					res = '正常'
				}
				if (item == 'presented') {
					res = '赠送'
				}
				if (item == 'item_discount') {
					res = '单品打折'
				}
				if (item == 'all_discount') {
					res = '整单折扣'
				}
				if (item == 'alter_price') {
					res = '改价'
				}
				if (item == 'special_offer') {
					res = '特价促销'
				}
				if (item == 'buy_send') {
					res = '买X送X'
				}
				if (item == 'full_presented') {
					res = '满赠'
				}
				if (item == 'sales_return') {
					res = '退货'
				}
				return res
			},
			typeShow (item) {
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
			async getInfo (item) {
				let res =await this.$api.searchProductByOrderIdorderDetail({
					orderId: item.id
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
