//--------------------------------------------------------
//-- Vow
//--------------------------------------------------------

//-- Load vendor libriaries
const RSVP = require('rsvp');  // eslint-disable-line no-undef


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







//-- Main
class Vow {

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

}


export default Vow;
