//--------------------------------------------------------
//-- Manager
//--------------------------------------------------------
'use strict';

const manager = require('@absolunet/manager');


manager.singleScriptsRunner({
	tasks: {
		build: {
			// eslint-disable-next-line require-await
			postRun: async ({ terminal }) => {
				terminal.print('Run Library builder');
				terminal.run('node node_modules/@absolunet/library-builder/bin/build.js');
			}
		}
	}
});
