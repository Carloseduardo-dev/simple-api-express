import express from "express";
import AutorController from "../controllers/autorController.js";

const routes = express.Router();

// Autores
routes.get("/autores", AutorController.listarAutor);
routes.get("/autores/:id", AutorController.ListarAutorById);

routes.post("/autores", AutorController.registerAutor);

routes.put("/autores/:id", AutorController.updateAutorById);

routes.delete("/autores/:id", AutorController.deleteAutorById);

export default routes;
