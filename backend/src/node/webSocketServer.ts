const initWebSocketServer = () => {
  const http = require("http");
  const { WebSocketServer } = require("ws");

  const server = http.createServer();
  const wsServer = new WebSocketServer({ server });
  const port = 1235;

  wsServer.on("connection", (connection: any, request: any) => {
    console.log(connection, request);
  });

  server.listen(port, () => {
    console.log(`Web socket started on port: ${port}`);
  });
};

export default initWebSocketServer;
