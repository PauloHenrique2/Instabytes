import express from "express";
import routes from "./src/routes/postsRoutes.js";
import userRoutes from "./src/routes/usuariosRoutes.js";
import { getUsuarioPorNome, removerUsuarioPorNome } from "./src/models/usuariosModel.js";

// Cria uma instância da aplicação Express.
const app = express();
routes(app);


// Inicia o servidor na porta 3000.
app.listen(3000, () => {
 console.log("Servidor escutando...");
});
