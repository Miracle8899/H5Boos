<template>
	<view class="my-timerange-box" >
		<view class="my-timerange" @click="showPicker">
			<text >{{createTimeSt}}</text>
			<text>至</text>
			<text >{{createTimeEd}}</text>
		</view>
		<!-- <w-picker :visible.sync="visible" mode="date" @confirm="onConfirm($event,'date')"   @cancel="onCancel" :current="true" :disabled-after="true"></w-picker> -->
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
		name: 'myTimerange',
		data () {
			return {
				visible: false,
				createTimeSt: '',
				createTimeEd: '',
			}
		},
		created() {
			let res = new Date()
			console.log(res)
		},
		methods:  {
			onCancel () {},
			onConfirm (val) {
				this.createTimeSt = val.value[0]
				this.createTimeEd = val.value[1]
				this.$emit('changeTime', this.createTimeSt , this.createTimeEd )
			},
			showPicker () {
				this.visible = true
			}
		}
	}
</script>

<style lang="scss">
	.my-timerange {
		border-top: 1px solid #EEEEEE;
		border-bottom: 1px solid #EEEEEE;
		padding: 10px 30px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
</style>
