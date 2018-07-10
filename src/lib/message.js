//--------------------------------------------------------
//-- Message
//--------------------------------------------------------

//-- Load vendor libriaries
const PubSub = require('pubsub-js');  // eslint-disable-line no-undef


//-- Private
const messages = [];

// Logic copied from https://github.com/mroderick/PubSubJS/blob/master/src/pubsub.js
const messageHasSubscribers = (topic, msgTopic) => {
	let curr     = msgTopic;
	let found    = curr === topic;
	let position = curr.lastIndexOf('.');

	while (!found && position !== -1) {
		curr = curr.substr(0, position);
		position = curr.lastIndexOf('.');
		found = curr === topic;
	}

	return found;
};






//-- Main
class Message {

	//-- Subscribe to a topic
	static subscribe(topic, subscriber, { executePrevious = true } = {})   {
		if (executePrevious) {
			messages.forEach(({ topic:msgTopic, data:msgData }) => {
				if (messageHasSubscribers(topic, msgTopic)) {
					subscriber(msgTopic, msgData);
				}
			});
		}

		return PubSub.subscribe(topic, subscriber);
	}


	//-- Publish a message
	static publish(topic, data) {
		messages.push({ topic, data });

		return PubSub.publish(topic, data);
	}


	//-- Unsubscribe to all topic
	static get unsubscribe() {
		return PubSub.unsubscribe;
	}


	//-- Get all published messages
	static get list() {
		return messages;
	}

}


export default Message;
