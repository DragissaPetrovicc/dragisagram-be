const express = require("express");
const cors = require("cors");
const { config } = require("dotenv");
const mongoose = require("mongoose");
const swaggerjsdoc = require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express");
const { authMiddleware } = require("./middlewares/authentication");

//login and register
const login = require("./routes/LogIn&Register/Login");
const register = require("./routes/LogIn&Register/Register");

//post
const makePost = require("./routes/Posts/MakePost");
const getPosts = require("./routes/Posts/GetPosts");
const likesShares = require("./routes/Posts/Likes&Shares");
const deletePost = require("./routes/Posts/DeletePost");
const editPost = require("./routes/Posts/EditPost");
const savePost = require("./routes/Saved posts/SavedPosts");
const comments = require("./routes/Comments/Commnts");

//user
const patchUser = require("./routes/User/PatchUser");
const searchUsers = require("./routes/User/SearchUser");
const deleteUser = require("./routes/User/DeleteUser");
const blockUser = require("./routes/User/BloskUser");

//rateApp
const rateApp = require("./routes/Rating/Rating");

//make report
const reports = require("./routes/Reports/Report");

//chat
const OneOnOneChat = require("./routes/Chats/1on1Chat");
const allChatsFor1User = require("./routes/Chats/GetAllChatsFor1User");
const createGroupChat = require("./routes/Chats/GroupChat");

//messages
const messages = require("./routes/Messages/Messages");

//following&followers
const followers = require("./routes/Following&Followers/Followers");

//admin
const getReps = require("./routes/Admin/GetReps");
const allUsers = require("./routes/Admin/GetAllUsers");
const allRatings = require("./routes/Admin/GetAllRatings");
const sendNotification = require("./routes/Admin/SendNotification");

config();

const app = express();

app.use(express.json());
app.use(cors());

const startServer = () => {
  const server = app.listen(process.env.PORT || 8080, () => {
    console.log(`---Server running on port ${process.env.PORT || 8080}---`);
    const io = require("socket.io")(server, {
      pingTimeout: 60000,
      cors: {
        origin: "https://dragisagram.netlify.app",
      },
    });

    io.on("connection", (socket) => {
      console.log("---Connected to socket.io---");
      socket.on("setup", (userId) => {
        socket.join(userId);
        console.log(userId);
        socket.emit("connected");
      });

      socket.on("join chat", (room) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
      });

      socket.on("typing", (room) => socket.in(room).emit("typing"));
      socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

      socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;

        if (!chat.users) return console.log("No users in this chat");

        chat.users.forEach((u) => {
          if (u._id === newMessageRecieved.sender._id) return;
          socket.in(u._id).emit("message recieved", newMessageRecieved);
        });
      });

      socket.off("setup", (userId) => {
        console.log("USER DISCONECTED");
        socket.leave(userId);
      });
    });
  });
};

(async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("---Connected to database---");
    startServer();
  } catch (e) {
    console.error("Connection to database failed", e);
  }
})();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Dragisa's Application",
      description: "Dragisa's instagram replica",
      contact: {
        name: "Dragisa",
      },
      servers: ["https://dragisagram-be.onrender.com/"],
    },
    schemes: ["http", "https"],
  },
  apis: ["./swagger/*.js"],
};

const spacs = swaggerjsdoc(options);
app.use("/api-docs", swaggerui.serve, swaggerui.setup(spacs));

app.use("/login", login);
app.use("/register", register);

app.use(authMiddleware);

app.use(
  "/post",
  makePost,
  getPosts,
  likesShares,
  deletePost,
  editPost,
  savePost,
  comments
);
app.use("/user", patchUser, searchUsers, deleteUser, blockUser, followers);
app.use("/rating", rateApp);
app.use("/report", reports);
app.use("/chat", OneOnOneChat, createGroupChat, allChatsFor1User);
app.use("/message", messages);
app.use("/admin", getReps, allUsers, sendNotification, allRatings);
