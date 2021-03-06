// Load modules
let fs = require( 'fs' );
let rfs = require( 'rotating-file-stream' );
let morganLogger = require( 'morgan' );
let shell = require( 'shelljs' );

class Logger {
    constructor(logDir) {
        // Ensure the existence of logDir
        this.logDir = ensureDirectoryExists( logDir );

        // Format string of predefined tokens
        this.token = ':method :url :status :response-time ms :res[content-length] :date';
        morganLogger.token( 'date', getLocaleDate );
    }

    get access() {
        return morganLogger( this.token, {
            stream: rfs( 'access.log', {
                interval: '1d', // rotate daily
                path: this.logDir
            } )
        } );
    }

    get error() {
        return morganLogger( this.token, {
            skip: (req, res) => res.statusCode < 400,
            stream: rfs( 'error.log', {
                interval: '1d',
                path: this.logDir
            } )
        } );
    }
}

function ensureDirectoryExists(dir) {
    fs.existsSync( dir ) || shell.mkdir( '-p', dir );
    return dir;
}

// Get us locale date
function getLocaleDate(req, res) {
    let locale = 'en-us';
    let p = new Date();
    let time = p.toLocaleTimeString( locale );
    let date = p.toLocaleDateString( locale );
    return time + ' ' + date;
}

module.exports = Logger;