import conectarAoBanco from "../config/dbConfig.js";

// Estabelece a conexão com o banco de dados usando a string de conexão do ambiente.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para buscar todos os usuários do banco de dados.
export default async function getTodosUsuarios() {
    // Obtém o banco de dados 'instabytes'.
    const db = conexao.db("instabytes");
   
    // Obtém a coleção 'usuarios' do banco de dados.
    const colecao = db.collection("usuarios");
   
    // Retorna todos os documentos da coleção como um array.
    return colecao.find().toArray();
};

export async function getUsuarioPorNome(nome) {
    // Obtém o banco de dados 'instabytes'.
    const db = conexao.db("instabytes");
   
    // Obtém a coleção 'usuarios' do banco de dados.
    const colecao = db.collection("usuarios");

    const usuario = colecao.find(usuario => usuario.nome === nome);
    // Retorna o usuário com o id informado
    console.log("ID: " + usuario.id + "\n Nome: " + nome + "\n E-mail: " + usuario.email);
}

export async function removerUsuarioPorNome(nome) {
    const db = conexao.db("instabytes");
    const colecao = db.collection("usuarios");

    const resultado = await colecao.deleteOne({nome:nome});
    console.log(`${resultado.deletedCount} usuário deletado.`)
  }
