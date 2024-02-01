"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = require("socket.io");
var configureSocket = function (server) {
    var io = new socket_io_1.Server(server, {
        cors: {
            origin: "*",
        },
        transports: ["websocket", "polling"],
        maxHttpBufferSize: 5 * 1024 * 1024
    });
    var emailToSocketIdMap = new Map();
    var socketIdToEmailMap = new Map();
    var users = [];
    var addUser = function (userId, socketId) {
        !users.some(function (user) { return user.userId == userId; }) &&
            users.push({ userId: userId, socketId: socketId });
        console.log(users, 'push');
    };
    var removeUser = function (socketId) {
        users.filter(function (user) { return user.socketId != socketId; });
        console.log(users, 'remove');
    };
    function getUser(userId) {
        return users.find(function (user) { return user.userId == userId; });
    }
    io.on("connection", function (socket) {
        console.log("Socket connected on ".concat(socket.id));
        //chat
        socket.on('addUser', function (userId) {
            addUser(userId, socket.id);
            io.emit('getUsers', users);
        });
        socket.on('disconnected', function () {
            console.log('a user disconnected!..');
            removeUser(socket.id);
        });
        socket.on('send messages', function (_a) {
            var senderId = _a.senderId, receiverId = _a.receiverId, text = _a.text;
            var user = getUser(receiverId);
            console.log(user, 'aaaaaa', receiverId);
            io.to(user === null || user === void 0 ? void 0 : user.socketId).emit("get:message", { senderId: senderId, text: text });
        });
        // video call
        socket.on('room:join', function (data) {
            var email = data.email, room = data.room;
            emailToSocketIdMap.set(email, socket.id);
            socketIdToEmailMap.set(socket.id, email);
            io.to(room).emit("user:joined", { email: email, id: socket.id });
            socket.join(room);
            io.to(socket.id).emit("room:join", { email: email, room: room, id: socket.id });
        });
        socket.on('user:call', function (_a) {
            var to = _a.to, offer = _a.offer;
            io.to(to).emit('incoming:call', { from: socket.id, offer: offer });
        });
        socket.on('call:accepted', function (_a) {
            var to = _a.to, ans = _a.ans;
            io.to(to).emit('call:accepted', { from: socket.id, ans: ans });
        });
        socket.on('peer:nego:needed', function (_a) {
            var to = _a.to, offer = _a.offer;
            io.to(to).emit('peer:nego:needed', { from: socket.id, offer: offer });
        });
        socket.on('peer:nego:done', function (_a) {
            var to = _a.to, ans = _a.ans;
            io.to(to).emit('peer:nego:final', { from: socket.id, ans: ans });
        });
    });
};
exports.default = configureSocket;
//# sourceMappingURL=socket.js.map