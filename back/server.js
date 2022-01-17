require("dotenv").config();

const http = require("http");
const app = require("./app");

if (!process.env.JWT_SECRET) {
  console.log("JWT_SECRET is not defined");
  process.exit(1);
}

const normalizePort = val => {
  const port = parseInt(val, 10); // Return a valid port (number or string).

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const errorHandler = error => {
  // Search for errors and handle them with appropriate way. Then is register in server.
  if (error.syscall !== "listen") throw error;

  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

server.listen(port);
