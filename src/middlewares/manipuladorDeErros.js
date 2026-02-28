import mongoose from "mongoose";
// eslint-disable-next-line no-unused-vars
function manipuladorDeErros (erro, req, res, next) {
  if (!(erro instanceof mongoose.Error.CastError)) {
    return res.status(500).send({
      message: "Erro interno do servidor!",
    });
  }
  return res.status(400).send({
    message: "Um ou mais dados fornecidos estão incorretos!",
  });
};

export default manipuladorDeErros;