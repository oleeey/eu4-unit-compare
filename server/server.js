var express = require('express');
var app = express();
var cors = require('cors');

app.use(cors())

const fs = require('fs')
const csv = require('fast-csv');
const data = []


let inf = [fs.createReadStream('./data/inf.csv'), '/inf'];
let cav = [fs.createReadStream('./data/cav.csv'), '/cav'];

function getData(data) {
    data[0]
    .pipe(csv.parse({}))
    .on('error', error => console.error(error))
    .on('data', row => data.push(row))
    .on('end', () => app.get(data[1], function (req, res) {
                        res.json({
                            data
                        })
                    }));

                    app.get('/', function (req, res) {
                        
                    });
}

getData(inf);
getData(cav);

var server = app.listen(5000, function () {
    console.log('Server is running..');
});














