<template>
	<div class="bottom-bar">
		<div class="check-all">
			<check-button :is-checked='isSelectAll' @click.native='checkClick'/>
			<span>全选</span>
		</div>

		<div class="totalPrice">合计: {{totalPrice}}</div>

		<div class="calculate" @click='calcClick'>去结算（{{checkLength}}）</div>

	</div>
</template>

<script>
	import CheckButton from 'components/content/checkButton/CheckButton'

	import {mapGetters} from 'vuex'

	export default {
		name: "CartBottomBar.vue",
		components: {
			CheckButton,
		},
		computed: {
			...mapGetters(['cartList']),
			totalPrice() {
				return '￥' + this.cartList.filter(item => {
					return item.checked
				}).reduce((preValue, item) => {
					return preValue + item.price.substr(1) * item.count
				}, 0).toFixed(2)
			},
			checkLength() {
				return this.cartList.filter(item => item.checked).length
			},
			isSelectAll() {
				if (this.cartList.length == 0) return false
				for (let item of this.cartList) {
					if (!item.checked) return false
				}
				return true
			}
		},
		methods: {
			checkClick() {
				if (this.isSelectAll) {
					this.cartList.forEach(item => item.checked = false)
				} else {
					this.cartList.forEach(item => item.checked = true)
				}
			},
			calcClick() {
				if (!this.isSelectAll) {
					this.$toast.show('请选择要购买的商品！')
				}
			}
		}
	}
</script>

<style scoped>
	.bottom-bar {
		position: fixed;
		display: flex;
		align-items: center;
		height: 40px;
		width: 100%;
		background-color: #eee;
		bottom: 49px;
	}

	.check-all {
		padding-left: 5px;
		display: flex;
		align-items: center;
		height: 40px;
		width: 80px;
	}

	.totalPrice {
		margin-left: 10px;
		flex: 1;
	}

	.calculate {
		width: 100px;
		height: 40px;
		line-height: 40px;
		color: #fff;
		text-align: center;
		background-color: var(--color-tint);
	}
</style>