//--------------------------------------------------------
//-- Tests
//--------------------------------------------------------
'use strict';

const ava    = require('ava');
const tester = require('@absolunet/tester');

const PubSub    = require('pubsub-js');
const RSVP      = require('rsvp');
const { pinki } = require('../index');

const randomTopic = () => {
	global.___randomTopic___ = global.___randomTopic___ || 'random--';
	global.___randomTopic___ += 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.charAt(Math.floor(Math.random() * 62));

	return global.___randomTopic___;
};






//-- Linter
tester.lintJs([
	`*.js`,
	`*/*.js`,
	`!node_modules/**/*.js`,
	`!bower_components/**/*.js`,
	`!vendor/*.js`
]);






//-- Check PubSub matching
ava.test('Matching: pinki.subscribe is identical to PubSub.subscribe', (t) => {
	t.is(pinki.subscribe, PubSub.subscribe);
});


ava.test('Matching: pinki.publish is identical to PubSub.publish', (t) => {
	t.is(pinki.publish, PubSub.publish);
});


ava.test('Matching: pinki.unsubscribe is identical to PubSub.unsubscribe', (t) => {
	t.is(pinki.unsubscribe, PubSub.unsubscribe);
});






//-- Check RSVP.Promise matching
ava.test('Matching: pinki.Promise is identical to RSVP.Promise', (t) => {
	t.is(pinki.Promise, RSVP.Promise);
});






//-- Validate vow names
ava.test('Vows: Check for invalid vow characters', (t) => {
	const invalid = `/=!@#$%?&*()_+|¡@£€∞ {}[]¬^¨~;:°«»,'"<>àÀâÂçÇéÉèÈëËêÊôÔüÜùÙ\\`.split('');

	t.plan(invalid.length * 2);

	invalid.forEach((char) => {
		const name = `invalid--${char}`;
		const error = t.throws(() => {
			pinki.whenVows(name);
		}, Error);

		t.is(error.message, `pinki: Invalid vow name '${name}'`);
	});
});


ava.test('Vows: Check for valid vow characters', (t) => {
	const valid = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-.`.split('');

	valid.forEach((char) => {
		pinki.whenVows(`valid--${char}`);
	});

	t.pass();
});






//-- Check single `whenVows`
ava.test.cb('Vows: Single `whenVows` with `fulfillVow` after', (t) => {
	const topic = randomTopic();

	pinki.whenVows(topic).then((data) => {
		t.is(data[topic], 'thx');
		t.end();
	});

	pinki.fulfillVow(topic, 'thx');
});


ava.test.cb('Vows: Single `whenVows` with `fulfillVow` before', (t) => {
	const topic = randomTopic();

	pinki.fulfillVow(topic, 'thx');

	pinki.whenVows(topic).then((data) => {
		t.is(data[topic], 'thx');
		t.end();
	});
});


ava.test.cb('Vows: Single `whenVows` with `breakVow` after', (t) => {
	const topic = randomTopic();

	pinki.whenVows(topic).catch((error) => {
		t.is(error, 'noooooo');
		t.end();
	});

	pinki.breakVow(topic, 'noooooo');
});


ava.test.cb('Vows: Single `whenVows` with `breakVow` before', (t) => {
	const topic = randomTopic();

	pinki.breakVow(topic, 'noooooo');

	pinki.whenVows(topic).catch((error) => {
		t.is(error, 'noooooo');
		t.end();
	});
});






//-- Check multiple `whenVows` with `fulfillVow` */
ava.test.cb('Vows: Multiple `whenVows` with `fulfillVow` after', (t) => {
	const topic1 = randomTopic();
	const topic2 = randomTopic();

	pinki.whenVows(topic1, topic2).then((data) => {
		t.is(data[topic1], 'thx1');
		t.is(data[topic2], 'thx2');
		t.end();
	});

	pinki.fulfillVow(topic1, 'thx1');
	pinki.fulfillVow(topic2, 'thx2');
});


ava.test.cb('Vows: Multiple `whenVows` with `fulfillVow` before/after', (t) => {
	const topic1 = randomTopic();
	const topic2 = randomTopic();

	pinki.fulfillVow(topic1, 'thx1');

	pinki.whenVows(topic1, topic2).then((data) => {
		t.is(data[topic1], 'thx1');
		t.is(data[topic2], 'thx2');
		t.end();
	});

	pinki.fulfillVow(topic2, 'thx2');
});


ava.test.cb('Vows: Multiple `whenVows` with `fulfillVow` before', (t) => {
	const topic1 = randomTopic();
	const topic2 = randomTopic();

	pinki.fulfillVow(topic1, 'thx1');
	pinki.fulfillVow(topic2, 'thx2');

	pinki.whenVows(topic1, topic2).then((data) => {
		t.is(data[topic1], 'thx1');
		t.is(data[topic2], 'thx2');
		t.end();
	});

});






//-- Check multiple `whenVows` with `breakVow`
ava.test.cb('Vows: Multiple `whenVows` with `breakVow` after', (t) => {
	const topic1 = randomTopic();
	const topic2 = randomTopic();

	pinki.whenVows(topic1, topic2).catch((error) => {
		t.is(error, 'noooooo');
		t.end();
	});

	pinki.breakVow(topic1, 'noooooo');
	pinki.breakVow(topic2, 'noooooo');
});


ava.test.cb('Vows: Multiple `whenVows` with `breakVow` before/after', (t) => {
	const topic1 = randomTopic();
	const topic2 = randomTopic();

	pinki.breakVow(topic1, 'noooooo');

	pinki.whenVows(topic1, topic2).catch((error) => {
		t.is(error, 'noooooo');
		t.end();
	});

	pinki.breakVow(topic2, 'noooooo');
});


ava.test.cb('Vows: Multiple `whenVows` with `breakVow` before', (t) => {
	const topic1 = randomTopic();
	const topic2 = randomTopic();

	pinki.breakVow(topic1, 'noooooo');
	pinki.breakVow(topic2, 'noooooo');

	pinki.whenVows(topic1, topic2).catch((error) => {
		t.is(error, 'noooooo');
		t.end();
	});

});






//-- Check multiple `whenVows` with `fulfillVow` and `breakVow`
ava.test.cb('Vows: Multiple `whenVows` with `fulfillVow`/`breakVow` after', (t) => {
	const topic1 = randomTopic();
	const topic2 = randomTopic();

	pinki.whenVows(topic1, topic2).catch((error) => {
		t.is(error, 'noooooo');
		t.end();
	});

	pinki.fulfillVow(topic1, 'thx1');
	pinki.breakVow(topic2, 'noooooo');
});


ava.test.cb('Vows: Multiple `whenVows` with `breakVow`/`fulfillVow` after', (t) => {
	const topic1 = randomTopic();
	const topic2 = randomTopic();

	pinki.whenVows(topic1, topic2).catch((error) => {
		t.is(error, 'noooooo');
		t.end();
	});

	pinki.breakVow(topic1, 'noooooo');
	pinki.fulfillVow(topic2, 'thx2');
});


ava.test.cb('Vows: Multiple `whenVows` with `fulfillVow` before and `breakVow` after', (t) => {
	const topic1 = randomTopic();
	const topic2 = randomTopic();

	pinki.fulfillVow(topic1, 'thx1');

	pinki.whenVows(topic1, topic2).catch((error) => {
		t.is(error, 'noooooo');
		t.end();
	});

	pinki.breakVow(topic2, 'noooooo');
});


ava.test.cb('Vows: Multiple `whenVows` with `breakVow` before and `fulfillVow` after', (t) => {
	const topic1 = randomTopic();
	const topic2 = randomTopic();

	pinki.breakVow(topic1, 'noooooo');

	pinki.whenVows(topic1, topic2).catch((error) => {
		t.is(error, 'noooooo');
		t.end();
	});

	pinki.fulfillVow(topic2, 'thx2');
});


ava.test.cb('Vows: Multiple `whenVows` with `fulfillVow`/`breakVow` before', (t) => {
	const topic1 = randomTopic();
	const topic2 = randomTopic();

	pinki.fulfillVow(topic1, 'thx1');
	pinki.breakVow(topic2, 'noooooo');

	pinki.whenVows(topic1, topic2).catch((error) => {
		t.is(error, 'noooooo');
		t.end();
	});
});


ava.test.cb('Vows: Multiple `whenVows` with `breakVow`/`fulfillVow` before', (t) => {
	const topic1 = randomTopic();
	const topic2 = randomTopic();

	pinki.breakVow(topic1, 'noooooo');
	pinki.fulfillVow(topic2, 'thx2');

	pinki.whenVows(topic1, topic2).catch((error) => {
		t.is(error, 'noooooo');
		t.end();
	});
});
