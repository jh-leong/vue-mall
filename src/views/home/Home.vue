<template>
	<div id="home">
		<nav-bar class='home-nav'>
			<div slot='center'>购物车</div>
		</nav-bar>
		<tab-control	:titles="['流行','新款','精选']" 
									@tabClick="tabClick"
									ref='tabControl1'
									class='tab-control'
									v-show='isTabFixed'/>

		<scroll class='content'	
						ref='scroll' 
						:probe-type='3' 
						@scroll='contentScroll'
						:pull-up-load='true'
						@pullingUp='loadMore'>
			<home-swiper	:banners="banners"	
										@swiperImageLoad='swiperImageLoad'/>
			<home-recommend-view :recommends="recommends"/>
			<feature-view/>
			<tab-control	:titles="['流行','新款','精选']" 
										@tabClick="tabClick"
										ref='tabControl2'/>
			<goods-list :goods="showGoods"/>
		</scroll>
		<back-top @click.native='backClick' v-show='isShowBackTop'/>
	</div>
</template>

<script>
	import HomeSwiper from './childComps/HomeSwiper'
	import HomeRecommendView from './childComps/HomeRecommendView'
	import FeatureView from './childComps/FeatureView.vue'

	import NavBar from 'components/common/navbar/NavBar'
	import tabControl from 'components/content/tabControl/tabControl'
	import GoodsList from 'components/content/goods/GoodsList'
	import Scroll from 'components/common/scroll/scroll'

	import {
		getHomeMultidata, 
		getHomeGoods
	} from 'network/home'
	import {debounce} from 'common/utils'
	import {backTopMixin} from 'common/mixin'

	export default {
		name: "Home",
		components: {
			HomeSwiper,
			HomeRecommendView,
			FeatureView,
			NavBar,
			tabControl,
			GoodsList,
			Scroll,
		},
		mixins: [backTopMixin],
		data() {
			return {
				banners: [],
				recommends: [],
				result: null,
				goods: {
					'pop': {page: 0, list: []},
					'new': {page: 0, list: []},
					'sell': {page: 0, list: []},
				},
				currentType: 'pop',
				tabOffsetTop: 0,
				isTabFixed: false,
				saveY: 0,
				itemImgListener: null,
			}
		},
		computed: {
			showGoods() {
				return this.goods[this.currentType].list
			}
		},
		created() {
			this.getHomeMultidata()

			// 请求商品数据
			this.getHomeGoods('pop')
			this.getHomeGoods('new')
			this.getHomeGoods('sell')
		},
		mounted() {
			// 监听item中图片加载完成
			const refresh = debounce(this.$refs.scroll.refresh, 100)

			// 保存监听事件
			this.itemImgListener = () => {
				refresh()
			}
			this.$bus.$on('ItemimageLoad', this.itemImgListener)
		},
		activated() {
			this.$refs.scroll.refresh()
			this.$refs.scroll.scrollTo(0, this.saveY, 0)
		},
		deactivated() {
			this.saveY = this.$refs.scroll.getScrollY()

			// 离开home的时候移除监听事件
			this.$bus.$off('ItemimageLoad', this.itemImgListener)
		},
		methods: {
			/**
			*	网络请求相关的方法
			*/
			getHomeMultidata() {
				getHomeMultidata().then(res => {
				this.result = res
				this.banners = res.data.data.banner.list
				this.recommends = res.data.data.recommend.list
			})
			},
			getHomeGoods(type) {
				const page = this.goods[type].page + 1
				getHomeGoods(type, page).then(res => {
					this.goods[type].list.push(...res.data.data.list)
					this.goods[type].page += 1
					this.$refs.scroll.finishPullUp()
				})
			},
			/**
			* 事件监听相关的方法
			*/ 
			tabClick(index) {
				switch (index) {
					case 0:
						this.currentType = 'pop'
						break
					case 1:
						this.currentType = 'new'
						break
					case 2:
						this.currentType = 'sell'
						break
				}
				this.$refs.tabControl1.currentIndex = index
				this.$refs.tabControl2.currentIndex = index
			},
			contentScroll(position) {
				// 1.判断BackTop是否显示
				this.isShowBackTop = (-position.y) > 1000;

				// 2.决定tabControl是否吸顶
				this.isTabFixed = (-position.y) > this.tabOffsetTop
			},
			loadMore() {
				this.getHomeGoods(this.currentType)
			},
			swiperImageLoad() {
				// 获取tabControl的offsetTop
				this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
			},
		}
	}
</script>

<style scoped>
	#home {
		/*padding-top: 44px;*/
		height: 100vh;
		position: relative;
	}

	.home-nav {
		background-color: var(--color-tint);
		color: #fff;

		/*原生滚动时*/
		/*position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 9;*/
	}

	.tab-control {
		position: relative;
	}

	.content {
		height: calc(100% - 93px);
		overflow: hidden;
		position: absolute;
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0;
		background-color: #fff;
	}
</style>