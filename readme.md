# @absolunet/pinki

[![NPM version](https://img.shields.io/npm/v/@absolunet/pinki.svg)](https://www.npmjs.com/package/@absolunet/pinki)
[![Dependencies](https://david-dm.org/absolunet/pinki/status.svg)](https://david-dm.org/absolunet/pinki)

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


pinki.fulfillVow('alpha', 'Yeah!');

pinki.whenVows('alpha', 'beta').then((data) => {
	console.log(data);
});

setTimeout(() => {
	pinki.fulfillVow('beta', 'Yessir!');
}, 100);


// Outputs:
// { alpha:'Yeah!', beta:'Yessir!' }
```


<br>

## API - Libraries mapping

### subscribe(topic, subscriber)
Maps [`PubSub.subscribe`](https://github.com/mroderick/PubSubJS#basic-example).

### publish(topic, data)
Maps [`PubSub.publish`](https://github.com/mroderick/PubSubJS#basic-example).

### unsubscribe(topic|token)
Maps [`PubSub.unsubscribe`](https://github.com/jprichardson/node-fs-extra/blob/master/docs/copy-sync.md).

### Promise
Maps [`RSVP.Promise`](https://github.com/tildeio/rsvp.js#basic-usage).



<br>

## API - Vows
*Vows* are name-based Promises that can be referenced anytime.

### vows
Array of vow names than have been referenced by one of the methods.

### whenVows(...names)
Returns a [`RSVP.hash`](https://github.com/tildeio/rsvp.js#hash-of-promises) Promise which reacts when all vows are fulfilled or broken.

### fulfillVow(name, data)
Resolves the underlying Promise of the vow.

### breakVow(name, error)
Rejects the underlying Promise of the vow.



<br>

## License

MIT © [Absolunet](https://absolunet.com)
