<template>
	<div class="recommends">
		<div v-for="(item, index) in recommends" :key="index" class="reItem">
			<a href="item.link">
				<img :src="item.image" alt="">
				<div>{{item.title}}</div>
			</a>
		</div>
	</div>
</template>

<script>
	export default {
		name: "HomeRecommendView",
		components: {
		
		},
		props: {
			recommends: {
				type: Array,
				default() {
					return []
				}
			}
		}
	}
</script>

<style scoped>
	.recommends {
		display: flex;
		width: 100%;
		text-align: center;
		padding: 10px 0 20px;
		border-bottom: 8px solid #eee
	}

	.reItem {
		flex: 1;
	}

	.reItem img {
		width: 80px;
		height: 80px;
		margin-bottom: 10px;
	}
</style>