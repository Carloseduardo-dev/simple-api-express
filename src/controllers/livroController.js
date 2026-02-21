import { Autor } from "../models/Autor.js";
import Livro from "../models/Livro.js";

class LivroController {
  // listar livros (GET)
  static async listLivros(req, res) {
    try {
      const listarLivros = await Livro.find({});
      res.status(200).json(listarLivros);
    } catch (erro) {
      res.status(500).json({
        message: `${erro.message} - Erro ao listar livros`,
      });
    }
  }

  // listar livros pelo id (GET)
  static async listLivroById(req, res) {
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
      res.status(500).json({
        message: `${erro.message} - Erro ao listar livro`,
      });
    }
  }

  // cadastrar livro (POST)
  static async registerLivro(req, res) {
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

      const newLivro = await Livro.create(livroCompleto);

      res.status(201).json({
        message: "Criado com sucesso",
        livro: newLivro,
      });
    } catch (erro) {
      res.status(400).json({
        message: `${erro.message} - Falha ao criar livro`,
      });
    }
  }
  // atualizar livro (PUT)
  static async updateLivroById(req, res) {
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
        livro: livroAtualizado,
      });
    } catch (erro) {
      res.status(500).json({
        message: `${erro.message} - Erro ao atualizar livro`,
      });
    }
  }

  // delete livro (DELETE)
  static async deleteLivroById(req, res) {
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
        livroDeletado,
      });
    } catch (erro) {
      res.status(500).json({
        message: `${erro.message} - Erro ao deletar livro`,
      });
    }
  }
}

export default LivroController;
