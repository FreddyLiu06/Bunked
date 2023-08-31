require('dotenv').config();
// import modules
const express = require('express');
const mongoose  = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session)
const tf = require('@tensorflow/tfjs')
const encoder = require('@tensorflow-models/universal-sentence-encoder') // to load text encoder model

// app
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// db
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("DB CONNECTED"))
.catch((err) => console.log("DB CONNECTION ERROR", err));

// setting up connect-mongodb-session store
const mongoDBstore = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'userSessions',
})

app.use(session({
    secret: 'catLabyrinthMonke2212',
    name: 'session-id', 
    store: mongoDBstore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 3.5,
      sameSite: 'lax',
      HTTPonly: true,
      secure: false,
    },
    resave: true,
    saveUninitialized: false,
}));

// middleware
app.use(morgan("dev"));
app.use(cors({origin: true, credentials: true}));

// routes
const userRoutes = require('./routes/user.routes');
const actionRoutes = require('./routes/action.routes');
const matchRoutes = require('./routes/match.routes');
app.use("/", userRoutes);
app.use("/actions/", actionRoutes);
app.use("/match/", matchRoutes);

// port
const port = process.env.PORT || 8080;

// Encoder model
encoder.load().then(model => app.set('encoder', model));


// chat websocket

const { Server } = require("socket.io");
const http = require("http");
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  
  io.on("connection", (socket) => {
     console.log(`User Connected: ${socket.id}`);
   
     socket.on("join_room", (data) => {
       socket.join(data);
       console.log(`User with ID: ${socket.id} joined room: ${data}`);
     });
   
     socket.on("send_message", (data) => {
        console.log("Sending to room: " + data.room);
        io.to(data.room).emit("receive_message", data);
        // db.addMessage(data.room, data.author, data.content, function(err, data) {});
     });
  
     socket.on("leave_room", (data) => {
        socket.leave(data);
        console.log(`User with ID: ${socket.id} left room: ${data}`);
     });
  });


// listener
// const server = app.listen(port, () => console.log('Server is running on port ' + port));
server.listen(port, () => console.log('Server is running on port ' + port));