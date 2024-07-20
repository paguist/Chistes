const express = require('express');
const app = express();
const jokesRoutes = require('./routes/jokes.route');

require('./config/mongoose.config');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/jokes', jokesRoutes);

app.listen(8080, () => {
    console.log('El servidor está encendido en el puerto 8080.');
});
