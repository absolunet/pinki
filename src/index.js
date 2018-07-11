//--------------------------------------------------------
//-- pinki
//--------------------------------------------------------
/* eslint-disable class-methods-use-this */

import Message from './lib/message.js';
import Vow     from './lib/vow.js';


//-- Load vendor libriaries
const RSVP = require('rsvp');  // eslint-disable-line no-undef






//-- Main
class Pinki {


	//-- Promise
	get Promise() {
		return RSVP.Promise;
	}


	//-- Message
	get message() {
		return Message;
	}


	//-- Vow
	get vow() {
		return Vow;
	}

}


//-- Publish
export default new Pinki();
