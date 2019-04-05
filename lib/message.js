//--------------------------------------------------------
//-- Message
//--------------------------------------------------------

const PubSub = require('pubsub-js');


//-- Private
const messages = [];

// Logic copied from https://github.com/mroderick/PubSubJS/blob/master/src/pubsub.js
const messageHasSubscribers = (topic, messageTopic) => {
	let curr     = messageTopic;
	let found    = curr === topic;
	let position = curr.lastIndexOf('.');

	while (!found && position !== -1) {
		curr = curr.substr(0, position);
		position = curr.lastIndexOf('.');
		found = curr === topic;
	}

	return found;
};






class Message {

	//-- Subscribe to a topic
	subscribe(topic, subscriber, { executePrevious = true } = {})   {
		if (executePrevious) {
			messages.forEach(({ topic: messageTopic, data: messageData }) => {
				if (messageHasSubscribers(topic, messageTopic)) {
					subscriber(messageTopic, messageData);
				}
			});
		}

		return PubSub.subscribe(topic, subscriber);
	}


	//-- Publish a message
	publish(topic, data) {
		messages.push({ topic, data });

		return PubSub.publish(topic, data);
	}


	//-- Unsubscribe to all topic
	get unsubscribe() {
		return PubSub.unsubscribe;
	}


	//-- Get all published messages
	get list() {
		return messages;
	}

}


export default new Message();
