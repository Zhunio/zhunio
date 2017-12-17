// Load user defined libraries
const Err = require( './error' );
const Logger = require( './logger' );

// Define this library
const library = {
    Err: Err,
    Logger: Logger
};

module.exports = library;