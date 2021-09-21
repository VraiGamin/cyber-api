const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./routes/user.route');

//connection to bdd
//atlas: mongodb+srv://leo:passEdEmoT@cluster-one.9usqa.mongodb.net/db_wfo?retryWrites=true&w=majority
//local : mongodb://localhost/wfo_local
// mongoose.connect('mongodb+srv://user1:BTIkKDs3z6Jx8PyY@cluster0.m92sx.mongodb.net/db_eats?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
//   .then(() => console.log('Connexion à MongoDB réussie !'))
//   .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use(cors());
app.use(bodyParser.json());

//routing
app.use('/users', userRoutes);

module.exports = app;