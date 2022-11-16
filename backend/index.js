const app = require("express")();
const httpserver = require("http").createServer(app);
const io = require("socket.io")(httpserver, {
  cors: { origin: "*" },
});

const port = process.env.PORT || 3000;

io.on("connection", (socket) => {
  socket.on("send", (message) => {
    io.emit("send", message);
  });
  socket.on("disconnect", () => {
    console.log("a user is disconnected");
  });
});
httpserver.listen(port, ()=>console.log(`Listening to port ${port}`));