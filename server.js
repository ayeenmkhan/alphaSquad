const path = require('path');
const express = require('express');
var bodyParser = require('body-parser')
var cors = require('cors')
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
let tokenMiddleware = require('./middleware/authentication/jwt');
dotenv.config({ path: './config/config.env' });

connectDB();
const app = express();
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())

const meetings = require('./routes/meeting/meetings');
const token = require('./routes/token');
const zoom = require('./routes/meeting/zoom');
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
// app.use('/api/v1/transactions', trnasactions);
app.use('/api/v1/meeting',tokenMiddleware, meetings);

app.use('/api/v1/gen_token',token);
app.use(zoom);


// Configuration for deploymnet of on server and run on one port
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server running  in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));