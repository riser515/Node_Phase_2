const express = require('express');
const htmlDebugger = require('debug')('myfirstapp:html');
const APIDebugger = require('debug')('myfirstapp:api');
const morgan = require('morgan');
const config = require('config');
const path = require('path');
const app = express();

console.log("App Name : " + config.get('name'));
console.log("App URL Host Name : " + config.get('url.host'));
// console.log("App Password : " + config.get('url.password'));

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    htmlDebugger("You are in development environment of HTML Debug");
    APIDebugger("You are in development environment of API Debug");
}
else{
    app.use((req, res, next) => {
        if(req.query.pwd === 'admin'){
            next();
        }
        else{
            res.send('Check your password');
        }
    })
}

app.use(express.urlencoded({extended: true}));

const users = [
    {id: 1, name: "ABC", age: 20},
    {id: 2, name: "BCD", age: 21},
    {id: 3, name: "CDE", age: 22},
    {id: 4, name: "DEF", age: 23}
];

app.get('/', (req, res) => {
    res.send("Hello Node");
    htmlDebugger("HTML Homepage");
    APIDebugger("API Homepage");
});

app.get('/api/users', (req, res) => {
    res.send(users);
    htmlDebugger("HTML Users");
    APIDebugger("API Users");
});

app.post('/api/users', (req, res) => {
    const user = {
        id: users.length + 1,
        name: req.body.name,
        age: req.body.age
    };
    res.send(user);
    users.push(user);
});

app.listen(2000, () => console.log("Connected " + app.get('env') + " " + process.env.DEBUG));