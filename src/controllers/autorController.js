import { Autor } from "../models/Autor.js";

class AutorController {
  // list autor (GET)
  static listarAutor = async (req, res, next) => {
    try {
      const autoresResultado = await Autor.find({});
      res.status(200).json(autoresResultado);
    } catch (erro) {
      next(erro);
    }
  };

  // list autor pelo Id (GET)
  static ListarAutorById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const autorId = await Autor.findById(id);
      if (!autorId) {
        return res.status(404).json({
          message: `Autor não encontrado!`,
        });
      }
      res.status(200).json(autorId);
    } catch (erro) {
      next(erro);
    }
  };
  // cadastrar autor (POST)
  static registerAutor = async (req, res, next) => {
    try {
      let autor = new Autor(req.body);

      const autorResultado = await autor.save();

      res.status(201).json({
        message: `Criado com sucesso`,
        autorResultado,
      });
    } catch (erro) {
      next(erro);
    }
  };
  // atualizar autor (PUT)
  static updateAutorById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const dadosAutor = req.body;

      const autorAtualizado = await Autor.findByIdAndUpdate(id, dadosAutor, {
        new: true,
        runValidators: true,
      });
      if (!autorAtualizado) {
        return res.status(404).json({
          message: `Autor não encontrado`,
        });
      }
      res.status(200).json({
        message: `Autor atulizado com sucesso!`,
      });
    } catch (erro) {
      next(erro);
    }
  };
  // delete autor (DELETE)
  static deleteAutorById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const autorDeletado = await Autor.findOneAndDelete(id);
      if (!autorDeletado) {
        return res.status(404).json({
          message: `Autor não encontrado!`,
        });
      }
      res.status(200).json({
        message: `Deletado com sucesso!`,
      });
    } catch (erro) {
      next(erro);
    }
  };
}

export default AutorController;
