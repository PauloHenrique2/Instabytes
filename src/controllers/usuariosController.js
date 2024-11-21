import getTodosUsuarios from "../models/usuariosModel.js";

export async function listarUsuarios(req, res) {
  // Chama a função para buscar os usuários.
  const posts = await getTodosUsuarios();
   
  // Envia uma resposta HTTP com status 200 e os usuarios em formato JSON.
  res.status(200).json(posts);
};
