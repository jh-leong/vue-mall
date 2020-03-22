<template>
	<div class="detail-swiper">
		<swiper class='topSwiper'>
			<swiper-item v-for='(item, index) in topImages' :key='index'>
				<img :src="item" alt="">
			</swiper-item>
		</swiper>
	</div>
</template>

<script>
	import {Swiper, SwiperItem} from 'components/common/swiper'

	export default {
		name: "DetailSwiper.vue",
		components: {
			Swiper,
			SwiperItem,
		},
		props: {
			topImages: {
				type: Array,
				default() {
					return []
				}
			}
		},
	}
</script>

<style scoped>
	.topSwiper {
		height: 300px;
		overflow: hidden;
	}

</style>