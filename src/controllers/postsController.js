import fs from "fs"; 
import { getTodosPosts, criarPost, atualizarPost } from "../models/postsModel.js"; 
import gerarDescricaoComGemini from "../services/geminiService.js";


export async function listarPosts(req, res) { 
// Define a função assíncrona 'listarPosts', que recebe dois parâmetros: 'req' (requisição) e 'res' (resposta), e serve para listar todos os posts.

  const posts = await getTodosPosts(); 
  // Chama a função 'getTodosPosts', que busca todos os posts do banco de dados ou de alguma fonte, e aguarda sua execução com 'await'. O resultado é armazenado na variável 'posts'.

  res.status(200).json(posts); 
  // Retorna uma resposta HTTP com o status 200 (OK) e os posts em formato JSON para o cliente. Isso é enviado como resposta à requisição.

};

export async function postarNovoPost(req, res) { 

  const novoPost = req.body; 

  try {
    const postCriado = await criarPost(novoPost); 
    res.status(200).json(postCriado);  

  }
  catch(erro) { 
    console.error(erro.message); 
    res.status(500).json({"Erro":"Falha na requisição!"}); 
  }
};

export async function uploadImagem(req, res) { 
  const novoPost = { 
    descricao: "", 
    imgUrl: req.file.originalname, 
    // Atribui ao campo 'imgUrl' do novo post o nome original do arquivo de imagem enviado, extraído de 'req.file.originalname' (onde 'req.file' contém informações sobre o arquivo carregado).
    alt: "" 
  };

  try { 
    const postCriado = await criarPost(novoPost); 
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`; 
    // Define o caminho da nova imagem, que será armazenada na pasta 'uploads' e terá o nome correspondente ao 'insertedId' do post criado. Esse ID é geralmente gerado pelo banco de dados quando o post é inserido.

    fs.renameSync(req.file.path, imagemAtualizada); 
    // Usa a função 'renameSync' do módulo 'fs' para mover o arquivo de imagem do caminho original (em 'req.file.path') para o novo caminho definido em 'imagemAtualizada'. Isso efetivamente renomeia e move o arquivo.

    res.status(200).json(postCriado);  
  }
  catch(erro) { 
    console.error(erro.message); 
    res.status(500).json({"Erro":"Falha na requisição!"}); 
  }
};

export async function atualizarNovoPost(req, res) {
  const id = req.params.id;
  const urlImagem = `http://localhost:3000/${id}.png`;
  
  try {
   const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
   const descricao = await gerarDescricaoComGemini(imgBuffer);
 
   const post = {
     imgUrl: urlImagem,
     descricao: descricao,
     alt: req.body.alt
   };
 
   const postCriado = await atualizarPost(id, post);
   res.status(200).json(postCriado);
  }
 
  catch(erro) {
   console.error(erro.message);
   res.status(500).json({"Erro":"Falha na requisição"});
  }
 };
