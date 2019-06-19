/**
 * Name-based Promises that can be referenced anytime
 * @module pinki/message
 */

const RSVP = require('rsvp');


//-- Private
const vows = {};


const getDeferredVow = (name) => {
	if (!(/^[a-z0-9.-]+$/i).test(name)) {
		throw new Error(`pinki: Invalid vow name '${name}'`);

	} else if (!vows[name]) {
		vows[name] = RSVP.defer();
	}

	return vows[name];
};






/** Vow entry point */
class Vow {

	/**
	 * Vows than have been registered.
	 * @readonly
	 * @property {string[]} list - List of vows.
 	 */
	get list() {
		return Object.keys(vows);
	}


	/**
	 * When a or all vows are fulfilled or broke
	 * @param {string|string[]} names - Vow name or array of vow names
	 * @return {promise} Vow's promise or Promise.all() of all vow's promises
	 */
	when(names) {
		if (typeof names === 'string') {
			return getDeferredVow(names).promise;

		} else if (Array.isArray(names)) {
			const promises = [];

			// Group all vows Promises
			names.forEach((vow) => {
				promises.push(getDeferredVow(vow).promise);
			});

			return RSVP.all(promises);
		}

		throw new TypeError('Argument must be a String or an Array');
	}


	/**
	 * Resolve the underlying Promise
	 * @param {string} name - Vow name
	 * @param {*} data - Data to resolve the underlying Promise with
	 */
	fulfill(name, data) {
		getDeferredVow(name).resolve(data);
	}

	/**
	 * Reject the underlying Promise
	 * @param {string} name - Vow name
	 * @param {string} error - Error message to reject the underlying Promise with
	 */
	break(name, error) {
		getDeferredVow(name).reject(error);
	}

}


export default new Vow();
