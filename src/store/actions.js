export default {
	addCart(context, payload) {
		return new Promise((resolve) => {
			// payload新添加的商品
			let isExists = false
			for (let item of context.state.cartList) {
				if (item.iid === payload.iid) {
					context.commit('addCounter', item)
					isExists = true
					resolve('商品数量+1!')
				}
			}
			if (!isExists) {
				context.commit('addToCart', payload)
				resolve('商品添加成功!')
			}
		})
		
	}
}