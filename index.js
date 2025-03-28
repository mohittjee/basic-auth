const express = require('express');
const app = express();
app.use(express.json());

const users = [];

const generateToken = () => {
    return Math.random().toString(36).substr(2);
};

app.post('/signup', (req, res) => {
    const username = req.body?.username;
    const password = req.body?.password;
    users.find(user => {
        if (user.username === username) {
            return res.status(400).send('User already exists');
        }
    });
    if(!username || !password) {
        return res.status(400).send('Username or password missing');
    }
    users.push({ username, password });
    console.log(users)
    res.status(201).send('User created');
});

app.post('/signin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        token = generateToken();
        user.token = token;
        console.log(users)

        return res.status(200).send(token);
        
    } else {
        return res.status(401).send('User not authenticated');
    }
});


app.get('/me', (req, res) => {
    const token = req.headers.authorization = req.headers.authorization || '';
    const user = users.find(user => user.token === token);
    if (user) {
        return res.status(200).send(user.username);
    } else {
        return res.status(401).send('User not authenticated');
    }
}
);

app.listen(3000);