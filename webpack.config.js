//--------------------------------------------------------
//-- webpack configuration
//--------------------------------------------------------
'use strict';

const merge          = require('lodash.merge');
const libraryBuilder = require('@absolunet/library-builder');






libraryBuilder.setRoot(__dirname);


//-- Node.js
const nodeConfig = merge({}, libraryBuilder.config.node, {
	externals: [
		'pubsub-js',
		'rsvp'
	]
});


//-- Web
const webExternals = {
	externals: {
		'pubsub-js': 'PubSub',
		'rsvp':      'RSVP'
	}
};

const webConfig    = merge({}, libraryBuilder.config.web,    webExternals);
const webES5Config = merge({}, libraryBuilder.config.webES5, webExternals);






module.exports = [nodeConfig, webConfig, webES5Config];
