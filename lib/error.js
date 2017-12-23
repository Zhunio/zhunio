let fs = require( 'fs' );

let Err = {

    /* catch 404 and forward to error handler */
    catch(req, res, next) {
        let err = new Error( 'Not Found' );
        err.status = 404;
        next( err );
    },
    /* error handler */
    handle(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get( 'env' ) === 'development' ? err : {};

        // render the error page
        res.status( err.status || 500 );
        res.render('error');
    }
};

module.exports = Err;