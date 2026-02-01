import express from "express";
import routes from "../routes/index.js";

const app = express();
routes(app);

app.delete("/livros/:id", (req, res) => {
  const index = buscaBook(req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Livro não encontrado" });
  }

  livros.splice(index, 1);
  res.status(200).send("Livro removido com sucesso");
});

export default app;
