//--------------------------------------------------------
//-- webpack configuration
//--------------------------------------------------------
'use strict';

const merge = require('lodash.merge');
const path  = require('path');


//-- Common
const commonConfig = {
	mode: 'none',
	devtool: '',
	output: {
		path: path.resolve(__dirname, 'dist')
	}
};


//-- Node.js
const nodeConfig = merge({}, commonConfig, {
	target: 'node',
	entry:  './src/wrapper/node.js',
	output: {
		filename: 'node.js',
		libraryTarget: 'commonjs2'
	},
	externals: [
		'pubsub-js',
		'rsvp'
	]
});


//-- Web
const webConfig = merge({}, commonConfig, {
	target: 'web',
	entry:  './src/wrapper/web.js',
	output: {
		filename: 'web.js'
	},
	externals: {
		'pubsub-js': 'PubSub',
		'rsvp':      'RSVP'
	}
});


//-- Web ES5
const webES5Config = merge({}, webConfig, {
	output: {
		filename: 'web-es5.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
				}
			}
		]
	}

});


module.exports = [nodeConfig, webConfig, webES5Config];
