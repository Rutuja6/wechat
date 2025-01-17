
const io = require("socket.io")(8000, {
    cors: {
        origin: "http://127.0.0.1:5500", // Frontend's URL (adjust if necessary)
        methods: ["GET", "POST"],
    }
});
const users = {};

io.on("connection", socket => {
    console.log("a user connected");

    // Handle new user joining
    socket.on('new-user-join', name => {
        console.log('joined the chat', name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    // Handle message sending
    socket.on("send", message => {
        // Emit to all clients that message and the user's name
        socket.broadcast.emit("receive", { message: message, name: users[socket.id] });
    });
    socket.on("disconnect", message => {
        // Emit to all clients that message and the user's name
        socket.broadcast.emit("left",  users[socket.id] );
        delete users[socket.id];
    });

        });

    

