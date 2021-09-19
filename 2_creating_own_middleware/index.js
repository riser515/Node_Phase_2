const express = require('express');
const authApp = require('./auth');
const app = express();

app.use(express.urlencoded({extended: true}));
// app.use((req, res, next) => {
//     console.log("All done");
//     if(req.query.key === "admin123"){
//         next();
//     }
//     else{
//         res.send("Please check your key");
//     }
// });
app.use(authApp);

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