# zhunio

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]
[![Gratipay][gratipay-image]][gratipay-url]

Zhunio's library for Node.js

## API

<!-- eslint-disable no-unused-vars -->

```js
var zhunio = require('zhunio')
```

The `zhunio` var is an object that contains two properties: `errors`, and `loggers`.

### zhunio.errors

```js
var errors = zhunio.errors
```

The `errors` object contains two HTTP request middleware functions: `catch`, and `handler`. The `catch` middleware function catches any HTTP request error. The `handler` middleware funtion handles any HTTP request error.

```js
var express = require('express')
var zhunio = require('zhunio')
app = express()

// Error catching, and handling
app.use(zhunio.errors.catch)
app.use(zhunio.errors.handler)
```

### zhunio.loggers

```js
var loggers = zhunio.loggers
```

The `loggers` object contains two HTTP request middleware functions: `error`, and `access`. The `error` middleware function logs any HTTP request error. The `access` middleware funtion logs any HTTP request access.

```js
var express = require('express')
var zhunio = require('zhunio')
app = express()

// Access logging
app.use(zhunio.loggers.access)

// Error logging, catching, and handling
app.use(zhunio.loggers.error)
app.use(zhunio.errors.catch)
app.use(zhunio.errors.handler)
```
