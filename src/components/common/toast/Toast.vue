<template>
	<div class="toast" v-show='isToastShow'>
		<div>{{message}}</div>
	</div>
</template>

<script>
	export default {
		name: "Toast.vue",
		components: {
		
		},
		props: {
			// message: {
			// 	type: String,
			// 	default: ''
			// },
			// isToastShow: {
			// 	type: Boolean,
			// 	default: false
			// }
		},
		data() {
			return {
				message: '',
				isToastShow: false
			}
		},
		methods: {
			show(message, duration=1500) {
				this.isToastShow = true
				this.message = message

				setTimeout(() => {
					this.isToastShow = false
					this.message = ''
				}, duration)
			}
		}
	}
</script>

<style scoped>
	.toast {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: #fff;
		padding: 8px 10px;
		background-color: rgba(0,0,0,.8);
		border-radius: 10px;
		z-index: 99;
	}
</style>