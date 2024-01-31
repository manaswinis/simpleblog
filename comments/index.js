const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

// get all comments for a post id
app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

// create a new comment for a post id
app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(6).toString('hex');
    const { content } = req.body;
    const comments = commentsByPostId[req.params.id] || [];
    comments.push({ id: commentId, content });
    commentsByPostId[req.params.id] = comments;
    res.status(201).send(comments);
});


app.listen(4001, () => {
    console.log('Listening on 4001');
});