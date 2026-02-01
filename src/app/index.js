import express from "express";
import routes from "../routes/index.js";

const app = express();
routes(app)

app.get("/livros/:id", (req, res) => {
  const index = buscaBook(req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Livro não encontrado" });
  }

  res.status(200).json(livros[index]);
});

app.post("/livros", (req, res) => {
  livros.push(req.body);
  res.status(201).json(req.body);
});

app.put("/livros/:id", (req, res) => {
  const index = buscaBook(req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Item não encontrado" });
  }

  livros[index].name = req.body.name;

  res.status(200).json({
    message: "Item atualizado com sucesso",
    book: livros[index],
  });
});

app.delete("/livros/:id", (req, res) => {
  const index = buscaBook(req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Livro não encontrado" });
  }

  livros.splice(index, 1);
  res.status(200).send("Livro removido com sucesso");
});

export default app;
