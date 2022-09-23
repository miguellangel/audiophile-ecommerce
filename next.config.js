const webpack = require('webpack')
const { parsed: myEnv } = require('dotenv').config({
    path:'.env.local'
})
const {
	PHASE_DEVELOPMENT_SERVER,
	PHASE_PRODUCTION_BUILD,
  } = require('next/constants')

module.exports = phase => {
	const isDev = phase === PHASE_DEVELOPMENT_SERVER
	const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'
	const isStaging = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1'

	console.log(`On ${isDev ? 'development' : 'production'} build`)

	return {
		reactStrictMode: false,

		webpack(config) {
			config.plugins.push(new webpack.EnvironmentPlugin(isDev ? myEnv : {}))
			return config 
		},
	}
}