const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const { connectToMongodb } = require('./config');
const userRoutes = require('./routes/userRoutes');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Connect to MongoDB
connectToMongodb('mongodb://localhost:27017/chatapp');

// Socket.io
io.on('connection', (socket) => {
    socket.on('user-message', ({ message, fromLang, senderSocketId, username }) => {
        console.log("Received message:", message);
        // Broadcast the message to all clients
        io.emit('message', { message, fromLang, senderSocketId, username });
    });
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/', (req, res) => {
    res.render('login');
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

app.use('/', userRoutes);

// Listening
const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
