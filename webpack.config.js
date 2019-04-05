//--------------------------------------------------------
//-- webpack configuration
//--------------------------------------------------------
/* globals __dirname, module */

const LibraryBuilder = require('@absolunet/library-builder');

const builder = new LibraryBuilder({
	name: 'pinki',
	root: __dirname
});


//-- Node.js
const nodeExternals = {
	externals: [
		'pubsub-js',
		'rsvp'
	]
};


//-- Browser
const browserExternals = {
	externals: {
		'pubsub-js': 'window.PubSub',
		'rsvp':      'window.RSVP'
	}
};


module.exports = [
	builder.config.mergeWithNode(nodeExternals),
	builder.config.mergeWithBrowser(browserExternals),
	builder.config.mergeWithBrowserES5(browserExternals)
];
