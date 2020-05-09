const express = require('express');
const shortid = require('shortid');

const server = express();

server.use(express.json());

let users = [];

server.get('/', (req, res) => {
    res.json({message:'Server running'})
})

const PORT = 5000;

server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});

//--------------------
    //Create
//--------------------
server.post('/api/users', (req, res) => {
    
    const { name, bio } = req.body;        

    if (!name || !bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        const id = shortid.generate();
        const user = {
            id,
            name,
            bio
        }
        users.push(user);
        res.status(201).json(user);
    }
})

//--------------------
    //Read
//--------------------
server.get('/api/users', (req, res) => {

    if (res) {
        res.status(200).json(users);
    } else {
        res.status(500).json({ errorMessage: "The users information could not be retrieved." })
    }    
})

//--------------------
    //Read - get:id
//--------------------
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    let found = users.find(user => user.id === id);

    if (found) {
        res.status(200).json(found);
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
    }
})

//--------------------
    //Update - patch
//--------------------
server.patch('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    let found = users.find(user => user.id === id);

    if (found) {
        Object.assign(found, changes);
        res.status(200).json(found);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
})

//--------------------
    //Update - put
//--------------------
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, bio } = req.body;

    // Combines the two lines above by futher destructuring the req
    // ({params: {id}, body: {name, bio}}, res) => {}

    let index = users.findIndex(user => user.id === id);

    if (index !== -1) {

        if (!name || !bio) {
            res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
        } else {
            users[index] = {
                id,
                name,
                bio
            };
            res.status(200).json(users[index]);
        }

    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
    }
})

//--------------------
    //Delete
//--------------------
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);

    const found = users.find( user => user.id === id);

    if(found) {
        users = users.filter(user => user.id !== id);
        res.status(200).json(found);
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
    }

    res.status(200).json({ message: 'A response' });
})