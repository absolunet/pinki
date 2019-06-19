/**
 * PubSubJS wrapper with goodies
 * @module pinki/message
 */

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






/** Message entry point */
class Message {

	/**
	 * Subscribe to a topic
	 * @param {string} topic - Topic id.
	 * @param {function} subscriber - The callback to execute.
	 * @param {object} [options] - Options
	 * @param {boolean} [options.executePrevious=true] - Execute previously published messages.
	 * @return {string} Unique token
	 */
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


	/**
	 * Publish a message
	 * @param {string} topic - Topic id.
	 * @param {*} [data] - The data.
	 * @return {boolean} Were they any subscribers already?
	 */
	publish(topic, data) {
		messages.push({ topic, data });

		return PubSub.publish(topic, data);
	}


	/**
	 * Unsubscribe
	 * @param {string|function} value - A token, function or topic to unsubscribe from
	 * @return {boolean} Were they any subscribers?
	 */
	unsubscribe(value) {
		return PubSub.unsubscribe(value);
	}


	/**
	 * Get all published messages
	 * @readonly
	 * @property {object[]} list
	 * @property {string} list[].topic - Topic id.
	 * @property {*} list[].data - Given data.
 	 */
	get list() {
		return messages;
	}

}


export default new Message();
