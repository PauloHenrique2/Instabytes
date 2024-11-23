import 'dovenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Estabelece a conexão com o banco de dados usando a string de conexão do ambiente.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para buscar todos os posts do banco de dados.
export async function getTodosPosts() {
    // Obtém o banco de dados 'instabytes'.
    const db = conexao.db("instabytes");
   
    // Obtém a coleção 'posts' do banco de dados.
    const colecao = db.collection("posts");
   
    // Retorna todos os documentos da coleção como um array.
    return colecao.find().toArray();
};

export async function criarPost(novoPost) {
    const db = conexao.db("instabytes");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
    // Obtém o banco de dados 'instabytes'.
       const db = conexao.db("instabytes");
      
       // Obtém a coleção 'posts' do banco de dados.
       const colecao = db.collection("posts");
          
       const objID = ObjectId.createFromHexString(id); 
   
       // Retorna todos os documentos da coleção como um array.
       return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});  
   };   
