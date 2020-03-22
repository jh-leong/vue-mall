<template>
	<div class="check-button" :class='{check: isChecked}'>
		<img src="~assets/img/cart/tick.svg" alt="">
	</div>
</template>

<script>
	export default {
		name: "CheckButton.vue",
		components: {
		
		},
		props: {
			isChecked: {
				type: Boolean,
				default: false
			}
		}
	}
</script>

<style scoped>
	.check-button {
		margin-right: 5px;
		border: 1px solid #aaa;
		border-radius: 30px;
		width: 20px;
		height: 20px;
	}

	.check-button img {
		height: 20px;
		width: 20px;
	}

	.check {
		background-color: var(--color-tint);
	}
</style>