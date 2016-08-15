/**
 * Created by albertoclarit on 8/5/16.
 */
var express = require('express');

var app = express();

app.use('/images',express.static('images'));
app.use(express.static('./build'));


var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening at http://%s:%s', host, port);
});
