<template>
	<div class="goods">
		<goods-list-item v-for="(item, index) in goods"
		:key="index" :goods-item="item" class="goods-list-item" />
	</div>
</template>

<script>
	import GoodsListItem from './GoodsListItem.vue'
	export default {
		name: "GoodsList",
		components: {
			GoodsListItem
		},
		props: {
			goods: {
				type: Array,
				defalut() {
					return []
				}
			}
		}
	}
</script>

<style scoped>
	.goods {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	.goods-list-item {
	}
</style>