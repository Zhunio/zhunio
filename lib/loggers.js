// Load modules
let fs = require( 'fs' );
let path = require( 'path' );
let rfs = require( 'rotating-file-stream' );
let morganLogger = require( 'morgan' );

// Logs directory file path
let logs = path.join( __dirname, '../', 'logs' );

// Ensure log directory exists
logs = ensureLogDirectory( logs );

// Ensure web file exists
let logsWeb = ensureFile( logs, 'web' );

// Format string of predefined tokens
let token = ':method :url :status :response-time ms :res[content-length] :date';
morganLogger.token( 'date', getLocaleDate );

// Create access log for each day
let accessLogStream = morganLogger( token, {
    stream: rfs( 'access.log', {
        interval: '1d', // rotate daily
        path: logsWeb
    } )
} );

// Create error log for each day
let errorLogStream = morganLogger( token, {
    skip: (req, res) => res.statusCode < 400,
    stream: rfs( 'error.log', {
        interval: '1d',
        path: logsWeb
    } )
} );

// Define loggers library
let loggers = {
    access: accessLogStream,
    error: errorLogStream
};

module.exports = loggers;

// Ensure the existence of the logs directory
function ensureLogDirectory(logPath) {
    fs.existsSync( logPath ) || fs.mkdirSync( logPath );
    return logPath;
}

// Ensure the existence of filename inside logPath
function ensureFile(logPath, filename) {
    let filepath = path.join( logPath, filename );
    fs.existsSync( logPath ) || fs.mkdirSync( logPath );
    return filepath;
}

// Get us locale date
function getLocaleDate(req, res) {
    let locale = 'en-us';
    let p = new Date();
    let time = p.toLocaleTimeString( locale );
    let date = p.toLocaleDateString( locale );
    return time + ' ' + date;
}