import os from "os";

const initWebSocketServer = () => {
  const http = require("http");
  const { WebSocketServer } = require("ws");

  const server = http.createServer();
  const wsServer = new WebSocketServer({ server });
  const port = 1235;

  enum Request {
    MEMORY = "REQUEST_MEMORY",
  }

  wsServer.on("connection", (connection: any, request: any) => {
    connection.send(
      JSON.stringify({
        total: os.totalmem(),
        free: os.freemem(),
      })
    );

    connection.on("message", (message: any) => {
      const messageString = Buffer.from(message).toString();
      switch (messageString) {
        case Request.MEMORY:
          connection.send(
            JSON.stringify({
              total: os.totalmem(),
              free: os.freemem(),
            })
          );
          break;
        default:
          console.log("Unknown request");
          break;
      }
    });
  });

  server.listen(port, () => {
    console.log(`Web socket started on port: ${port}`);
  });
};

export default initWebSocketServer;
