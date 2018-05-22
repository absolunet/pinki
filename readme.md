<p align="center">
	<img src="https://github.com/absolunet/pinki/raw/master/ressources/pinki.png" width="250" height="250" alt="pinki">
</p>

# pinki
[![NPM version](https://img.shields.io/npm/v/@absolunet/pinki.svg)](https://www.npmjs.com/package/@absolunet/pinki)
![Bower version](http://img.shields.io/bower/v/pinki.svg?style=flat)
[![Travis build](https://api.travis-ci.org/absolunet/pinki.svg?branch=master)](https://travis-ci.org/absolunet/pinki/builds)
[![Dependencies](https://david-dm.org/absolunet/pinki/status.svg)](https://david-dm.org/absolunet/pinki)
#### Pinky Promises
> Asynchronous libraries wrapper


## Dependencies / Implements
- [PubSubJS](https://github.com/mroderick/PubSubJS) - Dependency free publish/subscribe for JavaScript
- [RSVP.js](https://github.com/tildeio/rsvp.js) - A tiny implementation of Promises/A+


## Install

```shell
$ npm install @absolunet/pinki
```

or

```shell
$ bower install pinki
```


## Usage

```js
// Node.js
const { pinki } = require('pinki');

// Browser
// Load PubSubJs via bower_components
// Load RSVP via vendor/rsvp.js or CDN
const { pinki } = window;


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

pinki.vow.when('gamma', 'delta').then(([dataA, dataB]) => {
	console.log(dataA, dataB);
});

setTimeout(() => {
	pinki.vow.fulfill('delta', 'Yessir!');
}, 100);


// Outputs:
// { gamma:'Yeah!', delta:'Yessir!' }
```


<br>

## API - Libraries mapping

### Promise
Maps [`RSVP.Promise`](https://github.com/tildeio/rsvp.js#basic-usage).



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
Array of vow names than have been registered by one of the methods.

### vow.when(name1 *[, name2, nameN...]*)
Returns a [`RSVP.all`](https://github.com/tildeio/rsvp.js/#arrays-of-promises) Promise which reacts when all vows are fulfilled or one is broken.

### vow.fulfill(name, data)
Resolves the underlying Promise.

### vow.break(name, error)
Rejects the underlying Promise.



<br>

## License
MIT © [Absolunet](https://absolunet.com)


*“[Pinky Finger](https://thenounproject.com/term/pinky-finger/947218)” icon by [Mitchell D. Eva](https://www.mitchelleva.com) from [the Noun Project](https://thenounproject.com).*
