<p align="center">
	<img src="https://github.com/absolunet/pinki/raw/master/ressources/pinki.png" width="250" height="250" alt="pinki">
</p>

# pinki
[![npm](https://img.shields.io/npm/v/@absolunet/pinki.svg)](https://www.npmjs.com/package/@absolunet/pinki)
[![npm dependencies](https://david-dm.org/absolunet/pinki/status.svg)](https://david-dm.org/absolunet/pinki)
[![npms](https://badges.npms.io/%40absolunet%2Fpinki.svg)](https://npms.io/search?q=%40absolunet%2Fpinki)
[![Travis CI](https://api.travis-ci.org/absolunet/pinki.svg?branch=master)](https://travis-ci.org/absolunet/pinki/builds)
[![Code style ESLint](https://img.shields.io/badge/code_style-@absolunet/library-659d32.svg)](https://github.com/absolunet/eslint-config)


#### Pinky Promises
> Asynchronous libraries wrapper


## Dependencies / Implements
- [PubSubJS](https://github.com/mroderick/PubSubJS) - Dependency free publish/subscribe for JavaScript
- [RSVP.js](https://github.com/tildeio/rsvp.js) - A tiny implementation of Promises/A+ with deferred objects


## Install

```shell
$ npm install @absolunet/pinki
```

## Usage

```js
// Node.js
const pinki = require('@absolunet/pinki');

// Browser - Load vendor libraries
// - /node_modules/pubsub-js/src/pubsub.js
// - /node_modules/rsvp/dist/rsvp.js
const { pinki } = window;


// Messages
pinki.message.publish('alpha', 'Yeah!');

pinki.message.subscribe('alpha', (data) => {
	console.log(data);
});

setTimeout(() => {
	pinki.message.publish('alpha', 'Yessir!');
}, 100);


// Outputs:
// Yeah!
// Yessir!




pinki.vow.fulfill('gamma', 'Yeah!');


pinki.vow.when('gamma').then((data) => {
	console.log(data);
});

pinki.vow.when(['gamma', 'delta']).then(([dataC, dataD]) => {
	console.log(dataC, dataD);
});


setTimeout(() => {
	pinki.vow.fulfill('delta', 'Yessir!');
}, 100);


// Outputs:
// 'Yeah!'
// { gamma:'Yeah!', delta:'Yessir!' }
```


<br>

## API - Messages

### message.subscribe(topic, subscriber *[, options]*)
Wraps [`PubSub.subscribe`](https://github.com/mroderick/PubSubJS#basic-example), but also executes previously published messages that matches the subscription.

#### options.executePrevious
Type: `Boolean`<br>
Default: `true`<br>
Execute previously published messages.


### message.publish(topic, data)
Wraps [`PubSub.publish`](https://github.com/mroderick/PubSubJS#basic-example).

### message.unsubscribe(topic|token)
Maps [`PubSub.unsubscribe`](https://github.com/jprichardson/node-fs-extra/blob/master/docs/copy-sync.md).




<br>

## API - Vows
**Vows** are name-based Promises that can be referenced anytime.

### vow.list
Vows than have been registered.

### vow.when(names)
Returns a Promise if one vow given or a [`RSVP.all`](https://github.com/tildeio/rsvp.js/#arrays-of-promises) Promise which reacts when all vows are fulfilled or one is broken if multiple vows are given.

#### names
Type: `String` or `Array`<br>
One or multiple vow names



### vow.fulfill(name, data)
Resolve the underlying Promise.

#### name
Type: `String`<br>
Vow name

#### data
Type: `<any>`<br>
Data to resolve the underlying Promise with



### vow.break(name, error)
Reject the underlying Promise.

#### name
Type: `String`<br>
Vow name

#### error
Type: `String`<br>
Error message to reject the underlying Promise with






<br>

## License
MIT © [Absolunet](https://absolunet.com)


*“[Pinky Finger](https://thenounproject.com/term/pinky-finger/947218)” icon by [Mitchell D. Eva](https://www.mitchelleva.com) from [the Noun Project](https://thenounproject.com).*
