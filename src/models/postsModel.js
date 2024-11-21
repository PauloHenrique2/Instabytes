import conectarAoBanco from "../config/dbConfig.js";

// Estabelece a conexão com o banco de dados usando a string de conexão do ambiente.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para buscar todos os posts do banco de dados.
export default async function getTodosPosts() {
    // Obtém o banco de dados 'instabytes'.
    const db = conexao.db("instabytes");
   
    // Obtém a coleção 'posts' do banco de dados.
    const colecao = db.collection("posts");
   
    // Retorna todos os documentos da coleção como um array.
    return colecao.find().toArray();
};
