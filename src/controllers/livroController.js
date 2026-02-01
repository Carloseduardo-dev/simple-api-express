import livros from "../models/Livro.js";

class LivroController {
  static async listarLivros(req, res) {
    try {
      const listarLivros = await livros.find({});
      res.status(200).json(listarLivros);
    } catch (erro) {
      res.status(500).json({
        message: `${erro.message} - Falha na requisição`,
      });
    }
  }

  static async cadastrarLivro(req, res) {
    try {
      const newLivro = await livros.create(req.body);
      res.status(201).json({
        message: "Criado com sucesso",
        livro: newLivro,
      });
    } catch (erro) {
      res.status(500).json({
        message: `${erro.message} - Falha ao cadastra livro`,
      });
    }
  }
}

export default LivroController;
