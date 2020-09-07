import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';
import path from 'path';
import commonRoutes from './routes/common.server.route';
var cookieParser = require('cookie-parser');

// define our app using express
const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Origin, Expires, Authorization, Accept, Cache-Control, Pragma");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
})

// configure app
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));


app.use(function (req, res, next) {
    var token = req.headers['authorization'];
    if (!token) {
        req.user = undefined;
        next();
    }
    else {
        token = token.replace('bearer ', '');
        jwt.verify(token, 'llp', function (err, decode) {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        });

    }
});

const port = process.env.PORT || 9999;
app.use('/api', commonRoutes
);
app.get('/', (req, res) => {
    return res.end('Api working');
});
app.use((req, res, next) => {
    res.status(404).send('<h2 align=center>Page Not Found!</h2>');
});
app.listen(port, () => {
    console.log(`App Server Listening at ${port}`);
});