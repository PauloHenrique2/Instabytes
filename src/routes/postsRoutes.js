import express from "express";
import { listarPosts } from "../controllers/postsController.js";

const routes = (app) => {
  // Habilita o parsing de dados JSON nas requisições.
  app.use(express.json());
  // Define uma rota GET para buscar todos os posts.
  app.get("/posts", listarPosts);
};

export default routes;
