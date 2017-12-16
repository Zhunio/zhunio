// Load user defined libraries
const errors = require( './errors' );
const loggers = require( './loggers' );

// Define this library
const library = {
    errors: errors,
    loggers: loggers
};

module.exports = library;