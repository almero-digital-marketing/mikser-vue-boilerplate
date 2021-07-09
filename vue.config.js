const config = require('mikser-whitebox-vue/config')
process.env.VUE_APP_DOMAIN = require('./domain.config.json').domain

module.exports = {
	...config,
	chainWebpack: config => {
		config.module
			.rule("vue")
			.use("vue-svg-inline-loader")
				.loader("vue-svg-inline-loader")
	}
}