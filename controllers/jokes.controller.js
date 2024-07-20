const Jokes = require("../models/jokes.model");

const todosLosJokes = (req, res) => {
  Jokes.find()
    .then((jokes) => {
      res.status(200).json(jokes);
    })
    .catch((err) => {
      res.status(500).json({ message: "No se pudo obtener la lista de chistes" });
    });
};

const jokeById = (req, res) => {
  const id = req.params.id;
  Jokes.findById(id)
    .then((joke) => {
      if (!joke) {
        return res.status(404).json({ message: "Chiste no encontrado" });
      }
      res.status(200).json(joke);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error al obtener el chiste" });
    });
};

const jokeRandom = (req, res) => {
  Jokes.countDocuments()
    .then((count) => {
      const randomIndex = Math.floor(Math.random() * count);
      return Jokes.findOne().skip(randomIndex);
    })
    .then((joke) => {
      if (!joke) {
        return res.status(404).json({ message: "Chiste no encontrado" });
      }
      res.status(200).json(joke);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error interno del servidor" });
    });
};

const addJoke = (req, res) => {
  const { setup, punchline } = req.body;
  if (!setup || !punchline) {
    return res.status(400).json({ message: 'Faltan datos requeridos' });
  }
  Jokes.create({ setup, punchline })
    .then((jokeCreado) => {
      res.status(201).json(jokeCreado);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error al crear el chiste' });
    });
};

const updateJoke = (req, res) => {
  const id = req.params.id;
  const { setup, punchline } = req.body;
  const updateFields = {};

  if (setup) updateFields.setup = setup;
  if (punchline) updateFields.punchline = punchline;

  Jokes.findByIdAndUpdate(id, updateFields, { new: true })
    .then((jokeActualizado) => {
      if (!jokeActualizado) {
        return res.status(404).json({ message: 'Chiste no encontrado' });
      }
      res.status(200).json(jokeActualizado);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error al actualizar el chiste' });
    });
};

const deleteJoke = (req, res) => {
  const id = req.params.id;
  Jokes.findByIdAndDelete(id)
    .then((jokeEliminado) => {
      if (!jokeEliminado) {
        return res.status(404).json({ message: 'Chiste no encontrado' });
      }
      res.status(204).end();
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error al eliminar el chiste' });
    });
};

module.exports = {
  todosLosJokes,
  jokeById,
  jokeRandom,
  addJoke,
  updateJoke,
  deleteJoke
};
