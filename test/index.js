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
ava.test('Vow: Check for invalid vow characters', (t) => {
	const invalid = `/=!@#$%?&*()_+|¡@£€∞ {}[]¬^¨~;:°«»,'"<>àÀâÂçÇéÉèÈëËêÊôÔüÜùÙ\\`.split('');

	invalid.forEach((char) => {
		const name = `invalid--${char}`;
		const error = t.throws(() => {
			pinki.vow.when(name);
		}, Error);

		t.is(error.message, `pinki: Invalid vow name '${name}'`);
	});
});


ava.test('Vow: Check for valid vow characters', (t) => {
	const valid = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-.`.split('');

	valid.forEach((char) => {
		pinki.vow.when(`valid--${char}`);
	});

	t.pass();
});






//-- Check single `when`
ava.test.cb('Vow: Single `when` with `fulfill` after', (t) => {
	const topic = randomTopic();

	pinki.vow.when(topic).then((data) => {
		t.is(data[topic], 'thx');
		t.end();
	});

	pinki.vow.fulfill(topic, 'thx');
});


ava.test.cb('Vow: Single `when` with `fulfill` before', (t) => {
	const topic = randomTopic();

	pinki.vow.fulfill(topic, 'thx');

	pinki.vow.when(topic).then((data) => {
		t.is(data[topic], 'thx');
		t.end();
	});
});


ava.test.cb('Vow: Single `when` with `break` after', (t) => {
	const topic = randomTopic();

	pinki.vow.when(topic).catch((error) => {
		t.is(error, 'noooooo');
		t.end();
	});

	pinki.vow.break(topic, 'noooooo');
});


ava.test.cb('Vow: Single `when` with `break` before', (t) => {
	const topic = randomTopic();

	pinki.vow.break(topic, 'noooooo');

	pinki.vow.when(topic).catch((error) => {
		t.is(error, 'noooooo');
		t.end();
	});
});






//-- Check multiple `when` with `fulfill` */
ava.test.cb('Vow: Multiple `when` with `fulfill` after', (t) => {
	const topic1 = randomTopic();
	const topic2 = randomTopic();

	pinki.vow.when(topic1, topic2).then((data) => {
		t.is(data[topic1], 'thx1');
		t.is(data[topic2], 'thx2');
		t.end();
	});

	pinki.vow.fulfill(topic1, 'thx1');
	pinki.vow.fulfill(topic2, 'thx2');
});


ava.test.cb('Vow: Multiple `when` with `fulfill` before/after', (t) => {
	const topic1 = randomTopic();
	const topic2 = randomTopic();

	pinki.vow.fulfill(topic1, 'thx1');

	pinki.vow.when(topic1, topic2).then((data) => {
		t.is(data[topic1], 'thx1');
		t.is(data[topic2], 'thx2');
		t.end();
	});

	pinki.vow.fulfill(topic2, 'thx2');
});


ava.test.cb('Vow: Multiple `when` with `fulfill` before', (t) => {
	const topic1 = randomTopic();
	const topic2 = randomTopic();

	pinki.vow.fulfill(topic1, 'thx1');
	pinki.vow.fulfill(topic2, 'thx2');

	pinki.vow.when(topic1, topic2).then((data) => {
		t.is(data[topic1], 'thx1');
		t.is(data[topic2], 'thx2');
		t.end();
	});

});






//-- Check multiple `when` with `break`
ava.test.cb('Vow: Multiple `when` with `break` after', (t) => {
	const topic1 = randomTopic();
	const topic2 = randomTopic();

	pinki.vow.when(topic1, topic2).catch((error) => {
		t.is(error, 'noooooo');
		t.end();
	});

	pinki.vow.break(topic1, 'noooooo');
	pinki.vow.break(topic2, 'noooooo');
});


ava.test.cb('Vow: Multiple `when` with `break` before/after', (t) => {
	const topic1 = randomTopic();
	const topic2 = randomTopic();

	pinki.vow.break(topic1, 'noooooo');

	pinki.vow.when(topic1, topic2).catch((error) => {
		t.is(error, 'noooooo');
		t.end();
	});

	pinki.vow.break(topic2, 'noooooo');
});


ava.test.cb('Vow: Multiple `when` with `break` before', (t) => {
	const topic1 = randomTopic();
	const topic2 = randomTopic();

	pinki.vow.break(topic1, 'noooooo');
	pinki.vow.break(topic2, 'noooooo');

	pinki.vow.when(topic1, topic2).catch((error) => {
		t.is(error, 'noooooo');
		t.end();
	});

});






//-- Check multiple `when` with `fulfill` and `break`
ava.test.cb('Vow: Multiple `when` with `fulfill`/`break` after', (t) => {
	const topic1 = randomTopic();
	const topic2 = randomTopic();

	pinki.vow.when(topic1, topic2).catch((error) => {
		t.is(error, 'noooooo');
		t.end();
	});

	pinki.vow.fulfill(topic1, 'thx1');
	pinki.vow.break(topic2, 'noooooo');
});


ava.test.cb('Vow: Multiple `when` with `break`/`fulfill` after', (t) => {
	const topic1 = randomTopic();
	const topic2 = randomTopic();

	pinki.vow.when(topic1, topic2).catch((error) => {
		t.is(error, 'noooooo');
		t.end();
	});

	pinki.vow.break(topic1, 'noooooo');
	pinki.vow.fulfill(topic2, 'thx2');
});


ava.test.cb('Vow: Multiple `when` with `fulfill` before and `break` after', (t) => {
	const topic1 = randomTopic();
	const topic2 = randomTopic();

	pinki.vow.fulfill(topic1, 'thx1');

	pinki.vow.when(topic1, topic2).catch((error) => {
		t.is(error, 'noooooo');
		t.end();
	});

	pinki.vow.break(topic2, 'noooooo');
});


ava.test.cb('Vow: Multiple `when` with `break` before and `fulfill` after', (t) => {
	const topic1 = randomTopic();
	const topic2 = randomTopic();

	pinki.vow.break(topic1, 'noooooo');

	pinki.vow.when(topic1, topic2).catch((error) => {
		t.is(error, 'noooooo');
		t.end();
	});

	pinki.vow.fulfill(topic2, 'thx2');
});


ava.test.cb('Vow: Multiple `when` with `fulfill`/`break` before', (t) => {
	const topic1 = randomTopic();
	const topic2 = randomTopic();

	pinki.vow.fulfill(topic1, 'thx1');
	pinki.vow.break(topic2, 'noooooo');

	pinki.vow.when(topic1, topic2).catch((error) => {
		t.is(error, 'noooooo');
		t.end();
	});
});


ava.test.cb('Vow: Multiple `when` with `break`/`fulfill` before', (t) => {
	const topic1 = randomTopic();
	const topic2 = randomTopic();

	pinki.vow.break(topic1, 'noooooo');
	pinki.vow.fulfill(topic2, 'thx2');

	pinki.vow.when(topic1, topic2).catch((error) => {
		t.is(error, 'noooooo');
		t.end();
	});
});






//-- Check check if `list` returns an array of strings
ava.test('Vow: `list` returns an array of strings', (t) => {
	return Promise.resolve().then(() => {
		const vows = pinki.vow.list;

		t.true(Array.isArray(vows));

		vows.forEach((vow) => {
			t.is(typeof vow, 'string');
		});
	});
});
