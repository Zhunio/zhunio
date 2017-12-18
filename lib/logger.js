// Load modules
let fs = require( 'fs' );
let path = require( 'path' );
let rfs = require( 'rotating-file-stream' );
let morganLogger = require( 'morgan' );

class Logger {
    logDir;
    token;

    constructor(logDir) {
        this.logDir = ensureDir(logDir);
        this.setup();
    }
    get access() {
        return morganLogger( token, {
            stream: rfs( 'access.log', {
                interval: '1d', // rotate daily
                path: this.logDir
            } )
        } );
    }

    get error() {
        return morganLogger( token, {
            skip: (req, res) => res.statusCode < 400,
            stream: rfs( 'error.log', {
                interval: '1d',
                path: this.logDir
            } )
        } );
    }

    setup() {
        // Format string of predefined tokens
        this.token = ':method :url :status :response-time ms :res[content-length] :date';
        morganLogger.token( 'date', getLocaleDate );
    }
}


// Ensures the existence of the dir directory
function ensureDir(dir) {
    fs.existsSync( dir ) || fs.mkdirSync( dir );
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