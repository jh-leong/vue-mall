import axios from 'axios'

// 封装网络请求, 目的: 让项目中的网络请求面向所封装的request
// 减少第三方框架失效之后的影响: 重构的麻烦等等

// export function request(config) {

// 	return new Promise((resolve, reject) => {
// 		// 1. 创建axios的实例
// 		const instance = axios.create({
// 			baseURL: 'http://123.207.32.32:8000',
// 			timeout: 5000
// 		})

// 		// 发送真正的网络请求
// 		instance(config)
// 			.then(res => {
// 				resolve(res)
// 			})
// 			.catch(err => {
// 				reject(err)
// 			})
// 	})
// }

// 最终版
export function request(config) {

		// 1. 创建axios的实例
		const instance = axios.create({
			baseURL: 'http://123.207.32.32:8000/api/wh',
			timeout: 5000
		})

		// instance.interceptors.request.use(config => {
		// 	return config
		// }), err => {

		// }

		// instance.interceptors.response.use(res => {
		// 	return res.data
		// }), err => {
			
		// }

		// 发送真正的网络请求
		// 返回axios后, 会自动调用Promise, 故省略Promise
		return instance(config)
}