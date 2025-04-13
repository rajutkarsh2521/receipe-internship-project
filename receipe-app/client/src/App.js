import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/recipes')
      .then(res => setRecipes(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/recipes', { title, instructions })
      .then(res => {
        setRecipes([...recipes, res.data.recipe]);
        setTitle('');
        setInstructions('');
      });
  };

  return (
    <div className="App">
      <h1>Recipe Sharing App</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Recipe Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
        />
        <button type="submit">Add Recipe</button>
      </form>

      <div className="recipe-list">
        {recipes.map((r, i) => (
          <div key={i} className="recipe-card">
            <h3>{r.title}</h3>
            <p>{r.instructions}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
