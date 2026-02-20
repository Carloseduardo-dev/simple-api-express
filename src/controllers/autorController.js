import { Autor } from "../models/Autor.js";

class AutorController {
  // list autor (GET)
  static async listarAutor(req, res) {
    try {
      const listarAutor = await Autor.find({});
      res.status(200).json(listarAutor);
    } catch (erro) {
      res.status(500).json({
        message: `${erro.message} - Erro ao listar autores`,
      });
    }
  }

  // list autor pelo Id (GET)
  static async ListarAutorById(req, res) {
    try {
      const { id } = req.params.id;
      const autorId = await Autor.findById(id);
      if (!autorId) {
        res.status(404).json({
          message: `Autor não encontrado!`,
        });
      }
      res.status(200).json(autorId);
    } catch (erro) {
      res.status(500).json({
        message: `${erro.message} - Erro ao listar autor`,
      });
    }
  }
  // cadastrar autor (POST)
  static async registerAutor(req, res) {
    try {
      const newAutor = await Autor.create(req.body);
      res.status(200).json({
        message: `Criado com sucesso`,
        autor: newAutor,
      });
    } catch (erro) {
      res.status(400).json({
        message: `${erro.message} - Falha ao criar autor`,
      });
    }
  }
  // atualizar autor (PUT)
  static async updateAutorById(req, res) {
    try {
      const { id } = req.params;
      const dadosAutor = req.body;

      const autorAtualizado = await Autor.findByIdAndUpdate(id, dadosAutor, {
        new: true,
        runValidators: true,
      });
      if (!autorAtualizado) {
        res.status(404).json({
          message: `Autor não encontrado`,
        });
      }
      res.status(200).json({
        message: `Autor atulizado!`,
        autor: autorAtualizado,
      });
    } catch (erro) {
      res.status(500).json({
        message: `${erro.message} - Erro ao atualizar autor.`,
      });
    }
  }
  // delete autor (DELETE)
  static async deleteAutorById(req, res) {
    try {
      const { id } = req.params;
      const autorDeletado = await Autor.findOneAndDelete(id);
      if (!autorDeletado) {
        res.status(404).json({
          message: `Autor não encontrado!`,
        });
      }
      res.status(200).json({
        message: `Deletado com sucesso!`,
        autor: autorDeletado,
      });
    } catch (erro) {
      res.status(500).json({
        message: `${erro.message} - Erro ao deletar autor`,
      });
    }
  }
}

export default AutorController;
