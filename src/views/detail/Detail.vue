<template>
	<div id="detail">
		<detail-nav-bar	class='detail-nav'
										@titleClick='titleClick'
										ref='detailNavBar'/>
		<scroll	class='content' 
						ref='scroll' 
						@scroll='contentScroll'
						:probe-type='3'>
			<detail-swiper :top-images='topImages'/>
			<detail-base-info :goods='goods'/>
			<detail-shop-info :shop='shop'/>
			<detail-goods-info :imagesInfo='detailInfo' @imgLoad='imgLoad'/>
			<detail-param-info :paramInfo='paramInfo' ref='params'/>
			<detail-comment-info :commentInfo='commentInfo' ref='comment'/>
			<goods-list :goods='recommends' ref='recommend'/>
		</scroll>
		<detail-bottom-bar @addCart='detailAddCart'/>
		<back-top @click.native='backClick' v-show='isShowBackTop'/>
		<!-- <toast :message='message' :isToastShow='isToastShow'></toast> -->
	</div>
</template>

<script>
	import DetailNavBar from './childComps/DetailNavBar'
	import DetailSwiper from './childComps/DetailSwiper'
	import DetailBaseInfo from './childComps/DetailBaseInfo'
	import DetailShopInfo from './childComps/DetailShopInfo'
	import DetailGoodsInfo from './childComps/DetailGoodsInfo'
	import DetailParamInfo from './childComps/DetailParamInfo'
	import DetailCommentInfo from './childComps/DetailCommentInfo'
	import DetailBottomBar from './childComps/DetailBottomBar'

	import Scroll from 'components/common/scroll/scroll'
	import GoodsList from 'components/content/goods/GoodsList'
	// import Toast from 'components/common/toast/Toast'

	import {
		getDetail, Goods, Shop, 
		GoodsParam, getRecommend
	} from 'network/detail'
	import {debounce} from 'common/utils'
	import {backTopMixin} from 'common/mixin'
	import {mapActions} from 'vuex'

	export default {
		name: "Detail",
		components: {
			DetailNavBar,
			DetailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			Scroll,
			DetailGoodsInfo,
			DetailParamInfo,
			DetailCommentInfo,
			GoodsList,
			DetailBottomBar,
			// Toast,
		},
		mixins: [backTopMixin],
		data() {
			return {
				iid: null,
				topImages: [],
				goods: {},
				shop: {},
				detailInfo: {},
				paramInfo: {},
				commentInfo: {},
				recommends: [],
				themeTopYs: [],
				// message: '',
				// isToastShow: false,
			}
		},
		created() {
			// 1.保存传入的iid
			this.iid = this.$route.params.iid

			// 2.根据iid请求详情数据
			getDetail(this.iid).then(res => {
				const data = res.data.result
				// 2.1 获取顶部图片
				this.topImages = data.itemInfo.topImages

				// 2.2 获取商品信息
				this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

				// 2.3 创建店铺信息的对象
				this.shop = new Shop(data.shopInfo)

				// 2.4 获取商品详细信息
				this.detailInfo = data.detailInfo

				// 2.5 获取参数信息
				this.paramInfo = new GoodsParam(data.itemParams, data.itemParams.rule)

				// 2.6 获取评论数据
				if (data.rate.cRate !== 0) {
					this.commentInfo = data.rate.list[0]
				}
			})

			// 3. 请求推荐数据
			getRecommend().then(res => {
				this.recommends = res.data.data.list
			})
		},
		methods: {
			...mapActions(['addCart']),
			imgLoad() {
				this.$refs.scroll.refresh()

				this.themeTopYs = []
				this.themeTopYs.push(0)
				this.themeTopYs.push(this.$refs.params.$el.offsetTop)
				this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
				this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
			},
			titleClick(index) {
				this.$refs.scroll.scrollTo(0, -this.themeTopYs[index] + 44, 200)
			},
			contentScroll(position) {
				// 1. 获取y值
				const positionY = -position.y + 44

				// 2. positionY和主题中的y值比较
				let length = this.themeTopYs.length
				let currentIndex = this.$refs.detailNavBar.currentIndex
				for(let i = 0; i < length; i++) {
					// 防止频繁比较
					if (currentIndex != i) {
						if (positionY <= this.themeTopYs[i+1] && positionY > this.themeTopYs[i]) {
							this.$refs.detailNavBar.currentIndex = i
						} else if (positionY >= this.themeTopYs[3]) {
							this.$refs.detailNavBar.currentIndex = 3
						}
					}
				}

				// 3. 返回顶部
				this.isShowBackTop = (-position.y) > 1000;
			},
			detailAddCart() {
				// 1. 获取需要展示到购物车的商品信息
				const product = {}
				product.image = this.topImages[0]
				product.title = this.goods.title
				product.desc = this.goods.desc
				product.price = this.goods.oldPrice
				product.iid = this.iid

				// 2. 将商品添加到购物车里
				// this.$store.cartList.push(product)
				// 上面不可行，必须通过Mutations修改state，如下
				// this.$store.dispatch('addCart', product)

				// 映射Actions后可以直接调用方法，默认调用了dispatch
				this.addCart(product).then(res => {
					this.$toast.show(res)
				})
			}
		},
		mounted() {
			const refresh = debounce(this.$refs.scroll.refresh, 100)
			this.$bus.$on('ItemimageLoad', () => {
				refresh
			})
		}
	}
</script>

<style scoped>
	#detail {
		position: relative;
		z-index: 9;
		background-color: #fff;
		height: 100vh;
	}

	.detail-nav {
		position: relative;
		z-index: 9;
		background-color: #fff;
	}
	
	.content {
		height: calc(100% - 44px - 49px);
	}
</style>