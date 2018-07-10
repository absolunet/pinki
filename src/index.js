//--------------------------------------------------------
//-- pinki
//--------------------------------------------------------

import Message from './lib/message.js';
import Vow     from './lib/vow.js';


//-- Load vendor libriaries
const RSVP = require('rsvp');  // eslint-disable-line no-undef






//-- Main
class pinki {


	//-- Promise
	static get Promise() {
		return RSVP.Promise;
	}


	//-- Message
	static get message() {
		return Message;
	}


	//-- Vow
	static get vow() {
		return Vow;
	}

}


//-- Publish
export default pinki;
