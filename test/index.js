//--------------------------------------------------------
//-- Tests
//--------------------------------------------------------
'use strict';

const tester        = require('@absolunet/tester');
const { ava: test } = tester;

const pinki  = require('../dist/node');


const randomTopic = () => {
	global.___randomTopic___ = global.___randomTopic___ || 'random--';
	global.___randomTopic___ += 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.charAt(Math.floor(Math.random() * 62));

	return global.___randomTopic___;
};






//-- Linter
tester.npmPackage.validateLibrary();






//-- Check direct pub/sub
test.cb('Message: Publish before subscribe and execute', (t) => {
	t.plan(2);

	const topic = randomTopic();

	pinki.message.publish(topic, 'thx');

	pinki.message.subscribe(topic, (message, data) => {
		t.is(message, topic);
		t.is(data, 'thx');
	});

	setTimeout(() => {
		t.end();
	}, 100);
});


test.cb('Message: Publish before subscribe and no execute', (t) => {
	t.plan(0);

	const topic = randomTopic();

	pinki.message.publish(topic, 'thx');

	pinki.message.subscribe(topic, (message, data) => {
		t.is(message, topic);
		t.is(data, 'thx');
	}, { executePrevious: false });

	setTimeout(() => {
		t.end();
	}, 100);
});


test.cb('Message: Publish after subscribe', (t) => {
	t.plan(2);

	const topic = randomTopic();

	pinki.message.subscribe(topic, (message, data) => {
		t.is(message, topic);
		t.is(data, 'thx');
	});

	pinki.message.publish(topic, 'thx');

	setTimeout(() => {
		t.end();
	}, 100);
});


test.cb('Message: Publish before and after subscribe and execute', (t) => {
	t.plan(4);

	const topic = randomTopic();

	pinki.message.publish(topic, 'thx');

	pinki.message.subscribe(topic, (message, data) => {
		t.is(message, topic);
		t.true(data === 'thx' || data === 'thx2');
	});

	pinki.message.publish(topic, 'thx2');

	setTimeout(() => {
		t.end();
	}, 100);
});


test.cb('Message: Publish before and after subscribe and no execute', (t) => {
	t.plan(2);

	const topic = randomTopic();

	pinki.message.publish(topic, 'thx');

	pinki.message.subscribe(topic, (message, data) => {
		t.is(message, topic);
		t.true(data === 'thx2');
	}, { executePrevious: false });

	pinki.message.publish(topic, 'thx2');

	setTimeout(() => {
		t.end();
	}, 100);
});






//-- Check hierarchical addressing pub/sub
test.cb('Message: Hierarchical publish before subscribe and execute', (t) => {
	t.plan(2);

	const topic    = randomTopic();
	const subTopic = `${topic}.alpha`;

	pinki.message.publish(subTopic, 'thx');

	pinki.message.subscribe(topic, (message, data) => {
		t.is(message, subTopic);
		t.is(data, 'thx');
	});

	setTimeout(() => {
		t.end();
	}, 100);
});


test.cb('Message: Hierarchical publish before subscribe and no execute', (t) => {
	t.plan(0);

	const topic    = randomTopic();
	const subTopic = `${topic}.alpha`;

	pinki.message.publish(subTopic, 'thx');

	pinki.message.subscribe(topic, (message, data) => {
		t.is(message, subTopic);
		t.is(data, 'thx');
	}, { executePrevious: false });

	setTimeout(() => {
		t.end();
	}, 100);
});


test.cb('Message: Hierarchical publish after subscribe', (t) => {
	t.plan(2);

	const topic    = randomTopic();
	const subTopic = `${topic}.alpha`;

	pinki.message.subscribe(topic, (message, data) => {
		t.is(message, subTopic);
		t.is(data, 'thx');
	});

	pinki.message.publish(subTopic, 'thx');

	setTimeout(() => {
		t.end();
	}, 100);
});


test.cb('Message: Hierarchical publish before and after subscribe and execute', (t) => {
	t.plan(4);

	const topic    = randomTopic();
	const subTopic = `${topic}.alpha`;

	pinki.message.publish(subTopic, 'thx');

	pinki.message.subscribe(topic, (message, data) => {
		t.is(message, subTopic);
		t.true(data === 'thx' || data === 'thx2');
	});

	pinki.message.publish(subTopic, 'thx2');

	setTimeout(() => {
		t.end();
	}, 100);
});


test.cb('Message: Hierarchical publish before and after subscribe and no execute', (t) => {
	t.plan(2);

	const topic    = randomTopic();
	const subTopic = `${topic}.alpha`;

	pinki.message.publish(subTopic, 'thx');

	pinki.message.subscribe(topic, (message, data) => {
		t.is(message, subTopic);
		t.true(data === 'thx2');
	}, { executePrevious: false });

	pinki.message.publish(subTopic, 'thx2');

	setTimeout(() => {
		t.end();
	}, 100);
});






//-- Check check if `list` returns an array of object
test('Message: `list` returns an array of object', (t) => {
	return Promise.resolve().then(() => {
		const messages = pinki.message.list;

		t.true(Array.isArray(messages));

		messages.forEach((vow) => {
			t.is(typeof vow, 'object');
		});
	});
});






//-- Validate vow names
test('Vow: Check for invalid vow characters', (t) => {
	const invalid = `/=!@#$%?&*()_+|¡@£€∞ {}[]¬^¨~;:°«»,'"<>àÀâÂçÇéÉèÈëËêÊôÔüÜùÙ\\`.split('');

	invalid.forEach((char) => {
		const name = `invalid--${char}`;
		const error = t.throws(() => {
			pinki.vow.when(name);
		}, Error);

		t.is(error.message, `pinki: Invalid vow name '${name}'`);
	});
});


test('Vow: Check for valid vow characters', (t) => {
	const valid = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-.`.split('');

	valid.forEach((char) => {
		pinki.vow.when(`valid--${char}`);
	});

	t.pass();
});






//-- Check single `when`
test.cb('Vow: Single `when` with `fulfill` after', (t) => {
	const topic = randomTopic();

	pinki.vow.when(topic).then((data) => {
		t.is(data, 'thx');
		t.end();
	});

	pinki.vow.fulfill(topic, 'thx');
});


test.cb('Vow: Single `when` with `fulfill` before', (t) => {
	const topic = randomTopic();

	pinki.vow.fulfill(topic, 'thx');

	pinki.vow.when(topic).then((data) => {
		t.is(data, 'thx');
		t.end();
	});
});


test.cb('Vow: Single `when` with `break` after', (t) => {
	const topic = randomTopic();

	pinki.vow.when(topic).catch((error) => {
		t.is(error, 'noooooo');
		t.end();
	});

	pinki.vow.break(topic, 'noooooo');
});


test.cb('Vow: Single `when` with `break` before', (t) => {
	const topic = randomTopic();

	pinki.vow.break(topic, 'noooooo');

	pinki.vow.when(topic).catch((error) => {
		t.is(error, 'noooooo');
		t.end();
	});
});






//-- Check multiple `when` with `fulfill` */
test.cb('Vow: Multiple `when` with `fulfill` after', (t) => {
	const topic1 = randomTopic();
	const topic2 = randomTopic();

	pinki.vow.when([topic1, topic2]).then(([data1, data2]) => {
		t.is(data1, 'thx1');
		t.is(data2, 'thx2');
		t.end();
	});

	pinki.vow.fulfill(topic1, 'thx1');
	pinki.vow.fulfill(topic2, 'thx2');
});


test.cb('Vow: Multiple `when` with `fulfill` before/after', (t) => {
	const topic1 = randomTopic();
	const topic2 = randomTopic();

	pinki.vow.fulfill(topic1, 'thx1');

	pinki.vow.when([topic1, topic2]).then(([data1, data2]) => {
		t.is(data1, 'thx1');
		t.is(data2, 'thx2');
		t.end();
	});

	pinki.vow.fulfill(topic2, 'thx2');
});


test.cb('Vow: Multiple `when` with `fulfill` before', (t) => {
	const topic1 = randomTopic();
	const topic2 = randomTopic();

	pinki.vow.fulfill(topic1, 'thx1');
	pinki.vow.fulfill(topic2, 'thx2');

	pinki.vow.when([topic1, topic2]).then(([data1, data2]) => {
		t.is(data1, 'thx1');
		t.is(data2, 'thx2');
		t.end();
	});

});






//-- Check multiple `when` with `break`
test.cb('Vow: Multiple `when` with `break` after', (t) => {
	const topic1 = randomTopic();
	const topic2 = randomTopic();

	pinki.vow.when([topic1, topic2]).catch((error) => {
		t.is(error, 'noooooo');
		t.end();
	});

	pinki.vow.break(topic1, 'noooooo');
	pinki.vow.break(topic2, 'noooooo');
});


test.cb('Vow: Multiple `when` with `break` before/after', (t) => {
	const topic1 = randomTopic();
	const topic2 = randomTopic();

	pinki.vow.break(topic1, 'noooooo');

	pinki.vow.when([topic1, topic2]).catch((error) => {
		t.is(error, 'noooooo');
		t.end();
	});

	pinki.vow.break(topic2, 'noooooo');
});


test.cb('Vow: Multiple `when` with `break` before', (t) => {
	const topic1 = randomTopic();
	const topic2 = randomTopic();

	pinki.vow.break(topic1, 'noooooo');
	pinki.vow.break(topic2, 'noooooo');

	pinki.vow.when([topic1, topic2]).catch((error) => {
		t.is(error, 'noooooo');
		t.end();
	});

});






//-- Check multiple `when` with `fulfill` and `break`
test.cb('Vow: Multiple `when` with `fulfill`/`break` after', (t) => {
	const topic1 = randomTopic();
	const topic2 = randomTopic();

	pinki.vow.when([topic1, topic2]).catch((error) => {
		t.is(error, 'noooooo');
		t.end();
	});

	pinki.vow.fulfill(topic1, 'thx1');
	pinki.vow.break(topic2, 'noooooo');
});


test.cb('Vow: Multiple `when` with `break`/`fulfill` after', (t) => {
	const topic1 = randomTopic();
	const topic2 = randomTopic();

	pinki.vow.when([topic1, topic2]).catch((error) => {
		t.is(error, 'noooooo');
		t.end();
	});

	pinki.vow.break(topic1, 'noooooo');
	pinki.vow.fulfill(topic2, 'thx2');
});


test.cb('Vow: Multiple `when` with `fulfill` before and `break` after', (t) => {
	const topic1 = randomTopic();
	const topic2 = randomTopic();

	pinki.vow.fulfill(topic1, 'thx1');

	pinki.vow.when([topic1, topic2]).catch((error) => {
		t.is(error, 'noooooo');
		t.end();
	});

	pinki.vow.break(topic2, 'noooooo');
});


test.cb('Vow: Multiple `when` with `break` before and `fulfill` after', (t) => {
	const topic1 = randomTopic();
	const topic2 = randomTopic();

	pinki.vow.break(topic1, 'noooooo');

	pinki.vow.when([topic1, topic2]).catch((error) => {
		t.is(error, 'noooooo');
		t.end();
	});

	pinki.vow.fulfill(topic2, 'thx2');
});


test.cb('Vow: Multiple `when` with `fulfill`/`break` before', (t) => {
	const topic1 = randomTopic();
	const topic2 = randomTopic();

	pinki.vow.fulfill(topic1, 'thx1');
	pinki.vow.break(topic2, 'noooooo');

	pinki.vow.when([topic1, topic2]).catch((error) => {
		t.is(error, 'noooooo');
		t.end();
	});
});


test.cb('Vow: Multiple `when` with `break`/`fulfill` before', (t) => {
	const topic1 = randomTopic();
	const topic2 = randomTopic();

	pinki.vow.break(topic1, 'noooooo');
	pinki.vow.fulfill(topic2, 'thx2');

	pinki.vow.when([topic1, topic2]).catch((error) => {
		t.is(error, 'noooooo');
		t.end();
	});
});






//-- Check check if `list` returns an array of strings
test('Vow: `list` returns an array of strings', (t) => {
	return Promise.resolve().then(() => {
		const vows = pinki.vow.list;

		t.true(Array.isArray(vows));

		vows.forEach((vow) => {
			t.is(typeof vow, 'string');
		});
	});
});
