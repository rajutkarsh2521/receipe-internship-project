const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let recipes = [];

app.get('/recipes', (req, res) => {
  res.json(recipes);
});

app.post('/recipes', (req, res) => {
  const recipe = req.body;
  recipes.push(recipe);
  res.status(201).json({ message: 'Recipe added!', recipe });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
