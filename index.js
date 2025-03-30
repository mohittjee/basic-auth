const express = require('express');
const app = express();
app.use(express.json());

const jwt = require('jsonwebtoken');

const users = [];

const JWT_SECRET = "your_jwt_secret";

// const generateToken = () => {
//     return Math.random().toString(36).substr(2);
// };

app.post('/signup', (req, res) => {
    console.log(req.body);  
    const username = req.body?.username;
    const password = req.body?.password;
    users.find(user => {
        if (user.username === username) {
            return res.status(400).send('User already exists');
        }
    });
    if (!username || !password) {
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
        token = jwt.sign({
            username: user.username
        }, JWT_SECRET);
        // user.token = token;
        console.log(users)

        return res.status(200).send(token);

    } else {
        return res.status(401).send('User not authenticated');
    }
});


app.get('/me', (req, res) => {
    const token = jwt.verify(req.headers.authorization, JWT_SECRET) || '';
    console.log(token)

    const user = users.find(user => user.username === token.username);
    if (user) {
        return res.status(200).send(user.username);
    } else {
        return res.status(401).send('User not authenticated');
    }
}
);

app.listen(3000);