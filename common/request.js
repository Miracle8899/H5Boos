


// let token = 'Bearer ' + uni.getStorageSync('token');
let tenant =  uni.getStorageSync('tenant');
 const baseUrl = 'http://192.168.254.114:10000'
// const baseUrl = 'https://39.99.221.134:10000'
 // const baseUrl = 'https://ls.5ygw.com'
// const baseUrl = 'https://47.112.234.50:80'

// uni.getStorage({
//     key: 'token',
//     success: function (res) {
//         console.log(res.data);
// 		token = 'Bearer ' + res.data
//     }
// });

export default{
	// ***
	// 登录接口
	async codeToosession(query) {
		let res = await uni.request({
			url: `${baseUrl}/api/oauth/anno/weChatLogin`,
			method: 'GET',
			data: query,
			header: {
			
			}
		})
		return res[1].data
	},
	// ***
	// 手机号码登陆
	async weChatlogin(query) {
		let token = 'Bearer ' + uni.getStorageSync('token');
		let res = await uni.request({
			url: `${baseUrl}/api/oauth/anno/weChat/login`,
			method: 'POST',
			data: query,
			header: {
				token : token,
				tenant: tenant
			}
		})
		return res[1].data
	},
	// ***
	// 获取门店
	async selectAllOrg(query) {
	let token = 'Bearer ' + uni.getStorageSync('token');
		let res = await uni.request({
			url: `${baseUrl}/api/authority/org/selectAllOrg `,
			method: 'GET',
			data: query,
			header: {
				token : token,
				tenant: tenant
			}
		})
		return res[1].data
	},// ***
	// 业绩统计
	async getPerformanceStatistics(query) {
		let token = 'Bearer ' + uni.getStorageSync('token');
		let res = await uni.request({
			url: `${baseUrl}/api/orders/orderDetail/getPerformanceStatistics`,
			method: 'GET',
			data: query,
			header: {
				token : token,
				tenant: tenant
			}
		})
		return res[1].data
	},
	// ***
	// 门店销售排行
	async getYesterdayStoreRankings(query) {
		let token = 'Bearer ' + uni.getStorageSync('token');
		let res = await uni.request({
			url: `${baseUrl}/api/orders/orderDetail/getYesterdayStoreRankings`,
			method: 'POST',
			data: query,
			header: {
				token : token,
				tenant: tenant
			}
		})
		return res[1].data
	},
	// ***
	// 全都热卖 商品排行
	async getHotSale(query) {
		let token = 'Bearer ' + uni.getStorageSync('token');
		let res = await uni.request({
			url: `${baseUrl}/api/orders/orderDetail/getHotSale`,
			method: 'POST',
			data: query,
			header: {
				token : token,
				tenant: tenant
			}
		})
		return res[1].data
	},
	// ***
	// 商品详情
	async searchByIdproductArchive(query) {
		let token = 'Bearer ' + uni.getStorageSync('token');
		let res = await uni.request({
			url: `${baseUrl}/api/cashier/productArchive/findById`,
			method: 'POST',
			data: query,
			header: {
				token : token,
				tenant: tenant
			}
		})
		return res[1].data
	},
	// ***
	// 商品详情近两周销售情况曲线图
	async getSalesTrend(query) {
		let token = 'Bearer ' + uni.getStorageSync('token');
		let res = await uni.request({
			url: `${baseUrl}/api/wholesale/salesProduct/getSalesTrend`,
			method: 'POST',
			data: query,
			header: {
				token : token,
				tenant: tenant
			}
		})
		return res[1].data
	},
	// ***
	// 门店及进入数据
	async storeMonitoring(query) {
		let token = 'Bearer ' + uni.getStorageSync('token');
		let res = await uni.request({
			url: `${baseUrl}/api/wholesale/inventoryInfo/storeMonitoring`,
			method: 'POST',
			data: query,
			header: {
				token : token,
				tenant: tenant
			}
		})
		return res[1].data
	},
	// ***
	// 供应商查询分页
	async searchByParametersupplierInfo(query) {
		let token = 'Bearer ' + uni.getStorageSync('token');
		let res = await uni.request({
			url: `${baseUrl}/api/cashier/supplierInfo/searchByParameter`,
			method: 'POST',
			data: query,
			header: {
				token : token,
				tenant: tenant
			}
		})
		return res[1].data
	},
	// ***
	// 收银员查询
	async cashierReconciliation(query) {
		let token = 'Bearer ' + uni.getStorageSync('token');
		let res = await uni.request({
			url: `${baseUrl}/api/orders/orderDetail/cashierReconciliation`,
			method: 'POST',
			data: query,
			header: {
				token : token,
				tenant: tenant
			}
		})
		return res[1].data
	},
	// ***
	// 销售统计
	async getSalesStatisticsorderDetail(query) {
		let token = 'Bearer ' + uni.getStorageSync('token');
		let res = await uni.request({
			url: `${baseUrl}/api/orders/orderDetail/getSalesStatistics`,
			method: 'POST',
			data: query,
			header: {
				token : token,
				tenant: tenant
			}
		})
		return res[1].data
	},
	// ***
	// 销售统计商品排行
	async getCommoditySalesStatistics(query) {
		let token = 'Bearer ' + uni.getStorageSync('token');
		let res = await uni.request({
			url: `${baseUrl}/api/orders/orderDetail/getCommoditySalesStatistics`,
			method: 'POST',
			data: query,
			header: {
				token : token,
				tenant: tenant
			}
		})
		return res[1].data
	},
	// ***
	// 个人信息
	async getCurrentUserMessage(query) {
		let token = 'Bearer ' + uni.getStorageSync('token');
		let res = await uni.request({
			url: `${baseUrl}/api/authority/user/getCurrentUserMessage`,
			method: 'POST',
			data: query,
			header: {
				token : token,
				tenant: tenant
			}
		})
		return res[1].data
	},
	// ***
	// 会员分析/ 消费统计
	async getMemberStatisticsmemberInfo(query) {
		let token = 'Bearer ' + uni.getStorageSync('token');
		let res = await uni.request({
			url: `${baseUrl}/api/vipuser/memberInfo/getMemberStatistics`,
			method: 'POST',
			data: query,
			header: {
				token : token,
				tenant: tenant
			}
		})
		return res[1].data
	},
	// ***
	// 会员分析/分析
	async getMemberAnalysis(query) {
		let token = 'Bearer ' + uni.getStorageSync('token');
		let res = await uni.request({
			url: `${baseUrl}/api/vipuser/memberInfo/getMemberAnalysis`,
			method: 'POST',
			data: query,
			header: {
				token : token,
				tenant: tenant
			}
		})
		return res[1].data
	},
	// ***
	// 类别排行
	async getCategoryRanking(query) {
		let token = 'Bearer ' + uni.getStorageSync('token');
		let res = await uni.request({
			url: `${baseUrl}/api/orders/orderMaster/getCategoryRanking`,
			method: 'POST',
			data: query,
			header: {
				token : token,
				tenant: tenant
			}
		})
		return res[1].data
	},
	// ***
	// 商品品牌排行
	async getBrandRanking(query) {
		let token = 'Bearer ' + uni.getStorageSync('token');
		let res = await uni.request({
			url: `${baseUrl}/api/orders/orderMaster/getBrandRanking`,
			method: 'POST',
			data: query,
			header: {
				token : token,
				tenant: tenant
			}
		})
		return res[1].data
	},
	// ***
	// 商品库存
	async getCommodityInventory(query) {
		let token = 'Bearer ' + uni.getStorageSync('token');
		let res = await uni.request({
			url: `${baseUrl}/api/wholesale/inventoryInfo/getCommodityInventory`,
			method: 'POST',
			data: query,
			header: {
				token : token,
				tenant: tenant
			}
		})
		return res[1].data
	},
	// ***
	// 促销商品排行
	async getPromotionorderDetail(query) {
		let token = 'Bearer ' + uni.getStorageSync('token');
		let res = await uni.request({
			url: `${baseUrl}/api/orders/orderDetail/getPromotion`,
			method: 'POST',
			data: query,
			header: {
				token : token,
				tenant: tenant
			}
		})
		return res[1].data
	},
	// ***
	// 联营商品排行
	async getJointVentureGoods(query) {
		let token = 'Bearer ' + uni.getStorageSync('token');
		let res = await uni.request({
			url: `${baseUrl}/api/orders/orderDetail/getJointVentureGoods`,
			method: 'POST',
			data: query,
			header: {
				token : token,
				tenant: tenant
			}
		})
		return res[1].data
	},
	// ***
	// 零食统计查询
	async getRetailInquiry(query) {
		let token = 'Bearer ' + uni.getStorageSync('token');
		let res = await uni.request({
			url: `${baseUrl}/api/orders/orderMaster/getRetailInquiry`,
			method: 'POST',
			data: query,
			header: {
				token : token,
				tenant: tenant
			}
		})
		return res[1].data
	},
	// ***
	// 批发统计查询
	async getWholesaleInquiry(query) {
		let token = 'Bearer ' + uni.getStorageSync('token');
		let res = await uni.request({
			url: `${baseUrl}/api/wholesale/salesProduct/getWholesaleInquiry`,
			method: 'POST',
			data: query,
			header: {
				token : token,
				tenant: tenant
			}
		})
		return res[1].data
	},
	// ***
	// 批发详情查询
	async searchProductByOrderId(query) {
		let token = 'Bearer ' + uni.getStorageSync('token');
		let res = await uni.request({
			url: `${baseUrl}/api/wholesale/salesProduct/searchProductByOrderId`,
			method: 'POST',
			data: query,
			header: {
				token : token,
				tenant: tenant
			}
		})
		return res[1].data
	},
	// ***
	// 零售详情查询
	async searchProductByOrderIdorderDetail(query) {
		let token = 'Bearer ' + uni.getStorageSync('token');
		let res = await uni.request({
			url: `${baseUrl}/api/orders/orderDetail/searchProductByOrderId`,
			method: 'POST',
			data: query,
			header: {
				token : token,
				tenant: tenant
			}
		})
		return res[1].data
	},
	// ***
	// 新登录
	async weChatLogintoken(query) {
		let token = 'Bearer ' + uni.getStorageSync('token');
		let res = await uni.request({
			url: `${baseUrl}/api/oauth/anno/weChatLogin/token`,
			method: 'POST',
			data: query,
			header: {
				token : token,
				// tenant: tenant
			},
			
		})
	
		return res[1].data
	},
	// ***
	// 退出
	async unbundling(query) {
		let token = 'Bearer ' + uni.getStorageSync('token');
		let res = await uni.request({
			url: `${baseUrl}/api/oauth/user/unbundling`,
			method: 'POST',
			data: query,
			header: {
				token : token,
				tenant: tenant
			},
			
		})
	
		return res[1].data
	},
}