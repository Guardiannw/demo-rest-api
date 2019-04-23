const uuid = require('uuid/v4');
const express = require('express');
const app = express();

const STORE = {
    users: [
        {
            id: uuid(),
            name: 'Timmy',
            age: 15,
            gender: 'Male'
        },
        {
            id: uuid(),
            name: 'Pam',
            age: 14,
            gender: 'Female'
        },
        {
            id: uuid(),
            name: 'Sally',
            age: 25,
            gender: 'Female'
        },
        {
            id: uuid(),
            name: 'Jimmy',
            age: 18,
            gender: 'Male'
        },
        {
            id: uuid(),
            name: 'Bob',
            age: 33,
            gender: 'Male'
        }
    ]
}

app.use(express.static('public'));

app.get('/users', (req, res) => {
    res.send(STORE.users);
});

app.delete('/users/:id', (req, res) => {
    const id = req.params.id;

    try {
        if (!STORE.users.find((user) => user.id === id))
            throw Error('No user exists for given id.');

        STORE.users = STORE.users.filter((user) => user.id !== id);

        res.sendStatus(200);
    } catch (err) {
        res.status(400).send(err.message);
    }

});

app.listen(8080);