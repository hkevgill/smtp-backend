// load modules
var express     = require('express');
var app         = express();
var mongoose    = require('mongoose');
var SMTPServer  = require('smtp-server').SMTPServer;
var Email       = require('./models/email');
var uuid        = require('node-uuid');

mongoose.connect('mongodb://hkevgill:pass123@ds037145.mlab.com:37145/hkevgill');

var server = new SMTPServer({

    disabledCommands: ['STARTTLS'],

    allowInsecureAuth: true,

    secure: false,

    logger:true,

    onAuth: function(auth, session, callback){
        console.log('AUTHED!!!!!!!!');
    },

    onData: function (stream, session, callback) {
        console.log('Here?');
        stream.pipe(process.stdout);
        stream.on('end', function () {

            email = new Email();

            email.key = uuid.v4();

            // Add rest of email data here

            email.save(function (err) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.json({message: 'Email created!'});
                }
            });

            callback(null, ''); // accept the message once the stream is ended
        });
    } 
});

server.on('error', function (err) {
    console.log('Error occurred');
    console.log(err);
});

server.listen(1025);
