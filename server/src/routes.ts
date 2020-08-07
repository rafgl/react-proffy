import express from "express";
import ClassController from "./controllers/ClassController";
import ConnectionsController from "./controllers/ConnectionsController";

const routes = express.Router();
const classController = new ClassController();
const connectionsController = new ConnectionsController();

routes.post("/classes", classController.create);
routes.get("/classes", classController.listClasses);
routes.get("/connections", connectionsController.totalConnections);
routes.post("/connections", connectionsController.create);

export default routes;
