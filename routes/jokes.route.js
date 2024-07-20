const express = require('express');
const router = express.Router();

// Importar todos los controladores
const jokesController = require('../controllers/jokes.controller');

// Definiendo las rutas
router.get('/', jokesController.todosLosJokes); // Obtener todos los chistes
router.get('/:id', jokesController.jokeById); // Obtener un chiste por ID
router.get('/random', jokesController.jokeRandom); // Obtener un chiste aleatorio
router.post('/crear', jokesController.addJoke); // Crear un nuevo chiste
router.put('/:id', jokesController.updateJoke); // Actualizar un chiste
router.delete('/:id', jokesController.deleteJoke); // Eliminar un chiste

module.exports = router;
