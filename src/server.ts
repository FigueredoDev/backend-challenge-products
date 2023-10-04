import routes from "./routes";
import express, { ErrorRequestHandler, NextFunction, Request, Response } from "express";

const server = express();
// TODO - implement env variable for port number
const PORT = 3333;

server.use(express.json());
server.use("/api", routes);

server.use((_error: ErrorRequestHandler, _request: Request, response: Response, _next: NextFunction) => {
  response.sendStatus(500);
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
