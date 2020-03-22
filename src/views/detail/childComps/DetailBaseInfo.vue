<template>
	<div v-if='Object.keys(goods).length !== 0' class="base-info">
		<div class="info-title">{{goods.title}}</div>
		<div class="info-price">
			<span class="n-price">{{goods.newPrice}}</span>
			<span class="o-price">{{goods.oldPrice}}</span>
			<span v-if='goods.discount' class="discount">
				{{goods.discount}}
			</span>
		</div>
		<div class="info-other">
			<span>{{goods.columns[0]}}</span>
			<span>{{goods.columns[1]}}</span>
			<span>
				{{goods.services[goods.services.length-1].name}}
			</span>
		</div>
		<div class="info-service">
			<span	class="info-service-item"
						v-for='index in goods.services.length'
						:key='index'>
				<img :src="goods.services[index-1].icon" alt="">
				<span>{{goods.services[index-1].name}}</span>
			</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: "DetailBaseInfo.vue",
		props: {
			goods: {
				type: Object
			}
		}
	}
</script>

<style scoped>
	.base-info {
		margin-top: 15px;
		padding: 0 8px;
		color: #999;
		border-bottom: 5px solid #f2f5f8;
	}

	.info-title {
		color: #222;
	}

	.info-price {
		margin-top: 10px;
	}

	.info-price .n-price {
		font-size: 24px;
		color: var(--color-high-text);
	}

	.info-price .o-price {
		font-size: 13px;
		margin-left: 5px;
		text-decoration: line-through;
	}

	.discount {
		background-color: var(--color-high-text);
		color: white;
		border-radius: 15px;
		padding: 5px;		
		margin: 0 15px;
	}

	.info-other {
		display: flex;
		justify-content: space-between;
		margin-top: 20px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		padding-bottom: 10px;
	}

	.info-service {
		color: #333333;
		font-size: 9px;
		margin: 15px 0;
		font-weight: 500;
		width: 100%;
		display: flex;
		justify-content: space-between;
		flex: 1;
		/*overflow: hidden;*/
	}

	.info-service-item {
		/*white-space: nowrap;*/
	}

	.info-service img{
		width: 10px;
		height: 10px;
	}

	.info-service-item span {
		margin-left: 2px;
	}

</style>