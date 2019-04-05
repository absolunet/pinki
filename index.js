//--------------------------------------------------------
//-- pinki
//--------------------------------------------------------

import Message from './lib/message';
import Vow     from './lib/vow';

const RSVP = require('rsvp');


class Pinki {

	get Promise() {
		return RSVP.Promise;
	}

	get message() {
		return Message;
	}

	get vow() {
		return Vow;
	}

}


export default new Pinki();
