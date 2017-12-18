# zhunio

Zhunio's library for Node.js

## API

<!-- eslint-disable no-unused-vars -->

```js
var zhunio = require('zhunio')
```

The `zhunio` var is an object that contains two properties: `Err`, and `Logger`.

### zhunio.Err

```js
var Err = zhunio.Err
```

The `Err` object contains two HTTP request middleware functions: `catch`, 
and `handler`. The `catch` middleware function catches any HTTP request error. 
The `handler` middleware function handles any HTTP request error.

```js
var express = require('express')
var zhunio = require('zhunio')
app = express()

// Err object
var Err = zhunio.Err

// Error catching, and handling
app.use(Err.catch)
app.use(Err.handler)
```

### zhunio.Logger(path)

```js
var path = require('path')

// Path to logs directory
var web = path.join(__dirname, 'logs')

var Logger = zhunio.Logger(web)
```

The `Logger` function receives a path to the directory that will contain the logs.
It returns a Logger that contains contains two HTTP request middleware functions: 
`error`, and `access`. The `error` middleware function logs any HTTP request error. 
The `access` middleware funtion logs any HTTP request access.

### Full example

```js
var express = require('express')
var zhunio = require('zhunio')
var path = require('path')

// Path to logs directory
var web = path.join(__dirname, 'logs')
var Logger = zhunio.Logger(web)

// Create express app
app = express()

// Access logging
app.use(Logger.access)

// Err object
var Err = zhunio.Err

// Error logging, catching, and handling
app.use(Logger.error)
app.use(Err.catch)
app.use(Err.handler)
```
