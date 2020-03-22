module.exports = {
	plugins: {
		autoprefixer: {},
		'postcss-px-to-viewport': {
			viewportWidth: 375,  /*视窗的宽度*/
			viewportHeight: 667, /*视窗高度*/
			unitPrecision: 5, /*指定'px'转换为视窗单位制的小数位*/
			viewportUnit: 'vw', /*指定需要转换成视窗单位*/
			// 指定不需要转换的类
			selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'],
			minPixelValue: 1, // 小于或等于1px的不转换为视窗单位
			mediaQuery: false // 允许在媒体查询中转换px
		}
	}
}