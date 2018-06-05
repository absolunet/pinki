//--------------------------------------------------------
//-- pinki
//--------------------------------------------------------

(function(global) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




	//-- Load vendor libriaries
	var PubSub = global.PubSub;
	var RSVP   = global.RSVP;

	delete global.PubSub;
	delete global.RSVP;






	//-- Private
	var ID       = 'pinki';
	var messages = [];
	var vows     = {};


	// Logic copied from https://github.com/mroderick/PubSubJS/blob/master/src/pubsub.js
	var messageHasSubscribers = function(topic, msgTopic) {
		var curr     = msgTopic;
		var found    = curr === topic;
		var position = curr.lastIndexOf('.');

		while (!found && position !== -1) {
			curr = curr.substr(0, position);
			position = curr.lastIndexOf('.');
			found = curr === topic;
		}

		return found;
	};


	var getDeferredVow = function(name) {
		if (!(/^[a-z0-9.-]+$/i).test(name)) {
			throw new Error(`${ID}: Invalid vow name '${name}'`);

		} else if (!vows[name]) {
			vows[name] = RSVP.defer();
		}

		return vows[name];
	};






	//-- Main
	global.pinki = function () {
		function pinki() {
			_classCallCheck(this, pinki);
		}

		_createClass(pinki, null, [{
			key: 'Promise',


			//-- Map RSVP
			get: function get() {
				return RSVP.Promise;
			}

			//-- Message

		}, {
			key: 'message',
			get: function get() {
				return function () {
					function _class() {
						_classCallCheck(this, _class);
					}

					_createClass(_class, null, [{
						key: 'subscribe',


						//-- Subscribe to a topic
						value: function subscribe(topic, subscriber) {
							var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
							    _ref$executePrevious = _ref.executePrevious,
							    executePrevious = _ref$executePrevious === undefined ? true : _ref$executePrevious;

							if (executePrevious) {
								messages.forEach(function (_ref2) {
									var msgTopic = _ref2.topic,
									    msgData = _ref2.data;

									if (messageHasSubscribers(topic, msgTopic)) {
										subscriber(msgTopic, msgData);
									}
								});
							}

							return PubSub.subscribe(topic, subscriber);
						}

						//-- Publish a message

					}, {
						key: 'publish',
						value: function publish(topic, data) {
							messages.push({ topic: topic, data: data });

							return PubSub.publish(topic, data);
						}

						//-- Unsubscribe to all topic

					}, {
						key: 'unsubscribe',
						get: function get() {
							return PubSub.unsubscribe;
						}

						//-- Get all published messages

					}, {
						key: 'list',
						get: function get() {
							return messages;
						}
					}]);

					return _class;
				}();
			}

			//-- Vow

		}, {
			key: 'vow',
			get: function get() {
				return function () {
					function _class2() {
						_classCallCheck(this, _class2);
					}

					_createClass(_class2, null, [{
						key: 'when',


						//-- When all vows are fulfilled or broke
						value: function when() {
							var promises = [];

							// Group all vows Promises

							for (var _len = arguments.length, names = Array(_len), _key = 0; _key < _len; _key++) {
								names[_key] = arguments[_key];
							}

							names.forEach(function (vow) {
								promises.push(getDeferredVow(vow).promise);
							});

							return RSVP.all(promises);
						}

						//-- Fulfill a vow

					}, {
						key: 'fulfill',
						value: function fulfill(name, data) {
							getDeferredVow(name).resolve(data);
						}

						//-- Break a vow

					}, {
						key: 'break',
						value: function _break(name, error) {
							getDeferredVow(name).reject(error);
						}
					}, {
						key: 'list',


						//-- Get all registered vow names
						get: function get() {
							return Object.keys(vows);
						}
					}]);

					return _class2;
				}();
			}
		}]);

		return pinki;
	}();

})(window);
