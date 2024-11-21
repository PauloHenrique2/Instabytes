import express from "express";
import { listarUsuarios } from "../controllers/usuariosController.js";

const userRoutes = (app) => {
  // Habilita o parsing de dados JSON nas requisições.
  app.use(express.json());
  // Define uma rota GET para buscar todos os posts.
  app.get("/usuarios", listarUsuarios);
};

export default userRoutes;
