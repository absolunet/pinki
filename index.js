/**
 * Asynchronous libraries wrapper
 * @module pinki
 */

import Message from './lib/message';
import Vow     from './lib/vow';


/** Main entry point */
class Pinki {

	/**
	 * Message
	 * @readonly
	 * @property {object} message
	 */
	get message() {
		return Message;
	}

	/**
	 * Vow
	 * @readonly
	 * @property {object} vow
	 */
	get vow() {
		return Vow;
	}

}


export default new Pinki();
