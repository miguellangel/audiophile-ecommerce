const webpack = require('webpack')
// easier access to process.env from anywhere in the app
const { parsed: myEnv } = require('dotenv').config({
    path: '.env.local'
})
// get Next server constants
const {
    PHASE_DEVELOPMENT_SERVER,
    PHASE_PRODUCTION_BUILD,
} = require('next/constants')

// module exports as a function w return values
module.exports = phase => {

    // assign vars depending on type of phase
    const isDev = phase === PHASE_DEVELOPMENT_SERVER
    const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'
    const isStaging = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1'

    console.log(`On ${isDev ? 'development' : 'production'} build`)

    return {
        reactStrictMode: false,
        // images: {
        //     loader: "imgix",
        //     path: "",
        // },
	// edit webpack to include dotenv
	webpack(config) {
            config.plugins.push(new webpack.EnvironmentPlugin(isDev ? myEnv : {})) // only use dotenv on dev phase, use Next env vars on prod.
            return config
        },
    }
}