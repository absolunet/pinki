//--------------------------------------------------------
//-- pinki
//--------------------------------------------------------

import Message from './lib/message';
import Vow     from './lib/vow';


class Pinki {

	get message() {
		return Message;
	}

	get vow() {
		return Vow;
	}

}


export default new Pinki();
