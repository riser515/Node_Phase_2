const express = require('express');
const app = express();

app.use(express.json());
// app.use(express.urlencoded({extended: true}));

const users = [
    {id: 1, name: "ABC", age: 20},
    {id: 2, name: "BCD", age: 21},
    {id: 3, name: "CDE", age: 22},
    {id: 4, name: "DEF", age: 23}
];

app.get('/', (req, res) => {
    res.send("Homepage");
})

app.get('/api/users', (req, res) => {
    res.send(users);
})

app.post('/api/users', (req, res) => {
    const user = {
        id: users.length + 1,
        name: req.body.name,
        age: req.body.age
    };
    users.push(user);
    res.send(user);
})

app.listen(2000, () => console.log("Connected"));