const io = require("socket.io")(5000, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  const id = socket.handshake.query.id;
  socket.join(id);

  // when I send to you, recipient = you, when you send to me, recipient = me,
  // need to swap them out

  socket.on("send-message", ({ recipients, text }) => {
    recipients.forEach((recipient) => {
      const newRecipients = recipients.filter((r) => r !== recipient);
      newRecipients.push(id);
      socket.broadcast.to(recipient).emit("receive-message", {
        recipients: newRecipients,
        sender: id,
        text,
      });
    });
  });
});
