// Load user defined libraries
const Err = require( './error' );
const Logger = require( './logger' );

// Define this library
const library = {
    Err,
    Logger: dir => new Logger(dir)
};

module.exports = library;