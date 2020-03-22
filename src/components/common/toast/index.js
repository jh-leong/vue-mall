import Toast from './Toast.vue'

const obj = {

}

// Vue执行install方法时会默认传入参数Vue
obj.install = function (Vue) {

	// 1.首先要Toast节点挂载到body上
	// 1.1 使用$el直接挂载: fail, 因为执行install方法时还没有Toast.$el
	// document.body.appendChild(Toast.$el)

	// 1.2 创建组件构造器, 调用Vue的extend方法，传入一个组件
	const toastConstructor = Vue.extend(Toast)

	// 1.3 通过new组件构造器的方式，创建出一个组件对象
	const toast = new toastConstructor()

	// 1.4 将组件对象调用$mount方法手动挂载到某一元素上
	toast.$mount(document.createElement('div'))

	// 1.5 这时toast.$el才存在，挂载到body上
	document.body.appendChild(toast.$el)

	Vue.prototype.$toast = toast
}

export default obj