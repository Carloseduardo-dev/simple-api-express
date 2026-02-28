import { Autor } from "../models/Autor.js";
import Livro from "../models/Livro.js";

class LivroController {
  // listar livros (GET)
  static listLivros = async (req, res, next) => {
    try {
      const listarLivros = await Livro.find({});
      res.status(200).json(listarLivros);
    } catch (erro) {
      next(erro);
    }
  };

  // listar livros pelo id (GET)
  static listLivroById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livroId = await Livro.findById(id);
      if (!livroId) {
        return res.status(404).json({
          message: "Livro não encontrado",
        });
      }

      res.status(200).json(livroId);
    } catch (erro) {
      next(erro);
    }
  };

  // cadastrar livro (POST)
  static registerLivro = async (req, res, next) => {
    const data = req.body;
    try {
      const autorId = await Autor.findById(data.autor);
      if (!autorId) {
        return res.status(404).json({
          message: `Autor não encontrado`,
        });
      }
      const livroCompleto = {
        ...data,
        autor: autorId.toObject(),
      };

      const novoLivro = await Livro.create(livroCompleto);

      res.status(201).json({
        message: "Criado com sucesso",
        livro: novoLivro,
      });
    } catch (erro) {
      next(erro);
    }
  };
  // atualizar livro (PUT)
  static updateLivroById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const dadosLivro = req.body;

      const livroAtualizado = await Livro.findByIdAndUpdate(id, dadosLivro, {
        new: true,
        runValidators: true,
      });
      if (!livroAtualizado) {
        return res.status(404).json({
          message: "Livro não encontrado",
        });
      }

      res.status(200).json({
        message: "Livro atualizado!",
      });
    } catch (erro) {
      next(erro);
    }
  };

  // delete livro (DELETE)
  static deleteLivroById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const livroDeletado = await Livro.findByIdAndDelete(id);
      if (!livroDeletado) {
        return res.status(404).json({
          message: "Livro não encontrado",
        });
      }
      res.status(200).json({
        message: "Livro deletado com sucesso",
      });
    } catch (erro) {
      next(erro);
    }
  };

  // Filtro livro por editora (GET)
  static searchLivroEditora = async (req, res, next) => {
    const editora = req.query.editora;
    try {
      const livroPorEditora = await Livro.find({ editora: editora });
      if (!livroPorEditora) {
        return res.status(404).json({
          message: `Livro ${livroPorEditora} não encontrado!`,
        });
      }
      res.status(200).json(livroPorEditora);
    } catch (erro) {
      next(erro);
    }
  };
}

export default LivroController;
