<template>
	<div class="cart-list">
		<scroll class="content" ref='scroll'>
			<cart-list-item	v-for='(item, index) in cartList'
											:itemInfo = 'item'
											:key = 'index'/>
		</scroll>
	</div>
</template>

<script>
	import Scroll from 'components/common/scroll/scroll'
	import CartListItem from './CartListItem'

	import { mapGetters } from 'vuex'

	export default {
		name: "CartList.vue",
		components: {
			Scroll,
			CartListItem,
		},
		computed: {
			...mapGetters(['cartList'])
		},

	}
</script>

<style scoped>
	.cart-list {
		height: 100vh;
	}

	.content {
		height: calc(100% - 44px - 49px - 40px);
		overflow: hidden;
	}
</style>