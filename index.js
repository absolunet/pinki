//--------------------------------------------------------
//-- pinki
//--------------------------------------------------------

/* eslint-disable */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, global) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory(global, global));
}(this, (function (exports, global) {
/* eslint-enable */

	'use strict';


	//-- Load vendor libriaries
	let PubSub;
	let RSVP;

	// In browser
	if (Object.keys(global).length) {
		({ PubSub, RSVP } = global);
		delete global.PubSub;
		delete global.RSVP;

	// In Node.js
	} else {
		PubSub = require('pubsub-js');  // eslint-disable-line no-undef
		RSVP   = require('rsvp');       // eslint-disable-line no-undef
	}






	//-- Private
	const ID = 'pinki';
	const vows = {};

	const getDeferredVow = (name) => {
		if (!(/^[a-z0-9.-]+$/i).test(name)) {
			throw new Error(`${ID}: Invalid vow name '${name}'`);

		} else if (!vows[name]) {
			vows[name] = RSVP.defer();
		}

		return vows[name];
	};






	//-- Main
	const pinki = class {

		//-- Map PubSub
		static get subscribe()   { return PubSub.subscribe; }
		static get publish()     { return PubSub.publish; }
		static get unsubscribe() { return PubSub.unsubscribe; }

		//-- Map RSVP
		static get Promise() { return RSVP.Promise; }






		//-- Vow
		static get vow() {
			return class {

				//-- Get all registered vow names
				static get list() {
					return Object.keys(vows);
				}


				//-- When all vows are fulfilled or broke
				static when(...names) {
					const promises = [];

					// Group all vows Promises
					names.forEach((vow) => {
						promises.push(getDeferredVow(vow).promise);
					});

					return RSVP.all(promises);
				}


				//-- Fulfill a vow
				static fulfill(name, data) {
					getDeferredVow(name).resolve(data);
				}

				//-- Break a vow
				static break(name, error) {
					getDeferredVow(name).reject(error);
				}

			};
		}

	};

	//-- Publish
	exports.pinki = pinki;

})));
